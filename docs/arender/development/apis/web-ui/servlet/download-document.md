---
title: "Download documents"
---







A new servlet is deployed to download documents. 
Documents can be downloaded as source format, PDF or ZIP format.

## Request 

This functionality is accessible via the servlet: **downloadServlet**

Usable in GET


### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/downloadServlet?uuid=docUUID&sourceId=source&title=DocumentTitle&type=type'
```

* uuid: document id
* sourceId: initial document id (optional). Useful if the document id is transformed
* title: title of the downloaded document
* type: type of download :
     * INITIAL: initial type of document (without annotations)
     * RENDERED: type that cannot be converted (pdf, mp4, tiff)
     * COMPRESSED: zip type

## Servlet Response

The document sent as a parameter is downloaded in the format corresponding to the `type` parameter. It will be renamed according to the `title` parameter.