---
title: Annotations
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /concepts/annotations
sidebar_position: 5
content_hash: 7f80488ed8e91cf1e7ee9fc17c2af50d48c880fcda62a0efd8ab190f85f9b573
---

# Annotations

ARender uses the XFDF (XML Forms Data Format) standard from Adobe for its annotation model. Annotations are markup elements that users place on document pages: sticky notes, highlights, comments, stamps, links, redactions, and more.

## Annotation storage

Annotations are stored separately from the document content. ARender supports multiple storage backends via annotation connectors:

- **JDBC**: stores annotations in a SQL database (SQL Server, HSQLDB)
- **REST**: stores annotations via an HTTP API
- **FileNet**: stores annotations as native FileNet annotation objects in the FileNet database, using the P8 Content Engine API. The annotation content (XFDF) is stored as a `ContentElement` on the FileNet annotation object.
- **CMIS (Alfresco)**: stores annotations as XFDF files in Alfresco folders via the CMIS protocol
- **XFDF file**: stores annotations as XFDF files on the local filesystem (default)

The default storage location is `~/ARenderAnnotations/` and is configured via:

```properties
arender.server.annotations.xfdf.localstorage.default.path=/path/to/annotations/
```

## Annotation permissions

The annotation system supports per-annotation access control:

- `canModify`: whether the current user can edit the annotation
- `canDelete`: whether the current user can remove the annotation

These are enforced by the `AnnotationAccessor` implementation in each connector.

## Next steps

- [JDBC annotation storage guide](../guides/annotations/annotation-storage-jdbc.md)
- [Annotation types reference](../reference/annotation-types.md)
- [Annotation configuration guide](../guides/features/annotation-configuration.md)
- [Redaction guide](../guides/features/redaction.md)
- [Document builder](../guides/features/document-builder.md)
