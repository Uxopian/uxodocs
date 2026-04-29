---
title: "ARender v2023.20.0 – Release Notes"
draft: false
date: "2026-04-29"
weight: -202320
aliases:
  - /release/2023.20/
description: "New collapsed state for the document navigator, customizable log configuration, scroll performance with many annotations, faster DirectOffice conversion, PDFOwl 1.24-26 upgrade, and numerous rendering, redaction, and annotation fixes."
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

<div className="arender-release-notes">

# ARender v2023.20.0 – Release Notes

ARender 2023.20.0 is a maintenance release on the 2023.x (ARender Classic) line. It focuses on three areas: a major **DirectOffice performance patch** that brings heavy DOCX conversion times down from minutes to seconds, an upgrade of the embedded **PDFOwl rendering engine to 1.24-26**, and a long list of **annotation, redaction, and rendering fixes** addressing reports from production deployments.

The release also introduces a **new `Collapsed` value for the document navigator** so the vertical tab bar stays visible at startup (fixing an iOS gesture conflict) and a **simpler, externalized log configuration** for integrators who only need to override part of the default logging setup. Embedded platform dependencies have been upgraded to address known security advisories.

---

## Security

#### Embedded platform upgraded

`Changed` — The embedded Spring Boot platform has been upgraded to address known vulnerabilities in transitive dependencies. For detailed information about the specific advisories addressed, please contact [ARender support](https://arondor.atlassian.net/servicedesk/customer/portals).

---

## Infrastructure changes

#### PDFOwl upgraded to 1.24-26

`Changed` — The embedded PDFOwl rendering engine has been upgraded with new text-extraction commands (`text` produces one JSON document per page, `rawtext` produces a single full-text document for the whole file), HTTP-style chunked output (`--chunk`), a configurable memory limit (`--memlimit`), and image caching now disabled by default to reduce memory pressure. A PDF XRef resolution bug has also been fixed, significantly speeding up rendering of certain very large documents.

#### Faster DOCX conversion in DirectOffice

`Changed` — A DirectOffice patch reduces conversion time for heavy DOCX documents from approximately 25 minutes to 2 minutes on representative customer files. The patch is applied to both the Linux and Windows variants of DirectOffice.

#### Hazelcast Kubernetes service port honoured

`Fixed` — The `viewer.hazelcast.service.port` Helm chart parameter is now correctly propagated to the Hazelcast Kubernetes discovery configuration. Previously, although the Kubernetes service and the Hazelcast instance used the configured port, discovery still attempted to reach peers on the default `5701`, breaking clustering on customised ports.

---

## Developer notes

#### Customizable log configuration without overriding defaults

`New` — Integrators can now provide an externalized log configuration that adds to the default configuration shipped in the JAR, instead of replacing it entirely. The output path of log files can also be prefixed via a variable defined in a `.properties` file, so logs no longer have to be written next to the application working directory.

#### FileNet connector: reduced authentication overhead

`Changed` — The FileNet connector previously called `JaasObjectStoreProvider.checkUserNameIsSetup()` on every request, generating excessive authentication traffic between ARender and FileNet. The number of calls has been significantly reduced.

---

## User-facing changes

#### Collapsed state for the document navigator

`New` — The <DocLink version="v2023.20.0" product="arender" to="guides/configurations/web-ui/properties/full-config#documentnavigator">documentnavigator.initialWidth</DocLink> property now accepts a new `Collapsed` value, which keeps the vertical tab bar visible while hiding the panel content on startup. This addresses an iOS limitation where the swipe gesture used to expand the navigator conflicts with the system gesture, making the panel unreachable. The previous `Reduced` value, which hid the entire panel including the tab bar, is now deprecated in favor of `Hidden`.

#### Faster failure on unexpected server errors

`Fixed` — Unexpected server errors (for example, a request for a document that no longer exists in FileNet) no longer block the UI for 30 seconds before reporting the failure. The GWT RPC layer now converts the unexpected error into an immediate failure.

---

## Bug fixes

#### Scroll performance on heavily annotated documents

`Fixed` — Scrolling through documents with many pages and many annotations no longer freezes the browser. The annotation lookup performed on every scroll event has been optimised so that scroll cost is no longer proportional to the total number of annotations in the document.

#### `annotation.loadPerPage` now works for non-XFDF connectors

`Fixed` — The `annotation.loadPerPage=true` configuration, recommended for documents with very large annotation sets, previously failed for any connector other than XFDF with `AnnotationAccessorDoesNotHandlePageAccessException`. It now works for all connectors that expose annotations.

#### Comments on arrow annotations preserved across mixed text and numbers

`Fixed` — Comments containing both text and numbers on arrow annotations no longer lose their text after validation, and numbers are no longer displayed in inches.

#### Annotation menu redisplayed when annotation creation policy toggles

`Fixed` — When successively opening a document with `annotationCreationPolicy.canCreateAnnotation=false` followed by one where annotation creation is allowed, the Annotation menu in the top panel is now correctly redisplayed.

#### Annotation status editable in the explorer after collapse/expand

`Fixed` — Annotation status fields in the annotation explorer are now editable again after collapsing and re-expanding a section.

#### Negative zoom no longer triggered when switching documents

`Fixed` — Zooming on one document and then opening another no longer applies a negative zoom level to the new document. The issue was observed with FlowerDocs.

#### PDF portfolio with embedded `.joboptions` files now opens

`Fixed` — A `NullPointerException` in `PDFPortfolioUtils.isFacturX()` triggered by PDF files containing only Kids-style embedded files (such as Adobe `.joboptions` presets generated by Distiller or printing pipelines) has been resolved. These PDFs now load correctly in the viewer.

#### PDFOwl portfolio document view loading

`Fixed` — When navigating between documents inside a PDF portfolio (via thumbnails or the document dropdown), some documents previously failed to display. PDF portfolios now behave consistently with PDFOwl enabled.

#### PDF documents that previously failed to open with PDFOWL

`Fixed` — A class of PDF documents that opened correctly without PDFOWL but failed to load with PDFOWL enabled now renders normally.

#### Stable page count for plain-text documents

`Fixed` — Reloading the same plain-text (`.txt`) document no longer causes the displayed page count to alternate between two values. The page count is now stable across loads.

#### Recovery when a cached document is missing on disk

`Fixed` — When the rendition cache references a converted file that is no longer present in the file system but the source file is still available, the document is now re-rendered transparently instead of failing to open.

#### Blank table pages with DirectOffice

`Fixed` — DirectOffice no longer produces extra empty pages with blank tables when rendering certain Word documents.

#### EML subject and accented characters rendered correctly

`Fixed` — Two display issues in EML rendering have been resolved: incorrect rendering of the email subject in certain documents, and incorrect rendering of accented characters in subjects.

#### Highlighted text height in search results

`Fixed` — The highlight box around search results is no longer disproportionately tall on certain PDF documents.

#### Redaction: malformed text after download with obfuscation

`Fixed` — Downloading a document with redactions applied no longer produces malformed text in the obfuscated areas.

#### FDF upload with stamp annotations

`Fixed` — Uploading an FDF file containing stamp annotations no longer fails. Stamps are now correctly imported alongside the other annotation types.

---

## Changelog

| Summary | Issue Type | Key | Linked Issues |
|---------|------------|-----|---------------|
| [Mend] Upgrade Spring version | Dev W/O UX | AR-18337 | |
| [HMI] Scroll freeze with many annotations + loadPerPage broken for non-XFDF connectors | Issue | AR-18297 | TMAPR-6803 |
| Comments associated with arrow annotation does not work properly | Issue | AR-18239 | TMAPR-6698 |
| Modifying the zoom causes a negative zoom when another document is opened when using FlowerDocs | Issue | AR-17888 | |
| Error when server sends an unexpected error | Issue | AR-17702 | TMAPR-6397 |
| Add Collapsed value for documentnavigator.initialWidth + deprecate Reduced in favor of Hidden | Evolution | AR-17634 | TMAPR-6301 |
| Successively opening a document without the option of creating an annotation and a document with this option does not redisplay the Annotation menu | Issue | AR-17190 | TMAPR-5915 |
| Annotation status in explorer not editable after collapse/expand | Regression | AR-17148 | TMAPR-5958 |
| Make the logs configuration simply customizable | Evolution | AR-17123 | TMAPR-5936 |
| FileNet connector: Reduce calls to JaasObjectStoreProvider.checkUserNameIsSetup() | Evolution | AR-18246 | TMAPR-6397 |
| Jump to pdfowl version 1.24-26 | Dev W/O UX | AR-18269 | |
| DirectOffice patch to improve conversion speed of docx files | Issue | AR-17823 | TMAPR-6462 |
| Word rendition with Direct Office displays blank table pages | Issue | AR-18287 | TMAPR-6792 |
| [Rendition] NPE in PDFPortfolioUtils.isFacturX() on PDFs with Kids-only embedded files (.joboptions) | Issue | AR-18296 | TMAPR-6782 |
| PDFOwl - Issue with Document View Loading While Navigating a PDF Portfolio | Issue | AR-17358 | |
| PDF document won't open with PDFOWL | Issue | AR-17631 | TMAPR-6320 |
| The number of pages changes every time a document is loaded | Issue | AR-18270 | |
| Handle missing rendered document | Issue | AR-18292 | |
| Incorrect display of EML document subject | Issue | AR-17503 | |
| Encoding issue for accented character | Issue | AR-15441 | TMAPR-5218 |
| The height of the highlighted text is very high | Issue | AR-17424 | TMAPR-6177 |
| Text malformed after download with obfuscation | Issue | AR-16957 | TMAPR-5807 |
| Upload FDF fails when it contains a stamp | Issue | AR-16844 | |
| Changing hazelcast service port is not working | Issue | AR-17454 | TMAPR-6172 |

---

## Download

import ARenderDownloads from '@site/src/components/ARenderDownloads';

<ARenderDownloads version="2023.20.0" />

</div>
