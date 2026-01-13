---
title: Clustering & HA
date: "2000-03-28"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: bcf52d9e361575d66aa8e5ff5b41920cabaff84020b648befbcee036b08b1ac9
---

# Activation

A FlowerDocs stack made up of several instances requires certain data to be synchronized in order to function at both the **FlowerDocs Core** and **FlowerDocs GUI** levels.
To achieve this, FlowerDocs uses the [Redis] key-value database (https://redis.io/) to manage:

- session persistence between different GUI instances
- a distributed cache for maintaining component reservations
- renewal of "static" caches (component classes, ACLs, GUI configurations, etc.) between the various **FlowerDocs Core** and **FlowerDocs GUI** instances
- persistence and distribution of asynchronous `OperationHandler`

<br/>
This database offers high performance as the data is stored in memory.

:::info
To activate this connector, you need to add the `redis.enabled=true` property.
:::

# Access

Depending on the architecture chosen, the configuration for accessing Redis needs to be adapted.

## Simple

This communication mode allows the use of a single Redis instance. This can be configured by specifying the `spring.redis.host` and `spring.redis.port` properties.

<br/>
__Note:__ *This type of configuration is not recommended for a production environment.*

## Sentinel

The [Redis Sentinel](https://redis.io/topics/sentinel) mode enables Redis to be set up in high-availability mode.
This mode is activated by entering the name of the Redis master via the `spring.redis.sentinel.master` property, and the set of Redis nodes via `spring.redis.sentinel.nodes` (list of _host:port_ separated by commas).

## Configuration

The properties listed below are used to configure communication with Redis.

| Property              | Description                 |
| --------------------- | --------------------------- |
| spring.redis.password | Password                    |
| spring.redis.timeout  | Timeout for Redis exchanges |
| spring.redis.database | Redis database index        |
| spring.redis.timeout  | Maximum connection time     |

:::info

- It is recommended to follow [Redis recommendations](https://redis.io/topics/security) to guarantee the security of this component.
- Setting up an encrypted tunnel between FlowerDocs and Redis can be done with the [spiped](http://www.tarsnap.com/spiped.html) utility as [indicated by Redis](https://redis.io/topics/encryption).
  :::
