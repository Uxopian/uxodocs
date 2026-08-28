---
title: The Migration Ledger
sidebar_label: The Migration Ledger
sidebar_position: 3
---

# Knowing What's Done, What's Left, and What to Re-Run: The Migration Ledger

*Part 3 of 3. [Part 1: Extracting From a Live ECM →](./extracting-from-live-ecm.md) covers bulk extraction. [Part 2: Delta Migration →](./delta-migration.md) covers catching the target up to a moving source. This part covers the small table that tells you where the programme stands.*

:::tip[TL;DR]
- Three questions get confused with each other. *What changed in the source?* is delta capture. *Did it arrive intact?* is reconciliation. *What have I done, what's left, what do I re-run?* is the **migration ledger**.
- The ledger is one table with two columns that matter: the document's id, and its status. That is genuinely all it has to be on day one.
- Its real job is to stop you re-querying an old, slow source to find out what you already know.
- Fast2 reads it with a plain `SQLSource` and writes it with one `SQLStatementTask` after the injector. No custom module, no clever SQL.
- Keep it boring: one index, one `UPDATE` per document, its own small database. **If the ledger ever becomes a performance conversation, it has been over-built.**
:::

## The question that arrives in month four

Nobody asks it in the design workshop. It turns up on a Tuesday in month four, usually from the customer's own architect:

> "How do you know which punnets need to be re-run?"

There is a bad answer and a good one. The bad answer is "we re-query the source for everything that isn't in the target yet". On an estate whose metadata database is already the application team's performance headache, that answer is how you end up on the wrong end of the joint runbook's kill switch. The good answer is that you already know, because you wrote it down as you went.

That is the whole idea. It is not sophisticated, and it should not become sophisticated.

### Three questions, three mechanisms

Worth naming explicitly, because all three get collapsed into "incremental migration" in almost every deck.

| Question | Answered by | Covered in |
|---|---|---|
| What changed in the source since T? | The four delta-capture mechanisms | [Part 2](./delta-migration.md#the-four-mechanisms-of-delta-capture) |
| Did it actually arrive, intact and complete? | Layered reconciliation | [Part 2](./delta-migration.md#destination-side-reconciliation) |
| **What have I done, what's left, what do I re-run?** | **The migration ledger** | This article |

![Fast2 sits between the source and the target. An arrow back to the source is labelled "what changed?" (delta capture); an arrow on to the target is labelled "did it arrive?" (reconciliation); an arrow down to a migration_ledger box, one row per document, is labelled "what's left? what do I re-run?"](../assets/img/playbook/ledger-questions.png)

Delta capture looks *outward*, at the source. Reconciliation looks *forward*, at the target. The ledger looks *inward*, at your own work.

## "Doesn't Fast2 already track this?"

Partly, and the answer decides whether you build anything at all.

Fast2 keeps real state. Every punnet has a [lifecycle](../getting-started/overall-concepts.md#map) with `Processed OK` and `Processed KO` outcomes, Elasticsearch holds per-document trace IDs with Kibana dashboards over them, and after any campaign the **retry feature** replays a filtered set of punnets, including "everything in exception", by exception type. For a lot of projects that is all you need.

It stops being enough for two reasons, and only two. **Campaign scope:** "retry the punnets in exception" is a question about *this run*, while "which documents from the Q2 batch have never landed, under any map version, since February" is a question about the *programme*, and no single campaign owns it. **Direction:** Fast2 records what happened to punnets it was handed. It cannot tell you what it was never handed. Only an inventory can, and an inventory outside the source is the only kind that answers "what's left" without asking the source.

So: **use the built-in retry for operational re-runs inside a campaign. Add a ledger when the programme is bigger than a campaign.** On a 5M-document single-source project the built-in features are the right answer and a ledger is over-engineering. Past roughly 50M documents, or past two quarters of elapsed time, or on any estate with a regulator attached, write the table.

## The table

One row per source document. Four columns.

```sql
CREATE TABLE migration_ledger (
    source_id  VARCHAR(255) NOT NULL PRIMARY KEY,
    status     VARCHAR(16)  NOT NULL DEFAULT 'PENDING',
    batch_id   VARCHAR(64),
    updated_at TIMESTAMP
);

CREATE INDEX ix_ledger_status ON migration_ledger (status);
```

That is the whole design. `source_id` is the source's own immutable identifier — never a path, never a row number, never anything a rename can change. `batch_id` is what turns "which punnets do I re-run" into a one-line query. `updated_at` is what gives you a throughput curve for free.

Populate it once, before any content moves, from the metadata dump rather than the live source. It is a projection of two columns with no blobs in it, so it is cheap and it runs in a maintenance window. What you get for that one pass is a **denominator**: on day one you can say how many documents are in scope, every percentage on every dashboard becomes real, and completeness at sign-off is a `COUNT(*)` away.

:::warning[Keep it boring — this is a performance-driven migration]
The ledger sits on the hot path of every document you migrate, so its only design goal is to stay out of the way.

- **One index**, on `status`. Every extra index is write amplification on a table taking one `UPDATE` per migrated document.
- **One `UPDATE` per document**, as a single statement, batched by Fast2's normal punnet flow. Nothing else talks to this table during a campaign.
- **Its own small database.** Not the source's — that is the load surface you are protecting, and it drags the source DBA into your change management. Not the target's — that distorts its sizing and makes your audit evidence a dependency of the system under test.
- **No triggers, no views, no stored procedures, no partitioning.** If someone proposes any of those, the ledger has stopped being a notebook and started being a project.

If the ledger ever shows up in a performance investigation, the fix is to remove columns and indexes, not to tune it.
:::

## Three statuses

`PENDING` → in scope, not yet done. `MIGRATED` → the injector returned success. `FAILED` → the last attempt did not.

![PENDING branches to MIGRATED on "injected OK" and to FAILED on "exception"; a dashed arrow returns FAILED to PENDING, labelled "fix it, then set back to PENDING". Notes: the primary key stops duplicates and the injector's duplicate prevention makes re-runs safe; add SKIPPED if the business excludes anything from scope](../assets/img/playbook/ledger-statuses.png)

Re-runs are safe because of two things you already have: the primary key, so a row cannot be duplicated, and the injector's own duplicate-prevention boolean, so a document written twice is absorbed by the target rather than duplicated in it. That is the whole idempotency story. You do not need a state machine for it.

A fourth status, `SKIPPED`, is worth adding the moment the business excludes anything from scope, because at sign-off the difference between *"we migrated 99.2%"* and *"we migrated 100% of what was in scope, and here are the exclusions with the reason and the approver"* is the difference between an awkward meeting and a signature.

## How Fast2 wires into it

All out-of-the-box configuration.

| Role | Fast2 component |
|---|---|
| Read the work queue | [`SQLSource`](../catalog/source.md#SQLSource) — its `SQL query` is `SELECT source_id FROM migration_ledger WHERE status = 'PENDING'` |
| Fetch content | `ContentSource` workers, unchanged — the ledger replaces the *scan*, never the content path |
| Mark migrated | [`SQLStatementTask`](../catalog/loader.md#SQLStatementTask) on the injector's success link |
| Mark failed | The same task behind a [`PunnetInException`](../getting-started/create-workflow.md) link |
| Live view | Elasticsearch + Kibana, as usual. The ledger is the durable record; the dashboard is the operations room |

The shape, in words: `SQLSource` selects the pending rows → transformers → injector with duplicate prevention on → on success, one `UPDATE` sets `MIGRATED`; on exception, one `UPDATE` sets `FAILED`.

The DDL, the four statements, and the exact task configuration are in the cookbook: **[Track migration state in a side database →](../cookbooks/migration-ledger-sql.md)**.

## Only if you need it

Do not start here. Add a column when a real question demands it, one at a time:

- `attempt_count` — when transient failures start looping. Lets you stop retrying a document that has failed five times instead of hammering the source with it forever.
- `target_id` — when reconciliation needs to walk from a source document to the object it produced. Also what a support ticket in year three will ask for.
- `last_error` — when triage is a human reading worker logs. A short error label, not a stack trace.
- `doc_class` — when sign-off thresholds are per business class, which on a regulated estate they will be.

Four columns handle most projects. Eight handles all of them. Nobody needs fifteen.

## Two things that will bite you

**Two campaigns claiming the same rows.** If two Fast2 campaigns read `WHERE status = 'PENDING'` at the same time, they will both pick up the same documents. The target's duplicate prevention absorbs the second write, but you have already paid for the source read twice, which defeats the point of the ledger. The simple fix is a simple rule: **one campaign against the ledger at a time**, or give each campaign its own `batch_id` and put it in the `WHERE` clause. Both are a line of configuration. Neither needs database locking.

**A silent failure on the mark-migrated `UPDATE`.** If the injector succeeds and that `UPDATE` quietly fails, the document stays `PENDING` and gets re-migrated on every subsequent pass, forever, and invisibly. This is the one place in the pipeline where swallowing an exception is actively harmful, and permissive is the default on Fast2's SQL tasks. Set `Skip exceptions` to `false` on that one task, deliberately.

## What the ledger is not

It is not your completeness evidence. A ledger is Fast2 telling you what Fast2 did — a first-party record, and an auditor will notice in about ninety seconds.

So keep the [three-way match](./delta-migration.md#layer-1-manifest--checksum) genuinely three-way: **source inventory ↔ ledger ↔ target inventory**, three independently produced counts. The ledger makes the first two cheap and queryable; it cannot stand in for the third. `MIGRATED` means "the injector returned success and this row was written". It does not mean "the object is retrievable in the target today", and the gap between those two statements is where failed target-side commits and over-eager retention rules live.

It is also not a watermark store. If your delta phase creates documents after the inventory pass, insert them as new `PENDING` rows, or `COUNT(*) WHERE status = 'PENDING' = 0` will quietly mean "done with the inventory as it stood in February".

## Where it fits with source-side flagging

[Part 2's Mechanism D](./delta-migration.md#d-source-side-flagging-write-back-to-the-source) stamps `migrated_at` on the source object itself, which is the most reliable mechanism there is because it has no clocks in it — and it is ruled out on WORM archives, on regulated estates where any write is an audit event, and wherever the application team refuses a new column.

The ledger is the same idea with the flag moved to your side of the fence. You keep the semantics ("give me everything not yet marked migrated") and drop the write to the source. What you give up is narrow and worth stating: the source no longer knows it has been migrated, so if the decommissioning plan needs to read that state, only true Mechanism D delivers it.

## Ships, builds, and one recommendation

**Fast2 ships** the read (`SQLSource`), the writes (`SQLStatementTask`), the failure routing (`PunnetInException`), and the duplicate prevention that makes re-runs safe.

**You build** the table and four statements: create, populate, mark migrated, mark failed. An afternoon, not a sprint — and the cookbook exists so nobody does it from scratch twice.

**Nobody ships** the decision about what `SKIPPED` means on this estate. That is a conversation with the business owner, in the same session where you agree the per-class sign-off thresholds.

One last thing, if more than one team is running Fast2 in your organisation: they are each about to invent this table, with a different vocabulary and a different re-run query. Standardise it once — one DDL, one map template — and the next engagement inherits it instead of rebuilding it.
