---
title: Write goals
sidebar_label: Write goals
sidebar_position: 4
last_update:
  date: '2026-03-24T12:58:17.027Z'
  author: CI/CD Bot
content_hash: c99dae77a8836b13f2ebb3f6f3e9ffa616acdf0e37a345871f3fcdea24a556cf
---

Goals compose multiple prompts into named workflows. This guide explains how to define goal groups in `goals.yml`, write filter expressions, and manage goals at runtime.

## Define a goal group

Add goal groups under `goals.globals` in `goals.yml`:

```yaml
goals:
  globals:
    - id: document-analysis
      goals:
        - promptId: basePrompt
          filter: "true"
          index: 1
        - promptId: arenderContext
          filter: "true"
          index: 10
        - promptId: contractSummary
          filter: "[[${documentType == 'contract'}]]"
          index: 20
        - promptId: invoiceSummary
          filter: "[[${documentType == 'invoice'}]]"
          index: 30
```

When a request includes `{ "type": "goal", "value": "document-analysis" }`, the system evaluates each entry's filter. Entries where the filter returns `true` have their prompts rendered and injected into the LLM call, in ascending `index` order.

## Fields

| Field | Description |
|---|---|
| `id` | Unique identifier for the goal group. Referenced as the `value` in request content items. |
| `goals[].promptId` | ID of the prompt to include when the filter passes. |
| `goals[].filter` | Thymeleaf boolean expression. Use `"true"` for unconditional inclusion. |
| `goals[].index` | Execution order. Lower values run first. Gaps are allowed. |

## Filter expressions

Filters are evaluated using the same Thymeleaf context as prompt rendering. The request payload variables are available:

```
"[[${documentType == 'contract'}]]"
```

```
"[[${language != null}]]"
```

```
"[[${priority > 5}]]"
```

Use `"true"` for a filter that always passes. Use `"false"` to temporarily disable a goal entry.

## Payload variables in filters

Variables in the `payload` of the request content item are available in filter expressions. For example, if the request sends `"payload": { "documentType": "invoice" }`, the filter `[[${documentType == 'invoice'}]]` evaluates to `true`.

## Tenant overrides

Define per-tenant goal groups under `goals.tenants`:

```yaml
goals:
  tenants:
    - tenantId: my-tenant
      mergeStrategy: merge
      goalGroups:
        - id: document-analysis
          goals:
            - promptId: tenantSpecificAnalysis
              filter: "true"
              index: 5
            - promptId: arenderContext
              filter: "true"
              index: 10
```

`mergeStrategy: merge` updates matching goal groups for the tenant. Goal entries within the group are replaced entirely (the group is treated as a unit). `mergeStrategy: replace` replaces the full tenant goal configuration.

## Runtime management

Goal groups can be created, updated, and deleted via the Admin API without restarting:

```bash
# List goal groups for the current tenant
curl https://your-gateway/api/v1/admin/goals

# Create a goal group
curl -X POST https://your-gateway/api/v1/admin/goals \
  -H "Content-Type: application/json" \
  -d '{
  "id": "my-workflow",
  "goals": [
    { "promptId": "basePrompt", "filter": "true", "index": 1 },
    { "promptId": "arenderContext", "filter": "true", "index": 10 }
  ]
}'

# Update a goal group
curl -X PUT https://your-gateway/api/v1/admin/goals/{id} \
  -H "Content-Type: application/json" \
  -d '{ ... }'

# Delete a goal group
curl -X DELETE https://your-gateway/api/v1/admin/goals/{id}
```

Changes are persisted in OpenSearch and take effect immediately for the tenant.

## Example: document-type routing

A goal that routes to different prompts depending on document type:

```yaml
- id: analyse
  goals:
    - promptId: basePrompt
      filter: "true"
      index: 1
    - promptId: arenderContext
      filter: "true"
      index: 10
    - promptId: contractReview
      filter: "[[${documentType == 'contract'}]]"
      index: 20
    - promptId: invoiceReview
      filter: "[[${documentType == 'invoice'}]]"
      index: 20
    - promptId: genericReview
      filter: "[[${documentType == null}]]"
      index: 20
```

Only one of the three prompts at index 20 will be included for any given request, depending on the `documentType` payload variable.

## Related pages

- [Goals](../understanding/goals.md)
- [Prompts and templating](../understanding/prompts_and_templating.md)
- [Write prompts](./writing_prompts.md)
- [Configuration file reference](../reference/configuration.md)
