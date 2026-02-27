---
title: ARender v2023.16.0 – Release Notes
description: Minor release with security patches, Spring upgrades, better email image handling and critical stability improvements.
date: "2025-12-02"
---

> **Upgrade note:** See [v2023.16.0](../upgrade-notes) for detailed instructions.

## Overview

ARender 2023.16.0 is a minor release that includes important **security patches**, **stability improvements**, and 
**Spring Boot upgrades**. It also introduces improvements in image handling for email-to-PDF rendering.

> ⚠️ We strongly recommend upgrading to this version, as it resolves several critical issues that have impacted 
> production environments — including blocked connections, broken PDF/A saves, and a cross-site scripting (XSS) 
> vulnerability.

## Prerequisites

| Component | Supported versions |
|-----------|--------------------|
| OpenJDK   | 8 or 11            |

## Security

**Secure Endpoint**  
A vulnerability was found in an endpoint. This has now been fully fixed.  
Related request: [TMAPR-6536](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6536)

**Spring Boot Upgrade**  
An upgrade was made to version **2.7.32 of Spring Boot** libraries to maintain long-term security and stability.

## User Perspective

**Better Email-to-PDF Rendering with Heavy Images**  
Large embedded images (e.g., pasted photos) in emails are now optionnaly resized and compressed to prevent rendering 
errors and memory crashes.  
Related request: [TMAPR-6507](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6507)

**Support for DirectOffice Patch to Prevent Collapsed PDFs**  
A Windows/Linux patch has been integrated to avoid errors when rendering some DOCX files via DirectOffice.  
Related request: [TMAPR-6525](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6525)

**Improved PDF/A Save After Merge/Cut**  
Fixes a bug when saving a PDF/A document after using merge or cut actions.  
Related requests:  
[TMAPR-6570](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6570)  
[TMAPR-6454](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6454)

**Improved Web-UI Documentation**  
The default Hazelcast configuration file path is now clearly documented.
More information in the following link:
[Configuration](/installation/standalone/web-ui/configuration/#configure-cache-sharing-between-arender-web-uis)

## Developer / Integrator Perspective

**Security Code Modularization**  
Security logic has been refactored into a separate module to simplify reuse in other integrations.  
Related request: [TMAPR-6498](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6498)

**Use of Non-Deprecated WebClient Methods**  
Internal HTTP clients have been updated to avoid deprecated methods that could cause connection issues in some 
environments.  
Related requests:  
[TMAPR-6612](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6612)  
[TMAPR-6587](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6587)

**Resilience in Cancelled Requests**  
Improved handling to avoid blocked connections when a user cancels a document stream mid-way.  
Related request: [TMAPR-6612](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6612)

## Exploitation Perspective

No operational-specific changes in this version.

## Changelog

| Summary                                             | Type       | Internal ticket                                           | Linked Issues                                                                                                                                                                |
|-----------------------------------------------------|------------|-----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Secure PrintServlet endpoint                        | Issue      | [AR-17846](https://arondor.atlassian.net/browse/AR-17846) | [TMAPR-6536](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6536)                                                                                        |
| Modularize security code into new module            | Issue      | [AR-17933](https://arondor.atlassian.net/browse/AR-17933) | [TMAPR-6498](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6498)                                                                                        |
| Compress large inline images in email PDF rendering | Issue      | [AR-17879](https://arondor.atlassian.net/browse/AR-17879) | [TMAPR-6507](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6507)                                                                                        |
| Fix PDF/A save error after merge/cut                | Regression | [AR-17882](https://arondor.atlassian.net/browse/AR-17882) | [TMAPR-6570](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6570), [TMAPR-6454](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6454) |
| Avoid deprecated WebClient exchange() method        | Issue      | [AR-17931](https://arondor.atlassian.net/browse/AR-17931) | [TMAPR-6612](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6612), [TMAPR-6587](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6587) |
| Document Hazelcast config location in UI docs       | Issue      | [AR-17347](https://arondor.atlassian.net/browse/AR-17347) | [TMAPR-6064](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6064)                                                                                        |
| Integrate DirectOffice patch to fix collapsed PDFs  | Issue      | [AR-17932](https://arondor.atlassian.net/browse/AR-17932) | [TMAPR-6525](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6525)                                                                                        |
| Improve connection cleanup for streaming methods    | Issue      | [AR-17948](https://arondor.atlassian.net/browse/AR-17948) | [TMAPR-6612](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6612)                                                                                        |
| Upgrade Spring to 2.7.32                            | Evolution  | [AR-17961](https://arondor.atlassian.net/browse/AR-17961) | —                                                                                                                                                                            |

## Download

| Description                                                       | Binary                                                                                                                                                                                                | SHA-256                                                                                                                                                                                                     |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ARender Rendition Server installer                                | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.16.0/rendition-engine-installer-2023.16.0-rendition.jar)  | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.16.0/rendition-engine-installer-2023.16.0-rendition.jar.sha256)  |
| ARender WEB-UI - Spring Boot Application - Standalone             | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.16.0/arondor-arender-hmi-spring-boot-package-2023.16.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.16.0/arondor-arender-hmi-spring-boot-package-2023.16.0.zip.sha256) |
| ARender HMI - J2EE EAR Application - FileNet 5.x                  | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.16.0/arondor-arender-hmi-filenet-ear-2023.16.0.ear)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.16.0/arondor-arender-hmi-filenet-ear-2023.16.0.ear.sha256)                 |
| ARender HMI - J2EE WAR Application - Content Manager 8.1          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.16.0/arondor-arender-hmi-cm-2023.16.0.war)                                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.16.0/arondor-arender-hmi-cm-2023.16.0.war.sha256)                                   |
| ARender plugins : IBM Content Navigator plugin                    | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.16.0/arondor-arender-navigator-plugin-2023.16.0.jar)               | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.16.0/arondor-arender-navigator-plugin-2023.16.0.jar.sha256)               |
| ARender plugins : Alfresco Share plugin                           | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.16.0/arender-for-alfresco-share-plugin-2023.16.0.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.16.0/arender-for-alfresco-share-plugin-2023.16.0.jar.sha256)             |
| ARender plugins : Alfresco ADF plugin base for integration in ADF | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.16.0/arender-for-alfresco-ADF-plugin-2023.16.0.zip)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.16.0/arender-for-alfresco-ADF-plugin-2023.16.0.zip.sha256)                 |
| ARender API : Client API                                          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.16.0/arondor-arender-client-api-2023.16.0-javadoc.jar)                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.16.0/arondor-arender-client-api-2023.16.0-javadoc.jar.sha256)                   |
| ARender API : Rendition API                                       | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.16.0/arondor-arender-rendition-api-2023.16.0-javadoc.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.16.0/arondor-arender-rendition-api-2023.16.0-javadoc.jar.sha256)             |