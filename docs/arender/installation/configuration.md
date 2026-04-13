---
viewer: modern
slug: /installation/configuration
title: Advanced configuration
last_update:
  date: '2026-03-24T08:07:20.846Z'
  author: CI/CD Bot
sidebar_position: 5
content_hash: ac1fbc17a230905cd25267ebf15f03815e57c11fb4b9b33c6f566abc4c7f9582
---

# Advanced configuration

This page covers proxy setup, OAuth2 authentication, and BFF configuration. Proxy setup is required for all deployments — local development and production alike. OAuth2 and BFF topics apply after completing a [Docker Compose](./docker-compose.md) or [Kubernetes Helm](./kubernetes-helm.md) installation.

Backend rendition configuration (broker, converter, renderer) is documented in [Configuration system](./configuration-system.md) and [Environment variables](./environment-variables.md).

## API routes reference

The viewer uses three API route prefixes, all proxied to the Document Service Broker:

| Route | Purpose |
|-------|---------|
| `/documents/*` | Document rendering, page images, text extraction |
| `/annotation/*` | Annotation CRUD operations |
| `/registry/documents` | Load documents through connector providers |

## Proxy setup

The viewer runs in the browser and calls the broker's REST API. Since they typically run on different ports or domains, browsers block these requests as cross-origin (CORS). A proxy solves this by forwarding the viewer's API calls to the broker server-side, so the browser only ever sees one origin.

Choose the solution that matches your context:

| Context | Solution |
|---------|----------|
| Local development with Vite | [Vite dev proxy](#vite) |
| Docker Compose deployment | [Nginx in Docker Compose](./docker-compose.md#step-2--set-up-the-reverse-proxy) |
| Kubernetes deployment | [Ingress](./kubernetes-helm.md#step-3--configure-ingress) |
| OAuth2 enabled on the backend | [BFF](#authentication-and-bff) |
| Existing reverse proxy or load balancer | [Same origin via existing infrastructure](#same-origin-via-existing-infrastructure) |
| Non-dockerized production app | [Nginx on the host server](#nginx-on-the-host-server) |

### Vite

Most bundlers include a built-in dev server proxy. Use it instead of setting up a reverse proxy locally.

Add the following `server.proxy` block to your `vite.config.ts`. If the file already has other configuration (plugins, build options, etc.), merge the `server` key into the existing `export default`:

```ts
export default {
  server: {
    proxy: {
      '/documents': { target: 'http://localhost:8761', changeOrigin: true },
      '/annotation': { target: 'http://localhost:8761', changeOrigin: true },
      '/registry/documents': { target: 'http://localhost:8761', changeOrigin: true },
    },
  },
}
```

Vite forwards matching requests to the broker. The browser only sees `localhost`, so no CORS issue arises.

### Same origin via existing infrastructure

If your organization already routes the ARender API paths (`/documents`, `/annotation`, `/registry/documents`) to the broker under the same domain as your application — through an existing reverse proxy, load balancer, or API gateway — the browser sees all requests as same-origin and no additional configuration is needed.

### Nginx on the host server

If your application runs directly on a server (not in Docker), install Nginx on that server and configure it as a reverse proxy. The ARender broker still runs in Docker and exposes port `8761` on the host via the `ports:` mapping in `docker-compose.yml`.

**Install Nginx** (Ubuntu/Debian):

```bash
sudo apt update && sudo apt install nginx
```

For other operating systems, follow the [official Nginx installation guide](https://nginx.org/en/docs/install.html).

**Create a configuration file:**

```nginx title="/etc/nginx/conf.d/arender.conf"
server {
    listen 80;
    server_name your-app.example.com;

    location / {
        proxy_pass http://localhost:3000;
    }

    location /documents {
        proxy_pass http://localhost:8761/documents;
    }

    location /annotation {
        proxy_pass http://localhost:8761/annotation;
    }

    location /registry/documents {
        proxy_pass http://localhost:8761/registry/documents;
    }
}
```

Replace `your-app.example.com` with your domain and `localhost:3000` with the port your application runs on.

**Validate and reload Nginx:**

```bash
nginx -t && nginx -s reload
```

`nginx -t` checks the configuration file for syntax errors. `nginx -s reload` applies the new configuration without interrupting active connections.

If you use an API gateway (AWS ALB, Cloudflare, Kong, etc.) instead of Nginx, apply the same routing rules — forward the three ARender prefixes to the broker's address — using your gateway's configuration syntax.

## Authentication and BFF

A reverse proxy (Nginx or Ingress) is sufficient for most deployments. If you also enable **OAuth2 on the rendition backend**, the React viewer — running in the browser — cannot securely store or refresh tokens. In this case, you need a **Backend For Frontend (BFF)**: a server-side component that manages OAuth2 tokens on behalf of the browser.

### How a BFF works with ARender

The BFF sits between the browser and the broker:

1. It handles the OAuth2 flow (authorization code grant, token refresh).
2. It stores tokens server-side — tokens are never exposed to the browser.
3. It proxies the three ARender API routes, injecting `Authorization: Bearer <token>` on each request to the broker.

From the viewer's perspective, it calls the BFF exactly as it would call the broker — no change is needed in how you configure the `rendition` attribute on `<arender-element>`.

### Routes to proxy through the BFF

| Route | Purpose |
|-------|---------|
| `/documents/*` | Document rendering |
| `/annotation/*` | Annotation CRUD |
| `/registry/documents` | Connector providers |

If you use [connector providers](../guides/integration/connector-providers.md), the BFF must also inject the `X-Provider-ID` header on `/registry/documents` requests.

:::note
ARender does not yet ship a built-in BFF — this is planned for an upcoming release. In the meantime, implement your own using your preferred stack (Node.js, Spring Boot, etc.) or use an existing OAuth2 proxy such as [OAuth2 Proxy](https://oauth2-proxy.github.io/oauth2-proxy/).
:::

## Port reference

| Component | Default port | Description |
|-----------|-------------|-------------|
| Document Service Broker | 8761 | Backend orchestrator |
| Alfresco Provider | 8788 | Alfresco connector microservice |
| FileNet Provider | 8787 | FileNet connector microservice |