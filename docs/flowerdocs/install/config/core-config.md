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

## OpenSearch

| Property | Description |
| --- | --- |
| `opensearch.pool.max.total` / `opensearch.pool.max.per.route` | HTTP connection pool size (default `200`) |
| `opensearch.connect.timeout` / `opensearch.socket.timeout` | Connect and read timeouts (default `5000` / `60000` ms) |

## REST OperationHandler

| Property | Description |
| --- | --- |
| `rest.oh.pool.max.total` / `rest.oh.pool.max.per.route` | Client pool size (default `200` / `100`) |
| `rest.oh.connect.timeout` / `rest.oh.read.timeout` | Callback connect and read timeouts (default `5000` / `30000` ms) |

## ARender rendition

The pool Core uses to reach the ARender rendition service.

| Property | Description |
| --- | --- |
| `arender.server.rendition.rest.max.connections` | Pool size, beyond which requests wait for a free connection (default `200`) |
| `arender.server.rendition.rest.pending.acquire.timeout` / `arender.server.rendition.rest.pending.acquire.max.count` | How long a request waits for a pooled connection, and how many may wait (default `120000` ms / `-1`, no limit) |
| `arender.server.rendition.rest.max.idle.time` / `arender.server.rendition.rest.max.life.time` | Close a connection after it has been idle, or after it has existed, for this long (default `-1` for both, meaning never) |
| `arender.server.rendition.rest.read.timeout` / `arender.server.rendition.rest.write.timeout` | Read and write timeouts (default `120000` ms) |
| `arender.server.rendition.rest.max.in.memory.size` | Maximum number of bytes buffered in memory (default `8000000`) |

:::warning Set `max.idle.time` below any idle timeout on the network path
If Core reaches the rendition service through a load balancer, a reverse proxy or a firewall, that component will close idle connections without telling either side. With `max.idle.time` left at `-1` the pool never recycles, so it hands out connections the other end has already dropped. The symptom is a request that stalls for exactly the idle-timeout duration and then succeeds on retry, and under sustained load the pool fills with dead connections.

Set `max.idle.time` below the shortest idle timeout on the path. For a 60 second load balancer timeout, `arender.server.rendition.rest.max.idle.time=30000` with `arender.server.rendition.rest.max.life.time=300000` is a sound starting point.
:::

Two points worth knowing:

- The ARender HMI has its own pool with the same defaults, configured in ARender's own files. If the viewer and thumbnails traverse the same load balancer, set `arender.server.rendition.rest.max.idle.time` there too.
- Do not confuse this namespace with `rest.client.*`, which configures the rendition broker's outgoing calls to its microservices and belongs on the broker, not on Core.

# Security headers

The GUI sends a Content-Security-Policy and browser security headers. Override these only if you embed FlowerDocs, serve assets from a custom CDN, or run a companion application on a non-default port: `content.security.policy`, `content.security.policy.directives`, `hsts.max.age`, `referrer.policy`, `permissions.policy`, `cross.origin.opener.policy`, `cross.origin.resource.policy`.
