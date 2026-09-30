---
viewer: horizon
title: Classic to Horizon call table
last_update:
  date: '2026-09-30T08:24:29.938Z'
  author: CI/CD Bot
slug: /guides/upgrade/classic-to-horizon-call-table
sidebar_position: 8
content_hash: 7b247a43b268c59a7b281982f3e677aedda1e5e5b47243699d56e8f763212f90
---

# Classic to Horizon call table

Every entry point of the Classic (`arender.jsapi`) JavaScript API, and what to call instead on `window.ARender` in Horizon.

Two sources feed this table: the [Classic JavaScript API reference](/docs/arender/reference/javascript-api), and the entry points the Classic viewer actually exports but that page does not document — listed in [Not documented on the Classic reference page](#not-documented-on-the-classic-reference-page).

For concepts rather than entry points — delivery model, embedding, configuration — see [Migration from GWT](./migration-from-gwt.md).

## How to read this table

Every Classic call has a row. Where there is no Horizon equivalent, the row carries one of three reasons instead of a Horizon call:

- **Dropped** — no Horizon equivalent, and why; about 30 entry points across the whole table, named by the parent Epic as never carried over regardless of feature
- **Replaced** — the same intent is reached a different way
- **Planned** — carried by a separate ticket, not shipped yet. Three rows point at [AR-18627](https://arondor.atlassian.net/browse/AR-18627) directly. The rest — 71 entry points, eleven feature areas — are "Part B" of the parent Epic ([AR-18610](https://arondor.atlassian.net/browse/AR-18610)): the API surface of a feature whose own ticket carries the work. Three of those eleven already have a ticket number (hyperlinks: AR-18590, AR-18591 — multi-view, comparison and split screen: AR-18567 — bookmarks and named destinations: AR-18570); the other eight are scoped in the Epic but not yet split into their own tickets

Horizon's own naming follows two rules: a collection takes a namespace (`annotations.*`, and later `bookmarks.*` and `hyperlinks.*`); everything else is flat, with the verb carrying its noun (`getDocumentLayout`, `goToPage`). Events are named `noun.pastVerb` and never share a string with a command. Every handle a command returns exits through `dispose()`.

Two renames in this table are not a straight transposition:

- `evictDocument` → `releaseDocument` — `evict` was a bare verb with no noun, and a Classic word rather than a Horizon one.
- The whole `register*Event` family → one catalogue and one subscription call, `on('<noun>.<pastVerb>', cb)`, instead of one method per event. Each row below names the specific event its `register*` call maps to.

:::note Page numbers are zero-based on both sides
The Horizon API counts pages from zero, same as the Classic `"Index"` type and the backend itself — only the viewer's own page indicator in the UI displays one more. Rows carrying a page number are marked **(0-based)** below as a reminder.
:::

## Initialization

Classic's bootstrap mechanisms are not reproduced, independently of any feature — the parent Epic names them explicitly as never carried over.

| Classic call | Horizon |
|---|---|
| `window.ARenderJSAPI()` (global init callback, called once the GWT app has loaded) | **Dropped** — no callback-based bootstrap; a host does not need one, since calls made before the viewer finishes mounting are already queued automatically |
| `arenderjs.startupScript` property, loaded via `window.ARenderJSAPICallStartupScript(url)` | **Dropped** — no startup script fetched from the server and evaluated |
| Init hook looked up in the parent window | **Dropped** — no init hook lookup; a host drives the viewer directly through `window.ARender` / `element.ARender` |
| Host-settable user identity | **Dropped** — a host cannot declare a user's identity to the viewer; see [`getCurrentUserName`](#not-documented-on-the-classic-reference-page) below for the read direction, which is a separate, still-open question |

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
| `askChangeDocument("Previous")` | `previousDocument()` — same name, same meaning |
| `askChangeDocument("Next")` | `nextDocument()` |
| `askChangeDocument("First")` | **Dropped** — no direct call; read the first id from `getDocumentLayout()`'s children and pass it to `goToDocument(id)` |
| `askChangeDocument("Last")` | **Dropped** — no direct call; read the last id from `getDocumentLayout()`'s children and pass it to `goToDocument(id)` |
| `askChangeDocument("ByDocumentId", documentId)` | `goToDocument(documentId)` |
| `askChangePage("Relative", offset)` (0-based) | **Dropped** — no relative-offset stepping call; read the current page from the `page.changed` event and call `goToPage(currentPage + offset)` |
| `askChangePage("Index", offset)` (0-based) | `goToPage(page)` — this Classic type already had no caller, so the migration costs nothing |
| `askChangePage("Absolute", offset, position)` (0-based) | **Dropped** — the position rectangle within the page has no equivalent; `goToPage` moves to a page, not a rectangle inside it |
| `askChangePage("NoChange", ..., position)` | **Dropped** — re-targets a position rectangle without changing page; has no meaning without the rectangle above |
| `newPageRelativePosition(x, y, w, h)` | **Dropped** — builds the position rectangle for `askChangePage("Absolute", …)` above, which has no equivalent |
| `getPageForNamedDestination(documentId, destination, handler)` | **Planned (AR-18570)** — bookmarks and named destinations, under a future `bookmarks.*` namespace |

## Hyperlinks

Part B of the parent Epic, tracked under the `hyperlinks.*` namespace planned in AR-18590 and AR-18591.

| Classic call | Horizon |
|---|---|
| `enablePDFDocumentHyperlinks(enable)` | **Planned (AR-18590, AR-18591)** — under the future `hyperlinks.*` namespace, not yet shipped |
| `disallowClickOnHyperlinks(disallow)` | **Planned (AR-18590, AR-18591)** — same |
| `enableInternalPDFDocumentHyperlinks(documentId)` | **Planned (AR-18590, AR-18591)** — same |
| `disableInternalPDFDocumentHyperlinks(documentId)` | **Planned (AR-18590, AR-18591)** — same |
| `enableExternalPDFDocumentHyperlinks(documentId)` | **Planned (AR-18590, AR-18591)** — same |
| `disableExternalPDFDocumentHyperlinks(documentId)` | **Planned (AR-18590, AR-18591)** — same |
| `notifyHyperlinkTarget(target)` | **Planned (AR-18590, AR-18591)** — same |

## Text selection (lasso mode)

Part B of the parent Epic, "Lasso text selection" evolution (3 entry points, no ticket number split out yet).

| Classic call | Horizon |
|---|---|
| `askActivateLassoMode(lassoId)` | **Planned** — Part B, "Lasso text selection" evolution |
| `askDeactivateLassoMode()` | **Planned** — same |

## Annotations (save / display) and other top-level calls

| Classic call | Horizon |
|---|---|
| `displayComment(documentId, display)` | **Planned** — Part B, "Comment display filter" evolution |
| `askDownloadDocument(documentId, title, suffix)` | **Replaced** — see [Download commands](#download-commands); downloads always target the open document or set, there is no by-id variant |
| `changeConfigurableElement(name, enabled)` | **Planned** — Part B, "Configuration surface" evolution. The one Part B item with production callers today: COVEA enables/disables our buttons by jQuery selector on their label, and Generali trims the top panel by configuration |

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
| `getDocumentBuilder()` | **Planned** — Part B, "Document builder" evolution (25 entry points, the largest single block, no ticket number split out yet) |
| `getDocumentLayout()` | **Replaced** — flat `getDocumentLayout(documentId?)` call, no accessor needed |
| `getDocumentMetadata()` | **Replaced** — flat `getDocumentMetadata(documentId?)` call, no accessor needed |
| `getZoomJSAPI()` | **Dropped** — zoom isn't exposed from the API |
| `getRotateJSAPI()` | **Dropped** — rotation isn't exposed from the API |
| `getPrintJSAPI()` | **Dropped** — printing isn't exposed from the API |
| `getFullScreenJSAPI()` | **Dropped** — full screen isn't exposed from the API |
| `getSearchJSAPI()` | **Replaced** — flat `search(text)` call, a `Promise` resolving to a handle, no accessor needed |
| `getGenericNotificationJSAPI()` | **Dropped** — the toaster isn't exposed from the API |
| `getDownloadDocumentJSAPI()` | **Replaced** — flat `download(options)` call, no accessor needed |
| `getZoomGlassJSAPI()` | **Planned** — Part B, "Magnifier" evolution |
| `getThumbnailsJSAPI()` | **Dropped** — the thumbnail sidebar is never carried over — no integration was found calling it |
| `getDocumentCompareJSAPI()` | **Planned (AR-18567)** — multi-view, document comparison and split screen |
| `getScreenSplitJSAPI()` | **Planned (AR-18567)** — same |
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
| `registerHyperlinkDisplayHookEvent(docId, cb)` | **Planned (AR-18590, AR-18591)** — see Hyperlinks above |
| `registerCommentDisplayHookEvent(docId, cb)` | **Planned** — Part B, "Comment display filter" evolution, alongside `displayComment` below |
| `registerAnnotationsSavedEvent(cb)` | **Replaced** — `on('annotations.created' \| 'annotations.updated' \| 'annotations.deleted', cb)`; Horizon writes each annotation as it is made, so there is no batched "saved" event |
| `registerNotifyLassoSelectedTextEvent(cb)` | **Planned** — Part B, "Lasso text selection" evolution |
| `registerNotifyHyperlinkToggleTargetModeEvent(cb)` | **Planned (AR-18590, AR-18591)** — see Hyperlinks above |
| `registerDisplayLinkHandler(cb)` | **Planned (AR-18590, AR-18591)** — see Hyperlinks above |
| `registerExternalBookmarkHandler(cb)` | **Planned (AR-18570)** — bookmarks and named destinations |

## Namespace: `documentBuilder`

Part B of the parent Epic, "Document builder" evolution — 25 entry points, the largest single block, no ticket number split out yet.

| Classic call | Horizon |
|---|---|
| `open()` | **Planned** — Part B, "Document builder" evolution |
| `close()` | **Planned** — same |
| `toggle()` | **Planned** — same |
| `reset()` | **Planned** — same |
| `saveFirstDocument(download, delete, freeze, behavior)` | **Planned** — same |
| `saveAllDocuments(handler, download, delete, freeze, behavior)` | **Planned** — same |
| `createEmptyDocument()` | **Planned** — same |
| `createCustomDocument(jsonContent, options)` | **Planned** — same |
| `registerNotifyAlterDocumentContentEvent(cb)` | **Planned** — same |
| `registerSubmitAlterDocumentContentEvent(cb)` | **Planned** — same |
| `registerDocumentBuilderOpeningEvent(cb)` | **Planned** — same |
| `registerDocumentBuilderSaveCustomEvent(cb)` | **Planned** — same |

## Namespace: `zoomJSAPI`

Never carried over — the parent Epic found no integration calling any zoom command; the one caller that drives zoom does it by forwarding keystrokes to the viewer, which is a viewer behavior rather than an integration contract.

| Classic call | Horizon |
|---|---|
| `askZoomIn()` | **Dropped** — no integration found calling it; not exposed from the API |
| `askZoomOut()` | **Dropped** — same |
| `askZoomFullWidth()` | **Dropped** — same |
| `askZoomFullHeight()` | **Dropped** — same |
| `askZoomFullPage()` | **Dropped** — same |
| `askZoomInZone(x, y, w, h)` | **Dropped** — same |

## Namespace: `zoomGlassJSAPI`

Part B of the parent Epic, "Magnifier" evolution (3 entry points, no ticket number split out yet).

| Classic call | Horizon |
|---|---|
| `toggle()` | **Planned** — Part B, "Magnifier" evolution |
| `updateZoom(zoom)` | **Planned** — same |
| `updatePosition(x, y, w, h)` | **Planned** — same |

## Namespace: `rotateJSAPI`

Never carried over — no integration was found calling any rotation command.

| Classic call | Horizon |
|---|---|
| `askRotateCurrentPageLeft()` | **Dropped** — no integration found calling it; not exposed from the API |
| `askRotateCurrentPageRight()` | **Dropped** — same |
| `askRotateAllPageLeft()` | **Dropped** — same |
| `askRotateAllPageRight()` | **Dropped** — same |
| `askRotatePage(pageNumber, documentId, rotation, clockwise)` (0-based) | **Dropped** — same |
| `registerNotifyPageRotatedEvent(cb)` | **Dropped** — same |

## Namespace: `fullScreenJSAPI`

Never carried over — no integration was found calling either command.

| Classic call | Horizon |
|---|---|
| `askOpenFullScreen()` | **Dropped** — not exposed from the API |
| `askCloseFullScreen()` | **Dropped** — same |

## Search commands

| Classic call | Horizon |
|---|---|
| `askSearchTextNext(text)` | `await search(text)`, then `handle.next()` — `search` returns a `Promise` |
| `askSearchTextPrevious(text)` | `await search(text)`, then `handle.previous()` |
| `askAdvancedSearchText(text, caseSensitive, accentSensitive, regex, scope, annotations, postAction)` | **Planned** — Part B, "Search options" evolution (its 7 options land on the one `search(text)` command). Today `search(text)` always searches the whole open set, case-insensitive; the one production caller of the advanced form used none of its options |
| `clearSearchResults()` | `handle.dispose()` |

## Namespace: `showPrintDialogJSAPI`

Parked pending a support check on real callers, alongside host notifications below — neither has an observed caller today.

| Classic call | Horizon |
|---|---|
| `askShowPrintDialog()` | **Dropped** — no observed caller; parked pending a support check, not exposed from the API |
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
| `askDownloadCompareResultDocument()` | **Planned (AR-18567)** — multi-view, document comparison and split screen |
| *(missing-download-right refusal)* | **Planned (AR-18627)** — Horizon has no rights model for downloads today; a refusal for a missing download right isn't implemented yet |

## Namespace: `genericNotificationJSAPI`

| Classic call | Horizon |
|---|---|
| `askNotification(message, type)` | **Dropped** — no observed caller; parked pending a support check, not exposed from the API — show the notification in the host's own UI instead |

## Namespace: `thumbnailsJSAPI`

Never carried over — no integration was found calling any thumbnail-sidebar command.

| Classic call | Horizon |
|---|---|
| `showNavigator()` | **Dropped** — no integration found calling it; not exposed from the API |
| `hideNavigator()` | **Dropped** — same |
| `resetNavigator()` | **Dropped** — same |
| `expandNavigator(width)` | **Dropped** — same |
| `reduceNavigator(width)` | **Dropped** — same |

## Namespace: `documentLayout`

| Classic call | Horizon |
|---|---|
| `getDocumentLayout(documentId, onLayout, onError)` | `getDocumentLayout(documentId?)` — a synchronous read, no callbacks |
| `getShallowDocumentLayout(documentId, onLayout, onError)` | **Dropped** — the shallow/stub-children variant has no equivalent; `getDocumentLayout` always returns children already resolved |
| `layout.documentTitle` (field, not a call) | **Replaced** — read from the `document.changed` event payload (`{documentId, title}`) |

## Namespace: `documentCompare`

Part B of the parent Epic, "Multi-view, document comparison and split screen" evolution (AR-18567, 6 entry points).

| Classic call | Horizon |
|---|---|
| `doComparisonFromStringUUID(leftId, rightId)` | **Planned (AR-18567)** — multi-view, document comparison and split screen |
| `closeAllMultiView()` | **Planned (AR-18567)** — same |

## Annotation commands and events

| Classic call | Horizon |
|---|---|
| `addAnnotation(documentId, type, x, y, w, h, page, color, opacity)` (0-based) | `annotations.create({page, type, x, y, width, height, color, opacity})` — one flat object replaces the nine positional arguments; `type` is one of `'highlight'`, `'square'`, `'circle'` today |
| `save()` | **Dropped** — Horizon writes each annotation as it is made, there is nothing to flush |
| `refresh()` | `annotations.refresh(documentId?)` |
| `hasDirtyAnnotations()` | **Dropped** — nothing is batched, so nothing to report. Do not reuse this to gate a "save" action: it would read false almost always |
| `getDestinationTypes()` | **Planned** — Part B, "Doc-links and page anchors" evolution |
| `getActionTypes()` | **Planned** — same |
| `getPropertyFromDestination(dest, prop)` | **Planned** — same |
| `getPropertyFromAction(action, prop)` | **Planned** — same |
| `createDocLink(pageNumber)` (0-based) | **Planned** — Part B, "Doc-links and page anchors" evolution |
| `registerNotifyAnnotationAddedEvent(cb)` | `on('annotations.created', cb)` |
| `registerNotifyAnnotationDeletedEvent(cb)` | `on('annotations.deleted', cb)` |
| `registerNotifyAnnotationUpdatedEvent(cb)` | `on('annotations.updated', cb)` |
| `registerFollowLinkHandler(cb)` | **Planned (AR-18590, AR-18591)** — see Hyperlinks above |
| `registerDocLinkTextSelectionEvent(cb)` | **Planned** — Part B, "Doc-links and page anchors" evolution |
| `registerDocLinkStateChange(cb)` | **Planned** — same |
| `registerCloseMultiView(cb)` | **Planned (AR-18567)** — multi-view, document comparison and split screen |
| *(write failure, no Classic equivalent)* | `on('annotations.writeFailed', cb)` — fires once a retry has given up; there is no Classic call or event for this, a failed write previously had no signal at all |

## Namespace: `screenSplitJSAPI`

| Classic call | Horizon |
|---|---|
| `askOpenAsNewDocument(documentId)` | **Planned (AR-18567)** — multi-view, document comparison and split screen |

## Not documented on the Classic reference page

The [Classic JavaScript API reference](/docs/arender/reference/javascript-api) does not list the Classic viewer's full export surface. These entry points were confirmed to exist but are outside that page — the GWT source that would let this table be exhaustive on undocumented exports is not available from this repository, so only the following are covered:

| Classic call | Horizon |
|---|---|
| `getConfiguration()` | **Planned** — Part B, "Configuration surface" evolution, alongside `changeConfigurableElement` above |
| `askOpenAnchorModal()` | **Dropped** — no Horizon equivalent |
| `evictDocument(documentId)` | `releaseDocument(documentId)` — renamed: `evict` was a bare verb with no noun, and a Classic word rather than a Horizon one |
| `setupArrowScaleDpi()` | **Dropped** — no Horizon equivalent |
| `registerFirstPageLoaded(cb)` | `on('document.firstPageDisplayed', cb)` |
| `getCurrentUserName(cb)` | **Planned (AR-18627)** — no route exposes the identity of the session today; Horizon has no user notion at all |

## Related pages

- [JavaScript API reference](../../reference/javascript-api.md): the Horizon command list, by feature
- [Migration from GWT](./migration-from-gwt.md): concepts rather than entry points
- [Classic JavaScript API reference](/docs/arender/reference/javascript-api): the source this table was built from
