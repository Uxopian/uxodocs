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

The ARender viewer is delivered as a Web Component: `<arender-element>`. It wraps the React 19 application using [`@r2wc/react-to-web-component`](https://github.com/nicknisi/react-to-web-component), which means any web application can embed the viewer without requiring React as a dependency.

## Basic usage

```html
<arender-element
  rendition="/"
  url="https://example.com/document.pdf"
  style="display: block; width: 100%; height: 100vh"
></arender-element>

<script type="module">
  import('arender-ui')
</script>
```

:::note
The component has no intrinsic height — you must set a height explicitly (e.g. `height: 100vh` or a fixed pixel value), otherwise it will not be displayed correctly.
:::

## HTML attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `rendition` | Yes | URL of the ARender rendition backend. Use `/` when proxied via Nginx or Ingress. |
| `url` | No | URL of the document to open on startup. |
| `uuid` | No | ARender document ID to open on startup. Alternative to `url`. |

Set `url` or `uuid` as HTML attributes to open a document on load — no JavaScript needed. To change the document at runtime, use the [JavaScript API](#javascript-api).

## JavaScript API

The ARender API is exposed in two ways:
- **On the window object:** `window.ARender`
- **On the element instance:** `element.ARender` (useful when multiple viewers are on the same page)

Calls made before the viewer finishes mounting are queued automatically — no need to wait for any event.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `openDocumentByUrl(url)` | `Promise<void>` | Open a document from a URL |
| `openDocument(documentId)` | `Promise<void>` | Open a document by its ARender document ID |

### Examples

```javascript
// Via the window global
window.ARender.openDocumentByUrl('https://example.com/document.pdf');

// Via the element instance
const viewer = document.querySelector('arender-element');
viewer.ARender.openDocumentByUrl('https://example.com/document.pdf');
```

## Loading the package

Use a dynamic `import()` inside a lifecycle hook rather than a static top-level import. This is required for **SSR compatibility**: `arender-ui` registers a Web Component using browser APIs (`window`, `document`, `customElements`) that do not exist in Node.js. A static import would crash the build in SSR frameworks like Next.js, Nuxt, or SvelteKit.

```ts
// SSR-safe — use inside useEffect, onMounted, etc.
import('arender-ui')

// Static import — only if your app is purely client-side (no SSR)
import 'arender-ui'
```

## Styling

The component renders in the light DOM, so standard CSS applies. Always set an explicit height:

```css
arender-element {
  display: block;
  width: 100%;
  height: 100vh; /* Required — the component has no intrinsic height */
}
```

## TypeScript

The `arender-ui` package exports the `ARenderHTMLElement` type for typed access:

```typescript
import type { ARenderHTMLElement } from 'arender-ui';

const viewer = document.querySelector('arender-element') as ARenderHTMLElement;
await viewer.ARender.openDocumentByUrl('https://example.com/document.pdf');
```
 
