---
title: Merge documents
sidebar_position: 18
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 9f70c64f01433ca3467f22dafd87ad424aaa344b8615a355e2d3aac7368c3517
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

```bash
curl --data "url=../../samples/arender.pdf&url=../../samples/fw4.pdf" http://<arender_host>/ARender/arendergwt/mergeDocumentsServlet
```

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/mergeDocumentsServlet?url=../../samples/arender.pdf&url=../../samples/fw4.pdf&url=../../samples/arender-en.pdf'
```

## Servlet Response

The servlet returns the UUID of the merged document and its number of
pages.

```json
{
  "uuid": "b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0",
  "nbPages": "32"
}
```

Here the UUID is: b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0.

The number of pages is 32.

One the request executed, the merged document is in ARender cache and
viewable through the URL below:

> `http://{arender_host}/ARender/?uuid=b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0`

Even downloadable through:

> `http://{arender_host}/ARender/arendergwt/downloadServlet?uuid=b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0&amp;title=DocumentTitle&amp;type=INITIAL`
