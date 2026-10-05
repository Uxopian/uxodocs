---
title: "ARender v2026.3.0 – Upgrade Notes"
draft: false
date: "2026-10-02"
weight: -202603
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

> **Release note:** See [v2026.3.0](../release-notes).

ARender 2026.3.0 is a minor release of the 2026 line. It mostly brings security upgrades. It also changes the defaults of the PDFOwl renderer pool and removes the CMIS SOAP binding from the Alfresco connector. No data migration or cache flush is needed. 

## ⚙️ Customization and Configuration

### New Properties

* **`pdfowl.client.max-idle`** (default: `16`). Applies to the Rendition PDFOwl renderer (`arender-document-renderer-pdfowl`) and sets the maximum number of idle PDFOwl processes kept for reuse. Before this release, the idle pool had no limit, and idle processes were only dropped after `pdfowl.client.ttl` (30 s).

### Changed and Deprecated Properties

* **`pdfowl.memlimit.mb`** (Rendition PDFOwl renderer). The default changes from `1024` to unset. When the property is unset, PDFOwl applies its own memory ceiling. When it is set, the value is now passed to PDFOwl as a memory ceiling hint, and PDFOwl derives its hard limit from it. The previous `memlimit` command only applied once a document was open and capped PDFOwl at 1024 MB.

:::warning[Default change from v2026.2.0]
If you set `pdfowl.memlimit.mb=1024` explicitly, you keep a lower memory ceiling than the new default.

**Action required:** remove the property unless you need to cap PDFOwl memory.
:::

* **Excel binary workbooks (`.xlsb`) are now converted to PDF.** The MIME type `application/vnd.ms-excel.sheet.binary.macroEnabled.12` is added to the default value of `arender.format.conversionTargetMimeTypes.application-pdf` (Document Service Broker) and `mime.type.msoffice.excel` (Document Converter).<br/>
<u>**Impact:**</u> if you override either property, add this MIME type to your own list. Otherwise `.xlsb` files are still not converted.

No properties were renamed in this release.

### Deleted Properties

* **`arender.server.alfresco.use.soap.ws`** and **`arender.server.alfresco.soap.ws.url`** (Alfresco / CMIS connector, ARender Classic HMI). Only the AtomPub binding is supported now. The SOAP (Web Services) binding could not work on the Jakarta classpath, and `false` was the only value of `use.soap.ws` that worked. Both properties are gone from the default `arender-server.properties`. Remove them from your own `arender-server.properties`.

:::warning[Breaking change from v2026.2.0]
The `soapWSURL` and `useSoapWS` properties of the CMIS connection bean are removed from `arender-editor-specific-integration.xml`.

**Action required:** if you ship your own copy of this file, remove these two `<property>` elements. Otherwise the Web-UI fails to start.
:::

## 📦 Product

### Technical Changes and Security

* **PDFOwl `1.24-26` → `1.24-33`**. Fixes the slow rendering of large-format pages.
* **DirectOffice `20260414` → `20260811`**
* **SOAP binding no longer supported by the Alfresco / CMIS connector.** The connector now connects to Alfresco through the AtomPub binding only.
* **Orphaned LibreOffice processes cleaned up (Windows service mode).** The Rendition now kills leftover `soffice.exe` / `soffice.bin` processes when the converter starts and stops. Before this release, these processes could cause a crash loop after a restart.

### Behavior Changes

* **Redaction covers more content.** Content under a redaction area is now also removed from the burnt PDF in these cases:
    * vector graphics and line art;
    * ink, free-text and text-markup annotations, which are cut to the redacted area;
    * interactive form fields (text, multi-line text, list and dropdown), which are removed.

  Until this release, this content was hidden in the exported PDF but could still be recovered from it. See the <DocLink version="v2026.3.0" product="arender" to="guides/features/redaction">redaction guide</DocLink>.<br/>
<u>**Impact:**</u> redacted PDFs produced by v2026.3.0 differ from those produced by v2026.2.0. A form field or annotation that overlaps a redaction is no longer interactive in the output. If documents with such content were redacted and published with an earlier version, consider producing them again.

* **Horizon annotation endpoints return the stored annotation.** `POST /documents/{documentId}/annotations` and `PUT /documents/{documentId}/annotations/{annotationId}` now return the annotation as stored by the provider. Before this release, the response had a wrong position and a null `documentId`.

* **Deleting a comment deletes its replies.** `DELETE /documents/{documentId}/annotations/{annotationId}` now also deletes all replies of the deleted comment. The replies are deleted first, then the comment itself.

* **Document references carry the MIME type.** In the Horizon registry, document reference entries now include the MIME type of the source document.

* **Large byte-range requests no longer fail.** When a client requests a byte range larger than 8,000,000 bytes, the Web-UI streaming servlet now returns only the first part, with a matching `Content-Range` header. It used to return HTTP 500. This fixes video playback in Safari.

* **No extra session cookie with Hazelcast sessions (Spring Boot Web-UI).** When `arender.server.session.hazelcast.enabled=true`, error pages no longer create a native `JSESSIONID` cookie next to the Hazelcast `SESSION` cookie. No configuration change is needed.
