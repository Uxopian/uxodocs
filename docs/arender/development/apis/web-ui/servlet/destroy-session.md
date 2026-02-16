---
title: Destroy session
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: f6edbd39a759b6866aee1b9403f8fedd78a8a30735c7c029517cc21eaaa1f08b
---

A new servlet is deployed to destroy user session information.

## Request

This functionality is accessible via the servlet: **destroySession**

The request can be used with any HTTP method.

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/destroySession'
```

## Servlet Response

The session will be destroyed including the following ARender information:

- user
- userAgent
- versionUserAgent
