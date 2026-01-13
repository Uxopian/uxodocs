---
title: GET text positions
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 2961182a0011da17b40a3bee2df02a24f240571a8ba4a3b465ffc590c66ea80f
---

This API allows you to retrieve the text position of a page.

## API Description

Endpoint:

```bash
GET /documents/{documentId}/pages/{page}/text/position
```

Resource path:

| Variable   | Required | Description                        |
| :--------- | :------- | :--------------------------------- |
| documentId | Yes      | The ID of a document               |
| page       | Yes      | The page where the text is located |

Response :

| Type         | Description          |
| :----------- | :------------------- |
| PageContents | The text of the page |

## Examples

### Retrieve Signatures

The call below generates a request to retrieve the first page text of document with ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/pages/0/text/position' \
  -H 'accept: */*'
```
