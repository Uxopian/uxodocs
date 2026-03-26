---
viewer: modern
slug: /installation/configuration
title: Configuration
last_update:
  date: '2026-03-24T08:07:20.846Z'
  author: CI/CD Bot
sidebar_position: 5
content_hash: ac1fbc17a230905cd25267ebf15f03815e57c11fb4b9b33c6f566abc4c7f9582
---

# React UI configuration

The React UI is embedded in your host application and communicates with the ARender rendition backend over REST. Configuration involves two aspects: connecting to the backend, and handling cross-origin requests.

Backend rendition configuration (broker, converter, renderer) is documented in [Configuration system](./configuration-system.md) and [Environment variables](./environment-variables.md).

## Connecting to the rendition backend

The React UI makes REST API calls to the service broker for document operations. The broker URL is determined by how you set up the connection in your host application:

- **Reverse proxy (recommended):** Your application server proxies `/documents`, `/annotation`, and `/connector/documents` routes to the broker. The React UI calls these as relative URLs — no cross-origin issues.
- **Direct connection:** The React UI calls the broker URL directly. Requires CORS configuration.

### API routes

The React UI uses three API route prefixes:

| Route | Purpose |
|-------|---------|
| `/documents/*` | Document rendering, page images, text extraction |
| `/annotation/*` | Annotation CRUD operations |
| `/connector/documents` | Load documents through connector providers |

## CORS and reverse proxy

Since the React UI runs inside your host application, API calls to the rendition backend are cross-origin by default. The recommended solution is a reverse proxy that makes the broker appear as same-origin.

:::tip Local development
During local development, most bundlers (Vite, webpack) provide a built-in dev server proxy that handles this automatically. For example, Vite's `server.proxy` configuration forwards `/documents`, `/annotation`, and `/connector/documents` to the broker URL defined in your environment variables. No external reverse proxy is needed in this case.
:::

### Nginx reverse proxy (recommended)

```nginx
server {
    listen 80;
    server_name your-app.example.com;

    # Your application
    location / {
        proxy_pass http://your-app:3000;
    }

    # Proxy ARender API calls to the broker
    location /documents {
        proxy_pass http://service-broker:8761/documents;
    }

    location /annotation {
        proxy_pass http://service-broker:8761/annotation;
    }

    location /connector/documents {
        proxy_pass http://service-broker:8761/connector/documents;
        # If using connector providers, inject the provider header:
        # proxy_set_header X-Provider-ID alfresco;
    }
}
```

With this setup, the React UI makes same-origin requests to `/documents/*`, `/annotation/*`, and `/connector/documents`, which Nginx forwards to the broker.

:::tip
If you use [connector providers](../guides/integration/connector-providers.md) (Alfresco, FileNet), your reverse proxy must also inject the `X-Provider-ID` header on `/connector/documents` requests. If OAuth2 is enabled on the rendition backend, consider using a full BFF (Backend For Frontend) to handle token management. See [System architecture](../overview/architecture.md) for details.
:::

### Alternative approaches

| Approach | Use case | Trade-offs |
|----------|----------|------------|
| Nginx reverse proxy | Production | Same-origin, no CORS issues |
| Serve assets from same origin | Simple deployments | Couples frontend to backend |
| CORS browser extension | Local development only | Not for production |

## Backend configuration

### Authorized URLs

When loading documents by URL (via `openDocumentByUrl`), the broker must authorize the document source. Configure allowed URL prefixes:

```bash
DSB_AUTHORIZED_URLS=https://www.uxopian.com/,https://your-docs-server.example.com/
```

### Port summary

| Component | Default port | Description |
|-----------|-------------|-------------|
| Service Broker | 8761 | Backend orchestrator |
| Alfresco Provider | 8788 | Alfresco connector microservice |
