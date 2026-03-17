---
title: "ARender v2026.0.0 – Release Notes"
draft: false
date: "TBD"
weight: -202600
aliases:
  - /release/2026.0/
description: "Major version: Spring Boot 4, Java 25, Jackson 3, PDFOwl default renderer, OAuth2 Rendition security, new React UI with REST connector architecture for FileNet and Alfresco."
_build:
  list: never
---

> **Upgrade note:** See [v2026.0.0](../upgrade-notes) for detailed instructions.

## Overview

ARender 2026.0.0 is a **major release** built on top of **v2023.17.0**, structured around two axes:

**Continuity for GWT customers — a technical and security upgrade.** The GWT-based viewer with its full ecosystem of HMI connectors remains fully supported and is the primary deployment model. Under the hood, the entire stack has been modernized: **Spring Boot 2 → 4**, **Java → 25**, **Jackson 2 → 3**, **Hazelcast 4 → 5.5**, and **PDFBox 2 → 3**. Multiple OS-level and dependency vulnerabilities have been patched, and PDFOwl is now the default PDF rendering engine. For existing customers, this is primarily a **security and infrastructure upgrade** — no functional regression is expected.

**A new React UI with REST connector architecture.** In addition to the GWT viewer, this release introduces the **ARender React UI**. It relies on the Rendition Engine and a **new REST connector model**: connectors are now standalone Spring Boot applications that implement a standard REST API (`/documents`, `/annotations`). Two connectors are provided out of the box — **FileNet** and **Alfresco**. Partners and integrators can build their own connectors in **any language** by implementing this API. Detailed documentation is available in the [REST Connector guide](/docs/arender/development/connector/rest-connector/architecture).

## Prerequisites

| Component | Supported versions |
|-----------|--------------------|
| OpenJDK   | 25                 |

## Security

**Spring Boot upgraded to 4.0.3**
The entire backend has been migrated from Spring Boot 2.7.x through 3.5.x to Spring Boot 4.0.3, addressing all known vulnerabilities in the Spring ecosystem including embedded Tomcat.

**OAuth2 / JWT security for Rendition**
The Rendition Engine can now be secured with OAuth2 bearer tokens via Keycloak. When enabled, every request to Rendition must carry a valid JWT token. A configuration flag allows disabling security for demo or development environments.

**Jackson vulnerability remediation**
Jackson dependencies have been updated to version 3.x across all modules, resolving multiple known vulnerabilities in the 2.x line. Spring Boot managed versions are overridden where necessary.

**OS package vulnerabilities in Docker images**
Critical and high severity OS-level vulnerabilities have been patched in all Docker images. Docker base images have been updated to the standard Uxopian base image.

**Common Reflection library upgrade**
The Arondor Common Reflection library has been upgraded to address a security issue.

## User Perspective

**React UI — document viewing from ECM systems**
ARender now ships a React-based viewer alongside the GWT viewer. The React UI supports opening documents from FileNet and Alfresco through the new REST connector architecture, with language switching, progressive thumbnail loading, and auto-hide panels.

**Annotation backward compatibility with V3 format**
Fixed a regression where XFDF annotations created with ARender V3 could not be imported in V2026. The deserialization now correctly handles the legacy `ns2` namespace required by `RedactTextElemType` and `ImagestampElemType` annotations.

**Redact annotation saving**
Fixed a regression where redact annotations were not saved properly when a sticky note containing rich text preceded a redact text annotation in the XFDF.

**PDF/A document save in FileNet**
Fixed a regression where saving and updating a built PDF/A document in FileNet failed. The document updated accessor is now correctly loaded after the PDF/A conversion completes.

**FileNet ICN plug-in compatibility**
Fixed an issue preventing the FileNet ICN plug-in from being added. The plug-in is now built with JDK 8 for compatibility.

## Developer / Integrator Perspective

**REST connector architecture — build connectors in any language**
ARender v2026.0.0 introduces a fundamentally new way to integrate with document management systems. Connectors are now **standalone microservices** that implement a standard REST API:
- `GET /documents` — retrieve documents (single or multi-document)
- `GET/POST/PUT/DELETE /annotations` — full annotation CRUD

Two connectors are provided: **FileNet** and **Alfresco**, packaged as Spring Boot applications with Docker images. Integrators and partners can build connectors in **any language** — only HTTP and JSON are required.

The Rendition Engine routes requests to the appropriate connector via the `X-Provider-ID` header or `connector.default-registry` configuration. A new `rendition-provider-api` module provides shared types for Java-based connectors.
More information: [REST Connector documentation](/docs/arender/development/connector/rest-connector/architecture)

**FileNet connector secured with OAuth2**
The FileNet REST connector endpoints are secured with OAuth2, consistent with the Rendition Engine security model.

**REST connector URL parameter whitelisting**
Connectors can define which URL parameters are allowed to participate in DocumentId generation via the `connector.registries.<name>.whitelisted-params` configuration, preventing unintended parameters from affecting document identity.

**JSON annotation serialization**
The annotation API now supports JSON serialization alongside XFDF. `@JsonProperty` annotations have been added to ensure correct attribute naming when Jackson 3 is used with the JAXB-annotated model.

**Annotation API compatible with JDK 25**
The annotation API JAXB model has been migrated to work with JDK 25, replacing deprecated `javax.xml.bind` with Jakarta equivalents.

**WAR and EAR packaging removed**
ARender UI is now exclusively packaged as a Spring Boot application. WAR and EAR artifacts are no longer produced. Integrators deploying to external application servers must migrate to the Spring Boot standalone deployment.

## Exploitation Perspective

**PDFOwl is now the default PDF renderer**
The default PDF rendering engine has been changed from JNIPdfEngine to PDFOwl. PDFOwl provides better stability through process isolation — rendering errors are contained in sub-processes without affecting the main application. Instance recycling has been disabled by default to ensure idempotent, deterministic rendering.

**Spring Boot 2 → 4 migration**
The entire backend stack (HMI, Rendition, all microservices) has been migrated through Spring Boot 3 to Spring Boot 4. This includes extensive property renaming, Jackson 3 migration, and Hazelcast 5 upgrade. See the [upgrade notes](../upgrade-notes) for the full property migration guide.

**Hazelcast upgraded to 5.5.0**
Session management has been upgraded from Hazelcast 4.x to 5.5.0. **Important:** Hazelcast 4.x and 5.x instances are not compatible and cannot coexist in the same cluster. A rolling upgrade is not possible — perform a full stop/start or blue-green deployment.

**PDFBox upgraded to 3.x**
The PDF processing library has been migrated from PDFBox 2 to PDFBox 3, bringing performance improvements and new features.

**Third-party tool upgrades**
- **LibreOffice** upgraded to 26.2.1.2 (fixes CVE-2025-0514)
- **FFmpeg** upgraded to 8.0.1
- **ImageMagick** upgraded to 7.1.2-15 (ImageMagick 6 removed)
- **common-mime** upgraded to 3.0.0

> Due to the upgrade of third-party tools (LibreOffice, ImageMagick, FFmpeg), there may be minor visual differences in document rendering compared to version 2023.x.

**Docker base images standardized**
All Docker images now use the standard Uxopian base image for consistency and security.

**Rendition installation on RHEL8**
Fixed a regression where the Rendition offline installation on RHEL8 did not complete correctly.

**Rendition service startup with Spring Boot 4**
Fixed a regression where the Rendition service failed to start during installation because executable JAR mode is no longer supported in Spring Boot 4. JARs must now be run with `java -jar`.

**Incorrect date in email rendering**
Fixed an issue where dates in certain emails were parsed incorrectly. The `poi-scratchpad` library has been upgraded from 3.17 to 5.x.

**StatsD meter registry removed**
The unused StatsD metrics exporter has been removed from all modules.

**Legacy features removed**
- **Legacy redaction** (image-based obfuscation) has been removed. The modern text-preserving redaction feature remains.
- **PDF/A conversion based on text** has been removed (unused).

## Changelog

| Summary | Issue Type | Key | Linked Issues |
|---------|------------|-----|---------------|
| Spring Boot Migration - 3.5.x to 4.x | Dev W/O UX | AR-18165 | |
| Jump from Spring Boot 2 to Spring Boot 3 and to Java 25 | Dev W/O UX | AR-17033 | [TMAPR-5863](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5863) |
| [Mend] Vulnerability on Jackson dependencies | Dev W/O UX | AR-18203 | |
| [Mend] Vulnerabilities on Docker OS packages | Dev W/O UX | AR-18200 | |
| [Mend] Upgrade OS packages | Dev W/O UX | AR-18164 | |
| [Security] Upgrade Arondor Common Reflection | Issue | AR-18033 | |
| [Security] Upgrade Spring Boot version | Non Dev Task | AR-18026 | |
| Secure Rendition Access and ECM Document Retrieval (FlowerDocs, FileNet, Alfresco, M-Files) | Dev W/O UX | AR-17660 | |
| React UI: Add ECM Document Load Flow | Dev W/O UX | AR-17693 | |
| Annotations created with an older version (V3) are not imported with V2026 | Regression | AR-18029 | |
| Redact annotations are not saved properly | Regression | AR-18031 | |
| Save and update a built PDFA document in Filenet does not work | Regression | AR-18136 | |
| Filenet - The plug-in can't be added | Issue | AR-17715 | |
| Annotation serialization issue | Dev W/O UX | AR-17972 | |
| [REST] Add FileNet REST Provider | Dev W/O UX | AR-17870 | |
| [REST] Add Alfresco REST Provider | Dev W/O UX | AR-17872 | |
| [FileNet] Create endpoint REST for opening single/multi documents | Sous-tâche | AR-17871 | |
| [Alfresco] Create endpoint REST for opening single/multi documents | Sous-tâche | AR-17873 | |
| [FileNet] Implements CRUD Annotation endpoints | Sous-tâche | AR-18022 | |
| [Alfresco] Create endpoint REST for CRUD annotations | Sous-tâche | AR-17926 | |
| Implement Rest-based connector for annotations | Dev W/O UX | AR-17889 | |
| Create a rendition provider api module | Dev W/O UX | AR-17960 | |
| Add new endpoint for opening document in Rendition side | Dev W/O UX | AR-17899 | |
| [Docker] Add docker images for REST Provider | Dev W/O UX | AR-18172 | |
| [FileNet] Secure endpoint with OAuth2 | Sous-tâche | AR-18046 | |
| [REST Connectors] Whitelisting URL parameters for generating DocumentId | Dev W/O UX | AR-18045 | |
| Improve the way REST connectors are configured in ARender Rendition | Issue | AR-18061 | |
| Annotation Serialization with JSON | Issue | AR-18096 | |
| Support JDK 25 for ARender Annotation API | Dev W/O UX | AR-17386 | [TMAPR-6245](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6245) |
| [v2026] Remove WAR and EAR packagings | Dev W/O UX | AR-17755 | |
| Activate PDFOwl by default | Dev W/O UX | AR-18083 | |
| Disable PDFOwl Instance Recycling to Ensure Idempotence and Stability | Dev W/O UX | AR-17706 | |
| Hazelcast - Upgrade to 5.x | Dev W/O UX | AR-17505 | |
| Update version of pdfbox to 3.x | Dev W/O UX | AR-17721 | |
| [V2026] Upgrade third party software in Docker to latest version | Dev W/O UX | AR-18167 | |
| Upgrade LibreOffice version for ARender | Issue | AR-17490 | [TMAPR-6240](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6240), [TMAPR-6535](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6535) |
| Replace 2.3.0 common mime version with 3.0.0 | Dev W/O UX | AR-17754 | |
| [Docker] Change docker base image to the standard Uxopian base image | Dev W/O UX | AR-17971 | |
| [Docker] Upgrade docker base image to 1.0.4 | Non Dev Task | AR-18150 | |
| [v2026] The Rendition Installation in RHEL8 in offline mode does not completely work | Regression | AR-17741 | |
| Rendition service fails to start during installation | Regression | AR-18198 | |
| Incorrect date in email | Issue | AR-17346 | [TMAPR-6129](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6129) |
| Remove unused Statsd meter registry | Non Dev Task | AR-18082 | |
| Remove legacy redaction feature | Dev W/O UX | AR-17727 | |
| Remove PDF/A conversion base on text | Dev W/O UX | AR-17728 | |
| Transform annotation positions in rendition side | Dev W/O UX | AR-17959 | |
| [V2026] Upgrade maven dependencies version | Dev W/O UX | AR-18166 | |
| Upgrade Spring Boot from 3.5.9 to 3.5.10 | Non Dev Task | AR-18152 | |

## Download

import ARenderDownloads from '@site/src/components/ARenderDownloads';

<ARenderDownloads version="2026.0.0" artifacts={["rendition", "spring-boot", "navigator-plugin", "alfresco-share-plugin", "alfresco-adf", "client-api", "rendition-api"]} />
