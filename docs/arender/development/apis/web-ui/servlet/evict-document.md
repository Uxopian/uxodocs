---
title: Evict document
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 295c03c37b84d734ceb620fd3fb9b7aec36040f1abf7953f948bee54ad0e79dd
---

A new servlet is deployed to evict a document from both memory cache and FileSystem cache.

## Request

This functionality is accessible via the servlet: **evictDocument**

Usable in GET

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/evictDocument?uuid=doc1UUID'
```

## Servlet Response

If the document is evicted, a blank page appears and the server has no longer access to the document.
