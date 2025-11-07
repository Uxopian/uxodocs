---
title: "GET Document existence"
---








This API allows you to check the existence of a specific document.

## API Description

Endpoint:
```bash
GET /documents/{documentId}/check
```

Resource path:

| Variable    | Required | Description           |
|:------------|:---------|:----------------------|
| documentId  | Yes      | The ID of a document  |

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