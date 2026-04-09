---
viewer: modern
slug: /installation
title: Installation overview
sidebar_position: 0
---

# Installation overview

The installation guides cover deploying the ARender rendition backend on your own infrastructure for production use.

## Before you start

These guides assume the React viewer is already embedded in your application. If not, follow [Getting Started](../quickstart/getting-started.md), then return here.


## Choose your deployment path

| | [Docker Compose](./docker-compose.md) | [Kubernetes Helm](./kubernetes-helm.md) |
|--|--|--|
| **Best for** | Single-server deployments, simpler setups | Teams already running Kubernetes; need auto-scaling or high availability |
| **Prerequisites** | Docker and Docker Compose | Kubernetes 1.24+, Helm 3.x |
| **Reverse proxy** | Nginx | Ingress controller |
| **Scaling** | Manual | Autoscaling supported |

Both paths result in the same running ARender stack. Choose based on your existing infrastructure.

## What each guide covers

Each deployment guide is self-contained and walks through:

1. Deploying the rendition backend
2. Setting up the reverse proxy to connect your application to the backend
3. Configuring authorized document sources
4. Verifying the installation

For OAuth2 and BFF authentication, see [Advanced configuration](./configuration.md) after completing your chosen guide.

## Next steps

- [Docker Compose](./docker-compose.md) — single-server deployment with Nginx
- [Kubernetes Helm](./kubernetes-helm.md) — Kubernetes deployment with Ingress and autoscaling
