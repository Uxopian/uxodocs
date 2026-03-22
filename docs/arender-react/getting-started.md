---
title: Getting started
sidebar_position: 2
---

# Getting started with the React UI

The ARender React UI is a document viewer built with React 19 and TypeScript, distributed as an npm package (`arender-ui`). It registers an `<arender-element>` Web Component that you embed directly into your web application. The viewer communicates with the ARender rendition backend over a pure REST API.

## Prerequisites

- An ARender rendition backend (service broker + rendition services) running and accessible
- Node.js 20+ and a package manager (npm or yarn)

## Step 1 — Start the rendition backend

If you don't already have a rendition backend running, start one with Docker Compose:

```yaml
services:
  service-broker:
    image: docker-arender.arondor.com/document-service-broker:{{version}}
    ports:
      - "8761:8761"
    environment:
      # Allow documents loaded from these URLs
      DSB_AUTHORIZED_URLS: https://www.uxopian.com/
    volumes:
      - arender-tmp:/arender/tmp

  document-renderer:
    image: docker-arender.arondor.com/document-renderer:{{version}}
    volumes:
      - arender-tmp:/arender/tmp

  document-converter:
    image: docker-arender.arondor.com/document-converter:{{version}}
    volumes:
      - arender-tmp:/arender/tmp

  document-text-handler:
    image: docker-arender.arondor.com/document-text-handler:{{version}}
    volumes:
      - arender-tmp:/arender/tmp

volumes:
  arender-tmp:
```

```bash
docker-compose up -d
```

Verify the backend is healthy:

```
http://localhost:8761/health/records
```

For a complete backend setup guide, see [Docker Compose installation](/docs/arender/installation/docker-compose/).

## Step 2 — Install the npm package

Install `arender-ui` in your project:

```bash
npm install arender-ui
```

## Step 3 — Embed the viewer

Add the `<arender-element>` Web Component to your page or component:

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

If you use a framework, see [Framework wrappers](./framework-wrappers.md) for React, Angular, Vue, and Svelte components.

## Step 4 — Open a document

Use the JavaScript API to load a document by URL:

```javascript
const viewer = document.querySelector('arender-element');
await viewer.ARender.openDocumentByUrl('https://www.uxopian.com/hubfs/PDFReference15_v5.pdf');
```

Or open a document by its ARender document ID (if you already have one from the broker API):

```javascript
await viewer.ARender.openDocument('some-document-id');
```

## CORS considerations

Since the React UI runs inside your host application, API calls to the rendition backend are cross-origin unless you set up a reverse proxy. See [CORS and reverse proxy](./configuration.md#cors-and-reverse-proxy) for solutions.

## Sample documents

These public URLs can be used for testing (requires `DSB_AUTHORIZED_URLS` to include `https://www.uxopian.com/`):

- PDF: `https://www.uxopian.com/hubfs/PDFReference15_v5.pdf`
- Image: `https://www.uxopian.com/hubfs/example_image_comparison_unmodified.jpg`
- Email: `https://www.uxopian.com/hubfs/ARender-Mail_viewer_use_case.msg`

## Next steps

- [Web Component](./web-component.md) — HTML attributes, JavaScript API, styling
- [Framework wrappers](./framework-wrappers.md) — React, Angular, Vue, Svelte integration
- [Configuration](./configuration.md) — CORS setup, reverse proxy, backend connection
- [Connector providers](./connector-providers.md) — Load documents from Alfresco, FileNet, or custom repositories
