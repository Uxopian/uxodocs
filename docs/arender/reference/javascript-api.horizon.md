---
viewer: horizon
title: JavaScript API
last_update:
    date: "2026-09-17T13:18:50.000Z"
    author: CI/CD Bot
slug: /reference/javascript-api
sidebar_position: 3
content_hash: 3a45421f2fbd6b28cd0fe7ec03cfb570fa0bc329ccc0eafc3080525722326dfa
---

# JavaScript API

The ARender Horizon API is exposed in two ways:

- **On the window object:** `window.ARender`
- **On the element instance:** `element.ARender` (useful when multiple viewers are on the same page)

Calls made before the viewer finishes mounting are queued automatically — no need to wait for any event. Only one viewer per page is supported: two `<arender-element>` tags share one API and one state.

That one viewer can show several panels side by side (multi-view). The API stays one: **the document on screen is the document of the active panel**, for every command and event that mentions it. See [Panels](#panels).

Two conventions hold across the API: reads are synchronous, and actions return a promise. Annotation methods are grouped under `annotations`, because annotations are a collection with symmetric operations (create, read, update, delete); every other command is a single action and sits directly on the root object.

Coming from the Classic viewer's `arender.jsapi.*`? See [Migration from Classic](../guides/upgrade/migration-from-gwt.md) for the concept mapping.

## Document reading and navigation

| Method                                  | Parameters            | Returns                           | Description                                                                                                                                                                                                                                                                                                |
| --------------------------------------- | --------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `version`                               | —                     | `string`                          | Build/app version                                                                                                                                                                                                                                                                                          |
| `openDocument(params)`                  | `params: string`      | `Promise<void>`                   | Opens a document from a query string of parameters. Resolves once the document is displayed. Replaces the whole session: every panel closes and the viewer returns to single view. See [Web Component](./web-component.md#javascript-api) and [Opening documents](../guides/features/opening-documents.md) |
| `getCurrentDocumentId()`                | —                     | `string \| null`                  | The document on screen — inside a container, the displayed child; in multi-view, the active panel's document. `null` if nothing is open                                                                                                                                                                    |
| `getRootDocumentId()`                   | —                     | `string \| null`                  | The root of the open set, the same for every panel. Equal to the current one on a single document                                                                                                                                                                                                          |
| `getDocumentLayout(documentId?)`        | `documentId?: string` | `DocumentLayout`                  | Title, kind, pages and children of a document. With no argument, answers about the document on screen                                                                                                                                                                                                      |
| `getDocumentMetadata(documentId?)`      | `documentId?: string` | `Promise<Record<string, string>>` | Repository metadata fields for a document. Asynchronous — unlike the other reads, it calls the server                                                                                                                                                                                                      |
| `goToPage(page)`                        | `page: number`        | `Promise<void>`                   | Displays a page of the document on screen. **0-based** — the viewer's own page field is one higher. In multi-view, only the active panel moves                                                                                                                                                             |
| `goToDocument(documentId)`              | `documentId: string`  | `Promise<void>`                   | Displays a document of the open set, at its first page, in the active panel — even when another panel already displays it                                                                                                                                                                                  |
| `nextDocument()` / `previousDocument()` | —                     | `Promise<void>`                   | Steps to the next/previous document of the open set. Already bound to Ctrl + arrow keys inside the viewer. In multi-view, the active panel steps from its own document                                                                                                                                     |

`getDocumentLayout()` returns:

| Property         | Type                                                             | Description                                                                                                                                           |
| ---------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `documentId`     | `string`                                                         | —                                                                                                                                                     |
| `title`          | `string \| null`                                                 | —                                                                                                                                                     |
| `kind`           | `'document' \| 'container' \| 'video' \| 'reference' \| 'error'` | `'video'` has no pages to count; `'reference'` is a container child whose own layout hasn't landed yet; an unknown backend type reads as `'document'` |
| `pageDimensions` | `PageDimension[]`                                                | `{width, height, rotation}` per page, empty on a container or a failed document                                                                       |
| `children`       | `DocumentLayout[]`                                               | Present on a container only, already resolved — nothing to loop over and refetch                                                                      |
| `error`          | `{code?, message?}`                                              | Present when this document could not be resolved; its siblings are still listed                                                                       |

`goToPage` is bounded by the document on screen, not the whole set: inside a container, each document has its own page numbering.

**Example: walk a container**

```javascript
const rootId = window.ARender.getRootDocumentId();
const layout = window.ARender.getDocumentLayout(rootId);
for (const child of layout.children ?? []) {
    console.log(child.documentId, child.title, child.kind);
}
```

## Panels

Multi-view shows several documents of the open set side by side, each in its own panel. Single view is one panel. The user opens a panel from a thumbnail ("Open in a new view") and activates one by clicking in it; a host does the same with these commands.

| Method                 | Parameters           | Returns           | Description                                                                                                                                                                                                                                                                       |
| ---------------------- | -------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getViews()`           | —                    | `View[]`          | The panels, in the order they are displayed: one in single view, none before anything is open. Synchronous                                                                                                                                                                        |
| `openView(documentId)` | `documentId: string` | `Promise<number>` | Opens a panel on a document of the open set, at its first page, after the last panel, and makes it active — what "Open in a new view" does on a thumbnail. Resolves with its `viewId`. A document already displayed can be opened again, and there is no maximum number of panels |
| `activateView(viewId)` | `viewId: number`     | `Promise<void>`   | Makes a panel the active one, as a click in it does. The document on screen becomes its document                                                                                                                                                                                  |
| `closeView(viewId)`    | `viewId: number`     | `Promise<void>`   | Closes a panel, as its close button does. When it was the active one, the next panel takes over, or the previous one. Down to one panel, the viewer returns to single view. The last panel cannot be closed: `openDocument` is what replaces it                                   |

`View`:

| Property     | Type      | Description                                                                                                                                                                                                           |
| ------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `viewId`     | `number`  | Names the panel, never its place: it starts at 1, grows with each panel opened and is not reused, so after panel 1 closes, panel 2 is first and is still 2. Numbering starts again with each set `openDocument` opens |
| `documentId` | `string`  | The document the panel displays                                                                                                                                                                                       |
| `isActive`   | `boolean` | Whether the document on screen comes from this panel                                                                                                                                                                  |

The order of `getViews()` is the one on screen at the time of the call, and it can change: identify a panel by its `viewId`, never by its index.

`openView`, `activateView` and `closeView` refuse with `NOT_READY` until the viewer has opened the first panel of a set, `NOT_FOUND` on a document outside the open set or a panel that does not exist, and `UNSUPPORTED` on a value of the wrong type or on closing the last panel.

**Example: compare two documents of a container**

```javascript
const rootId = window.ARender.getRootDocumentId();
const second = window.ARender.getDocumentLayout(rootId).children[1];
const viewId = await window.ARender.openView(second.documentId);
await window.ARender.goToPage(2); // moves the new panel, which is active
await window.ARender.closeView(viewId); // back to single view
```

## Search commands

| Method         | Parameters     | Returns                 | Description                                                                                                                                                                                                                                                                                            |
| -------------- | -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `search(text)` | `text: string` | `Promise<SearchHandle>` | Searches every document of the open set — not only the one on screen — and displays the first hit. Hits are displayed in the active panel, which changes document when a hit sits in another one. Plain text only: the Classic viewer's advanced options (case, accent, regex, scope) aren't available |

`SearchHandle`:

| Member                  | Type            | Description                                                                                                                                                                                          |
| ----------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `position`              | `number`        | 1-based position of the hit on screen, `0` when there is none                                                                                                                                        |
| `total`                 | `number`        | Hits across every document of the open set                                                                                                                                                           |
| `hasSearchableContent`  | `boolean`       | `false` with `total: 0` means there was nothing to read (a scan, a video, a container of them) — a different answer from a term simply absent, which is `total: 0` with `hasSearchableContent: true` |
| `next()` / `previous()` | `Promise<void>` | Displays the next/previous hit, changing document when it sits in another one                                                                                                                        |
| `dispose()`             | `void`          | Clears the search and retires the handle, without changing the displayed page. The same exit verb used everywhere else a handle is handed back — see [Events](#events)                               |

**A handle stops being usable once another search has started** — from here, or typed into the search bar — even before that new search resolves. Calling `next()` or `previous()` on it rejects with `STALE_HANDLE`, and the viewer does not jump back to a hit of the earlier term.

**Example**

```javascript
const hits = await window.ARender.search("signature");
if (hits.total === 0) {
    console.log(hits.hasSearchableContent ? "not found" : "nothing to read here");
}
await hits.next();
hits.dispose();
```

## Download

| Method               | Parameters                  | Returns         | Description                                                                   |
| -------------------- | --------------------------- | --------------- | ----------------------------------------------------------------------------- |
| `download(options?)` | `options?: DownloadOptions` | `Promise<void>` | Hands the open document to the user, as the viewer's own download button does |

`DownloadOptions` — **the defaults are not neutral**: a bare `download()` gives a PDF of the document on screen, with its annotations, kept editable.

| Option        | Values                                  | Default                              | Description                                                                                                                                                             |
| ------------- | --------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`      | `'pdf'` \| `'original'`                 | `'pdf'` where a rendered copy exists | `'original'` is the only variant that works on audio/video or a document the viewer couldn't render; it falls back to PDF on an annotated or redacted document          |
| `annotations` | `'editable'` \| `'flatten'` \| `'none'` | `'editable'`                         | Redactions ignore this option — always applied, text removed rather than covered                                                                                        |
| `documents`   | `'displayed'` \| `'all'`                | `'displayed'`                        | `'displayed'` is the document on screen, the active panel's in multi-view. `'all'` merges every document of the open set into one PDF, honouring each one's annotations |

```javascript
await window.ARender.download(); // PDF, annotated, editable
await window.ARender.download({ format: "original" }); // the source file
await window.ARender.download({ format: "pdf", documents: "all" }); // one merged PDF
```

Resolves once the file has been handed to the browser. A download already running is not queued — the call resolves without starting a second one.

## Annotations

`window.ARender.annotations` covers the annotations of the documents displayed in a panel. An annotation belongs to its document, not to a panel: a command given no document acts on the document on screen, and one given a document acts on it as long as a panel displays it.

Every command writes to the server as it is made — there is no save call and no draft to flush. A command whose write fails rejects with `SERVER_ERROR`. A write the user made in the viewer has no promise to reject: it is reported by the `annotations.writeFailed` event instead.

| Method                 | Parameters                                        | Returns           | Description                                                                                                                                                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `create(annotation)`   | `annotation: AnnotationInput`                     | `Promise<string>` | Places an annotation, returns its identifier. On the document on screen, or on the one `annotation.documentId` names                                                                                                                                                                                                                    |
| `update(id, changes)`  | `id: string`, `changes: Partial<AnnotationInput>` | `Promise<void>`   | Changes an annotation by identifier — only the given fields move. The identifier is looked up on every document displayed in a panel                                                                                                                                                                                                    |
| `delete(id)`           | `id: string`                                      | `Promise<void>`   | Removes an annotation by identifier, looked up on every document displayed in a panel                                                                                                                                                                                                                                                   |
| `get(page?)`           | `page?: number`                                   | `Annotation[]`    | Reads what the document on screen currently carries, or one page of it (0-based). Synchronous                                                                                                                                                                                                                                           |
| `get(query)`           | `query: AnnotationQuery`                          | `Annotation[]`    | Reads what a document displayed in a panel currently carries, or one page of it. Synchronous                                                                                                                                                                                                                                            |
| `refresh(documentId?)` | `documentId?: string`                             | `Promise<void>`   | Brings in annotations another system wrote through the Rendition REST API while the document was open. Adds rather than replaces — a failed write stays visible, an edit in progress survives. Reads any document of the open set, displayed or not; the annotation events report what it brings in only on a document a panel displays |

`AnnotationQuery` (passed to `get`):

| Field         | Type     | Description                                                           |
| ------------- | -------- | --------------------------------------------------------------------- |
| `documentId?` | `string` | Any document displayed in a panel. Defaults to the document on screen |
| `page?`       | `number` | 0-based. Omit it for every page                                       |

`get({documentId})` reads every page of a document, `get({documentId, page: 0})` its first page. `get` refuses with `UNSUPPORTED` anything that is neither a page nor a query — `null` and a bare document id included — and a page that is not a whole number.

When the other system writes to a document inside a container, its REST route writes the child identifier with `@` in place of `/` — `POST /documents/b64_xxxx@1/annotations`, not `b64_xxxx%2F1`. `refresh()` takes the identifier as `getCurrentDocumentId()` gives it, with its `/`.

`AnnotationInput` (passed to `create`):

| Field                       | Type                                      | Description                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `documentId?`               | `string`                                  | Any document displayed in a panel. Defaults to the document on screen. Refused with `NOT_FOUND` when no panel displays it                                                                                                                                                                                                                                            |
| `page`                      | `number`                                  | 0-based                                                                                                                                                                                                                                                                                                                                                              |
| `type`                      | `'highlight'` \| `'square'` \| `'circle'` | Only these three today — more annotation types are coming                                                                                                                                                                                                                                                                                                            |
| `x`, `y`, `width`, `height` | `number`                                  | Position/size in the page's own coordinate space — see [Coordinates](#coordinates)                                                                                                                                                                                                                                                                                   |
| `color?`                    | `string`                                  | `#rrggbb`, `rgb()`, `hsl()` or a colour name: `'#ffff00'`, `'rgb(255, 255, 0)'`, `'hsl(60, 100%, 50%)'`, `'yellow'`. An alpha channel is ignored — use `opacity`. Anything else is refused with `UNSUPPORTED`, including `transparent`, `currentcolor`, `oklch()`, `lab()` and `color()`. Defaults to the viewer's own default for that type. Read back as `#rrggbb` |
| `opacity?`                  | `number`                                  | 0 to 1. Defaults to the viewer's own default for that type                                                                                                                                                                                                                                                                                                           |
| `contents?`                 | `string`                                  | Note shown in the comment panel                                                                                                                                                                                                                                                                                                                                      |

`update` takes the same shape minus `type` (immutable once created) and `documentId` (an annotation does not move to another document), every field optional.

An `Annotation` read back (from `get()` or an event) adds: `id`, `documentId`, `creator` (`null` unless written by another system), and reads `type` as a plain `string` — wider than `CreatableAnnotationType`, since reading is not restricted.

### Coordinates

The same convention holds for every position of the API, read or written:

- **Unit:** the page's own size, as `getDocumentLayout().pageDimensions` gives it — `612 × 792` for a Letter PDF page. It does not change with the zoom or the window size.
- **Origin:** the top-left corner of the page. `x` grows to the right, `y` grows downwards.
- `{x: width / 2, y: height / 2, width: width / 2, height: height / 2}` is therefore the bottom-right quarter of the page.

**Example**

```javascript
const id = await window.ARender.annotations.create({
    page: 0,
    type: "highlight",
    x: 100,
    y: 200,
    width: 150,
    height: 20,
    color: "#FFEB3B",
    opacity: 0.5,
});
await window.ARender.annotations.update(id, { contents: "Check this clause" });
const onPage0 = window.ARender.annotations.get(0);
await window.ARender.annotations.delete(id);
```

**Example: annotate the document of a panel that is not active**

```javascript
const other = window.ARender.getViews().find((view) => !view.isActive);
await window.ARender.annotations.create({
    documentId: other.documentId,
    page: 0,
    type: "square",
    x: 50,
    y: 50,
    width: 100,
    height: 60,
});
const onOther = window.ARender.annotations.get({ documentId: other.documentId });
```

## Events

| Method                 | Description                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `on(event, handler)`   | Subscribes `handler` to `event`. Returns a `Disposable`; call `.dispose()` to unsubscribe    |
| `off(event, handler?)` | Unsubscribes `handler` from `event`. Without `handler`, removes every handler for that event |

Subscribing the same function to the same event twice creates two independent subscriptions — each has its own `Disposable`, so disposing one leaves the other active. `off(event, handler)`, by contrast, matches by **function identity** and removes every subscription of that function at once, not just the first. A `bind()`-wrapped function detaches nothing, since binding produces a new function identity. A handler that throws is reported and does not stop the others.

Every subscribable event:

| Event                         | Payload                                 | Fires                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page.changed`                | `{page, pageCount, documentId, viewId}` | Once when a document opens, then once per page the viewer **lands on** — never once per page crossed on the way. Also when another document is displayed, even at the same page number. Follows the active panel: it also fires when another panel becomes active, with that panel's `viewId`. A panel that is not active emits nothing, even when it is scrolled |
| `document.changed`            | `{documentId, title, viewId}`           | The document on screen changed — inside a container, a different child is displayed. Follows the active panel: it also fires when the panel that becomes active displays another document than the previous one                                                                                                                                                   |
| `document.loadFailed`         | `{code, message}`                       | A document could not be opened; the one on screen is left alone. Reports the request of `openDocument` or of the `document` attribute, which no panel owns. A document that fails inside a panel is read through `getDocumentLayout().kind`                                                                                                                       |
| `document.firstPageDisplayed` | `{documentId, duration}`                | The first page of a document appeared, `duration` in milliseconds from the request. Once per document opened. Displaying a document in another panel is not an open, and does not fire it                                                                                                                                                                         |
| `view.opened`                 | `{viewId, documentId}`                  | A panel was opened, by the user or by `openView`. Not fired for the first panel of a set: that panel comes with the set `openDocument` opens                                                                                                                                                                                                                      |
| `view.closed`                 | `{viewId}`                              | A panel was closed, by the user or by `closeView`. Exiting multi-view fires it once per panel closed. Opening another set with `openDocument` does not fire it                                                                                                                                                                                                    |
| `annotations.created`         | `{annotation}`                          | An annotation was drawn or created, once it is stored                                                                                                                                                                                                                                                                                                             |
| `annotations.updated`         | `{annotation}`                          | An annotation was changed — by the user or by `annotations.update`. Fires as the viewer displays the change, before the server confirms it; a change that then cannot be stored is reported by `annotations.writeFailed` (user) or a rejected `update` (host)                                                                                                     |
| `annotations.deleted`         | `{id, documentId}`                      | An annotation was removed — by the user or by `annotations.delete`, once the server has removed it                                                                                                                                                                                                                                                                |
| `annotations.writeFailed`     | `{annotation, reason}`                  | A write the user made in the viewer could not be stored. Once per annotation. `reason` is for a log, not for branching                                                                                                                                                                                                                                            |

The annotation events cover every document displayed in a panel, the active one or not: an annotation written in a panel the user is not on is reported when it happens. A document displayed in two panels reports each change once. They carry no `viewId`: an annotation belongs to its document.

Names follow `noun.pastVerb`: a command is imperative, an event is past tense, so no name ever means both "do it" and "it happened".

**Example**

```javascript
const sub = window.ARender.on("page.changed", (e) => {
    console.log("panel", e.viewId, "page", e.page, "of", e.pageCount);
});
// later
sub.dispose();
```

## TypeScript

The `arender-ui` package ships an ambient `arender.d.ts` declaring the full `ARender.Api` namespace, so `window.ARender` and `element.ARender` are typed without an import. See [Web Component — TypeScript](./web-component.md#typescript).

## Errors

Every rejected command shares the same shape: a standard `Error` with a `name` of `'ARenderError'` and a `code` a host branches on — never on `message`, whose wording can change.

```javascript
try {
    await window.ARender.goToPage(999);
} catch (err) {
    if (window.ARender.isError(err)) {
        console.log(err.code, err.message);
    }
}
```

| Code           | Meaning                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `NOT_READY`    | Nothing is open, its layout has not arrived yet, or its first panel is not open yet                                                    |
| `NOT_FOUND`    | The identifier given (document, annotation, panel) is not part of the open set, or not displayed in a panel where the command needs it |
| `OUT_OF_RANGE` | A page or document position outside what exists                                                                                        |
| `UNSUPPORTED`  | A value outside what the command accepts — unknown format, unlisted annotation type                                                    |
| `STALE_HANDLE` | A handle (search, open) another call has since replaced                                                                                |
| `SERVER_ERROR` | The request failed — the server answered with an error, or could not be reached                                                        |
| `FORBIDDEN`    | Reserved — nothing raises it yet, since the backend has no authorization model                                                         |

`isError()` is the only supported way to narrow a caught value (typed `unknown`) down to `code`.

## Related pages

- [Web Component](./web-component.md) — embedding, attributes, and the parameter contract
- [Opening documents](../guides/features/opening-documents.md) — every supported way to request a document
- [Annotations](../concepts/annotations.md) — the XFDF model behind `annotations.*`
- [Migration from Classic](../guides/upgrade/migration-from-gwt.md) — mapping from `arender.jsapi.*` to `window.ARender.*`
