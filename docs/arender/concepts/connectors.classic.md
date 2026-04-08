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

## Connector model

Connectors are Java JARs bundled directly in the viewer's classpath.

A connector:

1. **Implements** `DocumentAccessor` to provide document content, MIME type, and metadata to the viewer.
2. **Exposes** a `DocumentServiceURLParser` that parses the incoming request (via the `canParse` / `parse` contract) to determine whether this connector handles the given URL.
3. **Connects** to the external system using its native API (CMIS, FileNet P8 CE, HTTP, etc.) and returns a `DocumentAccessor`.
4. Optionally **provides** an `AnnotationAccessor` so that annotations are stored back into the same external system.

Connectors are loaded as Spring Boot auto-configured beans. Adding a connector to a deployment means placing its JAR on the viewer's classpath (typically `/home/arender/lib/`).

Connectors are packaged as fat JARs using the `-jar-with-dependencies` classifier, which bundles the connector code together with its third-party dependencies.

## Annotation connectors

Annotation storage follows the same connector model. Each `AnnotationAccessor` implementation connects to a storage backend — a SQL database (JDBC), an HTTP endpoint (REST), the local filesystem (XFDF), or a repository-native store (FileNet, CMIS). The viewer picks the annotation connector that matches its configuration.

See [Annotations](./annotations.md) for the annotation model.

## Connectors vs. UI plugins

UI plugins (Alfresco Share plugin, IBM Content Navigator plugin) are **not** connectors. They are modules installed in the ECM's own interface that open documents in ARender by generating the correct viewer URL. The actual document retrieval still goes through a repository connector (e.g., CMIS, FileNet). See the [integration catalog](../guides/integration/index.md) for the full picture.

## Related pages

- [Documents and document IDs](./documents-and-ids.md): the DocumentId / DocumentAccessor model
- [Annotations](./annotations.md): the annotation model and storage
