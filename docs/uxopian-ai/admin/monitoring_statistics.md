---
title: Monitoring statistics
sidebar_label: Statistics
sidebar_position: 4
last_update:
  date: '2026-03-24T12:58:17.027Z'
  author: CI/CD Bot
content_hash: bb86521a14acb8939d840d2f1e6e3dc3de1ef744d59020470860c8e1cc5014c1
---

The statistics section of the admin panel displays usage metrics for the current tenant. Data is read from OpenSearch via the Stats API (`/api/v1/admin/stats`).

## Available statistics

### Global stats

The dashboard shows aggregated totals:

- Total conversations
- Total requests
- Total tokens (input + output)
- Estimated time saved

Fetched from `GET /api/v1/admin/stats/global`.

### Time series

Activity over time, aggregated by interval (hour, day, week, month). Shows request counts over the selected period.

Fetched from `GET /api/v1/admin/stats/timeseries?interval=DAY`.

Supported intervals: `HOUR`, `DAY`, `WEEK`, `MONTH`.

### LLM distribution

A breakdown of which LLM models were used for requests, shown as counts per model name.

Fetched from `GET /api/v1/admin/stats/llm-distribution`.

### Feature adoption

Shows which features are used (e.g., tool calls, prompt types, goal usage).

Fetched from `GET /api/v1/admin/stats/feature-adoption`.

### Top prompts

Lists the most frequently used prompts by request count.

Fetched from `GET /api/v1/admin/stats/top-prompts`.

## Metrics export to OpenSearch

Uxopian AI exports custom metrics to OpenSearch via the Micrometer Elastic exporter, configured in `metrics.yml`. The default index is `micrometer-metrics`. Standard JVM, HTTP, and system metrics are disabled by default to reduce noise.

To enable additional metrics, edit `metrics.yml`:

```yaml
management:
  metrics:
    enable:
      jvm: true       # Enable JVM metrics
      http: true      # Enable HTTP request metrics
```

## Actuator endpoints

Three actuator endpoints are exposed over HTTP:

| Endpoint | Path | Description |
|---|---|---|
| Health | `/actuator/health` | Application health (public) |
| Info | `/actuator/info` | Build and version info |
| Loggers | `/actuator/loggers` | View and change log levels at runtime |

The health endpoint is public in the default gateway configuration. Other actuator endpoints should be protected in production.

## Related pages

- [Admin panel overview](./admin_panel_overview.md)
- [Configuration file reference](../reference/configuration.md)
