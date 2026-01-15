---
title: GET document conversions
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: c26a776541c931af742bd28531e4b9384a2f9ab298a3b6c2d7e621cd2167ae1c
---

This API allows you to retrieve a conversion ids of a document.

## API Description

Endpoint:

```bash
GET /documents/{documentId}/conversions
```

Resource path:

| Variable   | Required | Description          |
| :--------- | :------- | :------------------- |
| documentId | Yes      | The ID of a document |

## Examples

### Retrieve conversions

The following example retrieves conversion ids of a document
with ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/conversions' \
  -H 'accept: */*'
```
