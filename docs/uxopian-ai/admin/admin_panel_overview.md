---
title: Admin panel overview
sidebar_label: Overview
sidebar_position: 1
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 08b294484588744f061874d232f3de3c5cd8653226342900860ea42294444a47
---

The admin panel is the `<admin-element>` web component embedded in the Uxopian AI interface. It provides a UI for managing LLM providers, prompts, users, and viewing usage statistics. All operations are performed per-tenant via the Admin REST API.

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
| `apiEndpoint` | string | Base URL for the uxopian-ai Admin REST API (e.g., `https://your-gateway/api/v1`) |
| `getAccessToken` | function | Optional callback function that returns the current access token |

Add the element to the page after loading the script:

```html
<admin-element apiendpoint="https://your-gateway/api/v1"></admin-element>
```

In the default Docker Compose quickstart, the admin UI is accessible via the gateway at `http://localhost:8085`.

## Admin panel sections

The admin panel uses React Router with the following routes:

| Route | Section | Description |
|---|---|---|
| `/` | Dashboard | Summary statistics |
| `/prompts` | Prompts | List, create, edit, and delete prompts |
| `/prompts/:id` | Prompt detail | Edit prompt content, flags, model overrides, and Quick Prompt display settings |
| `/llm-providers` | LLM providers | List, create, edit, and delete LLM provider configurations |
| `/llm-providers/:id` | Provider detail | Edit provider credentials, endpoint, temperature, and model list |
| `/scripts` | Scripts | List, create, and manage admin-managed scripts |
| `/scripts/:id` | Script detail | Edit, scan, and publish a script |
| `/users` | Users | View user list with conversation counts |
| `/users/:id` | User detail | View a user's conversation history |
| `/statistics` | Statistics | Usage charts: time series, LLM distribution, feature adoption |

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
- [Managing LLM providers](./managing_llm_providers.md)
- [Managing prompts](./managing_prompts.md)
- [Managing scripts](./managing_scripts.md)
- [Managing users](./managing_users.md)
- [Monitoring statistics](./monitoring_statistics.md)
- [REST API summary](../reference/rest_api.md)
