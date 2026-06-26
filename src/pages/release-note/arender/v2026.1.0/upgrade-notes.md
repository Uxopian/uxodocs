---
title: "ARender v2026.1.0 – Upgrade Notes"
draft: false
date: "2026-06-24"
weight: -202610
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

> **Release note:** See [v2026.1.0](../release-notes).

## ⚙️ Customization and Configuration

### New Properties

* **`arender.server.alfresco.disable.renditions`** (default: `false`) — CMIS / Alfresco connector (ARender Classic HMI). When set to `true`, ARender never consumes Alfresco-side PDF renditions (`cm:pdf`) and always renders documents from their native content, even when a rendition already exists in the repository.
* **`registry.internal.use-locale-for-ids`** (default: `false`) and **`registry.internal.use-time-zone-for-ids`** (default: `false`) — internal registry provider (Rendition Engine). When `true`, the request locale / time zone is appended to the generated `DocumentId`, producing one document instance per locale or time zone. The default (`false`) matches the legacy `DefaultURLParser` behavior.

:::info
**Standalone annotation storage:** the internal registry provider (`registry.default-provider=internal`) now provides a file-system fallback for annotation create/read/update/delete when no ECM provider (FileNet, Alfresco, …) is configured. The `/documents/{id}/annotations` endpoints behave the same in standalone mode as with an ECM provider.
:::

### Changed and Deprecated Properties

No properties were renamed or deprecated in this release.

### Deleted Properties

No properties were removed in this release.

## 📦 Product

### Technical Changes and Security

* **Spring Boot `4.0.5` → `4.0.7`**
* **Additional dependency hardening:** Tomcat Embed updated to `11.0.21` and the Docker FFmpeg upgraded to `8.1.1`.
* **common-mime `3.0.0` → `3.1.0`.**
* **Spring Security:** In version 2026.2.0, the automatically added continue URL parameter has been removed from authentication-related redirects.
This parameter was introduced by newer versions of Spring Security (used with Spring Boot 4.x) but was not present in previous releases based on Spring Boot 2.7.x.
The parameter has been removed to maintain backward compatibility and avoid integration issues for applications that enforce allowlists of accepted URL query parameters.<br/>
<u>**Impact:**</u> If your integration was updated to explicitly allow the continue parameter, no further changes are required. Otherwise, authentication redirects will now behave as they did in previous releases.