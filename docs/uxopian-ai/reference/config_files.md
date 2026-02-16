---
title: "Configuration Files"
sidebar_position: 1
---
# **⚙️ Configuration**

This section details the complete configuration of the uxopian-ai service using YAML files.

The framework follows the **Spring Boot externalized configuration** model. Configurations are modular and split into specific files located in the ./config/ directory.

## **📂 1. General Application Configuration (application.yml)**

The entry point for configuration. It defines server settings, security profiles, and imports other configuration modules.

```yml
app:
  base-url: ${APP_BASE_URL:} # Public URL of the application

server:
  servlet:
    context-path: ${CONTEXT_PATH:} # Context path (e.g., /ai)
  port: ${UXOPIAN_AI_PORT:8080} # Server port

spring:
  config:
    import:
      - "optional:file:./config/llm-clients-config.yml"
      - "optional:file:./config/prompts.yml"
      - "optional:file:./config/goals.yml"
      - "optional:file:./config/mcp-server.yml"
      - "optional:file:./config/opensearch.yml"
      - "optional:file:./config/metrics.yml"
      - "optional:file:./config/application.yml"
  codec:
    max-in-memory-size: 20MB # Adjust for large payloads (e.g., images)
  main:
    banner-mode: "off"
  profiles:
    # Use "dev" to disable authentication requirements for testing
    active: ${SPRING_PROFILES_ACTIVE:}

dotenv:
  ignoreIfMissing: true
  filename: .env
```

## **🔌 2. Enterprise Connectors (FlowerDocs & ARender)**

To enable deep integration with your document management ecosystem, specific connectors must be configured in application.yml. These settings allow uxopian-ai to retrieve document content and generate previews.

```yml
# FlowerDocs Core Integration
ws:
  # URL to the FlowerDocs Core Web Services
  # Examples: https://my-fd/core/ or http://localhost:8081/core
  url: ${FD_WS_URL:#{null}}

# ARender Integration
rendition:
  # Base URL for the ARender Rendition Server
  # Examples: https://my-arender-rendition or http://localhost:8761
  base-url: ${RENDITION_BASE_URL:#{null}}
```

**Note:** If these URLs are not set (null), the associated features (RAG on FlowerDocs documents, Document Previews) will be disabled.

## **🛠️ 3. MCP Server Client (mcp-server.yml)**

uxopian-ai can act as a client for the **Model Context Protocol (MCP)**, connecting to external MCP servers to access tools or resources via SSE (Server-Sent Events).

```yml
mcp:
  client:
    name: uxopian-ai-mcp-server
    log-requests: true # Useful for debugging tool calls
  sse:
    # The endpoint of the external MCP server
    url: ${MCP_SSE_URL:http://localhost:8081/uxopian/ai/sse}

  # Logging level for the MCP subsystem
  level:
    org:
      springframework:
        web: TRACE
```

## **🔗 4. Persistence & Vector Database (opensearch.yml)**

Configures the connection to OpenSearch. This is critical for storing:

1. Conversation history
2. Prompts and Goals definitions
3. LLM Provider configurations
4. Vector embeddings (for RAG)
5. Metrics

```yml
opensearch:
  host: ${OPENSEARCH_HOST:localhost}
  port: ${OPENSEARCH_PORT:9200}
  scheme: ${OPENSEARCH_SCHEME:http}
  username: ${OPENSEARCH_USERNAME:} # Leave empty if no auth
  password: ${OPENSEARCH_PASSWORD:} # Leave empty if no auth

  # CAUTION: Set to true only in development.
  # Forces an index refresh after every write (impacts performance).
  force-refresh-index: ${OPENSEARCH_FORCE_REFRESH_INDEX:false}
```

## **📊 5. Metrics & Monitoring (metrics.yml)**

Configures **Micrometer** and **Spring Actuator** to export telemetry data directly to OpenSearch. This data powers the Admin Dashboard statistics.

```yml
management:
  elastic:
    metrics:
      export:
        enabled: true
        # Target OpenSearch/Elasticsearch instance
        host: http://${opensearch.host}:${opensearch.port}
        # Index name for metrics
        index: micrometer-metrics
        auto-create-index: true
  endpoints:
    web:
      exposure:
        include: health,info,loggers
  metrics:
    uxopian-ai:
      enable: true # Enables custom business metrics (Token usage, ROI, etc.)
    # Standard JVM metrics can be noisy, disable them if not needed
    enable:
      application: false
      tomcat: false
      logback: false
      jvm: false
      system: false
      http: false
      process: false
      disk: false
      executor: false
```

## **🤖 6. LLM Clients Configuration (llm-clients-config.yml)**

This file manages global LLM defaults and dynamic provider configuration.

### **6.1 Global Defaults & Context**

```yml
llm:
  default:
    provider: ${LLM_DEFAULT_PROVIDER:openai}
    model: ${LLM_DEFAULT_MODEL:gpt-5.1}
    base-prompt: ${LLM_DEFAULT_PROMPT:basePrompt}

  context: ${LLM_CONTEXT_SIZE:10} # Sliding window size (number of messages)
  debug:
    enabled: ${LLM_DEBUG:false} # Logs full requests/responses (CAUTION: Sensitive data)
```

### **6.2 Dynamic Provider Configuration** {#dynamic-provider-configuration}

Since v2026.0.0-ft2, LLM provider configurations are **dynamic entities** stored in OpenSearch. They can be created, updated, and deleted at runtime via the [Admin API](api.md#administration--llm-providers) or the [Admin UI](../admin/llm_providers.md).

YAML bootstrapping is still supported: configurations defined in this file are loaded into OpenSearch at startup, then managed dynamically. This section documents the YAML structure used for bootstrapping.

#### Structure Overview

A provider configuration (`LlmProviderConf`) contains:

- **Provider type** — The name of the registered provider bean (e.g., `openai`, `anthropic`).
- **Default model alias** — Which model to use when no model is specified.
- **Global configuration** (`globalConf`) — Connection and generation parameters shared across all models.
- **Model configurations** (`llModelConfs[]`) — Per-model overrides. Each model inherits from `globalConf` and can override any field.

#### Configuration Fields

**`LlmBaseConf`** — Shared by both global and per-model configurations:

| Field | Type | Description |
| :---- | :--- | :---------- |
| `apiSecret` | String | API key or secret. Encrypted at rest via AES-GCM. |
| `endpointUrl` | String | Provider API base URL. |
| `temperature` | Double | Sampling temperature (0.0 – 2.0). |
| `topP` | Double | Nucleus sampling threshold. |
| `topK` | Integer | Top-K sampling parameter. |
| `seed` | Integer | Deterministic seed for reproducibility. |
| `maxTokens` | Integer | Maximum tokens in the response. |
| `presencePenalty` | Double | Penalizes repeated topics. |
| `frequencyPenalty` | Double | Penalizes repeated tokens. |
| `maxRetries` | Integer | Number of retry attempts on failure. |
| `timeout` | Duration | Request timeout (e.g., `60s`). |
| `multiModalSupported` | Boolean | Whether the model supports image inputs. |
| `functionCallSupported` | Boolean | Whether the model supports tool/function calling. |
| `extras` | Map | Provider-specific key-value pairs (e.g., `deploymentName` for Azure). |

**`LlmModelConf`** — Extends `LlmBaseConf` with two additional fields:

| Field | Type | Description |
| :---- | :--- | :---------- |
| `llmModelConfName` | String | Alias used in prompts and API calls (e.g., `my-gpt5`). |
| `modelName` | String | Actual model identifier sent to the provider's API (e.g., `gpt-5.1`). |

:::info[Configuration Inheritance]
When processing a request, the service merges global and model-specific settings. Model-level values take precedence over global values. Fields not set at the model level fall back to the global configuration. See [Parameter Precedence](../understanding/concepts.md#parameter-precedence).
:::


#### Full YAML Example

```yml
llm:
  provider:
    # 1. Global Provider Configurations (apply to all tenants)
    globals:
      - provider: openai
        defaultLlmModelConfName: gpt5
        globalConf:
          apiSecret: ${OPENAI_API_KEY:}
          temperature: 0.7
          maxRetries: 3
          timeout: 60s
        llModelConfs:
          - llmModelConfName: gpt5
            modelName: gpt-5.1
            multiModalSupported: true
            functionCallSupported: true
          - llmModelConfName: gpt5-mini
            modelName: gpt-5-mini
            temperature: 0.3
            multiModalSupported: true
            functionCallSupported: true
          - llmModelConfName: gpt4
            modelName: gpt-4.1
            multiModalSupported: true
            functionCallSupported: true

      - provider: anthropic
        defaultLlmModelConfName: claude-sonnet
        globalConf:
          apiSecret: ${ANTHROPIC_API_KEY:}
          endpointUrl: https://api.anthropic.com/v1/
        llModelConfs:
          - llmModelConfName: claude-sonnet
            modelName: claude-sonnet-4-20250514
            multiModalSupported: true
            functionCallSupported: true

    # 2. Tenant-Specific Overrides
    tenants:
      - tenantId: tenant-A
        mergeStrategy: MERGE  # Options: MERGE, OVERWRITE, CREATE_IF_MISSING
        providers:
          - provider: openai
            defaultLlmModelConfName: gpt5
            globalConf:
              apiSecret: sk-tenant-a-specific-key
            llModelConfs:
              - llmModelConfName: gpt5
                modelName: gpt-5.1
                multiModalSupported: true
                functionCallSupported: true
```

#### Merge Strategies

When tenant-specific configurations are defined, the `mergeStrategy` field controls how they combine with global configurations:

| Strategy | Behavior |
| :------- | :------- |
| `MERGE` | Tenant providers are merged with globals. Matching providers are updated; non-matching ones are added. |
| `OVERWRITE` | Tenant configuration completely replaces the global configuration. |
| `CREATE_IF_MISSING` | Tenant providers are only added if no global configuration exists for that provider type. |

#### API Secret Encryption

API secrets stored in OpenSearch are encrypted using **AES-GCM**. Set the encryption key via the `APP_SECURITY_SECRET_KEY` environment variable (Base64-encoded AES key). See [Environment Variables](env_variables.md).

## **🧩 7. Bootstrapping Prompts, Goals & LLM Providers**

These files are used to initialize the system with default data. They support global definitions and tenant-specific overrides. Data defined in YAML is loaded into OpenSearch at startup and can then be managed dynamically via the Admin API or UI.

### **Prompts (prompts.yml)**

```yml
prompts:
  backup:
    path: ${PROMPTS_BACKUP_PATH:./prompts/}

  # 1. Global Prompts (Apply to everyone)
  globals:
    - id: basePrompt
      role: SYSTEM
      content: |
        You are Xopia. You were born in 2025...
      reasoningDisabled: false
      requiresMultiModalModel: false
      requiresFunctionCallingModel: false

  # 2. Tenant Specifics
  tenants:
    - tenantId: tenant-A
      mergeStrategy: merge # Options: merge, override, createIfMissing
      prompts:
        - id: specificPrompt
          role: USER
          content: "Use only the information explicitly present in the document..."
          requiresMultiModalModel: false
          requiresFunctionCallingModel: false
```

### **Goals (goals.yml)**

```yml
goals:
  backup:
    path: ${GOALS_BACKUP_PATH:./goals/}

  globals: []

  tenants:
    - tenantId: tenant-A
      mergeStrategy: merge
      goalGroups:
        - id: compare
          goals:
            - promptId: detailedComparisonForTenantA
              filter: "[[${documentType == 'contract'}]]"
              index: 125
            - promptId: genericComparison
              filter: "true"
              index: 1000
```

### **LLM Providers (llm-clients-config.yml)**

LLM Provider configurations follow the same bootstrapping pattern. They are defined under `llm.provider.globals` and `llm.provider.tenants` in `llm-clients-config.yml`. See [Section 6.2](#dynamic-provider-configuration) for the full YAML structure and field reference.

---

For a quick reference of all environment variables available for Docker deployments, see [Environment Variables](env_variables.md).
