---
title: Redaction
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /guides/features/redaction
sidebar_position: 5
content_hash: ddc83e34e1c05a4af44ae838aca1b339a96ed890c17010a6211ad290aa13b98e
---

# Redaction

Redaction permanently removes content from a document. In ARender, this works through an annotation-based workflow: users place redact annotations over areas or text they want to remove, then export a new document where those areas are replaced with opaque rectangles and the underlying text data is stripped.

The original document is not modified. The output of a redaction operation is a new document.

## How redaction works

Redact annotations are a specific annotation type in ARender's XFDF model. They appear as filled rectangles over the document content. When the user triggers an export with redactions applied, ARender calls the document builder service, which generates a new document with the redacted regions permanently applied.

The workflow has two distinct phases:

1. **Marking**: the user places one or more redact annotations on the document. These are stored like any other annotation and can be reviewed before the export.
2. **Applying**: the user exports the document with redactions. The document builder produces a new document. The original is not changed.

## Prerequisites

- Redaction requires the annotation module to be active.
- The redact explorer panel must be enabled in configuration.
- The user must have the `canRedact` permission for the document, as determined by the `AnnotationCreationPolicy` returned by the annotation connector.
- The document builder service must be running and accessible from the UI.

## Enabling the redact explorer

The redact explorer is a dedicated panel in the document navigator (left sidebar). It is disabled by default.

```properties
# Enable the redact explorer panel
redactexplorer.enabled=true
```

Once enabled, the following buttons in the redact explorer can be individually controlled:

| Property | Default | Description |
|----------|---------|-------------|
| `redactexplorer.redact` | `true` | Draw a redact annotation over a selected area |
| `redactexplorer.redactZone` | `true` | Draw a redact zone annotation |
| `redactexplorer.manualInput` | `true` | Enter text to search and mark for redaction |
| `redactexplorer.rules` | `true` | Apply pre-defined redaction rules from the annotation creation rule catalog |
| `redactexplorer.redactPageContent` | `true` | Redact all text content on the current page |
| `redactexplorer.redactFullPage` | `true` | Redact the full current page |
| `redactexplorer.redact.with.reasons` | `true` | Pre-select the "with reason" option when creating a redact annotation |

The panel width is controlled by:

```properties
documentnavigator.redact.width=400
```

## Redact annotation appearance

Default appearance values for redact annotations:

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.redact.default.color` | `#000000` | Fill color of the redact rectangle |
| `annotation.redact.default.opacity` | `1.0` | Opacity of the redact rectangle (1.0 = fully opaque) |

## Locking and visibility

Once saved, redact annotations can be locked to prevent further editing:

```properties
# Lock redact annotations after saving
toolbar.redact.locked=false
```

By default, redact annotations are excluded from the standard show/hide annotations toggle. To include them:

```properties
# Allow redact annotations to be hidden with other annotations
annotation.can.hide.redact=false
```

## Redaction reasons

The `AnnotationCreationPolicy` supports pre-defined redaction reasons. When `availableRedactReasons` is configured on the annotation connector, users are prompted to select a reason when placing a redact annotation. This reason is stored with the annotation and appears in the redact explorer.

Reasons are configured in the Spring bean definition of the annotation connector. Example using the JDBC connector:

```xml
<property name="availableRedactReasons">
    <list>
        <bean class="com.arondor.viewer.client.api.annotation.RedactReason">
            <property name="id" value="legal" />
            <property name="label" value="Legal hold" />
        </bean>
        <bean class="com.arondor.viewer.client.api.annotation.RedactReason">
            <property name="id" value="gdpr" />
            <property name="label" value="GDPR" />
        </bean>
    </list>
</property>
<property name="defaultRedactReasons">
    <list>
        <value>gdpr</value>
    </list>
</property>
```

The `defaultRedactReasons` list pre-selects specific reasons in the UI.

## Rule-based redaction

ARender supports rule-based redaction through the `annotationCreationRuleCatalog`. Rules define patterns (for example, regular expressions or keyword lists) that the system applies automatically to find and mark content for redaction. When rules are configured, the user selects them in the redact explorer and clicks the search button. ARender scans the document and proposes redact annotations for the matching regions. The user reviews the results before applying.

Rule configuration is defined in the annotation connector's Spring bean under the `annotationCreationRuleCatalog` property.

## Quick contextual menu

Redact annotation creation is also available from the text selection context menu. Enable or disable it with:

```properties
quick.contextual.menu.hasRedactText=true
```

## Downloading a redacted document

When the user downloads a document with redactions applied, ARender calls the document builder service to produce a new PDF with the redact annotations burned in and the underlying text removed. The download button is controlled by:

```properties
topPanel.documentMenu.downloadWithRedact=true
```

This button is only shown to users who have the redact permission on the document (`canRedact=true` in the user context).

## Troubleshooting

**The redact explorer panel does not appear**: confirm `redactexplorer.enabled=true` is set and that the property file is being loaded by the active configuration.

**Download with redact produces no output**: verify the document builder service is running. Check the broker logs for errors from the `alterDocumentContent` call.

**Redact annotations are locked after saving but should not be**: set `toolbar.redact.locked=false`.

**User cannot place redact annotations**: the `canRedact` flag in the user context must be `true`. This is determined by the annotation connector's `AnnotationCreationPolicy`. Check the connector configuration.

## Related pages

- [Annotations concept](/docs/arender/concepts/annotations)
- [JDBC annotation storage guide](/docs/arender/guides/annotations/annotation-storage-jdbc)
