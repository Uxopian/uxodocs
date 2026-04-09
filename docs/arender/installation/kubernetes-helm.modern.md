---
title: Kubernetes Helm
last_update:
  date: '2026-03-23T10:20:59.293Z'
  author: CI/CD Bot
slug: /installation/kubernetes-helm
sidebar_position: 2
content_hash: f457ca89ab310ba4c931afa654e139c39edc22123423f0d85ef4fa51678fdaac
---

# Kubernetes Helm

This guide deploys the full ARender stack on Kubernetes: the rendition backend via Helm chart and an Ingress controller as the reverse proxy between your application and the backend.

This guide assumes the React viewer is already integrated. If not, follow [Getting Started](../quickstart/getting-started.md) first.

## Prerequisites

- Kubernetes 1.24+
- Helm 3.x
- A storage class supporting ReadWriteMany (for the shared tmp volume)
- Access to the Uxopian Helm repository
- An Ingress controller (e.g. Nginx Ingress) deployed in your cluster

The `arender` Helm chart (v0.4.0) contains a **rendition** sub-chart that deploys the Document Service Broker, converter, renderer, and text handler with support for autoscaling, persistent storage, and Hazelcast clustering.

## Step 1 — Authenticate with the registry

ARender images are hosted on a private registry. In Kubernetes, each cluster node pulls images independently — they cannot use your local Docker credentials. You need to store the credentials as a Kubernetes secret so the nodes can authenticate when pulling images.

First, verify your credentials work locally:

```bash
docker login artifactory.arondor.cloud:5001
```

Then store those credentials as a Kubernetes secret in the cluster:

```bash
kubectl create secret docker-registry arender-registry \
  --docker-server=artifactory.arondor.cloud:5001 \
  --docker-username=<your-username> \
  --docker-password=<your-password> \
  --namespace arender
```

Finally, reference the secret in your Helm values so the chart uses it when pulling images:

```yaml title="values.yaml"
global:
  imagePullSecrets:
    - name: arender-registry
```

## Step 2 — Install the Helm chart

A Helm chart is a package that describes a Kubernetes deployment. Installing it is the equivalent of running `docker-compose up` — it pulls the images and starts all the pods.

First, add the ARender Helm repository (similar to adding an npm or Maven registry) and fetch the latest chart index:

```bash
helm repo add arondor https://artifactory.arondor.cloud/artifactory/ARenderHelmVirtual --username <your_user> --password <your_password>
helm repo update
```

Create a `values.yaml` file to set the ARender version and any other configuration (see [Configuration reference](#configuration-reference)):

```yaml title="values.yaml"
global:
  arenderVersion: "2026.0.0"
```

Then install the chart. Use the default values for a quick test, or pass your `values.yaml` for a production deployment:

```bash
# Quick start — install with default values
helm install arender arondor/arender \
  --namespace arender \
  --create-namespace

# Production — install with your values.yaml
helm install arender arondor/arender \
  --namespace arender \
  --create-namespace \
  -f my-values.yaml
```

## Step 3 — Configure Ingress

The Ingress controller routes viewer API traffic to the broker — it serves the same role as Nginx in a Docker Compose deployment. Enable it in your Helm values:

```yaml title="values.yaml"
rendition:
  broker:
    ingress:
      enabled: true
      annotations:
        cert-manager.io/cluster-issuer: letsencrypt-prod
      className: nginx
```

If you prefer to manage the Ingress resource manually:

```yaml title="ingress.yaml"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: arender-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  ingressClassName: nginx
  rules:
    - host: your-app.example.com
      http:
        paths:
          - path: /documents(/|$)(.*)
            pathType: ImplementationSpecific
            backend:
              service:
                name: arender-rendition-broker
                port:
                  number: 8761
          - path: /annotation(/|$)(.*)
            pathType: ImplementationSpecific
            backend:
              service:
                name: arender-rendition-broker
                port:
                  number: 8761
          - path: /registry/documents
            pathType: Exact
            backend:
              service:
                name: arender-rendition-broker
                port:
                  number: 8761
```

:::tip
If OAuth2 is enabled on the rendition backend, use a BFF instead of a plain Ingress. See [Advanced configuration](./configuration.md#authentication-and-bff).
:::

:::note
ARender does not yet ship a built-in BFF — this is planned for an upcoming release. In the meantime, use your own Ingress annotations, middleware, or BFF.
:::

## Step 4 — Configure authorized document sources

When loading documents by URL (via `openDocumentByUrl`), the broker must authorize the source domain. Add it via `extraConfig` in your Helm values:

```yaml title="values.yaml"
rendition:
  broker:
    config:
      file:
        extraConfig: |
          authorized.urls=https://your-docs-server.example.com/
```

Multiple origins are comma-separated:

```yaml
authorized.urls=https://docs.example.com/,https://storage.example.com/
```

## Step 5 — Verify

Check that all pods are running:

```bash
kubectl get pods -n arender
```

Then verify the broker health endpoint through your Ingress:

```bash
curl https://your-app.example.com/documents/health/records
```

All services should show as UP.

:::tip Coming from Getting Started?
Update your Vite proxy target from the demo URL to your Ingress hostname (e.g. `https://your-app.example.com`) to connect to this backend.
:::

## Configuration reference

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
```

### Extra configuration

Each service supports injecting additional Spring properties via `config.file.extraConfig`:

```yaml title="values.yaml"
rendition:
  broker:
    config:
      file:
        extraConfig: |
          # Additional Spring properties here
          authorized.urls=https://example.com/
```

## Services and ports

| Deployment | Service port | Service type |
|-----------|-------------|--------------|
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

<<<<<<< HEAD
=======
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

>>>>>>> staging
## Upgrade

```bash
helm upgrade arender arondor/arender \
  --namespace arender \
  -f my-values.yaml
```

## Next steps

- [Advanced configuration](./configuration.md) — OAuth2, BFF, and edge cases
- [Docker Compose](./docker-compose.md) for single-server deployments
- [REST API reference](../reference/rest-api/broker-api.md)
