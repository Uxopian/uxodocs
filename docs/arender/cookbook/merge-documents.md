---
title: "Merge documents"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 388f2376d3c6e693a284864f7485d9a1bb0c5cfe8cd61c168288611be607ed18
---

ARender provides a way to generate a fusion of multiple documents into
one PDF.

## Request to use

This functionality relies on the use of the servlet:
**mergeDocumentsServlet**.

Usable in **POST** or **GET**.

### Request example

You will find below, exemple with documents accessible by URL. You can
also put any kind of parameter matching any connector (FileNet, Alfresco
etc...)

``` bash
curl --data "url=../../samples/arender.pdf&url=../../samples/fw4.pdf" http://<arender_host>/ARender/arendergwt/mergeDocumentsServlet
```

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/mergeDocumentsServlet?url=../../samples/arender.pdf&url=../../samples/fw4.pdf&url=../../samples/arender-en.pdf'
```

## Servlet Response

The servlet returns the UUID of the merged document and its number of
pages.

:::tip response


``` javascript
{"uuid":"b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0","nbPages":"32"}
```

Here the UUID is: b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0.

The number of pages is 32.

One the request executed, the merged document is in ARender cache and
viewable through the URL below:

> `http://{arender_host}/ARender/?uuid=b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0`

Even downloadable through:

> `http://{arender_host}/ARender/arendergwt/downloadServlet?uuid=b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0&title=DocumentTitle&type=INITIAL`
