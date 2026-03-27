---
title: Managing LLM providers in the admin UI
sidebar_label: LLM providers
sidebar_position: 2
last_update:
  date: '2026-03-24T12:58:17.027Z'
  author: CI/CD Bot
content_hash: 2b18ec018165500098f987a0f8f7c7ea679b9157b1e9b1e999ec821b192d7309
---

The LLM providers section of the admin panel lets you add, edit, and delete LLM provider configurations for the current tenant without restarting the application.

## Navigate to LLM providers

In the admin panel, click "LLM Providers" in the navigation. The page lists all provider configurations for the current tenant.

## Add a provider

1. Click the "Add provider" button.
2. Select the provider type from the dropdown. Supported types: `openai`, `anthropic`, `azure`, `bedrock`, `gemini`, `mistral`, `huggingface`, `ollama`, `nu-extract`.
3. Fill in the required fields:
   - **API Secret**: the API key or credential. Stored encrypted.
   - **Endpoint URL**: the provider API base URL (required for some providers).
   - **Temperature**: sampling temperature (0.0 to 1.0+).
   - **Timeout**: request timeout (e.g., `60s`).
   - **Max retries**: number of retries on failure.
   - **Extra parameters**: provider-specific fields (e.g., `deploymentName` for Azure, `region` for Bedrock).
4. Add at least one model configuration:
   - **Model conf name**: internal identifier for this model.
   - **Model name**: actual model name sent to the provider API.
   - **Multimodal supported**: check if the model accepts image inputs.
   - **Function calling supported**: check if the model supports tool calling.
5. Save.

Changes take effect immediately for new requests. Existing in-progress requests continue using their original configuration.

## Edit a provider

Click on a provider in the list to open its detail page. Edit any field and save. The API secret field is masked; enter a new value only if you need to update the credential.

## Delete a provider

On the provider detail page, click "Delete". Requests that were using this provider will fail until a different provider is configured as default.

## Set the default provider

The default provider is set via `llm.default.provider` in `llm-clients-config.yml` or the `LLM_DEFAULT_PROVIDER` environment variable. It cannot be changed via the admin UI; a configuration change and restart are required to change the default.

## Related pages

- [LLM providers](../understanding/llm_providers.md)
- [Configure LLM providers](../how_to/configure_llm_providers.md)
- [Admin panel overview](./admin_panel_overview.md)
