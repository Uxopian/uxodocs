---
title: Download the CSV of the annotations
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 01595b6ecbfc1a24fa2e33c2f34fc926c0e8ad4fb32d1014e00bceb22726245e
---

A new servlet is deployed to download the CSV file of the annotations of a document.

## Request

This functionality is accessible via the servlet: **servletCSVAnnotations**

Usable in GET

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/servletCSVAnnotations?uuid=docUUID'
```

## Servlet Response

The CSV file of document annotations given as parameter is downloaded.
