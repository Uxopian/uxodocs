---
title: Track migration state in a side database
sidebar_label: Track migration state in a SQL ledger
sidebar_position: 11
---

# Track migration state in a side database (the migration ledger)

This recipe builds the **migration ledger**: one SQL table, outside the source and outside the target, holding one row per document with its migration state. Fast2 reads its work queue from it and writes each outcome back to it, so the question *"which punnets do I re-run?"* becomes a `SELECT`.

Everything here is out-of-the-box configuration. No custom module.

:::tip[Why before how]
This page is the **implementation**. The design decisions behind it — inventory-first vs. discover-as-you-go, why three states are not enough, the audit trap, when a ledger is over-engineering — are in the Playbook: **[The Migration Ledger →](../playbook/migration-ledger.md)**.

Read that first if you have not already chosen this pattern.
:::

## Prerequisites

- A SQL database instance **that is neither the source's nor the target's**. Postgres and SQL Server are both fine; the only platform-specific part is the claim statement below.
- The matching JDBC driver in `FAST2_HOME/Worker-libs/`, and a configured `SQLQueryGenericCaller` (see [Interact with a SQL database](./jdbc-for-sql.md) for the connection URL and the encrypted-password fields).

## 1. The table

```sql
CREATE TABLE migration_ledger (
    source_id           VARCHAR(255) NOT NULL PRIMARY KEY,
    state               VARCHAR(16)  NOT NULL DEFAULT 'PENDING',
    doc_class           VARCHAR(64),
    batch_id            VARCHAR(64),
    punnet_id           VARCHAR(128),
    attempt_count       INT          NOT NULL DEFAULT 0,
    last_error_class    VARCHAR(64),
    last_error_detail   VARCHAR(2000),
    claimed_by          VARCHAR(128),
    claimed_at          TIMESTAMP,
    source_hash         VARCHAR(64),
    source_bytes        BIGINT,
    source_modified_at  TIMESTAMP,
    target_id           VARCHAR(255),
    migrated_at         TIMESTAMP,
    CONSTRAINT ck_state CHECK (state IN
        ('PENDING','IN_FLIGHT','MIGRATED','FAILED','QUARANTINED','SKIPPED'))
);

-- The claim predicate. This is the index that matters.
CREATE INDEX ix_ledger_claim ON migration_ledger (state, doc_class);

-- Answers "which punnets do I re-run?"
CREATE INDEX ix_ledger_batch ON migration_ledger (batch_id, state);
```

:::warning[Resist adding more indexes]
This table takes at least one `UPDATE` per migrated document. At 100M+ rows every extra index is write amplification on the hot path. Index the claim predicate and the batch, and query everything else with a partition or a full scan in a maintenance window.

If the platform supports it, partition by `doc_class` or `batch_id` so per-class completeness reporting stays a partition scan.
:::

## 2. Populate the inventory

Run this **once**, before any content moves, against the metadata dump rather than the live source. It is a projection of a few columns — no blobs — so it is cheap and single-threaded.

```sql
-- Example: FileNet-style metadata dump in the staging zone
INSERT INTO migration_ledger (source_id, doc_class, batch_id, source_modified_at)
SELECT d.doc_guid,
       d.doc_class,
       'INVENTORY-2026-Q1',
       d.last_modified
FROM   staging_docversion d
WHERE  d.retired = 0;
```

You now have a denominator, which is what makes every percentage on every dashboard real:

```sql
SELECT doc_class, state, COUNT(*)
FROM   migration_ledger
GROUP  BY doc_class, state;
```

## 3. Reclaim expired leases (campaign start)

A worker killed mid-batch leaves its rows in `IN_FLIGHT` forever. One statement at campaign start fixes that.

```sql
UPDATE migration_ledger
SET    state = 'PENDING', claimed_by = NULL, claimed_at = NULL
WHERE  state = 'IN_FLIGHT'
  AND  claimed_at < CURRENT_TIMESTAMP - INTERVAL '6 hours';
```

Wire it with a [`SingleCallTask`](../catalog/tool.md#SingleCallTask):

| Setting | Value |
|---|---|
| Subtask | `SQLStatementTask` carrying the statement above |
| **Call at begining** | `true` |
| Call at end | `false` |

:::warning[Be generous with the timeout]
Set the interval above the longest plausible processing time for one batch, with margin. Reclaiming a row that is genuinely still in flight recreates the duplicate the lease existed to prevent.
:::

## 4. Claim work atomically (the source)

The claim must select **and** mark in one statement. A `SELECT` followed by a separate `UPDATE` lets two workers grab the same rows, and by the time the target's duplicate prevention absorbs the second write you have already spent the source read.

**Postgres:**

```sql
UPDATE migration_ledger
SET    state = 'IN_FLIGHT',
       claimed_by = 'worker-01',
       claimed_at = CURRENT_TIMESTAMP,
       attempt_count = attempt_count + 1
WHERE  source_id IN (
           SELECT source_id
           FROM   migration_ledger
           WHERE  state IN ('PENDING', 'FAILED')
             AND  attempt_count < 5
           ORDER  BY doc_class, source_id
           LIMIT  500
           FOR UPDATE SKIP LOCKED
       )
RETURNING source_id, doc_class, batch_id, source_modified_at;
```

**SQL Server:**

```sql
UPDATE TOP (500) migration_ledger WITH (READPAST, UPDLOCK, ROWLOCK)
SET    state = 'IN_FLIGHT',
       claimed_by = 'worker-01',
       claimed_at = SYSUTCDATETIME(),
       attempt_count = attempt_count + 1
OUTPUT inserted.source_id, inserted.doc_class, inserted.batch_id,
       inserted.source_modified_at
WHERE  state IN ('PENDING', 'FAILED') AND attempt_count < 5;
```

Configure it as the [`SQLSource`](../catalog/source.md#SQLSource):

| Setting | Value |
|---|---|
| SQL connection provider | your `SQLQueryGenericCaller` |
| SQL query | the claim statement above |
| SQL mapping for punnet | `source_id` → `punnetId` |
| SQL mapping for document | `source_id` → `documentId`, `doc_class` → `docClass` |
| Push remaining, non-mapped columns as document properties | `true` |

Mapping `source_id` onto `punnetId` is what keeps Fast2's own trace IDs aligned with your ledger rows, so a Kibana trace and a ledger row are the same identifier.

:::note[Where the content comes from]
The ledger replaces the **scan**, not the content path. Downstream `ContentSource` workers still fetch bytes from the snapshot or the source exactly as they did before — see [Part 1 of the playbook](../playbook/extracting-from-live-ecm.md) for the two-stage split.
:::

## 5. Mark migrated (success link, after the injector)

Placed on the injector's success output. [`SQLStatementTask`](../catalog/loader.md#SQLStatementTask):

| Setting | Value |
|---|---|
| Query caller | your `SQLQueryGenericCaller` |
| **Skip exceptions** | **`false`** |
| SQL statement | see below |

```sql
UPDATE migration_ledger
SET    state = 'MIGRATED',
       target_id = '${targetId}',
       punnet_id = '${punnetId}',
       source_hash = '${contentHash}',
       migrated_at = CURRENT_TIMESTAMP,
       claimed_by = NULL, claimed_at = NULL,
       last_error_class = NULL, last_error_detail = NULL
WHERE  source_id = '${documentId}';
```

:::danger[Turn Skip exceptions off on this task]
This is the one place in the pipeline where swallowing an exception is actively harmful. If the injector succeeds and this `UPDATE` fails silently, the document stays claimable and will be re-migrated on every subsequent pass — forever, and invisibly.

`Skip exceptions` defaults to permissive on more than one Fast2 SQL task. Set it explicitly.
:::

Adjust the `${...}` names to the data actually present on your punnet at that point in the map (the injector's own output data for the target identifier, and whatever your content-validation task named the hash). If you are updating a set of rows rather than one, [`UpdateSQLQueryTask`](../catalog/loader.md#UpdateSQLQueryTask) and [`MultiUpdateSQLQueryTask`](../catalog/loader.md#MultiUpdateSQLQueryTask) take a `WHERE clause` plus a table name instead of a full statement.

## 6. Mark failed (exception link)

Add a second output link from the injector with the **`PunnetInException`** [link condition](../getting-started/create-workflow.md), leading to another `SQLStatementTask`:

```sql
UPDATE migration_ledger
SET    state = CASE WHEN attempt_count >= 5 THEN 'QUARANTINED' ELSE 'FAILED' END,
       last_error_class = '${errorClass}',
       last_error_detail = '${errorMessage}',
       claimed_by = NULL, claimed_at = NULL
WHERE  source_id = '${documentId}';
```

`attempt_count` was already incremented by the claim in step 4, so the promotion to `QUARANTINED` happens on the attempt that hits the limit. Set `Skip exceptions` to `true` **here only** — a failure to record a failure must not itself abort the campaign.

Pair it with a [`CSVWriter`](../catalog/loader.md#CSVWriter) on the same link for the escalation list the engineer actually opens.

Use your own short error vocabulary rather than a stack trace, because these are the values triage is routed on: `SOURCE_UNAVAILABLE`, `CONTENT_CORRUPT`, `MAPPING_REJECTED`, `TARGET_TIMEOUT`, `ACL_UNRESOLVED`.

## 7. The queries you will actually run

**Which punnets need re-running** — the original question:

```sql
SELECT batch_id, COUNT(*) AS not_landed
FROM   migration_ledger
WHERE  state IN ('PENDING', 'FAILED', 'IN_FLIGHT')
GROUP  BY batch_id
ORDER  BY not_landed DESC;
```

**Progress per business class** (the shape sign-off wants):

```sql
SELECT doc_class,
       COUNT(*)                                                   AS in_scope,
       SUM(CASE WHEN state = 'MIGRATED'    THEN 1 ELSE 0 END)     AS migrated,
       SUM(CASE WHEN state = 'QUARANTINED' THEN 1 ELSE 0 END)     AS quarantined,
       SUM(CASE WHEN state = 'SKIPPED'     THEN 1 ELSE 0 END)     AS skipped
FROM   migration_ledger
GROUP  BY doc_class;
```

**Quarantine, by cause** — put this on a dashboard and alert above zero, or it becomes a silent hole in the migration:

```sql
SELECT last_error_class, COUNT(*)
FROM   migration_ledger
WHERE  state = 'QUARANTINED'
GROUP  BY last_error_class
ORDER  BY 2 DESC;
```

**Re-open documents the source changed after we migrated them** — this is where the ledger meets the [watermark delta mechanism](../playbook/delta-migration.md#c-watermark--timestamp-delta-give-me-everything-modified-since-t):

```sql
UPDATE migration_ledger
SET    state = 'PENDING', attempt_count = 0
WHERE  state = 'MIGRATED'
  AND  source_modified_at > migrated_at;
```

**Release a fixed quarantine batch** back into the queue after a mapping fix:

```sql
UPDATE migration_ledger
SET    state = 'PENDING', attempt_count = 0, last_error_class = NULL
WHERE  state = 'QUARANTINED'
  AND  last_error_class = 'MAPPING_REJECTED';
```

## 8. Top the inventory up during the delta phase

`COUNT(*) WHERE state = 'PENDING'` reaching zero means *done with the inventory as it stood when you took it*. Documents created in the source since then are outside it. Have the delta mechanism insert them:

```sql
INSERT INTO migration_ledger (source_id, doc_class, batch_id, source_modified_at)
SELECT d.doc_guid, d.doc_class, 'DELTA-2026-06-14', d.last_modified
FROM   staging_delta d
WHERE  NOT EXISTS (SELECT 1 FROM migration_ledger m WHERE m.source_id = d.doc_guid);
```

The `NOT EXISTS` guard is what makes the top-up idempotent, so a re-run of the delta pass costs nothing.

## Checklist before you call it done

- [ ] The claim statement is **atomic** (`SKIP LOCKED` / `READPAST`), not `SELECT` then `UPDATE`.
- [ ] Lease reclaim wired in a `SingleCallTask` with **Call at begining**, timeout well above one batch's processing time.
- [ ] **`Skip exceptions` = `false`** on the mark-migrated task, `true` on the mark-failed task.
- [ ] The injector's duplicate-prevention boolean is set explicitly — it is the backstop that makes every re-run safe.
- [ ] `QUARANTINED` count is on a dashboard with an alert above zero.
- [ ] The ledger is on its **own** database instance, not the source's and not the target's.
- [ ] Sign-off reconciles **source inventory ↔ ledger ↔ an independent target enumeration**. The ledger is a first-party record and certifies nothing on its own — see [the audit trap](../playbook/migration-ledger.md#the-audit-trap).
