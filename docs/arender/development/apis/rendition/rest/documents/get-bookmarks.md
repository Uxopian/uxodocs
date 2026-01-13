---
title: Get Bookmarks
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 18dd1153c58b2b4871fa61f14ac54dcdb8d9601f3c639b2b5c25b1649e1c71a7
---

This API allows you to retrieve the bookmarks of a specific document.

## API Description

Endpoint:

```bash
GET /documents/{documentId}/bookmarks
```

Resource path:

| Variable   | Required | Description          |
| :--------- | :------- | :------------------- |
| documentId | Yes      | The ID of a document |

Response :

| Type      | Description                   |
| :-------- | :---------------------------- |
| Bookmarks | The bookmarks of the document |

## Examples

### Get Bookmarks

The example below demonstrates how to retrieve the bookmarks
of a document with the ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/bookmarks' \
  -H 'accept: application/json'
```
