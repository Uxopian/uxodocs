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

The ARender React UI is a document viewer distributed as npm packages. It can be used as a Web Component (`arender-ui`) or through framework-specific wrappers (`react-arender-ui`, `angular-arender-ui`, `vue-arender-ui`, `svelte-arender-ui`). The viewer communicates with the ARender rendition backend over REST.

## Prerequisites

- Docker and Docker Compose installed
- Access to the ARender Docker registry (credentials provided by Uxopian)
- Access to the ARender npm registry on Cloudsmith (credentials provided by Uxopian)
- Node.js 20+ and a package manager (npm or yarn)

## Step 1 — Start the rendition backend

If you don't already have a rendition backend running, download the Docker Compose file and start it:

```bash
# Log in to the ARender Docker registry (credentials provided by Uxopian)
docker login artifactory.arondor.cloud:5001

# Download the Docker Compose file
curl -O https://doc.uxopian.com/files/arender/docker-compose.yml

# Start the backend (defaults to version 2026.0.0)
docker-compose up -d
```

:::tip
To use a different version, set the `ARENDER_VERSION` environment variable:
```bash
ARENDER_VERSION=2026.0.0 docker-compose up -d
```
:::

Verify the backend is healthy by opening [http://localhost:8761/health/records](http://localhost:8761/health/records) — all services should show as UP.

For a complete backend setup guide, see [Docker Compose installation](../installation/docker-compose.md).

## Step 2 — Configure the npm registry

ARender packages are hosted on a private Cloudsmith registry. Configure your package manager:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm config set registry https://npm.cloudsmith.io/uxopian/preview/
npm config set //npm.cloudsmith.io/uxopian/preview/:_authToken YOUR_TOKEN
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn config set registry "https://npm.cloudsmith.io/uxopian/preview/"
yarn config set "//npm.cloudsmith.io/uxopian/preview/:_authToken" "YOUR_TOKEN"
```

</TabItem>
</Tabs>

Replace `YOUR_TOKEN` with the token generated from your Cloudsmith account.

## Step 3 — Create a project and install

Create a new Vite project and install the ARender package for your framework:

```bash
npm create vite@latest my-arender-app -- --template react-ts
cd my-arender-app
npm install
```

Then install the ARender package:

<Tabs>
<TabItem value="react" label="React">

```bash
npm install react-arender-ui
```

</TabItem>
<TabItem value="angular" label="Angular">

```bash
npm install angular-arender-ui
```

</TabItem>
<TabItem value="vue" label="Vue">

```bash
npm install vue-arender-ui
```

</TabItem>
<TabItem value="svelte" label="Svelte">

```bash
npm install svelte-arender-ui
```

</TabItem>
<TabItem value="vanilla" label="Vanilla JS">

```bash
npm install arender-ui
```

</TabItem>
</Tabs>

## Step 4 — Configure the dev server proxy

The viewer needs to reach the rendition backend. In development, Vite's built-in proxy handles this automatically — no external reverse proxy needed.

Add the proxy configuration to `vite.config.ts`:

```ts title="vite.config.ts"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/documents': {
        target: 'http://localhost:8761',
        changeOrigin: true,
      },
      '/registry/documents': {
        target: 'http://localhost:8761',
        changeOrigin: true,
      },
      '/annotation': {
        target: 'http://localhost:8761',
        changeOrigin: true,
      },
    },
  },
})
```

:::tip
In production, replace the Vite proxy with a reverse proxy (Nginx, Ingress) or a BFF. See [Configuration](../installation/configuration.md) for details.
:::

## Step 5 — Embed the viewer

Replace the content of your main component:

<Tabs>
<TabItem value="react" label="React">

```tsx title="src/App.tsx"
import { useEffect } from "react";
import { ARender, getARender } from "react-arender-ui";

function App() {
  useEffect(() => {
    const api = getARender();
    api?.openDocumentByUrl(
      "https://www.uxopian.com/hubfs/PDFReference15_v5.pdf"
    );
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ARender rendition="/" />
    </div>
  );
}

export default App;
```

</TabItem>
<TabItem value="angular" label="Angular">

```ts title="app.component.ts"
import { Component } from "@angular/core";
import { getARender, ARenderComponent } from "angular-arender-ui";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ARenderComponent],
  template: `<ARender rendition="/" />`,
  styles: [`:host { display: block; width: 100%; height: 100vh; }`],
})
export class AppComponent {
  ngOnInit() {
    const api = getARender();
    api?.openDocumentByUrl(
      "https://www.uxopian.com/hubfs/PDFReference15_v5.pdf"
    );
  }
}
```

</TabItem>
<TabItem value="vue" label="Vue">

```vue title="App.vue"
<script setup>
import { onMounted } from "vue";
import { getARender, ARender } from "vue-arender-ui";

onMounted(() => {
  getARender()?.openDocumentByUrl(
    "https://www.uxopian.com/hubfs/PDFReference15_v5.pdf"
  );
});
</script>

<template>
  <div style="width: 100%; height: 100vh">
    <ARender rendition="/" />
  </div>
</template>
```

</TabItem>
<TabItem value="svelte" label="Svelte">

```svelte title="App.svelte"
<script>
  import { ARender, getARender } from "svelte-arender-ui";
  import { onMount } from "svelte";

  onMount(() => {
    getARender()?.openDocumentByUrl(
      "https://www.uxopian.com/hubfs/PDFReference15_v5.pdf"
    );
  });
</script>

<div style="width: 100%; height: 100vh">
  <ARender rendition="/" />
</div>
```

</TabItem>
<TabItem value="vanilla" label="Vanilla JS">

```html title="index.html"
<arender-element
  rendition="/"
  style="display: block; width: 100%; height: 100vh"
></arender-element>

<script type="module">
  import "arender-ui";

  const viewer = document.querySelector("arender-element");
  viewer.ARender.openDocumentByUrl(
    "https://www.uxopian.com/hubfs/PDFReference15_v5.pdf"
  );
</script>
```

</TabItem>
</Tabs>

## Step 6 — Run

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`). You should see the ARender viewer displaying a PDF document.

## Sample documents

These public URLs can be used for testing (the Docker Compose file already authorizes `https://www.uxopian.com/`):

- PDF: `https://www.uxopian.com/hubfs/PDFReference15_v5.pdf`
- Image: `https://www.uxopian.com/hubfs/example_image_comparison_unmodified.jpg`
- Email: `https://www.uxopian.com/hubfs/ARender-Mail_viewer_use_case.msg`

## Next steps

- [Feature availability](../overview/modern-viewer.md#feature-availability) — what's available now and what's coming
- [Web Component](../reference/web-component.md) — HTML attributes, JavaScript API, styling
- [Framework wrappers](../reference/framework-wrappers.md) — detailed framework integration
- [Configuration](../installation/configuration.md) — CORS setup, reverse proxy, backend connection
- [Connector providers](../guides/integration/connector-providers.md) — load documents from Alfresco, FileNet, or custom repositories
