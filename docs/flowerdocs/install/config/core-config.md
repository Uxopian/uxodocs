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
| opensearch.uris     | Addresses of the various OpenSearch nodes separated by a `,` |
| opensearch.cluster  | OpenSearch cluster name (default `flowerdocs`)               |
| opensearch.username | User name _(optional)_                                       |
| opensearch.password | User password _(optional)_                                   |

# Redis

| Property          | Description                                         |
| ----------------- | --------------------------------------------------- |
| redis.enabled     | Enables Redis, a prerequisite for high availability |
| spring.data.redis.host | Host name Redis                                |
| spring.data.redis.port | Redis listening port                           |

# ARender

| Property                | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| arender.rendition.nodes | Address of the ARender rendition or a Load Balancer |

It is not recommended to modify ARender properties by setting parameters in the `core.properties` file. Properties that are not defined in the documentation are not qualified by FlowerDocs: the correct operation of the application is therefore not guaranteed with these modifications.

# Connection pools and timeouts

The connection pools and timeouts of the main infrastructure components are configurable. Defaults are tuned for a typical load; adjust them per environment.

| Property | Description |
| --- | --- |
| `opensearch.pool.max.total` / `opensearch.pool.max.per.route` | OpenSearch HTTP connection pool size (default `200`) |
| `opensearch.connect.timeout` / `opensearch.socket.timeout` | OpenSearch connect / read timeout (default `5000` / `60000` ms) |
| `rest.oh.connect.timeout` / `rest.oh.read.timeout` | REST OperationHandler callback timeouts (default `5000` / `30000` ms) |
| `rest.oh.pool.max.total` / `rest.oh.pool.max.per.route` | REST OperationHandler client pool (default `200` / `100`) |

# Security headers

The GUI sends a Content-Security-Policy and browser security headers. Override these only if you embed FlowerDocs, serve assets from a custom CDN, or run a companion application on a non-default port: `content.security.policy`, `content.security.policy.directives`, `hsts.max.age`, `referrer.policy`, `permissions.policy`, `cross.origin.opener.policy`, `cross.origin.resource.policy`.
