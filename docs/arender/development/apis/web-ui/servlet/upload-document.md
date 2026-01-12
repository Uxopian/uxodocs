---
title: Upload/load a document on the server
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: eeb24e92e0d1e364e29705bc2f08ac7ae07c80642cb912ece86c2cff0330bd6f
---

## Upload

A servlet is deployed to upload a document on the server.

### Request

This functionality is accessible via the servlet: **uploadServlet**

Usable in GET

#### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/uploadServlet?uuid=docUUID'
```

### Servlet Response

A new UUID is created from the document id sent as a parameter. It will be interpreted by ARender and downloaded to the server.
This new id is displayed.

## Load

A servlet is deployed to load a document on the server.

### Request

This functionality is accessible via the servlet: **uploadServlet**

Usable in POST

#### Request example

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "file=@yourFile.pdf" "https://<arender_host>/ARender/arendergwt/uploadServlet"
```

- yourFile : title of your document

### Servlet Response

A new UUID is created from the document sent in the request. It will be loaded to the server.
This new id is displayed.
