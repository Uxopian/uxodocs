---
title: Configuration file reference
sidebar_label: Configuration files
sidebar_position: 1
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 39d2bac61af3054c32076734e1da064d2d15e5009ab39b4e0ac141ce2b9d84f7
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

`openai`, `anthropic`, `azure`, `bedrock`, `gemini`, `mistral`, `huggingface`, `ollama`, `nu-extract`

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

Goal group definitions.

| Key | Description |
|---|---|
| `goals.backup.path` | Directory for goal backups. Env: `GOALS_BACKUP_PATH`. Default: `./goals/` |
| `goals.globals` | List of global goal groups |
| `goals.tenants` | List of per-tenant goal group overrides |

### Goal group structure

```yaml
goals:
  globals:
    - id: <group-id>
      goals:
        - promptId: <prompt-id>
          filter: "true"          # Thymeleaf boolean expression
          index: 1                # Execution order (ascending)
```

### Tenant override structure

```yaml
goals:
  tenants:
    - tenantId: <tenant-id>
      mergeStrategy: merge | replace
      goalGroups:
        - id: <group-id>
          goals:
            - promptId: <prompt-id>
              filter: "[[${documentType == 'contract'}]]"
              index: 10
```

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

## mcp-server.yml

MCP (Model Context Protocol) configuration. All MCP configuration is commented out by default. MCP support is experimental.

```yaml
# mcp:
#   client:
#     name: uxopian-ai-mcp-server
#     log-requests: true
#   sse:
#   url: ${MCP_SSE_URL:http://localhost:8081/uxopian/ai/sse}
```

| Key | Env variable | Description |
|---|---|---|
| `mcp.sse.url` | `MCP_SSE_URL` | SSE endpoint URL for MCP server |
| `mcp.client.name` | — | MCP client name |

## gateway-application.yaml

Gateway (uxopian-gateway) configuration.

| Key | Description |
|---|---|
| `server.port` | Gateway listening port (default: `8085`) |
| `app.gateway.provider-header` | Header carrying the provider ID for multi-provider setups |
| `app.routes[].id` | Route identifier |
| `app.routes[].uri` | Backend service URI (e.g., `http://uxopian-ai:8080`) |
| `app.routes[].path` | Path pattern to match |
| `app.routes[].provider` | AuthProvider bean name (e.g., `DevProvider`, `FlowerDocsProvider`, `Fast2Provider`) |
| `app.routes[].security[].path` | Path pattern for security rule |
| `app.routes[].security[].public` | If `true`, no authentication required for this path |
| `app.routes[].security[].roles` | List of required roles for this path |

## Related pages

- [Environment variables reference](./environment_variables.md)
- [Multi-tenancy](../understanding/multi_tenancy.md)
- [LLM providers](../understanding/llm_providers.md)
- [Prompts and templating](../understanding/prompts_and_templating.md)
- [Managing LLM providers in the admin UI](../admin/managing_llm_providers.md)
- [Managing prompts in the admin UI](../admin/managing_prompts.md)
- [Monitoring statistics](../admin/monitoring_statistics.md)
