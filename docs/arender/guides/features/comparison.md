---
viewer: classic
title: Document comparison
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /guides/features/comparison
sidebar_position: 7
content_hash: 8fc7e708148b49293b8ad545aa2b95e1c611cd31586665120d3d31776222e9e4
---

# Document comparison

ARender can compare two documents and produce a visual diff that highlights what changed between them. Two comparison modes are available: text comparison for textual documents and image comparison for non-textual content.

## Prerequisites

- Multi-view mode must be enabled (`visualization.multiView.enabled=true`, which is the default).
- Two documents must be open in ARender simultaneously.
- For image comparison, the feature must be enabled (`visualization.image.comparison.enabled=true`, which is the default).

## Text comparison

### Step 1: Open two documents

Load the two documents you want to compare. ARender displays them in split-view mode with one document on each side.

Multi-view opens automatically when two documents are loaded, or you can open it manually via the layout controls. The direction of the split is configured by:

```properties
visualization.multiView.direction=vertical
```

Set to `horizontal` for a side-by-side horizontal layout.

### Step 2: Trigger the comparison

Click the comparison button in the top panel. ARender sends both document IDs to the Document Service Broker, which performs a text diff and returns a `DocumentCompareResult` containing a list of `TextChange` objects. Each `TextChange` has a position on the left document, a position on the right document, and a change type: `ADD`, `DELETE`, or `EQUAL`.

### Step 3: Review results

After the comparison completes, ARender draws colored highlight rectangles over the changed regions on both documents:

- Deleted text (present in the left document, absent in the right) is highlighted on the left.
- Added text (present in the right document, absent in the left) is highlighted on the right.

Thumbnails in the page navigator show a badge with a count of changes per page.

### Step 4: Navigate between differences

Use the previous and next difference buttons in the top panel to jump through changes in sequence. ARender scrolls both views to the corresponding location. Scrolling is synchronized by default.

Clicking a highlighted region scrolls the opposite document to the matching location and disables synchronized scroll temporarily.

### Step 5: Download the comparison result

To export the comparison as a PDF with the highlights preserved, use the download button for comparison export:

```properties
topPanel.documentMenu.download.with.compare=true
```

ARender calls the document builder service to produce a PDF with the highlight rectangles burned in on both documents, combined into a single output.

## Image comparison

Image comparison works on a page-by-page basis. Instead of a text diff, it produces a single image that overlays the two pages and highlights pixel differences.

### Step 1: Open two documents

Same as for text comparison: load both documents in multi-view mode.

### Step 2: Open the image comparison panel

Select the image comparison option from the comparison controls. A parameter panel appears with the following controls:

- **Fuzz value**: tolerance for pixel comparison, expressed as a percentage (0 to 100). A value of 3 means pixels within 3% of each other are considered identical. Default: `3`.
- **Highlight color**: color applied to pixels that differ between the two documents. Default: `#FF0000` (red).
- **Lowlight color**: color applied to pixels that are identical. Leave as `none` to keep common pixels transparent.

### Step 3: Submit the comparison

Click the submit button. ARender calls the `compareImages` service on the broker. The broker generates a single composite image where different pixels are painted with the highlight color and common pixels are painted with the lowlight color (or left transparent if `none`).

### Step 4: Review the result

The composite image is displayed in the panel. You can adjust the fuzz value or colors and re-submit to fine-tune the comparison.

## REST API

Comparison is an asynchronous operation exposed via the broker REST API.

### Async order pattern

1. Submit a comparison request: `POST /comparisons`
2. Receive an order ID immediately
3. Poll for completion: `GET /comparisons/{orderId}`
4. The response includes a state: `QUEUED`, `PROCESSING`, `PROCESSED`, or `FAILED`

An optional `timeoutMs` query parameter enables long-polling: the server holds the connection until the comparison finishes or the timeout expires.

Once the state is `PROCESSED`, the response contains the document ID of the result document. This document is a regular ARender document that you can view, download, or process further.

### Request parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `leftDocumentId` | string | ID of the first document |
| `rightDocumentId` | string | ID of the second document |
| `highlightColor` | string | Hex color for additions/changes (without `#`). Default: `FF0000` |
| `lowlightColor` | string | Hex color for context regions. Default: empty (transparent) |
| `fuzz` | int | Pixel comparison tolerance, 0 to 100. Default: `3` |

## Configuration reference

For the full list of multi-view and comparison properties, see [Viewer configuration — Multi-view and comparison](../../reference/viewer-configuration.md#multi-view-and-comparison).

## Automatic comparison on load

To start text comparison automatically when two documents are opened:

```properties
visualization.multiView.doComparison=true
visualization.multiView.showOnStart=true
```

This is useful when ARender is embedded in a workflow where the integration layer always opens two related documents together.

## Troubleshooting

**No differences are highlighted after comparison**: confirm both documents contain extractable text. Scanned documents without OCR will not produce text comparison results. Use image comparison instead.

**Comparison takes a long time**: text comparison performance depends on document length and text volume. Very long documents with many pages may take several seconds. There is no configurable timeout for the comparison call.

**Image comparison panel is not visible**: confirm `visualization.image.comparison.enabled=true`. The panel only appears when multi-view mode is active and the image comparison button is accessible.

**Fuzz value of 0 shows too many differences**: minor rendering variations between pages can produce false positives at fuzz=0. Increase the fuzz value slightly (3 to 5) to filter out rendering noise.

**Synchronized scroll causes incorrect alignment**: if document page heights differ significantly, synchronized scroll may not align changes correctly. Disable it via `visualization.multiView.synchronized=false` or the toggle in the UI.

### Broker-side defaults

These properties configure comparison defaults on the broker:

```properties
comparison.default.value.highlight.color=FF0000
comparison.default.value.lowlight.color=
comparison.default.value.fuzz=3
```

See also [Rendition properties](../../reference/rendition-properties.md) for broker-side comparison configuration.

## Related pages

- [Annotations concept](../../concepts/annotations.md)
- [Rendition pipeline](../../concepts/rendition-pipeline.md)
- [Broker API](../../reference/rest-api/broker-api.md)
- [Redaction guide](./redaction.md)
