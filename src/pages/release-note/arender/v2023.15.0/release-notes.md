---
title: ARender v2023.15.0 – Release Notes
description: Minor release introducing major stability fixes, enhancements to hyperlink creation, and important
date: "2025-10-31"
---

> **Upgrade note:** See [v2023.15.0](./upgrade-notes) for detailed instructions.

## Overview

ARender 2023.15.0 is a minor version that introduces: critical stability fixes, additional configuration options for
clustering and load distribution, security upgrades, and a new feature to create hyperlinks from
rectangular zones.

⚠️ **This release is strongly recommended for all production environments**, as it resolves major issues that could lead to
blocked sessions or rendering failures.

## Prerequisites

| Component | Supported versions |
| --------- | ------------------ |
| OpenJDK   | 8 or 11            |

## User Perspective

**Hyperlink creation from zones**  
Users can now create hyperlinks not only from selected text but also from any rectangular zone, allowing linking over
signatures, images, or blank areas. (AR-17701)

To avoid any disrupion in the user interface, this feature is disabled by default, more information see the property
**topPanel.docLink.enableZoneSelection** described in the documentation
[here](/features/hyperlink#document-linking).
![Create hyperlink from zone](pathname:///img/arender/annotations/ZonaldocLink.gif)

## Developer / Integrator Perspective

**Load balancing – Round Robin support**  
New configuration option added to the weather polling strategy to allow round-robin distribution of load across multiple
Rendition nodes. (AR-17736)

- See the related documentation [here](/guides/configurations/web-ui/server/rendition-host#rendition-load-document-balancing).

**Mixpanel instrumentation improvements**  
ARender now tracks detailed analytics like Time to First View, Viewing Duration, and Page Count across document open/close events. (AR-17787)

- See the related documentation [here](/learn/product-analytics/_index).

**Docker packaging fixes**  
Missing connectors in Alfresco/FileNet images have been resolved. (AR-17825)

## Exploitation Perspective

**Critical stability fixes:**

- Resolved an issue where connections remained blocked when HTTP errors occurs between HMI and Rendition. (AR-17845)
- Fixed CR/LF characters in document titles causing error 400 in logs. (AR-17842)
- Avoid unnecessary calls when Micrometer is disabled. (AR-17844)

## Changelog

| Summary                                                                            | Type        | Internal ticket                                           | Linked Issues                                                                                                                                                                |
| ---------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Spring updated to 2.7.18 / Boot 2.7.30                                             | Security    | [AR-17890](https://arondor.atlassian.net/browse/AR-17890) |                                                                                                                                                                              |
| Hyperlink creation from rectangular zones                                          | New Feature | [AR-17701](https://arondor.atlassian.net/browse/AR-17701) | [TMAPR-6326](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6326)                                                                                        |
| Connector JARs missing from Docker (Alfresco/FileNet)                              | Regression  | [AR-17825](https://arondor.atlassian.net/browse/AR-17825) |                                                                                                                                                                              |
| TIFF not rendered                                                                  | Issue       | [AR-17108](https://arondor.atlassian.net/browse/AR-17108) | [TMAPR-5924](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5924)                                                                                        |
| Import/download buttons not hidden correctly                                       | Issue       | [AR-17152](https://arondor.atlassian.net/browse/AR-17152) | [TMAPR-6108](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6108)                                                                                        |
| XLSX rendering timeout                                                             | Issue       | [AR-17484](https://arondor.atlassian.net/browse/AR-17484) | [TMAPR-6230](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6230)                                                                                        |
| Rendering issue with email/zip + watermark                                         | Issue       | [AR-17488](https://arondor.atlassian.net/browse/AR-17488) | [TMAPR-6236](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6236)                                                                                        |
| Load distribution strategy: Round Robin                                            | Issue       | [AR-17736](https://arondor.atlassian.net/browse/AR-17736) |                                                                                                                                                                              |
| CCR/LF in doc titles → error 400 Issue                                             | Issue       | [AR-17842](https://arondor.atlassian.net/browse/AR-17842) | [TMAPR-6482](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6482), [TMAPR-6505](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6505) |
| Avoid unnecessary micrometer calls                                                 | Issue       | [AR-17844](https://arondor.atlassian.net/browse/AR-17844) |                                                                                                                                                                              |
| Connections blocked if error on document                                           | Issue       | [AR-17845](https://arondor.atlassian.net/browse/AR-17845) | [TMAPR-6482](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6482), [TMAPR-6576](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6576) |
| Fix InvalidPathException for trailing spaces in doc titles                         | Issue       | [AR-17848](https://arondor.atlassian.net/browse/AR-17848) | [TMAPR-6483](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6483)                                                                                        |
| Analytics - Time for 1st page to be displayed, nb of page viewed, viewing duration | Evolution   | [AR-17787](https://arondor.atlassian.net/browse/AR-17787) |                                                                                                                                                                              |

## Download

| Description                                                       | Binary                                                                                                                                                                                                | SHA-256                                                                                                                                                                                                     |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ARender Rendition Server installer                                | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.15.0/rendition-engine-installer-2023.15.0-rendition.jar)  | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.15.0/rendition-engine-installer-2023.15.0-rendition.jar.sha256)  |
| ARender WEB-UI - Spring Boot Application - Standalone             | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.15.0/arondor-arender-hmi-spring-boot-package-2023.15.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.15.0/arondor-arender-hmi-spring-boot-package-2023.15.0.zip.sha256) |
| ARender HMI - J2EE EAR Application - FileNet 5.x                  | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.15.0/arondor-arender-hmi-filenet-ear-2023.15.0.ear)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.15.0/arondor-arender-hmi-filenet-ear-2023.15.0.ear.sha256)                 |
| ARender HMI - J2EE WAR Application - Content Manager 8.1          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.15.0/arondor-arender-hmi-cm-2023.15.0.war)                                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.15.0/arondor-arender-hmi-cm-2023.15.0.war.sha256)                                   |
| ARender plugins : IBM Content Navigator plugin                    | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.15.0/arondor-arender-navigator-plugin-2023.15.0.jar)               | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.15.0/arondor-arender-navigator-plugin-2023.15.0.jar.sha256)               |
| ARender plugins : Alfresco Share plugin                           | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.15.0/arender-for-alfresco-share-plugin-2023.15.0.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.15.0/arender-for-alfresco-share-plugin-2023.15.0.jar.sha256)             |
| ARender plugins : Alfresco ADF plugin base for integration in ADF | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.15.0/arender-for-alfresco-ADF-plugin-2023.15.0.zip)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.15.0/arender-for-alfresco-ADF-plugin-2023.15.0.zip.sha256)                 |
| ARender API : Client API                                          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.15.0/arondor-arender-client-api-2023.15.0-javadoc.jar)                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.15.0/arondor-arender-client-api-2023.15.0-javadoc.jar.sha256)                   |
| ARender API : Rendition API                                       | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.15.0/arondor-arender-rendition-api-2023.15.0-javadoc.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.15.0/arondor-arender-rendition-api-2023.15.0-javadoc.jar.sha256)             |
