---
title: Delta Migration
last_update:
  date: '2026-06-16T10:10:38.488Z'
  author: CI/CD Bot
sidebar_label: Delta Migration
sidebar_position: 2
content_hash: b7e2be9a329488111b68bdb00ff4d557d5d0aa3ebeff6b092ca3e6ebb7b5bd00
---

# Catching the Target Up to the Source: A Fast2 Delta Migration Methodology

> [See Part 1, Extracting From a Live ECM →](./extracting-from-live-ecm.md)

After bulk extraction, the source has not stopped. Catching up is the second half of the job. You close the gap without losing a single document, audit entry, or ACL change, and then you sign off the cutover against an audit trail a regulator will accept.

:::tip TL;DR
- Bulk extraction is roughly half the work. The delta capture, the reconciliation, and the cutover are the other half. That second half is where projects fail.
- Four delta-capture mechanisms cover almost every real situation: CDC, native ECM events, timestamp watermark, source-side flagging. Each has a clear "use when" and a clear "do not use when."
- Reconciliation is layered. Manifest plus checksum first, destination-side duplicate prevention second, statistical sampling third, business validation last. Skip a layer and you find out months later.
- Cutover is a decision, not a feature. Big-bang, phased, parallel run, blue-green. Each has a profile. Pick before you start.
- Fast2 ships the moving parts: incremental sources, per-injector duplicate prevention, SQL back-flagging, dashboards. The watermark store, the circuit breaker, and the sign-off ritual are still the engineer's job.
:::

## The moving target problem

Bulk extraction is comforting because it has a number attached to it. Fourteen weeks, 80M documents, dashboard green. The trouble is that during those fourteen weeks, the source kept producing documents, modifying ACLs, retiring older items, and writing new audit-trail entries. "We'll just re-run extraction at the end" is a decision I have watched blow up a project budget twice. Another fourteen weeks, during which the source has, again, kept moving.

What you need instead is a mechanism that captures only what changed since the last known point, replays it, and proves on both sides that nothing was lost. That is the delta phase. It needs its own design and its own go/no-go gate.

## The four mechanisms of delta capture

There are really only four ways to know what changed in a source between T and T+1.

### A. Change Data Capture (CDC): read the transaction log

CDC tools tail the source database's redo or WAL log and emit each row-level change as an event. Debezium is the open-source reference. Oracle GoldenGate, AWS DMS, Striim, and Qlik Replicate are the commercial variants. When it works, it is the cleanest mechanism available: low latency, no polling pressure on the source, no schema modification required.

![Change Data Capture, tailing the source database's transaction log and replaying each change against the target via a stream and a checkpoint](../assets/img/playbook/delta-01-cdc.png)

Support terms kill it first. Most enterprise ECMs (Documentum, FileNet, Alfresco Enterprise) treat the underlying database as private and unsupported. Any read of `dm_sysobject` or `DocVersion` outside the vendor's API routinely voids your support contract. On a large share of real ECM migrations, that single clause rules out CDC for the document plane.

Throughput is the second wall. Debezium is at-least-once and effectively single-threaded per connector, around 7,000 events per second sustained in well-tuned deployments. For a 4B-document FileNet estate moving at 120M documents per day, that is a hard ceiling you hit on day one.

Then there is the operational tail. Postgres logical replication slots bloat the WAL if the consumer falls behind. Debezium tracks DDL via an internal schema-history topic and absorbs additive changes (a new nullable column) automatically; breaking changes such as a drop, rename, or type change still require consumer coordination or they quietly break the pipeline. GoldenGate licensing (~$17,500 per processor, plus Veridata for diff) is rarely in the budget envelope.

**Use when:** source is a relational DB you legitimately can read, throughput is below the engine's ceiling, and you have someone on staff who has run Debezium in anger.
**Avoid when:** ECM vendor forbids DB access, sustained throughput is above ~7k events/s, or the team has never operated a CDC pipeline before.

### B. Native ECM event subscription: let the source tell you

Every serious ECM has an internal event mechanism. FileNet P8 writes to its `Event` table. Documentum has `dmi_queue_item` and event-driven workflows. SharePoint exposes change tokens via Microsoft Graph. Alfresco emits audit events through its public API. You subscribe, you consume, you replay.

![Native ECM event subscription: reading the vendor's own audit feed or change-token API and advancing a pointer on each consumed event](../assets/img/playbook/delta-02-event-subscription.png)

This is the vendor-blessed path. Your support contract stays intact and schema drift is the vendor's problem. There are two real risks. The first is throughput, because event tables are not designed for sustained drain at migration scale. The second is the retention window. If the source's audit retention is 90 days and your migration runs 14 months, the events for the first 11 months are already gone. One project I worked discovered this on month nine, and the fallback to a full timestamp re-scan was painful.

**Use when:** vendor forbids DB access, change rate is moderate, audit retention exceeds the migration window plus a healthy buffer.
**Avoid when:** audit retention is shorter than the migration timeline, or the event table is already a performance bottleneck for the application team.

### C. Watermark / timestamp delta: "give me everything modified since T"

This is the simplest mechanism, and the one most teams reach for first. You run an incremental Fast2 Source whose WHERE clause is `last_modified > :last_run_ts`, you record the high-water mark, you advance the pointer. Fast2 supports the pattern out of the box for SQL-backed sources; for S3 you use `start-after` to the same effect. The Fast2 Loader documentation describes two loading modes: one-shot full load, or incremental load.

![Watermark loop: Fast2 queries for everything modified since the last watermark, then advances the watermark to the highest timestamp seen](../assets/img/playbook/delta-03-watermark-loop.png)

Five pitfalls show up consistently.

1. **Clock skew** is the most common. If the source DB and Fast2 server drift by 200ms (well within NTP tolerance on a default config) you either miss rows at the boundary or duplicate them. Use a logical sequence column when the source offers one. Otherwise overlap windows deliberately and rely on the destination checker for idempotency.
2. **Soft deletes** are the silent killer. Many ECMs mark a document deleted by flipping a status column without bumping `last_modified`. The delete never shows up on a watermark query, so you need a parallel scan against the deletion flag.
3. **Bulk re-stamp** turns a delta into a full load. A schema migration, a reindex, a retention sweep. Any of these can touch every row and bump `last_modified` on all of them. Have a kill-switch.
4. **Boundary precision** is the case the Documentum community has been warning about for years on `r_modify_date`. Subsecond precision lost in transit means `>` becomes `>=` becomes a duplicate. Pick a side and stick to it.
5. **Late-arriving rows** are the boundary case nobody plans for. Long-running transactions can commit a row whose `last_modified` is older than your watermark by the time you read it. Overlap windows by at least the longest expected transaction duration, and accept that the destination checker will be doing real work.

**Use when:** the source has a trustworthy modified-timestamp column, the change rate is high enough that events are noisy but low enough that you can afford a periodic scan.
**Avoid when:** the source bulk-re-stamps rows for reasons unrelated to user activity (reindex, retention sweep), or when soft deletes are the dominant change type.

### D. Source-side flagging: write back to the source

When you own the source schema and the regulator does not get in the way, the most reliable mechanism is to write a `migrated_at` property on each source object as you complete it. The delta query becomes "give me everything where `migrated_at IS NULL`". No clocks, no watermarks, no boundary bugs.

![Source-side flagging: Fast2 stamps each migrated source object with a migrated_at property, so the next query naturally returns only what is left](../assets/img/playbook/delta-04-source-flagging.png)

Fast2 does not ship a productized "Mark as migrated" task, which is the most common misconception about this pattern. What Fast2 ships is `SQLStatementTask` (and its `UpdateSQLQueryTask` variant), which executes an arbitrary parameterised UPDATE in the pipeline. You stamp the source on successful ingest. If the pattern needs to be richer, say a flag plus a retry counter plus an error code, a small custom transformer built against the Maven SDK does the job.

**Use when:** you own the source schema, the source is not a WORM/Centera/regulated archive, and the application team is comfortable with a new column.
**Avoid when:** source is regulated (21 CFR Part 11, GxP, SOX-relevant archives where any modification triggers an audit event), or the application team explicitly refuses schema changes. In those cases, fall back to watermark plus destination-side reconciliation.

## Destination-side reconciliation

Delta capture tells you what should arrive. Reconciliation tells you whether it actually did. Two different problems, and the second is where most teams skimp. In a serious migration, reconciliation is layered. Not a single check.

### Layer 1: Manifest + checksum

Every Fast2 batch (every punnet) produces a manifest: source object ID, SHA-256 of the binary, byte size, source timestamp, target ID, target timestamp. The target verifies on ingest. At sign-off, the manifest is compared row-by-row against both the source inventory and the target inventory. Three-way match or no sign-off.

The case study worth knowing is Fast2's own published insurer migration onto Alfresco. MD5 hash validation on every document, combined with counter cross-referencing, produced an auditable completeness report. The false-positive risk is real. If you legitimately transform the binary in transit (PDF/A normalization, image recompression), the source hash will not match the target hash. Compute and store both, or compute on a canonical form.

### Layer 2: Destination checker (Fast2's per-injector duplicate prevention)

Every Fast2 injector has at least one boolean that turns the target itself into a check. The pattern is consistent across the catalogue:

| Injector | Setting | Behaviour |
|---|---|---|
| AlfrescoInjector | **Prevent duplicate** | Pre-write lookup; skip if present |
| AlfrescoRestInjector | **Overwrite documents when they already exist** + **Auto rename** + **Safe update** | Configurable per case: skip / overwrite / rename / metadata-only |
| FileNetInjector | **Prevent document overwriting** + **Throw exception if document already exists** | WHERE-clause pre-check; configurable strict mode |
| AwsInjector | **Update only** | Metadata-only update, content untouched |

Underneath, the pattern is always the same. A WHERE-clause lookup against the target before the write, with configurable behaviour on hit (skip, update, overwrite, error). This is what makes a delta phase replayable. When your delta run partially fails and you re-run from a known watermark, the destination checker (Fast2's per-injector duplicate prevention) silently absorbs the duplicates that would otherwise corrupt the target.

![Destination checker: Fast2 looks up the target before every write, and on a hit the configured mode decides between skip, update, overwrite, or error](../assets/img/playbook/delta-05-destination-checker.png)

### Layer 3: Statistical sample audit

Counters and hashes prove arithmetic, not fidelity. The third layer is a stratified random sample (typically 0.1% to 1% depending on regulator appetite, stratified by document class) fully rehydrated on the target: open the PDF, OCR a page, compare to the source rendering, check the ACL, check the metadata. Slow, manual or semi-manual work. Non-negotiable for regulated industries.

### Layer 4: Business validation

The only check that catches semantic loss. A contract whose amendment link is broken, or a retention class silently demoted from "permanent" to "10 years". Neither of these fails any of the previous three layers. They only fail when a data steward, a security officer, and (for financial archives) a CFO open the target through their normal application. Schedule it, and budget for it. The Ameritas migration of 670M Documentum documents to CARA on AWS treats this as a deliverable, not an afterthought.

## Cutover patterns

The mechanism is delta. The moment is cutover. You need to pick a cutover pattern at the start of the project, not at the end.

| Pattern | When to use | Main risk | Reference |
|---|---|---|---|
| Big-bang freeze + final delta | Small estate (under 10M docs), tolerable freeze window, simple source | Discovering defects under load | TSB Bank, Big Bang cutover, multi-week incident, £330M+ remediation |
| Progressive / phased | Large estate, multiple business units, can tolerate temporary heterogeneity | Long total duration; reconciliation per phase | Microsoft SPMT phased migration patterns |
| Parallel run / dual-write | Cannot tolerate any read-side outage, application can route reads to either side | Application changes (strangler fig); doubled write cost during the window | Common in insurance core systems; 72–96h read-side validation typical |
| Blue-green DB flip | Source is a database you control end-to-end, RTO measured in minutes | No auto-fallback after switchover | AWS RDS Blue/Green docs, "no automated failback" |
| Trickle with read-redirect | Very large estate, no acceptable freeze window | Application complexity (read-router); two truths exist simultaneously | Microsoft SPMT "initial migration + delta sync" pattern |

![Cutover sequence across Users, Source ECM, Fast2, and Target ECM in three phases: steady-state bulk extraction, delta phase with the source still live, and cutover window with writes frozen on the source and traffic flipped to the target](../assets/img/playbook/delta-06-cutover-swimlane.png)

Cutover is not where you find defects. It is where you prove there are none left. The TSB case is the cautionary tale of the decade. 5.2 million customers cut over in a single weekend, up to 1.9 million of them locked out of digital banking in an incident that ran for weeks, £330M+ in remediation, and CEO Paul Pester's "the bank is on its knees" Treasury Select Committee testimony now on the public record. The headline finding for practitioners was simple: cutover was the first time the team operated the system at production scale.

Deutsche Bank's Postbank integration on the Magellan platform is the slow-burn variant. Thirteen years, over €1 billion, a 2023 migration-wave outage that ran for days, and a BaFin reprimand. Both projects skipped the same gates.

## Failure modes that wreck delta phases

The same handful of failures show up on every project.

| Failure mode | What it looks like | One-line fix |
|---|---|---|
| Clock skew | Rows missed or duplicated at window boundary | Logical sequence column where possible; deliberate window overlap + destination checker |
| Soft deletes | Deletions never propagate | Parallel scan against deletion flag; explicit delete pipeline |
| Bulk re-stamp | "Delta" suddenly equals full load | Kill-switch on volume anomaly; coordinate with source DBA before reindex/retention sweeps |
| Schema drift | Source adds a column; pipeline silently drops it | Schema-evolution mode (Debezium 2.5+); fail-fast on unknown columns in transformer |
| Retry storm / non-idempotent writes | Same document written N times under N IDs | External-ID-based destination check (per-injector boolean); never let the engine generate target IDs |
| Phantom-write idempotency loss | Partial write committed, retry creates orphan | Wrap target operations in transactions where target supports it; otherwise compensating delete on retry |
| Postgres replication slot bloat | WAL fills the disk, source goes down | Monitoring on `pg_replication_slots.restart_lsn` and `wal_status`; alert at 80% WAL disk |
| Audit-log truncation | Events you need are gone | Verify retention window against migration timeline at project start; archive audit log if needed |
| CDC at-least-once duplicates | Same event delivered twice | Idempotent consumer (destination checker); store last-processed offset per partition |
| Late-arriving events | Long transaction commits after watermark advance | Overlap windows by max transaction duration; periodic full reconciliation sweep |
| Source→target mapping bug both sides agree on | Field consistently mapped to wrong destination | Statistical sample by business user, not engineer (the engineer wrote the bug) |
| Cutover rollback gap | Blue side gone, green side broken, no path back | After switchover AWS sets old-blue read-only automatically; keep it as your rollback path (AWS's documented strategy is logical replication from green back to blue); plan for a 24h rollback window on the first cutover |

## The Fast2 delta toolbox

What Fast2 actually does for you in a delta phase, and what you still have to build.

**What Fast2 ships:**

- **Incremental Source.** WHERE-clause-driven, with full and incremental load modes documented in the Fast2 Loader reference. The Uxopian FAQ frames it for the business: "incremental, or delta, migrations let users keep working while data moves in the background."
- **Per-injector duplicate prevention.** Alfresco "Prevent duplicate," FileNet "Prevent document overwriting," AwsInjector "Update only," Alfresco REST "Safe update" / "Auto rename." A WHERE-clause lookup before write, configurable on hit.
- **SQLStatementTask / UpdateSQLQueryTask** are the building block for back-flagging the source without writing custom code.
- **Dashboards backed by Elasticsearch and Kibana.** Live counters, per-document trace IDs, ingestion rate, error breakdown. Enough to run an operations room.
- **Maven SDK** is the escape hatch. Custom Sources, Transformers, Injectors, Tasks for the things Fast2 cannot do out of the box on your specific source.

**What Fast2 does not ship, and you should not pretend it does:**

- *A built-in watermark or checkpoint store.* The pattern is supported, but the storage and the advance-the-pointer logic are the engineer's responsibility. A small Postgres table or a JSON file in a known path is what most projects end up with.
- *A productized "Mark as migrated" task.* You build it from `SQLStatementTask` or a custom transformer in about 30 minutes. Not a checkbox feature.
- *A circuit breaker for the source.* If your watermark query suddenly returns 100x the expected volume because someone ran a reindex, Fast2 will faithfully try to ingest 100x the expected volume. You build the volume anomaly check around it.
- *A platform-wide idempotency flag.* Idempotency comes from unique punnet IDs combined with the per-injector duplicate-prevention booleans. It works. But it is a pattern, not a single switch.

Pre-sales decks sometimes treat "incremental migration" as a feature checkbox. In real projects it is a methodology you build on top of three Fast2 features and one custom module. The customer should know this before contract signature, not in week six of delivery.

## Sign-off ritual

Sign-off is a ritual in the literal sense. A sequence of steps performed in front of named witnesses, with named artefacts, before the source is allowed to go read-only. For every batch, and for the final cutover, three rows on the sign-off sheet:

| Row | What it proves | Evidence | Sign-off owner |
|---|---|---|---|
| Completeness | Every source object accounted for | Three-way manifest match (source inventory ↔ Fast2 manifest ↔ target inventory) | Migration lead |
| Fidelity | Documents are intact and readable | Statistical sample audit, fully rehydrated, signed report | QA lead |
| Business validation | Semantics preserved | Data steward walkthrough on real business cases; for finance, CFO signature on aggregate totals | Business owner |

For regulated industries, add the framework relevant to the estate (GxP, 21 CFR Part 11, EU Annex 11, SOX, HIPAA, GDPR) and an explicit cross-reference to the regulator-facing audit trail. Generis markets CARA's coverage of these frameworks, which is a reasonable reference point. Hopp Tech and Datafold both publish sign-off threshold templates; either is a baseline to adapt rather than starting from a blank page.

The threshold matters as much as the procedure. "99.5% match" is not a sign-off if the missing 0.5% is the legal archive. Define the threshold per document class, agree it in writing with the business owner before the delta phase begins, and for the regulated classes treat the threshold as zero.

Before you start any of the design work, settle one question with the business owner. Which of the four delta mechanisms is permitted on this source. Everything else in this article follows from that answer.
