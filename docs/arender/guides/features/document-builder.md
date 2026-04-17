---
viewer: classic
title: Document builder
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /guides/features/document-builder
sidebar_position: 8
content_hash: ef7dadf98186aaf0c4797a1c4b838af5b5e0ccb00f0773561d577fdefbdf4f7d
---

# Document builder

The document builder lets users assemble pages from one or more open documents into new output documents. Pages can be reordered, removed, or combined across documents using drag-and-drop in a dedicated panel.

## How it works

The document builder panel shows thumbnails of all pages from currently open documents. Users drag pages into one or more output document slots, reorder them, and save the result. The assembled document is sent to the broker, which produces a new PDF from the selected pages.

## Data model

An assembly is described by an `AlterContentDescriptionMultiSplit`, which contains a list of output documents. Each output document is an ordered list of `SourcePageDescription` entries, where each entry references a source document ID and a page index (0-based). Optional `DocumentMetadata` can be attached to each output document.

## Content update behavior

When saving, the builder uses one of these behaviors:

| Behavior | Description |
|----------|-------------|
| `UPDATE_NO_DOCUMENT` | Produce the result without replacing any existing document |
| `UPDATE_FIRST_DOCUMENT` | Replace the first source document with the result |
| `CREATE_NEW_FIRST_DOCUMENT` | Create a new document from the first output slot |
| `UPDATE_ALL_DOCUMENT` | Replace all source documents |
| `UPDATE_FIRST_DOCUMENT_PDFA` | Same as `UPDATE_FIRST_DOCUMENT`, output as PDF/A |
| `CREATE_NEW_FIRST_DOCUMENT_PDFA` | Same as `CREATE_NEW_FIRST_DOCUMENT`, output as PDF/A |

## JavaScript API

The document builder is controllable through the ARender JavaScript API:

```javascript
// Open, toggle, or close the panel
getARenderJS().getDocumentBuilder().open();
getARenderJS().getDocumentBuilder().toggle();
getARenderJS().getDocumentBuilder().close();

// Reset the current assembly
getARenderJS().getDocumentBuilder().reset();

// Save the first output document
getARenderJS().getDocumentBuilder().saveFirstDocument(download, delete, freeze, behavior);

// Save all output documents
getARenderJS().getDocumentBuilder().saveAllDocuments(handler, download, delete, freeze, behavior);

// Create an empty document in the builder
getARenderJS().getDocumentBuilder().createEmptyDocument();

// Create a document from JSON content
getARenderJS().getDocumentBuilder().createCustomDocument(jsonContent, options);
```

Parameters for `saveFirstDocument` and `saveAllDocuments`:

| Parameter | Type | Description |
|-----------|------|-------------|
| `download` | boolean | Download the result after saving |
| `delete` | boolean | Delete source documents after saving |
| `freeze` | boolean | Lock the source documents after saving |
| `behavior` | string | One of the content update behaviors listed above |

## Callbacks

Register callbacks to react to builder events:

```javascript
// Fires after save completes, receives the result document ID
getARenderJS().getDocumentBuilder().registerNotifyAlterDocumentContentEvent(callback);

// Fires before submission to the server (intercept/modify)
getARenderJS().getDocumentBuilder().registerSubmitAlterDocumentContentEvent(callback);

// Fires when the builder panel opens
getARenderJS().getDocumentBuilder().registerDocumentBuilderOpeningEvent(callback);

// Fires on custom document save
getARenderJS().getDocumentBuilder().registerDocumentBuilderSaveCustomEvent(callback);
```

## Configuration

For the full list of document builder properties, see [Viewer configuration — Document builder](../../reference/viewer-configuration.md#document-builder).

## Related pages

- [Annotations](../../concepts/annotations.md)
- [Documents and IDs](../../concepts/documents-and-ids.md)
- [JavaScript API reference](../../reference/javascript-api.md)
- [Broker API](../../reference/rest-api/broker-api.md)
