---
title: GET Signatures
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 3ac67a258774b94c1f5ceba78fe398612a9084cec8cb8b8ded2b7ffb265d2441
---

This API allows you to retrieve the signatures of a specific document.

## API Description

Endpoint:

```bash
GET /documents/{documentId}/signatures
```

Resource path:

| Variable   | Required | Description          |
| :--------- | :------- | :------------------- |
| documentId | Yes      | The ID of a document |

Response :

| Type       | Description                    |
| :--------- | :----------------------------- |
| Signatures | The signatures of the document |

## Examples

### Retrieve Signatures

The call below generates a request to retrieve the signatures for a document with the ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/signatures' \
  -H 'accept: */*'
```
