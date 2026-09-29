---
viewer: horizon
title: Classic to Horizon call table
last_update:
  date: '2026-09-29T08:59:40.609Z'
  author: CI/CD Bot
slug: /guides/upgrade/classic-to-horizon-call-table
sidebar_position: 8
content_hash: 5b616fa88d3d8ca7c2c97f268c605c4ca76ef07a54d56cd6d85ce31f1171f3e4
---

# Classic to Horizon call table

Every entry point of the Classic (`arender.jsapi`) JavaScript API, and what to call instead on `window.ARender` in Horizon.

Two sources feed this table: the [Classic JavaScript API reference](/docs/arender/reference/javascript-api), and the entry points the Classic viewer actually exports but that page does not document — listed in [Not documented on the Classic reference page](#not-documented-on-the-classic-reference-page).

For concepts rather than entry points — delivery model, embedding, configuration — see [Migration from GWT](./migration-from-gwt.md).

## How to read this table

Every Classic call has a row. Where there is no Horizon equivalent, the row carries one of three reasons instead of a Horizon call:

- **Dropped** — no Horizon equivalent, and why
- **Replaced** — the same intent is reached a different way
- **Planned (AR-18627)** — carried by a separate ticket, not shipped yet

Horizon's own naming follows two rules: a collection takes a namespace (`annotations.*`, and later `bookmarks.*` and `hyperlinks.*`); everything else is flat, with the verb carrying its noun (`getDocumentLayout`, `goToPage`). Events are named `noun.pastVerb` and never share a string with a command. Every handle a command returns exits through `dispose()`.

:::note Page numbers are zero-based on both sides
The Horizon API counts pages from zero, same as the Classic `"Index"` type and the backend itself — only the viewer's own page indicator in the UI displays one more. Rows carrying a page number are marked **(0-based)** below as a reminder.
:::

## Document loading and navigation

| Classic call | Horizon |
|---|---|
| `loadDocument(url, onLoad, onError)` | **Replaced** — `openDocument(params)` with a `url=` parameter; the returned `Promise` reports success or failure, there is no separate load step before display |
| `loadDocuments(gsonDocument, onError, onLoad)` | **Dropped** — no JSON document-list loader; open a multi-document set through repeated parameters or a pre-built `DocumentContainer` instead, see [Opening documents → Multi-document opening](../features/opening-documents.md#multi-document-opening) |
| `openDocument(documentId)` | `openDocument(params)` — same name, different contract: Classic opens a document already loaded by ID, Horizon takes the identifying query string directly, there is no separate load step |
| `openDocument(documentId, resetUI)` | **Dropped** — `resetUI` has no Horizon equivalent; every call already replaces the whole viewer state |
| `openDocument(documentId, page)` (0-based) | **Replaced** — `openDocument(params)`, then `goToPage(page)` once the document is displayed; a page number passed at opening time is forwarded to the document repository, not to the viewer |
| `cancellableLoadDocument(url, onLoad, onError)` | **Dropped** — Horizon writes each annotation as it is made, so there are no unsaved annotations to prompt about before navigating away |
| `closeDocument()` | **Dropped** — no equivalent; the viewer always displays a document, there is no empty/closed state to return to |
| `closeErrorPopup()` | **Dropped** — no error popup to dismiss; a load failure is reported through the `document.loadFailed` event, not a modal |
| `getCurrentDocumentId()` | `getCurrentDocumentId()` — same name, same meaning |
| `getMasterDocumentId()` | `getRootDocumentId()` — renamed |
| `askChangeDocument("Previous")` | `previousDocument()` — this Classic type is declared but has no working implementation; Horizon adds real "previous document" navigation |
| `askChangeDocument("Next")` | `nextDocument()` |
| `askChangeDocument("First")` | **Dropped** — no direct call; read the first id from `getDocumentLayout()`'s children and pass it to `goToDocument(id)` |
| `askChangeDocument("Last")` | **Dropped** — no direct call; read the last id from `getDocumentLayout()`'s children and pass it to `goToDocument(id)` |
| `askChangeDocument("ByDocumentId", documentId)` | `goToDocument(documentId)` |
| `askChangePage("Relative", offset)` (0-based) | **Dropped** — no relative-offset stepping call; read the current page from the `page.changed` event and call `goToPage(currentPage + offset)` |
| `askChangePage("Index", offset)` (0-based) | `goToPage(page)` — this Classic type already had no caller, so the migration costs nothing |
| `askChangePage("Absolute", offset, position)` (0-based) | **Dropped** — the position rectangle within the page has no equivalent; `goToPage` moves to a page, not a rectangle inside it |
| `askChangePage("NoChange", ..., position)` | **Dropped** — re-targets a position rectangle without changing page; has no meaning without the rectangle above |
| `newPageRelativePosition(x, y, w, h)` | **Dropped** — builds the position rectangle for `askChangePage("Absolute", …)` above, which has no equivalent |
| `getPageForNamedDestination(documentId, destination, handler)` | **Dropped** — named-destination resolution isn't exposed; a future `bookmarks.*` namespace is the planned home for this, not yet shipped |

## Hyperlinks

| Classic call | Horizon |
|---|---|
| `enablePDFDocumentHyperlinks(enable)` | **Dropped** — hyperlink visibility isn't exposed from the API yet; planned under a future `hyperlinks.*` namespace |
| `disallowClickOnHyperlinks(disallow)` | **Dropped** — same, `hyperlinks.*` not yet shipped |
| `enableInternalPDFDocumentHyperlinks(documentId)` | **Dropped** — same |
| `disableInternalPDFDocumentHyperlinks(documentId)` | **Dropped** — same |
| `enableExternalPDFDocumentHyperlinks(documentId)` | **Dropped** — same |
| `disableExternalPDFDocumentHyperlinks(documentId)` | **Dropped** — same |
| `notifyHyperlinkTarget(target)` | **Dropped** — hyperlink-target-selection workflow isn't exposed from the API yet |

## Text selection (lasso mode)

| Classic call | Horizon |
|---|---|
| `askActivateLassoMode(lassoId)` | **Dropped** — lasso text selection isn't exposed from the API |
| `askDeactivateLassoMode()` | **Dropped** — same |

## Annotations (save / display) and other top-level calls

| Classic call | Horizon |
|---|---|
| `displayComment(documentId, display)` | **Dropped** — the comment-explorer display filter isn't exposed from the API |
| `askDownloadDocument(documentId, title, suffix)` | **Replaced** — see [Download commands](#download-commands); downloads always target the open document or set, there is no by-id variant |
| `changeConfigurableElement(name, enabled)` | **Dropped** — runtime UI-element toggling isn't exposed from the API; configure the viewer through its own configuration instead |

## Plugins

| Classic call | Horizon |
|---|---|
| `preparePluginEvent(key, value, pluginName)` | **Dropped** — the plugin system does not exist in Horizon |
| `clearPluginEvent(pluginName)` | **Dropped** — same |
| `openPlugin(pluginName, openInMultiView)` | **Dropped** — same |
| `getHtmlPluginName()` | **Dropped** — same |

## Sub-API accessors

Classic groups its API behind per-feature accessor objects. Horizon has no accessor layer — a command is either a flat call on `window.ARender`, or dropped along with the feature it belonged to.

| Classic call | Horizon |
|---|---|
| `getDocumentBuilder()` | **Dropped** — document builder isn't exposed from the API |
| `getDocumentLayout()` | **Replaced** — flat `getDocumentLayout(documentId?)` call, no accessor needed |
| `getDocumentMetadata()` | **Replaced** — flat `getDocumentMetadata(documentId?)` call, no accessor needed |
| `getZoomJSAPI()` | **Dropped** — zoom isn't exposed from the API |
| `getRotateJSAPI()` | **Dropped** — rotation isn't exposed from the API |
| `getPrintJSAPI()` | **Dropped** — printing isn't exposed from the API |
| `getFullScreenJSAPI()` | **Dropped** — full screen isn't exposed from the API |
| `getSearchJSAPI()` | **Replaced** — flat `search(text)` call returning a handle, no accessor needed |
| `getGenericNotificationJSAPI()` | **Dropped** — the toaster isn't exposed from the API |
| `getDownloadDocumentJSAPI()` | **Replaced** — flat `download(options)` call, no accessor needed |
| `getZoomGlassJSAPI()` | **Dropped** — the magnifying-glass overlay isn't exposed from the API |
| `getThumbnailsJSAPI()` | **Dropped** — the thumbnail sidebar isn't exposed from the API |
| `getDocumentCompareJSAPI()` | **Dropped** — document comparison isn't exposed from the API |
| `getScreenSplitJSAPI()` | **Dropped** — split screen isn't exposed from the API |
| `getAnnotationJSAPI()` | **Replaced** — flat `annotations.*` namespace, no accessor or async-ready wait needed |
| `onAnnotationModuleReady(callback)` | **Dropped** — annotations are available immediately, there is no async module to wait for |

## Reading the open document, and going to a page or a document {#reading-the-open-document-and-going-to-a-page-or-a-document}

Covered above under [Document loading and navigation](#document-loading-and-navigation): `getCurrentDocumentId`, `getMasterDocumentId` → `getRootDocumentId`, and the `askChangeDocument` / `askChangePage` family. The read commands for layout and metadata are below, under [`documentLayout`](#namespace-documentlayout).

## Event callbacks

| Classic call | Horizon |
|---|---|
| `registerNotifyPageChangeEvent(cb)` | `on('page.changed', cb)` |
| `registerCurrentDocumentChangeEvent(cb)` | `on('document.changed', cb)` |
| `registerNotifyLoadingErrorEvent(cb)` | `on('document.loadFailed', cb)` |
| `registerNotifyLogEvent(cb)` | **Dropped** — no log-event bus is exposed from the API |
| `registerGenericEventListener(cb)` | **Dropped** — no catch-all event; subscribe to each named event instead |
| `registerAllAsyncModulesStartedEvent(cb)` | **Dropped** — no equivalent readiness event; `document.firstPageDisplayed` covers the first-render readiness case |
| `registerPanelLoadedConfigurationEvent(cb)` | **Dropped** — no top-panel configuration concept in Horizon |
| `registerTopPanelRefreshedEvent(cb)` | **Dropped** — same |
| `registerHyperlinkDisplayHookEvent(docId, cb)` | **Dropped** — hyperlink display isn't exposed from the API yet, see `hyperlinks.*` above |
| `registerCommentDisplayHookEvent(docId, cb)` | **Dropped** — no comment-display concept is exposed |
| `registerAnnotationsSavedEvent(cb)` | **Replaced** — `on('annotations.created' \| 'annotations.updated' \| 'annotations.deleted', cb)`; Horizon writes each annotation as it is made, so there is no batched "saved" event |
| `registerNotifyLassoSelectedTextEvent(cb)` | **Dropped** — lasso text selection isn't exposed from the API |
| `registerNotifyHyperlinkToggleTargetModeEvent(cb)` | **Dropped** — same hyperlink area, not yet shipped |
| `registerDisplayLinkHandler(cb)` | **Dropped** — per-link style overrides aren't exposed from the API |
| `registerExternalBookmarkHandler(cb)` | **Dropped** — bookmark clicks aren't exposed yet, see `bookmarks.*` above |

## Namespace: `documentBuilder`

| Classic call | Horizon |
|---|---|
| `open()` | **Dropped** — document builder isn't exposed from the API |
| `close()` | **Dropped** — same |
| `toggle()` | **Dropped** — same |
| `reset()` | **Dropped** — same |
| `saveFirstDocument(download, delete, freeze, behavior)` | **Dropped** — same |
| `saveAllDocuments(handler, download, delete, freeze, behavior)` | **Dropped** — same |
| `createEmptyDocument()` | **Dropped** — same |
| `createCustomDocument(jsonContent, options)` | **Dropped** — same |
| `registerNotifyAlterDocumentContentEvent(cb)` | **Dropped** — same |
| `registerSubmitAlterDocumentContentEvent(cb)` | **Dropped** — same |
| `registerDocumentBuilderOpeningEvent(cb)` | **Dropped** — same |
| `registerDocumentBuilderSaveCustomEvent(cb)` | **Dropped** — same |

## Namespace: `zoomJSAPI`

| Classic call | Horizon |
|---|---|
| `askZoomIn()` | **Dropped** — zoom isn't exposed from the API |
| `askZoomOut()` | **Dropped** — same |
| `askZoomFullWidth()` | **Dropped** — same |
| `askZoomFullHeight()` | **Dropped** — same |
| `askZoomFullPage()` | **Dropped** — same |
| `askZoomInZone(x, y, w, h)` | **Dropped** — same |

## Namespace: `zoomGlassJSAPI`

| Classic call | Horizon |
|---|---|
| `toggle()` | **Dropped** — the magnifying-glass overlay isn't exposed from the API |
| `updateZoom(zoom)` | **Dropped** — same |
| `updatePosition(x, y, w, h)` | **Dropped** — same |

## Namespace: `rotateJSAPI`

| Classic call | Horizon |
|---|---|
| `askRotateCurrentPageLeft()` | **Dropped** — rotation isn't exposed from the API |
| `askRotateCurrentPageRight()` | **Dropped** — same |
| `askRotateAllPageLeft()` | **Dropped** — same |
| `askRotateAllPageRight()` | **Dropped** — same |
| `askRotatePage(pageNumber, documentId, rotation, clockwise)` | **Dropped** — same |
| `registerNotifyPageRotatedEvent(cb)` | **Dropped** — same |

## Namespace: `fullScreenJSAPI`

| Classic call | Horizon |
|---|---|
| `askOpenFullScreen()` | **Dropped** — full screen isn't exposed from the API |
| `askCloseFullScreen()` | **Dropped** — same |

## Search commands

| Classic call | Horizon |
|---|---|
| `askSearchTextNext(text)` | `search(text)`, then `handle.next()` |
| `askSearchTextPrevious(text)` | `search(text)`, then `handle.previous()` |
| `askAdvancedSearchText(text, caseSensitive, accentSensitive, regex, scope, annotations, postAction)` | **Dropped** — the advanced options aren't available; `search(text)` always searches the whole open set, case-insensitive. The one production caller of the advanced form used none of its options |
| `clearSearchResults()` | `handle.dispose()` |

## Namespace: `showPrintDialogJSAPI`

| Classic call | Horizon |
|---|---|
| `askShowPrintDialog()` | **Dropped** — printing isn't exposed from the API |
| `askPrintAllDocumentPages()` | **Dropped** — same |

## Download commands

| Classic call | Horizon |
|---|---|
| `askDownloadDocumentPDF()` | `download({format: 'pdf'})` |
| `askDownloadDocumentNonPDF()` | **Dropped** — the "non-PDF form" concept doesn't apply; a download always produces either the original file or a PDF |
| `askDownloadDocumentSource()` | `download({format: 'original'})` |
| `askDownloadAllDocuments()` | `download({format: 'pdf', documents: 'all'})` |
| `askDownloadAllSourcesDocuments()` | **Planned (AR-18627)** — an archive of the source files of a set has no backend route today |
| `askDownloadAnnotations()` | **Dropped** — exporting annotations to CSV is no longer a product feature |
| `askDownloadWithFDFAnnotations()` | **Dropped** — FDF-embedded downloads aren't exposed; `download({format: 'pdf', annotations: 'flatten'})` covers the burned-in case |
| `askDownloadFDFAnnotations()` | **Dropped** — the FDF-annotations-only file isn't exposed from the API |
| `askDownloadWithAnnotations()` | `download({format: 'pdf', annotations: 'editable'})` |
| `askDownloadWithRedact()` | `download({format: 'pdf', annotations: 'flatten'})` — redactions are always burned in, never optional |
| `askDownloadCompareResultDocument()` | **Dropped** — document comparison isn't exposed from the API |
| *(missing-download-right refusal)* | **Planned (AR-18627)** — Horizon has no rights model for downloads today; a refusal for a missing download right isn't implemented yet |

## Namespace: `genericNotificationJSAPI`

| Classic call | Horizon |
|---|---|
| `askNotification(message, type)` | **Dropped** — the viewer's toaster isn't exposed from the API; show the notification in the host's own UI instead |

## Namespace: `thumbnailsJSAPI`

| Classic call | Horizon |
|---|---|
| `showNavigator()` | **Dropped** — the thumbnail sidebar isn't exposed from the API |
| `hideNavigator()` | **Dropped** — same |
| `resetNavigator()` | **Dropped** — same |
| `expandNavigator(width)` | **Dropped** — same |
| `reduceNavigator(width)` | **Dropped** — same |

## Namespace: `documentLayout`

| Classic call | Horizon |
|---|---|
| `getDocumentLayout(documentId, onLayout, onError)` | `getDocumentLayout(documentId?)` — a synchronous read, no callbacks |
| `getShallowDocumentLayout(documentId, onLayout, onError)` | **Dropped** — the shallow/stub-children variant has no equivalent; `getDocumentLayout` always returns children already resolved |
| `layout.documentTitle` (field, not a call) | **Replaced** — read the title from `getDocumentMetadata()`, or from the `document.changed` event payload |

## Namespace: `documentCompare`

| Classic call | Horizon |
|---|---|
| `doComparisonFromStringUUID(leftId, rightId)` | **Dropped** — document comparison isn't exposed from the API |
| `closeAllMultiView()` | **Dropped** — split/multi-view isn't exposed from the API |

## Annotation commands and events

| Classic call | Horizon |
|---|---|
| `addAnnotation(documentId, type, x, y, w, h, page, color, opacity)` (0-based) | `annotations.create({page, type, x, y, width, height, color, opacity})` — one flat object replaces the nine positional arguments |
| `save()` | **Dropped** — Horizon writes each annotation as it is made, there is nothing to flush |
| `refresh()` | `annotations.refresh(documentId?)` |
| `hasDirtyAnnotations()` | **Dropped** — nothing is batched, so nothing to report. Do not reuse this to gate a "save" action: it would read false almost always |
| `getDestinationTypes()` | **Dropped** — hyperlink destination types aren't exposed from the API yet, see `hyperlinks.*` above |
| `getActionTypes()` | **Dropped** — same |
| `getPropertyFromDestination(dest, prop)` | **Dropped** — same |
| `getPropertyFromAction(action, prop)` | **Dropped** — same |
| `createDocLink(pageNumber)` (0-based) | **Dropped** — doc-link creation isn't exposed from the API yet, see `hyperlinks.*` above |
| `registerNotifyAnnotationAddedEvent(cb)` | `on('annotations.created', cb)` |
| `registerNotifyAnnotationDeletedEvent(cb)` | `on('annotations.deleted', cb)` |
| `registerNotifyAnnotationUpdatedEvent(cb)` | `on('annotations.updated', cb)` |
| `registerFollowLinkHandler(cb)` | **Dropped** — hyperlink-click handling isn't exposed from the API yet |
| `registerDocLinkTextSelectionEvent(cb)` | **Dropped** — same |
| `registerDocLinkStateChange(cb)` | **Dropped** — same |
| `registerCloseMultiView(cb)` | **Dropped** — split/multi-view isn't exposed from the API |
| *(write failure, no Classic equivalent)* | `on('annotations.writeFailed', cb)` — fires once a retry has given up; there is no Classic call or event for this, a failed write previously had no signal at all |

## Namespace: `screenSplitJSAPI`

| Classic call | Horizon |
|---|---|
| `askOpenAsNewDocument(documentId)` | **Dropped** — split screen isn't exposed from the API |

## Not documented on the Classic reference page

The [Classic JavaScript API reference](/docs/arender/reference/javascript-api) does not list the Classic viewer's full export surface. These entry points were confirmed to exist but are outside that page — the GWT source that would let this table be exhaustive on undocumented exports is not available from this repository, so only the following are covered:

| Classic call | Horizon |
|---|---|
| `getConfiguration()` | **Dropped** — viewer configuration isn't exposed from the API; configure through the HTML attributes and the provider setup instead |
| `askOpenAnchorModal()` | **Dropped** — no Horizon equivalent |
| `evictDocument(documentId)` | `releaseDocument(documentId)` — renamed: `evict` was a bare verb with no noun, and a Classic word rather than a Horizon one |
| `setupArrowScaleDpi()` | **Dropped** — no Horizon equivalent |
| `registerFirstPageLoaded(cb)` | `on('document.firstPageDisplayed', cb)` |
| `getCurrentUserName(cb)` | **Planned (AR-18627)** — no route exposes the identity of the session today; Horizon has no user notion at all |

## Related pages

- [JavaScript API reference](../../reference/javascript-api.md): the Horizon command list, by feature
- [Migration from GWT](./migration-from-gwt.md): concepts rather than entry points
- [Classic JavaScript API reference](/docs/arender/reference/javascript-api): the source this table was built from
