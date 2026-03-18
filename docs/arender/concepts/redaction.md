---
title: Redaction
slug: /concepts/redaction
sidebar_position: 6
---

# Redaction

Redaction in ARender is a mechanism for permanently removing sensitive content from documents. Although redaction annotations look similar to other annotations in the XFDF layer, they are architecturally distinct: they interact with the document rendering pipeline, PDF content streams, and an authorization gate that other annotation types do not touch.

This page covers the conceptual model. For configuration and UI options, see the [redaction guide](../guides/features/redaction.md).

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

When the UI requests a document rendition, the service broker checks `AuthenticationServiceProvider.isAuthorized()`:

```java
public interface AuthenticationServiceProvider {
    boolean isAuthorized(DocumentService documentService, DocumentId documentId);
}
```

The result controls which version of the document the user receives:

| `isAuthorized()` returns | User sees |
|--------------------------|-----------|
| `true` | The original document — redaction annotations are visible as overlays but the content beneath them is fully readable |
| `false` | A redacted rendition — redaction annotations are burned on-the-fly into the rendered pages, and the content beneath is hidden |

This means that **non-authorized users cannot see through redaction annotations**, even before an explicit export. The redaction is enforced at the rendering level.

### Default implementation

The built-in `DefaultAuthenticationServiceProvider` authorizes users whose username matches one of three admin roles: `admin`, `administrator`, or `p8admin`.

```java
public class DefaultAuthenticationServiceProvider implements AuthenticationServiceProvider {
    public boolean isAuthorized(DocumentService documentService, DocumentId documentId) {
        UserContext userContext = UserContextHolder.getUserContext();
        if (userContext != null) {
            return "admin".equalsIgnoreCase(userContext.getUsername())
                || "administrator".equalsIgnoreCase(userContext.getUsername())
                || "p8admin".equalsIgnoreCase(userContext.getUsername());
        }
        return false;
    }
}
```

### Custom implementations

Connectors can provide their own `AuthenticationServiceProvider` to implement document-level or role-based authorization logic. The provider is registered as a Spring bean referenced by the `AuthenticationServiceFactory`:

```xml
<bean id="authenticationServiceFactory"
      class="com.arondor.viewer.common.document.authentication.service.AuthenticationServiceFactory">
    <property name="authenticationServiceProviderBeanName" value="myCustomAuthProvider" />
</bean>
```

For example, a CMIS connector might check whether the current user has a specific ACL permission on the document rather than relying on username matching.

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
- [Redaction guide](../guides/features/redaction.md) — configuration, UI options, and redaction reasons
- [Document builder](../guides/features/document-builder.md) — the export mechanism used to burn redactions
- [Security model](./security-model.md) — authentication and authorization concepts
