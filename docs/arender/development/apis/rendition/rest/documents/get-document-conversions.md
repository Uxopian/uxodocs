---
title: "GET document conversions"
---








This API allows you to retrieve a conversion ids of a document.

## API Description

Endpoint:
```bash
GET /documents/{documentId}/conversions
```

Resource path:

| Variable    | Required | Description           |
|:------------|:---------|:----------------------|
| documentId  | Yes      | The ID of a document  |

## Examples

### Retrieve conversions

The following example retrieves conversion ids of a document
with ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/conversions' \
  -H 'accept: */*'
```