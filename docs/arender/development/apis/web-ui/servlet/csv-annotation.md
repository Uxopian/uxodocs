---
title: Download the CSV of the annotations
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: e27b426b2aae935e81d6c35f58a8947e55b4ae233dae0030d5274a084b72ef97
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
