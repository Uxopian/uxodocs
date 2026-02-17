---
title: "The Templating Engine"
last_update:
  date: '2026-02-16T16:29:56.656Z'
  author: CI/CD Bot
sidebar_position: 3
content_hash: 7f4fc9075bb78f771a84b88d6b1655dd37c468b1ea382a4a450db8f3da0c2f2d
---
# The Templating Engine

Uxopian-ai uses **Thymeleaf** combined with **Spring Expression Language (SpEL)** to make prompts dynamic. Instead of sending static text to the LLM, you can inject runtime data, call Java services, and build conditional logic directly inside your prompt definitions.

---

## Basic Syntax

All dynamic expressions use the Thymeleaf inline text output syntax:

```text
[[${expression}]]
```

Everything inside `[[${...}]]` is evaluated at render time before the prompt is sent to the LLM.

---

## Variable Resolution

When a request is sent to uxopian-ai with a **payload**, each key in the payload JSON becomes a **top-level template variable**. There is no `payload.` prefix.

**Example:** Given this API request payload:

```json
{
  "documentId": "doc-abc-123",
  "language": "french"
}
```

The prompt template can reference these variables directly:

```text
Translate the following document into [[${language}]]:

[[${documentService.extractTextualContent(documentId)}]]
```

At render time, `language` resolves to `"french"` and `documentId` resolves to `"doc-abc-123"`.

---

## Java Services (Helpers)

Registered Spring beans are also available as top-level variables in templates. The built-in services include:

- **`documentService`** — Extract text or images from documents (e.g., via ARender or FlowerDocs).
- **`promptService`** — Render other prompts or access prompt definitions.

You call their public methods directly:

```text
[[${documentService.extractTextualContent(documentId)}]]
```

You can also create your own custom helpers. See [Creating Custom Helpers](../extending/custom_helpers.md) for details.

---

## Conditional Logic

Use SpEL ternary expressions for conditional rendering:

```text
Translate the following document in [[${language != null ? language : 'english'}]]:

[[${documentService.extractTextualContent(documentId)}]]
```

If `language` is present in the payload, it is used; otherwise, it defaults to `"english"`.

---

## Iteration

Use Thymeleaf's `th:each` to iterate over lists from the payload. This is useful when processing multiple documents in a single request.

**Payload:**

```json
{
  "documentIds": ["doc-001", "doc-002", "doc-003"]
}
```

**Prompt template:**

```text
Please provide a detailed, point-by-point comparison of the following documents:

[# th:each="docId, iterStat : ${documentIds}"]
Document [[${iterStat.count}]]:
[[${documentService.extractTextualContent(docId)}]]
[/]
```

The `[# th:each="..."]...[/]` block repeats for each item in the list.

---

## Composition (Prompt-in-Prompt)

A prompt can include the rendered output of another prompt using `promptService.renderPrompt()`. This lets you reuse common formatting instructions or personas across multiple prompts.

```text
Summarize the following document.
[[${promptService.renderPrompt('markdownResponse')}]]

Document content:
[[${documentService.extractTextualContent(documentId)}]]
```

Here, `markdownResponse` is a separate prompt that contains formatting rules (e.g., "Use Markdown headers and bullet points"). It is rendered inline before the final prompt is sent to the LLM.

---

## Conversation History

The variable `messages` gives access to the current conversation history. You can inject it into a prompt to provide the LLM with prior context:

```text
Here is the conversation so far:
[[${messages}]]

Now answer the following question:
[[${userQuestion}]]
```

---

## Going Further

- [Creating Custom Helpers](../extending/custom_helpers.md) — Expose your own Java services in templates.
- [Creating Advanced Helpers](../extending/advanced_helpers.md) — Implement Map-Reduce patterns for large documents.
- [Managing Prompts and Goals](../how_to/managing_prompts_goals.md) — CRUD operations on prompts via the API.
