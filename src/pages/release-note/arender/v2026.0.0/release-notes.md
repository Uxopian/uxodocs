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

<div className="arender-release-notes">

ARender 2026.0.0 is a major release built on top of v2023.17.0. For existing customers, it modernizes the entire backend stack — security patches, Spring Boot 4, Java 25 — while keeping the Classic GWT viewer fully supported. This release also introduces a new React-based viewer for new integrations.

:::tip Upgrade note
See the [v2026.0.0 upgrade notes](../upgrade-notes) for step-by-step migration instructions.
:::

---

## Breaking changes

Review these items before upgrading. See the [upgrade notes](../upgrade-notes) for detailed migration steps.

#### WAR and EAR packaging removed

ARender UI is now exclusively a Spring Boot application. WAR and EAR artifacts are no longer produced. If you currently deploy ARender inside an application server (Tomcat, WebSphere), you must switch to running the Spring Boot JAR directly with `java -jar`. See the [upgrade notes](../upgrade-notes) for migration steps.

#### Spring Boot property renaming

The migration from Spring Boot 2 to 4 includes extensive property renaming across all services. The [upgrade notes](../upgrade-notes) contain the full property mapping.

#### Hazelcast 4.x → 5.5 incompatibility

Hazelcast 4.x and 5.x instances cannot coexist in the same cluster. A rolling upgrade is not possible — perform a full stop/start or blue-green deployment.

#### PDFOwl is now the default renderer

The default PDF rendering engine has changed from JNIPdfEngine to PDFOwl. You may observe minor rendering differences. Test your critical documents after upgrading.

#### Third-party tool major version upgrades

LibreOffice, ImageMagick, and FFmpeg have all been upgraded to new major versions. This may cause minor visual differences in document conversion output compared to v2023.x.

#### Legacy redaction removed

The legacy image-based redaction feature has been removed. The modern text-preserving redaction remains fully supported.

---

## Classic viewer (GWT)

If you use the Classic GWT-based viewer, this section covers everything relevant to your upgrade.

### Security

#### Spring Boot upgraded to 4.0.4

The entire backend has been migrated from Spring Boot 2.7.x through 3.5.x to Spring Boot 4.0.4, addressing all known vulnerabilities in the Spring ecosystem including embedded Tomcat.

#### OAuth2 / JWT security for Rendition

`New` — The Rendition Engine now supports OAuth2 bearer token security via Keycloak. This is **optional** — security is disabled by default and your existing setup continues to work without changes. When enabled, every request to Rendition must carry a valid JWT token.

#### Jackson 3.x

The JSON processing library used internally has been updated to a new major version, resolving multiple known security vulnerabilities.

#### OS package vulnerabilities

Critical and high severity OS-level vulnerabilities have been patched in all Docker images. Docker base images have been updated to the standard Uxopian base image.


### Bug fixes

#### Annotation backward compatibility with V3 format

`Fixed` — Annotations created with ARender V3 could not be imported in V2026. The import now correctly handles the legacy format.

#### Redact annotation saving

`Fixed` — Redact annotations were not saved properly when a sticky note with rich text preceded a redact annotation in the XFDF file.

#### PDF/A document save in FileNet

`Fixed` — Saving a built PDF/A document back to FileNet failed. The document is now correctly loaded after conversion.

#### FileNet ICN plug-in compatibility

`Fixed` — The FileNet ICN plug-in could not be added. The plug-in is now built with JDK 8 for compatibility.

#### Rendition installation on RHEL8

`Fixed` — The offline installation on RHEL8 did not complete correctly.

#### Incorrect date in email rendering

`Fixed` — Dates in certain emails were parsed incorrectly. The email processing library has been upgraded.

### Infrastructure changes

#### PDFOwl default renderer

`Changed` — PDFOwl replaces JNIPdfEngine as the default PDF renderer. PDFOwl provides better stability through process isolation — rendering errors are contained in sub-processes without affecting the main application.

#### Spring Boot 2 → 4 migration

`Changed` — The entire backend stack (HMI, Rendition, all microservices) has been migrated through Spring Boot 3 to Spring Boot 4. This includes property renaming, Jackson 3 migration, and Hazelcast 5 upgrade. See the [upgrade notes](../upgrade-notes) for the full property migration guide.

#### Hazelcast upgraded to 5.5.0

`Changed` — Distributed caching has been upgraded from Hazelcast 4.x to 5.5.0.

#### PDFBox upgraded to 3.x

`Changed` — The PDF processing library has been migrated from PDFBox 2 to PDFBox 3.

#### Third-party tool upgrades

`Changed` — The following tools have been updated:

| Tool | Version | Notes |
|------|---------|-------|
| LibreOffice | 26.2.1.2 | Fixes CVE-2025-0514 |
| FFmpeg | 8.0.1 | |
| ImageMagick | 7.1.2-15 | Major version upgrade from 6.x |
| common-mime | 3.0.0 | |

#### Docker base images standardized

`Changed` — All Docker images now use the standard Uxopian base image for consistency and security.

#### StatsD meter registry removed

`Removed` — The unused StatsD metrics exporter has been removed from all modules.

#### PDF/A text conversion removed

`Removed` — The unused PDF/A conversion based on text has been removed.

### Developer notes

#### Annotation API compatible with JDK 25

`Changed` — If you use the annotation API in custom code, note that `javax.xml.bind` imports have been replaced by their Jakarta equivalents (`jakarta.xml.bind`). Update your imports accordingly.

#### JSON annotation serialization

`New` — The annotation API now supports JSON serialization alongside XFDF, with correct attribute naming under Jackson 3.

#### WAR and EAR packaging removed

`Removed` — See [Breaking changes](#breaking-changes) above.

---

## Modern viewer (React)

This section is for teams adopting the new React-based viewer. If you only use the Classic GWT viewer, you can skip this section.

### React UI

`New` — ARender now ships a React-based viewer as an npm package. Embed it in any web application as a Web Component:

```html
<arender-element></arender-element>
```

This first release covers document viewing (all formats including AutoCAD), annotations (zone highlight, freetext), full-text search, download, and print. More features will be added in upcoming releases — see the [feature availability table](/docs/arender-modern/overview/modern-viewer#feature-availability) for details.

**[Try it now → Getting started guide](/docs/arender-modern/quickstart/getting-started)**

### REST connector architecture

`New` — Connectors are now standalone microservices that implement a standard REST API:

- `GET /documents` — retrieve documents (single or multi-document)
- `GET/POST/PUT/DELETE /annotations` — full annotation CRUD

Two providers are shipped out of the box: **FileNet** and **Alfresco**, packaged as Docker images. Integrators can build custom providers in any language — only HTTP and JSON are required.

The service broker routes requests to the appropriate provider via the `X-Provider-ID` header. A `rendition-provider-api` module provides shared types for Java-based providers.

See the [Connector providers guide](/docs/arender-modern/guides/integration/providers) and [Provider API reference](/docs/arender-modern/reference/rest-api/provider-api).

### FileNet provider secured with OAuth2

`New` — The FileNet REST provider endpoints are secured with OAuth2, consistent with the Rendition Engine security model.

### URL parameter whitelisting

`New` — Providers can define which URL parameters participate in document ID generation via `connector.registries.<name>.whitelisted-params`, preventing unintended parameters from affecting document identity.

---

## Download

import ARenderDownloads from '@site/src/components/ARenderDownloads';

<ARenderDownloads version="2026.0.0" filter={["rendition", "web-ui", "connector-filenet", "plugin-filenet", "plugin-alfresco", "plugin-alfresco-adf", "client-api", "rendition-api"]} />

</div>
