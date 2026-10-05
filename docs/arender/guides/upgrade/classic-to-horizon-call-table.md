---
viewer: horizon
title: Classic to Horizon call table
last_update:
  date: '2026-09-30T11:56:51.452Z'
  author: CI/CD Bot
slug: /guides/upgrade/classic-to-horizon-call-table
sidebar_position: 8
content_hash: 002861292840e4657c18b1bdda9fc677dcbb47f340d08da69a95fb3bc0908d49
---

# Classic to Horizon call table

What to call on `window.ARender` instead of each `arender.jsapi` call from the Classic viewer, for the entry points available in Horizon today.

For concepts rather than entry points — delivery model, embedding, configuration — see [Migration from GWT](./migration-from-gwt.md). For the full Horizon command list, see the [JavaScript API reference](../../reference/javascript-api.md).

:::note Page numbers are zero-based on both sides
The Horizon API counts pages from zero, same as the backend itself — only the viewer's own page indicator in the UI displays one more. Rows carrying a page number are marked **(0-based)** below.
:::

## Document reading and navigation

| Classic call | Horizon |
|---|---|
| `getCurrentDocumentId()` | `getCurrentDocumentId()` |
| `getMasterDocumentId()` | `getRootDocumentId()` |
| `askChangeDocument("Next")` | `nextDocument()` |
| `askChangeDocument("Previous")` | `previousDocument()` |
| `askChangeDocument("ByDocumentId", documentId)` | `goToDocument(documentId)` |
| `askChangePage("Index", page)` (0-based) | `goToPage(page)` |
| `getDocumentLayout().getDocumentLayout(documentId, onLayout, onError)` | `getDocumentLayout(documentId?)` — synchronous, no callbacks |
| `getDocumentMetadata().getDocumentMetadata(documentId, handler)` | `getDocumentMetadata(documentId?)` |

## Search commands

| Classic call | Horizon |
|---|---|
| `getSearchJSAPI().askSearchTextNext(text)` | `await search(text)`, then `handle.next()` |
| `getSearchJSAPI().askSearchTextPrevious(text)` | `await search(text)`, then `handle.previous()` |
| `getSearchJSAPI().clearSearchResults()` | `handle.dispose()` |

## Download

| Classic call | Horizon |
|---|---|
| `getDownloadDocumentJSAPI().askDownloadDocumentPDF()` | `download({format: 'pdf'})` |
| `getDownloadDocumentJSAPI().askDownloadDocumentSource()` | `download({format: 'original'})` |
| `getDownloadDocumentJSAPI().askDownloadAllDocuments()` | `download({format: 'pdf', documents: 'all'})` |
| `getDownloadDocumentJSAPI().askDownloadWithAnnotations()` | `download({annotations: 'editable'})` |
| `getDownloadDocumentJSAPI().askDownloadWithRedact()` | `download({annotations: 'flatten'})` |
| `askDownloadDocument(documentId, title, suffix)` | `download()` — always targets the document on screen, no by-id variant |

## Annotations

| Classic call | Horizon |
|---|---|
| `annotjs.addAnnotation(documentId, type, x, y, w, h, page, color, opacity)` (0-based) | `annotations.create({page, type, x, y, width, height, color, opacity})` |
| `annotjs.refresh()` | `annotations.refresh(documentId?)` |
| `annotjs.registerNotifyAnnotationAddedEvent(cb)` | `on('annotations.created', cb)` |
| `annotjs.registerNotifyAnnotationUpdatedEvent(cb)` | `on('annotations.updated', cb)` |
| `annotjs.registerNotifyAnnotationDeletedEvent(cb)` | `on('annotations.deleted', cb)` |

## Events

| Classic call | Horizon |
|---|---|
| `registerNotifyPageChangeEvent(cb)` | `on('page.changed', cb)` |
| `registerCurrentDocumentChangeEvent(cb)` | `on('document.changed', cb)` |
| `registerNotifyLoadingErrorEvent(cb)` | `on('document.loadFailed', cb)` |
| `registerAnnotationsSavedEvent(cb)` | `on('annotations.created' \| 'annotations.updated' \| 'annotations.deleted', cb)` — Horizon writes each annotation as it is made, so there is no batched "saved" event |

## Related pages

- [JavaScript API reference](../../reference/javascript-api.md): the full Horizon command list
- [Migration from GWT](./migration-from-gwt.md): concepts rather than entry points
