---
title: GET Document Layout
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 53cdbc627628da896e5a354257699c89a1a878412ecafd5aceb1f22cab6d2c92
---

This API allows you to retrieve the layout information of a document.

## API Description

Endpoint:

```bash
GET /documents/{documentId}/layout
```

Resource path:

| Variable   | Required | Description          |
| :--------- | :------- | :------------------- |
| documentId | Yes      | The ID of a document |

Response :

| Type           | Description                            |
| :------------- | :------------------------------------- |
| DocumentLayout | The layout information of the document |

## Example

### Get Document Layout

The following example retrieves the layout information of a document
with the specified document ID.

```bash
curl -X GET 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/layout'
```

### Result

The following example show a DocumentLayout for a PDF of wo pages.

```json
{
  "type": "com.arondor.viewer.client.api.document.DocumentPageLayout",
  "documentId": {
    "id": "b64_N2U5MzY0MmQtYTQ4YS00MzBlLThiYWYtMjhhMjdlNGZlMDQz"
  },
  "documentTitle": null,
  "mimeType": "application/pdf",
  "pageDimensionsList": [
    {
      "width": 595,
      "height": 841,
      "rotation": 0,
      "dpi": 72,
      "pageLayers": null
    },
    {
      "width": 595,
      "height": 841,
      "rotation": 0,
      "dpi": 72,
      "pageLayers": null
    }
  ]
}
```
