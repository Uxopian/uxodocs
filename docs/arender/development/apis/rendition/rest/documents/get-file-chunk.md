---
title: GET file chunk
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 5f1f2dac6c58d17d9b0560b08799e0e582aa9c31cd7423f22df3a088f7a8fc6a
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
