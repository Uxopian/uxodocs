---
viewer: horizon
slug: /reference/web-component
title: Web Component
last_update:
  date: '2026-09-29T08:59:40.609Z'
  author: CI/CD Bot
sidebar_position: 3
content_hash: 2485083b26a73874e08a708a084ffa7faa234f51f0889b3f6f07cbd1e3e8cb1e
---

# Web Component

The ARender viewer is delivered as a Web Component: `<arender-element>`. It wraps the React 19 application using [`@r2wc/react-to-web-component`](https://github.com/nicknisi/react-to-web-component), which means any web application can embed the viewer without requiring React as a dependency.

## Basic usage

```html
<arender-element
  id="viewer"
  rendition="/"
  style="display: block; width: 100%; height: 100vh"
></arender-element>

<script type="module">
  document.getElementById('viewer')
    .setAttribute('document', 'url=' + encodeURIComponent('https://example.com/document.pdf'))

  import('arender-ui')
</script>
```

In a framework, bind the attribute instead:

```jsx
<arender-element rendition="/" document={`url=${encodeURIComponent(docUrl)}`} />
```

Either way, `encodeURIComponent` does the escaping — see [Parameter contract](#parameter-contract).

:::note
The component has no intrinsic height — you must set a height explicitly (e.g. `height: 100vh` or a fixed pixel value), otherwise it will not be displayed correctly.
:::

## HTML attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `rendition` | Yes | URL of the ARender rendition backend. Use `/` when proxied via Nginx or Ingress. |
| `document` | No | Query string of the parameters identifying the document to open on startup. See [Parameter contract](#parameter-contract). |

The `document` attribute is read **once, when the component mounts**. Changing its value afterwards has no effect — to display another document at runtime, call [`openDocument()`](#javascript-api).

Its value follows the same rules as the JavaScript API, encoding included, so build it with `encodeURIComponent` rather than pasting a raw URL. A plain HTML attribute cannot compute its own value: either percent-encode it by hand, or set it from a script before importing `arender-ui`, as shown above.

:::note
The `rendition` attribute carries the backend location only. Document parameters appended to it are ignored.
:::

## JavaScript API

The ARender API is exposed in two ways:
- **On the window object:** `window.ARender`
- **On the element instance:** `element.ARender` (useful when multiple viewers are on the same page)

Calls made before the viewer finishes mounting are queued automatically — no need to wait for any event.

A command the user is not allowed to perform is refused rather than silently ignored: it throws — or rejects, for an asynchronous command — an `ARenderError` carrying a `code`, so a host can branch on it.

```javascript
try {
  await window.ARender.someCommand(/* ... */);
} catch (error) {
  if (error.code === 'FORBIDDEN') {
    // the user is not allowed to perform this command
  }
}
```

Horizon has no general rights model today, so for most commands this describes the contract rather than an implemented restriction. Annotation commands are the exception: they are gated by the rights the annotation policy returns, so `FORBIDDEN` is an actual outcome there.

See the [JavaScript API reference](./javascript-api.md) for the full command list, starting with [`openDocument`](./javascript-api.md#opening-a-document).

## Parameter contract

Both entry points — the `document` attribute and `openDocument(params)` — take the same thing: **a query string of the parameters that identify your document**. The viewer does not interpret it. It forwards it verbatim to the backend, which resolves it into an ARender document ID.

See [Providers](../guides/integration/providers.md) for the parameters each repository expects.

### Encoding URL

The viewer never decodes and re-encodes the string, so **every value must be URL-encoded by the caller**. In exchange, values are transmitted byte for byte: a signature, a token, or a nested query string survives untouched.

```javascript
const signedUrl = 'https://bucket.s3.amazonaws.com/doc.pdf?X-Amz-Signature=abc123&X-Amz-Expires=900';
window.ARender.openDocument('url=' + encodeURIComponent(signedUrl));
```

Without `encodeURIComponent`, the separators inside the value are read as parameter separators and the request is silently corrupted:

```javascript
// Wrong — the backend receives two parameters, "url" and "v"
window.ARender.openDocument('url=http://example.com/get?id=1&v=2');
```

### Repeated parameters keep their order

Parameters are grouped by key, and each key keeps its own order. Two parallel lists therefore stay paired by index, which is how repositories such as FileNet or M-Files open several files at once:

```javascript
window.ARender.openDocument('objectType=0&docId=534&fileId=576&fileId=977&title=a.pdf&title=b.pdf');
```

### `uuid` is a reserved parameter name

A lone `uuid` parameter means the document is **already resolved**: its value is an ARender document ID, which the viewer uses as-is. No repository call is made.

Because of this, a repository must never use `uuid` as one of its own parameter names: no provider knows that name, and forwarding it produces an opaque backend error.

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
await viewer.ARender.openDocument('url=' + encodeURIComponent('https://example.com/document.pdf'));
```

## Related pages

- [Opening documents](../guides/features/opening-documents.md): every supported way to request a document
- [Providers](../guides/integration/providers.md): the parameters each repository expects
