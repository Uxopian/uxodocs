---
viewer: horizon
slug: /installation
title: Installation overview
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
sidebar_position: 0
content_hash: c7381e8e888d4a2e5960fa1b1c0f3c7c8d48bdcbddded0f7ed691be609d9955b
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
