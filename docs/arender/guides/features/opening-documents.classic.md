---
viewer: classic
title: Opening documents
last_update:
  date: '2026-03-23T10:20:59.293Z'
  author: CI/CD Bot
slug: /guides/features/opening-documents
sidebar_position: 1
content_hash: 6439c29efff645395083e7e42b3adb92cef070610bb74d07ebdaab0764321357
---

# Opening documents

ARender accepts documents through URL parameters on the main viewer page. This page covers all the ways to open documents in the viewer.

For a quick hands-on introduction, see the quickstart guide for your viewer.

## Opening a document by URL

Pass a `url` parameter pointing to an HTTP-accessible document:

```
https://your-arender-host/?url=https://example.com/contract.pdf
```

:::info
The rendition service has a safeguard that only authorizes whitelisted domain/host URLs. By default, no domain is authorized. See the broker environment variable `DSB_AUTHORIZED_URLS`.
:::

## Opening a document by pre-generated ID

Pass a `uuid` parameter containing a previously generated `DocumentId`:

```
https://your-arender-host/?uuid=b64_dXJsPWh0dHA6Ly9leGFtcGxlLmNvbS9zYW1wbGUucGRm
```

This is the typical pattern when an external system (a connector, an ECM plugin, or a backend call) has already loaded the document and registered it with the Document Service Broker. The viewer looks up the existing `DocumentAccessor` from the cache rather than fetching the document again.

## Multi-document opening

The viewer supports two modes for displaying multiple documents simultaneously.

### Multiple URL parameters

Passing several `url` values causes the viewer to load each document independently and group them in a `DocumentContainer`. Each document is accessible as a tab or panel within the viewer:

```
https://your-arender-host/?url=https://example.com/doc1.pdf&url=https://example.com/doc2.pdf
```

The optional `title` parameter sets the container title shown in the UI:

```
?url=...&url=...&title=Contract+Package
```

Without a `title` parameter, the container title defaults to "Multiple URLs".

### Pre-built DocumentContainer

A connector or backend code can programmatically create a `DocumentContainer`, populate its children with `DocumentReference` objects, and register it with the document service. The viewer then receives a single `uuid` pointing to the container.

In both cases, child documents have [hierarchical DocumentId values](../../concepts/documents-and-ids.md#hierarchical-ids) derived from the container's root ID.

## User parameter

In the default (non-OAuth2) security mode, the `user` parameter sets the identity of the viewer session:

```
?url=https://example.com/document.pdf&user=alice
```

If the `uuid` parameter contains an embedded `user` key (produced by a self-contained ID generator), the viewer extracts the username from the encoded parameters instead.

## Related pages

- [Documents and document IDs](../../concepts/documents-and-ids.md): the DocumentId / DocumentAccessor mental model
- [Document ID generators](./document-id-generators.md): how IDs are generated and configured
