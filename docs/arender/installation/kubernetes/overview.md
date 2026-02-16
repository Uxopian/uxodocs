---
title: Overview
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
sidebar_position: 1
content_hash: 234649b3114d16b5ebb13555c2527f297affe2f60d6b2c341dd3fb57e9615b78
---

:::warning
**We assume that you are familiar with Kubernetes.**

If not, find more information on [https://kubernetes.io/docs/home/](https://kubernetes.io/docs/home/).
:::

## TL;DR

```bash
$> helm repo add arondor https://artifactory.arondor.cloud/artifactory/ARenderHelmVirtual --username <your_user> --password <your_password>
$> helm install my-release arondor/arender
```

## Introduction

ARender is ready for Kubernetes and you can easily deploy the entire stack with our Helm Chart.

> You can find out more about Helm technology [here](https://helm.sh/).

The Chart is composed of two subchart: rendition and web-ui. You can choose to use both or only one of these components by setting the following parameters:

| Component | Property          | Value             |
| --------- | ----------------- | ----------------- |
| web-ui    | web-ui.enabled    | `true` or `false` |
| rendition | rendition.enabled | `true` or `false` |

## Prerequisites

- Access to Arondor Artifactory
- Kubernetes 1.14+
- Helm 3.0+
- PV provisionner support in the underlying infrastructure
- Kubernetes Metrics server installed (since ARender 4.3.0)

## Installing the Chart

To install the chart with the release name `my-release`, run the following commands with your Artifactory credentials:

```bash
$> helm repo add arondor https://artifactory.arondor.cloud/artifactory/ARenderHelmVirtual --username <your_user> --password <your_password>
$> helm install my-release arondor/arender
```

:::note
**You need to create a secret with your Arondor Artifactory credentials to be able to pull the default images.**

Read the page "[Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)" on the official Kubernetes documentation to create the secret.
Then, add it to the list of imagePullSecrets names by setting `global.imagePullSecrets` parameter.
:::

## Uninstalling the Chart

To uninstall/delete the `my-release` release:

```bash
$> helm delete my-release
```

## Parameters

The configurable parameters are listed in the next pages.

### Default values.yml file

[Download](/uxodocs/docs/helm/values.yml).