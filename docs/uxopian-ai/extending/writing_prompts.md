---
title: Write prompts
sidebar_label: Write prompts
sidebar_position: 2
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: b26ab85cb97ab26d394785bfc583a54b692667dafa2df613ade0a32ed25d4fb8
---

This guide explains how to define prompts in `prompts.yml`, use Thymeleaf expressions to inject dynamic content, call ServiceHelpers, and manage prompts at runtime via the Admin API.

## Prompt rendering flow

```mermaid
flowchart LR
    YML["prompts.yml<br/>or Admin API"]
    OS["OpenSearch<br/>(prompt storage)"]
    Req["Request<br/>content type=prompt"]
    PS["PromptService<br/>loads prompt by ID"]
    TE["ThymeleafTemplateEngineHelper<br/>renders template"]
    SH["ServiceHelper methods<br/>(documentService, etc.)"]
    LLM["LLM Provider"]

    YML -->|"Loaded at startup"| OS
    Req --> PS
    PS --> OS
    OS -.->|"Prompt definition"| PS
    PS --> TE
    TE -->|"Calls helpers"| SH
    SH -.->|"Data"| TE
    TE -->|"Rendered text"| LLM
```

*Figure: From YAML definition to rendered prompt sent to the LLM.*

## Prompt definition structure

Define prompts under `prompts.globals` in `prompts.yml`:

```yaml
prompts:
  globals:
    - id: myPrompt
      role: USER
      content: |
        Analyze the following document and provide a summary:
        [[${documentService.extractTextualContent(documentId)}]]
      requiresMultiModalModel: false
      requiresFunctionCallingModel: false
      reasoningDisabled: false
```

### Fields

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Unique identifier. Referenced in requests. |
| `role` | Yes | `SYSTEM`, `USER`, or `ASSISTANT` |
| `content` | Yes | Thymeleaf template string |
| `requiresMultiModalModel` | No | Set to `true` if the prompt includes images |
| `requiresFunctionCallingModel` | No | Set to `true` if the prompt requires tool calling |
| `reasoningDisabled` | No | Set to `true` to disable tool calls for this prompt |
| `defaultLlmProvider` | No | Override the LLM provider for this specific prompt |
| `defaultLlmModel` | No | Override the LLM model for this specific prompt |

## Thymeleaf syntax

Prompts use Thymeleaf TEXT mode. Standard Thymeleaf `${}` syntax uses double-bracket wrappers:

```
[[${variable}]]
```

### Variable expressions

A payload variable `documentId` passed in the request:

```
[[${documentId}]]
```

### Conditional expressions

```
[[${language != null} ? ${language} : 'english']]
```

### Iteration

```
[# th:each="docId, iterStat : ${documentIds}"]
Document [[${iterStat.count}]]:
[[${documentService.extractTextualContent(docId)}]]
[/]
```

### ServiceHelper calls

ServiceHelpers registered in plugins are available by their `@HelperService(name="...")` name:

```
[[${documentService.extractTextualContent(documentId)}]]
```

`documentId` is a payload variable passed in the request content item.

## Passing variables to prompts

Variables are passed in the `payload` map of the request content item:

```json
{
  "type": "prompt",
  "value": "myPrompt",
  "payload": {
    "documentId": "doc-abc-123",
    "language": "french"
  }
}
```

All keys in `payload` become Thymeleaf context variables accessible with `[[${key}]]`.

## Tenant-specific overrides

Add per-tenant overrides under `prompts.tenants`:

```yaml
prompts:
  tenants:
    - tenantId: my-tenant
      mergeStrategy: merge
      prompts:
        - id: basePrompt
          role: SYSTEM
          content: |
            You are an assistant specialized for my-tenant. Always respond in French.
```

`mergeStrategy: merge` updates prompts that match by `id`. Other prompts remain unchanged. `mergeStrategy: replace` discards all global prompts for the tenant and uses only the listed ones.

## Managing prompts at runtime

Prompts can be created, updated, and deleted via the Admin API without restarting:

```bash
# List all prompts for the current tenant
curl https://your-gateway/api/v1/admin/prompts

# Create a new prompt
curl -X POST https://your-gateway/api/v1/admin/prompts \
  -H "Content-Type: application/json" \
  -d '{
  "id": "myNewPrompt",
  "role": "user",
  "content": "Please explain: [[${question}]]",
  "requiresMultiModalModel": false,
  "requiresFunctionCallingModel": false,
  "reasoningDisabled": false
}'

# Update a prompt
curl -X PUT https://your-gateway/api/v1/admin/prompts/{id} \
  -H "Content-Type: application/json" \
  -d '{ ... }'

# Delete a prompt
curl -X DELETE https://your-gateway/api/v1/admin/prompts/{id}
```

Changes made via the API are persisted in OpenSearch and take effect immediately for the tenant. They survive application restarts.

## Tips for effective prompts

- Write `role: SYSTEM` prompts for persistent instructions (persona, rules, context).
- Write `role: USER` prompts for document-specific context or task instructions.
- Keep ServiceHelper calls isolated: if a helper call fails, the entire prompt rendering fails.
- Use `[[${variable != null} ? ${variable} : 'default']]` to handle optional payload variables.
- Test with the Admin API render endpoint (`POST /api/v1/admin/prompts/{id}/render`) to preview rendered output before deploying.

## Related pages

- [Prompts and templating](../understanding/prompts_and_templating.md)
- [Managing prompts in the admin UI](../admin/managing_prompts.md)
- [Goals](../understanding/goals.md)
- [Write goals](./writing_goals.md)
- [Custom service helpers](./custom_service_helpers.md)
- [Configuration file reference](../reference/configuration.md)
