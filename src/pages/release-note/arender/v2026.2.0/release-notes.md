---
title: "ARender v2026.2.0 - Release Notes"
draft: false
date: "2026-07-31"
weight: -202602
aliases:
  - /release/2026.2/
description: "Second minor on the 2026 line: a new M-Files provider, underline and circle annotations plus a single document-opening API in ARender Horizon, and Classic annotation fixes, Rendition fixes and security hardening."
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

<div className="arender-release-notes">

# ARender v2026.2.0 - Release Notes

ARender 2026.2.0 is the second minor release on the 2026 line. It adds a new **M-Files provider** so documents can be viewed directly from M-Files vaults, continues to expand annotation tooling in **ARender Horizon** (underline and circle annotations, comments panel refinements), and unifies how a document is opened in Horizon behind a single API. The release is rounded out with Classic annotation fixes, Rendition fixes and security hardening.

As in the previous release, the changes below are grouped by viewer: a shared **Security** section, then **ARender Horizon (React)**, **ARender Classic (GWT)**, and finally **Rendition & platform** for everything that applies to both viewers (backend, conversion, integrations).

:::tip Upgrade note
See the [v2026.2.0 upgrade notes](../upgrade-notes) for step-by-step migration instructions.
:::

---

## Security

Applies to the whole platform (both viewers).

#### Security fixes and dependency updates

`Changed` - This release includes security hardening across the platform together with updates to third-party dependencies to address known vulnerabilities. For details on the specific issues addressed, please contact [ARender support](https://arondor.atlassian.net/servicedesk/customer/portals).

---

## ARender Horizon (React)

Changes specific to the React viewer (ARender Horizon).

### New features and improvements

#### Underline annotations

`New` - ARender Horizon can now underline selected text, with a color palette to choose the underline color. This complements the highlight-on-selection tool added in 2026.1.0 and brings Horizon closer to annotation parity with Classic.

#### Circle annotations

`New` - A circle annotation tool is now available in ARender Horizon, so a round area of a page such as a logo or a stamp can be marked out directly in the viewer.

#### Comments panel refinements

`Changed` - The Horizon comments panel introduced in 2026.1.0 gains interactive comment pins on the document page, kept in sync both ways with the comment list: hovering a pin highlights the matching comment and scrolls it into view, and selecting a comment points back to its pin. Comments are also grouped by status (open and closed) so long discussions stay easy to scan.

#### A single way to open a document

`Changed` - ARender Horizon now opens documents through one contract, used by both entry points: `window.ARender.openDocument(params)` in the JavaScript API, and the `document` attribute on the `<arender-element>` Web Component. Both take the same query string of parameters, forwarded to the Rendition backend as-is, so an integration passes only the parameters its repository already expects (`nodeRef`, `objectStoreName`, `objectType`, `url`, `uuid`) without having to know the viewer's own conventions. Opening several documents at once and repeating a parameter now work identically on both entry points.

The earlier entry points are removed: `openDocumentByUrl()`, the `uuid` and `url` attributes on the Web Component, document parameters carried by the `rendition` URL, and document loading from the browser URL. See the <DocLink version="v2026.2.0" product="arender" to="guides/features/opening-documents">opening documents guide</DocLink> for the parameter contract and per-repository examples.

---

## ARender Classic (GWT)

Changes specific to the Classic (GWT) viewer.

### Bug fixes

#### Annotation selection indicator

`Fixed` - Selecting a circle or polygon annotation again shows the selection indicator, so it is clear which annotation is currently selected before moving or resizing it.

#### Adding an annotation inside another one

`Fixed` - Creating an annotation on top of (inside) an existing annotation no longer makes the first annotation disappear or prevents the document from being displayed. Both annotations are kept and the document renders normally.

---

## Rendition & platform (both viewers)

Backend, conversion and integration changes that apply regardless of the viewer.

### New features and improvements

#### M-Files provider

`New` - ARender can now view and retrieve metadata for documents stored in M-Files vaults, through a dedicated M-Files provider available on both ARender Horizon and the Rendition Engine. Annotation support is not yet handled by the provider and is planned for a future release. See the <DocLink version="v2026.2.0" product="arender" to="guides/integration/m-files">M-Files integration guide</DocLink> for setup instructions.

### Bug fixes

#### Annotations no longer fail to load on an empty bounding box

`Fixed` - When an annotation file contained an annotation with an empty bounding box (a valid output of older paste operations), all annotations silently failed to load at document open and the annotation panel appeared empty until a manual refresh. Annotations now load correctly on the first display.

#### Watermark top-left position

`Fixed` - A watermark configured with the `TOP_LEFT` position is now rendered in the top-left corner of the page instead of near the center. See the <DocLink version="v2026.2.0" product="arender" to="guides/features/watermarks#custom-watermark">watermark configuration guide</DocLink> for the supported `watermarkPosition` values.

#### EML to PDF conversion with mismatched image MIME types

`Fixed` - Converting an email (EML) that embeds an image whose binary content does not match its declared MIME type (for example GIF bytes served as `image/png`) no longer fails; the message converts and displays correctly.

#### Logging library conflict in the Document Service Broker image

`Fixed` - The Document Service Broker Docker image no longer bundles conflicting logging libraries, aligning the image with the intended logging stack and removing a source of startup warnings.

---

## Changelog

| Summary | Viewer | Type | Key | Linked Issues |
|---------|--------|------|-----|---------------|
| Security hardening | Both | Security | AR-18438 | |
| Security hardening | Both | Security | AR-18440 | |
| Dependency security update | Both | Security | AR-18522 | |
| Dependency security update | Both | Security | AR-18561 | |
| Add underline annotation with color selection | Horizon | Evolution | AR-18450 | |
| Add circle annotation | Horizon | Evolution | AR-18428 | |
| Group comments by status in the comments panel | Horizon | Evolution | AR-17923 | |
| Interactive comment pins synchronized with the comment list | Horizon | Evolution | AR-17930 | |
| Unify document loading behind a single openDocument(params) API and document attribute | Horizon | Evolution | AR-18575 | |
| M-Files provider | Both | New feature | AR-18346 | |
| Annotation selection indicator not displayed for circle and polygon annotations | Classic | Regression | AR-18466 | TMAPR-6864 |
| Adding an annotation inside another one prevents the document from being displayed | Classic | Bug fix | AR-18477 | TMAPR-6886 |
| All annotations fail to load when one has an empty bounding box | Both | Bug fix | AR-18390 | TMAPR-5817 |
| Watermark TOP_LEFT position not applied | Both | Bug fix | AR-18300 | TMAPR-6801 |
| NPE in EML-to-PDF conversion when an embedded image has a mismatched MIME type | Both | Bug fix | AR-18420 | TMAPR-6894 |
| Document Service Broker image bundles conflicting logging libraries | Both | Bug fix | AR-18560 | TMAPR-6779 |

---

## Download

import ARenderDownloads from '@site/src/components/ARenderDownloads';

<ARenderDownloads version="2026.2.0" filter={["rendition", "web-ui", "connector-filenet", "plugin-filenet", "plugin-alfresco", "plugin-alfresco-adf", "client-api", "rendition-api"]} />

</div>
