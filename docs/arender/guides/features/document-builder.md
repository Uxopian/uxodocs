---
title: Document builder
last_update:
  date: '2026-03-18T00:00:00.000Z'
  author: CI/CD Bot
slug: /guides/features/document-builder
sidebar_position: 5
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
arender.documentBuilder.open();
arender.documentBuilder.toggle();
arender.documentBuilder.close();

// Reset the current assembly
arender.documentBuilder.reset();

// Save the first output document
arender.documentBuilder.saveFirstDocument(download, delete, freeze, behavior);

// Save all output documents
arender.documentBuilder.saveAllDocuments(handler, download, delete, freeze, behavior);

// Create an empty document in the builder
arender.documentBuilder.createEmptyDocument();

// Create a document from JSON content
arender.documentBuilder.createCustomDocument(jsonContent, options);
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
arender.documentBuilder.registerNotifyAlterDocumentContentEvent(callback);

// Fires before submission to the server (intercept/modify)
arender.documentBuilder.registerSubmitAlterDocumentContentEvent(callback);

// Fires when the builder panel opens
arender.documentBuilder.registerDocumentBuilderOpeningEvent(callback);

// Fires on custom document save
arender.documentBuilder.registerDocumentBuilderSaveCustomEvent(callback);
```

## Configuration

Default builder behavior is configured through `DocumentBuilderJSAPIConfiguration`:

```properties
arender.documentbuilder.content.update.behavior=UPDATE_FIRST_DOCUMENT
arender.documentbuilder.delete.document=false
arender.documentbuilder.freeze.document=false
arender.documentbuilder.download.document=false
```

## Related pages

- [Annotations](../../concepts/annotations.md)
- [Documents and IDs](../../concepts/documents-and-ids.md)
- [JavaScript API reference](../../reference/javascript-api.md)
- [Broker REST API](../../reference/rest-api/broker-api.md)
