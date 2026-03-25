---
title: Redaction
last_update:
  date: '2026-03-23T10:20:59.293Z'
  author: CI/CD Bot
slug: /concepts/redaction
sidebar_position: 6
content_hash: d9d3a94d27c0f9e82eb542019a7a6449f662287b161a7bbe2830201c0ea5a5e1
---

# Redaction

Redaction in ARender is a mechanism for permanently removing sensitive content from documents. Although redaction annotations look similar to other annotations in the XFDF layer, they are architecturally distinct: they interact with the document rendering pipeline, PDF content streams, and an authorization gate that other annotation types do not touch.

This page covers the conceptual model.

## Two phases: marking and burning

Redaction is a two-phase process:

### 1. Marking

A user places **redaction annotations** (`RedactElemType`) on the document. At this stage, a redaction is just an annotation — it is stored in the annotation layer via the `AnnotationAccessor`, it can be moved, resized, or deleted, and it does not alter the document content in any way.

Redaction annotations carry properties specific to their role:

| Property | Purpose |
|----------|---------|
| `overlayText` | Text displayed over the redacted area (e.g. "REDACTED") |
| `overlayTextRepeat` | Whether the overlay text repeats to fill the area |
| `interiorColor` | Fill color of the redaction rectangle |
| `coords` | List of rectangles defining the redacted regions |

### 2. Burning

When the user triggers a redacted export (via the document builder), ARender produces a **new document** where:

- The redaction rectangles are permanently drawn as opaque shapes
- The underlying text is **removed from the PDF content stream** — it is no longer selectable, searchable, or extractable
- The original document remains untouched

This is handled by the `PDFRedaction` engine in the document converter service, which parses the PDF content stream token by token and replaces text that falls within redaction rectangles with spacing adjustments.

**Marking is reversible. Burning is not.** Once a redacted document is exported, the original content under the redaction cannot be recovered from the output.

## The authorization gate

ARender introduces an authorization layer that determines **what a user sees when redaction annotations exist** on a document — even before any burning occurs.

When the viewer requests a document rendition, the service broker checks whether the current user is authorized to view the original content:

| Authorization result | User sees |
|----------------------|-----------|
| **Authorized** | The original document — redaction annotations are visible as overlays but the content beneath them is fully readable |
| **Not authorized** | A redacted rendition — redaction annotations are burned on-the-fly into the rendered pages, and the content beneath is hidden |

This means that **non-authorized users cannot see through redaction annotations**, even before an explicit export. The redaction is enforced at the rendering level.

### Default behavior

By default, only users with an admin username (`admin`, `administrator`, or `p8admin`) are authorized to view the original content beneath redaction annotations.

### Custom authorization

The authorization logic can be customized on the broker side by providing a custom `AuthenticationServiceProvider` as a Spring bean.

## How redaction differs from other annotations

| Aspect | Regular annotations | Redaction annotations |
|--------|--------------------|-----------------------|
| **Storage** | Annotation layer (XFDF) | Annotation layer (XFDF) — same |
| **Effect on document** | Visual overlay only | Can permanently alter the document content on export |
| **Rendering** | Always shown as-is | Gated by `AuthenticationServiceProvider` — may be burned into the rendition for non-authorized users |
| **Content stream** | Not involved | `PDFRedaction` engine removes text from PDF content streams |
| **Reversibility** | Always reversible (just delete the annotation) | Reversible while marking; **irreversible** after burning |

## Related pages

- [Annotations](./annotations.md) — the annotation model that redaction builds on
