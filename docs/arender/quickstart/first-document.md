---
viewer: classic
title: Open your first document
last_update:
  date: '2026-03-23T10:20:59.293Z'
  author: CI/CD Bot
slug: /quickstart/first-document
sidebar_position: 2
content_hash: 1bf370e7d79c6fc46fe4924aa018b4ddca22570b9144d1e928a398a124067aed
---

# Open your first document

This guide assumes you have ARender running via [Docker Compose quickstart](./docker-compose.md).

## Open the default document

Open your browser at [http://localhost:8080](http://localhost:8080). ARender loads with a default sample document. You can navigate pages, zoom, annotate, and search text immediately.

## Open a document by URL

To open a document from an external URL, that URL must be authorized in the broker configuration. By default, only relative sample and tmp paths are authorized:

```
authorized.paths=../../samples/,../samples/,../../tmp/,../tmp
authorized.urls=
```

To allow an external URL, set the `authorized.urls` property on the service broker. As an environment variable:

```yaml
  service-broker:
    environment:
      - "DSB_AUTHORIZED_URLS=https://example.com/"
```

Restart the services, then open:

```
http://localhost:8080/?url=https://example.com/my-document.pdf
```

## Open a local file

Files under the default authorized paths (`../../samples/`, `../samples/`, etc.) are accessible without additional configuration:

```
http://localhost:8080/?url=../../samples/my-document.pdf
```

## Use the REST API

You can load documents programmatically through the broker REST API (exposed via nginx on port 8761).

Upload a document (the broker accepts raw binary content):

```bash
curl -X POST http://localhost:8761/documents \
  -H "Content-Type: application/octet-stream" \
  --data-binary @my-document.pdf
```

The response is a JSON object containing the document ID:

```json
{"id": "b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"}
```

Get the document layout (page count, dimensions):

```bash
curl http://localhost:8761/documents/{documentId}/layout
```

Get a page image (page 0, 800px wide, no rotation):

```bash
curl "http://localhost:8761/documents/{documentId}/pages/0/image?pageImageDescription=IM_800_0" \
  --output page0.png
```

Get text positions for a page:

```bash
curl http://localhost:8761/documents/{documentId}/pages/0/text/position
```

See the [REST API reference](../reference/rest-api/broker-api.md) for the complete endpoint list with response examples.

## Viewer features

Once a document is open, you can:

- **Navigate**: use the page thumbnails on the left, or Page Up/Down keys
- **Zoom**: use the zoom controls or Ctrl+scroll
- **Search**: press Ctrl+F for full-text search with highlighting
- **Annotate**: use the annotation toolbar to add highlights, stamps, notes, shapes
- **Compare**: open two documents side by side for text or image comparison
- **Export**: download the document with or without annotations

## Next steps

- [Opening documents](../guides/features/opening-documents.md): all URL parameters and multi-document opening
- [Connectors concept](../concepts/connectors.md): connect to a document repository
- [Annotations concept](../concepts/annotations.md): understand the annotation model
- [Document builder](../guides/features/document-builder.md): assemble pages from multiple documents
- [Embed the viewer](../guides/integration/embed-viewer.md) in your application
