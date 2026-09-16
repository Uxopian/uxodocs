---
viewer: horizon
title: JavaScript API
last_update:
  date: '2026-09-16T08:47:11.000Z'
  author: CI/CD Bot
slug: /reference/javascript-api
sidebar_position: 3
content_hash: 7dee0349d15dadd5e01a27a9dd893ac66fadb4214b5730db1fd5c19b4b1413f1
---

# JavaScript API

The ARender Horizon API is exposed in two ways:

- **On the window object:** `window.ARender`
- **On the element instance:** `element.ARender` (useful when multiple viewers are on the same page)

Calls made before the viewer finishes mounting are queued automatically — no need to wait for any event. Only one viewer per page is supported: two `<arender-element>` tags share one API and one state.

The surface is deliberately small: reads are synchronous, actions return a promise, and there is exactly one namespaced group (`annotations`) — the one genuine collection in the contract. Compared to the GWT viewer's `arender.jsapi.*`, most concepts collapse into a single flat object. See [Migration from GWT](../guides/upgrade/migration-from-gwt.md) for the full concept mapping.

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

| Code | Meaning |
|------|---------|
| `NOT_READY` | Nothing is open, or its layout has not arrived yet |
| `NOT_FOUND` | The identifier given (document, annotation) is not part of the open set |
| `OUT_OF_RANGE` | A page or document position outside what exists |
| `UNSUPPORTED` | A value outside what the command accepts — unknown format, unlisted annotation type |
| `STALE_HANDLE` | A handle (search, open) another call has since replaced |
| `SERVER_ERROR` | The request reached the server, and the server failed |
| `FORBIDDEN` | Reserved — nothing raises it yet, since the backend has no authorization model |

`isError()` is the only supported way to narrow a caught value (typed `unknown`) down to `code`.

## Document reading and navigation

| Method | Returns | Description |
|--------|---------|--------------|
| `version` | `string` | Build/app version |
| `openDocument(params)` | `Promise<void>` | Opens a document from a query string of parameters. Resolves once the document is displayed. See [Web Component](./web-component.md#javascript-api) and [Opening documents](../guides/features/opening-documents.md) |
| `getCurrentDocumentId()` | `string \| null` | The document on screen — inside a container, the displayed child. `null` if nothing is open |
| `getRootDocumentId()` | `string \| null` | The root of the open set. Equal to the current one on a single document |
| `getDocumentLayout(documentId?)` | `DocumentLayout` | Title, kind, pages and children of a document. With no argument, answers about the document on screen |
| `getDocumentMetadata(documentId?)` | `Promise<Record<string, string>>` | Repository metadata fields for a document. Asynchronous — unlike the other reads, it calls the server |
| `goToPage(page)` | `Promise<void>` | Displays a page of the document on screen. **0-based** — the viewer's own page field is one higher |
| `goToDocument(documentId)` | `Promise<void>` | Displays a document of the open set, at its first page |
| `nextDocument()` / `previousDocument()` | `Promise<void>` | Steps to the next/previous document of the open set. Already bound to Ctrl + arrow keys inside the viewer |

`getDocumentLayout()` returns:

| Property | Type | Description |
|----------|------|--------------|
| `documentId` | `string` | — |
| `title` | `string \| null` | — |
| `kind` | `'document' \| 'container' \| 'video' \| 'reference' \| 'error'` | `'video'` has no pages to count; `'reference'` is a container child whose own layout hasn't landed yet; an unknown backend type reads as `'document'` |
| `pageDimensions` | `PageDimension[]` | `{width, height, rotation}` per page, empty on a container or a failed document |
| `children` | `DocumentLayout[]` | Present on a container only, already resolved — nothing to loop over and refetch |
| `error` | `{code?, message?}` | Present when this document could not be resolved; its siblings are still listed |

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

| Method | Returns | Description |
|--------|---------|--------------|
| `search(text)` | `Promise<SearchHandle>` | Searches every document of the open set — not only the one on screen — and displays the first hit. Shows the term in the search bar as if typed there |

`SearchHandle`:

| Member | Type | Description |
|--------|------|--------------|
| `position` | `number` | 1-based position of the hit on screen, `0` when there is none |
| `total` | `number` | Hits across every document of the open set |
| `hasSearchableContent` | `boolean` | `false` with `total: 0` means there was nothing to read (a scan, a video, a container of them) — a different answer from a term simply absent, which is `total: 0` with `hasSearchableContent: true` |
| `next()` / `previous()` | `Promise<void>` | Displays the next/previous hit, changing document when it sits in another one |
| `dispose()` | `void` | Clears the search and retires the handle, without changing the displayed page. The same exit verb used everywhere else a handle is handed back — see [Events](#events) |

The search bar and this API are two entry points for the same search: `position`/`total` follow whatever was searched last, from either one. The advanced options of the GWT viewer (case, accent, regex, scope) are not available here — nothing reads them.

**A handle stops being usable once another search has started** — from here, or typed into the search bar — even before that new search resolves. Calling `next()` or `previous()` on it rejects with `STALE_HANDLE`, and the viewer does not jump back to a hit of the earlier term.

**Example**

```javascript
const hits = await window.ARender.search('signature');
if (hits.total === 0) {
  console.log(hits.hasSearchableContent ? 'not found' : 'nothing to read here');
}
await hits.next();
hits.dispose();
```

## Download

| Method | Returns | Description |
|--------|---------|--------------|
| `download(options?)` | `Promise<void>` | Hands the open document to the user, as the viewer's own download button does |

`DownloadOptions` — **the defaults are not neutral**: a bare `download()` gives a PDF of the document on screen, with its annotations, kept editable.

| Option | Values | Default | Description |
|--------|--------|---------|--------------|
| `format` | `'pdf'` \| `'original'` | `'pdf'` where a rendered copy exists | `'original'` is the only variant that works on audio/video or a document the viewer couldn't render; it falls back to PDF on an annotated or redacted document |
| `annotations` | `'editable'` \| `'flatten'` \| `'none'` | `'editable'` | Redactions ignore this option — always applied, text removed rather than covered |
| `documents` | `'displayed'` \| `'all'` | `'displayed'` | `'all'` merges every document of the open set into one PDF, honouring each one's annotations |

```javascript
await window.ARender.download();                                  // PDF, annotated, editable
await window.ARender.download({ format: 'original' });             // the source file
await window.ARender.download({ format: 'pdf', documents: 'all' }); // one merged PDF
```

Resolves once the file has been handed to the browser. A download already running is not queued — the call resolves without starting a second one.

## Annotations

`window.ARender.annotations` covers the annotations of the open document. Every command writes to the server as it is made — there is no save call and no draft to flush. A write that never reaches the server surfaces through the `annotations.writeFailed` event, not through a rejected promise.

| Method | Returns | Description |
|--------|---------|--------------|
| `create(annotation)` | `Promise<string>` | Places an annotation, returns its identifier |
| `update(id, changes)` | `Promise<void>` | Changes an annotation by identifier — only the given fields move |
| `delete(id)` | `Promise<void>` | Removes an annotation by identifier |
| `get(page?)` | `Annotation[]` | Reads what the document currently carries, or one page of it (0-based). Synchronous |
| `refresh(documentId?)` | `Promise<void>` | Brings in annotations another system wrote through the Rendition REST API while the document was open. Adds rather than replaces — a failed write stays visible, an edit in progress survives |

`AnnotationInput` (passed to `create`):

| Field | Type | Description |
|-------|------|--------------|
| `page` | `number` | 0-based |
| `type` | `'highlight'` \| `'square'` \| `'circle'` | Deliberately closed: redactions carry reasons/security levels from the document's annotation policy, free text needs content/font handling — neither fits a five-field call |
| `x`, `y`, `width`, `height` | `number` | Position/size in the page's own coordinate space, at natural size |
| `color?` | `string` | CSS colour. Defaults to the viewer's own default for that type |
| `opacity?` | `number` | 0 to 1. Defaults to the viewer's own default for that type |
| `contents?` | `string` | Note shown in the comment panel |

`update` takes the same shape minus `type` (immutable once created), every field optional.

An `Annotation` read back (from `get()` or an event) adds: `id`, `documentId`, `creator` (`null` unless written by another system), and reads `type` as a plain `string` — wider than `CreatableAnnotationType`, since reading is not restricted.

**Example**

```javascript
const id = await window.ARender.annotations.create({
  page: 0, type: 'highlight',
  x: 100, y: 200, width: 150, height: 20,
  color: '#FFEB3B', opacity: 0.5,
});
await window.ARender.annotations.update(id, { contents: 'Check this clause' });
const onPage0 = window.ARender.annotations.get(0);
await window.ARender.annotations.delete(id);
```

## Events

| Method | Description |
|--------|--------------|
| `on(event, handler)` | Subscribes to an event, returns a `Disposable`. Subscribing the same function twice counts twice — each subscription detaches on its own. A handler that throws is reported and does not stop the others |
| `off(event, handler?)` | Detaches by **function identity** (a `bind()`-wrapped function detaches nothing). With no handler, detaches every subscription of that event |

Every subscribable event:

| Event | Payload | Fires |
|-------|---------|-------|
| `page.changed` | `{page, pageCount}` | Once when a document opens, then once per page the viewer **lands on** — never once per page crossed on the way |
| `document.changed` | `{documentId, title}` | The document on screen changed — inside a container, a different child is displayed |
| `document.loadFailed` | `{code, message}` | A document could not be opened; the one on screen is left alone |
| `document.firstPageDisplayed` | `{documentId, duration}` | The first page of a document appeared, `duration` in milliseconds from the request. Once per document opened |
| `annotations.created` | `{annotation}` | An annotation was drawn or created, once it is stored |
| `annotations.updated` | `{annotation}` | — |
| `annotations.deleted` | `{id, documentId}` | — |
| `annotations.writeFailed` | `{annotation, reason}` | A write the viewer could not store, reported once it has stopped retrying |

Names follow `noun.pastVerb`: a command is imperative, an event is past tense, so no name ever means both "do it" and "it happened".

**Example**

```javascript
const sub = window.ARender.on('page.changed', (e) => {
  console.log('page', e.page, 'of', e.pageCount);
});
// later
sub.dispose();
```

## TypeScript

The `arender-ui` package ships an ambient `arender.d.ts` declaring the full `ARender.Api` namespace, so `window.ARender` and `element.ARender` are typed without an import. See [Web Component — TypeScript](./web-component.md#typescript).

## Related pages

- [Web Component](./web-component.md) — embedding, attributes, and the parameter contract
- [Opening documents](../guides/features/opening-documents.md) — every supported way to request a document
- [Annotations](../concepts/annotations.md) — the XFDF model behind `annotations.*`
- [Migration from GWT](../guides/upgrade/migration-from-gwt.md) — mapping from `arender.jsapi.*` to `window.ARender.*`
