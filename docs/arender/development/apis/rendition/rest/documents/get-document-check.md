---
title: GET Document existence
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 01465ada732b2231ba59cb8acaf33df90ef8f1219be380369e3df9efea19fb2c
---

This API allows you to check the existence of a specific document.

## API Description

Endpoint:

```bash
GET /documents/{documentId}/check
```

Resource path:

| Variable   | Required | Description          |
| :--------- | :------- | :------------------- |
| documentId | Yes      | The ID of a document |

Response :

| Type       | Description                                               |
| :--------- | :-------------------------------------------------------- |
| HttpStatus | HTTP status code indicating the existence of the document |

## Examples

### Check Document

The following example demonstrates how to check the existence of a document with the ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/check' \
  -H 'accept: application/json'
```
