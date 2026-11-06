---
title: "ARender v2023.24.0 - Release Notes"
draft: false
date: "2026-11-02"
weight: -202324
aliases:
  - /release/2023.24/
description: "Top-of-view option for page navigation in the JavaScript API, annotation display, signature check and search progress fixes, and security upgrades."
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

<div className="arender-release-notes">

> **Upgrade note:** See [v2023.24.0](../upgrade-notes) for detailed instructions.

# ARender v2023.24.0 - Release Notes

ARender 2023.24.0 is a maintenance release on the 2023.x (ARender Classic) line. The JavaScript API can now place a navigation target at the **top of the view**, as an internal hyperlink click does, which helps integrations that handle cross-document links themselves.

The release also fixes annotations that did not display when a document was opened, signed PDFs wrongly reported as altered, and a search progress indicator that could stay out of sight. Embedded dependencies and container images are upgraded to address known security advisories.

---

## Security

#### Security fixes and dependency updates

`Changed` - This release includes security hardening together with updates to third-party dependencies and container base images to address known vulnerabilities. For details on the specific issues addressed, please contact [ARender support](https://arondor.atlassian.net/servicedesk/customer/portals).

---

## Developer notes

#### Top-of-view option for page navigation in the JavaScript API

`New` - `askChangePage` accepts an optional fourth argument, `centerPosition`. When it is `false`, the position built with `newPageRelativePosition()` is placed at the top of the view, as an internal hyperlink click does, instead of being centered. Calls with two or three arguments keep the current behavior. The coordinates given to `newPageRelativePosition()` are in page points (1/72 inch) from the top-left corner of the page.

---

## Bug fixes

#### Annotations missing when a document is opened

`Fixed` - When a document carried an annotation with no valid position, none of its annotations were displayed when it was opened, until the annotations were refreshed. All valid annotations are now displayed on opening. This fix was first delivered in the 2023.22.1 patch.

#### Signed PDFs reported as altered

`Fixed` - Signed PDFs whose signature embeds its certificate chain as a list are no longer reported as "Signature altered" in the signatures panel. The signature is now verified and shown with its actual status.

#### Search progress indicator out of sight

`Fixed` - The small loading indicator shown at the bottom of the viewer, for example during a text search, now follows the current window size after the browser window is resized, and is no longer hidden behind the document navigator tabs.

---

## Changelog

| Summary | Type | Key | Linked Issues |
|---------|------|-----|---------------|
| Security hardening | Security | AR-18817 | TMAPR-6009 |
| Security hardening | Security | AR-18824 | |
| Dependency security update | Security | AR-18869 | |
| Dependency security update | Security | AR-18870 | |
| Dependency security update | Security | AR-18897 | |
| Dependency security update | Security | AR-18903 | |
| JavaScript API page change cannot place the target at the top of the view | Evolution | AR-18687 | TMAPR-6717 |
| Annotation with no position blocks all annotations at load | Regression | AR-18717 | TMAPR-5817 |
| Signed PDF reported as altered when its certificate chain is a list | Bug fix | AR-18667 | TMAPR-6666, TMAPR-4681 |
| Search progress indicator hidden on very large documents | Bug fix | AR-18776 | TMAPR-7051 |

</div>
