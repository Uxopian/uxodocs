---
title: Print pages
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 750e57a2b889066822614cd757f7ee0be337766072dff43955f74c39109f68cb
---







A new servlet is deployed to print the pages of a document.
An HTML file is displayed with the different pages of the document given in parameters.

## Request 

This functionality is accessible via the servlet: **printPage**

Usable in GET


### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/printPage?uuid=docUUID&nbPages=nbPages&renditionPrintWidth=width&browserPrintWidth=width&page=pages'
```

* uuid: document id
* nbPages: the number of pages to print
* renditionPrintWidth: the size of the image in the rendition
* browserPrintWidth: the size of the image displayed in the browser
* pages: the numbers of the pages to be printed

## Servlet Response

An HTML file with the different pages to print.
