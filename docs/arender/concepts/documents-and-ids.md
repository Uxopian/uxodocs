---
title: Documents and document IDs
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /concepts/documents-and-ids
sidebar_position: 1
content_hash: ef2f16494dafac0f59e22eebb3a951416481f4c64eeb43ad34c78426f28fc472
---

# Documents and document IDs

Every document in ARender is identified by a `DocumentId` and accessed through a `DocumentAccessor`. Understanding these two concepts is necessary for integrating the viewer, building connectors, or debugging document loading issues.

## DocumentId

A `DocumentId` is a string-valued handle that uniquely identifies a document within the system. The viewer, service broker, and caching layer all use `DocumentId` as the common key.

The internal string representation is opaque to most consumers. By default ARender uses a `Base64SelfContainedDocumentIdGenerator` that encodes the source parameters as a Base64 string prefixed with `b64_`. An example generated ID looks like:

```
b64_dXJsPWh0dHA6Ly9leGFtcGxlLmNvbS9zYW1wbGUucGRm
```

The ID encodes key-value parameters separated by `&`, for example `url=http://example.com/sample.pdf`. This means the ID is self-contained: the viewer can recover the original parameters from the ID without a separate lookup.

### Hierarchical IDs

`DocumentId` supports a parent-child relationship using `/` as a separator. When multiple documents are opened together as a container, each child document receives a `DocumentId` formed from the parent ID followed by a `/` and a numeric index:

```
b64_<parent-parameters>/0
b64_<parent-parameters>/1
```

`DocumentId.getRootDocumentId()` walks the hierarchy to retrieve the root. `DocumentId.getFatherDocumentId()` returns the immediate parent. The broker and caching layer use this structure to manage document groups and evict related entries together.

### ID generators

Three generators are available, configured as the Spring bean named `documentIdGenerator`. If no bean is defined, the system falls back to `Base64SelfContainedDocumentIdGenerator`.

| Generator | Prefix | Behavior |
|-----------|--------|----------|
| `Base64SelfContainedDocumentIdGenerator` | `b64_` | Encodes parameters as Base64. Default. |
| `EncryptedPerishableSelfContainedDocumentIdGenerator` | `bXX_` | Encrypts parameters with DES/CBC. Supports a configurable time-to-live. |
| `UUIDDocumentIdGenerator` | (none) | Generates a random UUID. Parameters are not recoverable from the ID. |

To configure the ID generator, use application properties:

```properties
# document id bean names: documentIdGenerator (Base64) or encryptedDocumentIdGenerator (encrypted)
arender.documentid.generator.beanName=documentIdGenerator

# adds a time to live token to ARender documentId to make it perish, only available in encrypted id
arender.documentid.encrypted.ttl.add=false
# attempt to revert the time to live token from an existing encrypted id
arender.documentid.encrypted.ttl.revert=false

# specifies the time to live duration in milliseconds, default is one hour
arender.documentid.encrypted.ttl.duration.ms=3600000
```

The encrypted generator embeds an `eolTimestamp` parameter in the ID. When the ID is decoded after the TTL has elapsed, the system rejects it with an `IllegalArgumentException`. This prevents replay of stale document links.

## DocumentAccessor

A `DocumentAccessor` is the runtime object that provides access to document content. It wraps the actual bytes, MIME type, path, and associated `AnnotationAccessor`. Connectors return a `DocumentAccessor`; the viewer and service broker consume it.

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

Specialized sub-interfaces add capabilities:

| Interface | Added capability |
|-----------|-----------------|
| `DocumentAccessorHasFileName` | Provides the original file name |
| `DocumentAccessorHasContext` | Provides the name of the UI profile property file to use (e.g., returns `role-user` for `role-user.properties`) |
| `DocumentAccessorHasUserRole` | Exposes the user's role for access control |
| `DocumentAccessorHasPartialContent` | Supports chunked or range-based loading |
| `DocumentAccessorHasUpdateContent` | Supports writing back modified document content |

## URL parameters for document loading

The viewer accepts documents through URL parameters on the main viewer page. Two built-in URL parsers handle the most common cases.

### Opening a document by URL

Pass a `url` parameter pointing to an HTTP-accessible document:

```
https://your-arender-host/?url=https://example.com/contract.pdf
```

Multiple `url` parameters open several documents simultaneously as a container:

```
https://your-arender-host/?url=https://example.com/doc1.pdf&url=https://example.com/doc2.pdf
```

When multiple URLs are provided, the viewer creates a `DocumentContainer` with each document as a child. The optional `title` parameter sets the container title shown in the UI:

```
?url=...&url=...&title=Contract+Package
```

Without a `title` parameter, the container title defaults to "Multiple URLs".

:::info
Even though ARender handles URL parameter documents, the rendition service has a safeguard that only authorizes whitelisted domain/host URLs. By default, no domain is authorized.
:::

### Opening a document by pre-generated ID

Pass a `uuid` parameter containing a previously generated `DocumentId`:

```
https://your-arender-host/?uuid=b64_dXJsPWh0dHA6Ly9leGFtcGxlLmNvbS9zYW1wbGUucGRm
```

This is the typical pattern when an external system (a connector, an ECM plugin, or a backend call) has already loaded the document and registered it with the service broker. The viewer looks up the existing `DocumentAccessor` from the cache rather than fetching the document again. If the ID was generated with a self-contained generator, the viewer can also re-parse the original parameters to reload the document if needed.

### User parameter

In the default (non-OAuth2) security mode, the `user` parameter sets the identity of the viewer session:

```
?url=https://example.com/document.pdf&user=alice
```

If the `uuid` parameter contains an embedded `user` key (produced by a self-contained ID generator), the viewer extracts the username from the encoded parameters instead.

## Multi-document opening

The viewer supports two modes for displaying multiple documents.

**Multiple URL parameters.** Passing several `url` values causes the viewer to load each document independently and group them in a `DocumentContainer`. Each document is accessible as a tab or panel within the viewer.

**Pre-built DocumentContainer.** A connector or backend code can programmatically create a `DocumentContainer`, populate its children with `DocumentReference` objects, and register it with the document service. The viewer then receives a single `uuid` pointing to the container.

In both cases, child documents have hierarchical `DocumentId` values derived from the container's root ID.

## Related pages

- [Connectors](./connectors.md): how connectors produce `DocumentAccessor` instances
- [Caching](./caching.md): how `DocumentId` values are used as cache keys
- [Security model](./security-model.md): how the `user` parameter interacts with authentication
