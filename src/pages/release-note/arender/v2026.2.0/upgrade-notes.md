---
title: "ARender v2026.2.0 – Upgrade Notes"
draft: false
date: "2026-07-31"
weight: -202602
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

> **Release note:** See [v2026.2.0](../release-notes).

## ⚙️ Customization and Configuration

### New Properties

**M-Files provider (ARender Horizon).** The new `mfiles-provider` microservice is configured through Spring Boot externalized configuration; every property below can also be set as an environment variable (`ARENDER_SERVER_MFILES_WEB_URL`, …). See the <DocLink version="v2026.2.0" product="arender" to="guides/integration/m-files">M-Files integration guide</DocLink>.

* **`arender.server.mfiles.web-url`** (default: `http://localhost/REST/`) — M-Files Web Service base URL. It **must** end with `/REST/`.
* **`arender.server.mfiles.authentication.token`** (default: empty) — pre-generated M-Files REST API token. Use this *or* the service-account triplet below, not both.
* **`arender.server.mfiles.authentication.username`**, **`arender.server.mfiles.authentication.password`**, **`arender.server.mfiles.authentication.vault-guid`** (default: empty) — service-account mode; the provider fetches a token once at the first request.

**Rendition Engine registry.** Routing to the new provider is declared in the Document Service Broker `application.yaml`:

* **`registry.providers.mfiles.base-url`** (default: `http://localhost:8789`) — where the broker reaches the `mfiles-provider` container.
* **`registry.providers.mfiles.whitelisted-params`** (default: `objectType`, `docId`, `versionId`, `fileId`, `title`) — query parameters forwarded to the provider.

:::info
Requests are routed to the M-Files provider by the `X-Provider-ID: mfiles` header injected by your BFF or reverse proxy. If M-Files is your only repository, set `registry.default-provider=mfiles` instead.
:::


### Changed and Deprecated Properties

* **`watermarkPosition`** (custom watermark, values `CENTER` and `TOP_LEFT`) — the `TOP_LEFT` value is now actually honored. Until this release a watermark declared as `TOP_LEFT` was drawn near the center of the page; it is now drawn in the top-left corner. Watermark rotation and the surrounding frame are also applied consistently for both positions. See the <DocLink version="v2026.2.0" product="arender" to="guides/features/watermarks#custom-watermark">watermark configuration guide</DocLink>.

:::warning[Breaking change from v2026.1.0]
If a custom watermark was configured with `watermarkPosition = TOP_LEFT` and its style (offsets, font size) was tuned against the old, incorrectly centered rendering, the watermark will move after the upgrade.

**Action required:** review custom watermark definitions using `TOP_LEFT` and re-check the rendered output, or set `watermarkPosition` to `CENTER` to keep the previous placement.
:::

No properties were renamed or deprecated in this release.

### Deleted Properties

No properties were removed in this release.

## 📦 Product

### Technical Changes and Security

* **DOMPurify `3.4.0` → `3.4.12`**
* **Log4j binaries removed from the Docker images.** `log4j-core-*.jar` and `log4j-1.2-api-*.jar` are now filtered out of `arender-document-converter`, `arender-document-renderer`, `arender-document-renderer-pdfowl`, `arender-document-text-handler`, `arender-document-service-broker` and `arender-ui-springboot`. They were pulled in transitively, conflicted with the intended logging stack and produced startup warnings.<br/>
<u>**Impact:**</u> ARender itself is unaffected — it logs through SLF4J/Logback. If you mount a custom extension into these images that requires Log4j 1.x or 2.x classes at runtime, ship the library with your extension.
* **New Docker image `arender-mfiles-provider`** for the M-Files provider, exposing port `8789`.

### Behavior Changes

* **Redaction now covers images** Redaction annotations previously removed only text and drew an opaque box over the page; image pixels under the box were still present in the burnt PDF. Image content covered by a redaction is now removed from the image data itself.<br/>
<u>**Impact:**</u> when an image cannot be rewritten surgically, ARender fails closed and flattens the whole page to a raster. Text on such pages is no longer selectable or searchable in the produced PDF, and the file may be larger. This only affects pages that carry a redaction annotation.

* **Invalid annotations no longer block the whole annotation set** An annotation with an empty bounding box — a valid output of older paste operations — used to make every annotation of the document fail to load. Such annotations are now skipped at parsing, so the remaining ones load on first display; they are also skipped when burning annotations into a downloaded PDF.<br/>
<u>**Impact:**</u> the skipped annotations are no longer rendered at all, where previously the document either showed none of them or showed them at an undefined position.

* **Unsaved-annotation prompt on every document change** The *"Do you want to save annotation(s)?"* prompt was only raised when the document was changed by id (for example a thumbnail click). It is now raised for relative and absolute document changes as well, which covers the document navigation panel (first / previous / next / last) and document changes triggered through the JavaScript API.<br/>

