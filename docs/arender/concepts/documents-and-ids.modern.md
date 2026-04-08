---
title: Documents and document IDs
last_update:
  date: '2026-03-24T08:07:20.846Z'
  author: CI/CD Bot
slug: /concepts/documents-and-ids
sidebar_position: 1
content_hash: 7d2d1377b56312e9094040a2135f3d88ed008e839a348648db607fe677f0ad73
---

# Documents and document IDs

Every document in ARender is identified by a **DocumentId** and accessed through a **DocumentAccessor**. Think of it as a key-value pair: the DocumentId is the key, the DocumentAccessor is the value. This pair is the foundation of how ARender identifies and accesses documents across the viewer, Document Service Broker, connectors, and caching layer.

## DocumentId

A `DocumentId` is a string-valued handle that uniquely identifies a document within the system. The viewer, the broker, and caching layer all use `DocumentId` as the common key.

The internal string representation is opaque to most consumers. By default ARender uses a Base64 encoding that produces IDs prefixed with `b64_`:

```
b64_dXJsPWh0dHA6Ly9leGFtcGxlLmNvbS9zYW1wbGUucGRm
```

You will see these IDs in viewer URLs and in broker logs. Different [ID generators](../guides/features/document-id-generators.md) produce different formats (encrypted, UUID-based), but from a consumer's perspective the ID is always an opaque string.

:::info
When opening documents by URL, the rendition service only authorizes whitelisted domains. By default, no domain is authorized. See [Opening documents](../guides/features/opening-documents.md) for configuration.
:::

### Hierarchical IDs

When multiple documents are opened together as a container, each child document receives a `DocumentId` formed from the parent ID followed by `/` and a numeric index:

```
b64_<parent-parameters>/0
b64_<parent-parameters>/1
```

This hierarchy allows the broker and caching layer to manage document groups as a unit — for example, evicting all children when the parent container expires.

## DocumentAccessor

A `DocumentAccessor` is the broker's internal runtime object behind a DocumentId. It provides access to document content, metadata, and annotations. You can think of it as the loaded, ready-to-use representation of a document inside the broker.

How a `DocumentAccessor` gets created depends on how the document is loaded:

- **Via a provider** — [providers](../guides/integration/connector-providers.md) return document content via REST. The broker creates the `DocumentAccessor` internally from the provider response.
- **By URL** — the broker fetches the document from the URL and creates the `DocumentAccessor` itself.

Regardless of how the `DocumentAccessor` is created, the rest of the rendition pipeline treats it identically: the broker resolves the layout, delegates conversion, rendering, and text extraction using the same `DocumentId` as cache key.

## Related pages

- [Opening documents](../guides/features/opening-documents.md): URL parameters and multi-document opening
- [Document ID generators](../guides/features/document-id-generators.md): configuring Base64, encrypted, and UUID generators
- [Connector providers](../guides/integration/connector-providers.md): how providers load documents via REST
- [Rendition caching](./caching.md): how `DocumentId` values are used as cache keys
