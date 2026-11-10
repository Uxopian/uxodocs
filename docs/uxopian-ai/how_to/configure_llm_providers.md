---
title: Configure LLM providers
sidebar_label: Configure LLM providers
sidebar_position: 7
last_update:
  date: '2026-08-06T14:32:17.232Z'
  author: CI/CD Bot
content_hash: 01c3bb513c6418465516f5cc831cf2d129e2f21d2a6ade0e6a2740193aaf3e92
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
    model: ${LLM_DEFAULT_MODEL:gpt5}
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

Three rules apply to every provider:

- **`llm.default.model` names a model configuration**, the `llmModelConfName` (`gpt5` above), not the model id sent to the provider (`gpt-5.1`). A value that matches no `llmModelConfName` is not an error: uxopian-ai logs `Requested model '…' is unavailable for provider '…'` and uses `defaultLlmModelConfName` instead.
- **`timeout` is in seconds.** `60` waits one minute. It can be set in `globalConf` for the whole provider, or on one entry of `llModelConfs` to override it for that model.
- **Only `llm.provider.globals` is read.** A provider block written at the root of the file (`openai:`, `anthropic:` …) is ignored without any message, as is a list item placed outside `llm.provider.globals`. The snippets below for Azure, Bedrock and Ollama are entries of that list.

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
          maxRetries: 3
          timeout: 60
        llModelConfs:
          - llmModelConfName: claude-sonnet
            modelName: claude-sonnet-5-5
            multiModalSupported: true
            functionCallSupported: true
```

Leave `temperature` out of the Anthropic configuration: some recent Claude models reject a request that sets it (`temperature is deprecated for this model`). The temperature actually sent with a call comes from the prompt — see [Which provider and model runs a call](#which-provider-and-model-runs-a-call).

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

## Which provider and model runs a call

Each turn of a conversation resolves its provider and model on its own, in this order:

1. The `defaultLlmProvider` and `defaultLlmModel` of the prompt the turn executes.
2. If the prompt names none, the `defaultLlmProvider` and `defaultLlmModel` of the usage profile of the calling surface (chat, Quick Prompt, an integration).

Temperature, the reasoning switch and the multimodal and function-calling requirements always come from the prompt. The maximum number of tool cycles comes from the usage profile.

There is no per-request override: the `llm_provider`, `llm_model`, `temperature` and `reasoning` query parameters that earlier versions accepted are ignored, not rejected. There is no fallback on `llm.default.*` at call time either. A call whose prompt and usage profile name no provider fails with *No LLM provider for this call: set a default LLM provider on the usage profile 'ID' or on the prompt*.

The `llm.default.provider` and `llm.default.model` properties (environment variables `LLM_DEFAULT_PROVIDER` and `LLM_DEFAULT_MODEL`) now have a single role: they fill the usage profile that is created automatically for a connection provider that has none.

```ini
# In .env or Docker Compose environment:
LLM_DEFAULT_PROVIDER=openai
LLM_DEFAULT_MODEL=gpt5   # an llmModelConfName of that provider
```

If these are unset, the automatically created usage profile takes the first LLM provider configuration of the tenant and that provider's default model. A usage profile entered in the admin console must name a provider and a model.

:::caution Upgrading from 2026.0.0-ft5
A prompt that relied on the system default at call time, without a provider of its own, now fails until you set a provider on the prompt or on its usage profile. Clients that passed `llm_provider` or `llm_model` on `POST /api/v1/requests` must set them on the prompt instead.
:::

## Send documents to a model

Models read PDF files natively only when you allow it. Two settings control it, on the provider (`globalConf`) or on a single model (`llModelConfs`):

| Setting | Default | Description |
|---|---|---|
| `documentSupported` | `false` | The model accepts documents sent with a request. Without it, a request that carries a document is refused with `422 LLM_CAPABILITY_ERROR` before any provider call |
| `maxDocumentSizeMb` | `llm.document.max-size` (20 MB) | Largest document, in megabytes, sent to this model. Above it the request is refused with `422 DOCUMENT_TOO_LARGE` |

```yaml
llModelConfs:
  - llmModelConfName: gpt5
    modelName: gpt-5.1
    multiModalSupported: true
    functionCallSupported: true
    documentSupported: true
    maxDocumentSizeMb: 20
```

Enable `documentSupported` only for models whose provider accepts PDF input. A file that is not a PDF is first rendered to PDF through ARender, so ARender must be configured for that case.

Files travel with the request in `multipart/form-data`, or inline in base64. Inline data is limited by `llm.inline.max-size` (5 MB, `413 PAYLOAD_TOO_LARGE`). To keep the files a request sent, see the `persist` flag and the `fileConnector.filesystem.*` Helm values in [Install on Kubernetes](../installation/kubernetes.mdx).

## NuExtract document extraction

The `nu-extract` provider reads a PDF through the NuMind platform and answers with structured JSON. It does not chat: send a document with the request.

```yaml
- provider: nu-extract
  defaultLlmModelConfName: nu-extract
  globalConf:
    apiSecret: ${NUEXTRACT_API_KEY:}
    endpointUrl: https://bbox.nuextract.ai
    timeout: 60
  llModelConfs:
    - llmModelConfName: nu-extract
      modelName: nuextract
      multiModalSupported: false
      functionCallSupported: false
      documentSupported: true
      extras:
        project: sprj_your-numind-project-id
```

The provider runs an extraction job on the platform, polls it every second and gives up after 10 minutes, then asks for the positions of the extracted values. It works in two modes.

| Mode | How to select it | What the message carries |
|---|---|---|
| Template | Leave `project` empty | The message text starts with a JSON template such as `{"invoiceNumber": "string", "total": "number"}`. Anything after the template is sent as extraction instructions. Text before the template is refused |
| Project | Set the extra `project` to a NuMind project id (`sprj_...`) | The template and instructions of the project replace those of the message |

A project id given as the model name still works, with a warning in the log: put it in the `project` extra.

The answer is JSON, with the parts that are empty left out:

```json
{
  "result": { "invoiceNumber": "FA-2026-0142", "total": 1280.5 },
  "localization": { "invoiceNumber": [ { "page": 1, "bbox": [0.1, 0.1, 0.3, 0.15] } ] }
}
```

Extras, set on the provider or on a model (empty means inherit from the provider):

| Extra | Description |
|---|---|
| `project` | NuMind project id, starts with `sprj_` |
| `output` | `values`, `positions` or `values-and-positions` (default). With `values-and-positions`, a failure to localize the values is logged and the values are still returned. With `positions` alone the failure is raised |
| `rasterizationDPI` | Resolution the pages are read at: automatic, or 1 to 600 |
| `enableThinking` | `true` or `false`: let the model reason before answering |
| `thinkingTokenBudget` | Most tokens the model may reason with when thinking is enabled |
| `loopDetection` | `true` or `false`: stop the model when it repeats itself |

The model temperature, seed and maximum output tokens are sent to the job. A request without a document only checks the API key (and reads the project), which is what the **Test** tab of the admin console does. When a job fails, the error carries the reason given by NuMind, for example a quota error.

:::warning Streaming is not supported
`POST /api/v1/requests/stream` with a NuExtract model answers `422`. Use `POST /api/v1/requests`.
:::

:::caution Upgrading from 2026.0.0-ft5
The legacy call to `https://nuextract.ai/api/projects/` was removed together with the `modelId` extra and the `model-id` YAML key. Change the endpoint to `https://bbox.nuextract.ai`, drop `modelId`, set the `project` extra or start your prompt with a JSON template, and expect a different answer shape and no streaming. Prompts written for the legacy flow need rewriting.
:::

The result of an extraction is what the [human review screen](./human_in_the_loop_review.md) shows to a reviewer: the positions let it draw one box per value on the document.

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

In 2026.0.0 every admin list answers a page of summaries (`{ "collection": [...], "total": n, "facets": {...} }`), with `offset`, `limit`, `orderBy` and `ascending` parameters, so the list call above returns a page rather than a bare array. Use `GET .../provider-conf/{providerId}` for the full configuration. `POST .../provider-conf/{providerId}/test` checks that a stored provider can be reached.

## Troubleshooting

| Symptom | Cause | Action |
|---|---|---|
| Chat or Quick Prompt shows "The AI provider quota or credit balance is exhausted", REST answer `402 LLM_QUOTA_EXCEEDED` | The provider reported an exhausted quota or credit balance. Retrying does not help | Top up the account or change the API key. The provider's own message is in the uxopian-ai log, never in the answer |
| `429 LLM_RATE_LIMITED` | The provider limits the request rate | Retry later. Key retry logic on 429 and 504, not on 400 or 500 |
| `504 LLM_TIMEOUT` | The provider did not answer in time | Retry later, or raise `timeout` on the provider |
| `422 LLM_CAPABILITY_ERROR` on a request with a document | The model does not have `documentSupported: true` | Enable it on the model, or choose another model |
| *No LLM provider for this call* | Neither the prompt nor its usage profile names a provider | See [Which provider and model runs a call](#which-provider-and-model-runs-a-call) |

## Related pages

- [LLM providers](../understanding/llm_providers.md)
- [Write a custom LLM client](../extending/custom_llm_client.md)
- [Managing LLM providers in the admin UI](../admin/managing_llm_providers.md)
- [Human review](./human_in_the_loop_review.md)
- [Configuration file reference](../reference/configuration.md)
- [Environment variables reference](../reference/environment_variables.md)
