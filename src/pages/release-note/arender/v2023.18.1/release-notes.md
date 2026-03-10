---
title: "ARender v2023.18.1 – Release Notes"
draft: false
date: "2026-03-10"
weight: -2023181
aliases:
  - /release/2023.18.1/
description: "Patch release with two annotation fixes: arrow annotation comments not saved, and ghost broken-image icon on arrow creation."
_build:
  list: never
---

> **Upgrade note:** See [v2023.18.1](../upgrade-notes) for detailed instructions.

## Overview

ARender 2023.18.1 is a **patch release** on top of v2023.18.0 that addresses two annotation-related issues: comments associated with arrow annotations were not being saved, and a ghost broken-image icon appeared during arrow annotation creation.

## Prerequisites

| Component | Supported versions |
|-----------|--------------------|
| OpenJDK   | 8 or 11            |

## User Perspective

**Arrow annotation comments now saved correctly**
Fixed a regression where comments associated with arrow annotations were silently lost when saving. An internal method (`clearDistance`) was incorrectly clearing comment data during the annotation save process.
Related issues: [AR-18121](https://arondor.atlassian.net/browse/AR-18121)

**No more ghost broken-image icon on arrow creation**
Creating an arrow annotation no longer displays a brief ghost broken-image icon. The placeholder widget is now hidden by default, eliminating the visual artifact.
Related issues: [AR-18205](https://arondor.atlassian.net/browse/AR-18205)

## Changelog

| Summary                                                        | Issue Type | Key                                                       | Linked Issues |
|----------------------------------------------------------------|------------|------------------------------------------------------------|---------------|
| Comments associated with arrow annotation not saved            | Issue      | [AR-18121](https://arondor.atlassian.net/browse/AR-18121) | [TMAPR-6698](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6698) |
| Ghost broken-image icon on arrow annotation creation           | Evolution  | [AR-18205](https://arondor.atlassian.net/browse/AR-18205) | |

## Download

| Description                                                       | Binary                                                                                                                                                                                                  | SHA-256                                                                                                                                                                                                       |
|-------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ARender Rendition Server installer                                | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.18.1/rendition-engine-installer-2023.18.1-rendition.jar)    | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.18.1/rendition-engine-installer-2023.18.1-rendition.jar.sha256)    |
| ARender WEB-UI - Spring Boot Application - Standalone             | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.18.1/arondor-arender-hmi-spring-boot-package-2023.18.1.zip)   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.18.1/arondor-arender-hmi-spring-boot-package-2023.18.1.zip.sha256)   |
| ARender HMI - J2EE EAR Application - FileNet 5.x                  | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.18.1/arondor-arender-hmi-filenet-ear-2023.18.1.ear)                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.18.1/arondor-arender-hmi-filenet-ear-2023.18.1.ear.sha256)                   |
| ARender HMI - J2EE WAR Application - Content Manager 8.1          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.18.1/arondor-arender-hmi-cm-2023.18.1.war)                                     | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.18.1/arondor-arender-hmi-cm-2023.18.1.war.sha256)                                     |
| ARender plugins : IBM Content Navigator plugin                    | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.18.1/arondor-arender-navigator-plugin-2023.18.1.jar)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.18.1/arondor-arender-navigator-plugin-2023.18.1.jar.sha256)                 |
| ARender plugins : Alfresco Share plugin                           | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.18.1/arender-for-alfresco-share-plugin-2023.18.1.jar)               | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.18.1/arender-for-alfresco-share-plugin-2023.18.1.jar.sha256)               |
| ARender plugins : Alfresco ADF plugin base for integration in ADF | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.18.1/arender-for-alfresco-ADF-plugin-2023.18.1.zip)                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.18.1/arender-for-alfresco-ADF-plugin-2023.18.1.zip.sha256)                   |
| ARender API : Client API                                          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.18.1/arondor-arender-client-api-2023.18.1-javadoc.jar)                     | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.18.1/arondor-arender-client-api-2023.18.1-javadoc.jar.sha256)                     |
| ARender API : Rendition API                                       | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.18.1/arondor-arender-rendition-api-2023.18.1-javadoc.jar)               | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.18.1/arondor-arender-rendition-api-2023.18.1-javadoc.jar.sha256)               |