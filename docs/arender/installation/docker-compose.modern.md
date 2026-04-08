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

This guide covers deploying the full ARender stack with Docker Compose: the React UI in your host application and the rendition backend as Docker containers.

## React UI

The React UI is an npm package embedded in your host application — it is not a Docker container.

### Install the package

```bash
npm install arender-ui
```

### Embed the viewer

Add the `<arender-element>` Web Component to your page:

```html
<arender-element></arender-element>
```

See [Web Component reference](../reference/web-component.md) for attributes, JavaScript API, and framework wrappers (React, Angular, Vue, Svelte).

### Set up the reverse proxy

The React UI calls the broker REST API for all document operations. Since the UI runs in the browser and the broker is a separate service, a reverse proxy is needed to avoid CORS issues.

```nginx
server {
    listen 80;
    server_name your-app.example.com;

    location / {
        proxy_pass http://your-app:3000;
    }

    location /documents {
        proxy_pass http://service-broker:8761/documents;
    }

    location /annotation {
        proxy_pass http://service-broker:8761/annotation;
    }

    location /registry/documents {
        proxy_pass http://service-broker:8761/registry/documents;
    }
}
```

This reverse proxy is the minimal setup. Depending on your needs, this layer can also:

- **Inject `X-Provider-ID`** — required when using [connector providers](../guides/integration/connector-providers.md) (Alfresco, FileNet)
- **Handle OAuth2 tokens** — when OAuth2 is enabled on the rendition backend, a full BFF (Backend For Frontend) manages tokens on behalf of the viewer

:::note
ARender does not yet ship a built-in BFF — this is planned for an upcoming release. In the meantime, use your own reverse proxy or BFF.
:::

See [Configuration](./configuration.md) for more details on CORS and reverse proxy options.

## Backend services

The rendition backend requires four containers:

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| Document Service Broker | arender-document-service-broker | 8761 | REST API gateway and orchestration |
| Document Converter | arender-document-converter | 19999 | Format conversion |
| Document Renderer | arender-document-renderer-pdfowl | 9091 | Page rendering |
| Document Text Handler | arender-document-text-handler | 8899 | Text extraction |

All images are available from `artifactory.arondor.cloud:5001`.

## Prerequisites

Log in to the ARender Docker registry before pulling images:

```bash
docker login artifactory.arondor.cloud:5001
```

## Service discovery

In Docker Compose, the broker discovers microservices via static configuration. Each microservice is configured with environment variables that set its hostname and port (using the legacy `eureka.instance.*` property namespace). The broker polls each service's health endpoint to track availability. No Eureka server is involved.

## Backend configuration

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

This configuration deploys the rendition backend. The Modern Viewer is an npm package embedded in your host application — no additional container is needed.

## Adding a connector provider

To load documents from an external repository (Alfresco, FileNet), add a provider service and register it on the broker:

```yaml
services:
  service-broker:
    environment:
      # ... existing env vars ...
      # Register the Alfresco provider
      - "REGISTRY_PROVIDER_ALFRESCO_URL=http://alfresco-provider:8788"

  alfresco-provider:
    image: artifactory.arondor.cloud:5001/arender-alfresco-provider:{{version}}
    ports:
      - 8788:8788
    environment:
      - "ARENDER_SERVER_ALFRESCO_ATOMPUBURL=http://alfresco:8080/alfresco/api/-default-/cmis/versions/1.1/atom"
```

Your reverse proxy must also inject the `X-Provider-ID` header on `/registry/documents` requests. See [Connector providers](../guides/integration/connector-providers.md) for the full deployment guide and available providers.

## Environment variable conventions

All YAML configuration properties can be overridden via environment variables. Each service uses a dedicated prefix (`DSB_`, `DCV_`, `DRN_`, `DTH_`). See [Environment variables](./environment-variables.md) for the full naming convention with examples.

## Shared volume

The `arender-tmp` volume must be accessible by all backend services (broker, converter, renderer, text handler). Documents are stored on this volume during processing. See [System architecture](../overview/architecture.md#shared-volume-constraints) for details.

## Next steps

- [Kubernetes Helm](./kubernetes-helm.md) for orchestrated deployments
- [Configuration system](./configuration-system.md) for property overrides
- [REST API reference](../reference/rest-api/broker-api.md)
