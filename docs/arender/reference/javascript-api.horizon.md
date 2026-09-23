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

Two conventions hold across the API: reads are synchronous, and actions return a promise. Annotation methods are grouped under `annotations`, because annotations are a collection with symmetric operations (create, read, update, delete); every other command is a single action and sits directly on the root object.

Coming from the Classic viewer's `arender.jsapi.*`? See [Migration from Classic](../guides/upgrade/migration-from-gwt.md) for the concept mapping.

## Document reading and navigation

| Method                                  | Parameters            | Returns                           | Description                                                                                                                                                                                                          |
| --------------------------------------- | --------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `version`                               | —                     | `string`                          | Build/app version                                                                                                                                                                                                    |
| `openDocument(params)`                  | `params: string`      | `Promise<void>`                   | Opens a document from a query string of parameters. Resolves once the document is displayed. See [Web Component](./web-component.md#javascript-api) and [Opening documents](../guides/features/opening-documents.md) |
| `getCurrentDocumentId()`                | —                     | `string \| null`                  | The document on screen — inside a container, the displayed child. `null` if nothing is open                                                                                                                          |
| `getRootDocumentId()`                   | —                     | `string \| null`                  | The root of the open set. Equal to the current one on a single document                                                                                                                                              |
| `getDocumentLayout(documentId?)`        | `documentId?: string` | `DocumentLayout`                  | Title, kind, pages and children of a document. With no argument, answers about the document on screen                                                                                                                |
| `getDocumentMetadata(documentId?)`      | `documentId?: string` | `Promise<Record<string, string>>` | Repository metadata fields for a document. Asynchronous — unlike the other reads, it calls the server                                                                                                                |
| `goToPage(page)`                        | `page: number`        | `Promise<void>`                   | Displays a page of the document on screen. **0-based** — the viewer's own page field is one higher                                                                                                                   |
| `goToDocument(documentId)`              | `documentId: string`  | `Promise<void>`                   | Displays a document of the open set, at its first page                                                                                                                                                               |
| `nextDocument()` / `previousDocument()` | —                     | `Promise<void>`                   | Steps to the next/previous document of the open set. Already bound to Ctrl + arrow keys inside the viewer                                                                                                            |

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

## Search commands

| Method         | Parameters     | Returns                 | Description                                                                                                                                                                                             |
| -------------- | -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `search(text)` | `text: string` | `Promise<SearchHandle>` | Searches every document of the open set — not only the one on screen — and displays the first hit. Plain text only: the Classic viewer's advanced options (case, accent, regex, scope) aren't available |

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

| Option        | Values                                  | Default                              | Description                                                                                                                                                    |
| ------------- | --------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`      | `'pdf'` \| `'original'`                 | `'pdf'` where a rendered copy exists | `'original'` is the only variant that works on audio/video or a document the viewer couldn't render; it falls back to PDF on an annotated or redacted document |
| `annotations` | `'editable'` \| `'flatten'` \| `'none'` | `'editable'`                         | Redactions ignore this option — always applied, text removed rather than covered                                                                               |
| `documents`   | `'displayed'` \| `'all'`                | `'displayed'`                        | `'all'` merges every document of the open set into one PDF, honouring each one's annotations                                                                   |

```javascript
await window.ARender.download(); // PDF, annotated, editable
await window.ARender.download({ format: "original" }); // the source file
await window.ARender.download({ format: "pdf", documents: "all" }); // one merged PDF
```

Resolves once the file has been handed to the browser. A download already running is not queued — the call resolves without starting a second one.

## Annotations

`window.ARender.annotations` covers the annotations of the open document. Every command writes to the server as it is made — there is no save call and no draft to flush. A command whose write fails rejects with `SERVER_ERROR`. A write the user made in the viewer has no promise to reject: it is reported by the `annotations.writeFailed` event instead.

| Method                 | Parameters                                        | Returns           | Description                                                                                                                                                                                   |
| ---------------------- | ------------------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `create(annotation)`   | `annotation: AnnotationInput`                     | `Promise<string>` | Places an annotation, returns its identifier                                                                                                                                                  |
| `update(id, changes)`  | `id: string`, `changes: Partial<AnnotationInput>` | `Promise<void>`   | Changes an annotation by identifier — only the given fields move                                                                                                                              |
| `delete(id)`           | `id: string`                                      | `Promise<void>`   | Removes an annotation by identifier                                                                                                                                                           |
| `get(page?)`           | `page?: number`                                   | `Annotation[]`    | Reads what the document currently carries, or one page of it (0-based). Synchronous                                                                                                           |
| `refresh(documentId?)` | `documentId?: string`                             | `Promise<void>`   | Brings in annotations another system wrote through the Rendition REST API while the document was open. Adds rather than replaces — a failed write stays visible, an edit in progress survives |

When the other system writes to a document inside a container, its REST route writes the child identifier with `@` in place of `/` — `POST /documents/b64_xxxx@1/annotations`, not `b64_xxxx%2F1`. `refresh()` takes the identifier as `getCurrentDocumentId()` gives it, with its `/`.

`AnnotationInput` (passed to `create`):

| Field                       | Type                                      | Description                                                                                                                                                                                                                                                                 |
| --------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page`                      | `number`                                  | 0-based                                                                                                                                                                                                                                                                     |
| `type`                      | `'highlight'` \| `'square'` \| `'circle'` | Only these three today — more annotation types are coming                                                                                                                                                                                                                   |
| `x`, `y`, `width`, `height` | `number`                                  | Position/size in the page's own coordinate space — see [Coordinates](#coordinates)                                                                                                                                                                                          |
| `color?`                    | `string`                                  | Any CSS colour: `'#ffff00'`, `'rgb(255, 255, 0)'`, `'hsl(60, 100%, 50%)'`, `'yellow'`. An alpha channel is ignored — use `opacity`. A string that is not a colour is refused with `UNSUPPORTED`. Defaults to the viewer's own default for that type. Read back as `#rrggbb` |
| `opacity?`                  | `number`                                  | 0 to 1. Defaults to the viewer's own default for that type                                                                                                                                                                                                                  |
| `contents?`                 | `string`                                  | Note shown in the comment panel                                                                                                                                                                                                                                             |

`update` takes the same shape minus `type` (immutable once created), every field optional.

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

## Events

| Method                 | Description                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `on(event, handler)`   | Subscribes `handler` to `event`. Returns a `Disposable`; call `.dispose()` to unsubscribe    |
| `off(event, handler?)` | Unsubscribes `handler` from `event`. Without `handler`, removes every handler for that event |

Subscribing the same function to the same event twice creates two independent subscriptions — each has its own `Disposable`, so disposing one leaves the other active. `off(event, handler)`, by contrast, matches by **function identity** and removes every subscription of that function at once, not just the first. A `bind()`-wrapped function detaches nothing, since binding produces a new function identity. A handler that throws is reported and does not stop the others.

Every subscribable event:

| Event                         | Payload                  | Fires                                                                                                                                                                                                                                                         |
| ----------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page.changed`                | `{page, pageCount}`      | Once when a document opens, then once per page the viewer **lands on** — never once per page crossed on the way                                                                                                                                               |
| `document.changed`            | `{documentId, title}`    | The document on screen changed — inside a container, a different child is displayed                                                                                                                                                                           |
| `document.loadFailed`         | `{code, message}`        | A document could not be opened; the one on screen is left alone                                                                                                                                                                                               |
| `document.firstPageDisplayed` | `{documentId, duration}` | The first page of a document appeared, `duration` in milliseconds from the request. Once per document opened                                                                                                                                                  |
| `annotations.created`         | `{annotation}`           | An annotation was drawn or created, once it is stored                                                                                                                                                                                                         |
| `annotations.updated`         | `{annotation}`           | An annotation was changed — by the user or by `annotations.update`. Fires as the viewer displays the change, before the server confirms it; a change that then cannot be stored is reported by `annotations.writeFailed` (user) or a rejected `update` (host) |
| `annotations.deleted`         | `{id, documentId}`       | An annotation was removed — by the user or by `annotations.delete`, once the server has removed it                                                                                                                                                            |
| `annotations.writeFailed`     | `{annotation, reason}`   | A write the user made in the viewer could not be stored. Once per annotation. `reason` is for a log, not for branching                                                                                                                                        |

Names follow `noun.pastVerb`: a command is imperative, an event is past tense, so no name ever means both "do it" and "it happened".

**Example**

```javascript
const sub = window.ARender.on("page.changed", (e) => {
    console.log("page", e.page, "of", e.pageCount);
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

| Code           | Meaning                                                                             |
| -------------- | ----------------------------------------------------------------------------------- |
| `NOT_READY`    | Nothing is open, or its layout has not arrived yet                                  |
| `NOT_FOUND`    | The identifier given (document, annotation) is not part of the open set             |
| `OUT_OF_RANGE` | A page or document position outside what exists                                     |
| `UNSUPPORTED`  | A value outside what the command accepts — unknown format, unlisted annotation type |
| `STALE_HANDLE` | A handle (search, open) another call has since replaced                             |
| `SERVER_ERROR` | The request failed — the server answered with an error, or could not be reached     |
| `FORBIDDEN`    | Reserved — nothing raises it yet, since the backend has no authorization model      |

`isError()` is the only supported way to narrow a caught value (typed `unknown`) down to `code`.

## Related pages

- [Web Component](./web-component.md) — embedding, attributes, and the parameter contract
- [Opening documents](../guides/features/opening-documents.md) — every supported way to request a document
- [Annotations](../concepts/annotations.md) — the XFDF model behind `annotations.*`
- [Migration from Classic](../guides/upgrade/migration-from-gwt.md) — mapping from `arender.jsapi.*` to `window.ARender.*`
