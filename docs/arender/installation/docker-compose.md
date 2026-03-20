---
title: Docker Compose
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /installation/docker-compose
sidebar_position: 1
content_hash: 518444f924bbca651353d3ad4870055e254c9a2e029603f56b69ca9b094e89f2
---

# Docker Compose

This guide covers deploying ARender with Docker Compose for production or staging environments.

## Service topology

ARender requires five containers:

| Service | Image | Internal port | Purpose |
|---------|-------|---------------|---------|
| ui | arender-ui-springboot | 8080 | Viewer frontend |
| service-broker | arender-document-service-broker | 8761 | REST API, orchestration |
| document-converter | arender-document-converter | 19999 | Format conversion |
| document-renderer | arender-document-renderer-pdfowl | 9091 | Page rendering |
| document-text-handler | arender-document-text-handler | 8899 | Text extraction |

All ARender images are available from `artifactory.arondor.cloud:5001`.

## Prerequisites

Log in to the ARender Docker registry before pulling images:

```bash
docker login artifactory.arondor.cloud:5001
```

## Service discovery

In Docker Compose, the broker discovers microservices via static configuration. Each microservice is configured with environment variables that set its hostname and port (using the legacy `eureka.instance.*` property namespace). The broker polls each service's health endpoint to track availability. No Eureka server is involved.

## Full configuration

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
    ports:
      - 8761:8761
    environment:
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-CONVERTER=19999"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-RENDERER=9091"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-TEXT-HANDLER=8899"
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

## Environment variable conventions

All YAML configuration properties can be overridden via environment variables. Each service uses a dedicated prefix (`ARENDERSRV_`, `DSB_`, `DCV_`, `DRN_`, `DTH_`). See [Environment variables](./environment-variables.md) for the full naming convention with examples.

## OAuth2 authentication

To enable OAuth2 with a provider like Keycloak:

```yaml
  ui:
    environment:
      - "ARENDERSRV_ARENDER_SERVER_OAUTH2_ENABLED=true"
      - "SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_ARENDER_CLIENT_ID=arender-client"
      - "SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_ARENDER_CLIENT_SECRET=your-secret"
      - "SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_ARENDER_PROVIDER=keycloak"
      - "SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_ARENDER_AUTHORIZATION_GRANT_TYPE=authorization_code"
      - "SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_ARENDER_SCOPE=openid"
      - "SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_KEYCLOAK_AUTHORIZATION_URI=https://keycloak.example.com/realms/arender/protocol/openid-connect/auth"
      - "SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_KEYCLOAK_TOKEN_URI=https://keycloak.example.com/realms/arender/protocol/openid-connect/token"
      - "SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_KEYCLOAK_JWK_SET_URI=https://keycloak.example.com/realms/arender/protocol/openid-connect/certs"
      - "SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_KEYCLOAK_USER_NAME_ATTRIBUTE=preferred_username"
      - "SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI=https://keycloak.example.com/realms/arender"
```

## Shared volume

The `arender-tmp` volume must be accessible by all backend services (broker, converter, renderer, text handler).


## Next steps

- [Kubernetes Helm](./kubernetes-helm.md) for orchestrated deployments
- [REST API reference](../reference/rest-api/broker-api.md)
