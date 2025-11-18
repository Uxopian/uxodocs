---
title: ARender v2023.6.1 – Release Notes
description: Minor release including new distribution strategies of documents to renditions, disk space based query acceptance, fixing issue with encrypted perishable docuument id not reversible anb issue with multiple rendition configuration.
date: "2025-08-06"
---

> **Upgrade note:** See [v2023.6.1](./upgrade-notes) for detailed instructions.

## Overview

ARender 2023.6.1 est une version mineure qui augmente la résilience de la rendition empêchant le chargement de documents qui peuvent faire saturer l'espace disque. Elle ajoute aussi de nouvelles stratégies de distribution de documents vers les différentes renditions configurées et inclut également divers corrections.

## Prerequisites

| Component | Supported versions |
| --------- | ------------------ |
| OpenJDK   | 8 or 11            |


## User Perspective

##### Multiple rendition URL Load Balancing
The ARender web interface now properly load balances requests across all configured render URLs, improving performance and reliability. *(AR-17700)*

##### Document distribution to rendition servers
The ARender web interface offers new document distribution strategies, providing more configuration options based on user use cases. *(AR-17736)*

##### Document upload request limiting
The rendition server now takes available disk space into account when determining whether or not to accept document upload requests. *(AR-17731)*

##### My encrypted perishable document IDs are reversible
Encrypted perishable document IDs that contain the EOL timestamp are reversible, allowing the document to be automatically reloaded if it is evicted  from the cache. *(AR-17686)*

## Developer / Integrator Perspective

*No developer/integrator-specific changes in this version.*

## Exploitation Perspective

*No operational-specific changes in this version.*

 Description | Binary | SHA-256 |
|-------------|--------|---------|
| ARender Rendition Server installer | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.6.1/rendition-engine-installer-2023.6.1-rendition.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.6.1/rendition-engine-installer-2023.6.1-rendition.jar.sha256) |
| ARender WEB-UI - Spring Boot Application - Standalone | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.6.1/arondor-arender-hmi-spring-boot-package-2023.6.1.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.6.1/arondor-arender-hmi-spring-boot-package-2023.6.1.zip.sha256) |
| ARender HMI - J2EE EAR Application - FileNet 5.x | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.6.1/arondor-arender-hmi-filenet-ear-2023.6.1.ear) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.6.1/arondor-arender-hmi-filenet-ear-2023.6.1.ear.sha256) |
| ARender HMI - J2EE WAR Application - Content Manager 8.1 | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.6.1/arondor-arender-hmi-cm-2023.6.1.war) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.6.1/arondor-arender-hmi-cm-2023.6.1.war.sha256) |
| ARender plugins : IBM Content Navigator plugin | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.6.1/arondor-arender-navigator-plugin-2023.6.1.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.6.1/arondor-arender-navigator-plugin-2023.6.1.jar.sha256) |
| ARender plugins : Alfresco Share plugin | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.6.1/arender-for-alfresco-share-plugin-2023.6.1.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.6.1/arender-for-alfresco-share-plugin-2023.6.1.jar.sha256) |
| ARender plugins : Alfresco ADF plugin base for integration in ADF | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.6.1/arender-for-alfresco-ADF-plugin-2023.6.1.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.6.1/arender-for-alfresco-ADF-plugin-2023.6.1.zip.sha256) |
| ARender API : Client API | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.6.1/arondor-arender-client-api-2023.6.1-javadoc.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.6.1/arondor-arender-client-api-2023.6.1-javadoc.jar.sha256) |
| ARender API : Rendition API | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.6.1/arondor-arender-rendition-api-2023.6.1-javadoc.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.6.1/arondor-arender-rendition-api-2023.6.1-javadoc.jar.sha256) |
