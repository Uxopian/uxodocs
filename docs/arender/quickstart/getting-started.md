---
viewer: horizon
slug: /quickstart/getting-started
title: Getting started
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
sidebar_position: 2
content_hash: da284353a48fd4318c0c9e6fb7a54d0dfea9fec9417c424033aca159e4da782f
---

# Getting started with the React UI

This guide walks you through integrating the ARender viewer into your own application — step by step, from installation to displaying your first document in the browser.

The ARender viewer is distributed as the `arender-ui` npm package. It registers an `<arender-element>` Web Component that integrates into any framework — React, Angular, Vue, Svelte, or plain HTML. The viewer communicates with the ARender rendition backend over REST.

**Don't have a project yet?** You can create a fresh React application to follow along:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
```

Then continue with the steps below.

## Prerequisites

- Node.js 20+ and a package manager (npm or yarn)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Step 1 — Install the ARender package

Open a terminal at the root of your project and install the `arender-ui` package:

```bash
npm install arender-ui@{{version}} --registry=https://npm.cloudsmith.io/uxopian/uxopian-public
```

## Step 2 — Configure the dev server proxy

The viewer needs to reach the rendition backend. In development, your dev server's built-in proxy handles this — no external reverse proxy needed.

:::note
Uxopian provides a shared demo rendition backend at `https://rendition.arender.2026.uxopian.com` — available to all, no credentials or installation required. This lets you test the viewer right away. Deploying your own backend is covered in the [Installation](../installation/docker-compose.md) section.
:::

<Tabs>
<TabItem value="vite" label="Vite (React / Vue / Svelte)">

Add the following proxy configuration to `vite.config.ts`:

```ts title="vite.config.ts"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/documents': {
        target: 'https://rendition.arender.2026.uxopian.com',
        changeOrigin: true,
      },
      '/registry/documents': {
        target: 'https://rendition.arender.2026.uxopian.com',
        changeOrigin: true,
      },
    },
  },
})
```

</TabItem>
<TabItem value="angular" label="Angular">

Create a `proxy.conf.json` file at the root of your project:

```json title="proxy.conf.json"
{
  "/documents":          { "target": "https://rendition.arender.2026.uxopian.com", "changeOrigin": true },
  "/registry/documents": { "target": "https://rendition.arender.2026.uxopian.com", "changeOrigin": true }
}
```

Then reference it in `angular.json` under `serve.options`:

```json title="angular.json"
"serve": {
  "options": {
    "proxyConfig": "proxy.conf.json"
  },
  ...
}
```

Restart `ng serve` — the proxy is active immediately.

</TabItem>
</Tabs>

:::tip
To connect to your own backend instead of the demo, change each `target` to your backend URL (e.g. `http://localhost:8761` for Docker Compose). In production, replace the dev proxy with a reverse proxy (Nginx, Ingress) or a BFF. See [Docker Compose](../installation/docker-compose.md) for deployment guides.

For other frameworks (Next.js, Nuxt, CRA, webpack…), configure your dev server proxy to forward `/documents` and `/registry/documents` to the rendition backend. Annotation requests are served under `/documents/{documentId}/annotations`, so they are covered by the `/documents` prefix. Refer to your framework's documentation.
:::

## Step 3 — Embed the viewer

The `<arender-element>` is a Web Component — a standard HTML element you can drop into any template or JSX just like a `<video>` or `<input>`. It encapsulates the entire ARender viewer: no JavaScript instantiation required to display it. You configure it through HTML attributes.

### Web Component attributes

The table below lists the attributes you can set directly on the element:

| Attribute | Required | Description |
|-----------|----------|-------------|
| `rendition` | Yes | URL of the ARender rendition backend. Use `/` when proxied with Vite, or `http://localhost:4200/` with Angular (see Step 3). |
| `document` | No | Query string of the parameters identifying the document to open on startup, e.g. `url=https://example.com/doc.pdf`. |

Set `document` directly as an HTML attribute to open a document on startup — no JavaScript needed. The attribute is read once, when the component mounts.
To load a different document at runtime, use the [JavaScript API](#step-5--load-a-document-dynamically).

:::note
The `document` attribute takes the same query string as the JavaScript API: `url=…` for a document reachable over HTTP, `uuid=…` for an already-resolved ARender document ID, or the parameters your repository expects.

Every value must be URL-encoded, so bind the attribute instead of hardcoding it — ``document={`url=${encodeURIComponent(docUrl)}`}`` — and let `encodeURIComponent` do the escaping. See [Web Component → Parameter contract](../reference/web-component.md#parameter-contract).
:::


<Tabs>
<TabItem value="react" label="React">

Copy the following into your `src/App.tsx` file, replacing its entire contents:

```tsx title="src/App.tsx"
import { useEffect } from 'react'
import type { ARenderHTMLElement } from 'arender-ui'

// Move these declarations to a global.d.ts in a real project
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'arender-element': React.HTMLAttributes<HTMLElement> & {
        rendition?: string
        document?: string
      }
    }
  }
}
declare global {
  interface Window { ARender: ARenderHTMLElement }
}

const DOC_URL = 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf'

function App() {
  useEffect(() => { import('arender-ui') }, [])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <arender-element
        rendition="/"
        document={`url=${encodeURIComponent(DOC_URL)}`}
      />
    </div>
  )
}

export default App
```

</TabItem>
<TabItem value="vue" label="Vue">

Copy the following into your `src/App.vue` file, replacing its entire contents:

```html title="App.vue"
<script setup lang="ts">
import { onMounted } from 'vue'

const DOC_URL = 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf'
const documentParams = `url=${encodeURIComponent(DOC_URL)}`

onMounted(() => { import('arender-ui') })
</script>

<template>
  <div style="width: 100%; height: 100vh">
    <arender-element
      rendition="/"
      :document="documentParams"
    />
  </div>
</template>
```

:::note
To suppress the Vue compiler warning for unknown elements, add `isCustomElement` to your Vite config:

```ts
vue({ template: { compilerOptions: { isCustomElement: (tag) => tag === 'arender-element' } } })
```
:::

</TabItem>
<TabItem value="svelte" label="Svelte">

Copy the following into your `src/App.svelte` file, replacing its entire contents:

```html title="App.svelte"
<script lang="ts">
  import { onMount } from 'svelte'

  const DOC_URL = 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf'
  const documentParams = `url=${encodeURIComponent(DOC_URL)}`

  onMount(() => { import('arender-ui') })
</script>

<div style="width: 100%; height: 100vh">
  <arender-element
    rendition="/"
    document={documentParams}
  ></arender-element>
</div>
```

</TabItem>
<TabItem value="angular" label="Angular">

Copy the following into your `src/app/app.component.ts` file, replacing its entire contents:

```ts title="app.component.ts"
import { Component, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

const DOC_URL = 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf'

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <arender-element
      rendition="http://localhost:4200/"
      [attr.document]="documentParams"
      style="display: block; width: 100%; height: 100vh"
    ></arender-element>
  `,
})
export class AppComponent implements AfterViewInit {
  documentParams = 'url=' + encodeURIComponent(DOC_URL)

  ngAfterViewInit() {
    import('arender-ui')
  }
}
```

:::note
Angular requires an absolute URL for `rendition` — a relative `/` is not resolved correctly by the dev server. In production, replace `http://localhost:4200/` with your actual backend URL.
:::

</TabItem>
<TabItem value="html" label="HTML">

Add the following to your `index.html` file, just before the closing `</body>` tag:

```html title="index.html"
<arender-element
  id="viewer"
  rendition="/"
  style="display: block; width: 100%; height: 100vh"
></arender-element>

<script type="module">
  const DOC_URL = 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf'

  document.getElementById('viewer')
    .setAttribute('document', 'url=' + encodeURIComponent(DOC_URL))

  import('arender-ui')
</script>
```

:::note
A plain HTML attribute cannot compute its own value, so the encoding has to happen somewhere. Setting the attribute from a script — before importing `arender-ui`, since the attribute is read when the element mounts — keeps `encodeURIComponent` in charge. A literal `document="url=…"` also works, but only if you percent-encode the value by hand.
:::

</TabItem>
</Tabs>

:::note Loading strategy
The examples below use a dynamic `import()` inside a lifecycle hook (`useEffect`, `onMounted`, etc.) rather than a static import at the top of the file. This is intentional for **SSR compatibility**: `arender-ui` registers a Web Component using browser APIs (`window`, `document`, `customElements`) that do not exist in Node.js. A static import would crash the build in SSR frameworks like Next.js, Nuxt, or SvelteKit.

If your application is purely client-side (no SSR), a static import at the top of the file works just as well:

```ts
import 'arender-ui'
```
:::

## Step 4 — Start the dev server

With the viewer embedded, start your development server and open it in your browser.

If you created a fresh Vite project (as shown in the introduction), run:

```bash
npm run dev
```

Vite will print a local URL — usually `http://localhost:5173`. Open it in your browser and you should see the ARender viewer loading the sample PDF.

If you use a different package manager, the equivalent command is:

| Package manager | Command |
|-----------------|-----------|
| yarn | `yarn dev` |
| pnpm | `pnpm dev` |
| bun | `bun dev` |

For other frameworks, use your usual start command (e.g. `npm start` for CRA).

:::tip
If the viewer loads but no document appears, double-check the proxy configuration in Step 3 — the `/documents` and `/registry/documents` paths must both be proxied to the rendition backend.
:::

## Step 5 — Load a document dynamically

To change the displayed document at runtime, call `window.ARender.openDocument(params)` with the same query string the `document` attribute takes. The most recent call wins, and calls made before the viewer finishes mounting are queued automatically — no need to wait for any event.

The examples below wrap the document URL in `encodeURIComponent`: the viewer forwards your parameters to the backend untouched, so encoding each value is the caller's responsibility. It matters as soon as a value carries its own query string, such as a pre-signed URL.

<Tabs>
<TabItem value="react" label="React">

Replace your `src/App.tsx` with the following complete file:

```tsx title="src/App.tsx"
import { useEffect } from 'react'
import type { ARenderHTMLElement } from 'arender-ui'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'arender-element': React.HTMLAttributes<HTMLElement> & {
        rendition?: string
        document?: string
      }
    }
  }
}
declare global {
  interface Window { ARender: ARenderHTMLElement }
}

const DOC_URL = 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf'
const MAIL_URL = 'https://www.uxopian.com/hubfs/ARender-Mail_viewer_use_case.msg'

function App() {
  useEffect(() => { import('arender-ui') }, [])

  function changeDocument() {
    window.ARender.openDocument(`url=${encodeURIComponent(MAIL_URL)}`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div>
        <button onClick={changeDocument}>Change document</button>
      </div>
      <arender-element
        rendition="/"
        document={`url=${encodeURIComponent(DOC_URL)}`}
        style={{ flex: 1 }}
      />
    </div>
  )
}

export default App
```

</TabItem>
<TabItem value="vue" label="Vue">

Replace your `src/App.vue` with the following complete file:

```html title="App.vue"
<script setup lang="ts">
import { onMounted } from 'vue'

const DOC_URL = 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf'
const MAIL_URL = 'https://www.uxopian.com/hubfs/ARender-Mail_viewer_use_case.msg'
const documentParams = `url=${encodeURIComponent(DOC_URL)}`

onMounted(() => { import('arender-ui') })

function changeDocument() {
  window.ARender.openDocument(`url=${encodeURIComponent(MAIL_URL)}`)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; height: 100vh">
    <div>
      <button @click="changeDocument">Change document</button>
    </div>
    <arender-element
      rendition="/"
      :document="documentParams"
      style="flex: 1"
    />
  </div>
</template>
```

</TabItem>
<TabItem value="svelte" label="Svelte">

Replace your `src/App.svelte` with the following complete file:

```html title="App.svelte"
<script lang="ts">
  import { onMount } from 'svelte'

  const DOC_URL = 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf'
  const MAIL_URL = 'https://www.uxopian.com/hubfs/ARender-Mail_viewer_use_case.msg'
  const documentParams = `url=${encodeURIComponent(DOC_URL)}`

  onMount(() => { import('arender-ui') })

  function changeDocument() {
    window.ARender.openDocument(`url=${encodeURIComponent(MAIL_URL)}`)
  }
</script>

<div style="display: flex; flex-direction: column; height: 100vh">
  <div>
    <button on:click={changeDocument}>Change document</button>
  </div>
  <arender-element
    rendition="/"
    document={documentParams}
    style="flex: 1; display: block"
  ></arender-element>
</div>
```

</TabItem>
<TabItem value="angular" label="Angular">

Replace your `src/app/app.component.ts` with the following complete file:

```ts title="app.component.ts"
import { Component, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

const DOC_URL = 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf'
const MAIL_URL = 'https://www.uxopian.com/hubfs/ARender-Mail_viewer_use_case.msg'

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div style="display: flex; flex-direction: column; height: 100vh">
      <div>
        <button (click)="changeDocument()">Change document</button>
      </div>
      <arender-element
        rendition="http://localhost:4200/"
        [attr.document]="documentParams"
        style="display: block; flex: 1"
      ></arender-element>
    </div>
  `,
})
export class AppComponent implements AfterViewInit {
  documentParams = 'url=' + encodeURIComponent(DOC_URL)

  ngAfterViewInit() {
    import('arender-ui')
  }

  changeDocument() {
    window.ARender.openDocument('url=' + encodeURIComponent(MAIL_URL))
  }
}
```

</TabItem>
<TabItem value="html" label="HTML">

Add the following to your `index.html`, just before the closing `</body>` tag:

```html
<div style="display: flex; flex-direction: column; height: 100vh">
  <div>
    <button id="change-btn">Change document</button>
  </div>
  <arender-element
    id="viewer"
    rendition="/"
    style="display: block; flex: 1"
  ></arender-element>
</div>

<script type="module">
  const DOC_URL = 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf'
  const MAIL_URL = 'https://www.uxopian.com/hubfs/ARender-Mail_viewer_use_case.msg'

  document.getElementById('viewer')
    .setAttribute('document', 'url=' + encodeURIComponent(DOC_URL))

  import('arender-ui')

  document.getElementById('change-btn').addEventListener('click', () => {
    window.ARender.openDocument('url=' + encodeURIComponent(MAIL_URL))
  })
</script>
```

</TabItem>
</Tabs>

## Sample documents

These public URLs can be used for testing (the demo rendition already authorizes `https://www.uxopian.com/`):

- PDF: `https://www.uxopian.com/hubfs/PDFReference15_v5.pdf`
- Image: `https://www.uxopian.com/hubfs/example_image_comparison_unmodified.jpg`
- Email: `https://www.uxopian.com/hubfs/ARender-Mail_viewer_use_case.msg`

## Next steps

- [Docker Compose](../installation/docker-compose.md) — deploy the rendition backend on your own infrastructure
- [Configuration](../installation/configuration.md) — reverse proxy, authentication, and BFF
- [Feature availability](../overview/horizon.md#feature-availability) — what's available now and what's coming
- [Web Component](../reference/web-component.md) — HTML attributes, JavaScript API, styling
- [Opening documents](../guides/features/opening-documents.md) — multi-document, repository parameters, encoding rules
- [Providers](../guides/integration/providers.md) — load documents from Alfresco, FileNet, or custom repositories
