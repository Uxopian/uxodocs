---
title: "ARender v2023.20.0 – Upgrade Notes"
draft: false
date: "2026-04-30"
weight: -202320
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

> **Release note:** See [v2023.20.0](../release-notes).

## ⚙️ Customization and Configuration

### Changed and Deprecated Properties

#### Document navigator initial state

:::warning[Deprecation]

The `Reduced` value of `documentnavigator.initialWidth` is now deprecated and kept only as an alias for the new canonical value `Hidden`. Using `Reduced` still works, but it should be replaced with `Hidden` since it may be removed in a future release.

:::

| Value | Tab bar | Content panel | Status |
|-------|---------|---------------|--------|
| `Hidden` | Not visible | Not visible | Replaces `Reduced` |
| `Collapsed` | Visible | Not visible | **New** |
| `Default` | Visible | Open (255px) | Unchanged |
| `Expanded` | Visible | Open (70% of screen) | Unchanged |
| `Reduced` | Not visible | Not visible | Deprecated alias for `Hidden` |

**Action required:** Replace `documentnavigator.initialWidth=Reduced` with `documentnavigator.initialWidth=Hidden` in your configuration to align with the new canonical value. See <DocLink version="v2023.20.0" product="arender" to="guides/configurations/web-ui/properties/explorer">Document navigator</DocLink>.

### New Properties

* **`documentnavigator.initialWidth=Collapsed`**: New value that keeps the vertical tab bar visible on startup while leaving the content panel closed.

* **`arender.logging.path`** (Spring Boot Web-UI only): Configures the directory where log files are written. Defaults to the application working directory. See <DocLink version="v2023.20.0" product="arender" to="guides/operation/logs">Logs</DocLink>.

* **`arender.logging.fragment.name`** (Spring Boot Web-UI only, default: `custom-logback-fragment.xml`): Classpath name of a logback fragment that is included on top of the default configuration shipped in the JAR, rather than replacing it. The fragment must be on the classpath (placed in the `configurations/` folder or bundled in a JAR in `lib/`) and must use `<included>` as its root element.

  :::warning
  Do **not** set `arender.logging.fragment.name` to an empty value. If the property is absent, the default name is used and silently skipped if not found on the classpath. An explicit empty string may cause unexpected Logback behaviour.
  :::

  :::info
  This mechanism is only available when the Web-UI is deployed as a Spring Boot jar. It is **not supported** when deployed as a WAR on Tomcat.
  :::

  Both properties have Docker-friendly equivalents through Spring Boot's relaxed binding (`ARENDER_LOGGING_PATH`, `ARENDER_LOGGING_FRAGMENT_NAME`).

### Deleted Properties

No properties were deleted in this release.

## 📦 Product

### Technical Changes and Security

* **Dependencies upgraded**: Dependencies have been upgraded to keep ARender's security up to date.

* **PDFOwl upgraded to 1.24-26**: The embedded rendering engine now ships with new text-extraction commands (`text`, `rawtext`), HTTP-style chunked output (`--chunk`) and a configurable memory limit (`--memlimit`). **Default change to be aware of:** image caching is now **disabled by default** to reduce memory pressure. Deployments that previously relied on cached images for performance can re-enable it explicitly.

* **DirectOffice DOCX conversion sped up**: Conversion time for heavy DOCX documents drops from several minutes to seconds on representative customer files. No configuration change is required, but if you previously raised <DocLink version="v2023.20.0" product="arender" to="guides/configurations/web-ui/server/rest-client/"><code>arender.server.rendition.rest.read.timeout</code></DocLink> or `arender.conversion.timeout.ms` to absorb long DOCX conversions, you can now re-evaluate those values.

### Kubernetes Deployments

* **Hazelcast service port honoured**: The `viewer.hazelcast.service.port` Helm chart parameter is now correctly propagated to the Hazelcast Kubernetes discovery configuration. Clusters using the default `5701` are unaffected. **Action required for clusters using a custom port:** remove any workaround that pinned discovery to `5701` and verify peer discovery on the configured port after upgrade.
