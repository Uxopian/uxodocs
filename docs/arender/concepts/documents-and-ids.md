---
title: Documents and document IDs
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /concepts/documents-and-ids
sidebar_position: 1
---

# Documents and document IDs

Every document in ARender is identified by a **DocumentId** and accessed through a **DocumentAccessor**. Think of it as a key-value pair: the DocumentId is the key, the DocumentAccessor is the value. This pair is the foundation of how ARender identifies and accesses documents across the viewer, service broker, connectors, and caching layer.

## DocumentId

A `DocumentId` is a string-valued handle that uniquely identifies a document within the system. The viewer, service broker, and caching layer all use `DocumentId` as the common key.

The internal string representation is opaque to most consumers. By default ARender uses a Base64 encoding that produces IDs prefixed with `b64_`:

```
b64_dXJsPWh0dHA6Ly9leGFtcGxlLmNvbS9zYW1wbGUucGRm
```

You will see these IDs in viewer URLs and in broker logs. Different [ID generators](../guides/features/document-id-generators.md) produce different formats (encrypted, UUID-based), but from a consumer's perspective the ID is always an opaque string.

### Hierarchical IDs

When multiple documents are opened together as a container, each child document receives a `DocumentId` formed from the parent ID followed by `/` and a numeric index:

```
b64_<parent-parameters>/0
b64_<parent-parameters>/1
```

This hierarchy allows the broker and caching layer to manage document groups as a unit — for example, evicting all children when the parent container expires.

## DocumentAccessor

A `DocumentAccessor` is the runtime object behind a DocumentId. It provides access to document content, metadata, and annotations. Connectors produce `DocumentAccessor` instances; the viewer and service broker consume them.

```java
public interface DocumentAccessor extends Serializable {
    DocumentId getDocumentId();
    InputStream getInputStream() throws IOException;
    byte[] toByteArray() throws IOException;
    String getPath() throws IOException;
    String getMimeType() throws IOException;
    String getDocumentTitle();
    AnnotationAccessor getAnnotationAccessor() throws AnnotationsNotSupportedException;
    DocumentMetadata getDocumentMetadata();
}
```

Specialized sub-interfaces add capabilities. These are particularly relevant when building connectors:

| Interface | Added capability |
|-----------|-----------------|
| `DocumentAccessorHasFileName` | Provides the original file name |
| `DocumentAccessorHasContext` | Provides the name of the UI profile property file to use (e.g., returns `role-user` for `role-user.properties`) |
| `DocumentAccessorHasUserRole` | Exposes the user's role for access control |
| `DocumentAccessorHasPartialContent` | Supports chunked or range-based loading |
| `DocumentAccessorHasUpdateContent` | Supports writing back modified document content |

## Related pages

- [Opening documents](../guides/features/opening-documents.md): URL parameters and multi-document opening
- [Document ID generators](../guides/features/document-id-generators.md): configuring Base64, encrypted, and UUID generators
- [Connectors](./connectors.md): how connectors produce `DocumentAccessor` instances
- [Caching](./caching.md): how `DocumentId` values are used as cache keys
- [Security model](./security-model.md): how user identity interacts with authentication
