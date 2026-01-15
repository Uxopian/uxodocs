---
title: Download documents
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: e22845e7f6d811bc17e095577bd0fc4249985f28b54da89172d11066a3640101
---

A new servlet is deployed to download documents.
Documents can be downloaded as source format, PDF or ZIP format.

## Request

This functionality is accessible via the servlet: **downloadServlet**

Usable in GET

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/downloadServlet?uuid=docUUID&sourceId=source&title=DocumentTitle&type=type'
```

- uuid: document id
- sourceId: initial document id (optional). Useful if the document id is transformed
- title: title of the downloaded document
- type: type of download :
    - INITIAL: initial type of document (without annotations)
    - RENDERED: type that cannot be converted (pdf, mp4, tiff)
    - COMPRESSED: zip type

## Servlet Response

The document sent as a parameter is downloaded in the format corresponding to the `type` parameter. It will be renamed according to the `title` parameter.
