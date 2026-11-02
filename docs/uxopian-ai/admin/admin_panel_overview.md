---
title: Admin panel overview
sidebar_label: Overview
sidebar_position: 1
last_update:
  date: '2026-06-08T13:36:22.304Z'
  author: CI/CD Bot
content_hash: 4fbd78261b4f43dd9ac3a2a2337cb15de1c4292c00c87054a1c09975d6dca098
---

The admin panel is the `<admin-element>` web component embedded in the Uxopian AI interface. It provides a UI for managing prompts, LLM providers, MCP servers, usage profiles, scripts, code modules, agents and plans, for browsing users and conversations, and for viewing usage statistics. Since 2026.0.0 it has a redesigned look, shared with the chat and Quick Prompt components. All operations are performed per-tenant via the Admin REST API.

## Accessing the admin panel

The admin element is loaded from the web component bundles served by uxopian-ai. The admin script and style are available at:

| Asset | Endpoint |
|---|---|
| Admin JavaScript | `/api/web-components/admin/script` |
| Admin CSS | `/api/web-components/admin/style` |

To embed the admin panel:

```html
<link rel="stylesheet" href="https://your-gateway/api/web-components/admin/style" />
<script src="https://your-gateway/api/web-components/admin/script"></script>
```

The `<admin-element>` custom element accepts the following attributes:

| Attribute | Type | Description |
|---|---|---|
| `basePath` | string | Base path for React Router routing inside the element |
| `apiEndpoint` | string | Base URL of the gateway/DNS host serving uxopian-ai, **without** the `/api/v1` suffix (e.g., `https://your-gateway`). The component appends `/api/v1` itself. |
| `swaggerEndpoint` | string | Optional address of the Swagger UI the *Swagger UI* link opens. Resolution order: `swaggerEndpoint`, then `apiEndpoint`, then the address the panel is served at. Set it to aim the link at the gateway Ingress |
| `getAccessToken` | function | Optional callback function that returns the current access token |

Add the element to the page after loading the script:

```html
<admin-element apiendpoint="https://your-gateway"></admin-element>
```

In the default Docker Compose quickstart, the admin UI is accessible via the gateway at `http://localhost:8085`.

## Navigation and layout

The navigation is a **collapsible rail** on the left, always visible: the toggle at its bottom (or the `[` key) switches between icons only and icons with labels, and group titles show only when it is expanded. The theme toggle is in the same place. Each page owns its title and subtitle, and a back link (a breadcrumb trail only from the third level) returns to the list you came from, scrolled where you left it.

The sections of the rail:

| Group | Entry | Route | Description |
|---|---|---|---|
| Overview | Dashboard | `/` | [Summary statistics](./dashboard.md) |
| AI | Prompts | `/prompts`, `/prompts/:id` | [Prompts](./managing_prompts.md): versions, model, answer format and Quick Prompt display settings |
| AI | LLM providers | `/llm-providers`, `/llm-providers/:id` | [Provider configurations](./managing_llm_providers.md): credentials, endpoint, models |
| AI | MCP servers | `/mcp-servers`, `/mcp-servers/:id` | [MCP servers](./managing_mcp_servers.md) |
| AI | Usage profiles | `/usage-profiles`, `/usage-profiles/:id` | [Usage profiles](./managing_applications.md) (called *Applications* before 2026.0.0): defaults and permissions per usage surface |
| AI | Scripts | `/scripts`, `/scripts/:id` | [Admin-managed scripts](./managing_scripts.md) |
| AI | Code modules | `/code-modules`, `/code-modules/:id` | JavaScript modules and tools run in the code sandbox |
| Agents | Agents | `/agents`, `/agents/:id` | Agent configurations used by [plans](./managing_plans.md): objective prompt, success criteria, permissions |
| Agents | Plans | `/plans`, `/plans/:id` | [Plans](./managing_plans.md): flow editor and runs |
| Review | Review tasks | `/viewer` | Human review screen; opens in a new tab |
| Analytics | Users | `/users`, `/users/:id` | [Users](./managing_users.md) and their conversations |
| Analytics | Statistics | `/statistics` | [Usage charts](./monitoring_statistics.md): time series, LLM distribution, feature adoption |
| Resources | Documentation, Swagger UI | external | Opens the documentation site and the API explorer |

Creation pages live under `/<section>/new/edit`.

## Working with lists and detail pages

All list pages work the same way:

- **Server-side pagination, search, filters and sorting.** Only one page of entries is fetched at a time, so large collections stay reachable (the Applications, Agents and Plans lists used to stop at 25 entries). The matching REST endpoints answer a page `{ collection, total, facets }` — see the [REST API summary](../reference/rest_api.md).
- **Columns** can be resized by dragging, hidden and reordered; the layout is remembered. An empty list keeps its table header.
- **A single click opens a quick view** of the entity, the up and down arrow keys walk through the list, and **a double-click opens the entity for editing** (on the Users list it opens the user detail).
- **An "Used by" column** names the entities that reference each entry; an unused one shows a dash.
- **Names are checked while you type.** Every entity is identified by its name alone, and the creation form reports a name that is already taken before you save (`GET .../availability?id=`).

Detail pages share one layout: a title with badges, an action bar with the primary action, secondary actions and a "..." menu (for example *Reset*, *Discard draft*, *Delete*), then foldable cards that show a one-line summary once filled in. The editor warns before you leave a page with unsaved changes, and deleting an entity you just edited does not ask you to save first.

The admin console is served with a strict Content-Security-Policy (no inline script, no `eval`) and cannot be framed: embed it through the `<admin-element>` web component, not an `<iframe>`.

## Authorization

In the default gateway configuration, the admin API routes (`/api/v1/admin/**`) are marked public. For production deployments, restrict them by adding a `roles` rule:

```yaml
app:
  routes:
    - id: uxopian-ai
      security:
        - path: /api/v1/admin/**
          roles: ["ADMIN"]
```

The `roles` field requires that the authenticated user's role list (from `X-User-Roles`) includes the specified role.

## Related pages

- [Dashboard](./dashboard.md)
- [Managing usage profiles](./managing_applications.md)
- [Managing plans](./managing_plans.md)
- [Managing MCP servers](./managing_mcp_servers.md)
- [Managing LLM providers](./managing_llm_providers.md)
- [Managing prompts](./managing_prompts.md)
- [Managing scripts](./managing_scripts.md)
- [Managing users](./managing_users.md)
- [Monitoring statistics](./monitoring_statistics.md)
- [REST API summary](../reference/rest_api.md)
