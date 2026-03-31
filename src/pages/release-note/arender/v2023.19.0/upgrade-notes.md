---
title: "ARender v2023.19.0 – Upgrade Notes"
draft: false
date: "2026-03-31"
weight: -202319
_build:
  list: never
---

> **Release note:** See [v2023.19.0](../release-notes).

## ⚙️ Customization and Configuration

### Changed and Removed Properties

#### Rotation Download and Print

:::warning[Breaking change from 2023.18.0]

The dedicated "Download with rotations" button and the print-with-rotations checkbox introduced in **2023.18.0** have been removed. Saved rotations are now applied transparently by two properties on the standard download and print actions.

:::

| 2023.18.0 property | 2023.19.0 | Action required |
|--------------------|-----------|-----------------|
| `topPanel.documentMenu.downloadRotation` | **Removed** | Remove from configuration. Set `topPanel.documentMenu.downloadPDF.includeRotations=true` if you want the standard "Download as PDF" to include saved rotations. |
| `print.includeRotations` | Behavior changed: was a print-dialog checkbox, now transparently applies rotations on print | If set to `true`, printing now always includes saved rotations with no user prompt. Verify this is the desired behavior. |

> `visualization.rotation.save.enabled=true` must still be set for rotation saving to be active.

### New Properties

* **`arender.conversion.timeout.ms`**: Configures the internal conversion coordination timeout in the rendition broker. Previously hardcoded to 120 seconds, heavy document conversions would time out even when the HTTP read timeout ([`arender.server.rendition.rest.read.timeout`](/docs/arender/guides/configurations/web-ui/server/rest-client/)) was extended. This value should be aligned with `arender.server.rendition.rest.read.timeout`.

* **`topPanel.documentMenu.downloadPDF.includeRotations`** (default: `false`): When set to `true`, the standard "Download as PDF" action includes saved page rotations transparently, with no extra button shown to the user. Requires `visualization.rotation.save.enabled=true`.

### No Deprecated or Deleted Properties Beyond the Above

No other properties were deleted or deprecated in this release.

## 📦 Product

### Technical Changes and Security

* **Security dependencies upgraded**: Embedded dependencies have been upgraded to address known vulnerabilities in both the rendition and UI components. Upgrading all ARender components together is recommended. (AR-18122, AR-18223)
* **Aroms upgraded to 4.1.0**: The Aroms rendering engine has been upgraded to version 4.1.0. This improves layout generation performance for certain Office documents and introduces a timeout mechanism to prevent excessive processing time. No configuration change is required.

## 💻 API

### New JavaScript API Events

Two new events are available for JavaScript integrators:

* **First page rendered**: Fires when the first page of a document finishes rendering. Enables accurate measurement of perceived document load time independently of full document resolution. See [Document JavaScript API](/docs/arender/development/apis/web-ui/javascript/document/).
* **All document layouts resolved**: Fires when all `DocumentLayout` objects have been resolved for every document in the session, including child documents such as ZIP entries and email attachments. Useful for actions that must wait for the complete document structure. See [Document layout JavaScript API](/docs/arender/development/apis/web-ui/javascript/get-layout/).
