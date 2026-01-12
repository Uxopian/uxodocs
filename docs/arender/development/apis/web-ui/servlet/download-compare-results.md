---
title: Download comparison results
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: cd8ae80208736b48acb99e60c7b5d898c4020cd1a72f9b4b92a7eae61042056e
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
