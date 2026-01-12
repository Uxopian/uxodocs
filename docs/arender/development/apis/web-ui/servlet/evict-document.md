---
title: Evict document
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: edad50e50a550fcd8fa6e188a0ad95ea6b2025d2dcfb5a935b2d2e9b718d086b
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
