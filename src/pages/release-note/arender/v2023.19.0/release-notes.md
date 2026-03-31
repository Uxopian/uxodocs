---
title: "ARender v2023.19.0 – Release Notes"
draft: false
date: "2026-03-31"
weight: -202319
aliases:
  - /release/2023.19/
description: "AcroForm fillable fields comparison, mobile text selection by default, automatic rotation on download/print, new JS API events, and numerous annotation, redaction, and rendering fixes."
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

> **Upgrade note:** See [v2023.19.0](../upgrade-notes) for detailed instructions.

## Overview

ARender 2023.19.0 introduces **fillable fields comparison** for AcroForm PDF documents, enabling users to see differences in form field content when comparing two versions. **Text selection is now enabled by default on mobile** devices, and **saved page rotations can now be transparently included** in downloads and prints via dedicated properties — replacing the separate download button and print checkbox from the previous release. Two **new JavaScript API events** allow integrators to track the first page render time and the resolution of all document layouts. The release also includes **synchronized zoom in document comparison**, several **annotation and redaction fixes**, and **rendering improvements** for emails, Office documents, and SVG files.

## Prerequisites

| Component | Supported versions |
|-----------|--------------------|
| OpenJDK   | 8 or 11            |

## Security

**Security dependencies upgraded**
Embedded dependencies have been upgraded to address known vulnerabilities in the rendition and UI components. For detailed information about the specific vulnerabilities addressed, please contact [ARender support](https://arondor.atlassian.net/servicedesk/customer/portals).
Related issues: AR-18122, AR-18223

## User Perspective

**AcroForm fillable fields comparison**
When comparing two versions of a PDF document containing fillable form fields (AcroForm), ARender now extracts and compares the text content of those fields. Differences in fillable field values are highlighted alongside regular text differences in the comparison view. This feature supports text fields; button fields (checkboxes, radio buttons) are excluded.
Related issues: AR-16889

**Text selection enabled by default on mobile**
Mobile users no longer need to manually switch to text selection mode. Text selection is now active by default, removing an extra step for users who need to select text or apply redact annotations on mobile devices.
Related issues: AR-16665

**Streamlined rotation on download and print**
The separate "Download with rotations" button and the print checkbox introduced in 2023.18.0 have been removed. Instead, when rotation saving is enabled (<DocLink version="v2023.19.0" product="arender" to="guides/configurations/web-ui/properties/vizualisation/"><code>visualization.rotation.save.enabled=true</code></DocLink>), two properties now control whether the standard download and print actions transparently include saved rotations:
- <DocLink version="v2023.19.0" product="arender" to="guides/configurations/web-ui/properties/toppanel/"><code>topPanel.documentMenu.downloadPDF.includeRotations=true</code></DocLink> — the standard "Download as PDF" action includes saved rotations (default: `false`)
- <DocLink version="v2023.19.0" product="arender" to="guides/configurations/web-ui/properties/print/"><code>print.includeRotations=true</code></DocLink> — printing includes saved rotations (default: `false`)

When enabled, no extra button or checkbox is presented to the user — rotations are applied automatically.
Related issues: AR-18187

**Synchronized zoom in document comparison**
When comparing two documents side by side, zooming in one panel now synchronizes the zoom level in the other panel, providing a more consistent comparison experience.
Related issues: AR-16958

**Color palette no longer truncated in annotation editor**
Fixed a regression where the color palette in the annotation editor was truncated when the document display panel was reduced below a certain width.
Related issues: AR-17689

**Ghost broken-image icon on arrow annotations**
Fixed a visual artefact where a broken-image icon appeared when creating or editing arrow annotations.
Related issues: AR-18205

**Comments on arrow annotations now saved correctly**
Comments added to arrow annotations were previously lost after saving and reopening the document. They are now correctly persisted.
Related issues: AR-18121

**Escape key closes hyperlink URL creation popup**
Pressing the Escape key while creating a hyperlink URL in the quick menu now correctly closes the popup.
Related issues: AR-17315

**Pagination selection fix**
Selecting a thumbnail and then navigating with page buttons no longer leaves the original thumbnail in a selected state.
Related issues: AR-17647

**Area hyperlink creation after disabling DocLinks**
Fixed an issue where area selection for hyperlink creation stopped working after disabling the DocLinks feature.
Related issues: AR-18094

## Developer / Integrator Perspective

**JavaScript API: first page rendered event**
A new JS API event fires when the first page of a document finishes rendering, allowing integrators to measure perceived load time independently of full document loading. This enables more accurate performance monitoring and user-experience metrics.
Related issues: AR-17877
More information: <DocLink version="v2023.19.0" product="arender" to="development/apis/web-ui/javascript/document/">Document JavaScript API</DocLink>

**JavaScript API: all document layouts resolved event**
A new JS API event fires when all `DocumentLayout` objects have been resolved for every document in the session, including child documents such as ZIP entries or email attachments. This is useful for integrators who need to perform actions only after the complete document structure is known.
Related issues: AR-18225
More information: <DocLink version="v2023.19.0" product="arender" to="development/apis/web-ui/javascript/get-layout/">Document layout JavaScript API</DocLink>

## Exploitation Perspective

**Improved email rendering**
Fixed incorrect display of certain emails: Gmail emails that were incorrectly split into separate documents (body vs. attachments) and Outlook emails that rendered without visible text. Root cause was NUL byte characters in MSG file content interfering with HTML detection.
Related issues: AR-15321

**Correct file extensions for annotation downloads**
When downloading annotations in XFDF, FDF, or ZIP format, the source document extension is no longer incorrectly included in the target filename. Documents with dots in their name (e.g., `hello.world.pdf`) are also handled correctly.
Related issues: AR-16322

**Redaction annotations excluded from FDF downloads**
FDF annotation downloads no longer incorrectly include redaction annotations. Redactions are security-sensitive and must not be exported as standard annotations.
Related issues: AR-16562

**Faster layout generation for certain Office documents**
Optimized the Excel cell counting process in the Aroms rendering engine (upgraded to Aroms 4.1.0) to avoid slow `getDocumentLayout` responses when processing certain Office documents. A timeout mechanism now prevents excessive processing time.
Related issues: AR-16690

**Redaction always protected on print**
Redactions are now always preserved when printing, regardless of whether annotations are included or a watermark is applied. Previously, certain print configurations could strip redacted content.
Related issues: AR-17073

**LibreOffice lock file cleanup**
Temporary lock files (`.~lock.*.pdf#`) left by LibreOffice during DOCX-to-PDF conversion are now cleaned up after the conversion completes, preventing them from blocking subsequent conversions of the same file.
Related issues: AR-17225

**Improved PDF signature display**
Fixed an issue where PDF digital signatures showed the signatory as "unknown" in ARender while Adobe Acrobat correctly displayed the signatory information. ARender now uses the signature name or Common Name (CN) from the certificate.
Related issues: AR-17892

**Document title sanitization for MS Office conversion**
Office documents with trailing spaces in their title no longer cause `InvalidPathException` during MS Office Windows conversion.
Related issues: AR-17921

**Race condition in annotation cache resolved**
Fixed an `IllegalArgumentException` ("Annotation already exists") that occurred when rapidly moving sticky notes. The race condition between user modifications and asynchronous save callbacks is now handled gracefully.
Related issues: AR-18011

**Bookmark annotation with invalid page index**
XFDF files containing bookmark annotations with `page="-1"` (parent folder nodes) no longer cause an `IndexOutOfBoundsException` when downloading with annotations.
Related issues: AR-18023

**Free-text annotation positioning in PDF download**
Fixed misalignment of free-text annotations in downloaded PDFs, particularly for annotations with large border widths or annotations created by click (vs. drag).
Related issues: AR-18102

**SVG documents now rendered as images**
SVG files are now correctly detected and rendered as image documents in ARender, including in Docker environments.
Related issues: AR-18114

**Helm chart configuration fix**
Fixed the combined use of `environment:` and `envFrom:` in the rendition Helm chart by using `nindent` instead of `indent` for proper YAML indentation.
Related issues: AR-18127

**PDF/A document save in FileNet**
Fixed a regression where saving or updating built PDF/A documents in FileNet stopped working. This was caused by the document accessor not being reloaded after PDF/A conversion.
Related issues: AR-18136

**Improved PdfOwl error logging**
PdfOwl error log messages now include the `documentId`, making it easier to correlate rendering errors with specific documents, especially when the watchdog timeout triggers.
Related issues: AR-18140

**Rendition server failover**
Fixed an issue where the HMI did not failover to a secondary rendition server when the primary server became unavailable. The `WebClientRequestException` is now correctly converted to trigger the failover mechanism.
Related issues: AR-18168

**Configurable conversion coordination timeout**
The internal conversion coordination timeout in the rendition broker is now configurable via `arender.conversion.timeout.ms`, aligned with the <DocLink version="v2023.19.0" product="arender" to="guides/configurations/web-ui/server/rest-client/"><code>arender.server.rendition.rest.read.timeout</code></DocLink> property. Previously, this was hardcoded to 120 seconds, causing heavy document conversions to fail even when the HTTP timeout was extended.
Related issues: AR-18170

**Improved Office document rendering on Linux**
Fixed incomplete rendering of certain landscape Office documents (e.g., 15 pages rendered instead of 18) when using LibreOffice on Linux. The rendering now uses `generateDocument` instead of page-by-page generation for Word documents.
Related issues: AR-18206

**Redaction applied in all download scenarios**
Reinforced redaction application to ensure redacted content is properly removed in all download scenarios, including the "Download All As PDF" action for archive documents.
Related issues: AR-18220

**Document comparison download fix**
Fixed an HTTP 500 error when downloading a document with comparison results. The `AlterContentDescriptionCompare` handler was missing in the UI layer.
Related issues: AR-18252

**Encrypted perishable document ID handling**
Improved the handling of reverted `EncryptedPerishableSelfContainedDocumentId` to correctly preserve the end-of-life timestamp, ensuring the re-generated document ID after reversion matches the original.
Related issues: AR-17686, AR-18217

## Changelog

| Summary | Issue Type | Key | Linked Issues |
|---------|------------|-----|---------------|
| Possibility to subscribe to the first page rendered event | Dev W/O UX | AR-17877 | TMAPR-6472 |
| SVG document does not open as an image | Dev W/O UX | AR-18114 | |
| Apply saved rotation automatically on download and print | Dev W/O UX | AR-18187 | TMAPR-6147 |
| Fix vulnerabilities | Dev W/O UX | AR-18223 | |
| Possibility to subscribe to the resolution of all document layouts | Dev W/O UX | AR-18225 | TMAPR-6472 |
| Enable text selection by default in mobile mode | Evolution | AR-16665 | TMAPR-5569 |
| Support comparing fillable fields for AcroForm PDF documents | Evolution | AR-16889 | TMAPR-5743 |
| Handle EncryptedPerishable EOL timestamp on revert | Evolution | AR-17686 | |
| Ghost broken-image icon on arrow annotation creation | Evolution | AR-18205 | |
| EncryptedPerishable code cleanup | Evolution | AR-18217 | |
| Incorrect display of some emails | Issue | AR-15321 | TMAPR-5198 |
| Downloaded document contains extra extension | Issue | AR-16322 | |
| Unexpected download of redaction via FDF download | Issue | AR-16562 | |
| getDocumentLayout slow on some Office documents | Issue | AR-16690 | TMAPR-5548, TMAPR-4124, TMAPR-6123 |
| Zoom not synchronized when comparing documents | Issue | AR-16958 | TMAPR-5809 |
| Redact must be protected on print | Issue | AR-17073 | TMAPR-6651 |
| Lock file on Docx to PDF conversion | Issue | AR-17225 | TMAPR-6032 |
| Escape key not functioning in hyperlink URL creation | Issue | AR-17315 | |
| Pagination problem | Issue | AR-17647 | TMAPR-6338 |
| Unknown signatory issue | Issue | AR-17892 | TMAPR-6403 |
| Sanitize documentTitle trailing spaces for MS Office | Issue | AR-17921 | TMAPR-5173 |
| Race condition in annotation cache management | Issue | AR-18011 | TMAPR-6581 |
| IndexOutOfBound with bookmark annotation page=-1 | Issue | AR-18023 | TMAPR-6608 |
| Unable to create area hyperlink after disabling DocLinks | Issue | AR-18094 | |
| Free text rendering differs when downloading | Issue | AR-18102 | |
| Remediate security vulnerabilities | Issue | AR-18122 | TMAPR-6697 |
| Comments on arrow annotation not saved | Issue | AR-18121 | TMAPR-6698 |
| Correction Helm Charts arender/rendition | Issue | AR-18127 | TMAPR-6699 |
| PdfOwl logging missing documentId | Issue | AR-18140 | |
| WebClientRequestException failover not triggered | Issue | AR-18168 | TMAPR-6613 |
| Configurable conversion coordination timeout | Issue | AR-18170 | TMAPR-6727 |
| Incomplete rendering of certain Office documents | Issue | AR-18206 | |
| Redact not applied in some cases | Issue | AR-18220 | |
| Color palette truncated in annotation editor | Regression | AR-17689 | TMAPR-6336 |
| Save and update PDF/A document in FileNet | Regression | AR-18136 | |
| Download with compared result fails with HTTP 500 | Regression | AR-18252 | |

## Download

| Description                                                       | Binary                                                                                                                                                                                                | SHA-256                                                                                                                                                                                                     |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ARender Rendition Server installer                                | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.19.0/rendition-engine-installer-2023.19.0-rendition.jar)  | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.19.0/rendition-engine-installer-2023.19.0-rendition.jar.sha256)  |
| ARender WEB-UI - Spring Boot Application - Standalone             | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.19.0/arondor-arender-hmi-spring-boot-package-2023.19.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.19.0/arondor-arender-hmi-spring-boot-package-2023.19.0.zip.sha256) |
| ARender HMI - J2EE EAR Application - FileNet 5.x                  | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.19.0/arondor-arender-hmi-filenet-ear-2023.19.0.ear)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.19.0/arondor-arender-hmi-filenet-ear-2023.19.0.ear.sha256)                 |
| ARender HMI - J2EE WAR Application - Content Manager 8.1          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.19.0/arondor-arender-hmi-cm-2023.19.0.war)                                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.19.0/arondor-arender-hmi-cm-2023.19.0.war.sha256)                                   |
| ARender plugins : IBM Content Navigator plugin                    | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.19.0/arondor-arender-navigator-plugin-2023.19.0.jar)               | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.19.0/arondor-arender-navigator-plugin-2023.19.0.jar.sha256)               |
| ARender plugins : Alfresco Share plugin                           | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.19.0/arender-for-alfresco-share-plugin-2023.19.0.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.19.0/arender-for-alfresco-share-plugin-2023.19.0.jar.sha256)             |
| ARender plugins : Alfresco ADF plugin base for integration in ADF | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.19.0/arender-for-alfresco-ADF-plugin-2023.19.0.zip)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.19.0/arender-for-alfresco-ADF-plugin-2023.19.0.zip.sha256)                 |
| ARender API : Client API                                          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.19.0/arondor-arender-client-api-2023.19.0-javadoc.jar)                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.19.0/arondor-arender-client-api-2023.19.0-javadoc.jar.sha256)                   |
| ARender API : Rendition API                                       | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.19.0/arondor-arender-rendition-api-2023.19.0-javadoc.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.19.0/arondor-arender-rendition-api-2023.19.0-javadoc.jar.sha256)             |
