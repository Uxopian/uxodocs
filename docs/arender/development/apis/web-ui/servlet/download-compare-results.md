---
title: "Download comparison results"
---







A new servlet is deployed allowing to download the results of the comparison of two documents.

## Request

This functionality relies on the use of the servlet:
**downloadDocumentWithCompareResultsServlet**

Usable in GET

### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/downloadServlet/mergedWithCompareResult?left=doc1UUID&right=doc2UUID'
```

* left : the UUID of the first document to compare  
* right : the UUID of the second document to compare

## Servlet Response
A document is downloaded. It corresponds to the results of the comparison between doc1 and doc2.
In green: the text common to both documents will be highlighted
In red: the different text between the two documents will be highlighted