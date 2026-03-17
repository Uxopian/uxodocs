---
title: JavaScript API
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /reference/javascript-api
sidebar_position: 3
content_hash: 1afbaa6a88ab8d0eb860bec30cce24a2debb3098be9f4effe44d6521dc000fdc
---

# JavaScript API

The ARender viewer exposes a JavaScript API that lets host pages interact with the viewer without page reloads. It is available on the `window` object as `arender` once the viewer has initialized.

## Initialization

The viewer calls `window.ARenderJSAPI()` once the GWT application has finished loading. Register this global function before embedding the viewer to execute code as soon as the API is ready:

```javascript
function ARenderJSAPI() {
  // arender.jsapi is now available
  console.log('Current document:', arender.jsapi.getCurrentDocumentId());
}
```

To run a startup script from the server side, set the `arenderjs.startupScript` property to the URL of a JavaScript file. ARender calls `window.ARenderJSAPICallStartupScript(url)` to load it.

## Top-level namespace: `arender.jsapi`

The root object of the API. All sub-APIs are accessible from here.

### Document loading and navigation

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `loadDocument(url, onLoad, onError)` | `url: string`, `onLoad: function(docId)`, `onError: function(docId, message)` | `void` | Loads a document by URL and returns its ID in the callback |
| `loadDocuments(gsonDocument, onError, onLoad)` | `gsonDocument: string`, `onError: function`, `onLoad: function(docId)` | `void` | Loads a document described as a JSON structure |
| `openDocument(documentId)` | `documentId: string` | `void` | Opens a previously loaded document by ID |
| `openDocument(documentId, resetUI)` | `documentId: string`, `resetUI: boolean` | `void` | Opens a document, optionally resetting the UI state |
| `openDocument(documentId, page)` | `documentId: string`, `page: number` | `void` | Opens a document at a specific page (0-based) |
| `cancellableLoadDocument(url, onLoad, onError)` | `url: string`, `onLoad: function`, `onError: function` | `void` | Like `loadDocument` but prompts the user if unsaved annotations exist |
| `closeDocument()` | — | `void` | Closes the current document |
| `closeErrorPopup()` | — | `void` | Dismisses any error popups |
| `getCurrentDocumentId()` | — | `string` | Returns the ID of the page-level document currently shown in the content area |
| `getMasterDocumentId()` | — | `string` | Returns the root container document ID |
| `askChangeDocument(type, documentId)` | `type: 'Previous'\|'Next'\|'First'\|'Last'\|'ByDocumentId'`, `documentId?: string` | `void` | Navigates to another document in the current tree |
| `askChangePage(type, offset, position)` | `type: 'Relative'\|'Index'\|'Absolute'\|'NoChange'`, `offset: number`, `position: PageRelativePosition` | `void` | Navigates to a page |
| `newPageRelativePosition(x, y, w, h)` | `x, y, w, h: float` | `PageRelativePosition` | Builds a position rectangle for use with `askChangePage` |
| `getPageForNamedDestination(documentId, destination, handler)` | `documentId: string`, `destination: string`, `handler: function(pageNumber)` | `void` | Resolves a named destination to a page number |

**Example: load and open a document**

```javascript
arender.jsapi.loadDocument('/path/to/doc.pdf',
  function(docId) { arender.jsapi.openDocument(docId); },
  function(docId, msg) { console.error('Load failed:', msg); }
);
```

### Hyperlinks

| Method | Parameters | Description |
|--------|-----------|-------------|
| `enablePDFDocumentHyperlinks(enable)` | `enable: boolean` | Shows or hides PDF hyperlinks for the current document |
| `disallowClickOnHyperlinks(disallow)` | `disallow: boolean` | Prevents hyperlink clicks without hiding the overlays |
| `enableInternalPDFDocumentHyperlinks(documentId)` | `documentId: DocumentId` | Enables internal (same-document) hyperlinks |
| `disableInternalPDFDocumentHyperlinks(documentId)` | `documentId: DocumentId` | Disables internal hyperlinks |
| `enableExternalPDFDocumentHyperlinks(documentId)` | `documentId: DocumentId` | Enables external (URL) hyperlinks |
| `disableExternalPDFDocumentHyperlinks(documentId)` | `documentId: DocumentId` | Disables external hyperlinks |
| `notifyHyperlinkTarget(target)` | `target: string` | Provides a URL target for a hyperlink awaiting a destination |

### Text selection (lasso mode)

| Method | Parameters | Description |
|--------|-----------|-------------|
| `askActivateLassoMode(lassoId)` | `lassoId: string` | Enables rectangular text-selection mode; the ID is returned in the callback |
| `askDeactivateLassoMode()` | — | Deactivates lasso mode |

### Annotations (save / display)

| Method | Parameters | Description |
|--------|-----------|-------------|
| `displayComment(documentId, display)` | `documentId: string`, `display: 'All'\|'Unresolved'\|'Resolved'` | Filters annotation comments shown in the explorer |
| `askDownloadDocument(documentId, title, suffix)` | `documentId: string`, `title?: string`, `suffix?: string` | Triggers a direct download of a document by ID |
| `changeConfigurableElement(name, enabled)` | `name: string`, `enabled: boolean` | Toggles a named UI element at runtime |

### Plugins

| Method | Parameters | Description |
|--------|-----------|-------------|
| `preparePluginEvent(key, value, pluginName)` | `key, value, pluginName: string` | Queues a parameter for the next plugin open event |
| `clearPluginEvent(pluginName)` | `pluginName: string` | Clears queued plugin parameters |
| `openPlugin(pluginName, openInMultiView)` | `pluginName: string`, `openInMultiView: boolean` | Opens a plugin by name |
| `getHtmlPluginName()` | — | Returns the constant `'html-plugin'` |

### Sub-API accessors

| Method | Returns |
|--------|---------|
| `getDocumentBuilder()` | `arender.documentBuilder` |
| `getDocumentLayout()` | `arender.documentLayout` |
| `getDocumentMetadata()` | `arender.documentMetadata` |
| `getZoomJSAPI()` | `arender.zoomJSAPI` |
| `getRotateJSAPI()` | `arender.rotateJSAPI` |
| `getPrintJSAPI()` | `arender.showPrintDialogJSAPI` |
| `getFullScreenJSAPI()` | `arender.fullScreenJSAPI` |
| `getSearchJSAPI()` | `arender.searchJSAPI` |
| `getGenericNotificationJSAPI()` | `arender.genericNotificationJSAPI` |
| `getDownloadDocumentJSAPI()` | `arender.downloadDocumentJSAPI` |
| `getZoomGlassJSAPI()` | `arender.zoomGlassJSAPI` |
| `getThumbnailsJSAPI()` | `arender.thumbnailsJSAPI` |
| `getDocumentCompareJSAPI()` | `arender.documentCompare` |
| `getScreenSplitJSAPI()` | `arender.screenSplitJSAPI` |
| `getAnnotationJSAPI()` | `arender.annotationJSAPI` (loaded asynchronously) |
| `onAnnotationModuleReady(callback)` | Calls `callback(annotationJSAPI)` once the annotation module is loaded |

### Event callbacks

Register callbacks to react to viewer events. All `register*` methods can be called before or after document load.

| Method | Callback signature | Description |
|--------|--------------------|-------------|
| `registerNotifyPageChangeEvent(cb)` | `cb(currentPage, pageCount, documentId)` | Fires when the displayed page changes |
| `registerCurrentDocumentChangeEvent(cb)` | `cb(documentId, title, metadata)` | Fires when the active document changes |
| `registerNotifyLoadingErrorEvent(cb)` | `cb(documentId, message)` | Fires when a document fails to load |
| `registerNotifyLogEvent(cb)` | `cb(event, level, message, stackTrace)` | Intercepts all toaster log events |
| `registerGenericEventListener(cb)` | `cb(eventClassName)` | Fires for every event on the internal bus |
| `registerAllAsyncModulesStartedEvent(cb)` | `cb()` | Fires when all async modules have finished initializing |
| `registerPanelLoadedConfigurationEvent(cb)` | `cb()` | Fires when the top-panel configuration is loaded |
| `registerTopPanelRefreshedEvent(cb)` | `cb()` | Fires when the top-panel buttons are refreshed |
| `registerHyperlinkDisplayHookEvent(docId, cb)` | `cb(documentId, internal, external)` | Fires when PDF hyperlinks are displayed |
| `registerCommentDisplayHookEvent(docId, cb)` | `cb(documentId, displayState)` | Fires when the comment display state changes |
| `registerAnnotationsSavedEvent(cb)` | `cb(success, created, updated, deleted)` | Fires after annotations are saved |
| `registerNotifyLassoSelectedTextEvent(cb)` | `cb(text, lassoId)` | Fires when the user completes a lasso text selection |
| `registerNotifyHyperlinkToggleTargetModeEvent(cb)` | `cb(activated)` | Fires when hyperlink target-selection mode is toggled |
| `registerDisplayLinkHandler(cb)` | `cb(documentId, linkId, isAnnotation, event)` | Fires when a link is about to be rendered; use `setLinkStyle`, `setLinkColor`, `setLinkOpacity` to override appearance |
| `registerExternalBookmarkHandler(cb)` | `cb(documentId, fileName, namedDestination, id)` | Fires when the user clicks an external bookmark |

**Example: react to page changes**

```javascript
arender.jsapi.registerNotifyPageChangeEvent(function(page, count, docId) {
  console.log('Page ' + (page + 1) + ' of ' + count);
});
```

**Example: intercept annotations saved**

```javascript
arender.jsapi.registerAnnotationsSavedEvent(function(success, created, updated, deleted) {
  if (success) {
    console.log('Saved: +' + created + ' ~' + updated + ' -' + deleted);
  }
});
```

---

## Namespace: `arender.documentBuilder`

Controls the document builder panel. For a complete description of the document builder feature, data model, and save behaviors, see [Document builder](/docs/arender/concepts/document-builder).

| Method | Description |
|--------|-------------|
| `open()` | Opens the document builder panel |
| `close()` | Closes the document builder panel |
| `toggle()` | Toggles the document builder panel |
| `reset()` | Resets the current assembly |
| `saveFirstDocument(download, delete, freeze, behavior)` | Saves the first output document |
| `saveAllDocuments(handler, download, delete, freeze, behavior)` | Saves all output documents |
| `createEmptyDocument()` | Adds an empty output document slot |
| `createCustomDocument(jsonContent, options)` | Creates an output document from JSON |

Callbacks: `registerNotifyAlterDocumentContentEvent`, `registerSubmitAlterDocumentContentEvent`, `registerDocumentBuilderOpeningEvent`, `registerDocumentBuilderSaveCustomEvent`.

---

## Namespace: `arender.zoomJSAPI`

| Method | Parameters | Description |
|--------|-----------|-------------|
| `askZoomIn()` | — | Zooms in one step |
| `askZoomOut()` | — | Zooms out one step |
| `askZoomFullWidth()` | — | Fits the page width to the viewer |
| `askZoomFullHeight()` | — | Fits the page height to the viewer |
| `askZoomFullPage()` | — | Fits the whole page in the viewer |
| `askZoomInZone(x, y, w, h)` | `x, y, w, h: int` | Zooms into a specific rectangular region (pixel coordinates) |

---

## Namespace: `arender.zoomGlassJSAPI`

| Method | Parameters | Description |
|--------|-----------|-------------|
| `toggle()` | — | Shows or hides the magnifying glass overlay |
| `updateZoom(zoom)` | `zoom: float` | Sets the magnification ratio of the glass |
| `updatePosition(x, y, w, h)` | `x, y, w, h: float` | Moves the glass to a position (relative page coordinates) |

---

## Namespace: `arender.rotateJSAPI`

| Method | Parameters | Description |
|--------|-----------|-------------|
| `askRotateCurrentPageLeft()` | — | Rotates the current page 90° counter-clockwise |
| `askRotateCurrentPageRight()` | — | Rotates the current page 90° clockwise |
| `askRotateAllPageLeft()` | — | Rotates all pages 90° counter-clockwise |
| `askRotateAllPageRight()` | — | Rotates all pages 90° clockwise |
| `askRotatePage(pageNumber, documentId, rotation, clockwise)` | `pageNumber: int`, `documentId: string`, `rotation: int (90/180/270)`, `clockwise: boolean` | Rotates a specific page by an explicit angle |

Callback: `registerNotifyPageRotatedEvent(cb)`, signature: `cb(documentId, pageNumber, rotation)`.

---

## Namespace: `arender.fullScreenJSAPI`

| Method | Description |
|--------|-------------|
| `askOpenFullScreen()` | Enters full-screen mode |
| `askCloseFullScreen()` | Exits full-screen mode |

---

## Namespace: `arender.searchJSAPI`

| Method | Parameters | Description |
|--------|-----------|-------------|
| `askSearchTextNext(text)` | `text: string` | Searches forward for the next occurrence (case-insensitive) |
| `askSearchTextPrevious(text)` | `text: string` | Searches backward for the previous occurrence |
| `askAdvancedSearchText(text, caseSensitive, accentSensitive, regex, scope, annotations, postAction)` | see below | Full-featured search with options |
| `clearSearchResults()` | — | Clears all highlighted search results |

`askAdvancedSearchText` parameters:

| Parameter | Type | Values |
|-----------|------|--------|
| `text` | string | Search term or regular expression |
| `caseSensitive` | boolean | — |
| `accentSensitive` | boolean | — |
| `regex` | boolean | Treat `text` as a regex |
| `scope` | string | `'CurrentPage'`, `'AllPages'`, `'AllDocuments'` (default) |
| `annotations` | string | `'WithAnnotations'`, `'WithoutAnnotations'` (default), `'OnlyAnnotations'` |
| `postAction` | string | `'NONE'` (default), `'REDACT'`, `'HIGHLIGHT'` |

**Example: search and highlight all occurrences**

```javascript
arender.jsapi.getSearchJSAPI().askAdvancedSearchText(
  'confidential', false, false, false,
  'AllDocuments', 'WithoutAnnotations', 'HIGHLIGHT'
);
```

---

## Namespace: `arender.showPrintDialogJSAPI`

| Method | Description |
|--------|-------------|
| `askShowPrintDialog()` | Opens the print dialog |
| `askPrintAllDocumentPages()` | Prints all pages without opening a dialog |

---

## Namespace: `arender.downloadDocumentJSAPI`

| Method | Description |
|--------|-------------|
| `askDownloadDocumentPDF()` | Downloads the current document as PDF |
| `askDownloadDocumentNonPDF()` | Downloads the document in its non-PDF form |
| `askDownloadDocumentSource()` | Downloads the original source file |
| `askDownloadAllDocuments()` | Downloads all open documents as a single PDF |
| `askDownloadAllSourcesDocuments()` | Downloads all open documents as originals (ZIP) |
| `askDownloadAnnotations()` | Downloads the document with annotations burned in |
| `askDownloadWithFDFAnnotations()` | Downloads the document with FDF annotations embedded |
| `askDownloadFDFAnnotations()` | Downloads the FDF annotations file only |
| `askDownloadWithAnnotations()` | Downloads a copy with annotations overlaid |
| `askDownloadWithRedact()` | Downloads the document with redactions applied |
| `askDownloadCompareResultDocument()` | Downloads the comparison result document |

---

## Namespace: `arender.genericNotificationJSAPI`

| Method | Parameters | Description |
|--------|-----------|-------------|
| `askNotification(message, type)` | `message: string`, `type: 'SEVERE'\|'WARNING'\|'INFO'` | Displays a toaster notification |

---

## Namespace: `arender.thumbnailsJSAPI`

| Method | Parameters | Description |
|--------|-----------|-------------|
| `showNavigator()` | — | Shows the left-side document navigator |
| `hideNavigator()` | — | Hides the document navigator |
| `resetNavigator()` | — | Resets the navigator to its default visible state |
| `expandNavigator(width)` | `width: int` | Expands the navigator to a given pixel width |
| `reduceNavigator(width)` | `width: int` | Reduces the navigator to a given pixel width |

---

## Namespace: `arender.documentLayout`

| Method | Parameters | Description |
|--------|-----------|-------------|
| `getDocumentLayout(documentId, onLayout, onError)` | `documentId: string`, `onLayout: function(layout)`, `onError: function(docId, message)` | Retrieves a fully resolved layout tree (all children expanded) |
| `getShallowDocumentLayout(documentId, onLayout, onError)` | `documentId: string`, `onLayout: function(layout)`, `onError: function(docId, message)` | Retrieves the layout with children as stubs (IDs only) |

The `layout` object passed to the callback has the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `documentId` | string | Document ID |
| `documentTitle` | string | Human-readable title |
| `pageDimensions` | array | Array of `{width, height, rotation}` per page |
| `children` | array | Child layouts (for container documents) |
| `exception` | string | Error message if this child could not be resolved |

**Example:**

```javascript
arender.jsapi.getDocumentLayout().getDocumentLayout(
  arender.jsapi.getMasterDocumentId(),
  function(layout) {
    console.log(layout.documentTitle, layout.pageDimensions.length, 'pages');
  },
  function(docId, msg) { console.error(msg); }
);
```

---

## Namespace: `arender.documentCompare`

| Method | Parameters | Description |
|--------|-----------|-------------|
| `doComparisonFromStringUUID(leftId, rightId)` | `leftId, rightId: string` | Starts a visual comparison between two documents and opens the result in multi-view |
| `closeAllMultiView()` | — | Closes all multi-view panels |

**Example:**

```javascript
arender.jsapi.getDocumentCompareJSAPI()
  .doComparisonFromStringUUID(docIdA, docIdB);
```

---

## Namespace: `arender.annotationJSAPI`

The annotation module loads asynchronously. Use `onAnnotationModuleReady` to safely access it:

```javascript
arender.jsapi.onAnnotationModuleReady(function(annotApi) {
  annotApi.save();
});
```

| Method | Parameters | Description |
|--------|-----------|-------------|
| `addAnnotation(documentId, type, x, y, w, h, page, color, opacity)` | see below | Adds an unsaved annotation at the given position |
| `save()` | — | Saves all dirty (unsaved) annotations |
| `refresh()` | — | Reloads annotations from the server (unsaved changes are kept) |
| `hasDirtyAnnotations()` | — | Returns `true` if there are unsaved annotations |
| `getDestinationTypes()` | — | Returns the available hyperlink destination types |
| `getActionTypes()` | — | Returns the available hyperlink action types |
| `getPropertyFromDestination(dest, prop)` | `dest, prop: string` | Extracts a property from a destination descriptor |
| `getPropertyFromAction(action, prop)` | `action, prop: string` | Extracts a property from an action descriptor |
| `createDocLink(pageNumber)` | `pageNumber: int` | Starts a doc-link creation on the given page |

`addAnnotation` parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `documentId` | string | Target document ID |
| `type` | string | Annotation type (e.g. `'StickyNote'`, `'Highlight'`, `'FreeText'`) |
| `x, y, w, h` | int | Position and size in page units |
| `page` | int | 0-based page number |
| `color` | string | CSS color string |
| `opacity` | float | 0.0 to 1.0 |

Callbacks:

| Method | Callback signature | Description |
|--------|--------------------|-------------|
| `registerNotifyAnnotationAddedEvent(cb)` | `cb(documentId, annotationJson, isFromDocumentParsing)` | Fires when an annotation is added |
| `registerNotifyAnnotationDeletedEvent(cb)` | `cb(documentId, annotationJson)` | Fires when an annotation is deleted |
| `registerNotifyAnnotationUpdatedEvent(cb)` | `cb(documentId, annotationJson)` | Fires when an annotation is updated |
| `registerFollowLinkHandler(cb)` | `cb(documentId, page, destination, action, id)` | Fires when a hyperlink is clicked |
| `registerDocLinkTextSelectionEvent(cb)` | `cb()` | Fires when the user completes a doc-link text selection |
| `registerDocLinkStateChange(cb)` | `cb()` | Fires when the doc-link mode state changes |
| `registerCloseMultiView(cb)` | `cb()` | Fires when all multi-view panels are closed |

---

## Namespace: `arender.screenSplitJSAPI`

| Method | Parameters | Description |
|--------|-----------|-------------|
| `askOpenAsNewDocument(documentId)` | `documentId: string` | Opens an already-loaded document as a second pane in split-screen |

---

## Related pages

- [Document builder](/docs/arender/concepts/document-builder)
- [Annotations](/docs/arender/concepts/annotations)
- [Documents and IDs](/docs/arender/concepts/documents-and-ids)
- [Viewer configuration](/docs/arender/reference/viewer-configuration)
- [Broker REST API](/docs/arender/reference/rest-api/broker-api)
