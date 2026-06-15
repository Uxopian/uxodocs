---
title: FlowerDocs 2026 upgrade
sidebar_position: 7
date: "2022-02-14T13:20:01+02:00"
last_update:
  date: '2026-01-29T08:27:50.243Z'
  author: CI/CD Bot
content_hash: d56eb66be215c74b80aa5379b1e301f64caa118cc9a09df27dbc826ee25ab289
---

:::warning OpenSearch {{osVersion}}
FlowerDocs {{version}} runs on **OpenSearch {{osVersion}}**. Existing installations run on OpenSearch 1.x, and the document shape changed between the two versions, so the new application cannot read the old data as-is. Migrating your data to OpenSearch {{osVersion}} is therefore **mandatory** before upgrading.
:::

# Overview

FlowerDocs {{version}} ships a dedicated migration tool that reindexes data from an OpenSearch 1.x cluster (FlowerDocs 2025) to an OpenSearch {{osVersion}} cluster (FlowerDocs {{version}}). It is a one-shot, per-scope tool that:

- copies the data of a scope from the source cluster to the target cluster,
- creates the target indices and their aliases,
- transforms the documents to the new shape expected by FlowerDocs {{version}},
- validates that nothing was lost and produces a shareable report.

# Prerequisites

## Target cluster

- The OpenSearch {{osVersion}} target cluster is provisioned and reachable.
- The source `host:port` is added to the target's `reindex.remote.allowlist` (a restart is required if you add it).

## Source cluster

- The source OpenSearch 1.x cluster is reachable **from the target cluster** (firewall / security group).
- If the source has security enabled, the source credentials are available (see [Authentication](#authentication)).
- Indices that are split across multiple shards on the source migrate faster, with no action required on the tool side.

# Running a migration

The standard migration is a single command. The target cluster URL is provided through the `opensearch.uris` property, exactly as for the running application; the source cluster and scope are passed as parameters:

```bash
java -Dopensearch.uris=http://<target-os>:9200 \
     -jar flower-docs-clm-bundle.jar \
     opensearch-reindex \
     --source=http://<source-os>:9200 \
     --scope=FD \
     --target-scope=FD_MIGRATION_TEST
```

That is the whole command for the standard case : everything else has a sensible default.

:::tip Always start with a dry run
We **highly recommend** running a dry run before launching the real migration. Add `--dry-run=true` to the exact command you intend to use: the tool then connects to both clusters, counts the documents per index and produces the validation report **without writing anything** to the target. This lets you confirm connectivity and credentials, preview the per-scope document counts, and spot orphan documents or out-of-scope indices up front, so the real run holds no surprises. Once the dry-run report looks right, re-run the same command without `--dry-run` to perform the migration.

```bash
java -Dopensearch.uris=http://<target-os>:9200 \
     -jar flower-docs-clm-bundle.jar \
     opensearch-reindex \
     --source=http://<source-os>:9200 \
     --scope=FD \
     --target-scope=FD_MIGRATION_TEST \
     --dry-run=true
```

:::

## Required parameters

| Parameter   | Meaning                                |
| ----------- | -------------------------------------- |
| `--source`  | Source cluster URL (the OpenSearch 1.x cluster) |
| `--scope`   | Source scope id (case-sensitive)       |

The target cluster URL is passed via `-Dopensearch.uris=...` (the same convention as the running application).

## Common parameters

| Parameter                | Default      | Purpose                                   |
| ------------------------ | ------------ | ----------------------------------------- |
| `--target-scope`         | = `--scope`  | Migrate into a renamed scope              |
| `--dry-run`              | `false`      | Counts-only preview, no writes            |
| `--reindex-loginhistory` | `false`      | Include the audit log (login history) index |
| `--reindex-orphans`      | `false`      | Also reindex documents whose class no longer exists |
| `--detailed-report`      | `false`      | Per-class breakdown in the report         |
| `--sleep`                | `20000`      | Poll interval, in milliseconds, while the reindex runs |

:::tip Enable the detailed report
We **strongly recommend** running with `--detailed-report=true`. The per-class breakdown of source-versus-target counts makes it far easier to pinpoint exactly which class shrank or grew, instead of only seeing per-index totals. This option will be enabled by default in the next version.
:::

## Authentication

Authentication is HTTP Basic and is independent on each side : only set what you need.

| Parameter                              | When to use                       |
| -------------------------------------- | --------------------------------- |
| `--source-username` / `--source-password` | The source cluster has security enabled |
| `--target-username` / `--target-password` | The target cluster has security enabled |

## Performance & safety parameters

These are all enabled (or default to the cluster default) so that the standard run is safe and fast without manual cluster intervention.

| Parameter         | Default          | What it does                                       |
| ----------------- | ---------------- | -------------------------------------------------- |
| `--tune-settings` | `true`           | Disables refresh and replicas during the reindex, then restores them afterwards |
| `--delete-tasks`  | `true`           | Removes finished reindex task records              |
| `--remote-size`   | cluster default  | Source-pull batch size                             |
| `--socket-timeout`| cluster default  | Source-pull socket timeout                         |

Set any of these to `false` or to a specific value only if your environment requires it. In particular, override with `--tune-settings=false` only if the target was prepared externally and you do not want the tool to touch its settings. No manual `curl` step is needed for the standard run.

# Output

The tool produces three things:

- **Console log** : live progress (bootstrap, mappings, reindex submissions, polling, validation).
- **Report file** : `migration-report-<scope>-<timestamp>.txt`, written next to the jar.
- **Process exit code** : non-zero on any validation issue or task failure.

# Reading the validation report

## Clean run

A successful migration ends with a `RESULT: SUCCESS` line. Every in-scope index matches on counts, aliases and the document-shape (ACL flatten) spot-check.

```text
═══ Migration validation report ═══
Source: http://<source>:9200   scope=fd
Target: http://<target>:9200   scope=fd_migration_test
21 source indices to verify
  search              src=31      tgt=31      alias=OK   acl=n/a
  acl                 src=35      tgt=35      alias=OK   acl=n/a
  scope               src=1       tgt=1       alias=OK   acl=OK
  documentclass       src=28      tgt=28      alias=OK   acl=OK
  document            src=74453   tgt=74453   alias=OK   acl=n/a
  fact                src=169854  tgt=169854  alias=OK   acl=n/a
  ...
Totals: 330918 docs on source, 330918 docs on target (18 types reindexed)
RESULT: SUCCESS — all 18 in-scope indices match (counts + aliases + acl-flatten)
```

It is safe to point the application at the target.

## Needs attention

When at least one index does not match, the report ends with `RESULT: N OK, K issue(s):` and the exit code is non-zero. Read the bottom lines first:

```text
  document            src=74453   tgt=74445   alias=OK   acl=n/a
  virtual_folder      src=13125   tgt=13123   alias=OK   acl=n/a
  fact                src=169854  tgt=169851  alias=OK   acl=n/a
  loginhistory        src=70627   tgt=skipped alias=OK   acl=n/a
  report              src=3                   [out-of-scope: not in OpenSearchType]
Totals: 330918 docs on source, 260284 docs on target
Source indices out of tool scope (NOT migrated):
  [report (3 docs), content (0 docs), version (0 docs)]
Orphan docs on source (would not be reindexed unless --reindex-orphans=true):
  virtual_folder: 2 orphan doc(s) (classid not in virtualfolderclass)
  document:       8 orphan doc(s) (classid not in documentclass)
RESULT: 15 OK, 3 issue(s):
  - virtual_folder: count mismatch (src=13125, tgt=13123, delta=2)
  - document:       count mismatch (src=74453, tgt=74445, delta=8)
  - fact:           count mismatch (src=169854, tgt=169851, delta=3)
```

How to read it:

| Line                              | Means                                                            |
| --------------------------------- | ---------------------------------------------------------------- |
| `loginhistory   tgt=skipped`      | Login history was not opted in : expected, not a failure         |
| `report   [out-of-scope]`         | An index the tool does not know about : listed for visibility, not migrated |
| `Orphan docs on source: ...`      | Documents whose class no longer exists. Re-run with `--reindex-orphans=true` to migrate them |
| `count mismatch ( ... delta=3)`   | The target is short of the source by `delta` documents : investigate before continuing |
| `RESULT: N OK, K issue(s)`        | At least one index needs investigation before deeming the migration done |

# Production checklist

1. **Target cluster prep** : add the source `host:port` to `reindex.remote.allowlist` (restart if added).
2. **Source cluster prep** : make it reachable from the target; pass source credentials if secured.
3. **Index settings tuning** : `--tune-settings=true` is the default (refresh + replicas disabled during the reindex, restored after). No manual `curl` step is needed.
4. **Time expectations** : production-scale timing depends heavily on the cluster (shard count, network between source and target, hardware). The dominant cost is the largest single source class, so watch it in the live log, and run `--dry-run` first for a count preview before committing.
5. **Post-migration validation** : open `migration-report-*.txt`, expect `RESULT: SUCCESS`, investigate any `issue(s):` block, then smoke-test the application (log in, search, open a document). If anything fails, drop the target indices and re-run, since the tool is idempotent.

# Re-running a migration

Re-running the same command on an already-migrated scope is a safe no-op:

- existing indices are kept,
- documents are overwritten by id (server-side de-duplication),
- the report is regenerated.

No manual cleanup is required between runs. By design, the bootstrap step is idempotent and documents are overwritten by id, so a run that was interrupted can be restarted with the same command; recovery scenarios specific to your operations runbook should still be validated in your own environment.
