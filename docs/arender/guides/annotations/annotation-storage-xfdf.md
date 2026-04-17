---
viewer: classic
title: XFDF file annotation storage
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /guides/annotations/annotation-storage-xfdf
sidebar_position: 1
content_hash: f478e1f9f8750da03ace957ea74de21acbab682579d4dcad92a26122055feaba
---

# XFDF file annotation storage

ARender stores annotations as XFDF files on the local filesystem by default. Each document gets one `.xml` file whose name is derived from the document identifier. No additional connector JAR or database schema is required.

## When to use this guide

Use this guide when you are deploying a single ARender UI instance and need a simple, zero-dependency annotation storage, or when you want to understand the default behavior before switching to a different backend. File-based storage is appropriate for development, single-node production deployments, and cases where annotation data lives on a shared network volume.

For multi-instance deployments where all UI nodes must share the same annotation set, consider [JDBC annotation storage](./annotation-storage-jdbc.md) instead.

## How it works

The `XFDFAnnotationAccessor` bean delegates all read and write operations to a `FileSerializedContentAccessor`. When a document is opened, ARender looks for a file at:

```
<storage-path>/<document-id>.xml
```

The document identifier is sanitized before use: forward slashes (`/`) and equals signs (`=`) are replaced with underscores so the result is a valid filename. For example, a document with ID `contracts/2024/doc_001` produces the file `contracts_2024_doc_001.xml`.

When no file exists for a document, ARender returns an empty annotation set and creates the file on the first save.

## Configuration properties reference

| Property | Description | Default |
|----------|-------------|---------|
| `arender.server.annotations.xfdf.localstorage.default.path` | Filesystem path where XFDF annotation files are stored. Trailing slash required. | `~/ARenderAnnotations/` |
| `arender.server.annotations.can.create` | Whether users can create new annotations | `true` |
| `arender.server.annotations.text.html.support` | Whether text annotations allow HTML content styling | `true` |
| `arender.server.annotations.text.reply.support` | Whether users can reply to text annotations | `true` |
| `arender.server.annotations.text.status.support` | Whether text annotations support status tracking | `true` |
| `arender.server.annotations.text.comment.reply.support` | Whether comment threads support replies | `true` |
| `arender.server.annotations.text.security.support` | Whether annotations can have security classification levels | `false` |

## File format

Each file is an XFDF document (XML). ARender reads and writes the full annotation set for a document in a single pass. Annotations are stored by their `name` attribute; updates replace the matching entry in the serialized XML before rewriting the file.

An example file for a document with two annotations looks like:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve">
  <annots>
    <square name="annot-1" page="0" rect="100,200,300,400" color="#ff0000" title="alice" date="D:20240315120000" />
    <highlight name="annot-2" page="1" rect="50,100,250,120" color="#ffff00" title="bob" date="D:20240315130000" />
  </annots>
</xfdf>
```

## Shared volume requirements

Because each viewer instance reads and writes annotation files directly, all instances must access the same storage path. In a containerized deployment, mount a shared volume at the annotation path.

:::caution
The `FileSerializedContentAccessor` does not apply any locking across process boundaries. If two replicas write to the same file at the same time, one write may overwrite the other. For multi-replica deployments under concurrent annotation load, use JDBC or REST annotation storage instead.
:::

## Troubleshooting

**Annotations are not saved**: verify that the process user has write permission on the storage directory. Enable debug logging on `com.arondor.viewer.xfdf.annotation` to trace the exact file path being written.

**Annotations disappear after container restart**: the storage path is inside the container. Mount a persistent volume at that path.

**Unexpected file names**: the document identifier string is sanitized by replacing `/` and `=` with `_`. If your document IDs contain other special characters, check the resulting filename manually to confirm the mapping.

## Related pages

- [Annotations concept](../../concepts/annotations.md)
- [JDBC annotation storage](./annotation-storage-jdbc.md)
