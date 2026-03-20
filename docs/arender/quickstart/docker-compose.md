---
title: Docker Compose quickstart
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /quickstart/docker-compose
sidebar_position: 1
content_hash: 760228e8dac85ab8aa9b23ad42f4d370a717c0e00341ea40ab35d537ecac0d47
---

# Docker Compose quickstart

Get ARender running locally using Docker Compose. This guide takes about 5 minutes.

## Prerequisites

- Docker Engine 20.10+ and Docker Compose v2
- At least 8 GB of available RAM
- Access to the Uxopian Docker registry (`artifactory.arondor.cloud:5001`)

Log in to the ARender Docker registry:

```bash
docker login artifactory.arondor.cloud:5001
```

You will be prompted for your Artifactory credentials. Contact your ARender administrator if you do not have an account.

## Start the services

Create a `docker-compose.yml` file:

```yaml title="docker-compose.yml"
services:
  ui:
    image: artifactory.arondor.cloud:5001/arender-ui-springboot:2026.0.0
    environment:
      - "ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS=http://service-broker:8761/"
    ports:
      - 8080:8080

  service-broker:
    image: artifactory.arondor.cloud:5001/arender-document-service-broker:2026.0.0
    environment:
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-CONVERTER=19999"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-RENDERER=9091"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-TEXT-HANDLER=8899"
    ports:
      - 8761:8761
    volumes:
      - arender-tmp:/arender/tmp

  document-converter:
    image: artifactory.arondor.cloud:5001/arender-document-converter:2026.0.0
    environment:
      - "DCV_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-converter"
      - "DCV_APP_EUREKA_HOSTNAME=service-broker"
      - "DCV_APP_EUREKA_PORT=8761"
    volumes:
      - arender-tmp:/arender/tmp

  document-renderer:
    image: artifactory.arondor.cloud:5001/arender-document-renderer-pdfowl:2026.0.0
    environment:
      - "DRN_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-renderer"
      - "DRN_EUREKA_INSTANCE_HOSTNAME=service-broker"
      - "DRN_EUREKA_SERVER_PORT=8761"
    volumes:
      - arender-tmp:/arender/tmp

  document-text-handler:
    image: artifactory.arondor.cloud:5001/arender-document-text-handler:2026.0.0
    environment:
      - "DTH_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-text-handler"
      - "DTH_EUREKA_INSTANCE_HOSTNAME=service-broker"
      - "DTH_EUREKA_SERVER_PORT=8761"
    volumes:
      - arender-tmp:/arender/tmp

volumes:
  arender-tmp:
```

Start the stack:

```bash
docker compose up -d
```

## Verify the services

Wait about 30 seconds for all services to start, then check:

```bash
# Viewer health
curl http://localhost:8080/arendergwt/weather

# Rendition health — lists registered microservices
curl http://localhost:8761/health/records
```

## Open the viewer

Open your browser at [http://localhost:8080](http://localhost:8080).

ARender loads with a default sample document. You can now:

- Navigate pages using the thumbnail panel
- Zoom and rotate pages
- Add annotations (click the annotation toolbar)
- Search text with Ctrl+F

## Stop the services

```bash
docker compose down
```

To also remove the shared volume:

```bash
docker compose down -v
```

## Next steps

- [Open your first document](./first-document.md)
- [Docker Compose guide](../deployment/docker-compose.md) for production configuration
- [Kubernetes Helm](../deployment/kubernetes-helm.md)
