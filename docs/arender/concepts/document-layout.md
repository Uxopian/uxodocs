---
title: Document layout
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /concepts/document-layout
sidebar_position: 3
content_hash: 496a4274ffcaf5190c0aea691e0f6e67cdeca598cba5376ae3fae9147ba8598c
---

ARender computes a layout for every document it opens. The layout describes the number of pages, their dimensions, rotation, resolution, and optional layers. The viewer uses the layout to render scrollbars, thumbnails, and page navigation before any page image is fetched.

## Layout model

A document layout is a list of page dimensions. Each entry contains:

| Field | Type | Description |
|-------|------|-------------|
| `width` | double | Page width in points |
| `height` | double | Page height in points |
| `rotation` | int | Rotation in degrees (0, 90, 180, 270). Width and height are swapped automatically for 90 and 270. |
| `dpi` | int | Resolution in dots per inch |
| `pageLayers` | list | Optional layer names for documents that support layers (PDF, AutoCAD) |

:::info
Pages are indexed from 0.
:::

## REST endpoint

Retrieve a document layout:

```
GET /documents/{documentId}/layout
```

Response example (two-page PDF):

```json
{
  "type": "com.arondor.viewer.client.api.document.DocumentPageLayout",
  "documentId": {
    "id": "b64_I2RlZmF1bHQ="
  },
  "documentTitle": "ARender.pdf",
  "mimeType": "application/pdf",
  "pageDimensionsList": [
    { "width": 720, "height": 405, "rotation": 0, "dpi": 72, "pageLayers": null },
    { "width": 720, "height": 405, "rotation": 0, "dpi": 72, "pageLayers": null }
  ]
}
```

The response includes the fully qualified Java type, the document ID, title, MIME type, and a `pageDimensionsList` array with one entry per page.

## Document containers

When ARender opens a container (a folder or multi-documents), the layout uses a `DocumentContainer` variant. Each child document has its own layout, and the container groups them under a single document ID with a tree structure visible in the viewer sidebar.

## Related pages

- [Architecture overview](../overview/architecture.md)
- [Rendition pipeline](./rendition-pipeline.md)
- [Broker API](../reference/rest-api/broker-api.md)
