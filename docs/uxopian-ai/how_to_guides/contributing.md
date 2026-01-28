---
title: Contributing Prompts and Goals
sidebar_position: 1
last_update:
  date: '2026-01-28T13:32:53.239Z'
  author: CI/CD Bot
content_hash: 72956289e7db867ac5c2058032a612b831fed416db0378ab21be0a1aa9d8022d
---

# 🛠️ How to Contribute Prompts and Goals

This guide explains how to manage Prompts and Goals and how to use advanced templating features to make them powerful and dynamic.

For a visual guide on managing these resources via the UI, please refer to the [**Admin Interface Guide**](how_to_use_admin_interface#contribute_prompt).

---

## 📡 Managing Prompts and Goals via the API

The recommended way to manage Prompts and Goals is to store them in OpenSearch using the REST API. This allows for dynamic updates without restarting the service.

> **⚠️ Security Note:**
> These are **Admin** operations. Your Gateway must inject the `X-User-Roles: admin` header for these requests to succeed.

### API Operations

Refer to the Swagger documentation for the complete schema details.

**Prompts**

- **Save a Prompt**: `POST /api/v1/admin/prompts`
- **Update a Prompt**: `PUT /api/v1/admin/prompts`
- **Get a Specific Prompt**: `GET /api/v1/admin/prompts/{id}`
- **Delete a Prompt**: `DELETE /api/v1/admin/prompts/{id}`

**Goals**

- **Save a Goal**: `POST /api/v1/admin/goals`
- **Update a Goal**: `PUT /api/v1/admin/goals`
- **Get All Goals**: `GET /api/v1/admin/goals`
- **Delete a Goal**: `DELETE /api/v1/admin/goals/{id}`

---

## 📝 Example: Creating a New Prompt

Use this endpoint to store a prompt configuration, including its default LLM settings.

**cURL Request**

```bash
curl -X POST "http://localhost:8080/api/v1/admin/prompts" \
-H "Content-Type: application/json" \
-H "X-User-TenantId: enterprise-corp-a" \
-H "X-User-Id: admin-user" \
-H "X-User-Roles: admin" \
-d '{
  "id": "summarizeDocumentText",
  "role": "user",
  "content": "Summarize the following document in a plain text format:\n\n[[${documentService.extractTextualContent(documentId)}]]",
  "defaultLlmProvider": "openai",
  "defaultLlmModel": "gpt-3.5-turbo",
  "timeSaved": 60
}'
```

_Note: The `timeSaved` field (in seconds) is used to calculate ROI stats in the admin panel._

---

## 🎯 Example: Creating a New Goal

A Goal maps a specific context to a prompt ID.

**cURL Request**

```bash
curl -X POST "http://localhost:8080/api/v1/admin/goals" \
-H "Content-Type: application/json" \
-H "X-User-TenantId: enterprise-corp-a" \
-H "X-User-Id: admin-user" \
-H "X-User-Roles: admin" \
-d '{
  "goalName": "compare",
  "promptId": "detailedComparison",
  "filter": "[[${documentType == ''contract''}]]",
  "index": 125
}'
```

---

## ⚡ Using Advanced Template Functions

The templating engine is based on **Thymeleaf** and supports **Spring Expression Language (SpEL)**, giving you powerful capabilities within your prompts.

- **Accessing the Request Payload**: Use `${payload.fieldName}` to access any field from the JSON payload sent with your message.
- **Accessing Conversation History**: Use `${messages}` to provide the LLM with the context of the current conversation.
- **Using Conditional Logic**: Use SpEL for conditional logic, e.g., `[[${payload.language != null} ? ${payload.language} : 'english']]`.
- **Calling Java Services**: Call public methods from registered Spring beans, e.g., `[[${documentService.extractTextualContent(payload.documentId)}]]`.

---

## 💡 Examples of Prompt and Goal Definitions

Here are practical examples of how to structure your Goal and Prompt logic.

### 1\. Goal Logic (Orchestration)

Goals use the `index` property to determine priority (lower numbers are checked first) and a `filter` to match the context.

**Logic:**

1.  Check if `documentType` is 'contract'. If yes, use `detailedComparison`.
2.  Otherwise, fall back to `genericComparison`.

<!-- end list -->

```json
[
    {
        "goalName": "compare",
        "promptId": "detailedComparison",
        "filter": "[[${documentType == 'contract'}]]",
        "index": 125
    },
    {
        "goalName": "compare",
        "promptId": "genericComparison",
        "filter": "true",
        "index": 1000
    }
]
```

### 2\. Prompt: Conditional Logic

This prompt uses a SpEL expression to dynamically set the target language.

```text
Translate the following document in [[${language != null} ? ${language} : 'english']]:

[[${documentService.extractTextualContent(documentId)}]]
```

### 3\. Prompt: Iteration

This prompt iterates over a list of document IDs from the payload to compare multiple documents within a single request.

```text
Please be exhaustive and provide a very detailed, point-by-point comparison.
Compare the following documents:

[# th:each="docId, iterStat : ${documentIds}"]
Document content [[${iterStat.count}]] : [[${documentService.extractTextualContent(docId)}]]
[/]
```

### 4\. Prompt: Composition (Prompt-in-Prompt)

A prompt can call another prompt. Here, `summarizeDocumentMarkdown` reuses the formatting rules defined in a separate prompt named `markdownResponse`.

```text
Summarize the following document.
[[${promptService.renderPrompt('markdownResponse')}]]

Document content:
[[${documentService.extractTextualContent(documentId)}]]
```

### 5\. Prompt: System Persona

A generic `basePrompt` can be used to define the persona and core instructions for the AI.

```text
You are Nono. You were born in 2025.
Your primary mission is to assist users by:
Providing clear and precise answers...
```

---

## 🖥️ Web Interface for Prompt Management

In addition to the REST API, **uxopian-ai** includes a built-in web interface that lets you visually manage prompts.

> 🔗 **Access**: `https://<your-uxopian-endpoint>/ai`

Through this interface, you can:

- View and search existing Prompts.
- Edit their fields (Content, Filters, Model Settings).
- Add new Prompts.
- Delete or reorder items interactively.

For a full walkthrough of the interface, see the [**Admin Interface Guide**](https://www.google.com/search?q=how_to_use_admin_interface%23contribute_prompt).
