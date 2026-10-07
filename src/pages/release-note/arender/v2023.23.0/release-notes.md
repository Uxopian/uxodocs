---
title: "ARender v2023.23.0 - Release Notes"
draft: false
date: "2026-10-02"
weight: -202323
aliases:
  - /release/2023.23/
description: "Redaction now removes vector graphics and form fields, PDFOwl and LibreOffice upgrades, email, HEIC and copy-paste fixes, Document Builder and annotation fixes, and security upgrades."
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

<div className="arender-release-notes">

> **Upgrade note:** See [v2023.23.0](../upgrade-notes) for detailed instructions.

# ARender v2023.23.0 - Release Notes

ARender 2023.23.0 is a maintenance release on the 2023.x (ARender Classic) line. It extends **redaction integrity**: a redaction now also removes the vector graphics and the interactive form fields under the redacted area, after the image fix of 2023.22.0. It also upgrades the **PDFOwl** engine to fix the slow rendering of large-format pages, and **LibreOffice** on Linux and Docker.

The release also fixes several email conversion issues, HEIC photos from recent iPhones on Docker, copy and paste from justified text, a memory leak with signature verification, and Document Builder and annotation issues. Embedded dependencies and container images are upgraded to address known security advisories.

---

## Security

#### Security fixes and dependency updates

`Changed` - This release includes security hardening together with updates to third-party dependencies and container base images to address known vulnerabilities. For details on the specific issues addressed, please contact [ARender support](https://arondor.atlassian.net/servicedesk/customer/portals).

---

## Infrastructure changes

#### PDF engine upgrade

`Changed` - The PDFOwl rendering engine is upgraded to 1.24-33. It fixes the slow rendering of large-format pages, a regression present since 2023.20.0. This only affects deployments that use the PDFOwl renderer: the default renderer of the 2023.x line remains the JNI engine.

#### LibreOffice upgraded on Linux and Docker

`Changed` - LibreOffice is upgraded from 7.3.4.2 to 7.3.5.2 in the Docker images and in the Linux installer for RPM-based systems with Internet access. It fixes Word documents that failed to convert. Other installations outside Docker must upgrade LibreOffice to 7.3.5.2 to get this fix, including Red Hat Enterprise Linux 8 servers installed without Internet access, where the installer still deploys 7.3.4.2. Windows installations stay on LibreOffice 6.4.5.2.

---

## Developer notes

#### PDFOwl memory limit

`Changed` - `pdfowl.memlimit.mb` is now applied when each PDFOwl process starts. Its default changes from `1024` to unset, which lets PDFOwl apply its own default; values above `2047` are capped to `2047` with a warning. A new property, `pdfowl.client.max-idle` (default `16`), sets the maximum number of idle PDFOwl processes kept for reuse. Deployments that relied on the previous 1024 MB default should set the property explicitly.

#### log4j 1.x removed from the FileNet connector

`Removed` - The FileNet connector no longer bundles the log4j 1.x classes: the log4j API is provided by `log4j-over-slf4j`. Custom FileNet extensions that rely on log4j 1.x appenders or on a `log4j.properties` file must move to the SLF4J logging configuration.

---

## Bug fixes

#### Redaction removes vector graphics and form fields

`Fixed` - A redaction now also removes the vector graphics (logos, drawn signatures, line art) and the interactive form fields located under the redacted area in the published document. Previously this content stayed in the published document and could be recovered. Ink, free text and text-markup annotations under the redacted area are cut accordingly. Documents redacted with an earlier version should be re-redacted and re-published.

#### Email conversion

`Fixed` - Several email conversion issues are fixed: inline images of EML emails stay in the body instead of appearing as separate attachment pages, a vector image embedded in an email is now displayed in the body instead of raising a false "format not supported" alert, and some MSG emails that failed to render now open.

#### HEIC photos from recent iPhones on Docker

`Fixed` - HEIC photos taken with recent iPhones (iPhone 14 Pro and later) now open in Docker deployments instead of being reported as an unsupported format.

#### Copy and paste from justified text

`Fixed` - Copying text from a justified PDF paragraph now keeps the spaces between words.

#### Memory leak with signature verification

`Fixed` - With signature verification enabled, viewing signed PDFs no longer builds up memory until the service freezes.

#### Orphaned LibreOffice processes on Windows

`Fixed` - On Windows, leftover LibreOffice processes are cleaned up when the conversion service starts or restarts, which ends a crash loop after a restart. The cleanup stops every LibreOffice process on the host, so LibreOffice should not be used for other purposes on the conversion server.

#### Ctrl+click in the Document Builder

`Fixed` - In the Document Builder, Ctrl+click multi-selection of pages works again (regression since 2023.19.0).

#### FileNet retrieval name after a merge or split

`Fixed` - After a merge or split in the Document Builder, the documents created in FileNet get their `RetrievalName` from the document title set by the script again.

#### Circle and rectangle colors

`Fixed` - When the annotation style is remembered, circles keep their fill color and rectangles keep their border color for the next annotation.

#### Document statistics under load

`Fixed` - Document statistics (as shown in the "About ARender" panel) are no longer corrupted when several users load documents at the same time.

---

## Changelog

| Summary | Type | Key | Linked Issues |
|---------|------|-----|---------------|
| Security hardening | Security | AR-18690 | TMAPR-7005 |
| Dependency security update | Security | AR-18552 | |
| Dependency security update | Security | AR-18557 | |
| Dependency security update | Security | AR-18632 | |
| Dependency security update | Security | AR-18643 | |
| Dependency security update | Security | AR-18699 | |
| Dependency security update | Security | AR-18750 | |
| Dependency security update | Security | AR-18779 | |
| Dependency security update | Security | AR-18783 | |
| Dependency security update | Security | AR-18788 | |
| Dependency update of the MIME detection library | Evolution | AR-18755 | |
| Slow rendering of large-format pages | Regression | AR-18599 | TMAPR-6913 |
| PDFOwl engine upgraded to 1.24-33 | Evolution | AR-18721 | |
| Word document fails to convert with LibreOffice | Bug fix | AR-18587 | TMAPR-6946 |
| Redaction leaves vector content in the exported PDF | Bug fix | AR-18577 | |
| Redaction does not remove interactive form fields | Bug fix | AR-18635 | TMAPR-6975 |
| Inline images in EML emails shown as attachments | Bug fix | AR-18675 | TMAPR-6995 |
| False unsupported-format alert for an email vector image | Bug fix | AR-18660 | TMAPR-6790 |
| MSG email fails to render | Bug fix | AR-18585 | TMAPR-6935 |
| HEIC photos from recent iPhones fail to convert on Docker | Bug fix | AR-18679 | TMAPR-6967 |
| Copy and paste from justified PDF text loses spaces | Bug fix | AR-18642 | TMAPR-6798 |
| Memory leak in signature verification causes freezes | Bug fix | AR-18580 | TMAPR-6933 |
| Orphaned LibreOffice processes cause a crash loop on Windows | Bug fix | AR-18308 | TMAPR-6783 |
| Ctrl+click does not work in the Document Builder | Regression | AR-18352 | TMAPR-6830 |
| FileNet RetrievalName not updated after merge or split | Regression | AR-18566 | TMAPR-6936 |
| Circle and rectangle lose their customized color | Bug fix | AR-18634 | TMAPR-6956 |
| Document statistics corrupted under concurrent load | Bug fix | AR-18568 | TMAPR-6952 |

---

## Download

import ARenderDownloads from '@site/src/components/ARenderDownloads';

<ARenderDownloads version="2023.23.0" filter={["rendition", "web-ui", "connector-filenet", "hmi-cm", "plugin-filenet", "plugin-alfresco", "plugin-alfresco-adf", "client-api", "rendition-api"]} />

</div>
