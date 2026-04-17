---
title: Providers
last_update:
  date: '2026-03-24T08:07:20.846Z'
  author: CI/CD Bot
slug: /concepts/connectors
sidebar_position: 2
content_hash: 24febedbd2f51009f33dfe1a7d5851fe8b6d273c3b0544bd0f844f4c5bbecc1f
---

# Providers

A provider is what bridges ARender with an external document repository. It is responsible for retrieving document content from an external system and making it available to the viewer.

Providers are standalone REST microservices. Each provider runs as its own Docker container, independent of the viewer.

A provider:

1. **Runs** as a separate service that exposes a REST API for document retrieval.
2. **Receives** requests from the Document Service Broker, which routes them based on the `X-Provider-ID` header which is injected by the reverse proxy layer (Nginx, BFF).
3. **Returns** document content via REST resources (`ProviderFile` / `ProviderFolder`).

This model decouples providers from the viewer, allowing each one to be deployed, scaled, and updated independently.

See [Providers](../guides/integration/providers.md) for deployment details.

## Annotation connectors

Annotation storage is handled by the broker, which proxies annotation CRUD operations to the provider when the repository supports it. The annotation backend (JDBC, XFDF, REST, or repository-native) is configured on the broker side.

See [Annotations](./annotations.md) for the annotation model.

## Related pages

- [Providers](../guides/integration/providers.md): provider deployment
- [Provider API reference](../reference/rest-api/provider-api.md): REST endpoint contract for providers
- [Documents and document IDs](./documents-and-ids.md): the DocumentId / DocumentAccessor model
- [Annotations](./annotations.md): the annotation model and storage
