---
title: Download documents as base64-encoded file
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 3720437dbe7c3d36857c1b00018a792f4dbd5027ac05def35bc51ef80ea5c2a4
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
