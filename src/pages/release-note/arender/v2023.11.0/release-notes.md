---
title: ARender v2023.11.0 – Release Notes
description: Minor release improving signed-PDF rendering, long Base64 URL handling, PDF/A printing and hyperlink accuracy.
date: "2025-06-27"
---

> **Upgrade note:** See [v2023.11.0](../upgrade-notes) for detailed instructions.

## Overview

ARender 2023.11.0 is a minor release that strengthens support for document rendering accuracy, especially for signed and long URL-encoded documents. It also improves PDF/A printing, hyperlink visual consistency, and fixes navigation regressions in named destinations.

## Prerequisites

| Component | Supported versions |
| --------- | ------------------ |
| OpenJDK   | 8 or 11            |

## User Perspective

📄 **Fix for Layout Extraction in Signed PDFs**  
Improve signed document layout rendering when PDFOwl is used. _(AR-17644)_

🌐 **Support for Special Characters in Base64 URLs**  
Long document URLs containing special characters (like `+`, `~`) are now correctly encoded and handled. _(AR-17394)_

🔗 **Hyperlink Highlight Rendering Fix**  
Inverted-style hyperlinks now visually align text properly—the blue overlay precisely follows the black base text. _(AR-17491)_

🖨️ **PDF/A Documents No Longer Blocked in Print**  
PDF/A files are now printable without restriction via ARender. _(AR-17494)_

📍 **Fix for Named Destination Hyperlinks**  
Clicking a link to a named destination now works reliably, even on subsequent clicks. _(AR-17623)_

## Developer / Integrator Perspective

_No developer/integrator-specific changes in this version._

## Exploitation Perspective

_No operational-specific changes in this version._

## Changelog

| Summary                                       | Issue Type | Key      | Linked Issues |
| --------------------------------------------- | ---------- | -------- | ------------- |
| Layout extraction fails for signed documents  | Issue      | AR-17644 | TMAPR-6313    |
| Encoding issue in long Base64 document URLs   | Issue      | AR-17394 | TMAPR-6088    |
| Misaligned inverted-style hyperlink text      | Issue      | AR-17491 | TMAPR-6248    |
| PDF/A documents blocked from printing         | Issue      | AR-17494 | TMAPR-6222    |
| Navigation issue with named destination links | Regression | AR-17623 | TMAPR-6309    |

## Download

| Description                                                       | Binary                                                                                                                                                                                                | SHA-256                                                                                                                                                                                                     |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ARender Rendition Server installer                                | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.11.0/rendition-engine-installer-2023.11.0-rendition.jar)  | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.11.0/rendition-engine-installer-2023.11.0-rendition.jar.sha256)  |
| ARender WEB-UI - Spring Boot Application - Standalone             | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.11.0/arondor-arender-hmi-spring-boot-package-2023.11.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.11.0/arondor-arender-hmi-spring-boot-package-2023.11.0.zip.sha256) |
| ARender HMI - J2EE EAR Application - FileNet 5.x                  | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.11.0/arondor-arender-hmi-filenet-ear-2023.11.0.ear)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.11.0/arondor-arender-hmi-filenet-ear-2023.11.0.ear.sha256)                 |
| ARender HMI - J2EE WAR Application - Content Manager 8.1          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.11.0/arondor-arender-hmi-cm-2023.11.0.war)                                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.11.0/arondor-arender-hmi-cm-2023.11.0.war.sha256)                                   |
| ARender plugins : IBM Content Navigator plugin                    | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.11.0/arondor-arender-navigator-plugin-2023.11.0.jar)               | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.11.0/arondor-arender-navigator-plugin-2023.11.0.jar.sha256)               |
| ARender plugins : Alfresco Share plugin                           | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.11.0/arender-for-alfresco-share-plugin-2023.11.0.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.11.0/arender-for-alfresco-share-plugin-2023.11.0.jar.sha256)             |
| ARender plugins : Alfresco ADF plugin base for integration in ADF | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.11.0/arender-for-alfresco-ADF-plugin-2023.11.0.zip)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.11.0/arender-for-alfresco-ADF-plugin-2023.11.0.zip.sha256)                 |
| ARender API : Client API                                          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.11.0/arondor-arender-client-api-2023.11.0-javadoc.jar)                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.11.0/arondor-arender-client-api-2023.11.0-javadoc.jar.sha256)                   |
| ARender API : Rendition API                                       | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.11.0/arondor-arender-rendition-api-2023.11.0-javadoc.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.11.0/arondor-arender-rendition-api-2023.11.0-javadoc.jar.sha256)             |
