---
title: Connectors
last_update:
  date: '2026-03-24T08:07:20.846Z'
  author: CI/CD Bot
slug: /concepts/connectors
sidebar_position: 2
content_hash: 24febedbd2f51009f33dfe1a7d5851fe8b6d273c3b0544bd0f844f4c5bbecc1f
---

# Connectors

A connector is what bridges ARender with an external document repository. It is responsible for retrieving document content from an external system and making it available to the viewer.

## Provider model

Connectors are standalone REST microservices called **providers**. Each provider runs as its own Docker container, independent of the viewer.

A provider:

1. **Runs** as a separate service that exposes a REST API for document retrieval.
2. **Receives** requests from the service broker, which routes them based on the `X-Provider-ID` header.
3. **Returns** document content via REST resources (`ProviderFile` / `ProviderFolder`).
4. The **service broker** creates `DocumentAccessor` instances internally from the provider response, so the rest of the pipeline works the same way.

This model decouples connectors from the viewer, allowing each provider to be deployed, scaled, and updated independently.

See [Connector providers](../guides/integration/connector-providers.md) for deployment details.

## Annotation connectors

Annotation storage follows the same connector model. Each `AnnotationAccessor` implementation connects to a storage backend — a SQL database (JDBC), an HTTP endpoint (REST), the local filesystem (XFDF), or a repository-native store. The viewer picks the annotation connector that matches its configuration.

See [Annotations](./annotations.md) for the annotation model.

## Related pages

- [Connector providers](../guides/integration/connector-providers.md): provider deployment
- [Provider API reference](../reference/rest-api/provider-api.md): REST endpoint contract for providers
- [Documents and document IDs](./documents-and-ids.md): the DocumentId / DocumentAccessor model
- [Annotations](./annotations.md): the annotation model and storage
