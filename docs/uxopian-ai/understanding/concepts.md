---
title: "Core Concepts"
sidebar_position: 2
---
# **🧠 Core Concepts**

This section explains the primary entities and concepts that form the **uxopian-ai** framework. Understanding these concepts is essential for effective configuration and interaction.

## **🔐 Multi-Tenancy & Users**

**uxopian-ai** is built with a multi-tenant architecture from the ground up, allowing for secure and logical separation of data within a single deployment.

- **Tenants**: Every interaction is scoped to a specific tenantId . This ensures that conversations, stats, and configurations are isolated per tenant.
- **Users**: Users are identified by an ID and assigned specific roles (including an admin flag) . This role-based access control governs access to the Admin API and sensitive operations.

## **🔌 Providers & Models**

A **Provider** is a connector to an external Large Language Model (LLM) service. The framework uses providers to abstract the specific implementation details of each LLM service.

- **Providers**: Providers are configured dynamically per tenant via `LlmProviderConf` entities stored in OpenSearch. You can manage them through the [Admin API](../reference/api.md#administration--llm-providers) or the [Admin UI](../admin/llm_providers.md). The list of registered provider types (e.g., `openai`, `azure`, `anthropic`) is available via `GET /api/v1/admin/llm/providers`.
- **Models**: Each provider configuration includes a list of model configurations (`LlmModelConf`), each with an alias (`llmModelConfName`) and the actual model identifier (`modelName`). The framework tracks model capabilities, specifically whether a model supports **multi-modal** inputs or **function calling**.

### Choosing the Right Model

Not all models are equal. Choosing the right one for each prompt is critical for balancing **response quality**, **speed**, and **cost**.

| Model Tier | Examples | Strengths | Best For |
| :--------- | :------- | :-------- | :------- |
| **Flagship** | `gpt-5.1`, `gpt-5`, `claude-3-opus`, `gemini-2.5-pro` | Deepest reasoning, highest accuracy | Complex analysis, multi-step logic, detailed comparisons |
| **Balanced** | `gpt-4.1`, `gpt-4o`, `claude-3-5-sonnet`, `gemini-2.5-flash` | Good reasoning with faster response | General-purpose use, summaries, document Q&A |
| **Fast & Cheap** | `gpt-5-mini`, `gpt-4.1-mini`, `gpt-4o-mini`, `gemini-2.5-flash-lite` | Low latency, low cost per token | High-volume tasks, simple extractions, intermediate map-reduce steps |
| **Ultra-light** | `gpt-5-nano`, `gpt-4.1-nano`, `gpt-3.5-turbo`, `gemini-2.0-flash-lite` | Minimal cost, fastest response | Classification, keyword extraction, routing decisions |
| **Reasoning** | `o3-mini`, `o4-mini` | Extended chain-of-thought reasoning | Math, logic puzzles, code generation (no multi-modal) |

:::tip[Practical Guidance]
- **Start balanced, optimize later.** Use `gpt-5.1` or `gpt-4.1` to validate your prompt logic, then switch to a `mini` or `nano` variant once it works.
- **Use cheap models for intermediate steps.** In a [Map-Reduce helper](../extending/advanced_helpers.md), the map phase processes many chunks — use a fast model like `gpt-5-mini` there, and reserve the flagship model for the final reduce step.
- **Check capability flags.** If your prompt uses images (`requiresMultiModalModel: true`) or tool calls (`requiresFunctionCallingModel: true`), verify that your chosen model supports them in its `LlmModelConf`. The `o3-mini`/`o4-mini` reasoning models, for example, do **not** support multi-modal inputs.
- **Monitor with the admin panel.** The [Statistics dashboard](../admin/statistics.md) shows token consumption and model distribution — use it to identify prompts that could benefit from a cheaper model.
:::


### Model Capabilities

Each model configuration (`LlmModelConf`) declares two capability flags:

- **`multiModalSupported`**: Can the model process image inputs (Base64 or URL)? Required for prompts that inject images via `documentService.getPageImage(...)`.
- **`functionCallSupported`**: Can the model invoke external tools (MCP, custom tools)? Required for prompts that trigger [custom tools](../extending/custom_tools.md).

When a prompt is configured with `requiresMultiModalModel: true` or `requiresFunctionCallingModel: true`, the framework verifies that the selected model actually supports the required capability. If it does not, the request will fail with a clear error message.

## **⚖️ Parameter Precedence**

When making a call to an LLM, you can specify configuration parameters at multiple levels. The framework uses a clear **5-level** order of precedence to determine which values to use:

1. **API Call Parameters:**
   Values passed directly in the request (e.g., `provider`, `model`, `temperature`) always take the highest priority.
2. **Prompt Defaults:**
   If a parameter is not specified in the API call, the framework looks for defaults defined in the Prompt configuration (`defaultLlmProvider`, `defaultLlmModel`).
3. **Provider Model Config** (`LlmModelConf`):
   Per-model settings defined in the provider configuration (e.g., a specific `temperature` or `maxTokens` for `gpt-5-mini`).
4. **Provider Global Config** (`LlmProviderConf.globalConf`):
   Shared settings defined at the provider level that apply to all models under that provider.
5. **YAML Global Defaults:**
   The fallback values defined in `llm.default.*` in `llm-clients-config.yml`.

:::info[Example]
You define a global default of `gpt-5.1` in `llm-clients-config.yml` with `temperature: 0.7`. Your OpenAI provider configuration sets `temperature: 0.5` globally and `temperature: 0.2` specifically for the `gpt5-mini` model. Your "quick classification" prompt overrides the model with `defaultLlmModel: gpt5-mini`. A specific API call can still override everything by passing `"model": "gpt-4.1"` in the request body. This five-level system lets you set sensible defaults while retaining full flexibility per provider, per model, per prompt, and per call.
:::


## **💬 Conversations**

A **Conversation** is a container that groups a sequence of exchanges between a user and the AI.

- **Persistence**: Conversations are persistent entities with a title, update timestamp, and a record of the last used LLM provider and model .
- **Context**: The framework automatically manages the context window, retrieving recent messages to ensure stateful interactions.
- **Lifecycle**: Conversations can be listed, retrieved by ID, or deleted via the API .

## **⇄ Requests & Inputs (Multi-Modal)**

A **Request** represents a single exchange (a "turn") within a conversation. Unlike simple text messages, **uxopian-ai** requests are rich and multi-modal.

- **Structure**: A request consists of a list of inputs (what was sent) and an answer (what the AI generated) .
- **Multi-Modal Content**: The Input block supports various content types. It is not limited to text; it can handle image content or references to prompt IDs and goal names .
  - **Dynamic Images**: The image input type also supports **Thymeleaf templating**, allowing you to dynamically inject image data (e.g., `[[${documentService.getPageImage(documentId, 1, 800)}]]`).
  - **Constraint**: If using templating for images, the expression **must resolve to a raw Base64 string** representing the image.
- **Token Tracking**: Every request logs inputTokenCount and outputTokenCount for precise cost monitoring .
- **Feedback**: Each request can be tagged with user feedback (Good, Bad, or Neutral) to help tune performance over time .

## **📜 Prompts**

A **Prompt** is a reusable, templated instruction sent to a model. Prompts are central to standardizing AI behavior.

- **Templating**: Prompts use a templating engine (Thymeleaf) allowing for dynamic variable injection.
- **Configuration**: Beyond the text content, a prompt stores configuration flags like reasoningDisabled, requiresMultiModalModel, and requiresFunctionCallingModel .
- **ROI Estimation**: Prompts include a timeSaved attribute (in seconds). This is used to calculate the Return on Investment (ROI) by estimating how much human time is saved every time the prompt is used .

## **🎯 Goals**

A **Goal** is a high-level orchestration unit. It decouples the user's intent from the specific prompt used, allowing for dynamic selection based on context.

- **Logic**: A goal maps a goalName to a specific promptId based on a filter expression .
- **Filtering**: The filter typically uses Spring Expression Language (SpEL) to evaluate the payload (e.g., `[[${documentType == 'contract'}]]`).
- **Priority**: Goals have an index property, allowing you to define priority order when multiple goals might match a scenario .

## **📊 Analytics & Statistics**

**uxopian-ai** includes a comprehensive analytics engine accessible via the Admin API.

- **Global Stats**: Tracks total conversations, requests, tokens, and aggregated time saved .
- **Time Series**: Provides activity data (requests, tokens, time saved) aggregated by time intervals (e.g., DAY) to visualize trends .
- **Adoption & ROI**:
  - **Feature Adoption**: Tracks the usage rate of advanced features like multi-modal and function calling .
  - **Time Saved**: Ranks prompts by the total estimated hours they have saved users .
