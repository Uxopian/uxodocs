---
title: Web Component
sidebar_position: 3
---

# Web Component

The React UI is delivered as a standard Web Component: `<arender-element>`. Under the hood, the React 19 application is wrapped using [`@r2wc/react-to-web-component`](https://github.com/nicknisi/react-to-web-component) and registered on `customElements`. This means any web application can embed the viewer without requiring React as a dependency in the host application.

## Basic usage

```html
<arender-element></arender-element>

<script type="module">
  import 'arender-ui';
</script>

<style>
  arender-element {
    display: block;
    width: 100%;
    height: 100vh;
  }
</style>
```

## HTML attributes

All HTML attributes set on `<arender-element>` are forwarded as props to the React application.

```html
<arender-element
  document-id="your-document-id"
></arender-element>
```

## JavaScript API

The ARender API is exposed in two ways:

1. **On the element instance:** `element.ARender`
2. **On the window object:** `window.ARender`

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `openDocument(documentId)` | `Promise<void>` | Open a document by its ARender document ID |
| `openDocumentByUrl(url)` | `Promise<void>` | Open a document from a URL |

### Examples

```javascript
// Get a reference to the element
const viewer = document.querySelector('arender-element');

// Open a document by URL
await viewer.ARender.openDocumentByUrl('https://example.com/document.pdf');

// Open a document by ID
await viewer.ARender.openDocument('some-document-id');

// The global API works the same way
await window.ARender.openDocumentByUrl('https://example.com/document.pdf');
```

### Differences from the GWT API

| GWT API (`arender.jsapi`) | React UI API (`window.ARender`) |
|---------------------------|-------------------------------|
| `openDocument(id)` | `openDocument(id)` |
| `openDocumentUrl(url)` | `openDocumentByUrl(url)` |
| `zoomJSAPI.*` | Not yet exposed |
| `searchJSAPI.*` | Not yet exposed |
| `annotationJSAPI.*` | Not yet exposed |
| `documentBuilder.*` | Not yet available |
| `documentCompare.*` | Not yet available |

The React UI API surface is expanding with each release. Features marked "Not yet exposed" have internal implementations and will be added to the public API in upcoming versions.

## Multiple instances

When multiple `<arender-element>` instances are on the same page, the last instance's API overrides the `window.ARender` global reference. Use the element-level API (`element.ARender`) to target a specific viewer instance.

## Styling

The Web Component renders in the light DOM, so standard CSS applies:

```css
arender-element {
  display: block;
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
}
```

## TypeScript

The `arender-ui` package exports the `ARenderHTMLElement` type for typed access:

```typescript
import type { ARenderHTMLElement } from 'arender-ui';

const viewer = document.querySelector('arender-element') as ARenderHTMLElement;
await viewer.ARender.openDocument('doc-id');
```
