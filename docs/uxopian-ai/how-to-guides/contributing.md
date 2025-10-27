---
title: Contributing Prompts and Goals
description: How to manage Prompts and Goals and use advanced templating features
sidebar_position: 1
---

# How to Contribute Prompts and Goals

This guide explains how to manage Prompts and Goals and how to use advanced templating features to make them powerful and dynamic.

## Managing Prompts and Goals via the API

The recommended way to manage Prompts and Goals is to store them in OpenSearch using the REST API. This allows for dynamic updates without restarting the service.

### API Operations

- **Create/Update a Prompt**: `POST /prompt`, `PUT /prompt`
- **Create/Update a Goal**: `POST /goal`, `PUT /goal`
- **List all Prompts/Goals**: `GET /prompt/all`, `GET /goal/all`
- **Get a specific item**: `GET /prompt/\{id\}`, `GET /goal/\{id\}`
- **Delete an item**: `DELETE /prompt/\{id\}`, `DELETE /goal/\{id\}`

Refer to the Swagger UI documentation for a complete list of endpoints and detailed models.

## Example: Creating a New Prompt

```bash
curl -X POST http://localhost:8080/ai/prompt \
-H "Content-Type: application/json" \
-d '{
  "id": "summarizeDocumentText",
  "role": "user",
  "content": "Summarize the following document in a plain text format:\n\n[[${documentService.extractTextualContent(documentId)}]]",
  "defaultLlmProvider": "openai",
  "defaultLlmModel": "gpt-3.5-turbo"
}'
```

## Example: Creating a New Goal

```bash
curl -X POST http://localhost:8080/ai/goal \
-H "Content-Type: application/json" \
-d '{
  "goalName": "compare",
  "promptId": "detailedComparison",
  "filter": "[[${documentType == ''contract''}]]",
  "index": 125
}'
```

## Using Advanced Template Functions

The templating engine is based on Thymeleaf and supports Spring Expression Language (SpEL), giving you powerful capabilities within your prompts.

- **Accessing the Request Payload**: Use `$\{payload.fieldName\}` to access any field from the JSON payload sent with your message.
- **Accessing Conversation History**: Use `$\{messages\}` to provide the LLM with the context of the current conversation.
- **Using Conditional Logic**: Use SpEL for conditional logic, e.g., `[[$\{payload.language != null\} ? $\{payload.language\} : 'english']]`.
- **Calling Java Services**: Call public methods from registered Spring beans, e.g., `[[$\{documentService.extractTextualContent(payload.documentId)\}]]`.

## Examples of Prompt and Goal Definitions

Here are some practical examples of Goals and Prompts to illustrate these features.

### Example of a Goal Definition

A Goal maps a situation to a specific prompt. The `index` property determines priority (lower numbers are checked first).

```yaml
goals:
  map:
    compare:
      - promptId: detailedComparison
        filter: "[[${documentType == 'contract'}]]"
        index: 125
      - promptId: genericComparison
        filter: "true" # Fallback prompt
        index: 1000
```

In this example, when the `compare` goal is triggered:

- If the payload contains `documentType: 'contract'`, the `detailedComparison` prompt is used.
- Otherwise, the `genericComparison` prompt is used as a fallback.

### Examples of Prompt Definitions

#### 1. Basic Prompt with a Service Call

```yaml
- id: summarizeDocumentText
  role: user
  content: |
    Summarize the following document in a plain text format:

    [[${documentService.extractTextualContent(documentId)}]]
```

#### 2. Prompt with Conditional Logic

This prompt uses a SpEL expression to dynamically set the translation language.

```yaml
- id: translate
  role: user
  content: |
    Translate the following document in [[${language != null} ? ${language} : 'english']]:

    [[${documentService.extractTextualContent(documentId)}]]
```

#### 3. Prompt with Iteration

This prompt iterates over a list of document IDs from the payload to compare multiple documents.

```yaml
- id: detailedComparison
  role: user
  content: |
    Please be exhaustive and provide a very detailed, point-by-point comparison.
    Compare the following documents:

    [# th:each="docId, iterStat : ${documentIds}"]
    Document content [[${iterStat.count}]] : [[${documentService.extractTextualContent(docId)}]]
    [/]
```

#### 4. Prompt Composition

A prompt can call another prompt. Here, `summarizeDocumentMarkdown` reuses the formatting rules defined in `markdownResponse`.

```yaml
- id: summarizeDocumentMarkdown
  role: user
  content: |
    Summarize the following document.
    [[${promptService.renderPrompt('markdownResponse')}]]

    Document content:
      [[${documentService.extractTextualContent(documentId)}]]
```

#### 5. System-level Prompt

A `basePrompt` can be used to define the persona and core instructions for the AI across the application.

```yaml
- id: basePrompt
  role: SYSTEM
  content: |
    You are Nono. You were born in 2025, you are non-binary...
    Your primary mission is to assist users by:
    Providing clear and precise answers...
```

## Web Interface for Prompt and Goal Management

In addition to the REST API, `uxopian-ai` includes a built-in web interface that lets you visually manage prompts.

> 🖥️ **URL**: `https://&lt;your-uxopian-endpoint&gt;/ai`
> Replace with your actual deployment host.

Through this interface, you can:

- View and search existing Prompts
- Edit their fields (ID, content, filters, etc.)
- Add new Prompts
- Delete or reorder items interactively

![uxopian-ai-web-interface](/img/uxopian-ai/uxopian-ai-web-interface.png)

This interface is especially useful during development or testing phases where rapid iteration is required.