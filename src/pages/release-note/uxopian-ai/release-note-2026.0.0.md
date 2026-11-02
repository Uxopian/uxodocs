---
draft: false
title: "Uxopian AI release notes - 2026.0.0"
date: 2026-10-24
version: "2026.0.0"
major_version: "2026"
latest: true
description: "General availability of 2026.0.0: Usage Profiles, code modules, human review of extracted fields, document and PDF inputs, paginated admin APIs, mandatory network policy and internal auth, and a redesigned admin console."
---

# Release Notes: uxopian-ai v2026.0.0

**Release Date:** October 2026
**Version:** 2026.0.0

This is the general availability release of the 2026.0.0 line. It builds on 2026.0.0-ft5 and adds **Usage Profiles** (the former Applications), **code modules** (JavaScript tools and libraries run in a sandbox), a **human review screen** with a task queue for validating extracted fields, **documents and PDFs as model input**, **server-side paginated admin APIs**, a reworked **LLM call resolution**, a **redesigned admin console**, and a reworked **NuExtract** provider. It also hardens the deployment: a **mandatory internal auth secret**, a **mandatory Helm NetworkPolicy**, and a strict Content-Security-Policy.

**This release contains several breaking changes. Read the [Upgrade notes](#-upgrade-notes) before upgrading.**

---

## 🌟 Highlights

### 🏷️ Applications become Usage Profiles (action required)

`ApplicationConf` is renamed `UsageProfile`, with no compatibility layer. The REST path, the request header and the OpenSearch index change, and existing Applications are **not** migrated. See [Upgrade notes](#-upgrade-notes).

### 🧱 Code modules

Write JavaScript tools and shared libraries in the admin console and run them in the `uxopian-code-sandbox`. A module is callable from a plan, an agent, or chat. Opt-in: with no sandbox configured, the feature is off. See [Code modules](/docs/uxopian-ai/how_to/code_modules).

### ✅ Human review

A new **Review** screen (`viewer-element`) and a task queue API (`/api/v1/tasks`) let reviewers accept, correct, or refuse extracted field values next to the source document. See [Human-in-the-loop review](/docs/uxopian-ai/how_to/human_in_the_loop_review).

### 📎 Documents and PDFs as model input

Requests can carry files, as `multipart/form-data` or as typed file references. PDFs are sent natively to OpenAI, Anthropic, Gemini, Bedrock, and Mistral. The `image` content type is renamed `base64` (action required).

### 📄 Paginated admin APIs (action required)

Every admin list now answers a page of summaries (`{ collection, total, facets }`) with server-side search, filters, and sorting instead of a bare array.

### 🎨 Redesigned admin console

The admin console, Chat, and Quick Prompt get a new common look: collapsible navigation rail, uniform detail pages, tabs kept in the URL, resizable tables.

### 🔒 Hardened deployment (action required)

`INTERNAL_AUTH_JWT_SECRET` is required in every deployment, the Helm chart always renders a NetworkPolicy, and the admin console and viewer are served with a strict Content-Security-Policy.

---

## ✨ New features

### 🏷️ Usage Profiles

- `ApplicationConf` is now `UsageProfile`: description, connection provider, system prompt, `defaultLlmProvider`, `defaultLlmModel`, `maxToolCycles`, and the permissions block (tool/MCP/sub-plan whitelist and blacklist, tool tags). The shape is unchanged from the ft5 Application.
- The admin section is now **Usage profiles**; the REST API is `/api/v1/admin/usage-profiles` and the request header is `X-Usage-Profile-Id`.
- `maxToolCycles` is now actually enforced (default 10); previously the loop limit was fixed at 10 regardless of the setting. Agents get an equivalent **Max tool cycles** field.
- A usage profile's prompt **replaces** the default base prompt (`llm.default.base-prompt`) for the call. If the profile prompt is missing or unpublished, the default base prompt is used and a warning is logged.
- A usage profile requires both a provider and a model in the admin.

See [Managing usage profiles](/docs/uxopian-ai/admin/managing_applications).

### 🎯 LLM call resolution

- The provider and model of a turn now come from the **turn's prompt** first, then from the **usage profile** of the calling surface. Temperature, `reasoningDisabled`, and the multimodal and function-calling requirements always come from the prompt.
- The conversation no longer remembers the model: each turn is resolved independently. `Conversation.llmProvider` and `llmModel` remain as "last model used" for display.
- Prompt `temperature` is a number between 0 and 2, validated at save. The default for a new prompt in the admin is 1 (it was 0, which made some reasoning models answer 400).
- `POST /api/v1/admin/llm/provider-conf/{id}/test` tests a provider configuration.
- Agents run on the provider, model, and temperature of their **objective prompt**.

### 🧾 Structured output and success criteria

- A prompt version can declare an **output schema** (field **Response format**), either in a simple notation such as `{ "answer": "string: the answer in one sentence" }` or as a JSON Schema. Any conversation running that prompt receives it as the LLM response format.
- An agent's **success criteria** are now a list. The model gives one verdict per criterion, and the engine derives `SUCCESS`, `UNSATISFIED`, or `FAILURE`. The model no longer self-reports the status. An agent with criteria can therefore end `UNSATISFIED` more strictly than before.

### 🧱 Code modules

- A **code module** is a JavaScript library (what it assigns to `exports` is available to modules that import it) and, when it has a `tool` section, a tool callable from a `DIRECT_TOOL` plan node, an agent, or chat (only if `exposeInChat`, and subject to the usage profile's tool permissions).
- Draft and publish lifecycle: only the published version runs. Edits live in a draft until published; the draft can be discarded. Publication records who and when.
- A **Test** window in the module page runs the module the way the editor sees it. `log(value)` output appears in the tool-call trace and in the plan run detail. `ai.context()` returns the user, tenant, provider, usage profile, conversation, request, and plan run, never the token.
- Execution requires `uxopian-code-sandbox`: configure `code-sandbox.url` and `code-sandbox.secret`. Without `code-sandbox.url`, no code tool is offered. Allowed outbound domains are configured on the sandbox side.
- Deleting a module answers 409 while another module imports it or a plan or agent uses it; `GET /api/v1/admin/code-modules/{id}/usage` lists the users.
- `GET /api/v1/admin/tools` now lists code tools too; each tool carries a call type `LOCAL` or `CODE`.

### ✅ Human review and task queue

- New **Review** screen served at `<app>/viewer` (web component `viewer-element`, bundle at `/api/web-components/viewer/script`). The admin sidebar has a **Review** entry that opens it in a new tab.
- Queue with server-side filter, search, sort, paging, status tiles, and CSV export. Keyboard shortcuts for accept, refuse, correct, put back to pending; `?` lists them. The overlay draws one box per evidence on the document.
- New REST API `/api/v1/tasks`: list, export (CSV), filter counts, create, get, reserve, release, replace payload, complete, and per-task rendition. Reservations default to 900 seconds (`task.reservation-seconds`); payload size is capped by `task.max-payload-bytes` (default 262144).
- uxopian-ai now relays ARender at `<app>/rendition/` to `rendition.base-url` (`RENDITION_BASE_URL`) behind the same authentication, so the browser no longer needs direct access to ARender.
- Your gateway routes must let through `/api/v1/tasks/**`, `/viewer/**`, `/rendition/**`, and `/api/web-components/viewer/**`.
- Task export now streams every matching task: the 10 000-row ceiling is gone, and CSV cells starting with `=`, `+`, `-`, `@`, tab, or carriage return are prefixed with a quote to prevent formula injection.

### 📎 Documents and files in requests

- Content type `image` is renamed **`base64`** (inline data URL of any file type); a new content type **`document`** carries a typed file reference.
- `POST /api/v1/requests` and `/requests/stream` accept `multipart/form-data` (JSON in part `request`, each file in its own part). PDFs are sent as-is; other files are rendered to PDF through ARender, otherwise the call answers 422 `UNSUPPORTED_FILE`.
- A model needs `documentSupported` enabled in its parameters, otherwise the call answers 422 `LLM_CAPABILITY_ERROR` before reaching the provider. Size limits: `llm.document.max-size` (default 20 MB), `maxDocumentSizeMb` per model or provider (422 `DOCUMENT_TOO_LARGE`), and `llm.inline.max-size` (5 MB) for inline base64 (413 `PAYLOAD_TOO_LARGE`).
- Inline file data is no longer returned inside request JSON; fetch it with `GET /api/v1/requests/{request_id}/inputs/{input}/contents/{content}` (admin twin under `/api/v1/admin/requests/...`).
- Files sent with a request are stored for retries in a tenant-scoped index and purged nightly after `llm.files.retention` (default 1 day, `0` keeps nothing). Retries now re-send the file.
- New attachment flag `persist: true` stores the file as received through the filesystem connector (`<root>/<tenant>/<conversation>/<uuid>-<name>`), with no retention. It answers 422 `FILE_STORAGE_UNAVAILABLE` if the filesystem connector is not configured. `DELETE /api/v1/files/filesystem?path=` and `DELETE /api/v1/admin/files/filesystem?path=` delete persisted files.
- **File connectors**: one concept now covers `filesystem`, `flowerdocs`, `filenet`, `alfresco`, and `request` references. The filesystem connector exists only when `file-connector.filesystem.root` (`FILECONNECTOR_FILESYSTEM_ROOT`) is set; `file-connector.filesystem.allowed-extensions` defaults to `pdf,png,jpg,jpeg,tif,tiff`. A misconfigured root (not a folder, unreadable, or not writable) stops the application at startup.
- Helm: new `fileConnector.filesystem.existingClaim`, `mountPath` (`/data/documents`), and `allowedExtensions` values.

### 🔎 Tool calls traced

Every persisted request now carries `toolCalls` (type, name, arguments, result or error, start, end). The admin Conversations view shows a collapsible "Tools used (n)" section, and plan run detail shows the same trace.

### 🧬 NuExtract rework

- With a PDF, NuExtract now runs on the NuMind platform (default endpoint `https://bbox.nuextract.ai`). Two modes: **projectless** (the message starts with a JSON template) and **project** (extra `project` set to a NuMind project id starting with `sprj_`).
- The answer is JSON `{"result": {...}, "localization": {...}}`. The `output` extra selects `values`, `positions`, or `values-and-positions` (default). Positions use `POINTS` or `PAGE_FRACTION` units so the review screen can draw them.
- Other extras: `rasterizationDPI`, `enableThinking`, `thinkingTokenBudget`, `loopDetection`. A job failure now reports NuMind's reason. Streaming is refused (422). **Breaking, see [Upgrade notes](#-upgrade-notes).**

### 🧩 Plans

- New node field **`executionCondition`** (`ON_SUCCESS` default, `ON_UNSATISFIED`, `ON_ERROR`, `ON_ANY`), exposed as a **Runs when** selector, enables recovery branches. A node whose failure is consumed by an `ON_ERROR` or `ON_ANY` branch no longer fails the run.
- New flow tool `throwIfEmptyString(value)` fails when a value is blank, so a plan can branch on "did the step find something".
- Run control is a single `POST /api/v1/admin/plan-executions/{id}/signal` endpoint (**breaking**, see [Upgrade notes](#-upgrade-notes)). A resumed run no longer needs a payload.
- A provider out of quota aborts the whole plan run, and the failed node still records the tokens the provider billed.

### 🗃️ FileNet

- New tools `fileNetFindFolders` (folders whose name contains a text) and `fileNetListSubfolders`. Folder listing and the folder-scoped filter now include subfolders. `fileNetGetDataModel` reports whether full-text search is available. "Contains" filters are case-insensitive.
- New template helper `fileNetService.extractTextualContent(objectId)`.
- ICN plugin: a native **Uxopian AI** cascading submenu in document and folder menus, with actions defined as Uxopian AI scripts through `UxopianAI.registerAction(...)`. Redeploy `uxopian-icn-plugin.zip` to get it.
- The admin console opened from ICN renews its session on its own when it expires, by asking the opener window (requires the matching ICN plugin version).

### 🛠️ For plugin authors

- `@ToolService` accepts a **`guidance`** attribute: the distinct guidance texts of the tools allowed to a call are added once to the conversation system message.
- Destructive tools now ask the model to obtain confirmation through `presentChoices`.
- `ModelProvider` gains two default methods: `quotaExhaustedMarkers()` and `classifyError(Throwable)`. Override `quotaExhaustedMarkers()` so quota errors map to 402.
- The published `integration-api` module now has immutable `AiContext` and `AuthenticatedUser`. **Breaking for custom plugins, see [Upgrade notes](#-upgrade-notes).**

### 🌐 REST API additions

- Server-side **pagination, filters, and facets** on admin lists (see [Improvements](#-platform--improvements) and the upgrade note).
- `GET .../availability?id=<id>` on every creation API tells whether an id is free.
- `GET /api/v1/users/me` returns `{id, tenantId}` of the authenticated caller.
- Usage endpoints: `GET .../{id}/usage` for agents, MCP servers, LLM providers, and code modules.
- Prompt tags: `GET /api/v1/admin/prompts/tags`, `PUT /api/v1/admin/prompts/{id}/tags`.
- OpenAPI groups are now one per type (Agents, Code modules, Conversations, Files, LLM providers, MCP servers, Plans, Prompts, Requests, Scripts, Statistics, Tasks, Tools, Usage profiles, Users).

---

## 🏗️ Platform & improvements

- **Redesigned admin console**: collapsible icon rail, one primary action plus a "..." menu (Reset, Discard draft, Delete), tiered detail pages, back-link navigation, KPI tiles, dark-theme fixes. The dashboard greets the signed-in user and shows the tenant. Chat and Quick Prompt share the same look.
- **Detail-page tab kept in the URL** (`?tab=...`) for Agent, Plan, Usage profile, LLM provider, MCP server, and Prompt pages.
- **Uniform list pages**: server-side search, filters, and sorting; 25 rows per page; resizable columns whose width, order, and visibility are remembered; double-click a row to edit it.
- **Prompt tester**: the Test tab stays reachable while the form is dirty, runs the saved version picked in the version selector, and says so. Variable detection now understands Thymeleaf loops, conditions, ternaries, `[# th:...]` elements, and `[(...)]` inlines.
- **Prompt tags** shown and filterable in the prompts list. Tags are shared by all versions of a prompt. Prompt versions now record who created and updated them.
- **Plan runs**: full-screen flow, shared payload card, step output in the step panel, `?step=<id>` deep link.
- **Token accounting fixed**: counts now include every completion of a tool-calling loop (previously only the last one), and a node whose agent throws still records billed tokens. Statistics for tool-using conversations rise accordingly; historical data is not recomputed.
- **Chat history fix**: `llm.context.size` now loads the N most recent exchanges (it loaded the N oldest, so beyond about 10 turns recent turns never reached the model).
- **Provider error mapping**: a provider out of credit answers `402 LLM_QUOTA_EXCEEDED` (was an opaque 500); a provider rate limit answers `429 LLM_RATE_LIMITED` (was 400); a provider timeout answers `504 LLM_TIMEOUT` (was 500). The message is a fixed text and never echoes the provider payload, which also stops leaking keys or org ids from provider error bodies. Chat and Quick Prompt show that explanation instead of "No response received.".
- **Streaming endpoint** answers the HTTP status before opening the stream when the request fails early (404 `LLM_PROVIDER_NOT_FOUND`, 402, 422, and so on), instead of a 200 that never closed.
- **Content-Security-Policy** on the admin console and viewer (`default-src 'self'`, `frame-ancestors 'none'`, no inline script, no eval), plus `X-Frame-Options: DENY`.
- **Conversation writes throttled**: a conversation is saved only when its provider or model changed or the last activity is older than one minute. Admin "last activity" is accurate to the minute.
- **Swagger link** in the admin resolves `swaggerEndpoint`, then `apiEndpoint`, then the address the panel is served at.
- **Script ETag** is now a hash of id and published content, so browsers no longer keep an old script on 304.

---

## 🐛 Bug fixes

- **Cross-tenant leak fixed in FileNet**: the data-model cache was a single slot shared by all tenants; it is now cached per tenant. Full-text search no longer fails with `FNRCR0040E`.
- **Prompt categories with a space** (for example "Service Requests") no longer make the prompt lists answer 500 for the whole tenant.
- **Re-seeding no longer overwrites customised global prompts.**
- **Chat history of an existing conversation** could never be displayed because the chat called a wrong path; fixed.
- **`window.openChat`** now reopens the requested conversation, and `window.createChat` no longer exposes the never-working `promptId` (see [Upgrade notes](#-upgrade-notes)).
- **Stats intervals** are computed in the JVM time zone, so the latest requests are no longer dropped east of UTC. Per-user request and token counts are fixed (chat requests had no creator).
- **Streamed answer in Quick Prompt** is synced with its own request instead of the previous turn; the panel keeps its style in Picture-in-Picture; the answer bubble no longer overflows.
- **Document viewer**: filesystem documents render again (ARender answered 415), and an extracted value without `confidence` no longer empties the task queue.
- **A script created in the admin** can be edited right away instead of staying on "Saving...".
- **Malformed ids** in paths or queries answer 400 naming the parameter instead of 500.
- **Plan editor**: two nodes added in the same millisecond no longer share an id, which dropped their edges.
- **Thymeleaf editor**: typing `[` then accepting "Expression" no longer produces `[[[${variable}]]`.
- **Permissions editor** keeps individually allowed tools when a tag covering them is added or removed.
- **Deleting a usage profile's prompt** right after deleting the profile no longer answers 409.
- **Date criteria** in FlowerDocs tools are read in UTC.
- **Admin hygiene**: every delete confirms its success, failed list loads show a clear error and retry.
- **Quick Prompt `priority` hint** now correctly says lower numbers show first.
- **`presentChoices`** no longer breaks when an option has no description.
- **The "Reasoning" toggle was removed from the chat composer**, because the backend ignores it.

---

## 🔄 Upgrade notes

### From v2026.0.0-ft5

1. **Mandatory internal auth secret (action required for every non-Helm deployment).** `internal-auth.jwt.secret` (env `INTERNAL_AUTH_JWT_SECRET`) is now required in every profile, dev included. Before, an unset secret meant no verification and bare `X-User-*` headers were trusted. Now ai-standalone **refuses to start** without it. It must be at least 32 bytes and identical to the gateway's `internal-auth.jwt.secret`. Add it to your Docker, Java, and compose configurations. The Helm chart already required it since ft5, and also accepts `appConfig.internalAuth.existingSecret` (a Secret carrying key `INTERNAL_AUTH_JWT_SECRET`) as an alternative to `--set-file`.

2. **Applications are now Usage Profiles (action required).**
   - Before: `/api/v1/admin/application/application-conf[/{id}]`, header `X-Application-Id`, index `application_configurations`.
   - After: `/api/v1/admin/usage-profiles[/{id}]` (flat path), header `X-Usage-Profile-Id`, index `usage_profiles`.
   - **Existing Applications are not migrated.** Re-create them as usage profiles (system prompt, default provider and model, tool whitelist and tags), or let the auto-created default profile be used. Update any gateway configuration, script, or integration that sends `X-Application-Id` or calls the old path. Custom plugin code using `ApplicationConfId` must use `UsageProfileId`.

3. **LLM call resolution changed (action required).**
   - `llm_provider`, `llm_model`, `temperature`, and `reasoning` query parameters on conversation and request endpoints are **ignored** (not rejected). The web-components `executeRequest(payload, {llm_provider, llm_model})` option is gone. Set the provider and model on the prompt or on the usage profile instead.
   - There is **no fallback on `llm.default.*` at call time**. A call with no provider on the prompt or the usage profile fails with "No LLM provider for this call". `llm.default.provider` and `llm.default.model` now only fill the usage profile auto-created for a connection provider.
   - A stored prompt `temperature` outside 0 to 2 is rejected on the next save.
   - An agent no longer carries provider, model, or temperature: they come from its objective prompt.
   - A usage profile's prompt now **replaces** the default base prompt rather than being added to it. If you relied on the base prompt's persona or safety rules, copy them into the profile prompt.

4. **Plan execution control changed (action required for scripts).** `POST /api/v1/admin/plan-executions/{id}/pause`, `/resume`, and `/stop` are removed. Use `POST /api/v1/admin/plan-executions/{id}/signal` with body `{ "type": "PAUSE" | "RESUME" | "STOP" }` (400 on a missing or unknown type, 404 for an unknown execution, 409 when the state does not allow it). Plan executions stored by ft5 keep the old reservation fields and read back as unreserved: **drain or pause running plan executions before upgrading**, otherwise a RUNNING execution may be picked up again by another node.

5. **Admin list endpoints are paginated pages of summaries (action required for REST integrators).**
   - Before: a bare JSON array of full entities.
   - After: `{ "collection": [...], "total": n, "facets": {...} }`, items are summaries. Affected: `GET /api/v1/admin/prompts`, `/plans`, `/plan-executions`, `/scripts`, `/agent/agent-conf`, `/mcp/mcp-conf`, `/llm/provider-conf`, `/usage-profiles`, `/code-modules`, `/users/statistics`. Fetch the full entity with `GET .../{id}`.
   - Parameters: `offset`, `limit` (default 20), `orderBy`, `ascending`. `offset + limit` must stay at or below 10 000 (400 otherwise); an unknown sort column answers 400 listing the valid ones.
   - `GET /api/v1/admin/prompts/{id}` now returns `{ id, active, draft, versions: [...summaries], tags, ... }`. `GET /api/v1/admin/prompts/{id}/versions` (list) and `GET /api/v1/admin/prompts/{id}/tags` are removed; `GET /api/v1/admin/prompts/{id}/versions/{version}` still returns one version. In `GET /api/v1/admin/prompts/{id}/usage`, `referencedBy` is replaced by `usedBy` (usage profiles and agents). Request listings (`GET /requests?conversation=`) return summaries without `contextPayload`.
   - The bundled admin UI is updated.

6. **Entities are identified by `id` alone (action required for REST integrators).** Scripts, MCP servers, usage profiles, and code modules lose their redundant `name` field: create with `id` only, read `id` in responses, and sort with `orderBy=id` (`orderBy=name` answers 400). Stored data needs no action.

7. **Documents and files in requests (action required for REST integrators).**
   - Content `type: "image"` is rejected: send `"base64"`. No automatic migration of existing data is provided: stored `"image"` contents of existing requests are kept as they are, and older conversations with images may not display those images.
   - Inline file data is no longer part of request or conversation JSON: read it from `GET /api/v1/requests/{request_id}/inputs/{input}/contents/{content}`.
   - Sending a document requires `documentSupported` on the model; inline base64 above 5 MB is refused with 413.

8. **Provider error codes changed (action required for retry logic).** Rate limit: `429 LLM_RATE_LIMITED` (was 400 `LLM_BAD_REQUEST` "Token limit exceeded"). Timeout: `504 LLM_TIMEOUT` (was 500). Out of quota or credit: `402 LLM_QUOTA_EXCEEDED` (was 500), and it must not be retried. Streaming clients must handle a non-200 status when the stream opens.

9. **Helm: NetworkPolicy is always rendered (action required on Kubernetes).** The ai-standalone API port accepts only `networkPolicy.allowedClients` (default: pods labelled `app.kubernetes.io/name: gateway-service` in the release namespace); the Hazelcast port (5701) accepts only other replicas; egress is open. There is no switch to disable it, and an empty `allowedClients` fails the render. Add any other direct caller (a FlowerDocs or ICN pod, Prometheus) to `networkPolicy.allowedClients`, check that the labels match your gateway chart, and make sure your CNI enforces NetworkPolicy. Remove `appConfig.openSearch.forceRefresh` from custom values (the property `opensearch.force-refresh-index` and env `OPENSEARCH_FORCE_REFRESH_INDEX` no longer do anything).

10. **OpenSearch index mappings (action required before the first start).** Mappings are written only when an index is created, so existing indices are not reconciled.
    - **`workspaceId`**: every scopeable entity gets a `workspaceId` keyword field. For each index matching `*-<prefix>-<base>` (bases: `prompt`, `agent_configurations`, `mcp_configurations`, `agent_plans`, `scripts`, `llm_provider_configurations`, `conversations`, `requests`, `plan_executions`), run `PUT .../_mapping` with `{"properties":{"workspaceId":{"type":"keyword"}}}`, then `POST .../_update_by_query?conflicts=proceed` setting `ctx._source.workspaceId='default'` on documents that lack it. If you skip the mapping step, OpenSearch types the field `text` dynamically, and it cannot be retyped.
    - New indices (`usage_profiles`, `tasks`, `request_files`) are created automatically with the tenant indexes.

11. **NuExtract providers must be reconfigured (action required if you use NuExtract).** The legacy `POST {endpointUrl}/{modelId}/extract` call is removed, as are the `modelId` extra and the YAML `model-id` key. Change the provider endpoint to `https://bbox.nuextract.ai`, remove `modelId`, and set the extra `project: sprj_...` (or start your prompt with the JSON template). Expect a different answer shape (`{"result", "localization"}`), no streaming (422), and rewrite prompts built for the legacy flow.

12. **Custom plugins must be recompiled (action required for plugin authors).** The `integration-api` module moved packages (`com.uxopian.ai.model.user`, `model.context`, `common.context`, `model.command`, `model.id`), `AiContext` and `AuthenticatedUser` are immutable (copy methods instead of setters), `AuthenticatedUser.isAdmin()` is removed, and `HostActionDispatcher` is renamed `ClientActionDispatcher`. Rebuild your plugins and fix the imports.

13. **Web components: `createChat` and `openChat`.** `window.createChat` now requires `request`, and its `promptId` option is removed (it never worked). To launch a prompt, put a `PROMPT` input in the request. `window.openChat` reopens the conversation you pass through `request`.

14. **Gateway assertions need `exp`.** A hand-made `X-Gateway-Auth` token without an `exp` claim is refused. The official gateway is not affected.

15. **Tooling that reads OpenAPI:** `/v3/api-docs/Admin` and `/v3/api-docs/User` no longer exist. Use `/v3/api-docs`, or one of the per-type groups (`/v3/api-docs/<group>`). SDK generation, gateway allow-lists, and contract tests that pointed at the old groups need updating.

16. **Hazelcast and iframes.** If your deployment silently relied on Hazelcast auto-detection (for example a Docker network without multicast and without Kubernetes mode), nodes no longer cluster: set `HAZELCAST_MULTICAST_ENABLED=false` for single-node setups. The admin console and viewer can no longer be framed (`frame-ancestors 'none'`); embed through the web components instead.

17. **Behaviour to expect.** Token totals for tool-using conversations are higher than under ft5 because every completion in a tool loop is now counted (historical data is not recomputed). Stored prompt, agent, and conversation data need no other migration.

18. **No migration needed** for code modules, the review screen, the filesystem connector, and structured output: all are new and opt-in.

---

> Ready to start? Check out the [Quick Start](/docs/uxopian-ai/getting_started/overview) or the full [Installation Guide](/docs/uxopian-ai/installation/docker).
