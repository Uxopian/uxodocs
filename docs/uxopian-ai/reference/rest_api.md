---
title: REST API summary
sidebar_label: REST API
sidebar_position: 3
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 1516a5054eaabf3c2a3a679a6b061abf661991d6020f6a8584a6903e220abf91
---

Summary of all REST API endpoints exposed by `uxopian-ai`. All endpoints are accessible via the gateway at the configured base path. An interactive API explorer (Swagger UI) is available at `/swagger-ui/index.html`.

## Base path

All endpoints use the base path `/api/v1`. Requests go through the gateway; replace `https://your-gateway` with your gateway URL.

## Error responses

Since 2026.0.0-ft4, every non-2xx response returns a structured JSON body instead of a plain-text message:

```json
{
  "code": "LLM_PROVIDER_NOT_FOUND",
  "message": "LLM provider 'xyz' not found.",
  "status": 404
}
```

| Field | Type | Description |
|---|---|---|
| `code` | string | Stable, machine-readable error code |
| `message` | string | Human-readable description |
| `status` | number | HTTP status code (also reflected in the response status line) |

Common error codes and their HTTP status:

| `code` | Status | Raised when |
|---|---|---|
| `BAD_REQUEST` | 400 | Malformed or invalid request |
| `LLM_BAD_REQUEST` | 400 | The LLM rejected the request |
| `MISSING_TENANT` | 400 | No tenant resolved from the request |
| `MISSING_USER` | 400 | No user resolved from the request |
| `UNAUTHORIZED` | 401 | Authentication/authorization failed (e.g. requesting an undeployed script) |
| `NOT_FOUND` / `FILE_NOT_FOUND` / `RESOURCE_NOT_FOUND` | 404 | Entity, file, or resource not found |
| `LLM_PROVIDER_NOT_FOUND` | 404 | Referenced LLM provider does not exist |
| `MCP_SERVER_NOT_FOUND` | 404 | Referenced MCP server does not exist |
| `NOT_IMPLEMENTED` | 405 | Operation not supported |
| `CONFLICT` | 409 | Duplicate entity (e.g. creating an LLM provider or script with an existing ID) |
| `LLM_CAPABILITY_ERROR` | 422 | The selected model lacks a required capability (multimodal, function calling) |
| `TOOL_CYCLES_EXCEEDED` | 422 | The tool-calling loop exceeded its maximum number of cycles |
| `SCAN_CONFIGURATION_ERROR` | 422 | The script security scan is not configured |
| `OPENSEARCH_UNAVAILABLE` | 503 | OpenSearch is unreachable |
| `INTERNAL_ERROR` | 500 | Unhandled server error |

:::caution Migrating from a previous version
Clients that previously parsed the plain-text error body must now read the `message` field from the JSON object. Some statuses also changed — notably, **creating a duplicate LLM provider now returns `409 Conflict`** (previously `400`).
:::

## User endpoints

### Requests — `/api/v1/requests`

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/requests` | Send one or more requests in a conversation. Returns the request with the LLM response. |
| `POST` | `/api/v1/requests/stream` | Send a request and stream the response (used by the chat and Quick Prompt). |
| `POST` | `/api/v1/requests/retry/stream` | Retry a request and stream the response. |
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
| `GET` | `/api/v1/conversations` | List conversations for the current user (paginated). Optional `search` query param filters by title. |
| `GET` | `/api/v1/conversations/{id}` | Get a conversation by ID. |
| `DELETE` | `/api/v1/conversations/{id}` | Delete a conversation. |

### Prompts (user) — `/api/v1/prompts`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/prompts` | List prompts available to the current user. |
| `GET` | `/api/v1/prompts/{id}` | Get a prompt by ID. |
| `GET` | `/api/v1/prompts/display` | List the display settings of prompts enabled for Quick Prompt (never exposes template content or LLM configuration). |

### Files — `/api/v1/files`

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/files` | Upload a file. |
| `GET` | `/api/v1/files/{id}` | Download a file by ID. |

### Scripts — `/api/v1/scripts`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/scripts/{id}` | Serve a deployed script as `application/javascript` (`401` if never deployed). Supports `ETag` / `304`. |
| `GET` | `/api/v1/scripts/{id}/draft` | Serve a script's draft content as `application/javascript` (for preview). |

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
| `GET` | `/api/v1/admin/llm/provider-conf` | List all LLM provider configurations for the current tenant. |
| `POST` | `/api/v1/admin/llm/provider-conf` | Create a new LLM provider configuration. |
| `PUT` | `/api/v1/admin/llm/provider-conf/{id}` | Update a provider configuration. |
| `DELETE` | `/api/v1/admin/llm/provider-conf/{id}` | Delete a provider configuration. |

### Prompts — `/api/v1/admin/prompts`

Since 2026.0.0-ft5, a prompt is one document holding a version history with an explicit draft → publish lifecycle — see [Managing prompts](../admin/managing_prompts.md#rest-api-endpoints) for the full versioned surface (`POST/PUT/DELETE .../{id}/versions[/{version}]`). The un-versioned entry points:

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/prompts` | List all prompts for the current tenant. |
| `POST` | `/api/v1/admin/prompts` | Create a new prompt (initial version). Returns 409 if a prompt with the same ID exists. |
| `GET` | `/api/v1/admin/prompts/{id}` | Get the prompt aggregate — `{id, versions: [...]}` — by ID. |
| `GET` | `/api/v1/admin/prompts/{id}/render` | Render a prompt with a payload (body: `Map<String, Object>`; optional `?version=`). |
| `GET` | `/api/v1/admin/prompts/{id}/statistics` | Get usage statistics for a prompt, aggregated across all versions. |
| `GET` | `/api/v1/admin/prompts/categories` | List distinct Quick Prompt categories currently in use. |
| `DELETE` | `/api/v1/admin/prompts/{id}` | Delete a prompt and all of its versions. `409` if it's a base prompt or referenced by an Application. |

### Scripts — `/api/v1/admin/scripts`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/scripts` | List all scripts for the current tenant. |
| `GET` | `/api/v1/admin/scripts/{id}` | Get a script by ID. |
| `POST` | `/api/v1/admin/scripts` | Create a script (name only). Returns `409` if the name exists. |
| `PUT` | `/api/v1/admin/scripts/{id}` | Update the draft content. |
| `POST` | `/api/v1/admin/scripts/{id}/scan` | Run the LLM security scan. |
| `POST` | `/api/v1/admin/scripts/{id}/publish` | Publish a certified draft. |
| `POST` | `/api/v1/admin/scripts/{id}/force-publish` | Publish the draft without scanning. |
| `DELETE` | `/api/v1/admin/scripts/{id}/draft` | Discard the draft. |
| `DELETE` | `/api/v1/admin/scripts/{id}` | Delete the script (`204 No Content`). |

### MCP servers — `/api/v1/admin/mcp`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/mcp/mcp-conf` | List MCP server configurations for the current tenant. |
| `GET` | `/api/v1/admin/mcp/mcp-conf/{id}` | Get an MCP server configuration. |
| `POST` | `/api/v1/admin/mcp/mcp-conf` | Register an MCP server. |
| `PUT` | `/api/v1/admin/mcp/mcp-conf/{id}` | Update an MCP server configuration. |
| `GET` | `/api/v1/admin/mcp/mcp-conf/{id}/tools` | List the tools exposed by an MCP server (connection test). |

### Users — `/api/v1/admin/users`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/users/statistics` | List users with conversation, token, and request statistics. |
| `GET` | `/api/v1/admin/users/details?userId={id}` | Get details (stats + conversations) for a specific user. |

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
| `GET` | `/api/v1/admin/stats/top-prompts-time-saved` | Top prompts by cumulative time saved. |

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
- [Managing scripts](../admin/managing_scripts.md)
- [Conversations and requests](../understanding/conversations_and_requests.md)
- [Prompts and templating](../understanding/prompts_and_templating.md)
- [Authentication and gateway](../understanding/authentication.md)
