---
title: "ARender v2023.21.0 – Upgrade Notes"
draft: false
date: "2026-05-29"
weight: -202321
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

> **Release note:** See [v2023.21.0](../release-notes).

## ⚙️ Customization and Configuration

### Changed and Deprecated Properties

No properties were changed or deprecated in this release.

### New Properties

* **`tools.wkhtmltopdf.external.resource.urls.cleared`** (default: `false`): When set to `true`, external resource URLs (e.g. `file://` references or external image links) are stripped from the source HTML before it is handed off to wkhtmltopdf. This prevents EML/HTML conversions from hanging when wkhtmltopdf attempts to fetch unreachable external resources from restricted network environments. Set in the `application.properties` of the TaskConversion module.

  :::info
  When enabled, images that depend on external URLs are not rendered in the converted document; base64-embedded images and other inline resources are unaffected.
  :::

### Deleted Properties

No properties were deleted in this release.

## 📦 Product

### Technical Changes and Security

* **Dependencies upgraded**: Improvements to ARender security have been made by upgrading library versions. This proactive approach ensures better protection against vulnerabilities.

## 💻 API

### Cross-document hyperlink notification: new position fields

The notification payload delivered to JavaScript handlers registered via `registerFollowLinkHandler` now includes `LEFT_POSITION` and `TOP_POSITION` for **cross-document (GoToR) hyperlinks** whose target is an XYZ destination, in addition to the `PAGE_TARGET` field that was previously the only positional information available. The behaviour for internal GoTo hyperlinks is unchanged.

**Action required for integrators:** if your `registerFollowLinkHandler` implementation parses the destination string and assumes that `LEFT_POSITION`/`TOP_POSITION` are absent for GoToR actions, update your handler to accept and use these new fields. The returned coordinates are raw PDF coordinates (origin at the bottom-left of the page); rotation correction must be applied client-side if your target documents have rotated pages. See <DocLink version="v2023.21.0" product="arender" to="development/apis/web-ui/javascript/document/">Document JavaScript API</DocLink>.
