---
title: Core Configuration
sidebar_position: 3
date: "2000-03-31T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: f51d5da6b342612ec68b8cdf08c8101e1c27b67a7a38815b217b513e47c71796
---

This section describes the various FlowerDocs Core configurations to be defined in the application's `core.properties` file.

# General

| Property              | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| system.admin.username | System account identifier                                        |
| system.admin.password | System account password, can be encrypted with a secret          |
| token.key             | Token shared between **FlowerDocs Core**, **FlowerDocs GUI** and **ARender HMI** |
| secret                | Secret used to encode password _(optional)_                      |
| core.context          | Application context                                              |

# Logging

| Property           | Description                                 |
| ------------------ | ------------------------------------------- |
| logging.file.name  | Log file path and name                      |
| logging.level.root | Log level: `WARN`, `ERROR`, `INFO`, `DEBUG` |

# OpenSearch

| Property    | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| es.nodes    | Addresses of the various OpenSearch nodes separated by a `,` |
| es.cluster  | OpenSearch cluster name                                      |
| es.username | User name _(optional)_                                       |
| es.password | User password _(optional)_                                   |

# Redis

| Property          | Description                                         |
| ----------------- | --------------------------------------------------- |
| redis.enabled     | Enables Redis, a prerequisite for high availability |
| spring.redis.host | Host name Redis                                     |
| spring.redis.port | Redis listening port                                |

# ARender

| Property                | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| arender.rendition.nodes | Address of the ARender rendition or a Load Balancer |

It is not recommended to modify ARender properties by setting parameters in the `core.properties` file. Properties that are not defined in the documentation are not qualified by FlowerDocs: the correct operation of the application is therefore not guaranteed with these modifications.
