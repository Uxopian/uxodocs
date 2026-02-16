---
title: "LLM Provider Management"
sidebar_position: 3
---
# LLM Provider Management

The **LLM Provider Management** page allows administrators to configure, test, and manage LLM provider connections at runtime — without restarting the service.

Each provider configuration defines connection parameters (API key, endpoint, timeouts) and a list of available models with their specific overrides.

---

## 1. Provider List

The main view displays all configured LLM providers for the current tenant.

- **Search & Filter**: Quickly find providers by name or type.
- **Actions**: Create, edit, or delete provider configurations.
- **Status Indicators**: See at a glance which providers have valid configurations.
- **API Reference**: `GET /api/v1/admin/llm/provider-conf`

Each row shows the provider type (e.g., `openai`, `anthropic`), the default model alias, and the number of configured models.

---

## 2. Provider Editor

The editor provides granular control over a provider's configuration. It is divided into three sections.

### Provider Identity

| Field | Description |
| :---- | :---------- |
| **Provider** | The provider type (must match a registered Spring bean: `openai`, `anthropic`, `azure`, `gemini`, `mistral`, `ollama`, etc.) |
| **Default Model Conf Name** | The alias of the model to use by default when no model is specified in the request. |

### Global Configuration

These settings apply to **all models** under this provider unless overridden at the model level.

| Field | Type | Description |
| :---- | :--- | :---------- |
| `apiSecret` | String | API key or secret for authentication. Encrypted at rest (AES-GCM). |
| `endpointUrl` | String | Base URL for the provider's API. |
| `temperature` | Double | Sampling temperature (0.0 – 2.0). |
| `topP` | Double | Nucleus sampling threshold. |
| `topK` | Integer | Top-K sampling parameter. |
| `seed` | Integer | Deterministic seed for reproducibility. |
| `maxTokens` | Integer | Maximum tokens in the response. |
| `presencePenalty` | Double | Penalizes repeated topics. |
| `frequencyPenalty` | Double | Penalizes repeated tokens. |
| `maxRetries` | Integer | Number of retry attempts on failure. |
| `timeout` | Duration | Request timeout (e.g., `60s`, `PT2M`). |
| `multiModalSupported` | Boolean | Whether the provider supports image inputs. |
| `functionCallSupported` | Boolean | Whether the provider supports tool/function calling. |
| `extras` | Map | Provider-specific key-value pairs (e.g., `deploymentName` for Azure). |

### Model Configurations

Each model entry represents a specific model alias available through this provider. Models **inherit** all global configuration values and can override any of them.

| Field | Description |
| :---- | :---------- |
| **Model Conf Name** (`llmModelConfName`) | The alias used in prompts and API calls (e.g., `my-gpt5`). |
| **Model Name** (`modelName`) | The actual model identifier sent to the provider's API (e.g., `gpt-5.1`). |
| _(all global fields)_ | Any field from the global configuration can be overridden per model. |

:::tip[Configuration Inheritance]
When processing a request, the service **merges** global and model-specific settings. Model-level values take precedence. For example, if the global `temperature` is `0.7` but a specific model sets `temperature: 0.2`, the model-level value (`0.2`) is used. Fields not overridden at the model level fall back to the global value.
:::


---

## 3. Provider Detail

Selecting a provider from the list opens the detail view, which combines:

- **Editor Tab** — The full provider editor (see above).
- **Tester Tab** — The connection tester (see below).

---

## 4. Connection Tester

The Connection Tester lets you verify that a provider configuration is working correctly **before** using it in production prompts.

### How It Works

1. Select a **model** from the provider's configured model list.
2. Click **Test Connection**.
3. The system sends a minimal test request to the provider's API.
4. Results are displayed with:
    - **Status badge**: Success or failure indicator.
    - **Response details**: Model response, latency, and token usage.
    - **Error details**: If the test fails, the full error message is shown for debugging.

:::tip[Test After Changes]
After modifying API keys, endpoints, or model names, always use the Connection Tester before saving. This prevents misconfigured providers from affecting live prompts.
:::


---

## 5. Per-Tenant Configuration

LLM provider configurations support **multi-tenancy**. Configurations can be defined at the global level and then customized per tenant using a **merge strategy**:

| Strategy | Behavior |
| :------- | :------- |
| `MERGE` | Tenant-specific providers are merged with global ones. Matching providers are updated; non-matching ones are added. |
| `OVERWRITE` | Tenant configuration completely replaces the global configuration. |
| `CREATE_IF_MISSING` | Tenant-specific providers are only added if no global configuration exists for that provider. |

This allows a central admin to define a base set of providers (e.g., OpenAI with a shared API key) while individual tenants can add their own providers or override API keys.

---

## API Reference

All operations require the `admin` role (`X-User-Roles: admin`).

| Method | Endpoint | Description |
| :----- | :------- | :---------- |
| `GET` | `/api/v1/admin/llm/providers` | List all registered provider types (bean names). |
| `GET` | `/api/v1/admin/llm/provider-conf` | List all provider configurations for the tenant. |
| `GET` | `/api/v1/admin/llm/provider-conf/{id}` | Get a specific provider configuration by ID. |
| `POST` | `/api/v1/admin/llm/provider-conf` | Create a new provider configuration. |
| `PUT` | `/api/v1/admin/llm/provider-conf/{id}` | Update an existing provider configuration. |
| `DELETE` | `/api/v1/admin/llm/provider-conf/{id}` | Delete a provider configuration. |

### Example: Creating a Provider Configuration

```bash
curl -X POST "http://localhost:8080/api/v1/admin/llm/provider-conf" \
  -H "Content-Type: application/json" \
  -H "X-User-TenantId: enterprise-corp-a" \
  -H "X-User-Roles: admin" \
  -d '{
    "provider": "openai",
    "defaultLlmModelConfName": "gpt5",
    "globalConf": {
      "apiSecret": "sk-your-api-key-here",
      "temperature": 0.7,
      "maxRetries": 3,
      "timeout": "60s"
    },
    "llModelConfs": [
      {
        "llmModelConfName": "gpt5",
        "modelName": "gpt-5.1",
        "multiModalSupported": true,
        "functionCallSupported": true
      },
      {
        "llmModelConfName": "gpt5-mini",
        "modelName": "gpt-5-mini",
        "temperature": 0.3,
        "multiModalSupported": true,
        "functionCallSupported": true
      }
    ]
  }'
```

---

## Related Resources

- [Configuration Files — Dynamic Provider Configuration](../reference/config_files.md#dynamic-provider-configuration) — YAML bootstrapping reference.
- [Core Concepts — Parameter Precedence](../understanding/concepts.md#parameter-precedence) — How model parameters are resolved.
- [Adding a New LLM Provider](../extending/new_provider.md) — Creating custom provider connectors.
