---
title: Get page image
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 97007d52b73532141522a5c4fd5c4489866f555ff196dd440ca492dbd79d5dfc
---







A new servlet is deployed to get a page from a document.

## Request 

This functionality is accessible via the servlet: **imageServlet**

Usable in GET


### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/imageServlet?uuid=docUUID&pagePosition=page&desc=size'
```

* uuid: document id
* pagePosition: the page of the document
* desc: the size of the image in pixels

## Servlet Response

An image appears, it corresponds to the document page given in parameter.
