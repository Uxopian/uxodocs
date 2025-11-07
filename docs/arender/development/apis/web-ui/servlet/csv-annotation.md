---
title: "Download the CSV of the annotations"
---







A new servlet is deployed to download the CSV file of the annotations of a document.

## Request 

This functionality is accessible via the servlet: **servletCSVAnnotations**

Usable in GET


### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/servletCSVAnnotations?uuid=docUUID'
```


## Servlet Response

The CSV file of document annotations given as parameter is downloaded.