---
title: Environment variables reference
sidebar_label: Environment variables
sidebar_position: 2
last_update:
  date: '2026-04-21T08:21:12.539Z'
  author: CI/CD Bot
content_hash: cfc0dbfb98d9fd2d9a64a09e58960bd92dd0db01aeb9a3daa658c804299fdc52
---

All environment variables accepted by `uxopian-ai` and `uxopian-gateway`. Variables marked with a default are optional; variables with no default are required when the feature is used.

## uxopian-ai environment variables

### Application

| Variable | Default | Description |
|---|---|---|
| `APP_BASE_URL` | (empty) | Public base URL of the application. Used in generated links. |
| `UXOPIAN_AI_PORT` | `8080` | HTTP port for the application server |
| `CONTEXT_PATH` | (empty) | Servlet context path prefix (e.g., `/ai`) |
| `SPRING_PROFILES_ACTIVE` | (empty) | Active Spring profiles. Set to `dev` to disable authentication. |
| `TOOLS_ENABLED` | `true` | Set to `false` to disable all tool execution |
| `JAVA_OPTS` | (empty) | JVM options (e.g., `-Xmx768m -Xms512m`) |

### Internal authentication

| Variable | Default | Description |
|---|---|---|
| `INTERNAL_AUTH_JWT_SECRET` | (none — **required**) | HS256 secret shared with the gateway, **at least 32 bytes** (`openssl rand -base64 48`). Since 2026.0.0 `uxopian-ai` refuses to start without it, in every profile, `dev` included. Set the same value on the gateway. |
| `INTERNAL_AUTH_JWT_ISSUER` | `uxopian-gateway-internal` | Expected `iss` claim of the gateway assertion. |

### OpenSearch

| Variable | Default | Description |
|---|---|---|
| `OPENSEARCH_HOST` | `localhost` | OpenSearch hostname |
| `OPENSEARCH_PORT` | `9200` | OpenSearch port |
| `OPENSEARCH_SCHEME` | `http` | Connection scheme (`http` or `https`) |
| `OPENSEARCH_USERNAME` | (empty) | OpenSearch username (if auth enabled) |
| `OPENSEARCH_PASSWORD` | (empty) | OpenSearch password (if auth enabled) |

### LLM providers

| Variable | Default | Description |
|---|---|---|
| `LLM_DEFAULT_PROVIDER` | `openai` | Provider of the usage profile auto-created for a connection provider that has none. No longer a fallback at call time. |
| `LLM_DEFAULT_MODEL` | `gpt-5.1` | Model of that auto-created usage profile |
| `LLM_DEFAULT_PROMPT` | `basePrompt` | Default base prompt ID (replaced, for its calls, by the `prompt` of a usage profile) |
| `LLM_CONTEXT_SIZE` | `10` | Number of previous requests included in each LLM call |
| `LLM_DEBUG` | `false` | Enable verbose LLM request/response logging |
| `OPENAI_API_KEY` | (empty) | OpenAI API key |
| `ANTHROPIC_API_KEY` | (empty) | Anthropic API key |
| `AZURE_OPENAI_API_KEY` | (empty) | Azure OpenAI API key |
| `GEMINI_API_KEY` | (empty) | Google Gemini API key |
| `MISTRAL_API_KEY` | (empty) | Mistral AI API key |
| `HUGGINGFACE_API_KEY` | (empty) | HuggingFace API key |
| `NUEXTRACT_API_KEY` | (empty) | NuExtract API key |
| `BEDROCK_AWS_ACCESS_KEY` | (empty) | AWS access key for Bedrock |
| `BEDROCK_AWS_SECRET_KEY` | (empty) | AWS secret key for Bedrock |

The limits and the retention of the files sent to models (`llm.inline.max-size`, `llm.document.max-size`, `llm.files.retention`) are described in the [configuration reference](./configuration.md#default-llm-settings).

### Plugins

| Variable | Default | Description |
|---|---|---|
| `PLUGINS_ROOT_PATH` | `plugins/` | Path to the directory containing plugin JARs |
| `PLUGINS_TOOLS_ENABLED_TAGS` | `flowerdocs,files,interaction` | Comma-separated `@ToolService(tags=…)` list. Since 2026.0.0-ft5, this no longer gates which tools get *registered* at startup — every tool in every plugin JAR present in `plugins/` is always registered, regardless of this value. It now only seeds the tool-tag whitelist of the [usage profile](../admin/managing_applications.md) auto-created the first time a connection provider is used (empty = `allowAllTools`). See [Plugin system — Filtering tools by tag](../understanding/plugin_system.md#filtering-tools-by-tag). **Do not whitelist more than one of `flowerdocs`, `alfresco`, `filenet` on the same usage profile** — they all expose overlapping document search/read/redact operations for different ECM backends, and exposing more than one confuses the LLM about which to call. Pick exactly one, e.g. `flowerdocs,files,interaction` (default), `alfresco,files`, `filenet,files,interaction`, or `files` alone if no ECM backend is needed. |

### Integration connectors

| Variable | Default | Description |
|---|---|---|
| `RENDITION_BASE_URL` | (empty) | ARender base URL. Required if the ARender plugin is deployed. Also relayed at `<app>/rendition/` for the human review screen. |
| `FILECONNECTOR_FILESYSTEM_ROOT` | (empty — connector off) | Root folder of the filesystem file connector (`<root>/<tenant>/`). The application fails to start if it is not a readable and writable folder. Required to accept `persist: true` attachments. |
| `FILECONNECTOR_FILESYSTEM_ALLOWEDEXTENSIONS` | `pdf,png,jpg,jpeg,tif,tiff` | Extensions the filesystem connector accepts (comma-separated) |
| `FD_WS_URL` | (empty) | FlowerDocs core web service URL (e.g. `http://<flowerdocs-endpoint>/core/`). Required if the FlowerDocs plugin is deployed. |
| `ALFRESCO_BASE_URL` | (empty) | Alfresco REST API v1 base URL. Required if the Alfresco plugin is deployed (via `PLUGINS_TOOLS_ENABLED_TAGS=alfresco,…`). |
| `ALFRESCO_LEGACY_BASE_URL` | (auto-derived) | Base URL for Alfresco legacy Web Script endpoints. Auto-derived from `ALFRESCO_BASE_URL` when not set (e.g., `https://host/alfresco-api` → `https://host/alfresco`; `https://host/alfresco/api` → `https://host/alfresco/s`). Set explicitly only if the auto-derivation does not match your deployment. |
| `ALFRESCO_CMM_ENABLED` | `false` | Enable Alfresco Custom Content Model lookup. When disabled, the LLM sees only the built-in `cm:*` system properties. |

### Code sandbox

Optional: [code modules](./rest_api.md#code-modules--apiv1admincode-modules) run in a separate uxopian-code-sandbox service. These names are the Spring relaxed-binding forms of the `code-sandbox.*` properties described in the [configuration reference](./configuration.md#code-sandbox).

| Variable | Default | Description |
|---|---|---|
| `CODESANDBOX_URL` | (empty — sandbox off) | Base URL of uxopian-code-sandbox. Without it, no code tool is offered. |
| `CODESANDBOX_SECRET` | (empty) | Shared secret used to call the sandbox |
| `CODESANDBOX_CALLERNAME` | `uxopian-ai` | Caller name presented to the sandbox |
| `CODESANDBOX_CAPABILITYPROFILE` | `uxoai` | Capability profile the code runs with |
| `CODESANDBOX_MAXACTIVESESSIONS` | `16` | Executions allowed at once |

### Script security scan

Used by the admin-managed [scripts](../admin/managing_scripts.md) feature (2026.0.0-ft4). Optional — without a configured provider, scripts can still be created, edited, and force-published, but the security scan is disabled.

| Variable | Default | Description |
|---|---|---|
| `SCRIPT_SCAN_LLM_PROVIDER` | (empty) | ID of a configured LLM provider used to run the script security scan. Required to enable scanning. |
| `SCRIPT_SCAN_LLM_MODEL` | (empty) | Model used for the scan; falls back to the provider's default model when blank. |

### Security

| Variable | Default | Description |
|---|---|---|
| `app.security.secret-key` | (dev default) | AES/GCM encryption key for stored API secrets. Set a unique value in production. |

### MCP (Model Context Protocol)

Since 2026.0.0-ft3, MCP servers are registered from the admin UI — see [Managing MCP servers](../admin/managing_mcp_servers.md). The environment variable below is retained only for the legacy single-server boot-time configuration and is disabled by default.

| Variable | Default | Description |
|---|---|---|
| `MCP_SSE_URL` | (empty) | Legacy boot-time MCP SSE endpoint URL, read only when the commented block in `mcp-server.yml` is re-enabled. For runtime management, prefer the admin UI. |

### Hazelcast

| Variable | Default | Description |
|---|---|---|
| `HAZELCAST_MULTICAST_ENABLED` | `true` | Multicast discovery, local (non-Kubernetes) mode only. Hazelcast auto-detection is always disabled since 2026.0.0: set this to `false` for single-node or Docker Compose setups on a shared network. |
| `HAZELCAST_KUBERNETES_ENABLED` | `false` | Enable Kubernetes-based Hazelcast discovery |
| `HAZELCAST_KUBERNETES_SERVICE_DNS` | `ai-standalone-headless` | Kubernetes headless service DNS |
| `HAZELCAST_KUBERNETES_NAMESPACE` | `default` | Kubernetes namespace |

## uxopian-gateway environment variables

The gateway is configured primarily via the mounted `gateway-application.yaml` file. Environment variables for the gateway control image selection and are injected by the compose `.env` file:

| Variable | Default | Description |
|---|---|---|
| `REGISTRY` | `artifactory.arondor.cloud:5001` | Docker registry host for Artifactory-based image pull. Not used when switching to Cloudsmith images (see [Registry access](../getting_started/registry_access.md)). |
| `UXOPIAN_VERSION` | `2026.0.0` | Version tag for `uxopian-gateway` and `uxopian-ai` images |

In the gateway `gateway-application.yaml`, the URIs for backend services are hardcoded Docker Compose service names (e.g., `http://uxopian-ai:8080`).

## OpenSearch environment variables

| Variable | Default | Description |
|---|---|---|
| `OPENSEARCH_VERSION` | `3.0.0` | OpenSearch image version (used in compose `.env`) |
| `DISABLE_SECURITY_PLUGIN` | — | Set to `true` to disable OpenSearch security plugin (development only) |
| `DISABLE_INSTALL_DEMO_CONFIG` | — | Set to `true` to skip demo config installation |
| `discovery.type` | — | Set to `single-node` for single-node deployments |
| `OPENSEARCH_JAVA_OPTS` | — | JVM options for OpenSearch (e.g., `-Xms512m -Xmx512m`) |

## Related pages

- [Configuration file reference](./configuration.md)
- [Plugin system](../understanding/plugin_system.md)
- [LLM providers](../understanding/llm_providers.md)
- [Quickstart with Docker Compose](../getting_started/quickstart.mdx)
- [Managing LLM providers in the admin UI](../admin/managing_llm_providers.md)
- [Managing prompts in the admin UI](../admin/managing_prompts.md)
