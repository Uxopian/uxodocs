---
title: "Creating Advanced Helpers"
last_update:
  date: '2026-02-16T16:29:56.656Z'
  author: CI/CD Bot
sidebar_position: 2
content_hash: 15be1b462fd82686a79c09f36e95f4de9fcddf06c71f8880d852861ff78308cd
---
# Advanced Helpers: Map-Reduce Paradigm

This guide explains how to implement **Advanced Helpers** in Uxopian-ai using a **Map-Reduce paradigm** to summarize or process large documents exceeding standard LLM context limits.

---

## Overview

The Map-Reduce approach allows splitting heavy tasks into manageable chunks processed in parallel (Map) and then combining and reducing the results recursively (Reduce).

**Workflow:**

1. **Client Request**: Triggers the main user prompt.
2. **Main Prompt**: Invokes the Advanced Helper.
3. **Helper (Map Phase)**: Splits document into chunks and processes them in parallel using an internal LLM prompt.
4. **Helper (Reduce Phase)**: Aggregates results and recursively condenses until final summary fits a single context window.
5. **Output**: Returns final summarized or processed content to the Main Prompt.

---

## Step 1: Define Internal Map Prompt

Register an internal prompt that the Helper will call for each chunk of data.

```bash
curl -X POST "http://localhost:8080/api/v1/admin/prompts" \
  -H "Content-Type: application/json" \
  -H "X-User-TenantId: enterprise-corp-a" \
  -H "X-User-Roles: admin" \
  -d '{
    "id": "map_chunk_prompt",
    "role": "system",
    "content": "Role: Expert Analyst.\nGoal: Extract key facts efficiently.\nInstructions:\n1. Extract critical points as bullet list.\n2. Merge duplicates.\n3. Output only the content.\n\nInput Data:\n[[${content}]]",
    "defaultLlmProvider": "openai",
    "defaultLlmModel": "gpt-5.1",
    "timeSaved": 5
  }'
```

> **Recommendation:** Use a fast, cheap model for the map phase (e.g., `gpt-5-mini` or `gpt-4.1-nano`). These intermediate steps process many chunks in parallel — using a flagship model here would multiply costs with little quality benefit. Reserve the powerful model for the final reduce/synthesis step (Step 3). See [Choosing the Right Model](../understanding/concepts.md#choosing-the-right-model) for the full model tier guide.

---

## Step 2: Implement the Advanced Helper (Java)

The Helper orchestrates splitting, parallel processing, and recursive reduction.

```java
@Service
@HelperService(name = "advancedMapReduceHelper")
public class AdvancedMapReduceHelper {

    private static final String INTERNAL_PROMPT_ID = "map_chunk_prompt";
    private final ExecutorService executorService = Executors.newVirtualThreadPerTaskExecutor();
    private final SecureRequestService requestService;

    public String processDocument(String docId) {
        List<String> rawContents = fetchDocumentContent(docId);
        ContextSnapshot contextSnapshot = AiContext.captureSnapshot();
        try (AiResourceContext ignored = contextSnapshot.restore()) {
            return recursiveProcess(rawContents, contextSnapshot);
        }
    }

    private String recursiveProcess(List<String> segments, ContextSnapshot contextSnapshot) {
        if (fitsInOneContext(segments)) {
            return callLlm(String.join("\n", segments), contextSnapshot);
        }

        List<String> chunks = createOptimizedChunks(segments);
        List<CompletableFuture<String>> futures = chunks.stream()
            .map(chunk -> CompletableFuture.supplyAsync(() -> {
                try (AiResourceContext ignored = contextSnapshot.restore()) {
                    return callLlm(chunk, contextSnapshot);
                }
            }, executorService))
            .toList();

        List<String> results = futures.stream().map(CompletableFuture::join).toList();
        return recursiveProcess(results, contextSnapshot);
    }

    private String callLlm(String text, ContextSnapshot contextSnapshot) {
        LlmConfig conf = new LlmConfig();
        conf.setDisableReasoning(true);
        return requestService.sendRequestsWithoutHistory(buildRequest(text), conf, currentUser).getAnswer();
    }
}
```

---

## Step 3: Create Main User Prompt

The user-facing prompt triggers the Advanced Helper and specifies output constraints.

```bash
curl -X POST "http://localhost:8080/api/v1/admin/prompts" \
  -H "Content-Type: application/json" \
  -H "X-User-TenantId: enterprise-corp-a" \
  -H "X-User-Roles: admin" \
  -d '{
    "id": "process_long_document",
    "role": "user",
    "content": "Please summarize the document in 500 words:\n\n[[${advancedMapReduceHelper.processDocument(documentId)}]]",
    "defaultLlmProvider": "openai",
    "defaultLlmModel": "gpt-5.1",
    "timeSaved": 60
  }'
```

> **Helper Call:** `[[${advancedMapReduceHelper.processDocument(documentId)}]]`

---

## Step 4: Usage via API

Invoke the prompt and provide the document ID.

```bash
curl -X POST "http://localhost:8080/api/v1/requests?conversation=uuid" \
  -H "Content-Type: application/json" \
  -H "X-User-TenantId: enterprise-corp-a" \
  -H "X-User-Id: user-id" \
  -d '{
    "inputs": [
      {
        "role": "user",
        "content": [
          {
            "type": "prompt",
            "value": "process_long_document",
            "payload": {"documentId": "doc-12345"}
          }
        ]
      }
    ]
  }'
```

---

:::tip[Result]
:::


1. System loads `process_long_document` template.
2. Advanced Helper executes Map-Reduce over document chunks.
3. Intermediate results are recursively merged.
4. Final summary is returned as a concise 500-word narrative.
