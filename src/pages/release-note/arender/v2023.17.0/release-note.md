---
title: "ARender v2023.17.0 – Release Notes"
---

> **Upgrade note:** See [v2023.17.0](/releases/upgrade-notes/v2023.17.0/) for detailed instructions.

## Overview
ARender 2023.17.0 is a minor release focused on FileNet stability, performance improvements to reduce the number of 
requests generated during scrolling (thumbnails/page images), and conversion quality fixes (emails, images, and 
Office-based conversions). It also includes multiple UI and annotation corrections, along with documentation updates.

## Prerequisites

| Component | Supported versions |
|-----------|--------------------|
| OpenJDK   | 8 or 11            |

## Security
**No security-specific changes**  
This release does not introduce any security-related update.

## User Perspective
**More stable access to FileNet documents**  
Fixed a periodic `StackOverflowError` in `ServletConfigurationService` that could lead to 504 Gateway Timeout errors 
when accessing FileNet documents.  
Related issues: [AR-17648](https://arondor.atlassian.net/browse/AR-17648), 
[TMAPR-6333](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6333)

**Fix image display in tile mode**  
When opening image documents in tile mode without comparison enabled, ARender no longer displays differences at the 
bottom.  
Related issues: [AR-17885](https://arondor.atlassian.net/browse/AR-17885), 
[TMAFLW-1126](https://arondor.atlassian.net/browse/TMAFLW-1126)

**Email conversion fidelity improvements**  
Fixed issues where some emails displayed an incorrect date.  
Related issues: [AR-16685](https://arondor.atlassian.net/browse/AR-16685), 
[AR-17896](https://arondor.atlassian.net/browse/AR-17896), 
[TMAPR-5597](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5597), 
[TMAPR-6129](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6129)

**Reduced output size when converting images to PDF**  
Updated JPEG/PNG conversion to better preserve file size, avoiding PDFs that can be significantly larger than the source
images.  
Related issues: [AR-17802](https://arondor.atlassian.net/browse/AR-17802), 
[TMAPR-6484](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6484)

**Cleaner hyperlink UX**  
Improved hyperlink tooling, including the ability to hide formatting options for hyperlinks and removal of the 
non-functional expand/collapse button in the hyperlink browser.  
Related issues: [AR-17467](https://arondor.atlassian.net/browse/AR-17467), 
[AR-17745](https://arondor.atlassian.net/browse/AR-17745), 
[TMAPR-6200](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6200), 
[TMAPR-6449](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6449)

**Annotation and UI fixes**  
Fixed several UI/annotation issues such as highlight opacity not applying, crop box tool availability, duplicate stamp 
menus after resizing, and missing second-document titles in the annotation browser.  
Related issues: [AR-16426](https://arondor.atlassian.net/browse/AR-16426), 
[AR-17214](https://arondor.atlassian.net/browse/AR-17214), [AR-17473](https://arondor.atlassian.net/browse/AR-17473), 
[AR-17243](https://arondor.atlassian.net/browse/AR-17243), [AR-17382](https://arondor.atlassian.net/browse/AR-17382), 
[TMAPR-6068](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6068), 
[TMAPR-6162](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6162), 
[TMAPR-6097](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6097)

**Alfresco Share comparison window wording**  
Corrected the header message displayed in the Alfresco Share document version comparison window.  
Related issues: [AR-16871](https://arondor.atlassian.net/browse/AR-16871), 
[TMAPR-5708](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5708)

**More accurate video loading time display**  
Fixed incorrect loading time display for video documents.  
Related issues: [AR-17046](https://arondor.atlassian.net/browse/AR-17046), 
[TMAPR-5865](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5865)

**SVG rendering as images**  
Fixed SVG handling so SVG documents open correctly as images.  
Related issues: [AR-12526](https://arondor.atlassian.net/browse/AR-12526), 
[TMAPR-4799](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-4799), 
[TMAPR-5831](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5831)

**English UI wording consistency**  
Corrected spelling and capitalization inconsistencies in tooltips and menu labels (English UI).  
Related issues: [AR-13085](https://arondor.atlassian.net/browse/AR-13085), 
[TMAPR-4573](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-4573)

## Developer / Integrator Perspective
**Fewer OAuth2 token requests in FileNet connector**  
The FileNet OAuth2 connector no longer creates OAuth2 tokens for each call, reducing calls to the token endpoint.  
Related issues: [AR-17680](https://arondor.atlassian.net/browse/AR-17680)

**Support for embedded configuration files in custom connectors (Docker)**  
Integrators can now override default ARender configuration using property files embedded in their custom connector 
fat-jar, including in Docker deployments.  
Related issues: [AR-17881](https://arondor.atlassian.net/browse/AR-17881)

**Shortcuts configuration rework**  
Cleaned up and reworked shortcut-related properties to ensure configuration flags (copy/cut/print) are effectively 
applied.  
Related issues: [AR-18027](https://arondor.atlassian.net/browse/AR-18027), 
[AR-14973](https://arondor.atlassian.net/browse/AR-14973), 
[TMAPR-6622](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6622)

**Thai charset / font configuration for automated tests**  
Added the necessary configuration to properly render Thai documents, including documented OS/font setup expectations.  
Related issues: [AR-18039](https://arondor.atlassian.net/browse/AR-18039), 
[AR-18062](https://arondor.atlassian.net/browse/AR-18062), [AR-18056](https://arondor.atlassian.net/browse/AR-18056)

**Documentation corrections**  
Corrected documentation typos (e.g., `annotation.highlighttext` property spelling) and updated the release/upgrade 
documentation for 2023.17.0.  
Related issues: [AR-17342](https://arondor.atlassian.net/browse/AR-17342),
[TMAPR-6111](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6111), 
[AR-17970](https://arondor.atlassian.net/browse/AR-17970)

## Exploitation Perspective
**Reduced backend load when scrolling (thumbnails & page images)**  
Optimized the number of calls generated when scrolling through documents, limiting bursts of thumbnail and page image 
requests that could impact service stability.  
Related issues: [AR-18053](https://arondor.atlassian.net/browse/AR-18053), 
[TMAPR-6588](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6588)

**More stable FileNet sessions**  
Fixed a backend stack overflow that could degrade FileNet access and trigger 504 Gateway Timeout errors until browser 
cache/session refresh.  
Related issues: [AR-17648](https://arondor.atlassian.net/browse/AR-17648), 
[TMAPR-6333](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6333)

**Improved Office-based conversion compatibility**  
Fixed an issue where RTF documents failed to open when using Microsoft Office for conversion (while working with 
LibreOffice).  
Related issues: [AR-16735](https://arondor.atlassian.net/browse/AR-16735), 
[TMAPR-5869](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5869), 
[TMAPR-6024](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6024), 
[TMAPR-5659](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5659), 
[TMAPR-5895](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5895)

**More efficient image-to-PDF conversion**  
Introduced a dedicated conversion factory for JPEG/PNG using PDFBox to better control output size and avoid oversized 
PDFs.  
Related issues: [AR-17802](https://arondor.atlassian.net/browse/AR-17802), 
[TMAPR-6484](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6484)

## Changelog

| Summary                                                                                              | Issue Type | Key                                                       | Linked Issues                                                                                                                                                                |
|------------------------------------------------------------------------------------------------------|------------|-----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| StackOverflowError dans ServletConfigurationService provoquant des erreurs 504 Gateway Timeout       | Issue      | [AR-17648](https://arondor.atlassian.net/browse/AR-17648) | [TMAPR-6333](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6333) |
| OAuth2ObjectStoreProvider: Do not create OAuth2 tokens for each call                                 | Dev W/O UX | [AR-17680](https://arondor.atlassian.net/browse/AR-17680) |  |
| File size 2.5 bigger after converting                                                                | Issue      | [AR-17802](https://arondor.atlassian.net/browse/AR-17802) | [TMAPR-6484](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6484) |
| RTF files do not open using Microsoft Office for conversion                                          | Regression | [AR-16735](https://arondor.atlassian.net/browse/AR-16735) | [TMAPR-5869](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5869), [TMAPR-6024](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6024), [TMAPR-5659](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5659), [TMAPR-5895](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5895) |
| When viewing images in Arender in tile mode without compare, it brings up differences at the bottom. | Issue      | [AR-17885](https://arondor.atlassian.net/browse/AR-17885) | [TMAFLW-1126](https://arondor.atlassian.net/browse/TMAFLW-1126) |
| Incorrect date in email - fix in 2023                                                                | Issue      | [AR-17896](https://arondor.atlassian.net/browse/AR-17896) | [AR-17346](https://arondor.atlassian.net/browse/AR-17346), [AR-18089](https://arondor.atlassian.net/browse/AR-18089), [TMAPR-6129](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6129) |
| Rework ARender shortcuts                                                                             | Issue      | [AR-18027](https://arondor.atlassian.net/browse/AR-18027) | [AR-14973](https://arondor.atlassian.net/browse/AR-14973), [TMAPR-6622](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6622) |
| Add configuration for the default Thai character set                                                 | Dev W/O UX | [AR-18039](https://arondor.atlassian.net/browse/AR-18039) | [AR-18062](https://arondor.atlassian.net/browse/AR-18062), [AR-18056](https://arondor.atlassian.net/browse/AR-18056) |
| Nombreux appels lors de la récupération des vignettes pendant le scroll                              | Issue      | [AR-18053](https://arondor.atlassian.net/browse/AR-18053) | [TMAPR-6588](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6588) |
| Opacity value is not modified                                                                        | Issue      | [AR-16426](https://arondor.atlassian.net/browse/AR-16426) | [AR-17382](https://arondor.atlassian.net/browse/AR-17382) |
| Video documents does not show correct loading time in ARender                                        | Issue      | [AR-17046](https://arondor.atlassian.net/browse/AR-17046) | [TMAPR-5865](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5865) |
| The title of the second document is not present in the annotation browser                            | Issue      | [AR-17243](https://arondor.atlassian.net/browse/AR-17243) | [TMAPR-6097](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6097) |
| Spelling errors for the word "highlighttext" in the documentation                                    | Issue      | [AR-17342](https://arondor.atlassian.net/browse/AR-17342) | [TMAPR-6111](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6111) |
| Configuration Option to Hide Formatting Options for Hyperlinks                                       | Dev W/O UX | [AR-17467](https://arondor.atlassian.net/browse/AR-17467) | [TMAPR-6200](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6200) |
| Configuring properties using a file internal to a custom connector                                   | Issue      | [AR-17881](https://arondor.atlassian.net/browse/AR-17881) |  |
| SVG document does not open as an image                                                               | Dev W/O UX | [AR-12526](https://arondor.atlassian.net/browse/AR-12526) | [TMAPR-4799](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-4799), [TMAPR-5831](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5831) |
| Spelling errors in toolbar tooltips and menu (English version)                                       | Issue      | [AR-13085](https://arondor.atlassian.net/browse/AR-13085) | [TMAPR-4573](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-4573) |
| The image in the body of an email is treated as an attachment                                        | Issue      | [AR-16685](https://arondor.atlassian.net/browse/AR-16685) | [TMAPR-5597](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5597) |
| The header message in the document version comparison window in Alfresco Share is incorrect          | Issue      | [AR-16871](https://arondor.atlassian.net/browse/AR-16871) | [TMAPR-5708](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5708) |
| Inconsistent availability of crop box annotation                                                     | Issue      | [AR-17214](https://arondor.atlassian.net/browse/AR-17214) | [TMAPR-6068](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6068) |
| Click multiple times on the stamp button open multiple stamp menu                                    | Issue      | [AR-17473](https://arondor.atlassian.net/browse/AR-17473) | [TMAPR-6162](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6162) |
| Expand/Collpase button should not be shown in hyperlink browser                                      | Issue      | [AR-17745](https://arondor.atlassian.net/browse/AR-17745) | [TMAPR-6449](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6449) |

## Download

| Description                                                       | Binary                                                                                                                                                                                                | SHA-256                                                                                                                                                                                                     |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ARender Rendition Server installer                                | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.17.0/rendition-engine-installer-2023.17.0-rendition.jar)  | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.17.0/rendition-engine-installer-2023.17.0-rendition.jar.sha256)  |
| ARender WEB-UI - Spring Boot Application - Standalone             | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.17.0/arondor-arender-hmi-spring-boot-package-2023.17.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.17.0/arondor-arender-hmi-spring-boot-package-2023.17.0.zip.sha256) |
| ARender HMI - J2EE EAR Application - FileNet 5.x                  | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.17.0/arondor-arender-hmi-filenet-ear-2023.17.0.ear)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.17.0/arondor-arender-hmi-filenet-ear-2023.17.0.ear.sha256)                 |
| ARender HMI - J2EE WAR Application - Content Manager 8.1          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.17.0/arondor-arender-hmi-cm-2023.17.0.war)                                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.17.0/arondor-arender-hmi-cm-2023.17.0.war.sha256)                                   |
| ARender plugins : IBM Content Navigator plugin                    | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.17.0/arondor-arender-navigator-plugin-2023.17.0.jar)               | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.17.0/arondor-arender-navigator-plugin-2023.17.0.jar.sha256)               |
| ARender plugins : Alfresco Share plugin                           | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.17.0/arender-for-alfresco-share-plugin-2023.17.0.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.17.0/arender-for-alfresco-share-plugin-2023.17.0.jar.sha256)             |
| ARender plugins : Alfresco ADF plugin base for integration in ADF | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.17.0/arender-for-alfresco-ADF-plugin-2023.17.0.zip)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.17.0/arender-for-alfresco-ADF-plugin-2023.17.0.zip.sha256)                 |
| ARender API : Client API                                          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.17.0/arondor-arender-client-api-2023.17.0-javadoc.jar)                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.17.0/arondor-arender-client-api-2023.17.0-javadoc.jar.sha256)                   |
| ARender API : Rendition API                                       | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.17.0/arondor-arender-rendition-api-2023.17.0-javadoc.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.17.0/arondor-arender-rendition-api-2023.17.0-javadoc.jar.sha256)             |
