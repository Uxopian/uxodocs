---
title: Rendition server
last_update:
  date: '2026-01-29T10:50:12.660Z'
  author: CI/CD Bot
content_hash: 0408e7e665711fd8065c55d097b3f61a65b8721a9a1d768ace1159cd71cbff98
---

## Introduction

## Parameters

The following table lists the configurable parameters of the ARender rendition subchart and their default values.

### General values

| Parameters                | Description                                     | Default |
| :------------------------ | :---------------------------------------------- | :------ |
| `global.imagePullSecrets` | Global Docker registry secret names as an array | `[]`    |
| `rendition.enabled`       | Enable the rendition deployment                 | `true`  |

### Document service broker

The following table lists the configurable parameters of the document service broker microservice and their default values.

| Parameters                               | Description                                                                      |              Default               |
| :--------------------------------------- | :------------------------------------------------------------------------------- | :--------------------------------: |
| `rendition.broker.replicaCount`          | Number of the broker pod replica to deploy                                       |                `1`                 |
| `rendition.broker.image.repository`      | Broker image name                                                                | `artifactory.arondor.cloud:5001/arender-document-service-broker` |
| `rendition.broker.image.tag`             | Broker image tag. If empty use AppVersion                                        | `2023.16.0`         |
| `rendition.broker.image.pullPolicy`      | Broker image pull policy                                                         |              `Always`              |
| `rendition.broker.rbac.create`           | Specifies whether the role resources to compute the weather should be created    |               `true`               |
| `rendition.broker.serviceAccount.create` | Specifies whether a service account should be created                            |               `true`               |
| `rendition.broker.serviceAccount.name`   | Name of the service account created. If not set defaulted to ARender UI fullname |                `''`                |
| `rendition.broker.podSecurityContext`    | Broker pod security context                                                      |                `{}`                |
| `rendition.broker.securityContext`       | Broker container security context                                                |                `{}`                |
| `rendition.broker.service.type`          | Broker service type                                                              |            `ClusterIP`             |
| `rendition.broker.ingress.enabled`       | Enable rendition Ingress                                                         |              `false`               |
| `rendition.broker.ingress.annotations`   | Ingress rendition annotations                                                    |                `{}`                |
| `rendition.broker.ingress.hosts`         | Ingress rendition hosts                                                          |                `[]`                |
| `rendition.broker.ingress.tls`           | Rendition Tls config                                                             |                `[]`                |
| `rendition.broker.resources`             | Broker resources limits and requests                                             |                `{}`                |
| `rendition.broker.nodeSelector`          | Broker node selector                                                             |                `{}`                |
| `rendition.broker.environment`           | Environment variables to pass to the broker container as a Map                   |                `{}`                |

If `rendition.broker.rbac.create` is not set to `true`, insure that the service account of the service broker has enough rights to compute the 'weather'.

By default, given rights are:

```yaml
rules:
    - apiGroups: ["*"]
      resources:
          - "nodes"
      verbs:
          - "get"
          - "list"
```

### Document converter

The following table lists the configurable parameters of the document converter microservice and their default values.

| Parameters                                  | Description                                                                     |            Default            |
| :------------------------------------------ | :------------------------------------------------------------------------------ | :---------------------------: |
| `rendition.converter.replicaCount`          | Number of the converter pod replica to deploy                                   |              `1`              |
| `rendition.converter.autoscale.enabled`     | Enable horizontal autoscaling of converter pods                                 |            `false`            |
| `rendition.converter.autoscale.maxReplicas` | Maximum number of the converter pod replica in the cluster                      |              `3`              |
| `rendition.converter.autoscale.cpuLimit`    | Percentage of CPU requested target to scale horizontally                        |             `80`              |
| `rendition.converter.image.repository`      | Document converter image name                                                   | `artifactory.arondor.cloud:5001/arender-document-converter` |
| `rendition.converter.image.tag`             | Document converter image tag. If empty use AppVersion                           | `2023.16.0`         |
| `rendition.converter.imagepullPolicy`       | Document converter image pull policy                                            |           `Always`            |
| `rendition.converter.serviceAccount.create` | Specifies whether a service account should be created                           |            `true`             |
| `rendition.converter.serviceAccount.name`   | Name of the service account created. If not set defaulted to converter fullname |             `''`              |
| `rendition.converter.podSecurityContext`    | Converter pods security context                                                 |             `{}`              |
| `rendition.converter.securityContext`       | Converter container security context                                            |             `{}`              |
| `rendition.converter.service.type`          | Converter service type                                                          |          `ClusterIP`          |
| `rendition.converter.resources`             | Converter resources limits and requests                                         |             `{}`              |
| `rendition.converter.nodeSelector`          | Converter node selector                                                         |             `{}`              |
| `rendition.converter.environment`           | Environment variables to pass to the converter container as a Map               |             `{}`              |

### Hazelcast

The following table lists the configurable parameters of the service Hazelcast and their default values in the file _values.yaml_.

| Parameters                   | Description            |   Default   |
| :--------------------------- | :--------------------- | :---------: |
| `hazelcast.service.port`     | Port used by Hazelcast |   `5701`    |
| `hazelcast.service.portname` | Port name of Hazelcast | `hazelcast` |

### Document text handler

The following table lists the configurable parameters of the document text handler microservice and their default values.

| Parameters                                | Description                                                                   |             Default              |
| :---------------------------------------- | :---------------------------------------------------------------------------- | :------------------------------: |
| `rendition.handler.replicaCount`          | Number of the handler pod replica to deploy                                   |               `1`                |
| `rendition.handler.autoscale.enabled`     | Enable horizontal autoscaling of handler pods                                 |             `false`              |
| `rendition.handler.autoscale.maxReplicas` | Maximum number of the handler pod replica in the cluster                      |               `3`                |
| `rendition.handler.autoscale.cpuLimit`    | Percentage of CPU requested target to scale horizontally                      |               `80`               |
| `rendition.handler.image.repository`      | Document handler image name                                                   | `artifactory.arondor.cloud:5001/arender-document-text-handler` |
| `rendition.handler.image.tag`             | Document handler image tag. If empty use AppVersion                           | `2023.16.0`          |
| `rendition.handler.imagepullPolicy`       | Document handler image pull policy                                            |             `Always`             |
| `rendition.handler.serviceAccount.create` | Specifies whether a service account should be created                         |              `true`              |
| `rendition.handler.serviceAccount.name`   | Name of the service account created. If not set defaulted to handler fullname |               `''`               |
| `rendition.handler.podSecurityContext`    | handler pods security context                                                 |               `{}`               |
| `rendition.handler.securityContext`       | handler container security context                                            |               `{}`               |
| `rendition.handler.service.type`          | handler service type                                                          |           `ClusterIP`            |
| `rendition.handler.resources`             | handler resources limits and requests                                         |               `{}`               |
| `rendition.handler.nodeSelector`          | handler node selector                                                         |               `{}`               |
| `rendition.handler.environment`           | Environment variables to pass to the handler container as a Map               |               `{}`               |

### Document renderer

The following table lists the configurable parameters of the document renderer microservice and their default values.

| Parameters                                 | Description                                                                    |           Default            |
| :----------------------------------------- | :----------------------------------------------------------------------------- | :--------------------------: |
| `rendition.renderer.replicaCount`          | Number of the renderer pod replica to deploy                                   |             `1`              |
| `rendition.renderer.autoscale.enabled`     | Enable horizontal autoscaling of renderer pods                                 |           `false`            |
| `rendition.renderer.autoscale.maxReplicas` | Maximum number of the renderer pod replica in the cluster                      |             `3`              |
| `rendition.renderer.autoscale.cpuLimit`    | Percentage of CPU requested target to scale horizontally                       |             `80`             |
| `rendition.renderer.image.repository`      | Document renderer image name                                                   | `artifactory.arondor.cloud:5001/arender-document-renderer` |
| `rendition.renderer.image.tag`             | Document renderer image tag. If empty use AppVersion                           | `2023.16.0`          |
| `rendition.renderer.imagepullPolicy`       | Document renderer image pull policy                                            |           `Always`           |
| `rendition.renderer.serviceAccount.create` | Specifies whether a service account should be created                          |            `true`            |
| `rendition.renderer.serviceAccount.name`   | Name of the service account created. If not set defaulted to renderer fullname |             `''`             |
| `rendition.renderer.podSecurityContext`    | renderer pods security context                                                 |             `{}`             |
| `rendition.renderer.securityContext`       | renderer container security context                                            |             `{}`             |
| `rendition.renderer.service.type`          | renderer service type                                                          |         `ClusterIP`          |
| `rendition.renderer.resources`             | renderer resources limits and requests                                         |             `{}`             |
| `rendition.renderer.nodeSelector`          | renderer node selector                                                         |             `{}`             |
| `rendition.renderer.environment`           | Environment variables to pass to the renderer container as a Map               |             `{}`             |
