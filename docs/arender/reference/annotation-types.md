---
title: Annotation types
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /reference/annotation-types
sidebar_position: 4
content_hash: 65295f0bd62aa9652481daf2f1d30e7e3202ae6604c7192b4ee0e16c5fa8b056
---

# Annotation types

ARender stores and exchanges annotations in XFDF format, following the Adobe XFDF specification. Each annotation type maps to a Java class in the `annotation-api` module and to a specific XFDF element name.

For the REST endpoints used to read and write annotations, see the [Broker REST API](/docs/arender/reference/rest-api/broker-api#annotation-operations).

## Common properties

Every annotation, regardless of type, carries the following base properties:

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique annotation identifier |
| `documentId` | string | ID of the document the annotation belongs to |
| `page` | integer | 0-based page number |
| `position` | object | Bounding rectangle: `{x, y, w, h}` in page-relative coordinates |
| `color` | object | Annotation color: `{r, g, b}` |
| `opacity` | float | Opacity between 0.0 and 1.0 |
| `creator` | string | User who created the annotation |
| `lastModifier` | string | User who last modified the annotation |
| `date` | ISO 8601 string | Last modification date |
| `creationDate` | ISO 8601 string | Creation date |
| `subject` | string | Annotation subject label |
| `contents` | string | Plain text content |
| `contentsRichtext` | object | Rich text content (HTML) |
| `flags` | object | Behavior flags: `{hidden, readonly, locked, print}` |
| `security` | string | Security level symbolic name (when security is enabled) |

Most text-bearing annotation types also support:

- `popup`: A floating comment window (`PopupElemType`)
- `inreplyto`: Reference to another annotation ID (for replies)
- `state` / `statemodel`: Annotation status markers (e.g., `Accepted`, `Rejected`, `Cancelled`, `Completed`, `None` under the `Review` model)

---

## Text (sticky note)

**XFDF element:** `<text>`

A sticky note anchored to a point on the page. The icon marks the anchor. The popup window displays the comment text.

**Specific properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `icon` | string | `Note` | Anchor icon. See icon values below |
| `inreplyto` | string | | ID of the annotation this is a reply to |
| `state` | string | | Status value (e.g., `Accepted`, `Rejected`) |
| `statemodel` | string | | State model. Currently: `Review` |
| `callout` | float array | | Callout line point coordinates |

**Icon values:** `Comment`, `Check`, `Circle`, `Cross`, `Help`, `Insert`, `Key`, `NewParagraph`, `Note`, `Paragraph`, `RightArrow`, `RightPointer`, `Star`, `UpArrow`, `UpLeftArrow`

**XFDF example:**

```xml
<text page="0" rect="100,200,120,220" color="#FFD700"
      icon="Note" creator="alice" date="D:20260317120000">
  <popup open="no"/>
  <contents>This section needs review.</contents>
</text>
```

---

## Highlight

**XFDF element:** `<highlight>`

Marks a region of text with a transparent color overlay. The `coords` attribute specifies the four corner points of each highlighted text span.

**Specific properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `coords` | float array | yes | List of quad-point coordinates for each highlighted span |

**XFDF example:**

```xml
<highlight page="0" rect="50,100,300,115" color="#FFFF00"
           coords="50,115,300,115,50,100,300,100"
           creator="bob">
  <contents>Key term</contents>
</highlight>
```

---

## Strikeout

**XFDF element:** `<strikeout>`

Draws a line through a text span, indicating deletion or rejection. Uses the same `coords` attribute as highlight.

**Specific properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `coords` | float array | yes | Quad-point coordinates of each struck-out span |

---

## Underline

**XFDF element:** `<underline>`

Draws a line below a text span. Uses the same `coords` attribute as highlight and strikeout.

**Specific properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `coords` | float array | yes | Quad-point coordinates of each underlined span |

---

## Free text

**XFDF element:** `<freetext>`

Displays text directly on the page inside a rectangle, with configurable font, border, and rotation.

**Specific properties:**

| Property | Type | Description |
|----------|------|-------------|
| `defaultappearance` | string | PDF appearance string specifying font and size (required) |
| `defaultstyle` | string | CSS-like style override |
| `rotation` | integer | Rotation in degrees (0, 90, 180, 270) |
| `justification` | string | Text alignment: `left`, `center`, `right` |
| `callout` | float array | Three-point callout line: elbow and tip coordinates |
| `width` | float | Border width |
| `style` | string | Border style: `S` (solid), `D` (dashed), `B` (beveled), `I` (inset), `U` (underline) |
| `dashes` | float array | Dash pattern when `style=D` |

**XFDF example:**

```xml
<freetext page="0" rect="50,400,200,430" color="#000000"
          rotation="0" justification="left">
  <defaultappearance>/Helvetica 12 Tf 0 0 0 rg</defaultappearance>
  <contents>Approved by legal.</contents>
</freetext>
```

---

## Stamp

**XFDF element:** `<stamp>`

Places a rubber-stamp image or text label on the page.

**Specific properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `icon` | string | `Draft` | Predefined stamp icon name, or a custom text label |
| `rotation` | integer | | Rotation in degrees |
| `appearance` | string | | Custom appearance stream for image stamps |

Stamp annotations are also used for watermarks when delivered through the `waterMarkTemplates` section of the annotation template catalog.

**XFDF example:**

```xml
<stamp page="0" rect="100,500,250,560" color="#FF0000"
       icon="Approved" rotation="350" creator="manager">
</stamp>
```

---

## Image stamp

**XFDF element:** `<stamp>` (subtype `ImageStamp`)

A variant of Stamp that embeds a raster image. The image data is encoded in the `appearance` field.

---

## Line

**XFDF element:** `<line>`

Draws a straight line between two points, with optional arrow heads.

**Specific properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `start` | point | yes | Start point as `x,y` |
| `end` | point | yes | End point as `x,y` |
| `head` | string | | End-cap style at the `end` point |
| `tail` | string | | End-cap style at the `start` point |
| `interiorColor` | color | | Fill color for solid end caps |
| `width` | float | | Line stroke width |
| `style` | string | | Border style |
| `dashes` | float array | | Dash pattern |

**End-cap values:** `None`, `Square`, `Circle`, `Diamond`, `OpenArrow`, `ClosedArrow`, `Butt`, `ROpenArrow`, `RClosedArrow`, `Slash`

**XFDF example:**

```xml
<line page="0" rect="50,50,200,100" color="#FF0000"
      start="50,75" end="200,75"
      head="OpenArrow" tail="None" width="2">
</line>
```

---

## Square

**XFDF element:** `<square>`

Draws a rectangle (not necessarily a square).

**Specific properties:**

| Property | Type | Description |
|----------|------|-------------|
| `interiorColor` | color | Fill color |
| `width` | float | Border width |
| `style` | string | Border style |
| `dashes` | float array | Dash pattern |

---

## Circle

**XFDF element:** `<circle>`

Draws an ellipse inscribed within the annotation bounding rectangle.

**Specific properties:**

| Property | Type | Description |
|----------|------|-------------|
| `interiorColor` | color | Fill color |
| `width` | float | Border width |
| `style` | string | Border style |
| `dashes` | float array | Dash pattern |

---

## Polygon

**XFDF element:** `<polygon>`

Draws a closed polygon from a sequence of vertices. The last vertex is connected back to the first.

**Specific properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `vertices` | float array | yes | Flat list of `x,y` pairs |
| `interiorColor` | color | | Fill color |
| `width` | float | | Border width |
| `style` | string | | Border style |

---

## Polyline

**XFDF element:** `<polyline>`

Draws an open multi-segment line through a sequence of vertices.

**Specific properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `vertices` | float array | yes | Flat list of `x,y` pairs |
| `head` | string | | End-cap style at the last vertex |
| `tail` | string | | End-cap style at the first vertex |
| `width` | float | | Stroke width |

---

## Ink

**XFDF element:** `<ink>`

Records freehand drawing as one or more paths. Each path is a sequence of points captured from pointer input.

**Specific properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `inklist` | list of paths | yes | One or more strokes, each a list of `x,y` pairs |
| `width` | float | | Stroke width |
| `style` | string | | Stroke style |
| `dashes` | float array | | Dash pattern |

**XFDF example:**

```xml
<ink page="0" rect="50,50,300,200" color="#0000FF" width="2">
  <inklist>
    <gesture>100,150;120,130;140,150;160,130</gesture>
    <gesture>100,170;150,170;200,170</gesture>
  </inklist>
</ink>
```

---

## Redact

**XFDF element:** `<redact>`

Marks an area for redaction. When the document is burned (via the transformation API), the marked area is replaced with an opaque fill, and the underlying text is removed by default.

**Specific properties:**

| Property | Type | Description |
|----------|------|-------------|
| `coords` | float array | Quad-point coordinates of text spans to redact (optional, for text-aligned redactions) |
| `interiorColor` | color | Fill color of the redaction box (applied after burn) |
| `overlayText` | string | Replacement text shown after burn |
| `overlayTextRepeat` | boolean | Tile the overlay text across the redacted area |
| `justification` | string | Alignment of the overlay text |

Redact annotations are two-phase: they appear as colored overlays before burn, and become permanent after the transformation.

:::note
The `redact.deleteText` broker property controls whether the underlying PDF text is deleted during burn. The default is `true`.
:::

---

## Redact text

**XFDF element:** `<redact>` (subtype `RedactText`)

A variant of Redact that targets a text span rather than an area. It is created automatically when using annotation creation rules that search and mark text for redaction across pages.

---

## Rotation

**XFDF element:** `<rotation>` (ARender extension)

Encodes a page rotation instruction. This type is used internally by the document builder to record page rotations in a document assembly workflow.

---

## Link

**XFDF element:** `<link>`

Represents a hyperlink area on the page. Links are read from the document and stored alongside user-created annotations. They are typically not created by end users directly.

---

## Bookmark

**XFDF element:** `<bookmark>`

Represents a document outline entry. Like Link, bookmarks come from the document structure and are stored in the annotation layer for access through the API.

---

## Not implemented

The following XFDF types have class representations in the annotation API but are not supported in the viewer UI for creation or editing:

| Type | Notes |
|------|-------|
| Caret | Defined but not available in the UI |
| File attachment | Defined but not available in the UI |
| Sound | Defined but not available in the UI |
| Form fields | Read-only via `FieldElemType`, not creatable |

---

## Annotation creation policy

The annotation creation policy controls what a user can do with annotations on a given document. It is returned by `GET /annotation/policy?documentId={documentId}`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `canCreateAnnotations` | boolean | `true` | Allow the user to create new annotations |
| `textAnnotationsSupportHtml` | boolean | `true` | Allow HTML formatting in text annotation content |
| `textAnnotationsSupportReply` | boolean | `true` | Allow replies to text annotations |
| `textAnnotationsSupportStatus` | boolean | `true` | Allow status markers on text annotations |
| `textAnnotationsCommentSupportReply` | boolean | `true` | Allow replies to comment annotations |
| `annotationsSupportSecurity` | boolean | `false` | Enable security level classification on annotations |
| `availableSecurityLevels` | list | | Security levels available to the user |
| `annotationTemplateCatalog` | object | | Predefined templates for stamps and watermarks |
| `annotationCreationRuleCatalog` | object | | Automatic annotation rules (e.g., search-and-redact) |
| `availableRedactReasons` | list | | Redaction reason codes available to the user |
| `defaultRedactReasons` | list | | Pre-selected redaction reasons |

### Broker configuration for annotation policy

The broker properties that correspond to the annotation creation policy defaults are:

| Broker property | Corresponding policy field |
|-----------------|---------------------------|
| `arender.server.annotations.can.create` | `canCreateAnnotations` |
| `arender.server.annotations.text.html.support` | `textAnnotationsSupportHtml` |
| `arender.server.annotations.text.reply.support` | `textAnnotationsSupportReply` |
| `arender.server.annotations.text.status.support` | `textAnnotationsSupportStatus` |
| `arender.server.annotations.text.comment.reply.support` | `textAnnotationsCommentSupportReply` |
| `arender.server.annotations.text.security.support` | `annotationsSupportSecurity` |

To disable annotation creation globally:

```
DSB_ARENDER_SERVER_ANNOTATIONS_CAN_CREATE=false
```

### Annotation templates

The `annotationTemplateCatalog` field in the policy response contains two lists:

- `annotationTemplates`: Named templates for creating annotations with pre-set properties (color, font size, rotation). These appear as toolbar items in the viewer.
- `waterMarkTemplates`: Templates specifically used for watermarks. They use the `Stamp` type with a fixed text layout.

**Example template:**

```json
{
  "name": "Urgent",
  "annotationType": "Stamp",
  "contentTemplate": "URGENT",
  "annotationStyle": {
    "fontColor": "#e50000",
    "fontSize": 30,
    "rotation": 350
  }
}
```

### Annotation creation rules

Rules in `annotationCreationRuleCatalog` let users trigger automated annotation creation based on a search expression. A common use case is search-and-redact across all pages.

**Example rule:**

```json
{
  "ruleId": "annotationCreationRuleRedactMailsAllPages",
  "ruleName": "Redact all e-mail addresses",
  "annotationTemplate": {"annotationType": "RedactText"},
  "searchOptions": {
    "searchText": "^\\w+@\\w+\\.\\w+$",
    "regex": true,
    "searchAction": "ALL_PAGES"
  }
}
```

---

## Related pages

- [Broker REST API: annotation operations](/docs/arender/reference/rest-api/broker-api#annotation-operations)
- [Rendition properties](/docs/arender/reference/rendition-properties#annotations)
