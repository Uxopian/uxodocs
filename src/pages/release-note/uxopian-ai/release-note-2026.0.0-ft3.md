---
draft: false
title: "Uxopian AI release notes - 2026.0.0-ft3"
date: 2026-04-21
version: "2026.0.0-ft3"
major_version: "2026"
latest: true
description: "Alfresco integration, Spring Boot 4 / Jackson 3 upgrade, MCP server admin UI, redesigned UX, and automatic conversation titles."
---

# Release Notes: uxopian-ai v2026.0.0-ft3

**Release Date:** April 2026
**Version:** 2026.0.0-ft3

This release introduces a **native Alfresco integration**, a **full Spring Boot 4 / Jackson 3 platform upgrade**, a new **MCP server administration UI**, a **redesigned admin interface**, and **automatic conversation title generation**.

---

## Highlights

### Alfresco integration

Xopia can now be embedded directly in **Alfresco Share** and **Alfresco Digital Workspace** without requiring ARender. The integration ships as a loadable plugin JAR and exposes 13 LLM-callable tools covering AFTS-based search, document content retrieval, folder listing, and metadata access.

### Spring Boot 4 / Jackson 3 upgrade

The entire backend has been migrated to **Spring Boot 4 / Spring Framework 7 / Jackson 3**. Gson has been removed from the classpath. The `spring-boot-properties-migrator` has been dropped. The frontend toolchain has been updated to **Vite 8 / Node 24**.

### MCP server administration

Administrators can now register **Model Context Protocol (MCP) servers** from the admin panel, either platform-wide or per-tenant. Authenticated connections are isolated by tenant; identical unauthenticated connections share a pooled client. Config changes propagate across cluster nodes via Hazelcast.

### Redesigned admin UI

The home page, statistics page, prompts page, and LLM provider pages have been redesigned with new design tokens, a navbar replacing the previous FloatingNav, and new chart components.

### Automatic conversation titles

On the first request of a new conversation, the LLM now generates a meaningful title using LangChain4j structured output.

---

## New features

### Alfresco integration (UXOAI-90, UXOAI-106)

Three `@ToolService` beans tagged `alfresco` are available to the LLM:

**Search (`AlfrescoSearchToolService`)** — 9 tools:

| Tool | Purpose |
|---|---|
| `getAlfrescoDataModel` | Returns the tenant's data model (system properties + optional CMM custom types) |
| `buildAlfrescoTypeFilter` | AFTS fragment: filter by node type |
| `buildAlfrescoPropertyContainsFilter` | AFTS fragment: partial text match on a property |
| `buildAlfrescoPropertyEqualsFilter` | AFTS fragment: exact property match |
| `buildAlfrescoDateRangeFilter` | AFTS fragment: date range filter |
| `buildAlfrescoFullTextFilter` | AFTS fragment: full-text content search |
| `combineAlfrescoFilters` | Combines AFTS fragments with AND / OR |
| `buildAlfrescoSort` | Sort specification (property + direction) |
| `searchAlfrescoNodes` | Executes the assembled AFTS query |

**Documents (`AlfrescoDocumentToolService`)** — 3 tools: `getAlfrescoDocumentIdsByName`, `getAlfrescoDocumentContent`, `listAlfrescoFolderContents`.

**Metadata (`AlfrescoMetadataToolService`)** — 1 tool: `getAlfrescoDocumentProperties`.

**Enabling the integration:**

Alfresco tools ship in the distribution ZIP but are **disabled by default** (`PLUGINS_TOOLS_ENABLED_TAGS=flowerdocs,files`). To enable them, switch the tag whitelist to `alfresco`:

```bash
ALFRESCO_BASE_URL=https://alfresco.example.com
PLUGINS_TOOLS_ENABLED_TAGS=alfresco,files
```

Or in `config/application.yml`:

```yaml
alfresco:
  base-url: https://alfresco.example.com
  cmm-enabled: false   # set true if the tenant uses Alfresco Custom Content Model
plugins:
  tools:
    enabled-tags: alfresco,files
```

> `flowerdocs` and `alfresco` are incompatible backends — both expose document search and retrieval operations for different ECM systems. Use exactly one per deployment.

**Gateway provider** (uxopian-gateway, UXOAI-104): loaded at startup from the `/provider` directory next to the BFF JAR. Intercepts `/alfresco/**` requests and injects `X-User-Id`, `X-User-Roles`, `X-User-TenantId`, `X-User-Token`.

See [Integrate with Alfresco](/docs/uxopian-ai/how_to/integrate_with_alfresco).

### MCP server administration (UXOAI-112)

- New admin UI to register MCP endpoints platform-wide or per-tenant.
- Authenticated connections isolated per tenant; unauthenticated identical connections share a pooled client (`SharedMcpClient`).
- Hazelcast event bridge (`McpConfEventBridge`) propagates config changes across cluster nodes.
- Built-in connection tester and config editor.
- Playwright E2E coverage.

See [Managing MCP servers](/docs/uxopian-ai/admin/managing_mcp_servers).

### Automatic conversation titles (UXOAI-98)

- On the first request of a new conversation, the LLM generates a title via LangChain4j structured output.
- Title generation is tracked as a hidden request (visible in cost stats, not counted in user request totals).
- Requires the configured default model to support structured output (`ResponseFormat`). Models that do not are silently skipped.

### Extra-parameter descriptors for LLM providers (UXOAI-94, UXOAI-122)

- Provider implementations (Bedrock, NuExtract) now expose typed extra-param descriptors (`ExtraParamDescriptor`).
- The admin UI renders the appropriate form controls automatically.
- Per-key merge between global provider extras and per-tenant overrides (UXOAI-122): an empty extras map no longer discards global provider settings.

### Stale-While-Revalidate for the admin prompt list (UXOAI-115)

Previously loaded prompts are rendered immediately on revisit; a silent background request refreshes the list.

---

## Platform & infrastructure

- **Spring Boot 4 / Spring Framework 7 / Jackson 3** (UXOAI-86) — Gson removed, `spring-boot-properties-migrator` dropped, OpenSearch TLS strategy fixed, case-insensitive enum deserialization added.
- **Frontend toolchain** (UXOAI-99) — Vite 8 / Node 24.
- **Observability overhead disabled** (UXOAI-121) — Spring Boot 4 HTTP/Redis/Lettuce observations turned off for performance.
- **Module restructure** (UXOAI-92) — One integration domain = `integrations/<name>/{connector,helper,tool}`. One shaded JAR per integration replaces the previous two-artifact layout.
- **Tag-based tool whitelist** (UXOAI-138) — `PLUGINS_TOOLS_ENABLED_TAGS` controls which tool sets are loaded at runtime. Default: `flowerdocs,files`.
- **FlowerDocs library reuse** (UXOAI-111) — Official FlowerDocs library replaces the previously maintained in-tree API client. Packages relocated under `com.uxopian.ai.integration.flowerdocs.*`.
- **Cross-platform dev** (UXOAI-114) — Windows-friendly path alias resolution; `clean:tgz` rewritten as a Node script.

---

## CI / DevEx

- Tekton PaC PR-validation pipeline (UXOAI-89).
- Hazelcast cluster IT + plugin-classloader IT (UXOAI-143).
- Hazelcast IT port-collision fix (UXOAI-146).
- Build-develop pipeline with unit test coverage report (UXOAI-113).
- Code formatter config (`code_formatter.xml`) + `FORMATTER.md` + `run_local.sh` one-command local dev script (UXOAI-78, UXOAI-139).

---

## Bug fixes

- NPE in `DocumentService.parseDocumentWithOcr` when `pageDimensionsList` is null (UXOAI-83).
- Role selector not displaying correctly in prompt config (UXOAI-96).
- Tenant onboarding race condition with concurrent requests (UXOAI-97).
- FlowerDocs `Id` deserialization broken under Jackson 3 (UXOAI-109).
- Documentation URL updated to the new centralized hub (UXOAI-110).
- User messages not displaying due to content-type case mismatch (UXOAI-116).
- Missing Docker assets; docker base image bumped to 1.0.5 (UXOAI-119/120).
- `promptService` missing from completion metadata + `registerVariable` collision guard (UXOAI-137).
- Markdown bold spacing in chat responses (UXOAI-141).
- `BedrockClient` `AwsSessionToken` made optional (UXOAI-117).
- CVE remediation (UXOAI-84, UXOAI-142).

---

## Migration notes

### From v2026.0.0-ft2

1. **Spring Boot 4** — Any downstream Spring-based customization must be compatible with Spring Framework 7. Gson is no longer on the classpath; migrate to Jackson if needed.

2. **Tool loading** — Integration tools (FlowerDocs, Alfresco, Files) are now loaded exclusively via `plugins/` through `IntegrationLoader`. Any custom in-tree `@ToolService` that was previously picked up by Spring component scan must be packaged as a plugin JAR. Tools without tags are always registered (backward compatible).

3. **Alfresco default** — Alfresco tools ship in the ZIP but are disabled. If your deployment targets Alfresco, set `PLUGINS_TOOLS_ENABLED_TAGS=alfresco,files` explicitly.

4. **Single plugin JAR per integration** — `alfresco-helper.jar` no longer exists; it is shaded into `alfresco-<version>.jar`.

5. **FlowerDocs package relocation** — FlowerDocs classes have moved to `com.uxopian.ai.integration.flowerdocs.*`. Update any custom code that imported the old package paths.

6. **Node 24** — The frontend build now requires Node 24 or later.

---

> Ready to start? Check out the [Quick Start](/docs/uxopian-ai/getting_started/overview) or the full [Installation Guide](/docs/uxopian-ai/installation/docker).
