---
title: Download comparison results
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 507143a47e1d25c02e5a5fea43da48c25c3e2d822f1446493eb1664ce353e892
---

A new servlet is deployed allowing to download the results of the comparison of two documents.

## Request

This functionality relies on the use of the servlet:
**downloadDocumentWithCompareResultsServlet**

Usable in GET

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/downloadServlet/mergedWithCompareResult?left=doc1UUID&right=doc2UUID'
```

- left : the UUID of the first document to compare
- right : the UUID of the second document to compare

## Servlet Response

A document is downloaded. It corresponds to the results of the comparison between doc1 and doc2.
In green: the text common to both documents will be highlighted
In red: the different text between the two documents will be highlighted
