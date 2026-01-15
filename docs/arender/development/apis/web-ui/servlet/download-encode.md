---
title: Download documents as base64-encoded file
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: b42f5ec61309e3dfc96c68e1fa8a09acb93b480311e3fa6e88f0e8bff00ae8c6
---

A new servlet is deployed to download a document encoded in base 64.

## Request

This functionality is accessible via the servlet: **downloadBase64EncodedDocument**

Usable in GET

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/downloadBase64EncodedDocument'
```

## Servlet Response

A document is downloaded. This document is encoded in base 64. It is not possible to open it if it has not been decoded.
