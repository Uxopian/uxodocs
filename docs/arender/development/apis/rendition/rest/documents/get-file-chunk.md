---
title: GET file chunk
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 5631a4f84566770fd5d1574ecc1f46b7c9b7ab608cfb97a19e64dd2a323e3cd5
---

This API allows you to retrieve a chunk of a file with a specified range of offset.

## API Description

Endpoint:

```bash
GET /documents/{documentId}/file/chunk
```

Resource path:

| Variable   | Required | Description          |
| :--------- | :------- | :------------------- |
| documentId | Yes      | The ID of a document |

Query params:

| Parameter | Required | Description                                               |
| :-------- | :------- | :-------------------------------------------------------- |
| format    | No       | The format of the document in which we retrieve the chunk |

Resource header:

| Variable | Required | Description                                                   |
| :------- | :------- | :------------------------------------------------------------ |
| range    | Yes      | Range value in “bytes=x-y” format with x and y being integers |

## Examples

### Retrieve Chunk

The following example retrieves a chunk of a document
with ID _b64_bm9yZS92SDMtMS0xMTh1735080237_ in txt format which exist in rendition.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/file/chunk?format=txt' \
  -H 'accept: */*' \
  -H 'Range: bytes=0-10'
```
