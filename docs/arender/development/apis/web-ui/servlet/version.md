---
title: Version
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: fa362eefda6b5daa6a7e633b3f2dff05f2420831a3c03e5714a6d0e8a8661e74
---







Since version 2023.6.0, a new servlet has been introduced to display the ARender version.

## Request 

This functionality is accessible via the servlet: **VersionServlet**

Usable with **GET** HTTP method

### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/version'
```

## Servlet Response

The deployed ARender version in plain text format
