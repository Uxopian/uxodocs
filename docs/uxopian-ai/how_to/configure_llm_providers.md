---
title: Configure LLM providers
sidebar_label: Configure LLM providers
sidebar_position: 5
last_update:
  date: '2026-03-24T12:58:17.027Z'
  author: CI/CD Bot
content_hash: 4924f46aadfcd26685694b7837160fe18b133f8e7df954623454e9f29e7e1067
---

This guide explains how to configure LLM providers in `llm-clients-config.yml`, set the default provider and model, and manage providers at runtime via the Admin API.

## Prerequisites

- A running Uxopian AI stack
- API credentials for at least one LLM provider

## Configure via llm-clients-config.yml

The `config/llm-clients-config.yml` file defines all provider configurations. Configurations are loaded into OpenSearch at startup and can be updated at runtime via the Admin API.

### Minimal configuration (OpenAI)

```yaml
llm:
  default:
    provider: ${LLM_DEFAULT_PROVIDER:openai}
    model: ${LLM_DEFAULT_MODEL:gpt-5.1}
    base-prompt: ${LLM_DEFAULT_PROMPT:basePrompt}
  context: ${LLM_CONTEXT_SIZE:10}
  provider:
    globals:
      - provider: openai
        defaultLlmModelConfName: gpt5
        globalConf:
          apiSecret: ${OPENAI_API_KEY:}
          temperature: 1
          timeout: 60s
          maxRetries: 3
        llModelConfs:
          - llmModelConfName: gpt5
            modelName: gpt-5.1
            multiModalSupported: true
            functionCallSupported: true
```

Set `OPENAI_API_KEY` in your `.env` file before starting the stack.

### Add multiple providers

Add more entries under `llm.provider.globals`. Each provider requires its own credentials:

```yaml
llm:
  provider:
    globals:
      - provider: openai
        defaultLlmModelConfName: gpt5
        globalConf:
          apiSecret: ${OPENAI_API_KEY:}
          temperature: 1
          timeout: 60s
          maxRetries: 3
        llModelConfs:
          - llmModelConfName: gpt5
            modelName: gpt-5.1
            multiModalSupported: true
            functionCallSupported: true

      - provider: anthropic
        defaultLlmModelConfName: claude-sonnet
        globalConf:
          apiSecret: ${ANTHROPIC_API_KEY:}
          endpointUrl: https://api.anthropic.com/v1/
          temperature: 0.7
          maxRetries: 3
          timeout: 60s
        llModelConfs:
          - llmModelConfName: claude-sonnet
            modelName: claude-sonnet-4-20250514
            multiModalSupported: true
            functionCallSupported: true
```

### Configure Azure OpenAI

Azure requires an endpoint URL and a deployment name:

```yaml
- provider: azure
  defaultLlmModelConfName: azure-gpt4o
  globalConf:
    apiSecret: ${AZURE_OPENAI_API_KEY:}
    endpointUrl: https://your-resource.openai.azure.com/
    temperature: 0.7
    maxRetries: 3
    timeout: 60s
    extras:
      deploymentName: your-deployment-name
  llModelConfs:
    - llmModelConfName: azure-gpt4o
      modelName: gpt-4o
      multiModalSupported: true
      functionCallSupported: true
```

### Configure AWS Bedrock

Bedrock uses access/secret key pairs rather than an API key:

```yaml
- provider: bedrock
  defaultLlmModelConfName: bedrock-claude
  globalConf:
    timeout: 60s
    maxRetries: 3
    extras:
      accessKey: ${BEDROCK_AWS_ACCESS_KEY:}
      secretKey: ${BEDROCK_AWS_SECRET_KEY:}
      region: us-east-1
  llModelConfs:
    - llmModelConfName: bedrock-claude
      modelName: anthropic.claude-3-sonnet-20240229-v1:0
      multiModalSupported: false
      functionCallSupported: true
```

### Configure Ollama (local)

Ollama requires only an endpoint URL:

```yaml
- provider: ollama
  defaultLlmModelConfName: llama3
  globalConf:
    endpointUrl: http://localhost:11434
    temperature: 0.7
    maxRetries: 3
    timeout: 60s
  llModelConfs:
    - llmModelConfName: llama3
      modelName: llama3
      multiModalSupported: false
      functionCallSupported: true
```

## Credential storage

API keys are encrypted with AES/GCM before being stored in OpenSearch. The encryption key is set via `app.security.secret-key` in `application.yml`. Use a unique key in production to prevent decryption if the OpenSearch data is exposed.

## Set the default provider and model

The default provider and model are used when a request does not specify them:

```bash
# In .env or Docker Compose environment:
LLM_DEFAULT_PROVIDER=openai
LLM_DEFAULT_MODEL=gpt-5.1
```

Or in `llm-clients-config.yml`:

```yaml
llm:
  default:
    provider: anthropic
    model: claude-sonnet-4-20250514
```

Per-request overrides are possible via the `provider` and `model` query parameters on `POST /api/v1/requests`.

## Manage providers at runtime

Providers can be added, updated, and deleted via the Admin API without restarting:

```bash
# List providers for the current tenant
GET /api/v1/admin/llm

# Add a new provider
POST /api/v1/admin/llm
Content-Type: application/json
{ ... provider config ... }

# Update a provider
PUT /api/v1/admin/llm/{providerId}

# Delete a provider
DELETE /api/v1/admin/llm/{providerId}
```

See also [Managing LLM providers in the admin UI](../admin/managing_llm_providers.md).

## Related pages

- [LLM providers](../understanding/llm_providers.md)
- [Configuration file reference](../reference/configuration.md)
- [Environment variables reference](../reference/environment_variables.md)
