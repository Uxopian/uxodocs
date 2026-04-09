---
viewer: modern
slug: /quickstart/getting-started
title: Getting started
last_update:
  date: '2026-03-24T08:07:20.846Z'
  author: CI/CD Bot
sidebar_position: 2
content_hash: de6e90602ed3383a58e06b75b82072e4c8e9b05ed63fa8d58d0b32ba95006b97
---

# Getting started with the React UI

The ARender viewer is distributed as the `arender-ui` npm package. It registers an `<arender-element>` Web Component that integrates into any framework — React, Angular, Vue, Svelte, or plain HTML. The viewer communicates with the ARender rendition backend over REST.

## Prerequisites

- Access to the ARender npm registry on Cloudsmith (credentials provided by Uxopian)
- Node.js 20+ and a package manager (npm or yarn)

## Step 1 — Configure access to the ARender registry

ARender packages are hosted on a private Cloudsmith registry. Create a `.npmrc` file at the root of your project with your token:

```ini title=".npmrc"
//npm.cloudsmith.io/uxopian/release/:_authToken=your_token_here
```

Replace `your_token_here` with the token provided by Uxopian.

Then add `.npmrc` to your `.gitignore` to avoid committing the token:

```bash title=".gitignore"
.npmrc
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Step 2 — Install the ARender package

In your existing project, install the `arender-ui` package:

```bash
npm install arender-ui --registry https://npm.cloudsmith.io/uxopian/release/
```

:::tip Starting from scratch?
If you don't have a project yet, you can bootstrap one with Vite: `npm create vite@latest my-app -- --template react-ts`
:::

## Step 3 — Configure the dev server proxy

The viewer needs to reach the rendition backend. In development, Vite's built-in proxy handles this automatically — no external reverse proxy needed.

:::note
Uxopian provides a shared demo rendition backend at `https://rendition.arender.2026.uxopian.com` — available to all, no credentials or installation required. This lets you test the viewer right away. Deploying your own backend is covered in the [Installation](../installation/docker-compose.md) section.
:::

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
      '/annotation': {
        target: 'https://rendition.arender.2026.uxopian.com',
        changeOrigin: true,
      },
    },
  },
})
```

:::tip
To connect to your own backend instead of the demo, change each `target` to your backend URL (e.g. `http://localhost:8761` for Docker Compose). In production, replace the Vite proxy with a reverse proxy (Nginx, Ingress) or a BFF. See [Docker Compose](../installation/docker-compose.md) or [Kubernetes](../installation/kubernetes-helm.md) for deployment guides.
:::

## Step 4 — Embed the viewer

### Web Component attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `rendition` | Yes | URL of the ARender rendition backend. Use `/` when proxied (see Step 3). |
| `url` | No | URL of the document to open on startup. |
| `uuid` | No | ID of the document to open on startup (alternative to `url`). |

Set `url` or `uuid` directly as HTML attributes to open a document on startup — no JavaScript needed.
To load a different document at runtime, use the [JavaScript API](#step-5--load-a-document-dynamically).


<Tabs>
<TabItem value="html" label="HTML">

```html title="index.html"
<arender-element
  rendition="/"
  url="https://www.uxopian.com/hubfs/PDFReference15_v5.pdf"
  style="display: block; width: 100%; height: 100vh"
></arender-element>

<script type="module">
  import('arender-ui')
</script>
```

</TabItem>
<TabItem value="react" label="React">

```tsx title="src/App.tsx"
import { useEffect } from 'react'
import type { ARenderHTMLElement } from 'arender-ui'

// Move these declarations to a global.d.ts in a real project
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'arender-element': React.HTMLAttributes<HTMLElement> & {
        rendition?: string
        url?: string
        uuid?: string
      }
    }
  }
}
declare global {
  interface Window { ARender: ARenderHTMLElement }
}

function App() {
  useEffect(() => { import('arender-ui') }, [])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <arender-element
        rendition="/"
        url="https://www.uxopian.com/hubfs/PDFReference15_v5.pdf"
      />
    </div>
  )
}

export default App
```

</TabItem>
<TabItem value="vue" label="Vue">

```html title="App.vue"
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => { import('arender-ui') })
</script>

<template>
  <div style="width: 100%; height: 100vh">
    <arender-element
      rendition="/"
      url="https://www.uxopian.com/hubfs/PDFReference15_v5.pdf"
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

```html title="App.svelte"
<script lang="ts">
  import { onMount } from 'svelte'

  onMount(() => { import('arender-ui') })
</script>

<div style="width: 100%; height: 100vh">
  <arender-element
    rendition="/"
    url="https://www.uxopian.com/hubfs/PDFReference15_v5.pdf"
  ></arender-element>
</div>
```

</TabItem>
<TabItem value="angular" label="Angular">

```ts title="app.component.ts"
import { Component, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <arender-element
      rendition="/"
      url="https://www.uxopian.com/hubfs/PDFReference15_v5.pdf"
      style="display: block; width: 100%; height: 100vh"
    ></arender-element>
  `,
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    import('arender-ui')
  }
}
```

</TabItem>
</Tabs>

:::note Loading strategy
The examples below use a dynamic `import()` inside a lifecycle hook (`useEffect`, `onMounted`, etc.) rather than a static import at the top of the file. This is intentional for **SSR compatibility**: `arender-ui` registers a Web Component using browser APIs (`window`, `document`, `customElements`) that do not exist in Node.js. A static import would crash the build in SSR frameworks like Next.js, Nuxt, or SvelteKit.

If your application is purely client-side (no SSR), a static import at the top of the file works just as well:

```ts
import 'arender-ui'
```
:::

Start your dev server (`npm run dev` for Vite) and open the local URL in your browser — you should see the ARender viewer displaying a PDF document.

## Step 5 — Load a document dynamically

To change the displayed document at runtime, use `window.ARender`. Calls made before the viewer finishes mounting are queued automatically — no need to wait for any event.

<Tabs>
<TabItem value="html" label="HTML">

```html
<arender-element rendition="/" style="display: block; width: 100%; height: 100vh"></arender-element>

<button id="load-btn">Load document</button>

<script type="module">
  import('arender-ui')

  document.getElementById('load-btn').addEventListener('click', () => {
    window.ARender.openDocumentByUrl('https://www.uxopian.com/hubfs/PDFReference15_v5.pdf')
  })
</script>
```

</TabItem>
<TabItem value="react" label="React">

```tsx
function DocumentSwitcher() {
  const documents = [
    { label: 'PDF Reference', url: 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf' },
    { label: 'Image', url: 'https://www.uxopian.com/hubfs/example_image_comparison_unmodified.jpg' },
  ]

  return (
    <div>
      {documents.map((doc) => (
        <button key={doc.url} onClick={() => window.ARender.openDocumentByUrl(doc.url)}>
          {doc.label}
        </button>
      ))}
    </div>
  )
}
```

</TabItem>
<TabItem value="vue" label="Vue">

```html
<script setup lang="ts">
const documents = [
  { label: 'PDF Reference', url: 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf' },
  { label: 'Image', url: 'https://www.uxopian.com/hubfs/example_image_comparison_unmodified.jpg' },
]

function loadDocument(url: string) {
  window.ARender.openDocumentByUrl(url)
}
</script>

<template>
  <button v-for="doc in documents" :key="doc.url" @click="loadDocument(doc.url)">
    {{ doc.label }}
  </button>
</template>
```

</TabItem>
<TabItem value="svelte" label="Svelte">

```html
<script lang="ts">
  const documents = [
    { label: 'PDF Reference', url: 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf' },
    { label: 'Image', url: 'https://www.uxopian.com/hubfs/example_image_comparison_unmodified.jpg' },
  ]

  function loadDocument(url: string) {
    window.ARender.openDocumentByUrl(url)
  }
</script>

{#each documents as doc}
  <button on:click={() => loadDocument(doc.url)}>{doc.label}</button>
{/each}
```

</TabItem>
<TabItem value="angular" label="Angular">

```ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

@Component({
  selector: 'app-document-switcher',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <button *ngFor="let doc of documents" (click)="loadDocument(doc.url)">
      {{ doc.label }}
    </button>
  `,
})
export class DocumentSwitcherComponent {
  documents = [
    { label: 'PDF Reference', url: 'https://www.uxopian.com/hubfs/PDFReference15_v5.pdf' },
    { label: 'Image', url: 'https://www.uxopian.com/hubfs/example_image_comparison_unmodified.jpg' },
  ]

  loadDocument(url: string) {
    window.ARender.openDocumentByUrl(url)
  }
}
```

</TabItem>
</Tabs>

## Sample documents

These public URLs can be used for testing (the demo rendition already authorizes `https://www.uxopian.com/`):

- PDF: `https://www.uxopian.com/hubfs/PDFReference15_v5.pdf`
- Image: `https://www.uxopian.com/hubfs/example_image_comparison_unmodified.jpg`
- Email: `https://www.uxopian.com/hubfs/ARender-Mail_viewer_use_case.msg`

## Next steps

- [Docker Compose](../installation/docker-compose.md) or [Kubernetes Helm](../installation/kubernetes-helm.md) — deploy the rendition backend on your own infrastructure
- [Configuration](../installation/configuration.md) — reverse proxy, authentication, and BFF
- [Feature availability](../overview/modern-viewer.md#feature-availability) — what's available now and what's coming
- [Web Component](../reference/web-component.md) — HTML attributes, JavaScript API, styling
- [Connector providers](../guides/integration/connector-providers.md) — load documents from Alfresco, FileNet, or custom repositories
