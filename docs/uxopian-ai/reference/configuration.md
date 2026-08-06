---
title: Configuration file reference
sidebar_label: Configuration files
sidebar_position: 1
last_update:
  date: '2026-08-04T06:50:53.969Z'
  author: CI/CD Bot
content_hash: c10a745118309819f672f03d9b80cbde57030f8a0e7fa33c14141ed7e4cab1c2
---

All configuration files for uxopian-ai are placed in the `./config/` directory on the host, mounted to `/app/config` inside the container. The application imports them at startup via `application.yaml`. This page documents every configuration key in every file.

## application.yml

Controls the base URL, server port, Spring profiles, and tool settings.

| Key | Env variable | Default | Description |
|---|---|---|---|
| `app.base-url` | `APP_BASE_URL` | (empty) | Public base URL for the application (used in generated links) |
| `server.port` | `UXOPIAN_AI_PORT` | `8080` | HTTP port uxopian-ai listens on |
| `server.servlet.context-path` | `CONTEXT_PATH` | (empty) | Optional servlet context path prefix |
| `tools.enabled` | `TOOLS_ENABLED` | `true` | Set to `false` to disable all tool execution |
| `plugins.root.path` | `PLUGINS_ROOT_PATH` | `plugins/` | Directory scanned at startup for plugin JARs |
| `plugins.tools.enabled-tags` | `PLUGINS_TOOLS_ENABLED_TAGS` | `flowerdocs,files` | Since 2026.0.0-ft5, this no longer gates which tools get *registered* at startup — every `@ToolService` in every plugin JAR present in `plugins/` is always registered. It now only seeds the default tool-tag whitelist on an auto-created [Application](../admin/managing_applications.md) (empty = `allowAllTools`). See [Plugin system](../understanding/plugin_system.md#filtering-tools-by-tag). |
| `spring.profiles.active` | `SPRING_PROFILES_ACTIVE` | (empty) | Active Spring profiles. Add `dev` to disable auth. |

Example:

```yaml
app:
  base-url: ${APP_BASE_URL:}

server:
  port: ${UXOPIAN_AI_PORT:8080}

tools:
  enabled: ${TOOLS_ENABLED:true}
```

### Gateway-signed request authentication

Since 2026.0.0-ft5, requests can carry a gateway-issued `X-Gateway-Auth` assertion instead of bare `X-User-*` headers. Verification is inactive until a secret is set (matches the gateway's own opt-in behavior — see [gateway-application.yaml](#gateway-applicationyaml)), but the **official Helm chart makes the secret mandatory** (the chart fails to render without `appConfig.internalAuth.secret`).

| Key | Env variable | Default | Description |
|---|---|---|---|
| `internal-auth.jwt.secret` | `INTERNAL_AUTH_JWT_SECRET` | (empty, verification off) | HS256 shared secret, **at least 32 bytes**, must be **byte-for-byte identical** to the gateway's own `internal-auth.jwt.secret`. Generate with `openssl rand -base64 48`. |
| `internal-auth.jwt.issuer` | `INTERNAL_AUTH_JWT_ISSUER` | `uxopian-gateway-internal` | Expected `iss` claim on the incoming assertion. |
| `internal-auth.jwt.clock-skew-seconds` | `INTERNAL_AUTH_JWT_CLOCK_SKEW_SECONDS` | `5` | Allowed clock drift when validating the assertion's expiry. |

Rotating the secret requires rolling both services close together — expect `401` responses between the two rollouts until both are running the new value.

## opensearch.yml

OpenSearch connection settings.

| Key | Env variable | Default | Description |
|---|---|---|---|
| `opensearch.host` | `OPENSEARCH_HOST` | `localhost` | OpenSearch host |
| `opensearch.port` | `OPENSEARCH_PORT` | `9200` | OpenSearch port |
| `opensearch.scheme` | `OPENSEARCH_SCHEME` | `http` | Connection scheme (`http` or `https`) |
| `opensearch.username` | `OPENSEARCH_USERNAME` | (empty) | Username for authenticated OpenSearch |
| `opensearch.password` | `OPENSEARCH_PASSWORD` | (empty) | Password for authenticated OpenSearch |
| `opensearch.force-refresh-index` | `OPENSEARCH_FORCE_REFRESH_INDEX` | `false` | Force index refresh after each write (slow; for testing only) |
| `opensearch.index-prefix` | `OPENSEARCH_INDEX_PREFIX` | `uxopian-ai` | Prefix used in index names: `{tenant}-{prefix}-{base}` |

Example:

```yaml
opensearch:
  host: ${OPENSEARCH_HOST:localhost}
  port: ${OPENSEARCH_PORT:9200}
  scheme: ${OPENSEARCH_SCHEME:http}
  username: ${OPENSEARCH_USERNAME:}
  password: ${OPENSEARCH_PASSWORD:}
  force-refresh-index: ${OPENSEARCH_FORCE_REFRESH_INDEX:false}
```

## llm-clients-config.yml

LLM provider configurations, default provider/model, and context size.

### Default LLM settings

| Key | Env variable | Default | Description |
|---|---|---|---|
| `llm.default.provider` | `LLM_DEFAULT_PROVIDER` | `openai` | Default LLM provider identifier |
| `llm.default.model` | `LLM_DEFAULT_MODEL` | `gpt-5.1` | Default model name |
| `llm.default.base-prompt` | `LLM_DEFAULT_PROMPT` | `basePrompt` | Default base prompt ID |
| `llm.context` | `LLM_CONTEXT_SIZE` | `10` | Number of previous requests included in each LLM call |
| `llm.debug.enabled` | `LLM_DEBUG` | `false` | Enable verbose LLM request/response logging |

### Provider configuration structure

```yaml
llm:
  provider:
    globals:
      - provider: <provider-id>
        defaultLlmModelConfName: <model-conf-name>
        globalConf:
          apiSecret: <api-key>
          endpointUrl: <provider-url>
          temperature: <float>
          timeout: <duration>
          maxRetries: <int>
          extras:
            <provider-specific-key>: <value>
        llModelConfs:
          - llmModelConfName: <name>
            modelName: <actual-model-name>
            multiModalSupported: <bool>
            functionCallSupported: <bool>
```

### Supported provider identifiers

`openai`, `anthropic`, `azure-openai`, `bedrock`, `gemini`, `mistral-ai`, `huggingface`, `ollama`, `nu-extract`

### Provider-specific extras

| Provider | Extra keys | Description |
|---|---|---|
| `bedrock` | `AwsRegion`, `AwsAccessKey`, `AwsSessionToken` | AWS credentials and region |
| `nu-extract` | `modelId` | Model ID override (defaults to `modelName` if absent) |

Azure OpenAI (`azure-openai`) does not use extras. The `modelName` field is passed as the deployment name.

### Tenant overrides

```yaml
llm:
  provider:
    tenants:
      - tenantId: <tenant-id>
        mergeStrategy: MERGE   # MERGE | OVERWRITE | CREATE_IF_MISSING
        providers:
          - provider: <provider-id>
            globalConf:
              apiSecret: <tenant-specific-key>
```

## prompts.yml

Prompt template definitions.

| Key | Description |
|---|---|
| `prompts.backup.path` | Directory for prompt backups. Env: `PROMPTS_BACKUP_PATH`. Default: `./prompts/` |
| `prompts.globals` | List of global prompt definitions (see structure below) |
| `prompts.tenants` | List of per-tenant prompt overrides |

### Prompt definition structure

```yaml
- id: <unique-id>
  role: SYSTEM | USER | ASSISTANT
  content: |
    Thymeleaf template content...
    [[${variable}]]
  requiresMultiModalModel: false
  requiresFunctionCallingModel: false
  reasoningDisabled: false
  defaultLlmProvider: ""       # optional: override provider for this prompt
  defaultLlmModel: ""          # optional: override model for this prompt
```

### Tenant override structure

```yaml
prompts:
  tenants:
    - tenantId: <tenant-id>
      mergeStrategy: merge | replace
      prompts:
        - id: <prompt-id>
          role: USER
          content: |
            Override content...
```

## goals.yml

:::warning[Removed in 2026.0.0-ft5]
The Goal concept — and `goals.yml` along with it — was removed in 2026.0.0-ft5 (no runtime consumer ever read it). See [Goals](../understanding/goals.md) for what to use instead.
:::

## metrics.yml

Micrometer metrics and actuator configuration.

| Key | Description |
|---|---|
| `management.elastic.metrics.export.enabled` | Enable/disable OpenSearch metrics export (default: `true`) |
| `management.elastic.metrics.export.host` | OpenSearch URL for metrics. Default reads from `opensearch.*` properties. |
| `management.elastic.metrics.export.index` | Index name for metrics (default: `micrometer-metrics`) |
| `management.elastic.metrics.export.auto-create-index` | Auto-create metrics index (default: `true`) |
| `management.endpoints.web.exposure.include` | Exposed actuator endpoints. Default: `health,info,loggers` |
| `management.metrics.uxopian-ai.enable` | Enable custom uxopian-ai metrics (default: `true`) |
| `management.metrics.enable.*` | Standard metric groups disabled by default: `application`, `tomcat`, `logback`, `jvm`, `system`, `http`, `process`, `disk`, `executor` |

## hazelcast.yml

Hazelcast cluster configuration. Used by the gateway for session caching.

| Key | Env variable | Default | Description |
|---|---|---|---|
| `hazelcast.cluster-name` | — | `uxopian-ai-cluster` | Hazelcast cluster name |
| `hazelcast.kubernetes.enabled` | `HAZELCAST_KUBERNETES_ENABLED` | `false` | Enable Kubernetes service discovery |
| `hazelcast.kubernetes.service-dns` | `HAZELCAST_KUBERNETES_SERVICE_DNS` | `ai-standalone-headless` | Kubernetes headless service DNS name |
| `hazelcast.kubernetes.namespace` | `HAZELCAST_KUBERNETES_NAMESPACE` | `default` | Kubernetes namespace for discovery |

## alfresco

Configuration for the Alfresco plugin. Since 2026.0.0-ft5, its tools are always registered when the JAR is present in `plugins/`; whether they're exposed to a given caller is controlled by that caller's [Application](../admin/managing_applications.md) tool/tag whitelist, not by `plugins.tools.enabled-tags`.

| Key | Env variable | Default | Description |
|---|---|---|---|
| `alfresco.base-url` | `ALFRESCO_BASE_URL` | (empty) | Alfresco REST API v1 base URL. Required when the plugin is enabled. |
| `alfresco.legacy-base-url` | `ALFRESCO_LEGACY_BASE_URL` | (auto-derived) | Base URL for Alfresco legacy Web Script endpoints (`/alfresco/s/…`). Auto-derived from `base-url` when not set: if `base-url` contains `/alfresco-api`, it is replaced with `/alfresco`; if `base-url` ends with `/api`, the suffix becomes `/s`; otherwise `/s` is appended. Override only if the auto-derivation does not match your deployment layout. |
| `alfresco.cmm-enabled` | `ALFRESCO_CMM_ENABLED` | `false` | Enable Alfresco Custom Content Model lookup. When disabled, the LLM sees only the fallback `cm:*` system properties. |
| `alfresco.common-system-properties` | — | `cm:name`, `cm:title`, `cm:description`, `cm:created`, `cm:modified`, `cm:creator`, `cm:modifier` | List of system properties (name, label, description, indexable, allowed values) surfaced to the LLM when CMM is disabled. Override if your tenant uses a different default schema. |

Example:

```yaml
alfresco:
  base-url: ${ALFRESCO_BASE_URL:}
  # legacy-base-url is auto-derived from base-url — set only if the derivation is wrong
  # legacy-base-url: ${ALFRESCO_LEGACY_BASE_URL:}
  cmm-enabled: ${ALFRESCO_CMM_ENABLED:false}
  # common-system-properties: (defaults shipped with the plugin)
```

See [Integrate with Alfresco](../how_to/integrate_with_alfresco.mdx) for deployment steps.

## filenet

Configuration for the FileNet plugin. Since 2026.0.0-ft5, its tools are always registered when the JAR is present in `plugins/`; whether they're exposed to a given caller is controlled by that caller's [Application](../admin/managing_applications.md) tool/tag whitelist, not by `plugins.tools.enabled-tags`.

There is no object store setting: the object store is the tenant, resolved per request by the ICN plugin and carried in its JWT — see [How the tenant is resolved](../how_to/integrate_with_filenet.mdx#how-the-tenant-is-resolved).

| Key | Env variable | Default | Description |
|---|---|---|---|
| `filenet.ce-api-url` | — | (empty) | Content Engine Web Services (CEWS) endpoint, e.g. `http://<ce-host>:<port>/wsi/FNCEWS40MTOM/`. Required when the plugin is enabled. |
| `filenet.oidc-realm` | `FILENET_OIDC_REALM` | (empty) | Name of the OIDC/OAuth provider trust registered on the Content Platform Engine via ACCE. Every CE call is authenticated as the current caller (via `OpenTokenCredentials`), not a shared service account — see [Integrate with FileNet](../how_to/integrate_with_filenet.mdx#04-configure-oidc-trust-on-the-content-platform-engine). Required. |
| `filenet.common-system-properties` | — | `DocumentTitle`, `DateCreated`, `DateLastModified`, `Creator`, `LastModifier`, `MajorVersionNumber`, `MimeType` | List of properties (name, title, dataType, multiValued, allowedValues) surfaced to the LLM as the searchable/readable data model. Override if your object store uses a different default schema. |
| `filenet.writable-properties` | — | (empty) | List of properties (same structure as above) intended to be writable by the LLM. Configured but **not yet wired to a callable tool** — there is currently no LLM-callable way to update a FileNet document property. |

Example:

```yaml
filenet:
  ce-api-url: ${FILENET_CE_API_URL:}
  oidc-realm: ${FILENET_OIDC_REALM:}
  # common-system-properties: (defaults shipped with the plugin)
  # writable-properties:
  #   - name: DocumentTitle
  #     title: Document Title
  #     dataType: "xs:string"
  #     multiValued: false
```

The IBM Content Engine Java API dependencies (`com.filenet:jace`, `com.filenet:p8cel10n`) required to build this plugin are proprietary and resolved from the Arondor Artifactory, not Maven Central.

See [Integrate with FileNet](../how_to/integrate_with_filenet.mdx) for deployment steps, including the ICN plugin and the gateway's `FileNetProvider` JWT settings.

## mcp-server.yml

MCP (Model Context Protocol) boot-time configuration. Starting with 2026.0.0-ft3, MCP connections are typically managed through the admin UI ([Managing MCP servers](../admin/managing_mcp_servers.md)) rather than this file; the shipped `mcp-server.yml` is commented out.

```yaml
# mcp:
#   client:
#     name: uxopian-ai-mcp-server
#     log-requests: true
#   sse:
#     url: ${MCP_SSE_URL:http://localhost:8081/uxopian/ai/sse}
```

| Key | Env variable | Description |
|---|---|---|
| `mcp.sse.url` | `MCP_SSE_URL` | Legacy boot-time MCP SSE endpoint URL. Prefer the admin UI for runtime management. |
| `mcp.client.name` | — | MCP client name presented to the server. |

## script-scan.yml

Configuration for the LLM-based security scan applied to admin-managed scripts (see [Managing scripts](../admin/managing_scripts.md)). Added in 2026.0.0-ft4. The file is imported optionally, so its absence is non-fatal; without a configured provider, scripts can still be created, edited, and force-published, but the **Scan & publish** action is unavailable.

| Key | Env variable | Default | Description |
|---|---|---|---|
| `script.scan.llm-provider-id` | `SCRIPT_SCAN_LLM_PROVIDER` | (empty) | ID of a configured LLM provider used to run the scan. Required to enable scanning. |
| `script.scan.llm-model` | `SCRIPT_SCAN_LLM_MODEL` | (empty) | Model used for the scan; falls back to the provider's default model when blank. |
| `script.scan.prompt` | — | (built-in) | The security-review prompt sent to the model. Override to customize the scan policy. |

Example:

```yaml
script:
  scan:
    llm-provider-id: ${SCRIPT_SCAN_LLM_PROVIDER:}
    llm-model: ${SCRIPT_SCAN_LLM_MODEL:}
    # prompt: (built-in security-review prompt; override to customize)
```

## gateway-application.yaml

Gateway (uxopian-gateway) configuration.

| Key | Description |
|---|---|
| `server.port` | Gateway listening port (default: `8085`) |
| `app.gateway.provider-header` | Header carrying the provider ID for multi-provider setups |
| `app.routes[].id` | Route identifier (used in logs) |
| `app.routes[].uri` | Backend service URI (e.g., `http://uxopian-ai:8080`) |
| `app.routes[].path` | Ant path pattern — incoming requests must match this to activate the route |
| `app.routes[].prefix` | Base prefix prepended to all security rule paths for matching against incoming requests |
| `app.routes[].rewritePath` | Comma-separated `regex, replacement` — rewrites the request path **before** forwarding to the backend. Uses Java named capture groups (`(?<name>...)`), referenced as `$\{name}` in the replacement. |
| `app.routes[].provider` | AuthProvider bean name — either a built-in singleton (`DevProvider`, `FlowerDocsProvider`, `Fast2Provider`, `AlfrescoProvider`, `FileNetProvider`) or a name declared under `app.providers` below |
| `app.routes[].security[].path` | Path pattern for security rule (relative — combined with `prefix` at startup) |
| `app.routes[].security[].public` | If `true`, no authentication required for this path |
| `app.routes[].security[].roles` | List of required roles for this path |

YAML anchors (`&ANCHOR` / `*alias`) can be used to share URI and security rule definitions across multiple routes. Define anchors at the root level (before `app:`).

See [Configure gateway routes](../how_to/configure_gateway_routes.md) for a step-by-step guide to deriving `path`, `prefix`, and `rewritePath` values, debug logging instructions, and a full FlowerDocs example.

#### The gateway's own endpoints (`app.security`)

`app.routes[].security[]` rules only apply within their own route's path — they never cover paths the gateway serves itself (`/actuator/**`, and nothing else, since routes are the only other traffic). A top-level `app.security` list configures those gateway-owned paths:

| Key | Description |
|---|---|
| `app.security[].path` | Path pattern, matched as-is (no route `prefix` involved) |
| `app.security[].public` | If `true`, no authentication required |
| `app.security[].roles` | List of required roles |

Without this, `/actuator/health` falls through to "authenticated" by default — which 401s the Kubernetes liveness/readiness probe and crash-loops the pod. The shipped `application.yml` sets:

```yaml
app:
  security:
    - path: "/actuator/health"
      public: true
    - path: "/actuator/**"
      roles: ["ADMIN"]
```

#### Named provider instances (`app.providers`)

Since 2026.0.0-ft5, a provider type that ships an `AuthProviderFactory` (currently `Fast2Provider`, `AlfrescoProvider`, and `FileNetProvider`) can be instantiated **more than once**, under an operator-chosen name — for example, to serve two separate FileNet tenants from one gateway. Omitting `app.providers` entirely keeps the previous single-instance-per-type behavior; this is purely additive.

| Key | Description |
|---|---|
| `app.providers.<name>.type` | One of the provider types above that supports named instances |
| `app.providers.<name>.config.*` | Arbitrary key/value configuration passed to that provider type's factory (same keys as the type's own dedicated config block) |

```yaml
app:
  providers:
    filenet-tenant-a:
      type: FileNetProvider
      config:
        ce-api-url: http://ce-a:9080/wsi/FNCEWS40MTOM/
        oidc-realm: tenantARealm
    filenet-tenant-b:
      type: FileNetProvider
      config:
        ce-api-url: http://ce-b:9080/wsi/FNCEWS40MTOM/
        oidc-realm: tenantBRealm
  routes:
    - id: filenet-a
      provider: filenet-tenant-a
      # ...
    - id: filenet-b
      provider: filenet-tenant-b
      # ...
```

The instance name must not collide with a built-in provider bean name. Failing to declare `type`, referencing a type with no `AuthProviderFactory`, or a factory error at startup all fail fast with a clear message.

#### CORS (`app.cors`)

Since 2026.0.0-ft5, cross-origin access is controlled by the gateway itself.

| Key | Description |
|---|---|
| `app.cors.allowed-origins` | List of allowed origins for cross-origin requests. Empty (the default) allows none — set this explicitly if a browser client on a different origin must reach the gateway. |

#### Gateway-signed internal auth (`internal-auth.jwt`)

Since 2026.0.0-ft5, the gateway can sign every proxied request so uxopian-ai no longer has to trust bare `X-User-*` headers from whatever reaches it — see [uxopian-ai's `internal-auth.jwt.secret`](#gateway-signed-request-authentication), which must match exactly.

| Key | Env variable | Default | Description |
|---|---|---|---|
| `internal-auth.jwt.secret` | `INTERNAL_AUTH_JWT_SECRET` | (empty, signing off) | HS256 shared secret, **at least 32 bytes**. Signing is simply inactive when unset — no error. |
| `internal-auth.jwt.issuer` | `INTERNAL_AUTH_JWT_ISSUER` | `uxopian-gateway-internal` | `iss` claim stamped on the issued assertion. |
| `internal-auth.jwt.ttl-seconds` | `INTERNAL_AUTH_JWT_TTL_SECONDS` | `30` | Assertion lifetime. |

Public paths get signed too, not just authenticated ones: any request the gateway forwards for a path marked `public` in `app.security`/`app.routes[].security[]` still carries a signed `X-Gateway-Auth` assertion when a secret is configured — an anonymous one (no `sub`/`tenantId`, just the `provider` claim). Any `X-Gateway-Auth` the client itself supplied is stripped and replaced first, never appended to.

## Related pages

- [Environment variables reference](./environment_variables.md)
- [Multi-tenancy](../understanding/multi_tenancy.md)
- [LLM providers](../understanding/llm_providers.md)
- [Prompts and templating](../understanding/prompts_and_templating.md)
- [Managing LLM providers in the admin UI](../admin/managing_llm_providers.md)
- [Managing prompts in the admin UI](../admin/managing_prompts.md)
- [Monitoring statistics](../admin/monitoring_statistics.md)
