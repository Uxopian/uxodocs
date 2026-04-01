---
title: Dashboard
sidebar_label: Dashboard
sidebar_position: 2
last_update:
  date: '2026-04-01T00:00:00.000Z'
  author: CI/CD Bot
content_hash: admin-dashboard-2026-04-01
---

The dashboard is the landing page of the admin panel (route `/`). It gives administrators a summary of tenant activity and direct access to each management section.

## Stats cards

Four cards are displayed at the top with sparkline charts:

| Card | Description |
|---|---|
| Total requests | Number of LLM requests processed |
| Conversations | Number of distinct conversations |
| Total tokens | Sum of input and output tokens |
| Time saved | Cumulative time saved across all prompts (hours) |

Data is fetched from `GET /api/v1/admin/stats/global`.

## Activity charts

Below the stats cards, two charts show recent activity:

- **Time series**: request volume over recent days.
- **LLM distribution**: model usage breakdown by provider.

Both charts use the same Stats API endpoints as the full [Statistics](./monitoring_statistics.md) page, with a default `DAY` interval.

```mermaid
graph TD
    A[Dashboard] --> B[Stats cards<br/>Requests / Conversations /<br/>Tokens / Time saved]
    A --> C[Activity charts<br/>Time series / LLM distribution]
    A --> D[Feature cards]
    D --> D1[Prompts]
    D --> D2[LLM Providers]
    D --> D3[Users]
    D --> D4[Statistics]
    A --> E[Resource links]
    E --> E1[Documentation site]
    E --> E2[Swagger UI]
```

*Figure: Dashboard layout and navigation targets.*

## Feature cards

A grid of cards links to the admin sections:

| Card | Section | Target route |
|---|---|---|
| Prompts | AI | `/prompts` |
| LLM Providers | AI | `/llm-providers` |
| Users | Analytics | `/users` |
| Statistics | Analytics | `/statistics` |

## Resource links

Two external links are displayed at the bottom of the feature grid:

- **Documentation**: opens the product documentation site.
- **Swagger UI**: opens the interactive API explorer at the configured API endpoint (`/swagger-ui/index.html`).

## Related pages

- [Admin panel overview](./admin_panel_overview.md)
- [Monitoring statistics](./monitoring_statistics.md)
