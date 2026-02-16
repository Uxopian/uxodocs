---
title: Get page image
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 09e8f7b8ddd4854ee13260f1f7c0be4b4532bf6277cfd9aa1eea75b9c131c18c
---

A new servlet is deployed to get a page from a document.

## Request

This functionality is accessible via the servlet: **imageServlet**

Usable in GET

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/imageServlet?uuid=docUUID&pagePosition=page&desc=size'
```

- uuid: document id
- pagePosition: the page of the document
- desc: the size of the image in pixels

## Servlet Response

An image appears, it corresponds to the document page given in parameter.
