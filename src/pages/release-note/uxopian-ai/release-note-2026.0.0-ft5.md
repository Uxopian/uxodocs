---
draft: false
title: "Uxopian AI release notes - 2026.0.0-ft5"
date: 2026-08-04
version: "2026.0.0-ft5"
major_version: "2026"
latest: true
description: "Agentic Plan engine, gateway-signed request authentication, prompt versioning, Applications, named multi-tenant gateway providers, and FileNet search/write tools."
---

# Release Notes: uxopian-ai v2026.0.0-ft5

**Release Date:** August 2026
**Version:** 2026.0.0-ft5

This release introduces the **Agentic Plan engine**, a new orchestration layer for multi-step, tool-using AI workflows; **gateway-signed request authentication**, closing the trust gap between the gateway and uxopian-ai; **prompt versioning**, with a draft/publish lifecycle and full history; **Applications**, scoping default provider/model/tools per calling application; a **gateway rework** with named multi-instance providers and configurable CORS; and new **FileNet search, read, and write tools**.

---

## 🌟 Highlights

### 🧩 Agentic Plan engine

A new orchestration layer runs multi-step **Plans** — a DAG of `AGENT`, `DIRECT_TOOL`, and `SUBPLAN` nodes, with **fan-out** (parallel processing over a list) and **nested runs**. A Plan can itself be exposed as a callable tool, so agents and conversations can invoke it as a sub-plan. Entirely new and opt-in — nothing to migrate if you don't use it.

### 🔐 Gateway-signed request authentication (action required)

ai-standalone no longer trusts bare `X-User-*` headers by default in a signed deployment: it now verifies an HS256-signed `X-Gateway-Auth` assertion issued by the gateway. **This is a breaking change for the official Helm charts — see [Upgrade notes](#-upgrade-notes).**

### 📝 Prompt versioning

Prompts are now a single document holding a full history of versions, with an explicit **draft → publish** lifecycle, per-version statistics, and the ability to restore an older version. **The admin prompts write API changed shape — see [Upgrade notes](#-upgrade-notes).**

### 🗂️ Applications

A new `ApplicationConf` entity scopes the **default LLM provider/model, a system prompt, and a tool/MCP whitelist** to a calling application (resolved from `X-Application-Id`), letting one uxopian-ai deployment serve several integrations with different defaults and guardrails.

### 🚪 Gateway: named multi-instance providers

The gateway can now serve **several tenants of the same provider type** from one deployment (for example, two FileNet tenants), each with its own configuration, selected per-route via `provider: <name>`.

### 🗃️ FileNet: search, read, and write tools

New tools search, read, and redact/obfuscate FileNet content; the object store to query is **resolved dynamically from the current tenant**.

---

## ✨ New features

### 🧩 Agentic Plan engine

- A **Plan** is a DAG of nodes: `AGENT` (runs an agent configuration), `DIRECT_TOOL` (calls a native tool with no LLM in the loop), and `SUBPLAN` (runs another Plan in-process).
- **Fan-out**: setting a node's `listKey` processes a JSON array from the payload in parallel (default cap of 8 concurrent elements), exposing each element to the node as `item` — the standard way to map-reduce over a list (for example, chunk a long document, summarize each chunk in parallel, then combine).
- A Plan can be **exposed as a tool** (`exposeAsTool`, `toolDescription`, `toolInputParameters`), making it callable by name from a conversation or from another Plan as a sub-plan.
- New admin REST surface: `/api/v1/admin/plans` (CRUD) and `/api/v1/admin/plan-executions` (submit, get, list, pause, resume, stop). See [Understanding Agentic Plans](/docs/uxopian-ai/understanding/agentic_plans) and [Managing Plans](/docs/uxopian-ai/admin/managing_plans).

### 📝 Prompt versioning

- The prompt admin UI gains **History**, **Draft**, and **Published** modes, per-version usage statistics, and the ability to restore an older version.
- Backend: a `Prompt` is one document holding a list of version snapshots instead of a single flat record.
- New REST surface: `POST /api/v1/admin/prompts/{id}/versions` (create the draft), `PUT /api/v1/admin/prompts/{id}/versions/{version}` (edit the draft, or publish it with `draft:false`), `GET /api/v1/admin/prompts/{id}/versions[/{version}]` (list or read one version). **The old bare `PUT /api/v1/admin/prompts` route is gone — see [Upgrade notes](#-upgrade-notes).**

### 🗂️ Applications

- New admin section backed by `ApplicationConf`: name, description, provider, a system prompt, `defaultLlmProvider`/`defaultLlmModel`, `maxToolCycles`, and a reusable permissions block (whitelist/blacklist tools, tool tags, MCP servers, allowed sub-plans).
- Resolved once per chat context from the `X-Application-Id` header (falls back to an auto-created default per connection provider if unset). Provider/model precedence is: an explicit override on the request, then the current turn's prompt (or, absent a prompt this turn, the provider/model the conversation already established on an earlier turn), then the Application's default, then the system-wide default. See [Managing Applications](/docs/uxopian-ai/admin/managing_applications).
- A Prompt that is a base prompt, or referenced as an Application's system prompt, can no longer be deleted while referenced.

### 🗃️ FileNet: search, read, and write tools

New LLM-callable tools: document search (with dedicated builders for class, property-equals, property-contains, date-range, full-text, and folder-scoped filters), folder listing, data-model introspection, document text/metadata read, and redaction/obfuscation. The object store to query is resolved from the current tenant automatically — there is no static repository-id property to configure.

### 💬 Interactive client actions over WebSocket

A typed request/response protocol lets the backend ask the connected client to perform an action and get a typed result back over the existing chat WebSocket, correlated by a request id and scoped to the chat session — the foundation for richer client-driven interactions beyond plain text and the interactive choices introduced in ft4.

### 🚪 Gateway: named multi-instance providers

Provider instances are now named and independently configured under `app.providers.<name>.type` / `app.providers.<name>.config.*`; a route selects which instance to use via `provider: <name>`. This lets one gateway deployment front, for example, two separate FileNet tenants with their own key/issuer/tenant configuration. Omitting `app.providers` keeps the previous single-instance-per-type behavior — **this is additive and opt-in.**

### 🚪 Gateway: configurable CORS

Cross-origin access is now controlled by the gateway itself via `app.cors.allowed-origins` — see [Upgrade notes](#-upgrade-notes) if you depend on cross-origin requests reaching it.

### 🔐 Gateway-signed request authentication

The gateway can now sign every proxied request with a short-lived HS256 JWT (claims: `sub`, `tenantId`, `roles`, `provider`; default 30s TTL) carried in the `X-Gateway-Auth` header, which ai-standalone verifies against the same shared secret. This closes the previous gap where any caller able to reach ai-standalone directly could forge `X-User-*` identity headers. See [Upgrade notes](#-upgrade-notes) for the required setup.

---

## 🏗️ Platform & improvements

- **First official Helm charts for ai-standalone and the gateway** (`ops/helm/ai-standalone`, `ops/helm/gateway-service`) — health/readiness/liveness probes off `/actuator/health`, Hazelcast enabled by default, and a hardened pod/container `securityContext` (no privilege escalation, all capabilities dropped).
- **Actuator hardened** — `/actuator/loggers` is disabled and no longer exposed; only `health` and `info` remain. See [Upgrade notes](#-upgrade-notes).
- **Spring Security 7 filter-chain observation disabled**, removing per-request tracing overhead that Spring Security 7 enables by default.
- **MDC correlation logging** — log lines now carry a correlation block (request/tenant/user context), making cross-service log correlation easier.
- **Legacy internal metrics collector removed** — the internal `MetricService`, which tagged Micrometer meters with high-cardinality values (`conversation_id`/`request_id`/`feedback`), is gone. The admin Statistics page is unaffected: LLM usage, token counts, and time-saved continue to come from the existing `StatsService`, sourced from the persisted request history.
- **Smaller admin bundle** — Monaco-based editors (condition/JS/Thymeleaf) are now lazy-loaded, and the Quick Prompt loading asset shrank from ~10 MB to ~183 KB.
- **Gateway: hardened session-credential binding** — cached sessions are now bound to a credential fingerprint (SHA-256), and route-scoped/global security rule matching is centralized in a single component instead of inline logic.
- **Gateway: `DevProvider` no longer trusts client headers (UXOAI-250).** It now always returns a fixed development identity (`dev`, tenant `dev`, role `ADMIN`), ignoring `X-User-Id`/`X-User-Roles`/`X-User-Tenant` entirely — previously it trusted those headers with no validation, so any caller could forge an arbitrary user or tenant against a route using `DevProvider`. See [Upgrade notes](#-upgrade-notes) if your local/CI setup relied on picking a tenant this way.
- **Stop generating** — a chat message being streamed can now be cancelled mid-flight; the partial response already received is kept rather than discarded.
- **Bookmarkable admin lists** — search term, page, and page size on the Prompts, LLM Providers, MCP Servers, Scripts, Users, and Applications list pages are now synced to the URL, so a link to a filtered/paginated view can be shared or survive back/forward navigation.
- **Breadcrumb navigation** in the admin UI header on Users, LLM Providers, Prompts, Applications, Scripts, and MCP Servers detail pages.
- **Prompt search by label, and a Label column** on the Prompts list — search now matches a prompt's translated Quick Prompt label, not just its id or content.
- **Pagination added to the Scripts and MCP Servers list pages** (previously unpaginated).
- **Admin shortcut to jump from a chat message to the prompt that produced it.**
- **Gateway: public paths are signed too** — when `internal-auth.jwt.secret` is set, requests to paths marked `public` still carry a signed `X-Gateway-Auth` assertion (an anonymous one — no `sub`/`tenantId`, just the `provider` claim), not just authenticated requests. A client-supplied `X-Gateway-Auth` header is always stripped and replaced, never trusted through.
- **Gateway: new top-level `app.security` block** for the gateway's own endpoints (`/actuator/**`), distinct from `app.routes[].security[]` — fixes `/actuator/health` 401ing and crash-looping Kubernetes probes under the default chart values.
- **Gateway: `/auth/login` restricted to providers declared on a route** — previously accepted any registered `AuthProvider` bean name, so `DevProvider` (a fixed, credential-less identity) could mint a session even on a deployment configured for a real provider.
- **Dependency updates**: langchain4j 1.11.0 → 1.16.3, Netty 4.2.13 → 4.2.16, OpenSearch client 3.5.0 → 3.6.0 (see [Upgrade notes](#-upgrade-notes)), base image 1.0.6 → 1.0.8 (see [Upgrade notes](#-upgrade-notes)). Frontend dev tooling bumped (ESLint 9→10, TypeScript 5.9→6.0, Vitest 2→4) with no runtime impact.
- CVE remediation pass ahead of this pre-release.

---

## 🐛 Bug fixes

- **Markdown rendering sanitized against stored XSS** in chat and Quick Prompt message content.
- **MCP "not found" vs. "connection failed" are now distinguished** — a missing MCP configuration and a live connection failure no longer surface as the same error.
- **The Save button no longer gets stuck after a failed save**, and admin request timeouts are now bounded.
- **Application and MCP creation now return `201 Created`** (previously `200 OK`).
- **Stricter admin validation**: an Application's connection provider and a Prompt's id are now enforced as required, closing gaps that previously allowed invalid saves.
- **Application save is read-after-write consistent** — the OpenSearch index is refreshed on save, so the saved entity is immediately visible instead of intermittently missing from the very next read.
- Several Quick Prompt / admin UI fixes: chat messages missing on reopen, disabled prompts still appearing as Quick Prompt cards, dynamic confirmation not appearing live, prompt-card label and script-status-badge clipping, row action buttons clipping, and the unsaved-changes guard not clearing after a successful save.
- **Gateway: large proxied responses are no longer truncated** — the reactive filter chain now uses a stateless security context repository instead of one that buffered large streamed bodies.

---

## 🔄 Upgrade notes

### From v2026.0.0-ft4 (uxopian-ai) / v2026.0.0-ft3 (gateway)

1. **Gateway-signed internal auth (action required for the official Helm charts).** ai-standalone's chart now requires `appConfig.internalAuth.secret` — it **fails to render without it**, and the service refuses to start if the value is under 32 bytes (HS256). It must be the **exact same secret** configured on the gateway's `internalAuth.jwt.secret` (still optional there, but the two must match whenever set — the gateway signs, ai-standalone verifies). Generate one with `openssl rand -base64 48` and inject it via `--set-file` on both charts, never in a values file. Rotating it means rolling both services close together; expect 401s between the two rollouts until both are up on the new secret. A hand-rolled (non-Helm) deployment is only affected if you choose to turn signing on.

2. **Admin prompts write API changed shape (action required for any script or integration writing prompts directly).** `PUT /api/v1/admin/prompts` (bare, id in body) is gone. Updating a prompt is now: `POST /api/v1/admin/prompts/{id}/versions` to create a draft (or reuse one already open), then `PUT /api/v1/admin/prompts/{id}/versions/{version}` with `draft:false` to publish it. `GET /api/v1/admin/prompts/{id}` now returns `{ id, versions: [...] }` instead of a flat prompt object — update any code that parsed the old shape.

3. **Gateway distributable layout changed (custom packaging only).** The ZIP now has a root directory `uxopian-gateway-<version>/` (previously flat), `application.yml` is shipped as a separate file at the ZIP root instead of being baked into the JAR, and the standalone JAR is now named `bff-standalone-<version>.jar`. A default container build already accounts for this; any **custom** unzip/systemd/deploy script assuming the old flat layout or JAR name needs updating.

4. **`/actuator/loggers` is gone.** Anything relying on it to tune log levels at runtime in production must switch to a redeploy with the desired level, or another log-level mechanism — only `health` and `info` remain exposed.

5. **Gateway: CORS is now gateway-configured.** If any client depends on cross-origin requests reaching the gateway, set `app.cors.allowed-origins` explicitly — an unset/empty list means the gateway's own CORS filter allows no cross-origin requests.

6. **Gateway: named provider config is additive.** No action needed unless you want to run multiple instances of the same provider type (for example, two FileNet tenants) — omitting `app.providers` keeps the existing single-instance-per-type behavior.

7. **OpenSearch client bumped to 3.6.0** (from 3.5.0). Verify your OpenSearch server version is compatible before upgrading.

8. **Base image bumped to `uxopian-base-image:1.0.8`**, now served from `artifactory.arondor.cloud:5004` (the `internal-tools` prefix was dropped from the path). Rebuild any derived images against the new base image and registry path.

9. **New `ApplicationConf` concept.** No action required unless you call uxopian-ai from more than one application context — in which case, consider setting `X-Application-Id` and configuring per-application defaults and tool whitelists. Note that a Prompt used as a base prompt or as an Application's system prompt can no longer be deleted while referenced.

10. **Gateway: `DevProvider` no longer reads `X-User-Id`/`X-User-Roles`/`X-User-Tenant`.** Any local, CI, or demo setup that used those headers to select a test user or tenant through `DevProvider` now always gets the fixed `dev`/`dev`/`ADMIN` identity instead. Switch to `FlowerDocsProvider`/`Fast2Provider` (or a real deployment) if you need to exercise multi-tenant behavior.

11. **Goals removed (action required if you used them).** The Goal concept — `goals.yml`, `/api/v1/admin/goals`, and the `{"type": "goal", ...}` request content item — is gone; there was no runtime consumer left to justify keeping it. If you referenced a goal group, call the underlying [Prompt](/docs/uxopian-ai/understanding/prompts_and_templating) directly instead (`type: prompt`), or move the conditional-selection logic it was doing into an [Application](/docs/uxopian-ai/admin/managing_applications)'s prompt or an [Agentic Plan](/docs/uxopian-ai/understanding/agentic_plans).

12. **`plugins.tools.enabled-tags` no longer gates which tools get *registered* at startup.** Since this release, `IntegrationLoader` registers every `@ToolService` in every plugin JAR present under `plugins/`, unconditionally — the tag whitelist plays no part in registration anymore. If you relied on `enabled-tags` to keep Alfresco tool *code* from ever loading, it no longer does that: the code loads regardless. The property still exists, but it now only seeds the default tool-tag whitelist on the [Application](/docs/uxopian-ai/admin/managing_applications) auto-created the first time a connection provider is used — that per-caller whitelist, not this property, is what gives you granular control over which tools a given caller can actually invoke.

13. **No migration needed** for the Agentic Plan engine or the FileNet integration — both are new and opt-in.

---

> Ready to start? Check out the [Quick Start](/docs/uxopian-ai/getting_started/overview) or the full [Installation Guide](/docs/uxopian-ai/installation/docker).
