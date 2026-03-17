---
title: Caching
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /concepts/caching
sidebar_position: 9
content_hash: eb388b0edf4807a022f029f197eb0e0dc2d9418349a38fbb528ed63a353f5366
---

# Caching

ARender uses Hazelcast as a distributed in-memory data store. Both the viewer (HMI) and the service broker maintain Hazelcast instances that cache document accessors, routing tables, conversion state, and HTTP sessions. Caching reduces redundant document fetches and enables horizontal scaling of viewer and broker instances.

## What gets cached

### Viewer-side caches

The viewer uses Hazelcast maps to store:

| Map name | Content | Default idle timeout |
|----------|---------|---------------------|
| `documentAccessorsHMI` | `DocumentAccessor` objects loaded by connectors, keyed by `DocumentId` | 3600 seconds |
| `directDocumentMap` | Directly uploaded or URL-loaded document accessors | 3600 seconds |
| `spring:session:sessions` | HTTP session data (when Hazelcast sessions are enabled) | Managed by Spring Session |
| `spring:oauth2:oauth2Authorized` | OAuth2 authorized client tokens (when OAuth2 is enabled) | No idle expiry |
| `documentRouteTable` | Mapping from `DocumentId` to the service broker instance that holds the document | No idle expiry |

### Broker-side caches

The service broker uses its own Hazelcast instance with these maps:

| Map name | Content | Default idle timeout |
|----------|---------|---------------------|
| `documentAccessors` | Document files stored on the shared temporary volume, keyed by `DocumentId` | 3600 seconds |
| `conversionOrders` | Pending and completed document conversion tasks | 3600 seconds |
| `transformationOrders` | Pending and completed document transformation tasks | 3600 seconds |

When an entry is evicted, expired, or removed from the `documentAccessors` map, the broker runs a cleanup listener that deletes the associated temporary file from disk. This prevents the shared volume from growing without bound.

## How caching works

When a user opens a document, the following sequence occurs:

1. The viewer checks `documentAccessorsHMI` for an existing `DocumentAccessor` matching the `DocumentId`.
2. If absent, the connector fetches the document and the accessor is stored in the cache.
3. The viewer sends the document to the service broker for rendition.
4. The broker stores the document file on the shared temporary volume and registers it in the `documentAccessors` map.
5. The `documentRouteTable` on the viewer side records which broker instance owns the document, so subsequent requests for the same document go to the same broker.

For hierarchical `DocumentId` values (container documents), evicting a child triggers eviction of the root document and all related entries.

## Hazelcast configuration

Each component (viewer, broker) reads its Hazelcast configuration from a `hazelcast.yaml` file. The viewer checks for a custom file path first, then falls back to the classpath default.

A typical viewer configuration:

```yaml
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
```

A typical broker configuration:

```yaml
hazelcast:
  map:
    documentAccessors:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
    conversionOrders:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
    transformationOrders:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
  network:
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
```

### Key configuration parameters

**`max-idle-seconds`** controls how long an entry can sit without being accessed before it is automatically expired. The default of 3600 seconds (1 hour) means that documents not viewed for an hour are cleaned up from memory and, on the broker side, from disk.

**`eviction-policy: NONE`** means entries are not proactively evicted to make room for new ones. They are only removed when they expire due to idle timeout. If you deploy with limited memory, consider setting an eviction policy (such as `LRU`) and a `max-size-policy` with a concrete entry count.

**`network.join.auto-detection: false`** disables Hazelcast's automatic cluster discovery. In Docker or Kubernetes deployments, you typically configure explicit member discovery instead, using TCP/IP member lists or the Kubernetes discovery plugin.

## Cluster topology

By default, each ARender component runs an embedded Hazelcast instance with auto-detection disabled. This means each container runs its own standalone Hazelcast node. To enable clustering for high availability:

**Viewer clustering.** When running multiple viewer instances behind a load balancer, enable Hazelcast member discovery so all instances form a cluster. This shares HTTP sessions and document accessor caches across instances, allowing any instance to serve any user. Configure TCP/IP join with the addresses of all viewer instances, or use the Hazelcast Kubernetes discovery plugin in Kubernetes environments.

**Broker clustering.** Multiple broker instances can also form a Hazelcast cluster to share their document accessor cache and conversion order state. This is particularly relevant when the broker is scaled horizontally.

The viewer and broker Hazelcast clusters are separate. They run on different ports (the viewer defaults to 5702, the broker uses the Hazelcast default) and do not join each other. The viewer communicates with the broker through REST/HTTP, not through Hazelcast.

## Monitoring

Hazelcast exposes a REST API on each node when `rest-api.enabled` is `true`. The following endpoint groups are enabled by default:

- `HEALTH_CHECK`: reports node health at `/hazelcast/health`
- `CLUSTER_READ`: provides cluster state and member information
- `DATA`: allows reading map entries for debugging

These endpoints are useful for readiness and liveness probes in Kubernetes deployments.

## Tuning considerations

Increasing `max-idle-seconds` keeps documents in memory longer, reducing re-fetch overhead for frequently accessed documents but consuming more memory. In deployments with large documents or high concurrency, monitor Hazelcast heap usage and adjust the idle timeout accordingly.

If multiple users open the same document, the self-contained `DocumentId` generator ensures they all produce the same `DocumentId`. This means the cache naturally deduplicates: the document is fetched and stored once, then served from cache for subsequent requests.

## Related pages

- [Documents and document IDs](./documents-and-ids.md): how `DocumentId` values are generated and used as cache keys
- [Security model](./security-model.md): how Hazelcast-backed sessions support OAuth2 in multi-instance deployments
- [System architecture](../overview/architecture.md): how the viewer and broker interact
