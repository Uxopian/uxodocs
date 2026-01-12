---
title: GET differences
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 2a7818a2c228858b44737c285b730bd54e7913a285d5fdb4b8290caa63471f9a
---

This API allows you to request a textual comparison and retrieve a DocumentCompareResult.

## API technical description

Endpoint:

```bash
GET /difference
```

Query param:

| Attribute       | Type   | Required | Description                           |
| --------------- | ------ | -------- | ------------------------------------- |
| leftDocumentId  | String | yes      | Id of the first document to compare.  |
| rightDocumentId | String | yes      | Id of the second document to compare. |

Response:

| Attribute             | Type                  | Description                                                  |
| :-------------------- | :-------------------- | :----------------------------------------------------------- |
| documentCompareResult | DocumentCompareResult | DocumentCompareResult contains the result of the comparison. |

## Examples

### Retrieve a difference

The call below generates a build request from two documents with IDs:

- left document id= _123e4567-e89b-12d3-a456-426614174000_
- right document id= _b64_bm9yZS92SDMtMS0xMTh1735080237_

```bash
curl -X 'GET' \
  'http://localhost:8761/difference?leftDocumentId=123e4567-e89b-12d3-a456-426614174000&rightDocumentId=b64_bm9yZS92SDMtMS0xMTh1735080237' \
  -H 'accept: */*'
```

Response sample:

```bash

  "leftDocumentId": "string",
  "rightDocumentId": "string",
  "textChanges": [

      "changeType": "DELETE",
      "fragments": [

          "endOfLine": true,
          "pageNumber": 0,
          "text": "string",
          "type": "DELETE"

      ],
      "left": {
        "clickableDestination": {
          "action": "string",
          "destination": "string",
          "position": {
            "h": 0,
            "w": 0,
            "x": 0,
            "y": 0

        },
        "font": "string",
        "fontSize": 0,
        "individualWidths": [
          0
        ],
        "pageNumber": 0,
        "paragraphId": 0,
        "position": {
          "h": 0,
          "w": 0,
          "x": 0,
          "y": 0
        },
        "rightToLeftText": true,
        "startTime": 0,
        "text": "string"
      },
      "right": {
        "clickableDestination": {
          "action": "string",
          "destination": "string",
          "position": {
            "h": 0,
            "w": 0,
            "x": 0,
            "y": 0

        },
        "font": "string",
        "fontSize": 0,
        "individualWidths": [
          0
        ],
        "pageNumber": 0,
        "paragraphId": 0,
        "position": {
          "h": 0,
          "w": 0,
          "x": 0,
          "y": 0
        },
        "rightToLeftText": true,
        "startTime": 0,
        "text": "string"


  ]

```
