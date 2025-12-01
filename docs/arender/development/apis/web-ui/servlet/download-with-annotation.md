---
title: Download documents with annotations
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 72a2ca961cd702eb6f00cb6a02c11933e360d22a1c2f88f7a8fc276c92687385
---







A new servlet is deployed to download a PDF document with annotations. 

## Request 

This functionality is accessible via the servlet: **downloadDocumentWithAnnotations**

Usable in GET


### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/downloadDocumentWithAnnotations?operationName=renderAnnotations'
```

The *operationName* parameter can take several values:
* renderAnnotations: the final document will be a PDF with annotations applied on the PDF
* renderFDFAnnotations: the final document will be a PDF with annotations created on the PDF. The annotations are editable.

## Servlet Response

A document is downloaded in PDF format with annotations.
