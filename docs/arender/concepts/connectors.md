---
title: Connectors
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /concepts/connectors
sidebar_position: 2
---

# Connectors

A connector is a `DocumentAccessor` provider. In the [DocumentId / DocumentAccessor](./documents-and-ids.md) key-value model, the connector is what produces the **value**: it knows how to reach an external document source and return a `DocumentAccessor` from it.

## What a connector does

When a user opens a document, the viewer delegates retrieval to a connector. The connector:

1. **Parses** the incoming request through a `DocumentServiceURLParser` (the `canParse` / `parse` contract)
2. **Connects** to the external system using its native API (CMIS, FileNet P8 CE, HTTP, etc.)
3. **Returns** a `DocumentAccessor` that provides the document content stream, MIME type, and metadata
4. Optionally **provides** an `AnnotationAccessor` so that annotations are stored back into the same external system

Connectors are loaded as Spring Boot auto-configured beans. Adding a connector to a deployment means placing its JAR on the viewer's classpath.

## Annotation connectors

Annotation storage follows the same connector model. Each `AnnotationAccessor` implementation connects to a storage backend — a SQL database (JDBC), an HTTP endpoint (REST), the local filesystem (XFDF), or a repository-native store (FileNet, CMIS). The viewer picks the annotation connector that matches its configuration.

See [Annotations](./annotations.md) for the annotation model.

## Connector packaging

Connectors are packaged as fat JARs (using the `-jar-with-dependencies` classifier). To add a connector to an ARender deployment, place its JAR in the viewer's classpath (typically `/home/arender/lib/`).

## Connectors vs. UI plugins

UI plugins (Alfresco Share plugin, IBM Content Navigator plugin) are **not** connectors. They are modules installed in the ECM's own interface that open documents in ARender by generating the correct viewer URL. The actual document retrieval still goes through a repository connector (e.g., CMIS, FileNet). See the [integration catalog](../guides/integration/index.md) for the full picture.

## Related pages

- [Integration catalog](../guides/integration/index.md): available connectors, UI plugins, and partner integrations
- [Custom connector development](../guides/integration/custom-connector.md): build your own connector
- [Documents and document IDs](./documents-and-ids.md): the DocumentId / DocumentAccessor model
- [Annotations](./annotations.md): the annotation model and storage
