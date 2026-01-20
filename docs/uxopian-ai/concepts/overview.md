---
title: Core Concepts
last_update:
  date: '2026-01-20T14:02:07.044Z'
  author: CI/CD Bot
content_hash: b198317d1d262df6d2b628ff091825167bf9073b748bb6ffa8db53d0361f5686
---

# **🧠 Core Concepts**

This section explains the primary entities and concepts that form the **uxopian-ai** framework. Understanding these concepts is essential for effective configuration and interaction.

## **🔐 Multi-Tenancy & Users**

**uxopian-ai** is built with a multi-tenant architecture from the ground up, allowing for secure and logical separation of data within a single deployment.

- **Tenants**: Every interaction is scoped to a specific tenantId . This ensures that conversations, stats, and configurations are isolated per tenant.
- **Users**: Users are identified by an ID and assigned specific roles (including an admin flag) . This role-based access control governs access to the Admin API and sensitive operations.

## **🔌 Providers & Models**

A **Provider** is a connector to an external Large Language Model (LLM) service. The framework uses providers to abstract the specific implementation details of each LLM service.

- **Providers**: You can retrieve a list of all configured providers (e.g., openai, azure, anthropic) via the API .
- **Models**: Each provider supports specific models (e.g., gpt-4o, claude-3-5-sonnet). The framework is aware of model capabilities, specifically tracking if a model supports **multi-modal** inputs or **function calling** .

## **⚖️ Parameter Precedence**

When making a call to an LLM, you can specify configuration parameters at multiple levels. The framework uses a clear order of precedence to determine which values to use:

1. API Call Parameters:  
   Values passed directly in the request (e.g., provider, model, temperature, requiresMultiModalConfig) will always take priority .
2. Prompt-Specific Defaults:  
   If a parameter is not specified in the API call, the framework looks for default values defined within the Prompt configuration (e.g., defaultLlmProvider, defaultLlmModel, requiresFunctionCallingModel) .
3. Global Defaults:  
   If no specific parameters are found in the API call or the prompt, the framework falls back to the global default values defined in the application configuration.

## **💬 Conversations**

A **Conversation** is a container that groups a sequence of exchanges between a user and the AI.

- **Persistence**: Conversations are persistent entities with a title, update timestamp, and a record of the last used LLM provider and model .
- **Context**: The framework automatically manages the context window, retrieving recent messages to ensure stateful interactions.
- **Lifecycle**: Conversations can be listed, retrieved by ID, or deleted via the API .

## **⇄ Requests & Inputs (Multi-Modal)**

A **Request** represents a single exchange (a "turn") within a conversation. Unlike simple text messages, **uxopian-ai** requests are rich and multi-modal.

- **Structure**: A request consists of a list of inputs (what was sent) and an answer (what the AI generated) .
- **Multi-Modal Content**: The Input block supports various content types. It is not limited to text; it can handle image content or references to prompt IDs and goal names .
- **Dynamic Images**: The image input type also supports **Thymeleaf templating**, allowing you to dynamically inject image data (e.g., ).
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
- **Filtering**: The filter typically uses Spring Expression Language (SpEL) to evaluate the payload (e.g., ).
- **Priority**: Goals have an index property, allowing you to define priority order when multiple goals might match a scenario .

## **📊 Analytics & Statistics**

**uxopian-ai** includes a comprehensive analytics engine accessible via the Admin API.

- **Global Stats**: Tracks total conversations, requests, tokens, and aggregated time saved .
- **Time Series**: Provides activity data (requests, tokens, time saved) aggregated by time intervals (e.g., DAY) to visualize trends .
- **Adoption & ROI**:
- **Feature Adoption**: Tracks the usage rate of advanced features like multi-modal and function calling .
- **Time Saved**: Ranks prompts by the total estimated hours they have saved users .
