---
title: GET a document metadata
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: e4ba212ffe9f217685cc583bcaf09780859930104748e0eb2c69ec12cd83ffa4
---

This API allows you to retrieve a document metadata.

## API Description

Endpoint :

```bash
GET /documents/{documentId}
```

Resource path:

| Variable   | Required | Description          |
| :--------- | :------- | :------------------- |
| documentId | Yes      | The ID of a document |

Response :

| Type                | Description           |
| :------------------ | :-------------------- |
| DFSDocumentAccessor | The document accessor |

## Examples

### Retrieve a document

The call below generates a request to retrieve the metadata of the document with id _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237' \
  -H 'accept: */*'
```
