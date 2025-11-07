---
title: "Download documents with annotations"
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