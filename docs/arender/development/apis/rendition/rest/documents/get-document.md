---
title: GET a document metadata
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 02683c868dd31d9b191d20772d1d928b8112cb3a92931f006de8fa6c93c12a21
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
