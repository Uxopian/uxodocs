---
title: "Get page image"
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