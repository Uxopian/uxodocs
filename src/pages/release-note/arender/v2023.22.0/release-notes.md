---
title: "ARender v2023.22.0 - Release Notes"
draft: false
date: "2026-07-15"
weight: -202322
aliases:
  - /release/2023.22/
description: "Redaction fixes for scanned and large pages, annotation loading and interaction fixes, watermark positioning, EML conversion robustness, URL document-id handling, and a security upgrade."
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

<div className="arender-release-notes">

> **Upgrade note:** See [v2023.22.0](../upgrade-notes) for detailed instructions.

# ARender v2023.22.0 - Release Notes

ARender 2023.22.0 is a maintenance release on the 2023.x (ARender Classic) line. It centers on **redaction integrity** - making sure a redaction physically removes content on scanned/image pages and covers the whole page on large, non-A4 documents - and on **annotation reliability**, with fixes for annotations that failed to load, could not be resized or moved, or hid the document.

The release also corrects watermark positioning, hardens EML-to-PDF conversion, improves handling of URL-based document identifiers, and upgrades embedded dependencies to address known security advisories.

---

## Security

#### Embedded platform upgraded

`Changed` - Embedded platform dependencies have been upgraded to address known vulnerabilities of high severity in the networking and serialization libraries. For detailed information about the specific advisories addressed, please contact [ARender support](https://arondor.atlassian.net/servicedesk/customer/portals).

---

## Bug fixes

#### Redaction removes image content on scanned pages

`Fixed` - A redaction applied to a scanned or image-only PDF now physically removes the underlying page image, not just paint a black box over it. Previously the original image stayed embedded in the published document and could be recovered. Documents that were redacted with an affected version should be re-redacted and re-published.

#### Whole-page and zone redaction cover the full page

`Fixed` - On documents that mix page sizes, a whole-page or zone redaction on a page larger than A4 is no longer clipped to A4 dimensions. The published redaction now covers the full page area instead of leaving part of the page exposed.

#### All annotations load when one has an empty position

`Fixed` - A single annotation with an empty position no longer aborts loading of the entire annotation set. Previously one malformed entry left the annotation panel silently empty until the user pressed refresh; all valid annotations now display on the first document load.

#### Adding an annotation inside another no longer hides the document

`Fixed` - Creating an annotation on top of an existing one no longer causes the first annotation to disappear and the document to stop displaying. Both annotations are kept and the document continues to render.

#### Freetext annotation resize and move handles work again

`Fixed` - The resize and move handles of a freetext annotation are responsive again. A regression left the handles visible but non-functional, so the annotation could not be resized or moved; interaction now behaves as expected.

#### Selection indicator shown for circle and polygon annotations

`Fixed` - Selecting a circle or polygon annotation now shows the selection indicator, consistent with other annotation types.

#### User avatar icon in the annotation panel renders correctly

`Fixed` - The user avatar shown next to author names in the annotation panel and popup renders with its correct styling again, instead of a broken placeholder icon.

#### Watermark honors the TOP_LEFT position

`Fixed` - A watermark configured with `watermarkPosition=TOP_LEFT` now renders in the top-left corner of the page. Previously only `CENTER` was applied and every other configured position fell back to the center.

#### EML-to-PDF conversion handles mismatched embedded-image types

`Fixed` - Converting an email (EML) to PDF no longer fails when a message embeds an image whose binary content does not match its declared MIME type. The problematic image is handled gracefully and the message converts successfully.

#### URL document identifiers accept `&` and `=` in query parameters

`Fixed` - Documents opened from a URL whose query string contains `&` and `=` characters (for example pre-signed cloud storage links) now open correctly. These characters are no longer mistaken for the internal key-value separators used in the document identifier.

#### PDF with a single non-viewable attachment displays the PDF itself

`Changed` - A PDF that carries a single non-viewable attachment (such as a `.joboptions` file) now displays the PDF directly, instead of presenting it as an attachment container. This matches the behavior of a PDF carrying a Factur-X file.

---

## Changelog

| Summary | Type | Key | Linked Issues |
|---------|------|-----|---------------|
| Redaction leaves the original image recoverable on scanned/image pages | Bug fix | AR-18438 | TMAPR-6355 |
| Whole-page/zone redaction sized to A4 on larger pages, leaving part of the page exposed | Bug fix | AR-18440 | TMAPR-6355 |
| All annotations fail to load when any annotation has an empty position | Bug fix | AR-18390 | TMAPR-5817 |
| Adding an annotation inside another prevents the document from displaying | Bug fix | AR-18477 | TMAPR-6886 |
| Freetext annotation resize and move handles non-functional | Regression | AR-18402 | |
| Selection indicator not shown for circle or polygon annotations | Bug fix | AR-18466 | TMAPR-6864 |
| User avatar icon broken next to the author name in the annotation panel | Regression | AR-18478 | |
| Watermark TOP_LEFT position not applied (only CENTER worked) | Bug fix | AR-18300 | TMAPR-6801 |
| EML-to-PDF conversion fails on an embedded image with a mismatched MIME type | Bug fix | AR-18420 | TMAPR-6894 |
| URL document identifier breaks when a query parameter contains `&` or `=` | Bug fix | AR-18358 | TMAPR-6837, TMAPR-6858 |
| PDF with a single non-viewable attachment rendered as a container instead of the PDF | Evolution | AR-18418 | |
| Security dependency upgrades | Security | AR-18419, AR-18443, AR-18462 | |

---

## Download

import ARenderDownloads from '@site/src/components/ARenderDownloads';

<ARenderDownloads version="2023.22.0" filter={["rendition", "web-ui", "connector-filenet", "hmi-cm", "plugin-filenet", "plugin-alfresco", "plugin-alfresco-adf", "client-api", "rendition-api"]} />

</div>
