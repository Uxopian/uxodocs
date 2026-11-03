---
title: Dashboard
sidebar_label: Dashboard
sidebar_position: 2
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 1ba1159addef4b04acd195eb1db77ccfda36ac232b9d3a5036b72c6b2723c679
---

The dashboard is the landing page of the admin panel (route `/`). It greets the signed-in user, shows the tenant, and gives administrators a summary of the tenant's activity over the last week. The other sections are reached from the navigation rail, not from the dashboard.

![The admin dashboard with summary cards, activity charts, and LLM usage distribution](../images/dashboard.png)

*Figure: the dashboard.*

## Greeting

The page heading reads *Hi* followed by your user ID, with your tenant ID as subtitle. They come from `GET /api/v1/users/me`, which returns the `id` and `tenantId` of the authenticated caller.

## Week at a glance

Four tiles summarize the last week:

| Tile | Description |
|---|---|
| Requests this week | Number of LLM requests processed, with a sparkline |
| Tokens this week | Sum of input and output tokens, with a sparkline. Since 2026.0.0 it counts every completion of a tool-calling loop, not only the last one |
| Time saved this week | Time saved across all prompts, with a sparkline |
| Most used model | The model that served the most requests |

## Activity and distribution

- **Activity**: two charts, *Requests per day* and *Tokens per day*.
- **Distribution**: the LLM usage breakdown by model, and the top prompts by time saved.

Both sections use the same Stats API endpoints as the full [Statistics](./monitoring_statistics.md) page, with a `WEEK` interval.

```mermaid
graph TD
    A[Dashboard] --> B[Greeting<br/>user and tenant]
    A --> C[Week tiles<br/>Requests / Tokens / Time saved / Top model]
    A --> D[Activity<br/>Requests per day / Tokens per day]
    A --> E[Distribution<br/>LLM usage / Top prompts]
```

*Figure: Dashboard layout.*

## Resource links

The **Documentation** and **Swagger UI** links are at the bottom of the navigation rail. Swagger UI opens the interactive API explorer; its address is resolved from the `swaggerEndpoint` attribute of the admin element when set, then from `apiEndpoint`, then from the address the panel is served at. Set `swaggerEndpoint` to aim the link at the gateway Ingress.

## Related pages

- [Admin panel overview](./admin_panel_overview.md)
- [Monitoring statistics](./monitoring_statistics.md)
