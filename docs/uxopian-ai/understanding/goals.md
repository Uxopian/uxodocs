---
title: Goals
sidebar_label: Goals
sidebar_position: 6
last_update:
  date: '2026-03-24T12:58:17.027Z'
  author: CI/CD Bot
content_hash: 311906557f657eb0364f74f0a0bcc26bc78927427b7a0df23cbc6080d2b452e7
---

A goal is a named group of ordered prompt references. When a request includes a content item with `type: goal`, the system resolves the named goal group, evaluates each entry's filter expression, and injects the matching prompts into the LLM call.

## Why goals exist

Prompts cover individual message templates. Goals allow composing multiple prompts into named workflows with conditional logic. For example, a goal named `document-analysis` might inject a base system prompt plus a document-type-specific prompt based on the value of a `documentType` variable.

## Goal structure

A goal group contains an ordered list of entries. Each entry has:

| Field | Description |
|---|---|
| `promptId` | ID of the prompt to include |
| `index` | Execution order (ascending). Lower index runs first. |
| `filter` | Thymeleaf boolean expression. If the expression evaluates to `true`, the prompt is included. |

Example from `goals.yml`:

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
```

When a request includes `{ "type": "goal", "value": "document-analysis" }`, the system evaluates each entry's filter with the request payload as context. Entries where the filter evaluates to `true` have their prompts rendered and injected.

## Tenant overrides

Like prompts, goals support per-tenant overrides in `goals.yml`:

```yaml
goals:
  globals:
    - id: analyse
      goals:
        - promptId: genericComparison
          filter: "true"
          index: 1000

  tenants:
    - tenantId: tenant-id-1
      mergeStrategy: merge
      goalGroups:
        - id: compare
          goals:
            - promptId: detailedComparisonForTenant1
              filter: "[[${documentType == 'contract'}]]"
              index: 125
```

`mergeStrategy: merge` updates matching goal groups for the tenant. `mergeStrategy: replace` replaces the entire tenant goal configuration.

## Runtime management

Goals can be created, updated, and deleted via the Admin API (`/api/v1/admin/goals`) without restarting the application. Changes are persisted in OpenSearch.

## Backup

The backup path is configurable via `goals.backup.path` (or `GOALS_BACKUP_PATH` environment variable). Defaults to `./goals/`.

## Related pages

- [Prompts and templating](./prompts_and_templating.md)
- [Write goals](../extending/writing_goals.md)
- [Conversations and requests](./conversations_and_requests.md)
- [Configuration file reference](../reference/configuration.md)
