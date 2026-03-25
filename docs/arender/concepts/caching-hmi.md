---
viewer: classic
title: Classic viewer caching
last_update:
  date: '2026-03-24T08:07:20.846Z'
  author: CI/CD Bot
sidebar_position: 10
content_hash: b25a6dff9ab4909318f44a62b3a59d763dd00811ea3019b57bb9a34dd1d2c4cb
---

# Classic viewer caching

The Classic viewer (HMI) runs its own Hazelcast instance, separate from the broker's Hazelcast cluster. It stores document accessors, routing tables, and HTTP sessions. This page covers the viewer-side caching; for broker-side caching shared by both viewers, see [Caching](./caching.md).

## What gets cached

The Classic viewer uses Hazelcast maps to store:

| Map name | Content | Default idle timeout |
|----------|---------|---------------------|
| `documentAccessorsHMI` | `DocumentAccessor` objects loaded by connectors, keyed by `DocumentId` | 3600 seconds |
| `directDocumentMap` | Directly uploaded or URL-loaded document accessors | 3600 seconds |
| `spring:session:sessions` | HTTP session data (when Hazelcast sessions are enabled) | Managed by Spring Session |
| `spring:oauth2:oauth2Authorized` | OAuth2 authorized client tokens (when OAuth2 is enabled) | No idle expiry |
| `documentRouteTable` | Mapping from `DocumentId` to the service broker instance that holds the document | No idle expiry |

## How it works

When a user opens a document in the Classic viewer:

1. The viewer checks `documentAccessorsHMI` for an existing `DocumentAccessor` matching the `DocumentId`.
2. If absent, the connector fetches the document and the accessor is stored in the cache.
3. The viewer sends the document to the service broker for rendition.
4. The `documentRouteTable` records which broker instance owns the document, so subsequent requests go to the same broker.

## Hazelcast configuration

The Classic viewer reads its Hazelcast configuration from a `hazelcast.yaml` file:

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

## Viewer clustering

When running multiple Classic viewer instances behind a load balancer, enable Hazelcast member discovery so all instances form a cluster. This shares HTTP sessions and document accessor caches across instances, allowing any instance to serve any user. Configure TCP/IP join with the addresses of all viewer instances, or use the Hazelcast Kubernetes discovery plugin in Kubernetes environments.

The viewer and broker Hazelcast clusters are separate. They run on different ports (the viewer defaults to 5702, the broker uses the Hazelcast default) and do not join each other. The viewer communicates with the broker through REST/HTTP, not through Hazelcast.

## Related pages

- [Caching](./caching.md): broker-side caching (shared by both viewers)
- [Documents and document IDs](./documents-and-ids.md): how `DocumentId` values are generated and used as cache keys
