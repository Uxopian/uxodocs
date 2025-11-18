---
title: ARender v2023.14.0 – Release Notes
description: Minor release with fixes for text and PDF rendering issues, hyperlink behavior, digital signature display,
date: "2025-09-30"
---

> **Upgrade note:** See [v2023.14.0](./upgrade-notes) for detailed instructions.

## Overview

ARender 2023.14.0 is a minor release that includes multiple fixes across text rendering, hyperlink interactions, digital
signatures, and platform stability. This version also includes security upgrades and RHEL8 offline 
installation improvements.

## Prerequisites

| Component | Supported versions |
| --------- | ------------------ |
| OpenJDK   | 8 or 11            |

## User Perspective

**Correct MIME Type Detection for .txt Files**  
ARender now correctly detects certain .txt files as text instead of email, ensuring proper rendering. (AR-16678)

**Improved Digital Signature Support**  
PDF signature data is correctly displayed when using configured root certificates. (AR-17212)

**PDF Size Optimization for TIFF Conversion**  
Generated PDFs now retain a reasonable size when converting TIFF to JPEG and downloading the result. (AR-17326)

**Fix Inverted Hyperlink Style Overlap**  
Inverted-style hyperlink highlights no longer cause visual overlap issues when PDFOwl is active. (AR-17469)

**DocLink Panel Properly Closes**  
When disabling hyperlink mode or using the ESC key, the right document panel is properly closed. (AR-17486)

**Correct Titles in Hyperlink Browser**  
Hyperlink targets now display correct document titles in the hyperlink browser. (AR-17640)

**Special Character Fix in HTML Documents**  
Special characters in .html files now render properly. (AR-17805)

## Developer / Integrator Perspective

**Token Expiry Handling**  
ARender now correctly redirects users to the login page if their refresh token has expired, avoiding HTTP 500 errors. 
(AR-17769)

**Improved Offline Installation for RHEL8**  
Rendition installation now completes successfully in RHEL8 environments without internet access. (AR-17782)

**Spring Boot Security Upgrade**  
Spring upgraded to 2.7.18 and Spring Boot to 2.7.29 to address recent security CVEs. (AR-17841, AR-17851)


## Exploitation Perspective

*No operational-specific changes in this version.*

## Changelog

| Summary                                             | Type  | Internal ticket                                           | Linked Issues                                                                         |
|-----------------------------------------------------|-------|-----------------------------------------------------------|---------------------------------------------------------------------------------------|
| .txt files misdetected as email                     | Issue | [AR-16678](https://arondor.atlassian.net/browse/AR-16678) | [TMAPR-5550](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5550) |
| Digital signature not shown properly                | Issue | [AR-17212](https://arondor.atlassian.net/browse/AR-17212) | [TMAPR-6064](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6064) |
| PDF too large after TIFF to JPEG conversion         | Issue | [AR-17326](https://arondor.atlassian.net/browse/AR-17326) | [TMAPR-6108](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6108) |
| Inverted hyperlink style causes overlap with PDFOwl | Issue | [AR-17469](https://arondor.atlassian.net/browse/AR-17469) |                                                                                       |
| Right doc not closed when disabling DocLink         | Issue | [AR-17486](https://arondor.atlassian.net/browse/AR-17486) | [TMAPR-6235](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6235) |
| Hyperlink browser shows wrong document title        | Issue | [AR-17640](https://arondor.atlassian.net/browse/AR-17640) | [TMAPR-6327](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6327) |
| Refresh token expiry does not redirect              | Issue | [AR-17769](https://arondor.atlassian.net/browse/AR-17769) | [TMAPR-6401](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6401) |
| RHEL8 offline installation fails                    | Issue | [AR-17782](https://arondor.atlassian.net/browse/AR-17782) |                                                                                       |
| Special character issue in .html files              | Issue | [AR-17805](https://arondor.atlassian.net/browse/AR-17805) | [TMAPR-6474](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6474) |
| Upgrade Spring Boot for security                    | Issue | [AR-17841](https://arondor.atlassian.net/browse/AR-17841) |                                                                                       |
| Upgrade Spring Boot for additional CVEs             | Issue | [AR-17851](https://arondor.atlassian.net/browse/AR-17851) |                                                                                       |

## Download

| Description                                                       | Binary                                                                                                                                                                                                | SHA-256                                                                                                                                                                                                     |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ARender Rendition Server installer                                | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.14.0/rendition-engine-installer-2023.14.0-rendition.jar)  | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.14.0/rendition-engine-installer-2023.14.0-rendition.jar.sha256)  |
| ARender WEB-UI - Spring Boot Application - Standalone             | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.14.0/arondor-arender-hmi-spring-boot-package-2023.14.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.14.0/arondor-arender-hmi-spring-boot-package-2023.14.0.zip.sha256) |
| ARender HMI - J2EE EAR Application - FileNet 5.x                  | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.14.0/arondor-arender-hmi-filenet-ear-2023.14.0.ear)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.14.0/arondor-arender-hmi-filenet-ear-2023.14.0.ear.sha256)                 |
| ARender HMI - J2EE WAR Application - Content Manager 8.1          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.14.0/arondor-arender-hmi-cm-2023.14.0.war)                                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.14.0/arondor-arender-hmi-cm-2023.14.0.war.sha256)                                   |
| ARender plugins : IBM Content Navigator plugin                    | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.14.0/arondor-arender-navigator-plugin-2023.14.0.jar)               | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.14.0/arondor-arender-navigator-plugin-2023.14.0.jar.sha256)               |
| ARender plugins : Alfresco Share plugin                           | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.14.0/arender-for-alfresco-share-plugin-2023.14.0.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.14.0/arender-for-alfresco-share-plugin-2023.14.0.jar.sha256)             |
| ARender plugins : Alfresco ADF plugin base for integration in ADF | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.14.0/arender-for-alfresco-ADF-plugin-2023.14.0.zip)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.14.0/arender-for-alfresco-ADF-plugin-2023.14.0.zip.sha256)                 |
| ARender API : Client API                                          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.14.0/arondor-arender-client-api-2023.14.0-javadoc.jar)                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.14.0/arondor-arender-client-api-2023.14.0-javadoc.jar.sha256)                   |
| ARender API : Rendition API                                       | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.14.0/arondor-arender-rendition-api-2023.14.0-javadoc.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.14.0/arondor-arender-rendition-api-2023.14.0-javadoc.jar.sha256)             |
