---
title: GET Printable Document
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 1f4625883afbd672e2c992fe6cd7efcf747964187b070dd894a20b39a9ad3a97
---







This API allows you to retrieve the printable version of a specific document.

## API Description

Endpoint:
```bash
GET /documents/{documentId}/printable
```

Resource path:

| Variable    | Required | Description           |
|:------------|:---------|:----------------------|
| documentId  | Yes      | The ID of a document  |

Response :

| Type                  | Description                           |
|:----------------------|:--------------------------------------|
| HttpServletResponse   | The printable document in PDF format  |

## Examples

### Retrieve Printable Document

The following example demonstrates how to retrieve the printable
document for a specific document with ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.
The parameter -o allow to save the result in an output file.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/printable' \
  -H 'accept: application/pdf' \
  -o printable_document.pdf
```
