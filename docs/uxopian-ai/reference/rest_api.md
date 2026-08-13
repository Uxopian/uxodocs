---
title: REST API summary
sidebar_label: REST API
sidebar_position: 3
last_update:
  date: '2026-08-13T14:14:52.477Z'
  author: CI/CD Bot
content_hash: 30c1062d5932dcc1f5812366529e5ec3b1e3aebea4babf1940d0fb6149d1a663
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
| `POST` | `/api/v1/requests` | Send one or more requests in a conversation (`201`). Returns the request with the LLM response. |
| `POST` | `/api/v1/requests/stream` | Send a request and stream the response as SSE (used by the chat and Quick Prompt). |
| `POST` | `/api/v1/requests/retry` | Regenerate the last response of the conversation named in the body (`201`). |
| `POST` | `/api/v1/requests/retry/stream` | Same, streamed as SSE. |
| `GET` | `/api/v1/requests` | List the requests of a conversation (paginated). Query param: `conversation`. |
| `GET` | `/api/v1/requests/{request_id}` | Retrieve a request by ID. |
| `DELETE` | `/api/v1/requests/{request_id}` | Delete a request. |
| `PUT` | `/api/v1/requests/{request_id}/feedback/{feedback}` | Attach feedback to a request — the value is a path segment, `GOOD` or `BAD`. |

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
| `GET` | `/api/v1/conversations/{conversation_id}` | Get a conversation by ID. |
| `DELETE` | `/api/v1/conversations/{conversation_id}` | Delete a conversation. |
| `POST` | `/api/v1/conversations/{conversation_id}/stop` | Stop the generation in progress on that conversation. |

### Prompts (user) — `/api/v1/prompts`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/prompts` | List prompts available to the current user. |
| `GET` | `/api/v1/prompts/display` | List the display settings of prompts enabled for Quick Prompt (never exposes template content or LLM configuration). |

### Users (user) — `/api/v1/users`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/users/details` | Details of the currently authenticated user. |

### Files — `/temp-files`

| Method | Path | Description |
|---|---|---|
| `GET` | `/temp-files/{fileKey}` | Download a temporary file by its key (files produced by a tool or an agent run). |

There is **no upload endpoint**: files and images enter a conversation as base64 content items on a request (`{ "type": "image", "value": "<base64>" }`), not through a separate `POST`.

### Scripts — `/api/v1/scripts`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/scripts/{id}` | Serve a deployed script as `application/javascript` (`401` if never deployed). Supports `ETag` / `304`. |
| `GET` | `/api/v1/scripts/{id}/draft` | Serve a script's draft content as `application/javascript` (for preview). |

### Web component assets — `/api/web-components`

Not under `/api/v1` — these serve the built web-component bundles themselves. See [Web components](../understanding/web_components.md).

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/web-components/chat/script` | Chat web component bundle (JavaScript). |
| `GET` | `/api/web-components/chat/style` | Chat web component stylesheet. |
| `GET` | `/api/web-components/quick-prompt/script` | Quick Prompt bundle. |
| `GET` | `/api/web-components/quick-prompt/style` | Quick Prompt stylesheet. |
| `GET` | `/api/web-components/admin/script` | Admin panel bundle. |
| `GET` | `/api/web-components/admin/style` | Admin panel stylesheet. |
| `GET` | `/api/web-components/**` | Any other static asset referenced by those bundles (fonts, chunks). |

## Admin endpoints

All admin endpoints require the requesting user to have the necessary role if role-based security is configured on the gateway.

### LLM providers — `/api/v1/admin/llm`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/llm/providers` | List all available provider type names. |
| `GET` | `/api/v1/admin/llm/providers/{name}/extra-params` | Get extra parameter descriptors for a provider type. |
| `GET` | `/api/v1/admin/llm/provider-conf` | List all LLM provider configurations for the current tenant. |
| `GET` | `/api/v1/admin/llm/provider-conf/{id}` | Get one provider configuration, with its API key masked. |
| `POST` | `/api/v1/admin/llm/provider-conf` | Create a new LLM provider configuration. |
| `PUT` | `/api/v1/admin/llm/provider-conf/{id}` | Update a provider configuration. |
| `DELETE` | `/api/v1/admin/llm/provider-conf/{id}` | Delete a provider configuration. |

### Prompts — `/api/v1/admin/prompts`

Since 2026.0.0-ft5, a prompt is one document holding a version history with an explicit draft → publish lifecycle — see [Managing prompts](../admin/managing_prompts.md#prompt-detail-page) for what that lifecycle means in the admin UI.

**The prompt itself:**

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/prompts` | List all prompts for the current tenant. |
| `POST` | `/api/v1/admin/prompts` | Create a new prompt with its initial version, v0 (`201`). `409` if a prompt with the same ID exists. |
| `GET` | `/api/v1/admin/prompts/{id}` | Get the prompt aggregate — `{id, versions: [...]}` — by ID. |
| `GET` | `/api/v1/admin/prompts/{id}/render` | Render the active version, or the one given by `?version=`. Takes an optional JSON payload in the request body (`Map<String, Object>`). |
| `GET` | `/api/v1/admin/prompts/{id}/statistics` | Get usage statistics for a prompt, aggregated across all versions. |
| `GET` | `/api/v1/admin/prompts/{id}/usage` | Whether the prompt is deletable, and which Applications reference it. |
| `GET` | `/api/v1/admin/prompts/categories` | List distinct Quick Prompt categories currently in use. |
| `DELETE` | `/api/v1/admin/prompts/{id}` | Delete a prompt and all of its versions (`204`). `409` if it's a base prompt or referenced by an Application. |

**Versions — the draft → publish lifecycle:**

A prompt has at most **one draft** at a time, and the draft is the only writable version: every published version is read-only, and any write targeting one is rejected with `409 Conflict`.

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/prompts/{id}/versions` | List every version of the prompt, ordered by version number. |
| `GET` | `/api/v1/admin/prompts/{id}/versions/{version}` | Get one specific version. |
| `POST` | `/api/v1/admin/prompts/{id}/versions` | Create the draft — the next version (`201`). `409` if a draft already exists. |
| `PUT` | `/api/v1/admin/prompts/{id}/versions/{version}` | Edit the draft (`draft:true` in the body) or publish it (`draft:false`). `409` if the target isn't the draft. |
| `DELETE` | `/api/v1/admin/prompts/{id}/versions/{version}` | Discard the draft (`204`), keeping published versions intact. `409` if the target isn't the draft. |
| `GET` | `/api/v1/admin/prompts/{id}/versions/{version}/statistics` | Usage statistics for a single version. |

Publishing archives the previously-published version rather than deleting it, so restoring an older wording means re-publishing its content as a new version — there is no endpoint that reactivates an old version number in place. A draft can also be exercised by real callers before it goes live, by setting `version` on a `type: prompt` content item in a normal request (see [Conversations and requests](../understanding/conversations_and_requests.md#content-types)).

### Applications — `/api/v1/admin/application`

Since 2026.0.0-ft5. Note the singular `application` base path and the `application-conf` resource segment. See [Managing Applications](../admin/managing_applications.md).

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/application/application-conf` | List all Application configurations for the current tenant. |
| `GET` | `/api/v1/admin/application/application-conf/{id}` | Get one Application configuration. |
| `POST` | `/api/v1/admin/application/application-conf` | Create an Application (`201`). `400` if the configuration is invalid or the name already exists. |
| `PUT` | `/api/v1/admin/application/application-conf/{id}` | Update an Application configuration. |
| `DELETE` | `/api/v1/admin/application/application-conf/{id}` | Delete an Application configuration (`204`). |

### Agent configurations — `/api/v1/admin/agent`

The reusable agent configurations referenced by `AGENT` nodes in a Plan — see [Managing Plans](../admin/managing_plans.md).

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/agent/agent-conf` | List all agent configurations for the current tenant. |
| `GET` | `/api/v1/admin/agent/agent-conf/{id}` | Get one agent configuration. |
| `POST` | `/api/v1/admin/agent/agent-conf` | Create an agent configuration (`201`). `400` if invalid or the title already exists. |
| `PUT` | `/api/v1/admin/agent/agent-conf/{id}` | Update an agent configuration. |
| `DELETE` | `/api/v1/admin/agent/agent-conf/{id}` | Delete an agent configuration (`204`). |

### Plans — `/api/v1/admin/plans`

Since 2026.0.0-ft5. See [Agentic Plans](../understanding/agentic_plans.md).

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/plans` | List all Plan definitions for the current tenant. |
| `GET` | `/api/v1/admin/plans/{id}` | Get one Plan definition. |
| `POST` | `/api/v1/admin/plans` | Create a Plan (`201`). `400` if invalid or the title already exists. |
| `PUT` | `/api/v1/admin/plans/{id}` | Update a Plan. |
| `DELETE` | `/api/v1/admin/plans/{id}` | Delete a Plan (`204`). |

### Plan executions — `/api/v1/admin/plan-executions`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/plan-executions` | List main (non-nested) executions; nested runs are reachable through their parent. |
| `GET` | `/api/v1/admin/plan-executions/{id}` | Get one execution, including every node's state. Poll this for progress. |
| `POST` | `/api/v1/admin/plan-executions/run` | Create and immediately start an execution — body `{ "planId": "...", "inputPayload": { ... } }` (`202`). |
| `POST` | `/api/v1/admin/plan-executions/{id}/pause` | Request a cooperative pause; in-flight nodes finish first. `409` if not `RUNNING`. |
| `POST` | `/api/v1/admin/plan-executions/{id}/resume` | Resume from persisted state without re-running terminal nodes. `409` if not `PAUSED`. |
| `POST` | `/api/v1/admin/plan-executions/{id}/stop` | Stop permanently (`CANCELLED`), keeping the partial trace. `409` if already terminal. |
| `DELETE` | `/api/v1/admin/plan-executions/{id}` | Delete an execution record (`204`). |

### Tools — `/api/v1/admin/tools`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/tools` | List every registered native tool with its name and description — what feeds the tool pickers in the admin UI. |

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
| `DELETE` | `/api/v1/admin/mcp/mcp-conf/{id}` | Delete an MCP server configuration (`204`). |
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
| `GET` | `/api/v1/admin/conversations/{conversation_id}` | Get any conversation by ID, regardless of owner. |
| `DELETE` | `/api/v1/admin/conversations/{conversation_id}` | Delete any conversation by ID. |

### Requests (admin) — `/api/v1/admin/requests`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/requests` | List requests for the current tenant (paginated). Query param: `conversation`. |
| `GET` | `/api/v1/admin/requests/{request_id}` | Get any request by ID. |
| `DELETE` | `/api/v1/admin/requests/{request_id}` | Delete any request by ID. |

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
| `GET` | `/api/v1/admin/templating/completion` | Auto-completion metadata for the template editor: available service helpers and context variables. |

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
- [Managing prompts](../admin/managing_prompts.md)
- [Managing Applications](../admin/managing_applications.md)
- [Managing Plans](../admin/managing_plans.md)
- [Managing scripts](../admin/managing_scripts.md)
- [Conversations and requests](../understanding/conversations_and_requests.md)
- [Prompts and templating](../understanding/prompts_and_templating.md)
- [Authentication and gateway](../understanding/authentication.md)
