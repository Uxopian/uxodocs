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

This guide covers deploying the ARender rendition backend with Docker Compose.

## Backend services

The rendition backend requires four containers:

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| service-broker | arender-document-service-broker | 8761 | REST API gateway and orchestration |
| document-converter | arender-document-converter | 19999 | Format conversion |
| document-renderer | arender-document-renderer-pdfowl | 9091 | Page rendering |
| document-text-handler | arender-document-text-handler | 8899 | Text extraction |

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

## Environment variable conventions

All YAML configuration properties can be overridden via environment variables. Each service uses a dedicated prefix (`DSB_`, `DCV_`, `DRN_`, `DTH_`). See [Environment variables](./environment-variables.md) for the full naming convention with examples.

## Shared volume

The `arender-tmp` volume must be accessible by all backend services (broker, converter, renderer, text handler). Documents are stored on this volume during processing. See [System architecture](../overview/architecture.md#shared-volume-constraints) for details.

## Next steps

- [Kubernetes Helm](./kubernetes-helm.md) for orchestrated deployments
- [Configuration system](./configuration-system.md) for property overrides
- [REST API reference](../reference/rest-api/broker-api.md)
