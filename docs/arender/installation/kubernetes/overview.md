---
title: Overview
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
sidebar_position: 1
content_hash: 267d16eb78509068827adf545127e53badfeaade77dfa81448d08496141f2024
---

:::warning
**We assume that you are familiar with Kubernetes.**

If not, find more information on [https://kubernetes.io/docs/home/](https://kubernetes.io/docs/home/).
:::

## Supported Kubernetes Platforms

ARender is compatible with the following orchestration environments:

| Platform               | Status        |
|------------------------|---------------|
| **Kubernetes**         | ✔️ Supported  |
| **Red Hat OpenShift**  | ✔️ Supported  |
| **Amazon EKS**         | ✔️ Supported  |
| **Azure AKS**          | ✔️ Supported  |

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

```yaml
global:
  imagePullSecrets: []
  arenderVersion: "{{version}}"

# Default values for arender.
# This is a YAML-formatted file.

# Default values for rendition.
rendition:
  enabled: true
  hazelcast:
    service:
      labels: {}
      annotations: {}
      port: 5701
      portname: hazelcast
    config:
      labels: {}
      annotations: {}

  # Rendition common labels
  labels: {}

  logging:
    default:
      consoleOnly: false
      # Leave empty to use Default
      pattern: ""
      logLevels:
        # Enum: trace, debug, info, warn, error
        business: info
        # Enum: trace, debug, info, warn, error
        technical: warn
      display:
        date:     true
        podName:  true
    persistance:
      enabled:  false
      create:   true
      claimName: ""
      storage:
        # className: efs-sc
        size: 1Gi
      accessModes: "ReadWriteMany"

  sharedTmpFolder:
    create: true
    claimName: ""
    storage:
      className: longhorn
      size: 50Gi
    accessModes: "ReadWriteMany"

  # Default values for broker.
  broker:
    labels: {}
    replicaCount: 1
    autoscale:
      enabled: false
      maxReplicas: 3
      cpuLimit: 80
    image:
      repository: artifactory.arondor.cloud:5001/arender-document-service-broker
      pullPolicy: IfNotPresent
    nameOverride: ""
    fullnameOverride: ""
    rbac:
      # Specifies whether RBAC resources should be created
      create: true
      role:
        rules:
        - apiGroups: [ "*" ]
          resources: [ "nodes" ]
          verbs: [ "get", "list" ]
    persistentVolume:
      enabled: false
      accessControl: "ReadWriteOnce"
      storage: "3Gi"
    serviceAccount:
      # Specifies whether a service account should be created
      create: true
      # The name of the service account to use.
      # If not set and create is true, a name is generated using the fullname template
      name:
    podSecurityContext: {}
      # fsGroup: 2000
    securityContext: {}
      # capabilities:
      #   drop:
      #   - ALL
      # readOnlyRootFilesystem: true
      # runAsNonRoot: true
      # runAsUser: 1000
    service:
      labels: {}
      annotations: {}
      type: ClusterIP
      port: 8761
    deployment:
      podLabels: {}
      podAnnotations: {}
      labels: {}
      annotations: {}
      livenessProbe:
        initialDelaySeconds: 30
        periodSeconds: 15
        timeoutSeconds: 3
      readinessProbe:
        initialDelaySeconds: 60
        periodSeconds: 15
        timeoutSeconds: 1
    config:
      environment:
        labels: {}
        annotations: {}
      file:
        labels: {}
        annotations: {}
        extraConfig: ""
    environment:
      ## Possible values are KUBERNETES and LOCAL. KUBERNETES requires role with cluster rights
      PROVIDER_ENVIRONMENT: LOCAL
    envFrom: []
    logging:
      useDefault: true
      custom: ""
    ingress:
      enabled: false
      annotations:
        cert-manager.io/cluster-issuer: letsencrypt-prod
      className: nginx
    resources: {}
      # We usually recommend not to specify default resources and to leave this as a conscious
      # choice for the user. This also increases chances charts run on environments with little
      # resources, such as Minikube. If you do want to specify resources, uncomment the following
      # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
      # limits:
      #  cpu: 1000m
      #  memory: 2048Mi
      # requests:
      #  cpu: 500m
      #  memory: 1024Mi
    nodeSelector: {}
    tolerations: []
    affinity: {}

  # Default values for converter.
  converter:
    labels: {}
    replicaCount: 1
    autoscale:
      enabled: false
      maxReplicas: 3
      cpuLimit: 80
    image:
      repository: artifactory.arondor.cloud:5001/arender-document-converter
      pullPolicy: IfNotPresent
    nameOverride: ""
    fullnameOverride: ""
    serviceAccount:
      # Specifies whether a service account should be created
      create: true
      # The name of the service account to use.
      # If not set and create is true, a name is generated using the fullname template
      name:
    podSecurityContext: {}
      # fsGroup: 2000
    securityContext: {}
      # capabilities:
      #   drop:
      #   - ALL
      # readOnlyRootFilesystem: true
      # runAsNonRoot: true
      # runAsUser: 1000
    service:
      labels: {}
      annotations: {}
      type: ClusterIP
      port: 19999
    deployment:
      podLabels: {}
      podAnnotations: {}
      labels: {}
      annotations: {}
      livenessProbe:
        initialDelaySeconds: 30
        periodSeconds: 15
        timeoutSeconds: 3
      readinessProbe:
        initialDelaySeconds: 60
        periodSeconds: 15
        timeoutSeconds: 1
    config:
      environment:
        labels: {}
        annotations: {}
      file:
        labels: {}
        annotations: {}
        extraConfig: ""
    environment: {}
    envFrom: []
    logging:
      useDefault: true
      custom: ""
    resources: {}
      # We usually recommend not to specify default resources and to leave this as a conscious
      # choice for the user. This also increases chances charts run on environments with little
      # resources, such as Minikube. If you do want to specify resources, uncomment the following
      # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
      # limits:
      #   cpu: 4000m
      #   memory: 2048Mi
      # requests:
      #   cpu: 250m
      #   memory: 1024Mi
    nodeSelector: {}
    tolerations: []
    affinity: {}

  # Default values for handler.
  # This is a YAML-formatted file.
  # Declare variables to be passed into your templates.
  handler:
    labels: {}
    replicaCount: 1
    autoscale:
      enabled: false
      maxReplicas: 3
      cpuLimit: 80
    image:
      repository: artifactory.arondor.cloud:5001/arender-document-text-handler
      pullPolicy: IfNotPresent
    nameOverride: ""
    fullnameOverride: ""
    serviceAccount:
      # Specifies whether a service account should be created
      create: true
      # The name of the service account to use.
      # If not set and create is true, a name is generated using the fullname template
      name:
    podSecurityContext: {}
      # fsGroup: 2000
    securityContext: {}
      # capabilities:
      #   drop:
      #   - ALL
      # readOnlyRootFilesystem: true
      # runAsNonRoot: true
      # runAsUser: 1000
    service:
      labels: {}
      annotations: {}
      type: ClusterIP
      port: 8899
    deployment:
      podLabels: {}
      podAnnotations: {}
      labels: {}
      annotations: {}
      livenessProbe:
        initialDelaySeconds: 30
        periodSeconds: 15
        timeoutSeconds: 3
      readinessProbe:
        initialDelaySeconds: 60
        periodSeconds: 15
        timeoutSeconds: 1
    config:
      environment:
        labels: {}
        annotations: {}
      file:
        labels: {}
        annotations: {}
        extraConfig: ""
    environment: {}
    envFrom: []
    logging:
      useDefault: true
      custom: ""
    resources: {}
      # We usually recommend not to specify default resources and to leave this as a conscious
      # choice for the user. This also increases chances charts run on environments with little
      # resources, such as Minikube. If you do want to specify resources, uncomment the following
      # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
      # limits:
      #   cpu: 1000m
      #   memory: 2Gi
      # requests:
      #   cpu: 250m
      #   memory: 1Gi
    nodeSelector: {}
    tolerations: []
    affinity: {}

  # Default values for renderer.
  # This is a YAML-formatted file.
  # Declare variables to be passed into your templates.
  renderer:
    labels: {}
    replicaCount: 1
    autoscale:
      enabled: false
      maxReplicas: 3
      cpuLimit: 80
    image:
      repository: artifactory.arondor.cloud:5001/arender-document-renderer
      pullPolicy: IfNotPresent
    nameOverride: ""
    fullnameOverride: ""
    serviceAccount:
      # Specifies whether a service account should be created
      create: true
      # The name of the service account to use.
      # If not set and create is true, a name is generated using the fullname template
      name:
    podSecurityContext: {}
      # fsGroup: 2000
    securityContext: {}
      # capabilities:
      #   drop:
      #   - ALL
      # readOnlyRootFilesystem: true
      # runAsNonRoot: true
      # runAsUser: 1000
    service:
      labels: {}
      annotations: {}
      type: ClusterIP
      port: 9091
    deployment:
      podLabels: {}
      podAnnotations: {}
      labels: {}
      annotations: {}
      livenessProbe:
        initialDelaySeconds: 30
        periodSeconds: 15
        timeoutSeconds: 3
      readinessProbe:
        initialDelaySeconds: 60
        periodSeconds: 15
        timeoutSeconds: 1
    config:
      environment:
        labels: {}
        annotations: {}
      file:
        labels: {}
        annotations: {}
        extraConfig: ""
    environment: {}
    envFrom: []
    logging:
      useDefault: true
      custom: ""
    resources: {}
      # We usually recommend not to specify default resources and to leave this as a conscious
      # choice for the user. This also increases chances charts run on environments with little
      # resources, such as Minikube. If you do want to specify resources, uncomment the following
      # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
      # limits:
      #   cpu: 1200m
      #   memory: 2048Mi
      # requests:
      #   cpu: 425m
      #   memory: 1024Mi
    nodeSelector: {}
    tolerations: []
    affinity: {}


viewer:
  enabled: true
  labels: {}

  replicaCount: 1

  autoscale:
    maxReplicas: 1
    cpuLimit: 100

  image:
    repository: artifactory.arondor.cloud:5001/arender-ui
    pullPolicy: IfNotPresent

  nameOverride: ""
  fullnameOverride: ""

  environment: {}

  profiles:
    - name: arender
      content: ""

  serviceAccount:
    # Specifies whether a service account should be created
    create: true
    # The name of the service account to use.
    # If not set and create is true, a name is generated using the fullname template
    name:

  podSecurityContext:
    {}
    # fsGroup: 2000

  securityContext:
    {}
    # capabilities:
    #   drop:
    #   - ALL
    # readOnlyRootFilesystem: true
    # runAsNonRoot: true
    # runAsUser: 1000

  config:
    labels: {}
    annotations: {}

  service:
    type: ClusterIP
    port: 80
    labels: {}
    annotations: {}

  deployment:
    podLabels: {}
    podAnnotations: {}
    labels: {}
    annotations: {}
    livenessProbe:
      custom: {}
      initialDelaySeconds: 30
      periodSeconds: 30
    readinessProbe:
      custom: {}
      initialDelaySeconds: 60
      periodSeconds: 60

  ingress:
    enabled: false
    annotations:
      cert-manager.io/cluster-issuer: letsencrypt-prod
    className: nginx

  rendition:
    hosts: []

  resources:
    {}
    # We usually recommend not to specify default resources and to leave this as a conscious
    # choice for the user. This also increases chances charts run on environments with little
    # resources, such as Minikube. If you do want to specify resources, uncomment the following
    # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
    # limits:
    #   cpu: 1000m
    #   memory: 3072Mi
    # requests:
    #   cpu: 500m
    #   memory: 2048Mi

  nodeSelector: {}

  tolerations: []

  affinity: {}
```