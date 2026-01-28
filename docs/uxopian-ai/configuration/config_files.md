---
title: Config files
sidebar_position: 1
last_update:
  date: '2026-01-28T13:32:53.239Z'
  author: CI/CD Bot
content_hash: b03dc5e0a308364162dcea6e62856d289e59bd254e430349e59496b9a3e8c0b0
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
3. Vector embeddings (for RAG)
4. Metrics

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

This file manages the connection to various AI providers.

### **Global Defaults & Context**

```yml
llm:
    default:
        provider: ${LLM_DEFAULT_PROVIDER:openai}
        model: ${LLM_DEFAULT_MODEL:gpt-4o}
        base-prompt: ${LLM_DEFAULT_PROMPT:basePrompt}

    context: ${LLM_CONTEXT_SIZE:10} # Sliding window size (number of messages)
    debug:
        enabled: ${LLM_DEBUG:false} # Logs full requests/responses (CAUTION: Sensitive data)
```

### **Provider Reference**

#### **🔵 OpenAI**

```yml
openai:
	api-key: ${OPENAI_API_KEY:}
	model-name: gpt-5
	temperature: 1
	timeout: 60s
	max-retries: 3
	supported-models:
	- modelName: gpt-5.1
		multi-modal-supported: true
		function-call-supported: true
	- modelName: gpt-5
		multi-modal-supported: true
		function-call-supported: true
	- modelName: gpt-5-mini
		multi-modal-supported: true
		function-call-supported: true
	- modelName: gpt-5-nano
		multi-modal-supported: true
		function-call-supported: true
	- modelName: gpt-4.1
		multi-modal-supported: true
		function-call-supported: true
	- modelName: gpt-4.1-mini
		multi-modal-supported: true
		function-call-supported: true
	- modelName: gpt-4.1-nano
		multi-modal-supported: true
		function-call-supported: true
	- modelName: gpt-4o
		multi-modal-supported: true
		function-call-supported: true
	- modelName: gpt-4o-mini
		multi-modal-supported: true
		function-call-supported: true
	- modelName: gpt-4-turbo
		multi-modal-supported: true
		function-call-supported: true
	- modelName: o3-mini
		multi-modal-supported: false
		function-call-supported: true
	- modelName: o4-mini
		multi-modal-supported: false
		function-call-supported: true
	- modelName: gpt-3.5-turbo
		multi-modal-supported: false
		function-call-supported: true
```

#### **☁️ Azure OpenAI**

```yml
azure:
    openai:
        api-key: ${AZURE_OPENAI_API_KEY:none}
        endpoint: https://your-resource.openai.azure.com/
        deployment-name: your-deployment-name
        model-name: gpt-4o
        supported-models:
            - modelName: your-gpt4o-deployment
              multi-modal-supported: false
              function-call-supported: true
```

#### **🧠 Anthropic (Claude)**

```yml
anthropic:
    api-key: ${ANTHROPIC_API_KEY:none}
    base-url: https://api.anthropic.com/v1/
    model-name: claude-3-5-sonnet-20240620
    supported-models:
        - modelName: claude-3-5-sonnet-20240620
          multi-modal-supported: false
          function-call-supported: true
```

#### **🔶 AWS Bedrock**

```yml
bedrock:
    aws:
        access-key: ${BEDROCK_AWS_ACCESS_KEY:none}
        secret-key: ${BEDROCK_AWS_SECRET_KEY:none}
        region: us-east-1
    model-id: anthropic.claude-3-sonnet-20240229-v1:0
    default-model-name: anthropic.claude-3-sonnet-20240229-v1
    supported-models:
        - modelName: anthropic.claude-3-sonnet-20240229-v1:0
          multi-modal-supported: false
          function-call-supported: true
        - modelName: cohere.command-r-plus-v1:0
          multi-modal-supported: false
          function-call-supported: true
```

#### **✨ Google Gemini**

```yml
gemini:
	api-key: ${GEMINI_API_KEY:none}
	model-name: gemini-2.5-flash
	supported-models:
    	- modelName: gemini-3-pro-preview
    		function-call-supported: true
    		multi-modal-supported: true
    	- modelName: gemini-2.5-flash
    		multi-modal-supported: false
    		function-call-supported: true
    	- modelName: gemini-2.5-flash-lite
    		function-call-supported: true
    		multi-modal-supported: true
    	- modelName: gemini-2.5-pro
    		multi-modal-supported: true
    		function-call-supported: true
    	- modelName: gemini-2.0-flash
    		multi-modal-supported: true
    		function-call-supported: true
    	- modelName: gemini-2.0-flash-lite
    		multi-modal-supported: false
    		function-call-supported: false
```

#### **🤗 HuggingFace**

```yml
huggingface:
    api-key: ${HUGGINGFACE_API_KEY:none}
    model-name: mistralai/Mistral-7B-Instruct-v0.3
    supported-models:
        - modelName: mistralai/Mistral-7B-Instruct-v0.3
          multi-modal-supported: false
          function-call-supported: true
        - modelName: meta-llama/Meta-Llama-3-8B-Instruct
          multi-modal-supported: false
          function-call-supported: true
```

#### **🌪️ Mistral AI**

```yml
mistral:
    api-key: ${MISTRAL_API_KEY:none}
    base-url: https://api.mistral.ai/v1/
    model-name: open-mistral-7b
    supported-models:
        - modelName: open-mistral-7b
          multi-modal-supported: false
          function-call-supported: true
        - modelName: mistral-large-latest
          multi-modal-supported: false
          function-call-supported: true
```

#### **🦙 Ollama (Local)**

```yml
ollama:
    base-url: http://localhost:11434
    model-name: llama3
    supported-models:
        - modelName: llama3
          multi-modal-supported: false
          function-call-supported: true
        - modelName: llama2
          multi-modal-supported: false
          function-call-supported: true
```

#### **📑 NuExtract (Specialized)**

```yml
nu-extract:
    api-key: ${NUEXTRACT_API_KEY:}
    base-url: https://nuextract.ai/api/projects/
    model-name: nu-extract-accident-report
    timeout: 60s
    supported-models:
        - modelName: nu-extract-accident-report
          multi-modal-supported: false
          function-call-supported: false
          model-id: c13ef081-1791-4882-8ba9-2d2ade17b0e2
```

## **🧩 7. Bootstrapping Prompts & Goals**

These files are used to initialize the system with default logic. They support global definitions and tenant-specific overrides.

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

## **📝 8. Environment Variables Reference**

For Docker production deployments, override these variables instead of editing YAML files.

| Variable               | Description                               | Default    |
| ---------------------- | ----------------------------------------- | ---------- |
| SPRING_PROFILES_ACTIVE | Active profile (use dev to disable auth). | _empty_    |
| UXOPIAN_AI_PORT        | Application server port.                  | 8080       |
| APP_BASE_URL           | Public base URL of the service.           | _empty_    |
| LLM_DEFAULT_PROVIDER   | Default LLM provider.                     | openai     |
| LLM_DEFAULT_MODEL      | Default LLM model name.                   | gpt-4o     |
| OPENAI_API_KEY         | API Key for OpenAI.                       | _empty_    |
| ANTHROPIC_API_KEY      | API Key for Anthropic.                    | none       |
| AZURE_OPENAI_API_KEY   | API Key for Azure OpenAI.                 | none       |
| OPENSEARCH_HOST        | Hostname of the OpenSearch instance.      | localhost  |
| OPENSEARCH_PORT        | Port of the OpenSearch instance.          | 9200       |
| OPENSEARCH_USERNAME    | OpenSearch username (if secure).          | _empty_    |
| OPENSEARCH_PASSWORD    | OpenSearch password (if secure).          | _empty_    |
| PROMPTS_BACKUP_PATH    | Path to load/store prompt backups.        | ./prompts/ |
| GOALS_BACKUP_PATH      | Path to load/store goal backups.          | ./goals/   |
