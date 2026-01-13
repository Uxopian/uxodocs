---
title: DELETE Document
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: c35ea6d08c889b453998028dd916aa860093770b25b936aec76817083b30f040
---

This API allows you to evict (remove) a document from the system.

## API Description

Endpoint:

```bash
DELETE /documents/{documentId}
```

Resource path:

| Variable   | Required | Description          |
| :--------- | :------- | :------------------- |
| documentId | Yes      | The ID of a document |

## Example

### Evict a Document

The following example evicts (removes) a document with the specified document ID.

```bash
curl -X DELETE 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237'
```
