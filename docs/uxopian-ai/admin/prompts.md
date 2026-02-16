---
title: "Prompt Management"
last_update:
  date: '2026-02-16T16:29:56.656Z'
  author: CI/CD Bot
sidebar_position: 2
content_hash: e36bc0ad045583f79c1bdea7c7853e04fa061f39705e0720c65fb2310ab49cdf
---
# Prompts Management

Prompts are the building blocks of your AI interactions. This section allows administrators to manage the lifecycle of these prompts, from creation to performance analysis.

## 1. Prompt List & Search

The main view displays all available prompts for the current tenant.

- **Search:** Find specific prompts by their ID or content.
- **Actions:** Create new prompts, edit existing ones, or view their specific statistics.
- **API Reference:** `GET /api/v1/admin/prompts`

## 2. Prompt Editor (CRUD)

The editor provides granular control over prompt behavior.

### Content & Configuration

- **Content Editor:** Edit the **Thymeleaf template** used to generate the prompt dynamically. See [The Templating Engine](../understanding/templating.md) for syntax details.
- **Model Configuration:** Set the default LLM provider (e.g., `openai`) and model (e.g., `gpt-5.1`). See [Choosing the Right Model](../understanding/concepts.md#choosing-the-right-model) for guidance.
- **Capabilities:** Toggle flags based on the prompt's needs:
    - **Reasoning:** Enable or disable reasoning capabilities.
    - **Multi-modal:** Flag if the prompt requires image inputs.
    - **Function Calling:** Flag if the prompt triggers external tools.

### ROI Settings

- **Time Saved:** Define an estimated "Time Saved per usage" (in seconds). This value is used to calculate the Return on Investment (ROI) metrics across the platform.

## 3. Prompt Statistics

Each prompt has a dedicated statistics view with performance metrics:

- **Usage Count:** The total number of times this prompt has been triggered.
- **Feedback:** A breakdown of user ratings (**Good**, **Bad**, **Neutral**) to assess output quality.
- **Cost & ROI:** Token consumption (`totalCost`, `costAverage`) and the specific time saved by this prompt.

## 4. Prompt Tester

The **Prompt Tester** allows you to execute a prompt directly from the admin interface — without needing to set up a conversation or use external tools like cURL.

### How It Works

1. **Variable Detection:** When you open the tester for a prompt, it automatically parses the Thymeleaf template and detects all variables (e.g., `${documentId}`, `${language}`).

2. **Variable Configuration:** For each detected variable, an input field is displayed. You can provide:
    - **Text values** — For string variables like document IDs, language codes, or user queries.
    - **Image values** — For multi-modal prompts that expect Base64-encoded images.

3. **Execute:** Click "Test" to send the prompt with the configured variables to the LLM. The system uses the prompt's `defaultLlmProvider` and `defaultLlmModel` settings.

4. **Results:** The tester displays:
    - The LLM response.
    - Token usage (input/output).
    - Response latency.

5. **cURL Generation:** The tester generates the equivalent **cURL command** for the test configuration, making it easy to reproduce the request from a terminal or integrate into scripts.

:::tip[Iterate Quickly]
Use the Prompt Tester to refine your prompt content and model selection before deploying to production. Adjust the template, change variables, and re-test — all without leaving the admin panel.
:::

