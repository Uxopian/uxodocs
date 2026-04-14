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

The [Docker Compose](./docker-compose.md) guide covers single-server deployments with Nginx as a reverse proxy.

## What each guide covers

Each deployment guide is self-contained and walks through:

1. Deploying the rendition backend
2. Setting up the reverse proxy to connect your application to the backend
3. Configuring authorized document sources
4. Verifying the installation

For OAuth2 and BFF authentication, see [Advanced configuration](./configuration.md) after completing your chosen guide.

## Next steps

- [Docker Compose](./docker-compose.md) — single-server deployment with Nginx
