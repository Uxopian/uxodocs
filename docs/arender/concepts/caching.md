---
title: Rendition caching
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /concepts/rendition-caching
sidebar_position: 9
content_hash: 4df0f3bb9e892d3c475244281aad481d1d345ddd2684975613edf31766159229
---

# Caching

ARender uses Hazelcast as a distributed in-memory data store on the Document Service Broker. Caching reduces redundant document fetches and enables horizontal scaling of broker instances.

## What gets cached

The Document Service Broker uses Hazelcast maps to store:

| Map name | Content | Default idle timeout |
|----------|---------|---------------------|
| `documentAccessors` | Document files stored on the shared temporary volume, keyed by `DocumentId` | 3600 seconds |
| `conversionOrders` | Pending and completed document conversion tasks | 3600 seconds |
| `transformationOrders` | Pending and completed document transformation tasks | 3600 seconds |

When an entry is evicted, expired, or removed from the `documentAccessors` map, the broker runs a cleanup listener that deletes the associated temporary file from disk. This prevents the shared volume from growing without bound.

## How caching works

When a user opens a document:

1. The viewer sends a document load request to the broker (by URL, via a connector, or via a provider).
2. The broker stores the document file on the shared temporary volume and registers it in the `documentAccessors` map.
3. The broker returns a `DocumentId` that the viewer uses for subsequent page rendering requests.

For hierarchical `DocumentId` values (container documents), evicting a child triggers eviction of the root document and all related entries.

## Hazelcast configuration

The broker reads its Hazelcast configuration from a `hazelcast.yaml` file:

```yaml title="hazelcast.yaml"
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
        WAN:
          enabled: true
        DATA:
          enabled: true
```

### Key configuration parameters

**`max-idle-seconds`** controls how long an entry can sit without being accessed before it is automatically expired. The default of 3600 seconds (1 hour) means that documents not viewed for an hour are cleaned up from memory and from disk.

**`eviction-policy: NONE`** means entries are not proactively evicted to make room for new ones. They are only removed when they expire due to idle timeout. If you deploy with limited memory, consider setting an eviction policy (such as `LRU`) and a `max-size-policy` with a concrete entry count.

**`network.join.auto-detection: false`** disables Hazelcast's automatic cluster discovery. In Docker or Kubernetes deployments, you configure explicit member discovery instead, using TCP/IP member lists or Hazelcast's Kubernetes discovery in DNS Lookup mode.

## Document Service Broker clustering

Multiple broker instances can form a Hazelcast cluster to share their document accessor cache and conversion order state. This is particularly relevant when the broker is scaled horizontally. Configure TCP/IP join with the addresses of all broker instances, or use Hazelcast's Kubernetes discovery in Kubernetes environments.

### Kubernetes discovery mode

Hazelcast's Kubernetes discovery offers two modes, and the distinction matters when the cluster enforces restricted RBAC:

| Mode | Configured with | Requires Kubernetes API access |
|---|---|---|
| **DNS Lookup** | `service-dns` pointing at a headless Service | No |
| Kubernetes API | `service-name` and `namespace` | Yes — the pod's ServiceAccount needs read access to endpoints and pods |

The Helm charts use **DNS Lookup**. They render a `service-dns` entry pointing at a headless Service (`clusterIP: None`) created by the chart, so members resolve each other through in-cluster DNS:

```yaml title="hazelcast.yml (rendered by the chart)"
network:
  join:
    multicast:
      enabled: false
    kubernetes:
      enabled: true
      service-dns: <release>-hazelcast-headless.<namespace>.svc.cluster.local
      service-port: 5701
```

:::info[No RBAC permissions are required for Hazelcast]
Because discovery relies on DNS rather than the Kubernetes API, ARender needs no `Role`, `ClusterRole` or `RoleBinding` for Hazelcast to form a cluster, and no permissions have to be granted on the Kubernetes API. This makes the charts deployable on clusters that restrict API access.
:::

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
- [System architecture](../overview/architecture.md): how the viewer and broker interact
