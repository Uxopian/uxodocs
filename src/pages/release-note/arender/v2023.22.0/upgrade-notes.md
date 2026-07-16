---
title: "ARender v2023.22.0 – Upgrade Notes"
draft: false
date: "2026-07-15"
weight: -202322
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

> **Release note:** See [v2023.22.0](../release-notes).

## ⚙️ Customization and Configuration

### Changed and Deprecated Properties

No properties were changed or deprecated in this release.

### New Properties

* **`annotation.compensate.jni.page.normalization`** (default: `false`): When set to `true`, ARender compensates for the page normalization applied by the **JNIRenderer** microservice so that whole-page and zone redactions cover the full area of pages larger than A4 instead of being clipped to A4 dimensions. Set in the `application.properties` of the `arender-document-converter` module (TaskConversion).

  :::warning
  JNIRenderer is the **default renderer** on the 2023.x line, so customers who redact documents that mix page sizes and have not switched to PDFOwl must set `annotation.compensate.jni.page.normalization=true` for the whole-page/zone redaction fix to take effect. See the [Redaction](#redaction) section below.
  :::

### Deleted Properties

No properties were deleted in this release.

## 📦 Product

### Technical Changes and Security

* **Dependencies upgraded**: Embedded platform dependencies have been upgraded to address known high-severity vulnerabilities in the networking and serialization libraries. This proactive approach ensures better protection against vulnerabilities. For detailed information about the specific advisories addressed, please contact [ARender support](https://arondor.atlassian.net/servicedesk/customer/portals).

## 🔒 Redaction {#redaction}

### Re-redact documents redacted with an affected version

This release fixes two redaction defects that could leave content exposed in previously published documents:

* On scanned or image-only PDFs, a redaction now physically removes the underlying page image instead of painting a black box over it. Documents previously redacted this way keep the original image embedded and the content can be recovered.
* On documents that mix page sizes, a whole-page or zone redaction on a page larger than A4 is no longer clipped to A4 dimensions and now covers the full page area. This defect only occurs with the **JNIRenderer** microservice; documents rendered with **PDFOwl** are not affected. Because JNIRenderer is the default renderer on the 2023.x line, applying this fix requires setting `annotation.compensate.jni.page.normalization=true`. This compensation must **not** be enabled when using PDFOwl, as it would misplace redactions (see [New Properties](#new-properties)).

**Action required:**

* Documents that were redacted and published with an affected version should be re-redacted and re-published with v2023.22.0 to guarantee the content is actually removed.
* If you use the JNIRenderer microservice (the 2023.x default) and redact documents that mix page sizes, set `annotation.compensate.jni.page.normalization=true` on `arender-document-converter` (TaskConversion) so whole-page and zone redactions cover pages larger than A4. Do **not** enable it when using PDFOwl — the converter cannot detect the renderer, and the compensation would misplace redactions.

## 💻 Behavior Changes

### PDF with a single non-viewable attachment now displays the PDF itself

A PDF that carries a single non-viewable attachment (such as a `.joboptions` file) now displays the PDF directly, instead of presenting it as an attachment container. This matches the behavior of a PDF carrying a Factur-X file. Integrations that relied on the attachment-container presentation for such documents should verify that the new behavior fits their workflow.

### URL document identifiers accept `&` and `=` in query parameters

Documents opened from a URL whose query string contains `&` and `=` characters (for example pre-signed cloud storage links) now open correctly; these characters are no longer mistaken for the internal key-value separators used in the document identifier. No action is required — links that previously failed to open will now resolve as expected.
