---
title: GET Printable Document
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: ad655410b38da24af74665429382fb2bf5c1ce1ceac9538c61f92e2ed44af1fc
---

This API allows you to retrieve the printable version of a specific document.

## API Description

Endpoint:

```bash
GET /documents/{documentId}/printable
```

Resource path:

| Variable   | Required | Description          |
| :--------- | :------- | :------------------- |
| documentId | Yes      | The ID of a document |

Response :

| Type                | Description                          |
| :------------------ | :----------------------------------- |
| HttpServletResponse | The printable document in PDF format |

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
