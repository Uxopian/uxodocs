---
title: "Configuration of Hazelcast"
sidebar_position: 2
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: ce97ff605bda58cb768aeccd33d9c711e24ec1c507330fc893052d49d3a34cd4
---

Since the version 4.8.2, it is possible to configure HazelCast for caching DocumentAccessor.
It provides better support for the scalability of the Web-UI thanks to its shared and distributed cache system.

## Configure HazelCast in ARender


```cfg title="arender-server.properties"
# Defines the cache strategy to use. Valid values : ehCacheStrategy, hazelCastStrategy
arender.server.cache.strategy=ehCacheStrategy
# Path of the hazelCast configuration file, if the value is empty then the default one in the classpath will be used. 
arender.server.cache.hazelCast.config.path=
```

The default configuration file for Hazelcast can be found on the Web-UI side in the WEB application resources at the path *WEB-INF/classes/ressources/hazelcast.yaml*

```cfg title="Default file: hazelcast.yaml"
hazelcast:
  map:
    documentAccessorsHMI:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
        size: 5
  network:
    port:
      port: 5702
    join:
      auto-detection:
        enabled: true
    rest-api:
      enabled: true
      endpoint-groups:
        CLUSTER_READ:
          enabled: true
        HEALTH_CHECK:
          enabled: true
        WAN:
          enabled: true
        DATA:
          enabled: true

```

:::warning Warning


For now the connectors supported by ARender have not yet undergone the necessary changes to support HazelCast.

If you have implemented your own connector, then you will need to make your DocumentAccessor properly serializable/deserializable.

:::
