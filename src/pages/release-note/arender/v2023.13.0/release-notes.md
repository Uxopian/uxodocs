---
title: ARender v2023.13.0 – Release Notes
description: Minor release including fix for wrong text selection coordinates and new JVM options for session affinity
date: "2025-08-29"
---

> **Upgrade note:** See [v2023.13.0](./upgrade-notes) for detailed instructions.

## Overview

ARender 2023.13.0 is a minor release that includes a fix for incorrect text position detection when selecting text, and 
adds new JVM options to support session affinity (sticky sessions) for clustered deployments in WebSphere ND 
environments.

## Prerequisites

| Component | Supported versions |
| --------- | ------------------ |
| OpenJDK   | 8 or 11            |

## User Perspective

**Correct Text Selection Coordinates**  
Text selection now correctly aligns with the actual visible content, even on problematic PDFs. *(AR-17426)*

## Developer / Integrator Perspective

**Session Affinity for WebSphere ND**  
New JVM options are now available to configure the routing identifier used for session affinity when deploying ARender
HMI in a WebSphere cluster environment. *(AR-17638)*

## Exploitation Perspective

*No operational-specific changes in this version.*

## Changelog

| Summary                                   | Issue Type  | Key      | Linked Issues |
|-------------------------------------------| ----------- | -------- |---------------|
| Incorrect text selection position         | Issue       | AR-17426 | TMAPR-6178    |
| JVM options for session affinity (WAS ND) | Issue       | AR-17638 |               |

## Download

| Description | Binary | SHA-256 |
|-------------|--------|---------|
| ARender Rendition Server installer | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.13.0/rendition-engine-installer-2023.13.0-rendition.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.13.0/rendition-engine-installer-2023.13.0-rendition.jar.sha256) |
| ARender WEB-UI - Spring Boot Application - Standalone | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.13.0/arondor-arender-hmi-spring-boot-package-2023.13.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.13.0/arondor-arender-hmi-spring-boot-package-2023.13.0.zip.sha256) |
| ARender HMI - J2EE EAR Application - FileNet 5.x | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.13.0/arondor-arender-hmi-filenet-ear-2023.13.0.ear) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.13.0/arondor-arender-hmi-filenet-ear-2023.13.0.ear.sha256) |
| ARender HMI - J2EE WAR Application - Content Manager 8.1 | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.13.0/arondor-arender-hmi-cm-2023.13.0.war) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.13.0/arondor-arender-hmi-cm-2023.13.0.war.sha256) |
| ARender plugins : IBM Content Navigator plugin | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.13.0/arondor-arender-navigator-plugin-2023.13.0.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.13.0/arondor-arender-navigator-plugin-2023.13.0.jar.sha256) |
| ARender plugins : Alfresco Share plugin | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.13.0/arender-for-alfresco-share-plugin-2023.13.0.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.13.0/arender-for-alfresco-share-plugin-2023.13.0.jar.sha256) |
| ARender plugins : Alfresco ADF plugin base for integration in ADF | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.13.0/arender-for-alfresco-ADF-plugin-2023.13.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.13.0/arender-for-alfresco-ADF-plugin-2023.13.0.zip.sha256) |
| ARender API : Client API | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.13.0/arondor-arender-client-api-2023.13.0-javadoc.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.13.0/arondor-arender-client-api-2023.13.0-javadoc.jar.sha256) |
| ARender API : Rendition API | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.13.0/arondor-arender-rendition-api-2023.13.0-javadoc.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.13.0/arondor-arender-rendition-api-2023.13.0-javadoc.jar.sha256) |
