---
title: Download documents with annotations
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: b2f99c861f38c369d44043070dcb27ee7c886b4d48fae41df4a0a9d4e37b26f1
---

A new servlet is deployed to download a PDF document with annotations.

## Request

This functionality is accessible via the servlet: **downloadDocumentWithAnnotations**

Usable in GET

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/downloadDocumentWithAnnotations?operationName=renderAnnotations'
```

The _operationName_ parameter can take several values:

- renderAnnotations: the final document will be a PDF with annotations applied on the PDF
- renderFDFAnnotations: the final document will be a PDF with annotations created on the PDF. The annotations are editable.

## Servlet Response

A document is downloaded in PDF format with annotations.
