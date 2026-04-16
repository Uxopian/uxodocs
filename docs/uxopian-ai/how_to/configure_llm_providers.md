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
          timeout: 60
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
          timeout: 60
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
          timeout: 60
        llModelConfs:
          - llmModelConfName: claude-sonnet
            modelName: claude-sonnet-4-20250514
            multiModalSupported: true
            functionCallSupported: true
```

### Configure Azure OpenAI

Azure requires an endpoint URL. The `modelName` field is used as the deployment name.

```yaml
- provider: azure-openai
  defaultLlmModelConfName: azure-gpt4o
  globalConf:
    apiSecret: ${AZURE_OPENAI_API_KEY:}
    endpointUrl: https://your-resource.openai.azure.com/
    temperature: 0.7
    maxRetries: 3
    timeout: 60
  llModelConfs:
    - llmModelConfName: azure-gpt4o
      modelName: your-deployment-name
      multiModalSupported: true
      functionCallSupported: true
```

### Configure AWS Bedrock

Bedrock uses access/secret key pairs rather than an API key:

```yaml
- provider: bedrock
  defaultLlmModelConfName: bedrock-claude
  globalConf:
    timeout: 60
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
    timeout: 60
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

```ini
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

## YAML vs database: how configuration is applied

Provider configurations from `llm-clients-config.yml` are loaded into OpenSearch at startup. Once stored, the database becomes the source of truth. The `mergeStrategy` on each tenant entry controls what happens on subsequent restarts:

| Strategy | Behavior at startup |
|---|---|
| `OVERWRITE` | Deletes all existing provider configurations for the tenant, then writes the YAML entries. Any changes made via admin UI or API are lost. |
| `MERGE` | Writes YAML entries only if a provider with the same name does not already exist in the database. Existing configurations (including admin UI changes) are preserved. |
| `CREATE_IF_MISSING` | Same as `MERGE`: creates entries only when they are missing from the database. |

Tenant-specific providers take precedence over globals. If a tenant entry defines a provider with the same name as a global, only the tenant version is loaded.

```yaml
llm:
  provider:
    globals:
      - provider: openai
        # ...
    tenants:
      - tenantId: my-tenant
        mergeStrategy: MERGE
        providers:
          - provider: anthropic
            # tenant-specific config for anthropic
```

## Modify an existing provider

There are two ways to change the configuration of a provider that is already running.

### Via the admin UI (no restart)

1. Open the admin panel and navigate to LLM Providers.
2. Click the provider to open its detail page.
3. On the **Configuration** tab, edit any field (endpoint, temperature, timeout, retries, extra parameters). The API secret is masked; enter a new value only to replace it.
4. On the **Models** tab, add, edit, or remove model configurations.
5. Click **Save**. Changes take effect immediately for new requests.
6. Use the **Test** tab to verify the provider is reachable with the new settings.

Changes made via the admin UI are persisted in OpenSearch. They survive restarts as long as the merge strategy is `MERGE` or `CREATE_IF_MISSING`. If the strategy is `OVERWRITE`, the YAML config replaces the database on each restart.

### Via llm-clients-config.yml (requires restart)

1. Edit the provider entry in `config/llm-clients-config.yml`.
2. If the merge strategy is `MERGE`, the YAML change is ignored because the provider already exists in the database. Switch to `OVERWRITE` to force the new configuration.
3. Restart uxopian-ai.

:::warning
Using `OVERWRITE` deletes all provider configurations for the tenant at startup, including changes made via the admin UI. Use it only when you need to reset to a known state.
:::

### Via the Admin API (no restart)

Update an existing provider by ID:

```bash
curl -X PUT https://your-gateway/api/v1/admin/llm/provider-conf/{providerId} \
  -H "Content-Type: application/json" \
  -d '{
  "provider": "openai",
  "defaultLlmModelConfName": "gpt5",
  "globalConf": {
    "apiSecret": "sk-new-key",
    "temperature": 0.5,
    "timeout": 120,
    "maxRetries": 5
  },
  "llModelConfs": [
    {
      "llmModelConfName": "gpt5",
      "modelName": "gpt-5.1",
      "multiModalSupported": true,
      "functionCallSupported": true
    }
  ]
}'
```

Other API operations:

```bash
# List all configurations
curl https://your-gateway/api/v1/admin/llm/provider-conf

# Create a new configuration
curl -X POST https://your-gateway/api/v1/admin/llm/provider-conf \
  -H "Content-Type: application/json" \
  -d '{ ... }'

# Delete a configuration
curl -X DELETE https://your-gateway/api/v1/admin/llm/provider-conf/{providerId}
```

See also [Managing LLM providers in the admin UI](../admin/managing_llm_providers.md).

## Related pages

- [LLM providers](../understanding/llm_providers.md)
- [Write a custom LLM client](../extending/custom_llm_client.md)
- [Managing LLM providers in the admin UI](../admin/managing_llm_providers.md)
- [Configuration file reference](../reference/configuration.md)
- [Environment variables reference](../reference/environment_variables.md)
