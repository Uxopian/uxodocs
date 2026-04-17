---
title: "ARender v2026.0.0 – Release Notes"
draft: false
date: "2026-04-17"
weight: -202600
aliases:
  - /release/2026.0/
description: "Major version: Spring Boot 4, Java 25, Jackson 3, PDFOwl default renderer, OAuth2 Rendition security, new React UI with REST connector architecture for FileNet and Alfresco."
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

<div className="arender-release-notes">

# ARender v2026.0.0 – Release Notes

ARender 2026.0.0 is the first major version since the 2023 line — a ground-up modernization of the platform. The backend now runs on **Spring Boot 4** and **Java 25**, with **PDFOwl** as the default renderer for improved stability and process isolation. Security dependencies have been upgraded across the entire stack.

This release also debuts **ARender Horizon**, a new React-based viewer embeddable as a Web Component. ARender Horizon shares the same Rendition Engine as the existing GWT-based viewer (now called **ARender Classic**) — same rendering quality, same format support — with a modern frontend and a **REST connector architecture** that lets you build document connectors in any language. FileNet and Alfresco providers ship out of the box as Docker images.

**Docker is now the recommended deployment method**, with Spring Boot standalone as an alternative. Existing ARender Classic deployments upgrade seamlessly — no feature removed from the viewer, full backward compatibility on annotations and document formats.

:::tip Upgrade note
See the [v2026.0.0 upgrade notes](../upgrade-notes) for step-by-step migration instructions.
:::

---

## Breaking changes

Review these items before upgrading. See the [upgrade notes](../upgrade-notes) for detailed migration steps.

#### WAR and EAR packaging removed

ARender UI is now exclusively a Spring Boot application. WAR and EAR artifacts are no longer produced. If you currently deploy ARender inside an application server (Tomcat, WebSphere), you must switch to running the Spring Boot JAR directly with `java -jar`. See the <DocLink version="v2026.0.0" product="arender" to="guides/upgrade/2023-to-2026">upgrade guide</DocLink> for migration steps.

#### Spring Boot property renaming

The migration from Spring Boot 2 to 4 includes extensive property renaming across all services. The [upgrade notes](../upgrade-notes) contain the full property mapping.

#### Hazelcast 4.x → 5.5 incompatibility

Hazelcast 4.x and 5.x instances cannot coexist in the same cluster. A rolling upgrade is not possible — perform a full stop/start or blue-green deployment.

#### PDFOwl is now the default renderer

The default PDF rendering engine has changed from JNIPdfEngine to PDFOwl. You may observe minor rendering differences. Test your critical documents after upgrading.

#### Third-party tool major version upgrades

LibreOffice, ImageMagick, and FFmpeg have all been upgraded to new major versions. This may cause minor visual differences in document conversion output compared to v2023.x.

#### Legacy redaction removed

The legacy image-based redaction feature and its `redact.flattenText` property have been removed. The modern text-preserving redaction remains fully supported.

:::info Migrate with AI
Use your preferred AI assistant with ARender's context file to get personalized migration help. Open [Claude](https://claude.ai), [ChatGPT](https://chatgpt.com), or any AI assistant and paste:

```
Read https://doc.uxopian.com/llms.txt then help me migrate
my ARender configuration from v2023 to v2026
```

Then paste your current `application.properties` or `application.yaml`. The AI will use our documentation to map your properties to their v2026 equivalents.
:::

---

## ARender Classic (GWT)

If you use ARender Classic (GWT viewer), this section covers everything relevant to your upgrade.

### Security

#### Security dependencies upgraded

Security dependencies have been upgraded across all components — backend, frontend, and Docker images — to address known vulnerabilities. This includes updates to Spring Boot, Jackson, Netty, React, and OS-level packages in Docker images. For detailed information about the specific vulnerabilities addressed, please contact [ARender support](https://arondor.atlassian.net/servicedesk/customer/portals).

### Infrastructure changes

#### PDFOwl default renderer

`Changed` — PDFOwl replaces JNIPdfEngine as the default PDF renderer. PDFOwl provides better stability through process isolation — rendering errors are contained in sub-processes without affecting the main application. Instance recycling has been disabled to ensure idempotent behavior across consecutive renderings. See the <DocLink version="v2026.0.0" product="arender" to="reference/rendition-properties#document-renderer-pdfowl">rendition properties reference</DocLink> for configuration options.

#### Spring Boot 2 → 4 migration

`Changed` — The entire backend stack (HMI, Rendition, all microservices) has been migrated through Spring Boot 3 to Spring Boot 4. This includes property renaming, Jackson 3 migration, and Hazelcast 5 upgrade. See the [upgrade notes](../upgrade-notes) for the full property migration guide.

#### Hazelcast upgraded to 5.5.0

`Changed` — Distributed caching has been upgraded from Hazelcast 4.x to 5.5.0. See <DocLink version="v2026.0.0" product="arender" to="concepts/rendition-caching">rendition caching</DocLink> for cluster configuration.

#### PDFBox upgraded to 3.x

`Changed` — The PDF processing library has been migrated from PDFBox 2 to PDFBox 3.

#### Third-party tool upgrades

`Changed` — The following tools have been updated:

| Tool | Version | Notes |
|------|---------|-------|
| LibreOffice | 26.2.1.2 | |
| FFmpeg | 8.0.1 | |
| ImageMagick | 7.1.2-15 | Major version upgrade from 6.x |

#### Docker base images standardized

`Changed` — All Docker images now use the standard Uxopian base image for consistency and security. See the <DocLink version="v2026.0.0" product="arender" to="quickstart/docker-compose">Docker Compose quickstart</DocLink> for updated image references.

#### External configuration for connectors

`New` — Connectors now support external `application.properties` or `application.yaml` files via Spring active profiles. Integrators can override ARender and Spring configurations without modifying the packaged connector JAR. See the <DocLink version="v2026.0.0" product="arender" to="installation/configuration-system">configuration system</DocLink> for details on property loading and precedence.

#### StatsD meter registry removed

`Removed` — The unused StatsD metrics exporter has been removed from all modules. The `management.metrics.export.statsd.*` properties (`enabled`, `step`, `host`, `port`) no longer have any effect.

#### PDF/A text conversion removed

`Removed` — The unused PDF/A conversion based on text has been removed.

### Developer notes

#### Annotation API compatible with JDK 25

`Changed` — If you use the annotation API in custom code, note that `javax.xml.bind` imports have been replaced by their Jakarta equivalents (`jakarta.xml.bind`). Update your imports accordingly. See the <DocLink version="v2026.0.0" product="arender" to="reference/annotation-types">annotation types reference</DocLink>.

:::tip Migrate your code with AI
Paste your custom annotation code into an AI assistant with:

```
Read https://doc.uxopian.com/llms.txt then migrate the following Java code
from javax.xml.bind to jakarta.xml.bind for ARender v2026
```
:::

#### REST API documented in Swagger

`New` — The new REST API endpoints introduced with the connector architecture are now listed in the Swagger documentation, making it easier for integrators to discover and test them. See the <DocLink version="v2026.0.0" product="arender" to="reference/rest-api/broker-api">Broker API reference</DocLink>.

#### WAR and EAR packaging removed

`Removed` — See [Breaking changes](#breaking-changes) above. Migrate to the <DocLink version="v2026.0.0" product="arender" to="installation/spring-boot">Spring Boot standalone deployment</DocLink>.

### Bug fixes

#### PDF/A document save in FileNet

`Fixed` — Saving a built PDF/A document back to FileNet failed. The document is now correctly loaded after conversion.

#### Rendition installation on RHEL8

`Fixed` — The offline installation on RHEL8 did not complete correctly.

#### Incorrect date in email rendering

`Fixed` — Dates in certain emails were parsed incorrectly. The email processing library has been upgraded.

---

## ARender Horizon (React)

ARender Horizon is a lightweight, modern viewer built with React, designed to be embedded in any web application — whether you use Angular, Vue, React, or plain HTML. It connects to the same Rendition Engine that powers ARender Classic, so every format already supported keeps working out of the box.

ARender Horizon ships with a new REST-based connector architecture (named Provider) and is the foundation for all future ARender frontend development. 

This first release focuses on document viewing across all supported formats, with full-text search, download, and print.

Annotations and additional features are coming fast — see the <DocLink version="v2026.0.0" product="arender-modern" to="overview/modern-viewer#feature-availability">feature availability table</DocLink> for the current status.

If you only use ARender Classic (GWT viewer) today, you can skip this section.

### Viewer

`New` — ARender Horizon ships as an npm package. Embed it in any web application as a Web Component:

```html
<arender-element></arender-element>
```

**Try it now → <DocLink version="v2026.0.0" product="arender-modern" to="quickstart/getting-started">Getting started guide</DocLink>**

### REST connector architecture

`New` — Connectors are now standalone microservices that implement a standard REST API:

- `GET /documents` — retrieve documents (single or multi-document)
- `GET/POST/PUT/DELETE /annotations` — annotation CRUD

:::warning Annotations through providers
Annotation CRUD through REST providers is not yet available in this release. Provider-based annotation support will be delivered in an upcoming patch.
:::

Two providers are shipped out of the box: **FileNet** and **Alfresco**, packaged as Docker images. Integrators can build custom providers in any language — only HTTP and JSON are required.

The service broker routes requests to the appropriate provider via the `X-Provider-ID` header. A `rendition-provider-api` module provides shared types for Java-based providers.

See the <DocLink version="v2026.0.0" product="arender-modern" to="guides/integration/providers">Connector providers guide</DocLink> and <DocLink version="v2026.0.0" product="arender-modern" to="reference/rest-api/provider-api">Provider API reference</DocLink>.

:::tip Build a custom connector with AI
Ask an AI assistant to scaffold your provider:

```
Read https://doc.uxopian.com/llms.txt then help me build a custom
REST document provider for ARender Horizon that connects to my DMS
```
:::

### OAuth2 / JWT security for Rendition

`New` — The Rendition Engine now supports OAuth2 bearer token security via Keycloak. This is **optional** — security is disabled by default and your existing setup continues to work without changes. When enabled, every request to Rendition must carry a valid JWT token.

### FileNet provider secured with OAuth2

`New` — The FileNet REST provider endpoints are secured with OAuth2, consistent with the Rendition Engine security model.

### URL parameter whitelisting

`New` — Providers can define which URL parameters participate in document ID generation via `connector.registries.<name>.whitelisted-params`, preventing unintended parameters from affecting document identity.

---

## Changelog

| Summary | Issue Type | Key | Linked Issues |
|---------|------------|-----|---------------|
| Jump from Spring Boot 2 to Spring Boot 3 and to Java 21 | Evolution | AR-17033 | TMAPR-5863 |
| Incorrect date in email | Issue | AR-17346 | TMAPR-6129 |
| Support JDK21+ for ARender Annotation API | Evolution | AR-17386 | TMAPR-6245 |
| Upgrade LibreOffice version for ARender | Issue | AR-17490 | TMAPR-6240, TMAPR-6535 |
| Hazelcast - Upgrade to 5.x | Evolution | AR-17505 | |
| PDF document won't open with PDFOwl | Issue | AR-17631 | TMAPR-6320 |
| Secure Rendition Access and ECM Document Retrieval | Evolution | AR-17660 | |
| React UI: Add ECM Document Load Flow | Evolution | AR-17693 | |
| Disable PDFOwl Instance Recycling to Ensure Idempotence and Stability | Evolution | AR-17706 | |
| FileNet - The plug-in can't be added | Issue | AR-17715 | |
| Update version of PDFBox to 3.x | Evolution | AR-17721 | |
| Remove legacy redaction feature | Evolution | AR-17727 | |
| Remove PDF/A conversion based on text | Evolution | AR-17728 | |
| Rendition Installation in RHEL8 offline mode does not completely work | Regression | AR-17741 | |
| Replace common-mime version with 3.0.0 | Evolution | AR-17754 | |
| Remove WAR and EAR packagings | Evolution | AR-17755 | |
| Add FileNet REST Provider | Evolution | AR-17870 | |
| Add Alfresco REST Provider | Evolution | AR-17872 | |
| Implement REST-based connector for annotations | Evolution | AR-17889 | |
| Add new endpoint for opening document in Rendition side | Evolution | AR-17899 | |
| Alfresco: Create endpoint REST for CRUD annotations | Evolution | AR-17926 | |
| Transform annotation positions in rendition side | Evolution | AR-17959 | |
| Create a rendition provider API module | Evolution | AR-17960 | |
| Change Docker base image to the standard Uxopian base image | Evolution | AR-17971 | |
| Annotation serialization issue | Evolution | AR-17972 | |
| FileNet: Implement CRUD Annotation endpoints | Evolution | AR-18022 | |
| arender-ui pod does not start with the default Helm chart | Regression | AR-18028 | |
| Annotations created with an older version (V3) are not imported with V2026 | Regression | AR-18029 | |
| Redact annotations are not saved properly | Regression | AR-18031 | |
| Upgrade Arondor Common Reflection | Issue | AR-18033 | |
| Cannot open URL documents with new open document API | Issue | AR-18044 | |
| Whitelisting URL parameters for generating DocumentId | Evolution | AR-18045 | |
| Improve the way REST connectors are configured in ARender Rendition | Issue | AR-18061 | |
| Activate PDFOwl by default | Evolution | AR-18083 | |
| Annotation Serialization with JSON | Issue | AR-18096 | |
| External application.properties/yaml configuration in connector | Evolution | AR-18126 | |
| Redirection to connector endpoint does not work in Docker | Issue | AR-18135 | |
| Save and update a built PDF/A document in FileNet does not work | Regression | AR-18136 | |
| Unable to switch languages in React | Regression | AR-18141 | |
| Spring Boot Migration - 3.5.x to 4.x | Evolution | AR-18165 | |
| Upgrade maven dependencies version | Evolution | AR-18166 | |
| Upgrade third party software in Docker to latest version | Evolution | AR-18167 | |
| Add Docker images for REST Provider | Evolution | AR-18172 | |
| Rendition service fails to start during installation | Regression | AR-18198 | |
| Vulnerabilities on Docker OS packages | Evolution | AR-18200 | |
| Vulnerability on Jackson dependencies | Evolution | AR-18203 | |
| Display issue for the sticky note deletion confirmation in React | Evolution | AR-18219 | |
| Upgrade Spring Boot version to 4.0.4 | Evolution | AR-18233 | |
| RenditionRestClient WebClient serialization issue with FlowerDocs | Issue | AR-18248 | |
| Vulnerability on Netty-HTTP and Docker OS libraries | Evolution | AR-18267 | |
| Jump to PDFOwl version 1.24-26 | Evolution | AR-18269 | |
| List new REST API in Swagger | Evolution | AR-18273 | |
| Document rotation causes blank page in GWT HMI | Regression | AR-18283 | |
| CVE React | Evolution | AR-18303 | |

---

## Download

import ARenderDownloads from '@site/src/components/ARenderDownloads';

<ARenderDownloads version="2026.0.0" filter={["rendition", "web-ui", "connector-filenet", "plugin-filenet", "plugin-alfresco", "plugin-alfresco-adf", "client-api", "rendition-api"]} />

</div>
