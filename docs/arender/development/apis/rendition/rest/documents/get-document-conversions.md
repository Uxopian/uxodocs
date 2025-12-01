---
title: GET document conversions
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: a23d099f481c5d555e222369d18d6c6f9f9d5b98842a9d5dd15f67cd06b5bbae
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
