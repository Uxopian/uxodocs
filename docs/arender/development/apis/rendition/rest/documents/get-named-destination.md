---
title: GET Named Destinations
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: fcc6fd50207ecb3cfc6ac57f24363a5f1c62cf14836aba0163a146ac5ad57cd4
---

This API allows you to retrieve the named destinations of a specific document.

## API Description

Endpoint:

```bash
GET /documents/{documentId}/destinations
```

Resource path:

| Variable   | Required | Description          |
| :--------- | :------- | :------------------- |
| documentId | Yes      | The ID of a document |

Response :

| Type              | Description                                                       |
| :---------------- | :---------------------------------------------------------------- |
| NamedDestinations | A JSON object representing the named destinations of the document |

## Examples

### Retrieve Named Destinations

The following example retrieves the named destinations for a document
with ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X GET 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/destinations' \
  -H 'accept: application/json'
```
