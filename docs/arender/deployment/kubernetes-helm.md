---
title: Kubernetes Helm
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /deployment/kubernetes-helm
sidebar_position: 2
content_hash: 989fbec2f7c95c3a7575acdec4a4882b4141ee3c06debc112696199c82166b14
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

- **rendition**: deploys the service broker, converter, renderer, and text handler
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
helm repo add arender https://artifactory.arondor.cloud/helm
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
      PROVIDER_ENVIRONMENT: LOCAL    # LOCAL or KUBERNETES (requires cluster RBAC)

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
| Broker | 8761 | ClusterIP |
| Converter | 19999 | ClusterIP |
| Renderer | 9091 | ClusterIP |
| Text Handler | 8899 | ClusterIP |
| Hazelcast | 5701 | ClusterIP |

## Hazelcast clustering

Hazelcast is configured for all charts. The service exposes port 5701 for inter-node communication.

## Health probes

All services have configurable liveness and readiness probes:

| Service | Liveness delay | Readiness delay | Period |
|---------|---------------|-----------------|--------|
| Broker | 30s | 60s | 15s |
| Converter | 30s | 60s | 15s |
| Renderer | 30s | 60s | 15s |
| Text Handler | 30s | 60s | 15s |
| Viewer | 30s | 60s | 30s/60s |

## Broker RBAC

When `PROVIDER_ENVIRONMENT` is set to `KUBERNETES`, the broker needs RBAC permissions to discover microservices via Kubernetes API:

```yaml title="values.yaml"
rendition:
  broker:
    rbac:
      create: true
      role:
        rules:
          - apiGroups: ["*"]
            resources: ["nodes"]
            verbs: ["get", "list"]
    serviceAccount:
      create: true
```

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
