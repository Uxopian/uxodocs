---
title: GET PDF Document Annotations
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 44746b53aaac53cae295b6a19ac8be9cf0036720d4f1b31529472d9b4cb9269e
---








This API allows you to retrieve the annotations of a specific PDF document.

## API Description

Endpoint:

```bash
GET /documents/{documentId}/file/annotations
```

Resource path:

| Variable    | Required | Description           |
|:------------|:---------|:----------------------|
| documentId  | Yes      | The ID of a document  |

Response :

| Type        | Description                                             |
|:------------|:--------------------------------------------------------|
| InputStream | The document annotations as a file in the response body |

## Examples

### Retrieve Document Annotations

The following example retrieves the annotations for a PDF document with 
the ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X GET 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/file/annotations' \
  -H 'accept: application/octet-stream'
```
