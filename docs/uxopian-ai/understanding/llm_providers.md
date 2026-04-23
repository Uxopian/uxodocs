---
title: LLM providers
sidebar_label: LLM providers
sidebar_position: 8
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 0029a63ed1544dc24fa016a25c89c0fbf6a495c64abbf72180ed63077d398b23
---

Uxopian AI supports nine LLM providers. Provider configurations are loaded from `llm-clients-config.yml` at startup into OpenSearch, then managed at runtime via the Admin API.

## Provider overview

| Provider | Bean name | Models |
|---|---|---|
| OpenAI | `openai` | gpt-5.1, gpt-4.1, gpt-4o |
| Anthropic | `anthropic` | claude-sonnet-4, claude-opus-4 |
| Azure OpenAI | `azure-openai` | gpt-4o via deployment |
| AWS Bedrock | `bedrock` | claude-3-sonnet, cohere |
| Google Gemini | `gemini` | gemini-2.5-pro, flash |
| Mistral AI | `mistral-ai` | mistral-large, mistral-small |
| HuggingFace | `huggingface` | Mistral-7B, Llama-3-8B |
| Ollama | `ollama` | llama3 (local) |
| NuExtract | `nu-extract` | specialized extraction |

## Configuration structure

Each provider is configured in `llm-clients-config.yml` under `llm.provider.globals`:

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

### Global configuration fields

| Field                     | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `provider`                | Provider identifier (see table below)              |
| `defaultLlmModelConfName` | Default model configuration name for this provider |
| `globalConf.apiSecret`    | API key or secret credential                       |
| `globalConf.endpointUrl`  | Base URL for the provider API                      |
| `globalConf.temperature`  | Sampling temperature (0.0 to 1.0+)                 |
| `globalConf.timeout`      | Request timeout (e.g., `60s`)                      |
| `globalConf.maxRetries`   | Number of retry attempts on failure                |
| `globalConf.extras`       | Provider-specific additional parameters            |

### Model configuration fields

| Field                   | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| `llmModelConfName`      | Internal name used to reference this model                        |
| `modelName`             | Actual model name sent to the provider API                        |
| `multiModalSupported`   | Whether this model accepts image inputs                           |
| `functionCallSupported` | Whether this model supports function calling (required for tools) |

## Supported providers

Each provider is a Spring `@Service` bean. The bean name (shown in the `provider` column) is the identifier used in `llm-clients-config.yml` and the admin UI.

| Provider      | `provider` value | Auth fields                           | Extra parameters                               | Streaming |
| ------------- | ---------------- | ------------------------------------- | ---------------------------------------------- | --------- |
| OpenAI        | `openai`         | `apiSecret`, `endpointUrl` (optional) |                                                | Yes       |
| Anthropic     | `anthropic`      | `apiSecret`, `endpointUrl`            |                                                | Yes       |
| Azure OpenAI  | `azure-openai`   | `apiSecret`, `endpointUrl`            |                                                | Yes       |
| AWS Bedrock   | `bedrock`        | `apiSecret`                           | `AwsRegion`, `AwsAccessKey`, `AwsSessionToken` | Yes       |
| Google Gemini | `gemini`         | `apiSecret`                           |                                                | Yes       |
| Mistral AI    | `mistral-ai`     | `apiSecret`, `endpointUrl`            |                                                | Yes       |
| Ollama        | `ollama`         | `endpointUrl`                         |                                                | Yes       |
| HuggingFace   | `huggingface`    | `apiSecret`                           |                                                | No        |
| NuExtract     | `nu-extract`     | `apiSecret`, `endpointUrl`            | `modelId`                                      | Yes       |

All providers are implemented as LangChain4J wrappers. See [Write a custom LLM client](../extending/custom_llm_client.md) for the full source code of each provider and instructions to create your own.

## Credential encryption

API keys are encrypted with AES/GCM before being stored in OpenSearch. The encryption key is configured via `app.security.secret-key` in `application.yml`. If not set, a default development key is used. Set a unique key in production.

## Default provider and model

The default provider and model used when none is specified per-request:

- `LLM_DEFAULT_PROVIDER`: provider identifier (default: `openai`)
- `LLM_DEFAULT_MODEL`: model name (default: `gpt-5.1`)
- `LLM_DEFAULT_PROMPT`: base prompt ID (default: `basePrompt`)

These can be overridden per-request via query parameters (`provider`, `model`) on the requests endpoint.

## Context size

`llm.context` (or `LLM_CONTEXT_SIZE`) controls how many previous requests from the conversation are included in each LLM call. Default: `10`.

## Tenant overrides

Per-tenant LLM provider configurations can be defined under `llm.provider.tenants` with a `mergeStrategy` of `MERGE`, `OVERWRITE`, or `CREATE_IF_MISSING`. This allows different tenants to use different API keys or models. See [Multi-tenancy](./multi_tenancy.md).

## Related pages

- [Configure LLM providers](../how_to/configure_llm_providers.md)
- [Write a custom LLM client](../extending/custom_llm_client.md)
- [Managing LLM providers in the admin UI](../admin/managing_llm_providers.md)
- [Multi-tenancy](./multi_tenancy.md)
- [Configuration file reference](../reference/configuration.md)
- [Environment variables reference](../reference/environment_variables.md)
