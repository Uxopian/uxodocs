---
viewer: classic
title: Kubernetes Helm
last_update:
  date: '2026-03-23T10:20:59.293Z'
  author: CI/CD Bot
slug: /installation/kubernetes-helm
sidebar_position: 2
content_hash: f457ca89ab310ba4c931afa654e139c39edc22123423f0d85ef4fa51678fdaac
---

# Kubernetes Helm

ARender provides Helm charts for deploying to Kubernetes. The chart creates deployments for all ARender services, with support for autoscaling, persistent storage, ingress, and Hazelcast clustering.

## Prerequisites

- Kubernetes 1.24+
- Helm 3.x
- A storage class supporting ReadWriteMany (for the shared tmp volume)
- Access to the Uxopian Helm repository
- Docker registry authentication: run `docker login artifactory.arondor.cloud:5001` and create a Kubernetes image pull secret (see [Installation](#installation))

## Chart structure

The `arender` parent chart (v0.4.0) contains two sub-charts:

- **rendition**: deploys the Document Service Broker, converter, renderer, and text handler
- **viewer**: deploys the UI application

Each sub-chart can also be installed standalone.

## Registry authentication

ARender images are hosted on a private registry. Authenticate before pulling images:

```bash
docker login artifactory.arondor.cloud:5001
```

For Kubernetes, create an image pull secret so that nodes can pull the images:

```bash
kubectl create secret docker-registry arender-registry \
  --docker-server=artifactory.arondor.cloud:5001 \
  --docker-username=<your-username> \
  --docker-password=<your-password> \
  --namespace arender
```

Then reference it in your Helm values:

```yaml title="values.yaml"
global:
  imagePullSecrets:
    - name: arender-registry
```

## Installation

```bash
# Add the Helm repository
helm repo add arondor https://artifactory.arondor.cloud/artifactory/ARenderHelmVirtual --username <your_user> --password <your_password>
helm repo update

# Install with default values
helm install arender arender/arender \
  --namespace arender \
  --create-namespace

# Install with custom values
helm install arender arender/arender \
  --namespace arender \
  --create-namespace \
  -f my-values.yaml
```

## Key configuration values

### Global

```yaml title="values.yaml"
global:
  imagePullSecrets: []
  arenderVersion: "2026.0.0"
```

The `arenderVersion` sets the image tag for all ARender containers.

### Rendition services

```yaml title="values.yaml"
rendition:
  broker:
    replicaCount: 1
    autoscale:
      enabled: false
      maxReplicas: 3
      cpuLimit: 80
    image:
      repository: artifactory.arondor.cloud:5001/arender-document-service-broker
      pullPolicy: IfNotPresent
    environment:
      PROVIDER_ENVIRONMENT: LOCAL

  converter:
    replicaCount: 1
    autoscale:
      enabled: false
      maxReplicas: 3
      cpuLimit: 80
    image:
      repository: artifactory.arondor.cloud:5001/arender-document-converter

  handler:
    replicaCount: 1
    autoscale:
      enabled: false
      maxReplicas: 3
      cpuLimit: 80
    image:
      repository: artifactory.arondor.cloud:5001/arender-document-text-handler

  renderer:
    replicaCount: 1
    autoscale:
      enabled: false
      maxReplicas: 3
      cpuLimit: 80
    image:
      repository: artifactory.arondor.cloud:5001/arender-document-renderer-pdfowl
```

Resources are not set by default. Set them according to your workload:

```yaml title="values.yaml"
rendition:
  broker:
    resources:
      limits:
        cpu: 1000m
        memory: 2048Mi
      requests:
        cpu: 500m
        memory: 1024Mi
  converter:
    resources:
      limits:
        cpu: 4000m
        memory: 2048Mi
      requests:
        cpu: 250m
        memory: 1024Mi
  handler:
    resources:
      limits:
        cpu: 1000m
        memory: 2Gi
      requests:
        cpu: 250m
        memory: 1Gi
  renderer:
    resources:
      limits:
        cpu: 1200m
        memory: 2048Mi
      requests:
        cpu: 425m
        memory: 1024Mi
```

### Viewer

```yaml title="values.yaml"
viewer:
  replicaCount: 1
  autoscale:
    enabled: false
    maxReplicas: 1
    cpuLimit: 80
  image:
    repository: artifactory.arondor.cloud:5001/arender-ui-springboot
  rendition:
    hosts: []    # List of rendition broker URLs
  profiles:
    - name: arender
      content: ""
```

### Storage

```yaml title="values.yaml"
rendition:
  sharedTmpFolder:
    create: true
    claimName: ""
    storage:
      className: longhorn    # Must support ReadWriteMany
      size: 50Gi
    accessModes: "ReadWriteMany"
```

### Logging

```yaml title="values.yaml"
rendition:
  logging:
    default:
      consoleOnly: false
      logLevels:
        business: info      # trace, debug, info, warn, error
        technical: warn
      display:
        date: true
        podName: true
    persistance:
      enabled: false
      storage:
        size: 1Gi
      accessModes: "ReadWriteMany"
```

### Ingress

```yaml title="values.yaml"
rendition:
  broker:
    ingress:
      enabled: false
      annotations:
        cert-manager.io/cluster-issuer: letsencrypt-prod
      className: nginx

viewer:
  ingress:
    enabled: false
    annotations: {}
    hosts:
      - host: arender.example.com
        paths: []
    tls: []
```

## Services and ports

| Deployment | Service port | Service type |
|-----------|-------------|--------------|
| Viewer | 80 | ClusterIP |
| Document Service Broker | 8761 | ClusterIP |
| Document Converter | 19999 | ClusterIP |
| Document Renderer | 9091 | ClusterIP |
| Document Text Handler | 8899 | ClusterIP |
| Hazelcast | 5701 | ClusterIP |

## Hazelcast clustering

Hazelcast is configured for all charts. The service exposes port 5701 for inter-node communication.

## Health probes

All services have configurable liveness and readiness probes:

| Service | Liveness delay | Readiness delay | Period |
|---------|---------------|-----------------|--------|
| Document Service Broker | 30s | 60s | 15s |
| Document Converter | 30s | 60s | 15s |
| Document Renderer | 30s | 60s | 15s |
| Document Text Handler | 30s | 60s | 15s |
| Viewer | 30s | 60s | 30s/60s |

## Extra configuration

Each service supports injecting additional configuration via `config.file.extraConfig`:

```yaml title="values.yaml"
rendition:
  broker:
    config:
      file:
        extraConfig: |
          # Additional Spring properties here
          authorized.urls=https://example.com/
```

## Upgrade

```bash
helm upgrade arender arender/arender \
  --namespace arender \
  -f my-values.yaml
```

## Next steps

- [Docker Compose](./docker-compose.md)
- [REST API reference](../reference/rest-api/broker-api.md)
