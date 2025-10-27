---
title: Configuration & API Reference
description: How to configure the uxopian-ai service using .yml files and interact with it through its REST API
sidebar_position: 1
---

# Configuration & API

This section details how to configure the `uxopian-ai` service using `.yml` files and how to interact with it through its REST API.

---

## ⚙️ Configuration Management

The framework uses a standard **Spring Boot configuration model**, making it flexible and easy to manage across different environments.

### 📁 Configuration Files and Profiles

Configuration is primarily defined in:

```bash
src/main/resources/application.yml
```

You can override any property using **environment variables**, which is the recommended approach for Docker deployments.

To manage multiple environments (e.g., development, production), use **Spring Profiles**:

```yaml
# Default properties
llm:
  default:
    model: ${LLM_DEFAULT_MODEL:gpt-3.5-turbo}
    provider: ${LLM_DEFAULT_PROVIDER:openai}
    base-prompt: ${LLM_DEFAULT_PROMPT:basePrompt}

---
spring:
  config:
    activate:
      on-profile: dev
opensearch:
  host: http://dev-opensearch:9200
```

### 🤖 LLM Provider Configuration

You can select the default LLM provider and configure its credentials in your configuration files or via environment variables:

```yaml
llm:
openai:
  api-key: ${OPENAI_API_KEY:your-api-key}
  model-name: gpt-3.5-turbo
  temperature: 0.7
  timeout: 60s
  supported-models:
    - gpt-4o
    - gpt-4-turbo
    - gpt-3.5-turbo
    - dall-e-3

gemini:
  api-key: ${GEMINI_API_KEY:none}
  model-name: gemini-1.5-pro-latest
  temperature: 0.7
  timeout: 60s
  supported-models:
    - gemini-1.5-pro-latest
    - gemini-1.5-flash-latest
    - gemini-pro
```

✅ Supported providers:

- `openai`
- `azure`
- `anthropic`
- `bedrock`
- `gemini`
- `huggingface`
- `mistral`
- `ollama`

Each provider may have specific required fields.

### 🔗 OpenSearch and Qdrant Settings

These settings define your persistence and vector storage layers:

```yaml
opensearch:
  host: ${OPENSEARCH_HOST:localhost}
  port: ${OPENSEARCH_PORT:9200}
  force-refresh-index: ${OPENSEARCH_FORCE_REFRESH_INDEX:false}
qdrant:
  url: ${QDRANT_URL:http://localhost:6333}
  api-key: ${QDRANT_API_KEY:}
```

> Disabling `qdrant` (`enabled: false`) disables vector search and RAG-based features.

---

## 🧩 Entities Bootstrapped from YAML

At startup, `uxopian-ai` can automatically load Prompts and Goals from YAML files via `spring.config.import`. These imports are **merged** into OpenSearch using a strategy defined by the application:

```yaml
spring:
  config:
    import:
      - "optional:classpath:prompts.yml"
      - "optional:classpath:goals.yml"
```

### Merge Strategy Configuration

Each YAML import uses one of the following strategies:

| Strategy          | Prompts (by `id`)                           | Goals (by `name`)                         |
| ----------------- | ------------------------------------------- | ----------------------------------------- |
| `Override`        | Deletes all prompts, then recreates them    | Deletes all goals, then recreates them    |
| `Merge`           | Merges missing values into existing prompts | Merges missing values into existing goals |
| `CreateIfMissing` | Adds only new prompts                       | Adds only new goals                       |

---

## 🧪 REST API Reference

All interactions with `uxopian-ai` go through its REST API, including:

- Managing conversations and messages
- CRUD operations on Prompts and Goals
- Sending dynamic LLM requests

For full documentation and testing:

👉 Visit the [**Swagger UI**](https://iris.demos.uxopian.com/ai/swagger-ui.html)

> The Swagger UI includes all routes, schemas, and live testing tools.

---

## ✅ Best Practices

- 📌 Use environment variables for secrets and deployment-specific overrides
- 📂 Version control your YAML configuration and backups
- 🔁 Use the Merge/CreateIfMissing strategy during CI/CD deployments to preserve custom data
- 🧪 Use Swagger UI to validate and explore all available endpoints interactively