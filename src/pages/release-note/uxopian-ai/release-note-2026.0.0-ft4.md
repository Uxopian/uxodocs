---
draft: false
title: "Uxopian AI release notes - 2026.0.0-ft4"
date: 2026-06-03
version: "2026.0.0-ft4"
major_version: "2026"
latest: false
description: "Quick Prompt context-aware assistant, interactive choices in chat, admin-managed scripts with LLM security scan, prompt-editor context autocomplete, and structured API error responses."
---

# Release Notes: uxopian-ai v2026.0.0-ft4

**Release Date:** June 2026
**Version:** 2026.0.0-ft4

This release introduces **Quick Prompt**, a context-aware AI assistant panel that embeds directly in your business application; **interactive choices** that let the assistant present clickable options instead of plain-text questions; **admin-managed scripts** with an LLM-based security scan; **context-variable autocomplete** in the prompt editor; and a **structured JSON error format** for the REST API.

---

## 🌟 Highlights

### 🧭 Quick Prompt — context-aware assistant

A new embeddable side panel that follows the user's navigation, automatically captures the current context (the document, task, or folder being viewed, plus search results), and presents a filtered list of admin-defined prompts relevant to that context. Selecting a prompt returns a streamed answer with conversation history, search, copy, feedback, retry, and floating / picture-in-picture display modes.

### 💬 Interactive choices in chat

The assistant can now present **clickable choices** instead of asking questions in plain text — a single list of options, or a guided multi-step wizard. This is also used to ask for **explicit confirmation before destructive actions** (such as reverting a document version or applying a redaction).

### 📝 Admin-managed scripts

Administrators can author front-end integration JavaScript directly in the admin panel, run an **LLM-based security scan** that certifies or rejects the content, and deploy it through a governed draft → scan → publish lifecycle. Deployed scripts are served to authenticated users as `application/javascript`.

### ✨ Context-variable autocomplete in the prompt editor

The admin prompt editor now offers IntelliSense-style autocomplete for the context variables available to Quick Prompt templates (`user`, `documents`, `tasks`, `folders`, …) including object properties and array-item attributes.

### 🧱 Structured API error responses

All REST error responses now share a single JSON shape (`code`, `message`, `status`) instead of plain-text bodies, making client-side error handling consistent and predictable. **This changes the error body for API consumers — see [Upgrade notes](#-upgrade-notes).**

---

## ✨ New features

### 🧭 Quick Prompt

Quick Prompt is a second web component (alongside the existing chat), designed to live inside a host application and stay aware of what the user is doing.

**For end users:**

- A toggle button opens a side panel listing the prompts relevant to the current screen, grouped by category and ordered by priority.
- Selecting a prompt runs it against the captured context and streams the answer.
- Conversation history with search, copy, feedback, retry, speech-to-text input, and **detached / floating / Picture-in-Picture** display modes.

**For administrators** — a new **Display Settings** tab on each prompt controls how it appears in Quick Prompt:

| Setting | Description |
|---|---|
| Enabled | Whether the prompt is offered in Quick Prompt |
| Label | Short title shown on the prompt card |
| Category | Free-form category used to group prompt cards |
| Priority | Ordering of prompt cards (higher first) |
| Description | Markdown description shown to the user |
| Display condition | A JavaScript expression evaluated against the current context; the prompt is shown only when it returns `true` |

Only prompts that are **enabled** and whose **display condition passes** appear in the panel. Display conditions are evaluated client-side in a restricted sandbox (no `eval`, no globals); a condition that errors evaluates to `false` (the prompt is hidden).

**Embedding:** Quick Prompt ships as a self-contained bundle served by uxopian-ai (`/api/web-components/quick-prompt/script` and `/style`) and is wired to the host application through a small JavaScript integration handle that declares how to resolve the current document/task/folder from the page. See [Embed Quick Prompt](/docs/uxopian-ai/how_to/embed_quick_prompt).

> The captured context (current document/task/folder properties, user, tenant) is serialized and sent to the configured LLM as supplementary context. Only expose prompts and context fields that are appropriate for your LLM provider.

### 💬 Interactive choices

Two new built-in tools let the assistant present interactive options in the chat instead of free text:

- **`presentChoices`** — a question plus a vertical list of option buttons (each with a label and optional description), always including an **"Other…"** button for free-text input.
- **`presentStepsChoices`** — a guided multi-step wizard: the user answers a short sequence of questions one at a time, with a progress indicator and a running summary; all answers are sent together at the end.

These tools are **enabled out of the box** (they are not gated by the tool tag whitelist) and are used in particular to require **explicit confirmation before destructive operations**. No prompt or configuration change is needed for the assistant to use them.

See [Tools — Interactive choices](/docs/uxopian-ai/understanding/tools#built-in-tools-interactive-choices).

### 📝 Script management

A new **Scripts** section in the admin panel lets administrators manage custom front-end integration JavaScript (for example the Quick Prompt connector loaded by a host application) through a governed lifecycle:

1. **Create** a script (name only — the name becomes its immutable ID; allowed characters: letters, digits, `_`, `-`).
2. **Edit** the draft content in a built-in code editor.
3. **Scan & publish** — runs an LLM security scan; if the verdict is **Certified**, the draft is automatically published and becomes servable. A **Rejected** verdict shows the scanner's comment.
4. **Force publish** is available to deploy a draft while bypassing the scan (logged and attributed).

Deployed scripts are served to authenticated users at `GET /api/v1/scripts/{id}` as `application/javascript`, with HTTP caching (`Cache-Control` + `ETag`). A script is not servable until it has been deployed at least once.

The security scan requires an LLM provider to be configured — see [Upgrade notes](#-upgrade-notes) and [Managing scripts](/docs/uxopian-ai/admin/managing_scripts).

### ✨ Context-variable autocomplete in the prompt editor

While editing a prompt template, typing inside a `[[${ … }]]` expression now suggests:

- **Root variables** available in the Quick Prompt context: `tenant`, `user`, `documents`, `tasks`, `folders`, `injected`, `capabilities`.
- **Object properties** after a dot, e.g. `${user.` → `userId`, `username`, `roles`, `groups`, …
- **Array-item attributes**, e.g. `${documents[0].` → `documentId`, `type`, `title`, `properties`, `tags`, …

Each suggestion shows its type and a short description.

### 🗂️ Standardized ECM tool names

The document and metadata tools exposed to the LLM for Alfresco and FlowerDocs now share a **common, ECM-agnostic vocabulary** — for example `getDataModel`, `getDocumentContent`, `getDocumentProperties`, `getDocumentIdsByName`, `updateDocumentProperty`, `prepareRedact`, and `applyObfuscation`. This makes prompts and goals more portable across ECM backends. The tool **tags** used to enable each integration (`alfresco`, `flowerdocs`, `files`) are unchanged. **If you reference tool names explicitly in custom prompts or goals, update them — see [Upgrade notes](#-upgrade-notes).**

---

## 🏗️ Platform & improvements

- **Structured API error responses** — all errors are now returned as `{ "code", "message", "status" }` JSON with a consistent exception-to-HTTP-status mapping. See [REST API — Error responses](/docs/uxopian-ai/reference/rest_api#error-responses).
- **Audit fields on all entities** — every stored entity (conversations, prompts, scripts, providers, …) now carries `createdAt`, `createdBy`, `updatedAt`, and `updatedBy`. No reindex is required; existing documents are backfilled on their next save.
- **Stricter admin response validation** — the admin UI now surfaces a clear error state when an API response does not match the expected shape, instead of silently rendering inconsistent data.
- **Security / dependency updates** — CVE remediation through dependency upgrades: Spring Boot 4.0.6, Spring Framework 7.0.7, Spring Security 7.0.5, Thymeleaf 3.1.5, Netty 4.2.13.
- **Docker base image** — `uxopian-base-image` bumped from 1.0.5 to 1.0.6.

---

## 🐛 Bug fixes

- **Multi-turn conversations keep their LLM provider/model** — follow-up messages in a conversation started from a prompt pinned to a non-default provider/model no longer fall back to the system default mid-conversation.
- **Large FlowerDocs responses no longer fail** — the FlowerDocs client now honours the configured `spring.codec.max-in-memory-size` (20 MB), fixing `DataBufferLimitException` on large search or document responses.

---

## 🔄 Upgrade notes

### From v2026.0.0-ft3

1. **API error format changed (action required for API consumers).** Non-2xx REST responses now return JSON instead of a plain-text body:

   ```json
   { "code": "LLM_PROVIDER_NOT_FOUND", "message": "LLM provider 'xyz' not found.", "status": 404 }
   ```

   Any client that read the previous plain-text error body must now parse JSON and read the `message` field (and optionally branch on `code` / `status`). Some responses also changed HTTP status — most notably **creating a duplicate LLM provider now returns `409 Conflict`** (was `400`), and several errors that previously surfaced as `500` are now correctly `404` or `503`. Review status-based client logic. See [REST API — Error responses](/docs/uxopian-ai/reference/rest_api#error-responses).

2. **ECM tool names were standardized.** If your custom prompts or goals reference Alfresco/FlowerDocs tool names explicitly, update them. The Alfresco document/metadata tools were de-prefixed — for example `getAlfrescoDataModel` → `getDataModel`, `getAlfrescoDocumentContent` → `getDocumentContent`, `getAlfrescoDocumentProperties` → `getDocumentProperties`, `searchAlfrescoNodes` → `doSearch`, `buildAlfrescoTypeFilter` → `buildTypeFilter` — and the FlowerDocs data-model tool was renamed `getTaskClassAndTagClassesDescriptions` → `getDataModel` (its search executor is `doSearch`). The integration **tags** (`alfresco`, `flowerdocs`, `files`) and `PLUGINS_TOOLS_ENABLED_TAGS` are unchanged. See [Tools](/docs/uxopian-ai/understanding/tools) for the full per-backend tool list.

3. **Integration package rename (custom Java code only).** Integration classes moved from `com.uxopian.ai.integration.*` to `com.uxopian.ai.integrations.*` (singular → plural). If you maintain custom integration code compiled against these modules, update the imports. A default standalone install is unaffected.

4. **Interactive choices are enabled by default.** Assistant messages may now contain a JSON "choices" block as their content. The standard chat and Quick Prompt components render these as buttons automatically. If you have a **custom UI** that reads or stores raw assistant message content, expect and handle this JSON.

5. **Script security scan is opt-in configuration.** To use the LLM scan for admin-managed scripts, set `SCRIPT_SCAN_LLM_PROVIDER` (and optionally `SCRIPT_SCAN_LLM_MODEL`) and keep the new `config/script-scan.yml` file. The import is optional, so its absence is non-fatal; without a configured provider, script CRUD and force-publish still work but the scan endpoint is disabled. See [Configuration — script-scan.yml](/docs/uxopian-ai/reference/configuration#script-scanyml).

6. **New OpenSearch index `scripts`.** Created automatically per tenant on first use; no manual migration. The new audit fields on existing entities require **no reindex** (they are mapped dynamically and backfilled on next save).

7. **Cross-origin embedding of Quick Prompt.** When the host application is served from a different origin than the gateway, configure CORS at the gateway. The permissive CORS configuration built into uxopian-ai is active only under the `dev` Spring profile and must not be relied upon in production.

8. **Default base prompt.** The shipped default for `llm.default.base-prompt` (`LLM_DEFAULT_PROMPT`) is now `basePrompt` (previously empty). Deployments that already set this value explicitly are unaffected.

9. **Rebuild custom images.** If you build derived images, rebuild against base image `1.0.6` and the upgraded dependencies (CVE remediation).

---

> Ready to start? Check out the [Quick Start](/docs/uxopian-ai/getting_started/overview) or the full [Installation Guide](/docs/uxopian-ai/installation/docker).
