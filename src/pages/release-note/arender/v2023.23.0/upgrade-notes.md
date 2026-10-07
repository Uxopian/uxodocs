---
title: "ARender v2023.23.0 – Upgrade Notes"
draft: false
date: "2026-10-02"
weight: -202323
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

> **Release note:** See [v2023.23.0](../release-notes).

ARender 2023.23.0 is a maintenance release of the 2023.x line. It mostly brings security upgrades. It also changes the defaults of the PDFOwl renderer pool, upgrades LibreOffice and extends redaction to vector graphics and form fields. No data migration or cache flush is needed.

## ⚙️ Customization and Configuration

### New Properties

* **`pdfowl.client.max-idle`** (default: `16`). Applies to the Rendition PDFOwl renderer (`arender-document-renderer-pdfowl`) and sets the maximum number of idle PDFOwl processes kept for reuse. Before this release, the idle pool had no limit, and idle processes were only dropped after `pdfowl.client.ttl` (30 s).

### Changed and Deprecated Properties

* **`pdfowl.memlimit.mb`** (Rendition PDFOwl renderer). The default changes from `1024` to unset. When the property is unset, PDFOwl applies its own memory ceiling. When it is set, the value is passed to PDFOwl when each process starts, and PDFOwl derives its hard limit from it. Values above `2047` are capped to `2047` with a warning. The previous `memlimit` command only applied once a document was open and capped PDFOwl at 1024 MB.

:::warning[Default change from v2023.22.0]
If you set `pdfowl.memlimit.mb=1024` explicitly, you keep a lower memory ceiling than the new default.

**Action required:** remove the property unless you need to cap PDFOwl memory.
:::

:::info
Only deployments that use the PDFOwl renderer are affected. The default renderer of the 2023.x line remains the JNI engine.
:::

No properties were renamed in this release.

### Deleted Properties

No properties were deleted in this release.

## 📦 Product

### Technical Changes and Security

* **Dependencies upgraded**: Embedded libraries and container base images have been upgraded to address known vulnerabilities. For details on the specific advisories addressed, please contact [ARender support](https://arondor.atlassian.net/servicedesk/customer/portals).
* **PDFOwl `1.24-26` → `1.24-33`**. Fixes the slow rendering of large-format pages.
* **LibreOffice `7.3.4.2` → `7.3.5.2`** in the Docker images and in the Linux installer.
* **HEIC support on Docker.** The converter image now ships a current libheif, so HEIC photos from recent iPhones (iPhone 14 Pro and later) convert.
* **Orphaned LibreOffice processes cleaned up (Windows).** The Rendition now kills leftover `soffice.exe` / `soffice.bin` processes when the converter starts and during the service-mode office cleanup. Before this release, these processes could cause a crash loop after a restart.

  :::warning
  The cleanup stops **every** LibreOffice process on the host. Do not use LibreOffice for other purposes on a Windows conversion server.
  :::
* **log4j 1.x removed from the FileNet connector.** The connector no longer bundles the log4j 1.x classes: the log4j API is provided by `log4j-over-slf4j`.

  **Action required:** custom FileNet extensions that rely on log4j 1.x appenders or on a `log4j.properties` file must move to the SLF4J logging configuration.

### Behavior Changes

* **Redaction covers more content.** Content under a redaction area is now also removed from the burnt PDF in these cases:
    * vector graphics and line art;
    * ink, free-text and text-markup annotations, which are cut to the redacted area;
    * interactive form fields (text, multi-line text, list and dropdown), which are removed.

  Until this release, this content was hidden in the exported PDF but could still be recovered from it.<br/>
<u>**Impact:**</u> redacted PDFs produced by v2023.23.0 differ from those produced by v2023.22.0. A form field or annotation that overlaps a redaction is no longer interactive in the output. If documents with such content were redacted and published with an earlier version, consider producing them again.
