---
title: Document layout
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /concepts/document-layout
sidebar_position: 3
content_hash: 72453146bcd0758d7578b4dc19a6e35de3de99d9ad71fc3ea4272de80d1790fb
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

Pages are indexed from 0.

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

When ARender opens a container (a CMIS folder or a multi-part email), the layout uses a `DocumentContainer` variant. Each child document has its own layout, and the container groups them under a single document ID with a tree structure visible in the viewer sidebar.

## Caching

The broker caches layouts per document ID. Cached entries are evicted when the document is deleted. On the viewer side, a `DocumentLayoutCache` avoids redundant fetch calls during a session.

## Related pages

- [Architecture overview](/docs/arender/overview/architecture)
- [Rendition pipeline](/docs/arender/concepts/rendition-pipeline)
- [Broker REST API](/docs/arender/reference/rest-api/broker-api)
