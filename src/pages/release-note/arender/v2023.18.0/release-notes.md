---
title: "ARender v2023.18.0 – Release Notes"
draft: false
date: "2026-02-27"
weight: -202318
aliases:
  - /release/2023.18/
description: "Major PDFOwl rendition upgrade, new JavaScript audit hooks, FileNet multi-objectStore support, video time display, and several annotation and printing fixes."
_build:
  list: never
---

> **Upgrade note:** See [v2023.18.0](../upgrade-notes) for detailed instructions.

## Overview

ARender 2023.18.0 delivers a significant **PDFOwl rendition engine upgrade** (v1.24-22) that resolves multiple rendering issues with large files, PDF layers, and specific document types. It also introduces **new JavaScript audit hooks** for tracking print and download events, **FileNet multi-objectStore document support**, and a long-awaited **video time display**. Several annotation, rotation, and document-open fixes round out the release.

## Prerequisites

| Component | Supported versions |
|-----------|--------------------|
| OpenJDK   | 8 or 11            |

## Security

**Spring Boot upgraded to 2.7.34**
Upgraded the embedded Tomcat through Spring Boot 2.7.34 (HeroDevs) to address a HIGH severity vulnerability affecting Tomcat Embedded Core.
Related issues: [AR-18163](https://arondor.atlassian.net/browse/AR-18163)

## User Perspective

**Video time display (elapsed and remaining)**
ARender now shows the time elapsed and the time remaining while viewing video documents, providing better orientation within long video files.
Related issues: [AR-16734](https://arondor.atlassian.net/browse/AR-16734)

**Rotation-aware print and download**
Printing or downloading a document after rotating pages no longer requires the "include annotations" option to preserve the rotations. Two new properties control this behaviour:
- `topPanel.documentMenu.downloadRotation=true` — adds a dedicated download-with-rotations button in the top panel menu (default: `false`)
- `print.includeRotations=true` — includes saved rotations when printing (default: `false`)

Note: these properties require that page rotation saving is already enabled via the pre-existing `visualization.rotation.save.enabled=true` property.
Related issues: [AR-17468](https://arondor.atlassian.net/browse/AR-17468)
More information: [Top panel configuration](/docs/arender/guides/configurations/web-ui/properties/toppanel/)

> ⚠️ **Do not enable this feature in production yet.**
> The current implementation requires end users to choose whether to include rotations — both an extra download button appears in the UI for downloads, and a checkbox must be checked for printing. This is not the intended final experience. A follow-up improvement is planned for the next release: when `topPanel.documentMenu.downloadRotation=true` is set, the standard "Download as PDF" action will automatically include saved rotations without any extra button; when `print.includeRotations=true` is set, printing will automatically include saved rotations without any checkbox. We recommend waiting for that release before exposing this behaviour to end users.

**PDF checkbox rendering matches Acrobat Reader** *(PDFOwl only)*
Fixed a rendering issue where checkboxes in certain PDF forms appeared unchecked in ARender while they were correctly displayed as checked in Acrobat Reader. This fix is specific to the PDFOwl rendering engine.
Related issues: [AR-15828](https://arondor.atlassian.net/browse/AR-15828)

**Pre-configured default annotation filter**
Two new properties allow setting which annotation types are pre-selected in the annotation filter panel on document open:
- `annotation.comment.explorer.filter.types.enabled=true` — enables the feature (default: `false`; when `false`, all types are selected)
- `annotation.comment.explorer.filter.types=<comma-separated list>` — the annotation types to pre-select (e.g. `STICKY_NOTE,HIGHLIGHT`)

The filter is applied immediately on document open, without requiring any user interaction.
Related issues: [AR-16077](https://arondor.atlassian.net/browse/AR-16077)
More information: [Annotation properties](/docs/arender/guides/configurations/web-ui/properties/annotation/)

**Missing Excel macro-enabled file type icons**
Added missing SVG icons for XLSM (Excel macro-enabled workbook) and XLTM (Excel macro-enabled template) file types. These were previously generating 404 errors in browser monitoring tools.
Related issues: [AR-17920](https://arondor.atlassian.net/browse/AR-17920)

**Eliminated console errors when clicking outside page content**
Clicking in the grey area surrounding document pages no longer produces `SEVERE` exceptions in the browser console related to hyperlink position computation.
Related issues: [AR-18100](https://arondor.atlassian.net/browse/AR-18100)

## Developer / Integrator Perspective

**JavaScript Save API in DocBuilder mode**
Integrators using DocBuilder mode can now trigger the document save programmatically via two new JS API methods:
- `saveCustomDocument()` — triggers save with default options
- `saveCustomDocument(download, delete, freeze, behavior)` — full control over download, panel removal, freeze, and save behaviour

This enables external buttons or workflows to initiate the save action without user intervention.
Related issues: [AR-15793](https://arondor.atlassian.net/browse/AR-15793)
More information: [DocBuilder JavaScript API](/docs/arender/development/apis/web-ui/javascript/documentbuilder-js-api/)

**JavaScript hooks for print and download events**
New JS API hooks allow integrators to be notified when a user prints or downloads a document (including via the JS API, DocBuilder buttons, or error-state downloads). This enables integration with audit trail systems to meet regulatory compliance requirements.
Related issues: [AR-18119](https://arondor.atlassian.net/browse/AR-18119)
More information: [Print JavaScript API](/docs/arender/development/apis/web-ui/javascript/print-js-api/), [Download JavaScript API](/docs/arender/development/apis/web-ui/javascript/download-js-api/)

**Integrator profile for configuration override**
A dedicated Spring active profile (`integrator`) is now provided for custom connector integrators. By setting `spring.profiles.active=integrator` (or `spring.profiles.include=integrator`), integrators can override ARender and Spring Boot default configuration without risk of property file conflicts.
Related issues: [AR-18126](https://arondor.atlassian.net/browse/AR-18126)
More information: [Spring configuration](/docs/arender/guides/configurations/web-ui/server/spring-configuration/)

**FileNet multi-objectStore document support via VSID**
The FileNet parser now natively handles opening multiple documents using their VSIDs even when those documents reside in different objectStores, simplifying multi-document workflows in FileNet environments.
Related issues: [AR-17170](https://arondor.atlassian.net/browse/AR-17170)
More information: [FileNet P8 connector](/docs/arender/guides/configurations/web-ui/connectors/filenetp8/)

## Exploitation Perspective

**PDFOwl upgraded to 1.24-22 — major rendition improvements**
This upgrade bundles a large set of fixes and enhancements to the PDFOwl rendering engine:

- *Large PDFs (100k+ pages):* Resolved a performance issue where layout generation was extremely slow due to internal linked-list traversal. Pages are now maintained in a direct array, dramatically reducing processing time.
  Related issues: [AR-18093](https://arondor.atlassian.net/browse/AR-18093)

- *PDFs with large embedded images:* Fixed a timeout/crash caused by the PDFOwl resource store reaching its default 256 MB limit. The store size is now configurable (`--maxstore`), avoiding slow garbage collection and rendering failures.
  Related issues: [AR-17738](https://arondor.atlassian.net/browse/AR-17738)

- *Control characters in PDF layer names:* Fixed a `JsonParseException` caused by ASCII control characters (e.g., ASCII 26 – SUB) embedded in layer names during `DocumentPageLayout` deserialization.
  Related issues: [AR-17733](https://arondor.atlassian.net/browse/AR-17733)

- *Quotes in PDF layer names causing invalid JSON:* Fixed an invalid JSON layout generated by PDFOwl when PDF layer names contained unescaped quotes.
  Related issues: [AR-18095](https://arondor.atlassian.net/browse/AR-18095)

- *Specific PDF document failing to open:* Resolved an issue where certain PDF documents failed to render correctly with PDFOwl.
  Related issues: [AR-17668](https://arondor.atlassian.net/browse/AR-17668)

- *PDF checkbox rendering:* Fixed white-on-white rendering of checkboxes in PDF forms by correctly handling the `B` operator (fill + stroke) for path drawing.
  Related issues: [AR-15828](https://arondor.atlassian.net/browse/AR-15828)

- *SVG output format:* PDFOwl now supports SVG as an output format for rendered pages.
  Related issues: [AR-18108](https://arondor.atlassian.net/browse/AR-18108)

## Changelog

| Summary                                                                                | Issue Type | Key                                                       | Rendering Engine | Linked Issues |
|----------------------------------------------------------------------------------------|------------|-----------------------------------------------------------|------------------|---------------|
| [Mend] Upgrade Spring version (Spring Boot 2.7.34)                                     | Dev W/O UX | [AR-18163](https://arondor.atlassian.net/browse/AR-18163) | | |
| External application.properties/yaml configuration in connector (integrator profile)   | Dev W/O UX | [AR-18126](https://arondor.atlassian.net/browse/AR-18126) | | |
| Expose JavaScript Hooks to Track Print & Download Actions                              | Dev W/O UX | [AR-18119](https://arondor.atlassian.net/browse/AR-18119) | | [TMAPR-6692](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6692) |
| pdfowl: add svg output format                                                          | Dev W/O UX | [AR-18108](https://arondor.atlassian.net/browse/AR-18108) | PDFOwl | |
| Upgrade PDFOwl to 1.24-22                                                              | Dev W/O UX | [AR-18107](https://arondor.atlassian.net/browse/AR-18107) | PDFOwl | |
| Evolution of the FileNet parser: multi-document via VSIDs for multiple objectStores    | Evolution  | [AR-17170](https://arondor.atlassian.net/browse/AR-17170) | | [TMAPR-5974](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5974) |
| Display the time spent and time remaining while viewing a video document               | Evolution  | [AR-16734](https://arondor.atlassian.net/browse/AR-16734) | | [TMAPR-5651](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5651) |
| Activate default annotation filter                                                     | Evolution  | [AR-16077](https://arondor.atlassian.net/browse/AR-16077) | | [TMAPR-5393](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5393) |
| Have an external event available for saving in docBuilder mode                         | Evolution  | [AR-15793](https://arondor.atlassian.net/browse/AR-15793) | | [TMAPR-5214](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5214) |
| Clicking outside page contents on grey area produces an exception in browser console   | Issue      | [AR-18100](https://arondor.atlassian.net/browse/AR-18100) | | |
| Pdfowl: invalid JSON layout for a specific PDF document with layers                    | Issue      | [AR-18095](https://arondor.atlassian.net/browse/AR-18095) | PDFOwl | |
| Pdfowl - Better support of very large PDF files (100k+ pages)                          | Issue      | [AR-18093](https://arondor.atlassian.net/browse/AR-18093) | PDFOwl | [TMAPR-6671](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6671) |
| Add missing icons for Excel macro-enabled file types (XLSM, XLTM)                      | Issue      | [AR-17920](https://arondor.atlassian.net/browse/AR-17920) | | [TMAPR-6589](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6589) |
| PDF with large image not shown (pdfowl resource store limit)                           | Issue      | [AR-17738](https://arondor.atlassian.net/browse/AR-17738) | PDFOwl | [TMAPR-6431](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6431) |
| pdfowl: JSON deserialization failure — control characters in PDF layer names           | Issue      | [AR-17733](https://arondor.atlassian.net/browse/AR-17733) | PDFOwl | [TMAPR-6314](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6314) |
| Problem opening a PDF document with PDFOwl                                             | Issue      | [AR-17668](https://arondor.atlassian.net/browse/AR-17668) | PDFOwl | [TMAPR-6373](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6373) |
| Downloading and printing with modified rotations requires "include annotations" option | Issue      | [AR-17468](https://arondor.atlassian.net/browse/AR-17468) | | [TMAPR-6147](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6147) |
| Checkbox on PDF checked in Acrobat Reader but not in ARender                           | Issue      | [AR-15828](https://arondor.atlassian.net/browse/AR-15828) | PDFOwl | [TMAPR-5344](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5344) |

## Download

| Description                                                       | Binary                                                                                                                                                                                                | SHA-256                                                                                                                                                                                                     |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ARender Rendition Server installer                                | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.18.0/rendition-engine-installer-2023.18.0-rendition.jar)  | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.18.0/rendition-engine-installer-2023.18.0-rendition.jar.sha256)  |
| ARender WEB-UI - Spring Boot Application - Standalone             | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.18.0/arondor-arender-hmi-spring-boot-package-2023.18.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.18.0/arondor-arender-hmi-spring-boot-package-2023.18.0.zip.sha256) |
| ARender HMI - J2EE EAR Application - FileNet 5.x                  | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.18.0/arondor-arender-hmi-filenet-ear-2023.18.0.ear)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.18.0/arondor-arender-hmi-filenet-ear-2023.18.0.ear.sha256)                 |
| ARender HMI - J2EE WAR Application - Content Manager 8.1          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.18.0/arondor-arender-hmi-cm-2023.18.0.war)                                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.18.0/arondor-arender-hmi-cm-2023.18.0.war.sha256)                                   |
| ARender plugins : IBM Content Navigator plugin                    | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.18.0/arondor-arender-navigator-plugin-2023.18.0.jar)               | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.18.0/arondor-arender-navigator-plugin-2023.18.0.jar.sha256)               |
| ARender plugins : Alfresco Share plugin                           | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.18.0/arender-for-alfresco-share-plugin-2023.18.0.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.18.0/arender-for-alfresco-share-plugin-2023.18.0.jar.sha256)             |
| ARender plugins : Alfresco ADF plugin base for integration in ADF | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.18.0/arender-for-alfresco-ADF-plugin-2023.18.0.zip)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.18.0/arender-for-alfresco-ADF-plugin-2023.18.0.zip.sha256)                 |
| ARender API : Client API                                          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.18.0/arondor-arender-client-api-2023.18.0-javadoc.jar)                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.18.0/arondor-arender-client-api-2023.18.0-javadoc.jar.sha256)                   |
| ARender API : Rendition API                                       | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.18.0/arondor-arender-rendition-api-2023.18.0-javadoc.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.18.0/arondor-arender-rendition-api-2023.18.0-javadoc.jar.sha256)             |