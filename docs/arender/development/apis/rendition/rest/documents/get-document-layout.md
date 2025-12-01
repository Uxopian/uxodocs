---
title: GET Document Layout
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 9318a3a0a630eaeebefca1036b62b6b4d9448f13921f7d6b2daa8ffab46f60cc
---








This API allows you to retrieve the layout information of a document.

## API Description

Endpoint:
```bash
GET /documents/{documentId}/layout
```

Resource path:

| Variable    | Required | Description           |
|:------------|:---------|:----------------------|
| documentId  | Yes      | The ID of a document  |

Response :

| Type           | Description                            |
|:---------------|:---------------------------------------|
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

```bash

  "type": "com.arondor.viewer.client.api.document.DocumentPageLayout",
  "documentId": {
    "id": "b64_N2U5MzY0MmQtYTQ4YS00MzBlLThiYWYtMjhhMjdlNGZlMDQz"
  },
  "documentTitle": null,
  "mimeType": "application/pdf",
  "pageDimensionsList": [

      "width": 595,
      "height": 841,
      "rotation": 0,
      "dpi": 72,
      "pageLayers": null
    },

      "width": 595,
      "height": 841,
      "rotation": 0,
      "dpi": 72,
      "pageLayers": null

  ]

```
