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

ARender uses the XFDF (XML Forms Data Format) standard from Adobe for its annotation model. Annotations are markup elements that users place on document pages: highlights, comments, stamps, redactions, and more.

## Annotation model

All annotations share a common set of attributes:

| Attribute | Description |
|-----------|-------------|
| `name` | Unique annotation identifier |
| `page` | Page number (0-based) |
| `rect` | Bounding rectangle coordinates |
| `color` | Display color |
| `title` | Creator name |
| `date` | Last modification date |
| `creationdate` | Creation timestamp |
| `opacity` | Transparency (0.0 to 1.0) |
| `subject` | Annotation category label |
| `flags` | Visibility and behavior flags |
| `document-id` | Parent document identifier |
| `last-modifier` | Last user who modified the annotation |

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

## Annotation creation policy

The `AnnotationCreationPolicy` is a configuration object returned per document by the `AnnotationAccessor`. It defines what the current user is allowed to do with annotations on that document. Each annotation connector provides its own policy.

Key fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `canCreateAnnotations` | boolean | true | Master flag: whether the user can create any annotations |
| `textAnnotationsSupportHtml` | boolean | true | Whether text annotations allow HTML content styling |
| `textAnnotationsSupportReply` | boolean | true | Whether users can reply to text annotations |
| `textAnnotationsSupportStatus` | boolean | true | Whether text annotations support status tracking |
| `textAnnotationsCommentSupportReply` | boolean | true | Whether comment threads support replies |
| `annotationsSupportSecurity` | boolean | false | Whether annotations can have security levels |
| `availableSecurityLevels` | List | null | Available security classification levels |
| `annotationTemplateCatalog` | AnnotationTemplateCatalog | null | Pre-defined annotation templates available on this document |
| `annotationCreationRuleCatalog` | AnnotationCreationRuleCatalog | null | Rules governing annotation creation |
| `availableRedactReasons` | List | null | Pre-defined redaction reasons |
| `defaultRedactReasons` | List | null | Default redaction reasons to suggest |

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
