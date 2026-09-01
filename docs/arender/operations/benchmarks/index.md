---
title: Performance benchmarks
slug: /operations/benchmarks
sidebar_position: 1
description: "Reference performance figures for the ARender Rendition backend. Each release is benchmarked on the same infrastructure profile to (1) detect regressions between versions and (2) provide a sizing reference for the Rendition tier."
---

# Performance benchmarks

This section publishes validated performance figures for the **ARender Rendition backend**, captured under sustained load on a reference infrastructure profile. Each benchmark serves two purposes:

1. **Non-regression check** — confirm that a new release performs at least as well as the previous one on the same infrastructure, with the same scenario, at the same load.
2. **Rendition-tier sizing reference** — for the reference infrastructure described, give the maximum sustained document throughput at which the Rendition backend serves all requests within target latency.

All reports cover the shared **ARender Rendition backend**, which powers both ARender Classic (GWT) and ARender Horizon (React) — the figures apply to both viewers.

:::caution Scope reminder
These benchmarks measure **the Rendition backend in isolation** — broker, converter, renderer, text handler. End-to-end performance in your own deployment also depends on the UI tier, your document source connector (DMS, ECM, S3, …), network, and authentication path. Use these numbers as a *Rendition-tier sizing reference*, not as a guaranteed end-to-end throughput. Each tier of your deployment must be sized independently for the same target user load.
:::

## Layout

Reports are grouped by major-version line in the sidebar:

- **[v2026 reports](./v2026/v2026.0.0.md)** — current shipping major.
- **[v2023 reports](./v2023/v2023.19.0.md)** — previous major; kept as historical reference and as the baseline of the v2026 comparison.
- **[Major version comparisons](./comparisons/v2026-vs-v2023.md)** — published only when a new major line ships, comparing the new major against the last public minor of the previous line at the time of release.

When a new minor (e.g. v2026.1.0) ships, a new per-version report joins its major-line folder — comparisons stay limited to the major-line jump.

## Available reports

### v2026 reports

| Report | Test date | Reference throughput |
|---|---|---|
| [ARender 2026.0.0](./v2026/v2026.0.0.md) | April 2026 | **~32,000 documents/hour** at 0% errors on the reference infrastructure (three-node Kubernetes, 8 vCPU / 32 GB RAM per worker), global P99 240 ms |

### v2023 reports

| Report | Test date | Reference throughput |
|---|---|---|
| [ARender 2023.19.0](./v2023/v2023.19.0.md) | April 2026 | **~32,000 documents/hour** at 0% errors on the same reference infrastructure, global P99 269 ms |

### Major version comparisons

| Comparison | Versions | Test date | Verdict |
|---|---|---|---|
| [ARender 2026 vs 2023](./comparisons/v2026-vs-v2023.md) | v2026.0.0 vs v2023.19.0 | April 2026 | **No regressions.** −77% on document layout P99 (1,656 → 377 ms); −11% on global P99; 0% errors on both at ~32,000 docs/hour |

## How to use these benchmarks

Each report is a **reference point** for the Rendition tier on a specific infrastructure profile, not a deployment guarantee. Real-world performance also depends on document mix, page count distribution, the UI tier, the connector, and the network.

To use them effectively:

- **Sizing**: combine the reference throughput with your expected busy-hour document rate. `Rendition tier sized for ≈ docs-per-hour ÷ docs-per-user-per-hour` active users. Size the other tiers (UI, connector, DMS) independently for the same user count.
- **Comparing your own deployment**: capture your own P50/P95/P99 figures via the [Monitoring and observability](../monitoring.md) page and compare against the reference figures here.
- **Validating an upgrade**: use the major-version comparison to confirm no regression for your workload before rolling out.

## Methodology

All benchmarks share the same per-document request sequence to keep version-over-version comparisons meaningful:

1. Open the document by URL
2. Retrieve the document layout (page count, dimensions)
3. Fetch three rendered page images
4. Fetch twenty thumbnail images
5. Retrieve text content for three pages
6. Evict the document from the cache

This sequence reproduces the typical end-user flow when opening, browsing, and closing a document in the viewer. Each run uses Gatling in closed-injection mode, lasting one hour at the stated concurrency level.
