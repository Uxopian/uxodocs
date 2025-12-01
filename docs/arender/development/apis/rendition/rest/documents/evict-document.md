---
title: DELETE Document
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 4ca504abb75f45cd749a6fc00e9157aaa39d89f5ed07430b8376e4163f30a8ec
---








This API allows you to evict (remove) a document from the system.

## API Description

Endpoint:

```bash
DELETE /documents/{documentId}
```

Resource path:

| Variable    | Required | Description           |
|:------------|:---------|:----------------------|
| documentId  | Yes      | The ID of a document  |

## Example

### Evict a Document

The following example evicts (removes) a document with the specified document ID.

```bash
curl -X DELETE 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237'
```
