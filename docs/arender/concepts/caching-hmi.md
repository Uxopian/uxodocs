---
viewer: classic
title: Viewer caching
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /concepts/caching-hmi
sidebar_position: 10
content_hash: 3e12c02b8485be48ffcf1a89005fbc1dfc330fa2eb81e550c8e7c907fc836683
---

# Viewer caching

The viewer (HMI) maintains its own document cache, separate from the Document Service Broker's cache. It stores document accessors and routing tables. Two cache strategies are available: **EhCache** (default, local) and **Hazelcast** (distributed, for multi-instance deployments).

## Cache strategy

Select the strategy with the following property in `arender-server.properties`:

```properties
# Valid values: ehCacheStrategy, hazelCastStrategy
arender.server.cache.strategy=ehCacheStrategy
```

`ehCacheStrategy` is the default. Use `hazelCastStrategy` only when running multiple viewer instances behind a load balancer.

## What gets cached

Both strategies cache the same data:

| Cache name | Content | Default idle timeout |
|------------|---------|---------------------|
| `documentAccessorMap` / `documentAccessorsHMI` | `DocumentAccessor` objects loaded by connectors, keyed by `DocumentId` | 3600 seconds |
| `directDocumentMap` | Directly uploaded or URL-loaded document accessors | 3600 seconds |

When a user opens a document:

1. The viewer checks the document accessor cache for an existing entry matching the `DocumentId`.
2. If absent, the connector fetches the document and the accessor is stored in the cache.
3. The viewer forwards the document to the broker for rendition.
4. The `documentRouteTable` records which broker instance holds the document, so subsequent page requests go to the same broker.

## EhCache strategy (default)

EhCache runs entirely within the viewer's JVM. It is the correct choice for single-instance deployments and requires no external infrastructure.

The viewer loads its EhCache configuration from `ehcache.xml` on the classpath. The default configuration is:

```xml title="ehcache.xml"
<?xml version="1.0" encoding="UTF-8"?>
<config xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
	xmlns='http://www.ehcache.org/v3'
	xsi:schemaLocation="http://www.ehcache.org/v3 http://www.ehcache.org/schema/ehcache-core.xsd">

  <cache
		alias="documentAccessorMap">
		<key-type>com.arondor.viewer.client.api.document.DocumentId</key-type>
		<value-type>com.arondor.viewer.rendition.api.document.DocumentAccessor</value-type>
		<expiry>
			<tti unit="seconds">3600</tti>
		</expiry>
		<resources>
			<heap unit="entries">10000</heap>
		</resources>
	</cache>
	
	<cache
		alias="directDocumentMap">
		<key-type>com.arondor.viewer.client.api.document.DocumentId</key-type>
		<value-type>com.arondor.viewer.rendition.api.document.Document</value-type>
		<expiry>
			<tti unit="seconds">3600</tti>
		</expiry>
		<resources>
			<heap unit="entries">5000</heap>
		</resources>
	</cache>
	
	<cache
		alias="configurationContextMap">
		<key-type>com.arondor.viewer.client.api.configuration.ConfigurationContext</key-type>
		<value-type>com.arondor.common.reflection.model.config.ObjectConfigurationMap</value-type>
		<expiry>
			<tti unit="seconds">3600</tti>
		</expiry>
		<resources>
			<heap unit="entries">10</heap>
		</resources>
	</cache>

</config>
```

To override the defaults, provide a custom `ehcache.xml` and place it on the classpath (for example, mount it into the container at `/home/arender/config/`).

:::note
EhCache does not support distributed locking. It is local to the JVM and cannot be shared across viewer instances. If you need clustering, use `hazelCastStrategy` instead.
:::

## Hazelcast strategy

The Hazelcast strategy replaces the EhCache maps with Hazelcast distributed maps. All viewer instances in the cluster share the same cache, which allows any instance to serve any user without a sticky session requirement.

:::info
Hazelcast distributes cached objects across the cluster by serializing them. All `DocumentAccessor` implementations stored in the cache must therefore implement `java.io.Serializable`. Custom connector implementations that do not serialize will cause runtime errors when Hazelcast attempts to replicate entries to other members.
:::

In addition to the document accessor caches, Hazelcast also stores:

| Map name | Content | Default idle timeout |
|----------|---------|---------------------|
| `spring:session:sessions` | HTTP session data (when Hazelcast sessions are enabled) | Managed by Spring Session |
| `spring:oauth2:oauth2Authorized` | OAuth2 authorized client tokens (when OAuth2 is enabled) | No idle expiry |
| `documentRouteTable` | Mapping from `DocumentId` to the broker instance that holds the document | No idle expiry |

The viewer reads its Hazelcast configuration from a `hazelcast.yaml` file:

```yaml title="hazelcast.yaml"
hazelcast:
  map:
    documentAccessorsHMI:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
    directDocumentMap:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
    spring:oauth2:oauth2Authorized:
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
  network:
    port:
      port: 5702
    join:
      auto-detection:
        enabled: false
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

To point the viewer at a custom Hazelcast configuration file, set:

```properties
arender.server.cache.hazelCast.config.path=/path/to/hazelcast.yaml
```

### Viewer clustering

When running multiple viewer instances behind a load balancer, enable Hazelcast member discovery so all instances form a cluster and share the document accessor cache. Configure TCP/IP join with the addresses of all viewer instances, or use Hazelcast's Kubernetes discovery in Kubernetes environments.

In Kubernetes, the Helm chart configures discovery in **DNS Lookup** mode: it renders a `service-dns` entry pointing at a headless Service created by the chart, so viewer members resolve each other through in-cluster DNS rather than through the Kubernetes API. No RBAC permissions are required. See [Kubernetes discovery mode](/docs/arender/concepts/rendition-caching/#kubernetes-discovery-mode) for the comparison between the two modes.

The viewer and broker Hazelcast clusters are separate. They run on different ports (the viewer defaults to `5702`) and do not join each other. The viewer communicates with the broker through REST/HTTP, not through Hazelcast.

## Comparison

| | EhCache (default) | Hazelcast |
|---|---|---|
| **Scope** | Local JVM only | Distributed across viewer instances |
| **Infrastructure** | None required | Hazelcast cluster |
| **Distributed locking** | No | Yes |
| **Use case** | Single instance | Multiple instances behind a load balancer |

## Related pages

- [Caching](./caching.md): broker-side caching (shared by both viewers)
- [Documents and document IDs](./documents-and-ids.md): how `DocumentId` values are generated and used as cache keys
