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

🎉 **The fasttrack ride is over: 2026.0.0 is the general availability release.** Since 2026.0.0-ft5, your admin console got a fresh new look, your models can read documents and PDFs, humans can review what the AI extracted, and you can write your own tools in JavaScript.

> ⚠️ **This release contains several breaking changes.** Read the [Upgrade notes](#-upgrade-notes) before upgrading, and plan a transfer of your data: no automatic migration is provided from fasttrack versions.

## 👀 At a glance

| | What's new | In one sentence |
|---|---|---|
| 🏷️ | **Usage profiles** | Applications get a new name and a stricter job: one profile per calling surface. |
| 🧱 | **Code modules** | Write tools and libraries in JavaScript, right in the admin console. |
| ✅ | **Human review** | Accept, correct or refuse extracted values next to the source document. |
| 📎 | **Documents and PDFs** | Send files to the model, as upload or as a reference. |
| 🧬 | **NuExtract** | Extraction with positions, so the review screen can draw boxes on the page. |
| 🎨 | **New admin console** | Collapsible menu, tabs that stay in the URL, lists that remember your columns. |
| 📄 | **Paginated admin APIs** | Lists answer pages with search, filters and sorting done server side. |
| 🔒 | **Hardened deployment** | Mandatory internal secret, Helm NetworkPolicy, strict Content-Security-Policy. |

---

## 🌟 Highlights

### 🎨 A console you will want to open

The admin console, Chat and Quick Prompt get a new common look: a collapsible menu, one primary action per page, detail pages that keep their tab in the URL, and tables that remember the width, order and visibility of your columns. Double-click a row to edit it. The dashboard now greets you and shows your tenant.

![The Uxopian AI dashboard: requests, tokens, time saved and the most used model, with daily activity charts](/img/uxopian-ai/release-notes/v2026.0.0/dashboard.png)

### 🏷️ Applications become Usage profiles (action required)

A usage profile decides, for one calling surface, which provider, model, system prompt and tools are allowed. It is the former Application with a new name, a new REST path (`/api/v1/admin/usage-profiles`), a new header (`X-Usage-Profile-Id`) and a stricter job. Existing Applications are **not** migrated: re-create them as usage profiles.

![A usage profile: default provider and model, system prompt, tool permissions](/img/uxopian-ai/release-notes/v2026.0.0/application-detail.png)

### 🧱 Code modules

Write JavaScript tools and shared libraries in the admin console and let a plan, an agent or the chat call them. They run in the `uxopian-code-sandbox`, with a draft and publish lifecycle and a **Test** window. Opt-in: with no sandbox configured, the feature stays off. See [Code modules](/docs/uxopian-ai/how_to/code_modules).

![A published code module in the admin console: JavaScript source, tool settings and publication details](/img/uxopian-ai/release-notes/v2026.0.0/code-module-detail.png)

### ✅ Human review

A new **Review** screen and a task queue let reviewers accept, correct or refuse extracted field values next to the source document, with keyboard shortcuts for the speed readers. See [Human-in-the-loop review](/docs/uxopian-ai/how_to/human_in_the_loop_review).

![The Review screen: the source document with a box on each extracted value, and the values to accept, correct or refuse](/img/uxopian-ai/release-notes/v2026.0.0/review-document.png)

![The Review queue: documents waiting for a human decision, with their status and tags](/img/uxopian-ai/release-notes/v2026.0.0/review-queue.png)

### 📎 Documents and PDFs as model input

Requests can carry files, as `multipart/form-data` or as typed file references. PDFs are sent natively to OpenAI, Anthropic, Gemini, Bedrock and Mistral. The `image` content type is renamed `base64` (action required).

### 🧩 Plans you can actually watch

Open a plan run, expand the flow to full screen, and read the output of every step in its panel. Recovery branches (**Runs when**) let a plan carry on after a failure.

![The flow of a plan, expanded to full screen](/img/uxopian-ai/release-notes/v2026.0.0/plan-flow-editor.png)

![The detail of a completed plan run, step by step](/img/uxopian-ai/release-notes/v2026.0.0/plan-run-detail.png)

### 📄 Paginated admin APIs (action required)

Every admin list now answers a page of summaries (`{ collection, total, facets }`) with server-side search, filters and sorting, instead of a bare array.

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

No automatic migration is provided between fasttrack versions, so the upgrade is a **new installation plus a transfer of your data**. Here is what to do and what changes for your integrations. The details of every endpoint are in the [REST API reference](/docs/uxopian-ai/reference/rest_api).

#### 🚚 Your data

1. **Transfer your data (action required).** The data model changed since ft5: new fields and indices, Applications replaced by usage profiles, entities identified by id. Export what you need (prompts, agents, plans, scripts, MCP servers, LLM providers, usage profiles) from the ft5 deployment and re-create it in 2026.0.0, or start fresh. Existing conversations and requests are not carried over unless you transfer them yourself. Applications become usage profiles: re-create them, or let the default profile be created on first use.

#### 🛠️ Installation

2. **Internal auth secret (action required).** `INTERNAL_AUTH_JWT_SECRET` is now required in every deployment, dev included: without it, uxopian-ai refuses to start. It must be at least 32 bytes and identical to the gateway's `internal-auth.jwt.secret`. Add it to your Docker, Java and compose configurations. The Helm chart already required it.
3. **Kubernetes (action required).** The Helm chart always renders a NetworkPolicy: only the gateway can reach the API. Add any other direct caller (FlowerDocs or ICN pod, Prometheus) to `networkPolicy.allowedClients`, and check that your cluster enforces NetworkPolicy. Remove `appConfig.openSearch.forceRefresh` from your values.
4. **Embedding and clustering.** The admin console and the viewer can no longer be framed in an iframe: embed through the web components. Nodes no longer find each other by Hazelcast auto-detection: on a single node or on a network without multicast, set `HAZELCAST_MULTICAST_ENABLED=false`.

#### 🔌 Integrations

5. **REST changes (action required for REST integrators).**
   - Applications are now usage profiles: `/api/v1/admin/usage-profiles` instead of `/api/v1/admin/application/application-conf`, header `X-Usage-Profile-Id` instead of `X-Application-Id`.
   - Admin lists answer pages `{ collection, total, facets }` of summaries with `offset` and `limit`, instead of a bare array.
   - Scripts, MCP servers, usage profiles and code modules are identified by `id` alone: the `name` field is gone.
   - Content type `image` is renamed `base64`, and inline file data is read through a dedicated route instead of being part of the request JSON.
   - Provider errors: `402` for an exhausted quota (do not retry), `429` for a rate limit, `504` for a timeout.
   - Plan runs are controlled by a single `POST .../plan-executions/{id}/signal` instead of `/pause`, `/resume` and `/stop`.
   - OpenAPI groups are now one per type: `/v3/api-docs/Admin` and `/v3/api-docs/User` no longer exist.
6. **Which model answers (action required).** The provider and model now come from the prompt, then from the usage profile of the calling surface. The `llm_provider`, `llm_model`, `temperature` and `reasoning` query parameters are ignored, and there is no fallback on `llm.default.*` at call time: a call without a provider fails. A usage profile's prompt replaces the default base prompt instead of being added to it.
7. **Web components.** `window.createChat` now requires `request` and loses `promptId`; to launch a prompt, put a `PROMPT` input in the request.
8. **NuExtract (action required if you use it).** Point the provider at `https://bbox.nuextract.ai`, remove `modelId`, and set the extra `project: sprj_...` (or start your prompt with a JSON template). The answer shape is now `{"result", "localization"}`, with no streaming.
9. **Custom plugins (action required for plugin authors).** Rebuild your plugins and fix the imports: the integration API moved packages, `AiContext` and `AuthenticatedUser` are immutable, and `HostActionDispatcher` is now `ClientActionDispatcher`.

---

> Ready to start? Check out the [Quick Start](/docs/uxopian-ai/getting_started/overview) or the full [Installation Guide](/docs/uxopian-ai/installation/docker).
