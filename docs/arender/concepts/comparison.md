---
title: Document comparison
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /concepts/comparison
sidebar_position: 6
content_hash: ab48e84aa1d9994e44c0b3f712c1b51ef90d7811f672da80d26a129c2a6f10fb
---

ARender can compare two documents and produce a visual diff that highlights what changed between them. Two comparison modes are available: text comparison for textual documents and image comparison for non-textual content.

## Text comparison

Text comparison works on documents that can be converted to PDF (Office files, PDFs, text files). The broker extracts text from both documents, computes a diff, and generates a result PDF where changed regions are highlighted with colored rectangles.

The result also includes structured diff data: a list of `TextChange` entries per page, each describing the type of change (addition, deletion, modification) and its position on the page.

## Image comparison

Image comparison works when both documents are non-textual: images (PNG, JPEG, TIFF, GIF, …), video, audio, or XPS files. The broker renders both documents as images and uses ImageMagick to compute a pixel-level diff. The result is a set of PNG images highlighting differences.

If one document is non-textual and the other is textual (e.g. an image vs a PDF), the comparison returns an empty result because the two modes are incompatible.

The `fuzz` parameter controls comparison sensitivity: 0 means exact pixel match, higher values (up to 100) tolerate minor color differences.

## Async order pattern

Comparison is an asynchronous operation. The workflow is:

1. Submit a comparison request: `POST /comparisons`
2. Receive an order ID immediately
3. Poll for completion: `GET /comparisons/{orderId}`
4. The response includes a state: `QUEUED`, `PROCESSING`, `PROCESSED`, or `FAILED`

An optional `timeoutMs` query parameter enables long-polling: the server holds the connection until the comparison finishes or the timeout expires.

Once the state is `PROCESSED`, the response contains the document ID of the result document. This document is a regular ARender document that you can view, download, or process further.

## Request parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `leftDocumentId` | string | ID of the first document |
| `rightDocumentId` | string | ID of the second document |
| `highlightColor` | string | Hex color for additions/changes (without `#`). Default: `FF0000` |
| `lowlightColor` | string | Hex color for context regions. Default: empty (transparent) |
| `fuzz` | int | Pixel comparison tolerance, 0 to 100. Default: `3` |

## Viewer behavior

In the viewer UI, comparison opens a side-by-side view of the two documents. Diff regions appear as colored rectangles. Clicking a highlighted region in one panel scrolls the other panel to the matching position.

## Default configuration

These properties configure comparison defaults on the broker. See also the [Rendition properties — Comparison defaults](../reference/rendition-properties.md#comparison-defaults) for the full property table.

```properties
comparison.default.value.highlight.color=FF0000
comparison.default.value.lowlight.color=
comparison.default.value.fuzz=3
```

## Related pages

- [Comparison guide](../guides/features/comparison.md)
- [Rendition pipeline](./rendition-pipeline.md)
- [Broker REST API](../reference/rest-api/broker-api.md)
