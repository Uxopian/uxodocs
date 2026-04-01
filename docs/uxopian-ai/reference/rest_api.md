---
title: REST API summary
sidebar_label: REST API
sidebar_position: 3
last_update:
  date: '2026-03-24T12:58:17.027Z'
  author: CI/CD Bot
content_hash: 015cef5dc6ef77399b5d5bae1eeb1c48137e8e541cd22891921d29d4afe9fa22
---

Summary of all REST API endpoints exposed by `uxopian-ai`. All endpoints are accessible via the gateway at the configured base path. An interactive API explorer (Swagger UI) is available at `/swagger-ui/index.html`.

## Base path

All endpoints use the base path `/api/v1`. Requests go through the gateway; replace `https://your-gateway` with your gateway URL.

## User endpoints

### Requests — `/api/v1/requests`

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/requests` | Send one or more requests in a conversation. Returns the request with the LLM response. |
| `GET` | `/api/v1/requests/{requestId}` | Retrieve a request by ID. |
| `DELETE` | `/api/v1/requests/{requestId}` | Delete a request. |
| `PUT` | `/api/v1/requests/{requestId}/feedback` | Attach feedback to a request. |
| `POST` | `/api/v1/requests/{requestId}/retry` | Retry a failed request. |

**POST /api/v1/requests query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `conversationId` | string | Attach request to an existing conversation |
| `provider` | string | Override LLM provider for this request |
| `model` | string | Override LLM model for this request |
| `disableReasoning` | boolean | Disable tool calls for this request |

**Request body schema (Request):**

```json
{
  "conversation": "optional-conversation-id",
  "inputs": [
    {
      "role": "user",
      "content": [
        { "type": "text", "value": "Hello" },
        { "type": "prompt", "value": "promptId", "payload": { "key": "value" } },
        { "type": "goal", "value": "goalGroupId", "payload": { "key": "value" } },
        { "type": "image", "value": "<base64>" }
      ]
    }
  ]
}
```

### Conversations — `/api/v1/conversations`

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/conversations` | Create a new conversation. |
| `GET` | `/api/v1/conversations` | List conversations for the current user (paginated). |
| `GET` | `/api/v1/conversations/{id}` | Get a conversation by ID. |
| `DELETE` | `/api/v1/conversations/{id}` | Delete a conversation. |

### Prompts (user) — `/api/v1/prompts`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/prompts` | List prompts available to the current user. |
| `GET` | `/api/v1/prompts/{id}` | Get a prompt by ID. |

### Files — `/api/v1/files`

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/files` | Upload a file. |
| `GET` | `/api/v1/files/{id}` | Download a file by ID. |

### Web component config — `/api/v1/webcomponent`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/webcomponent` | Returns configuration for the web component (prompts available, endpoints). |

## Admin endpoints

All admin endpoints require the requesting user to have the necessary role if role-based security is configured on the gateway.

### LLM providers — `/api/v1/admin/llm`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/llm/providers` | List all available provider type names. |
| `GET` | `/api/v1/admin/llm/providers/{name}/extra-params` | Get extra parameter descriptors for a provider type. |
| `GET` | `/api/v1/admin/llm` | List all LLM provider configurations for the current tenant. |
| `POST` | `/api/v1/admin/llm` | Create a new LLM provider configuration. |
| `PUT` | `/api/v1/admin/llm/{id}` | Update a provider configuration. |
| `DELETE` | `/api/v1/admin/llm/{id}` | Delete a provider configuration. |

### Prompts — `/api/v1/admin/prompts`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/prompts` | List all prompts for the current tenant. |
| `POST` | `/api/v1/admin/prompts` | Create a new prompt. Returns 409 if a prompt with the same ID exists. |
| `PUT` | `/api/v1/admin/prompts` | Update an existing prompt. |
| `GET` | `/api/v1/admin/prompts/{id}` | Get a prompt by ID. |
| `GET` | `/api/v1/admin/prompts/{id}/render` | Render a prompt with a payload (body: `Map<String, Object>`). |
| `GET` | `/api/v1/admin/prompts/{id}/usages` | Get usage statistics for a prompt. |
| `DELETE` | `/api/v1/admin/prompts/{id}` | Delete a prompt. |

### Goals — `/api/v1/admin/goals`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/goals` | List all goal groups for the current tenant. |
| `POST` | `/api/v1/admin/goals` | Create a new goal group. |
| `PUT` | `/api/v1/admin/goals/{id}` | Update a goal group. |
| `GET` | `/api/v1/admin/goals/{id}` | Get a goal group by ID. |
| `DELETE` | `/api/v1/admin/goals/{id}` | Delete a goal group. |

### Users — `/api/v1/admin/users`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/users` | List users with conversation statistics (paginated). |
| `GET` | `/api/v1/admin/users/{userId}` | Get details for a specific user. |

### Conversations (admin) — `/api/v1/admin/conversations`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/conversations` | List all conversations for the current tenant (paginated). |

### Requests (admin) — `/api/v1/admin/requests`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/requests` | List all requests for the current tenant (paginated). |

### Statistics — `/api/v1/admin/stats`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/stats/global` | Global aggregated statistics (totals). |
| `GET` | `/api/v1/admin/stats/timeseries` | Activity time series. Query param: `interval` (DAY, HOUR, WEEK, MONTH). |
| `GET` | `/api/v1/admin/stats/llm-distribution` | LLM model usage distribution. |
| `GET` | `/api/v1/admin/stats/feature-adoption` | Feature adoption statistics. |
| `GET` | `/api/v1/admin/stats/top-prompts` | Most frequently used prompts. |

### Templating — `/api/v1/admin/templating`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/templating` | Templating operations (details via Swagger UI). |

## Health and info

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/actuator/health` | Public | Application health check |
| `GET` | `/actuator/info` | Configured | Build info |
| `GET` | `/actuator/loggers` | Configured | Logger level management |

## WebSocket

| Path | Protocol | Description |
|---|---|---|
| `/ws/{userId}` | WebSocket | Real-time streaming channel per user |

## API explorer

The Swagger UI is available at:

```
http://localhost:8085/swagger-ui/index.html
```

The OpenAPI spec is at `/v3/api-docs`. Both paths are served as public in the default gateway configuration.

## Related pages

- [Admin panel overview](../admin/admin_panel_overview.md)
- [Conversations and requests](../understanding/conversations_and_requests.md)
- [Prompts and templating](../understanding/prompts_and_templating.md)
- [Authentication and gateway](../understanding/authentication.md)
