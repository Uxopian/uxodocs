---
viewer: modern
slug: /reference/web-component
title: Web Component
last_update:
  date: '2026-03-24T08:07:20.846Z'
  author: CI/CD Bot
sidebar_position: 3
content_hash: 59def1bdbf176d9b0eee692e9d7293e2cebc3f7b82da6f656e58e4795d78d936
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
