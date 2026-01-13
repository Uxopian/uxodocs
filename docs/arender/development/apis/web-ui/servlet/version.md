---
title: Version
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: df4c16b705e8796543db97923495b7eb80b0e9cd790a7cbf5d24603eb8b89e50
---

Since version 2023.6.0, a new servlet has been introduced to display the ARender version.

## Request

This functionality is accessible via the servlet: **VersionServlet**

Usable with **GET** HTTP method

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/version'
```

## Servlet Response

The deployed ARender version in plain text format
