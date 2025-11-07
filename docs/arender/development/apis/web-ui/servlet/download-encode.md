---
title: "Download documents as base64-encoded file"
---







A new servlet is deployed to download a document encoded in base 64. 

## Request 

This functionality is accessible via the servlet: **downloadBase64EncodedDocument**

Usable in GET


### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/downloadBase64EncodedDocument'
```

## Servlet Response

A document is downloaded. This document is encoded in base 64. It is not possible to open it if it has not been decoded.