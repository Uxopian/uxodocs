---
title: Docker Compose
last_update:
  date: '2026-03-24T08:07:20.846Z'
  author: CI/CD Bot
slug: /installation/docker-compose
sidebar_position: 1
content_hash: 90a489bf30a620da7d51ec3a655175b02b8bc8a3e966d7a75021fa0edf84e38e
---

# Docker Compose

This guide deploys the full ARender stack with Docker Compose: the rendition backend as Docker containers and Nginx as the reverse proxy between your application and the backend.

This guide assumes the React viewer is already integrated. If not, follow [Getting Started](../quickstart/getting-started.md) first.


## Prerequisites

- Docker and Docker Compose installed
- Access to the ARender Docker registry (credentials provided by Uxopian)

Log in to the ARender Docker registry. Docker will use these credentials to pull the ARender images when you start the stack in Step 4:

```bash
docker login artifactory.arondor.cloud:5001
```

## Step 1 — Set up the rendition backend

The rendition backend is made up of four Docker images:

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| Document Service Broker | arender-document-service-broker | 8761 | REST API gateway and orchestration |
| Document Converter | arender-document-converter | 19999 | Format conversion |
| Document Renderer | arender-document-renderer-pdfowl | 9091 | Page rendering |
| Document Text Handler | arender-document-text-handler | 8899 | Text extraction |


Create a `docker-compose.yml` file with the following content. Each microservice registers its hostname and port via environment variables so the broker can discover them automatically.

```yaml title="docker-compose.yml"
services:
  service-broker:
    image: artifactory.arondor.cloud:5001/arender-document-service-broker:{{version}}
    ports:
      - 8761:8761
    environment:
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-CONVERTER=19999"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-RENDERER=9091"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-TEXT-HANDLER=8899"
    volumes:
      - arender-tmp:/arender/tmp

  document-converter:
    image: artifactory.arondor.cloud:5001/arender-document-converter:{{version}}
    environment:
      - "DCV_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-converter"
      - "DCV_APP_EUREKA_HOSTNAME=service-broker"
      - "DCV_APP_EUREKA_PORT=8761"
    volumes:
      - arender-tmp:/arender/tmp

  document-renderer:
    image: artifactory.arondor.cloud:5001/arender-document-renderer-pdfowl:{{version}}
    environment:
      - "DRN_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-renderer"
      - "DRN_EUREKA_INSTANCE_HOSTNAME=service-broker"
      - "DRN_EUREKA_SERVER_PORT=8761"
    volumes:
      - arender-tmp:/arender/tmp

  document-text-handler:
    image: artifactory.arondor.cloud:5001/arender-document-text-handler:{{version}}
    environment:
      - "DTH_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-text-handler"
      - "DTH_EUREKA_INSTANCE_HOSTNAME=service-broker"
      - "DTH_EUREKA_SERVER_PORT=8761"
    volumes:
      - arender-tmp:/arender/tmp

volumes:
  arender-tmp:
```

:::note
The `arender-tmp` volume must be accessible by all backend services. Documents are stored on this volume during processing. See [System architecture](../overview/architecture.md#shared-volume-constraints) for details.
:::

:::tip Coming from Getting Started?
Update your Vite proxy target from the demo URL to `http://localhost:8761` to connect to this backend.
:::

## Step 2 — Set up the reverse proxy

The React viewer runs in the browser and calls the ARender broker's REST API. Since they run on different ports, browsers block these requests as cross-origin (CORS). A reverse proxy makes the three ARender API routes appear same-origin to the browser.

This step adds Nginx to your Docker Compose stack. The configuration below assumes your app's dev server runs on the host machine on port `5173` (Vite's default). Adjust the port if you use a different bundler or framework. For other setups, see [Advanced configuration → Proxy setup](./configuration.md#proxy-setup).

### Create the Nginx configuration file

Create an `nginx.conf` file at the root of your project:

```nginx title="nginx.conf"
server {
    listen 80;
    server_name localhost;

    # Your application (dev server running on the host)
    location / {
        proxy_pass http://host.docker.internal:5173;
    }

    # ARender API routes
    location /documents {
        proxy_pass http://service-broker:8761/documents;
    }

    location /annotation {
        proxy_pass http://service-broker:8761/annotation;
    }

    location /registry/documents {
        proxy_pass http://service-broker:8761/registry/documents;
        # If using connector providers, inject the provider header:
        # proxy_set_header X-Provider-ID alfresco;
    }
}
```

`host.docker.internal` is the hostname Docker Desktop provides to reach the host machine from within a container. Replace `5173` if your dev server runs on a different port. For a production deployment, replace `localhost` with your domain name.

### Add Nginx to docker-compose.yml

Add an `nginx` service to your `docker-compose.yml` and mount the configuration file:

```yaml title="docker-compose.yml"
services:
  # ... existing services ...

  nginx:
    image: nginx:alpine
    ports:
      - 80:80
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - service-broker
```

If you configured a dev proxy in [Getting Started](../quickstart/getting-started.md), remove it from your bundler config — Nginx now handles routing.

If your app uses Vite, also add `allowedHosts` so that Nginx can reach the dev server:

```ts title="vite.config.ts"
export default defineConfig({
  server: {
    allowedHosts: ['host.docker.internal'],
  },
  // ...
})
```

For other bundlers (webpack-dev-server, Angular CLI, etc.), refer to their equivalent host restriction settings.

:::tip
If OAuth2 is enabled on the rendition backend, use a BFF instead of a plain reverse proxy. See [Advanced configuration](./configuration.md#authentication-and-bff).
:::

## Step 3 — Configure authorized document sources

When loading documents by URL (via `openDocumentByUrl`), the broker must authorize the source domain. Add `DSB_AUTHORIZED_URLS` to the broker service in your `docker-compose.yml`:

```yaml
service-broker:
  environment:
    # ... existing env vars ...
    - "DSB_AUTHORIZED_URLS=https://your-docs-server.example.com/"
```

Multiple origins are comma-separated:

```yaml
- "DSB_AUTHORIZED_URLS=https://docs.example.com/,https://storage.example.com/"
```


## Step 4 — Start the stack

Run the following command. Docker Compose pulls the ARender images from the registry (using the credentials from the login step) and starts all four containers:

```bash
docker-compose up -d
```

Check that all containers are running:

```bash
docker-compose ps
```

Then open [http://localhost:8761/health/records](http://localhost:8761/health/records) — all services should show as UP.

## Optional — Connector providers

To load documents from an external repository (Alfresco, FileNet), add a provider service and register it on the broker:

```yaml
services:
  service-broker:
    environment:
      # ... existing env vars ...
      # Register the Alfresco provider
      - "REGISTRY_PROVIDERS_ALFRESCO_BASE_URL=http://alfresco-provider:8788"

  alfresco-provider:
    image: artifactory.arondor.cloud:5001/arender-alfresco-provider:{{version}}
    ports:
      - 8788:8788
    environment:
      - "ARENDER_SERVER_ALFRESCO_ATOM_PUB_URL=http://alfresco:8080/alfresco/api/-default-/cmis/versions/1.1/atom"
```

Your Nginx configuration must also inject the `X-Provider-ID` header on `/registry/documents` requests. See [Connector providers](../guides/integration/connector-providers.md) for the full deployment guide and available providers.

## Environment variable conventions

All YAML configuration properties can be overridden via environment variables. Each service uses a dedicated prefix (`DSB_`, `DCV_`, `DRN_`, `DTH_`). See [Environment variables](./environment-variables.md) for the full naming convention with examples.

## Next steps

- [Advanced configuration](./configuration.md) — OAuth2, BFF, and edge cases
- [Configuration system](./configuration-system.md) — property overrides
- [REST API reference](../reference/rest-api/broker-api.md)

