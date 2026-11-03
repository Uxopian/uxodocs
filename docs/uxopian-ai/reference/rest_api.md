---
title: REST API summary
sidebar_label: REST API
sidebar_position: 3
last_update:
  date: '2026-10-19T18:21:35.722Z'
  author: CI/CD Bot
content_hash: bc47b2e6df16d9be465992d227142ef66e1c105e9dc0cc355ab42fe0ade53964
---

Summary of all REST API endpoints exposed by `uxopian-ai`. All endpoints are accessible via the gateway at the configured base path. An interactive API explorer (Swagger UI) is available at `/swagger-ui/index.html`.

## Base path

All endpoints use the base path `/api/v1`. Requests go through the gateway; replace `https://your-gateway` with your gateway URL.

## Pagination, filters and facets

Since 2026.0.0, every admin list is **paginated on the server** and answers a page of summaries instead of a bare JSON array:

```json
{
  "collection": [ { "id": "invoice-extractor" } ],
  "total": 42,
  "facets": { "model": ["gpt-5.1", "claude-sonnet"] }
}
```

| Query parameter | Description |
|---|---|
| `offset` | Index of the first item (0 or more). Default `0`. |
| `limit` | Page size (1 or more). Default `20` on the admin lists. |
| `orderBy` | Column to sort on. Without it the list keeps its own order. An unknown column answers `400` and names the valid ones. |
| `ascending` | `true` or `false`. |

- `offset + limit` must not exceed **10 000**, otherwise the call answers `400` ("narrow the filters instead"). `total` stays exact beyond that number.
- Items are **summaries** (for instance a script without its code, a plan execution without its node outputs, an agent with its secrets masked). Fetch the full entity with `GET …/{id}`. There is no switch to get full entities from a list.
- Each list takes its own **filters**, as query parameters (a repeatable one may be given several times); `search` exists on every list:

  | List | Filters |
  |---|---|
  | Prompts | `model`, `quick`, `tag`, `workspaceId` |
  | Plans | `agentId`, `usedBy`, `workspaceId` |
  | Plan executions | `planId`, `status`, `workspaceId` |
  | Scripts | `status`, `workspaceId` |
  | Agent configurations | `objective`, `usedBy`, `workspaceId` |
  | MCP servers | `transport`, `enabled`, `workspaceId` |
  | LLM providers | `provider`, `model`, `hasApiKey`, `workspaceId` |
  | Usage profiles | `provider`, `model` |
  | Code modules | `state` (`PUBLISHED`, `DRAFT`, `UNPUBLISHED`), `tool`, `usedBy` |
  | Users statistics | `search` (a term in the user id) |

  The Swagger UI of each endpoint is the authoritative list.
- `workspaceId` is accepted, and repeatable, on the lists of workspace-scoped entities (prompts, plans, agents, MCP servers, LLM providers, scripts, plan runs, conversations, requests — admin and user routes). No value keeps every workspace; `default` also keeps the entities that belong to no workspace.
- `facets` holds, for each filter, the values it can take over the whole list, to build filter pickers.
- Sorting on `name` is refused on scripts, MCP servers, usage profiles and code modules, which are identified by `id` alone.

Malformed typed identifiers in a path or query string (a space, a slash) answer `400` naming the parameter.

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
| `PAYLOAD_TOO_LARGE` | 413 | An inline `base64` file exceeds `llm.inline.max-size` (default 5 MB); nothing is stored. Also raised by the Tasks API when a payload exceeds `task.max-payload-bytes`. |
| `LLM_CAPABILITY_ERROR` | 422 | The selected model lacks a required capability (multimodal, function calling, document input — `documentSupported`, or streaming for a NuExtract model) |
| `DOCUMENT_TOO_LARGE` | 422 | A document exceeds `llm.document.max-size` (default 20 MB) or the model's `maxDocumentSizeMb` |
| `UNSUPPORTED_FILE` | 422 | The file cannot be read as a document (not a PDF and not convertible to PDF through ARender), or, with `persist`, its extension is not in `file-connector.filesystem.allowed-extensions` |
| `FILE_STORAGE_UNAVAILABLE` | 422 | A file asks to be persisted (or a persisted file is deleted) but the filesystem connector is not configured (`file-connector.filesystem.root`) |
| `TOOL_CYCLES_EXCEEDED` | 422 | The tool-calling loop exceeded its maximum number of cycles |
| `SCAN_CONFIGURATION_ERROR` | 422 | The script security scan is not configured |
| `LLM_QUOTA_EXCEEDED` | 402 | The LLM provider reports an exhausted quota or credit balance. Not retryable: it is a billing or configuration matter. |
| `LLM_RATE_LIMITED` | 429 | The LLM provider is limiting the request rate. Retry later. |
| `LLM_TIMEOUT` | 504 | The LLM provider did not answer in time. Retry later. |
| `MCP_CONNECTION_ERROR` | 502 | An MCP server could not be reached |
| `CODE_SANDBOX_UNAVAILABLE` | 502 | A [code module](#code-modules--apiv1admincode-modules) could not run because the code sandbox is unreachable |
| `OPENSEARCH_UNAVAILABLE` | 503 | OpenSearch is unreachable |
| `INTERNAL_ERROR` | 500 | Unhandled server error |

:::note Quota, rate limit and timeout (2026.0.0)
Provider failures now have their own status, for both the blocking and the streaming endpoints:

- **`402 LLM_QUOTA_EXCEEDED`** — the provider is out of credit. The message is a fixed sentence (the provider's own text only goes to the server log, so keys or organization ids it may echo never reach the client). Clients that treated every `5xx` as retryable must not retry a `402`.
- **`429 LLM_RATE_LIMITED`** (previously `400 LLM_BAD_REQUEST` "Token limit exceeded") and **`504 LLM_TIMEOUT`** (previously `500 INTERNAL_ERROR`) can be retried later.
- A streaming request that fails **before** the LLM call (no provider, a conversation that is not yours, a quota error before the first token…) now answers with its HTTP status (`404`, `402`, `422`…) instead of opening a `200` stream carrying an error. A failure in the middle of an answer ends the stream.
:::

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

`GET /api/v1/requests` returns request **summaries** (no `contextPayload`); fetch `GET /api/v1/requests/{request_id}` for the whole request. Besides `conversation` it accepts the [pagination parameters](#pagination-filters-and-facets) and `workspaceId`.

:::caution No request-level model override
Since 2026.0.0, `POST /api/v1/requests` takes no query parameter: `llm_provider`, `llm_model`, `temperature` and `reasoning` are ignored, and the web component option `executeRequest(payload, {llm_provider, llm_model})` is gone. The provider and model of a turn come from the **prompt** it runs, otherwise from the [usage profile](#usage-profiles--apiv1adminusage-profiles) of the calling surface. There is no fallback on `llm.default.*` at call time: without a provider on the prompt or the profile, the call fails.
:::

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
        { "type": "base64", "value": "data:image/png;base64,<data>" },
        { "type": "document", "file": { "connector": "request", "part": "contract" } }
      ]
    }
  ]
}
```

**Content types:**

| `type` | Carries | Description |
|---|---|---|
| `text` | `value` | Plain text. |
| `prompt` | `value` (prompt ID), optional `version`, `payload` | A prompt rendered server-side. |
| `base64` | `value` (data URL) | An inline file of **any** type (it replaces the former `image` type, which is no longer accepted). Limited by `llm.inline.max-size` (default 5 MB, `413 PAYLOAD_TOO_LARGE`). |
| `document` | `file` | A reference to a file held by a [file connector](#file-references): an uploaded part (`request`), `filesystem`, `flowerdocs`, `filenet` or `alfresco`. |

The content of a stored request never carries the inline file data. Each content states its `mimeType`, its `size` and, while it is kept, a `fileId`; `expired` is `true` once the retention period has removed it. Read the file with `GET /api/v1/requests/{request_id}/inputs/{input}/contents/{content}` (positions of the input in the request and of the content in the input; the admin twin lives under `/api/v1/admin/requests/…`). It serves both inline data and attachments (an attachment is served as the PDF the model read).

#### Sending files with a request

`POST /api/v1/requests` and `POST /api/v1/requests/stream` also accept `multipart/form-data`: the request JSON goes in a part named `request`, and each file in its own part, named by the `part` of a `document` content (`{"connector":"request","part":"<part name>"}`).

- A PDF is sent to the model as is; any other file is rendered to PDF through ARender, otherwise the call answers `422 UNSUPPORTED_FILE`. Native PDF input is read by OpenAI, Anthropic, Gemini, Bedrock and Mistral models; other providers refuse it.
- The model must be flagged `documentSupported` (default `false`, set in the model parameters of the LLM provider), otherwise `422 LLM_CAPABILITY_ERROR` is answered before any provider call. Size limits: `llm.document.max-size` (default 20 MB) and the per-model `maxDocumentSizeMb`, both `422 DOCUMENT_TOO_LARGE`.
- The files are kept with the request, in a tenant-scoped store, for `llm.files.retention` (default 1 day, `0` keeps nothing). A retry re-sends them to the model while they are kept. Deleting a request or a conversation deletes its files.
- With **`"persist": true`** on a `request` file reference, the file is instead stored as received, with no retention, through the filesystem connector (`<root>/<tenant>/<conversation>/<uuid>-<name>`), and the stored request then carries a `filesystem` reference that other features can reuse. It answers `422 FILE_STORAGE_UNAVAILABLE` when the filesystem connector is not configured. A retry keeps persisted files; deleting the request or the conversation removes them.

#### File references

A file is referenced by an object whose `connector` field names the file connector that holds it:

| `connector` | Fields |
|---|---|
| `request` | `part` (required); read-only `name`, `mimeType`, `size`; optional `persist` |
| `filesystem` | `path` (under the tenant folder of `file-connector.filesystem.root`) |
| `flowerdocs` | `documentId`, optional `fileId`, `version` |
| `filenet` | `objectId`, optional `className` |
| `alfresco` | `nodeId` |

Plugins can add their own reference types.

### Conversations — `/api/v1/conversations`

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/conversations` | Create a new conversation. |
| `GET` | `/api/v1/conversations` | List conversations for the current user (paginated). Optional `search` query param filters by title; `workspaceId` (repeatable) filters by workspace. |
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
| `GET` | `/api/v1/users/me` | The identity the service trusts for the caller: `{ "id": "...", "tenantId": "..." }`. Works behind the gateway with its signed `X-Gateway-Auth` assertion. |

### Files — `/temp-files` and `/api/v1/files`

| Method | Path | Description |
|---|---|---|
| `GET` | `/temp-files/{fileKey}` | Download a temporary file by its key (files produced by a tool or an agent run). |
| `DELETE` | `/api/v1/files/filesystem?path={path}` | Delete a file persisted with one of **your own** requests (`persist: true`; the path is the one of its `filesystem` reference). `204`; `404` if no file of your conversations has this path; `422 FILE_STORAGE_UNAVAILABLE` if the filesystem connector is not configured. |

There is **no separate upload endpoint**: files enter a conversation either as `base64` content items or as parts of a multipart request — see [Sending files with a request](#sending-files-with-a-request).

### Tasks — `/api/v1/tasks`

The task queue behind the human review screen. Tasks are tenant-scoped; the caller is the holder of a reservation. A task is `{ id, type, status, tags, payload, reservation }`, with `status` one of `PENDING`, `OK`, `KO`, and a `reservation` of `{ reservedBy, reservedAt, expiresAt }` (epoch milliseconds). A lapsed reservation reads as free.

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/tasks` | List tasks as summaries (document, counts of pending / accepted / corrected values), paginated, oldest first by default. Filters: `status` (repeatable), `type`, `tag` (repeatable, all must match), `search` (document name or id, tags, extracted values). `orderBy`: `document`, `status`, `touched`, `created`. |
| `GET` | `/api/v1/tasks/export` | Export the matching tasks as CSV (one line per extracted value), same filters, `orderBy` and `ascending`. Every match is streamed, with no row ceiling; the `X-Task-Count` header gives the number of tasks. Cells starting with `=`, `+`, `-`, `@`, tab or carriage return are prefixed with a quote. |
| `GET` | `/api/v1/tasks/filter-counts` | Status and tag counts, each ignoring its own filter. |
| `POST` | `/api/v1/tasks` | Create a task (`201`). `413` if the payload exceeds `task.max-payload-bytes`. |
| `GET` | `/api/v1/tasks/{id}` | Get a whole task (`404` if unknown). |
| `POST` | `/api/v1/tasks/{id}/reserve` | Reserve the task for the caller for `task.reservation-seconds`. `409` if held by someone else or already done. |
| `POST` | `/api/v1/tasks/{id}/release` | Release the caller's reservation. `409` if not held by the caller. |
| `PUT` | `/api/v1/tasks/{id}/payload` | Replace the payload; the caller must hold the reservation. `413` above the size limit. |
| `POST` | `/api/v1/tasks/{id}/complete` | Complete the task — body `{ "status": "OK" }` or `{ "status": "KO" }`. |
| `POST` | `/api/v1/tasks/{id}/rendition` | Render the task's document: the server reads it through its file connector as the caller, uploads it to ARender and answers `{ "id": "..." }`. |

The payload type available today is `FIELD_LEVEL_VALIDATION`: the `document` to review and its `extractionItems`, each with its `result`, `userInput`, `reviewStatus` (`PENDING`, `OK`, `KO`), `confidence`, `provenance` and `evidences` (page number and position of the value on the page).

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
| `GET` | `/api/web-components/viewer/script` | Review screen (`viewer-element`) bundle. |
| `GET` | `/api/web-components/viewer/style` | Review screen stylesheet. |
| `GET` | `/api/web-components/**` | Any other static asset referenced by those bundles (fonts, chunks). |

### Pages and relays — `/admin`, `/viewer`, `/rendition`

Not under `/api/v1` either. Your gateway routes must let them through if you use the matching feature (see [Configure gateway routes](../how_to/configure_gateway_routes.md)).

| Path | Description |
|---|---|
| `/admin`, `/viewer` | The admin console and the human review screen (HTML pages). They are served with a strict `Content-Security-Policy` (`frame-ancestors 'none'`, no inline script) and `X-Frame-Options: DENY`, so they cannot be framed: embed the web components instead. |
| `/rendition/**` | Relay to ARender (`rendition.base-url`), behind the same gateway authentication; only content headers are forwarded, never cookies, tokens or identity headers. `404` if no base URL is configured, `502` if ARender is unreachable. The review screen reaches ARender through it. |

## Admin endpoints

All admin endpoints require the requesting user to have the necessary role if role-based security is configured on the gateway.

Every admin **list** (`GET` on a collection) answers a [paginated page of summaries](#pagination-filters-and-facets), and every creation API has a `GET …/availability?id={id}` check that answers `true` when the ID is free and `false` when it is taken or blank.

### LLM providers — `/api/v1/admin/llm`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/llm/providers` | List all available provider type names. |
| `GET` | `/api/v1/admin/llm/providers/{name}/extra-params` | Get extra parameter descriptors for a provider type. |
| `GET` | `/api/v1/admin/llm/provider-conf` | List the LLM provider configurations of the current tenant (paginated summaries, secrets masked, with what runs on each model). |
| `GET` | `/api/v1/admin/llm/provider-conf/{id}` | Get one provider configuration, with its API key masked. |
| `GET` | `/api/v1/admin/llm/provider-conf/{id}/usage` | What runs on this provider, model by model. |
| `POST` | `/api/v1/admin/llm/provider-conf/{id}/test` | Test the provider with its key, optionally for one model (`?model=`). This is what the admin LLM provider tester calls. |
| `POST` | `/api/v1/admin/llm/provider-conf` | Create a new LLM provider configuration. |
| `PUT` | `/api/v1/admin/llm/provider-conf/{id}` | Update a provider configuration. |
| `DELETE` | `/api/v1/admin/llm/provider-conf/{id}` | Delete a provider configuration. |

### Prompts — `/api/v1/admin/prompts`

Since 2026.0.0-ft5, a prompt is one document holding a version history with an explicit draft → publish lifecycle — see [Managing prompts](../admin/managing_prompts.md#prompt-detail-page) for what that lifecycle means in the admin UI.

**The prompt itself:**

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/prompts` | List the prompts of the current tenant (paginated). Each item holds the active version and the draft, whole, with its usage and tags, but not the other versions. Sorted by id unless `orderBy` is `quick`, `model` or `timeSaved`. |
| `GET` | `/api/v1/admin/prompts/availability?id={id}` | Whether a new prompt can take this ID (`true` / `false`). |
| `POST` | `/api/v1/admin/prompts` | Create a new prompt with its initial version, v0 (`201`). `409` if a prompt with the same ID exists. |
| `GET` | `/api/v1/admin/prompts/{id}` | Get the prompt detail: `active` and `draft` versions whole, the list of `versions` as summaries (version number, draft flag, created/updated by and at), `tags` and `workspaceId`. |
| `GET` | `/api/v1/admin/prompts/{id}/render` | Render the active version, or the one given by `?version=`. Takes an optional JSON payload in the request body (`Map<String, Object>`). |
| `GET` | `/api/v1/admin/prompts/{id}/statistics` | Get usage statistics for a prompt, aggregated across all versions. |
| `GET` | `/api/v1/admin/prompts/{id}/usage` | Whether the prompt is deletable, and what uses it (`usedBy`: usage profiles and agents, as `"usage-profile Support"`, `"agent reader"`). It replaces the former `referencedBy` list of Application names. |
| `GET` | `/api/v1/admin/prompts/categories` | List distinct Quick Prompt categories currently in use. |
| `GET` | `/api/v1/admin/prompts/tags` | List the distinct administration tags in use. |
| `PUT` | `/api/v1/admin/prompts/{id}/tags` | Replace the administration tags of a prompt (a list of strings; `404` if unknown). Tags are not versioned: they belong to the prompt and are shared by all its versions. |
| `DELETE` | `/api/v1/admin/prompts/{id}` | Delete a prompt and all of its versions (`204`). `409` if it's a base prompt or referenced by a usage profile or an agent (as its objective). |

**Versions — the draft → publish lifecycle:**

A prompt has at most **one draft** at a time, and the draft is the only writable version: every published version is read-only, and any write targeting one is rejected with `409 Conflict`.

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/prompts/{id}/versions/{version}` | Get one specific version, whole. The list of versions is part of `GET /api/v1/admin/prompts/{id}`. |
| `POST` | `/api/v1/admin/prompts/{id}/versions` | Create the draft — the next version (`201`). `409` if a draft already exists. |
| `PUT` | `/api/v1/admin/prompts/{id}/versions/{version}` | Edit the draft (`draft:true` in the body) or publish it (`draft:false`). `409` if the target isn't the draft. |
| `DELETE` | `/api/v1/admin/prompts/{id}/versions/{version}` | Discard the draft (`204`), keeping published versions intact. `409` if the target isn't the draft. |
| `GET` | `/api/v1/admin/prompts/{id}/versions/{version}/statistics` | Usage statistics for a single version. |

A version carries `createdAt`, `createdBy`, `updatedAt` and `updatedBy`, stamped by the server (values sent by the client are ignored). Its `temperature` is a number between 0 and 2 (`400` otherwise), and its `outputSchema`, when set, is a JSON Schema (an object with a `type`) used as the response format of every conversation that runs the prompt. A version's `defaultLlmProvider` and `defaultLlmModel` decide which model answers (see [Requests](#requests--apiv1requests)).

Publishing archives the previously-published version rather than deleting it, so restoring an older wording means re-publishing its content as a new version — there is no endpoint that reactivates an old version number in place. A draft can also be exercised by real callers before it goes live, by setting `version` on a `type: prompt` content item in a normal request (see [Conversations and requests](../understanding/conversations_and_requests.md#content-types)).

### Usage profiles — `/api/v1/admin/usage-profiles`

Since 2026.0.0, **Applications are called usage profiles** and the former `/api/v1/admin/application/application-conf` routes are gone, with no compatibility layer. Existing Applications are not migrated: re-create them as usage profiles. See [Managing usage profiles](../admin/managing_applications.md).

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/usage-profiles` | List the usage profiles of the current tenant (paginated). |
| `GET` | `/api/v1/admin/usage-profiles/{id}` | Get one usage profile. |
| `GET` | `/api/v1/admin/usage-profiles/availability?id={id}` | Whether a new usage profile can take this ID (`true` / `false`). |
| `POST` | `/api/v1/admin/usage-profiles` | Create a usage profile from the `id` given in the body (`201`; `409` if the ID exists). A usage profile requires a default LLM provider and model. |
| `PUT` | `/api/v1/admin/usage-profiles/{id}` | Update a usage profile. |
| `DELETE` | `/api/v1/admin/usage-profiles/{id}` | Delete a usage profile (`204`). |

The calling surface is identified by the **`X-Usage-Profile-Id`** header (formerly `X-Application-Id`).

### Agent configurations — `/api/v1/admin/agent`

The reusable agent configurations referenced by `AGENT` nodes in a Plan — see [Managing Plans](../admin/managing_plans.md).

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/agent/agent-conf` | List the agent configurations of the current tenant (paginated summaries: secrets masked, plans running each agent). |
| `GET` | `/api/v1/admin/agent/agent-conf/{id}` | Get one agent configuration. |
| `GET` | `/api/v1/admin/agent/agent-conf/{id}/usage` | The plans that run this agent. |
| `GET` | `/api/v1/admin/agent/agent-conf/availability?id={id}` | Whether a new agent configuration can take this ID (`true` / `false`). |
| `POST` | `/api/v1/admin/agent/agent-conf` | Create an agent configuration (`201`). `400` if invalid, if the title already exists or if it has **no `objective`** (the prompt that tells the agent what to do; an existing agent without one must be given one before its next save). |
| `PUT` | `/api/v1/admin/agent/agent-conf/{id}` | Update an agent configuration. |
| `DELETE` | `/api/v1/admin/agent/agent-conf/{id}` | Delete an agent configuration (`204`). |

### Plans — `/api/v1/admin/plans`

Since 2026.0.0-ft5. See [Agentic Plans](../understanding/agentic_plans.md).

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/plans` | List the Plan definitions of the current tenant (paginated summaries: step count, agents and plans called, callers). |
| `GET` | `/api/v1/admin/plans/{id}` | Get one Plan definition. |
| `GET` | `/api/v1/admin/plans/availability?id={id}` | Whether a new Plan can take this ID (`true` / `false`). |
| `POST` | `/api/v1/admin/plans` | Create a Plan (`201`). `400` if invalid or the title already exists. |
| `PUT` | `/api/v1/admin/plans/{id}` | Update a Plan. |
| `DELETE` | `/api/v1/admin/plans/{id}` | Delete a Plan (`204`). |

### Plan executions — `/api/v1/admin/plan-executions`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/plan-executions` | List main (non-nested) executions, newest first (paginated summaries, without node outputs, tool calls or input); nested runs are reachable through their parent. |
| `GET` | `/api/v1/admin/plan-executions/{id}` | Get one execution, including every node's state. Poll this for progress. |
| `POST` | `/api/v1/admin/plan-executions/run` | Create and immediately start an execution — body `{ "planId": "...", "inputPayload": { ... } }` (`202`). |
| `POST` | `/api/v1/admin/plan-executions/{id}/signal` | Drive a run — body `{ "type": "PAUSE" }`, `{ "type": "RESUME" }` or `{ "type": "STOP" }`. `PAUSE` requests a cooperative pause (in-flight nodes finish first); `RESUME` restarts from persisted state without re-running terminal nodes and needs no payload; `STOP` cancels permanently (`CANCELLED`), keeping the partial trace. Returns the execution. `400` on a missing or unknown type, `404` if unknown, `409` if the state does not allow the signal. A nested run is driven through the run that started it. |
| `DELETE` | `/api/v1/admin/plan-executions/{id}` | Delete an execution record (`204`). |

:::caution Replaces `/pause`, `/resume` and `/stop`
Since 2026.0.0, the three endpoints `POST /api/v1/admin/plan-executions/{id}/pause`, `/resume` and `/stop` no longer exist: use `/signal`.
:::

### Tools — `/api/v1/admin/tools`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/tools` | List every registered tool — native tools and [code modules](#code-modules--apiv1admincode-modules) that expose a tool — with its name, description and call type (`LOCAL` for a native tool, `CODE` for a code module). It feeds the tool pickers in the admin UI. |

### Scripts — `/api/v1/admin/scripts`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/scripts` | List the scripts of the current tenant (paginated summaries, without code). |
| `GET` | `/api/v1/admin/scripts/{id}` | Get a script by ID. |
| `GET` | `/api/v1/admin/scripts/availability?id={id}` | Whether a new script can take this ID (`true` / `false`). |
| `POST` | `/api/v1/admin/scripts` | Create a script from its ID only (`{"id": "my-script"}`). Returns `409` if the ID exists. |
| `PUT` | `/api/v1/admin/scripts/{id}` | Update the draft content. |
| `POST` | `/api/v1/admin/scripts/{id}/scan` | Run the LLM security scan. |
| `POST` | `/api/v1/admin/scripts/{id}/publish` | Publish a certified draft. |
| `POST` | `/api/v1/admin/scripts/{id}/force-publish` | Publish the draft without scanning. |
| `DELETE` | `/api/v1/admin/scripts/{id}/draft` | Discard the draft. |
| `DELETE` | `/api/v1/admin/scripts/{id}` | Delete the script (`204 No Content`). |

### MCP servers — `/api/v1/admin/mcp`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/mcp/mcp-conf` | List the MCP server configurations of the current tenant (paginated summaries, with the usage profiles and agents that expose each). |
| `GET` | `/api/v1/admin/mcp/mcp-conf/{id}` | Get an MCP server configuration. |
| `GET` | `/api/v1/admin/mcp/mcp-conf/{id}/usage` | The usage profiles and agents that expose this MCP server. |
| `GET` | `/api/v1/admin/mcp/mcp-conf/availability?id={id}` | Whether a new MCP server can take this ID (`true` / `false`). |
| `POST` | `/api/v1/admin/mcp/mcp-conf` | Register an MCP server under the `id` given in the body. |
| `PUT` | `/api/v1/admin/mcp/mcp-conf/{id}` | Update an MCP server configuration. |
| `DELETE` | `/api/v1/admin/mcp/mcp-conf/{id}` | Delete an MCP server configuration (`204`). |
| `GET` | `/api/v1/admin/mcp/mcp-conf/{id}/tools` | List the tools exposed by an MCP server (connection test). |

### Users — `/api/v1/admin/users`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/users/statistics` | List users with conversation, token, and request statistics (paginated; `search` looks for a term in the user ID). |
| `GET` | `/api/v1/admin/users/details?userId={id}` | Get the statistics of one user. Their conversations come from `GET /api/v1/admin/conversations?userId={id}`. |

### Conversations (admin) — `/api/v1/admin/conversations`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/conversations` | List all conversations for the current tenant (paginated). Filters: `userId`, `workspaceId` (repeatable). |
| `GET` | `/api/v1/admin/conversations/{conversation_id}` | Get any conversation by ID, regardless of owner. |
| `DELETE` | `/api/v1/admin/conversations/{conversation_id}` | Delete any conversation by ID. Its persisted files are deleted too. |

### Requests (admin) — `/api/v1/admin/requests`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/requests` | List the requests of a conversation as summaries, without `contextPayload` (paginated). Query params: `conversation` (required), `workspaceId`. |
| `GET` | `/api/v1/admin/requests/{request_id}` | Get any request by ID, whole. It carries the `toolCalls` of the turn: for each tool called, its type, name, arguments, result or error, and start and end. |
| `GET` | `/api/v1/admin/requests/{request_id}/inputs/{input}/contents/{content}` | Read the file of an inline or attached content (same as the user route). |
| `DELETE` | `/api/v1/admin/requests/{request_id}` | Delete any request by ID. |

### Files (admin) — `/api/v1/admin/files`

| Method | Path | Description |
|---|---|---|
| `DELETE` | `/api/v1/admin/files/filesystem?path={path}` | Delete any file of the tenant's filesystem connector folder (`204`; `404`; `422 FILE_STORAGE_UNAVAILABLE` if the connector is not configured). |

### Statistics — `/api/v1/admin/stats`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/stats/global` | Global aggregated statistics (totals). |
| `GET` | `/api/v1/admin/stats/timeseries` | Activity time series. Query param: `interval` (DAY, HOUR, WEEK, MONTH). |
| `GET` | `/api/v1/admin/stats/llm-distribution` | LLM model usage distribution. |
| `GET` | `/api/v1/admin/stats/feature-adoption` | Feature adoption statistics. |
| `GET` | `/api/v1/admin/stats/top-prompts-time-saved` | Top prompts by cumulative time saved. |

### Code modules — `/api/v1/admin/code-modules`

JavaScript libraries and tools that run in the **uxopian-code-sandbox** service. A module has a published version (the only one that runs) and an optional draft; it can be imported by other modules and, when it declares a `tool` section, called as a tool by plans, agents and (if `exposeInChat`) the chat. Execution needs `code-sandbox.url` — see [Configuration](./configuration.md#code-sandbox).

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/code-modules` | List the code modules (paginated summaries, without code, with their usage). |
| `GET` | `/api/v1/admin/code-modules/availability?id={id}` | Whether a new module can take this ID. The ID is also the name importers use and the tool name, and is checked against native tools, MCP tools, modules and plans. |
| `GET` | `/api/v1/admin/code-modules/{id}` | Get one module. |
| `GET` | `/api/v1/admin/code-modules/{id}/usage` | The modules that import it and the plans and agents that use it. |
| `POST` | `/api/v1/admin/code-modules` | Create a module (`201`). |
| `PUT` | `/api/v1/admin/code-modules/{id}` | Update the draft. |
| `POST` | `/api/v1/admin/code-modules/{id}/publish` | Publish the draft; records `publishedAt` and `publishedBy`. |
| `DELETE` | `/api/v1/admin/code-modules/{id}/draft` | Discard the draft (`409` if there is none or the module was never published). |
| `POST` | `/api/v1/admin/code-modules/test` | Run a module as the editor does, calling `run(input)`. |
| `DELETE` | `/api/v1/admin/code-modules/{id}` | Delete a module. `409` while another module imports it or a plan or agent permission uses it. |

A module that cannot reach the sandbox answers `502 CODE_SANDBOX_UNAVAILABLE`.

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

Since 2026.0.0, the spec is split into one group per resource — Agents, Code modules, Conversations, Files, LLM providers, MCP servers, Plans, Prompts, Requests, Scripts, Statistics, Tasks, Tools, Usage profiles and Users — each with its admin and user operations, at `/v3/api-docs/<group name>` (the group name, URL-encoded). The former `/v3/api-docs/Admin` and `/v3/api-docs/User` groups no longer exist: tooling that pulled them (SDK generation, gateway allow-lists, contract tests) must switch to `/v3/api-docs` or to a group.

## Related pages

- [Admin panel overview](../admin/admin_panel_overview.md)
- [Managing prompts](../admin/managing_prompts.md)
- [Managing usage profiles](../admin/managing_applications.md)
- [Managing Plans](../admin/managing_plans.md)
- [Managing scripts](../admin/managing_scripts.md)
- [Conversations and requests](../understanding/conversations_and_requests.md)
- [Prompts and templating](../understanding/prompts_and_templating.md)
- [Authentication and gateway](../understanding/authentication.md)
