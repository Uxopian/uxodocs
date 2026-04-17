---
title: Annotations
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /concepts/annotations
sidebar_position: 5
content_hash: c9e4af86326a774e230e411f15dfbbcdf513aa34f90206c37d018f4cb996bc98
---

# Annotations

Annotations are overlays that users place on document pages — sticky notes, highlights, stamps, redactions, and more. They are stored **separately from the document binary**: the original document is never modified. This is a deliberate architectural choice driven by regulatory requirements — in many industries (legal, finance, healthcare), preserving the original document exactly as received is a compliance obligation. Separating annotations from the document ensures the source content remains intact and auditable, while user markup lives in its own storage layer.

## The XFDF standard

ARender uses Adobe's **XFDF** (XML Forms Data Format) as its annotation serialization format. Every storage backend, the REST API, and the viewer all speak XFDF. This ensures interoperability with PDF-ecosystem tools and standards compliance.

An XFDF document wraps a list of annotation elements, each tied to a page. Here is a real example of a sticky note annotation:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve">
  <annots>
    <text page="0" color="#FFFF00" date="D:20120411132756+02'00'"
      name="f96e338a-fad5-437a-8e5e-7424553c1632"
      rect="243.0695,133.3178,263.0695,151.3178" title="Dietrich.Roeben"
      creationdate="D:20120411132612+02'00'" opacity="1"
      subject="Sticky Note" icon="Comment">
      <contents-richtext>
        <body xmlns="http://www.w3.org/1999/xhtml"
          xfa:APIVersion="Acrobat:9.0.0" xfa:spec="2.0.2"
          xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">
          <p dir="ltr">
            <span style="font-size:10.0pt;color:#000000">
              Please make reference to the corporate document.
            </span>
          </p>
        </body>
      </contents-richtext>
      <popup page="0" rect="243.0695,-28.6816,409.9782,151.3178" open="yes"/>
    </text>
  </annots>
</xfdf>
```

Key attributes common to all annotation types: `page` (0-indexed page number), `name` (unique UUID), `rect` (bounding box coordinates), `title` (author), `date`/`creationdate` (timestamps), `color`, and `opacity`.

## Annotation types

Annotations fall into three broad categories:

| Category | Types |
|----------|-------|
| **Textual** | Sticky note, highlight, strikeout, underline, freetext |
| **Shapes** | Stamp, line, square, circle, polygon, polyline, ink (freehand) |
| **Special** | Redaction, link, bookmark |

Each type carries its own set of properties (color, opacity, position, contents, etc.). See the [annotation types reference](../reference/annotation-types.md) for a complete list with property details.

## Redaction

Redaction annotations look like regular annotations in the XFDF layer, but they are architecturally distinct: they interact with document rendering, content streams, and authorization in ways that other annotation types do not. For this reason, redaction is covered in its own concept page.

See [Redaction](./redaction.md) for the full conceptual model.

## Related pages

- [Documents and document IDs](./documents-and-ids.md) — the `DocumentAccessor` / `DocumentId` model that annotations build on
- [Annotation types reference](../reference/annotation-types.md) — complete list of annotation types and their properties
- [Redaction](./redaction.md) — the redaction conceptual model: marking, burning, and authorization
