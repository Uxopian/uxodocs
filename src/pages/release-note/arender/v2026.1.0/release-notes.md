---
title: "ARender v2026.1.0 - Release Notes"
draft: false
date: "2026-06-26"
weight: -202601
aliases:
  - /release/2026.1/
description: "First minor on the 2026 line: ARender Horizon gains highlight annotations, a comments panel, and a redesigned left panel; plus Classic, Rendition and security fixes."
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

<div className="arender-release-notes">

# ARender v2026.1.0 - Release Notes

ARender 2026.1.0 is the first minor release on the 2026 line, and it focuses on closing the gap between **ARender Horizon** (the React viewer) and ARender Classic. Horizon gains new annotation tools - highlight-on-selection with color choice and a comments panel with status, replies and repositioning - along with a redesigned left panel that unifies navigation behind a single button.

To keep things easy to follow, the changes below are grouped by viewer: a shared **Security** section, then **ARender Horizon (React)**, **ARender Classic (GWT)**, and finally **Rendition & platform** for everything that applies to both viewers (backend, conversion, login).

:::tip Upgrade note
See the [v2026.1.0 upgrade notes](../upgrade-notes) for step-by-step migration instructions.
:::

---

## Security

Applies to the whole platform (both viewers).

#### Security fixes and dependency updates

`Changed` - This release includes security hardening across the platform together with updates to third-party dependencies and Docker base images to address known vulnerabilities. For details on the specific issues addressed, please contact [ARender support](https://arondor.atlassian.net/servicedesk/customer/portals).

---

## ARender Horizon (React)

Changes specific to the React viewer (ARender Horizon).

### New features and improvements

#### Highlight annotations

`New` - ARender Horizon can now create highlight annotations directly from a text selection through a contextual quick menu, with a color palette to choose the highlight color. Existing highlights can be removed from a contextual menu, and the interaction is keyboard-accessible.

#### Comments panel

`New` - ARender Horizon gains a comments panel that lists document comments and lets users set a comment status, reply to and edit comments, and reposition them on the page.

#### Redesigned left panel

`Changed` - The Horizon left panel is now opened through a single unified button and lets users switch between views - thumbnails, annotation history and more - from an internal navigation control, reducing UI clutter and giving a consistent navigation pattern.

### Developer notes

#### File-system fallback for annotation storage in standalone mode

`New` - When no ECM provider (FileNet, Alfresco, ...) is configured, the Rendition annotation endpoints (`GET`/`POST`/`PUT`/`DELETE /documents/{documentId}/annotations`) now fall back to file-system storage instead of returning `404`. ARender Horizon annotations therefore work out of the box in standalone deployments.

#### Deprecated framework wrapper libraries removed

`Removed` - The thin `arender-ui-react`, `arender-ui-vue`, `arender-ui-svelte` and `arender-ui-angular` wrapper libraries around the `<arender-element>` web component, deprecated since 2026.0.0, have been removed. Integrate ARender Horizon directly through the web component / `embed.js`.

### Bug fixes

#### Multi-document loading by URL

`Fixed` - Loading ARender Horizon with several `url=` query parameters now renders every document instead of silently keeping only the last one.

#### Free text annotations on rotated pages

`Fixed` - Free text annotations placed on a physically rotated page (90°, 180°, 270°) are now always created with a normal horizontal orientation, so the text stays readable and editable.

---

## ARender Classic (GWT)

Changes specific to the Classic (GWT) viewer.

### Developer notes

#### CMIS connector - option to always serve native content

`New` - The CMIS connector can now be told to ignore Alfresco-side PDF renditions and always render documents from their native content. By default (`arender.server.alfresco.renditions.enabled=true`, the existing behavior), the connector reuses an Alfresco `cm:pdf` rendition when one is available and only falls back to the native content when none exists. Set `arender.server.alfresco.renditions.enabled=false` to turn this off: the connector then ignores Alfresco renditions entirely and always serves the document's native (original) content stream, so ARender renders every document from its source, even when a PDF rendition already exists in the repository or is created during the session. See the <DocLink version="v2026.1.0" product="arender" to="guides/integration/alfresco#rendition-handling">CMIS connector configuration</DocLink> for details.

### Bug fixes

#### Free text annotation resize and move handles

`Fixed` - Free text annotation resize and move handles in the Classic viewer are reliably functional again, both before and after saving the annotation.

#### Error message no longer reached the UI

`Fixed` - When a document is unavailable, the corresponding error message is again surfaced to the user interface instead of being lost.

#### Document identifiers containing `&` or `=`

`Fixed` - Document identifiers whose key/value pairs contain `&` or `=` characters are no longer truncated or reverted, so documents addressed by such identifiers open correctly.

---

## Rendition & platform (both viewers)

Backend, conversion and login changes that apply regardless of the viewer.

### Changes and improvements

#### Reduced Spring Security runtime overhead

`Changed` - Spring Security observation is now disabled by default. On Spring Boot 4 / Spring Security 7 the observation wrapping was pulled in automatically and added measurable CPU and memory overhead on the security filter chain without being used. Disabling it lowers resource consumption with no functional impact.

#### German email header rendering

`New` - EML email header labels (Subject, From, To, Cc, Bcc, Attachments) can now be rendered in German, in addition to French and English. The header language is set in the email conversion configuration. See the <DocLink version="v2026.1.0" product="arender" to="guides/features/email-conversion#header-language">email conversion guide</DocLink> for details.

### Bug fixes

#### SVG documents could not be opened

`Fixed` - SVG documents are again detected as images and open correctly in the viewer. A MIME-detection fix was missing from the 2026.x line and has been forward-ported.

#### OAuth post-login redirect query parameter

`Fixed` - The default `continue` query parameter that Spring Security appended to the OAuth post-login redirect URL is no longer added, restoring compatibility with integrators that enforce a strict URL allow-list.

#### Text-to-PDF conversion of plain text files

`Fixed` - Converting a text file to PDF now preserves the original layout: long lines wrap instead of being cut at the right margin, a Form Feed character (`0x0C`) starts a new page, and horizontal tabs are honored so tabular content keeps its columns.

#### Downloading documents with identical names as an archive

`Fixed` - Downloading several documents that share the same file name as a single archive no longer fails with a duplicate-entry error; the duplicate names are disambiguated.

#### PDF with a single non-viewable attachment

`Fixed` - A PDF whose only attachment is a non-viewable file (for example a `.joboptions` file) is now displayed as the original PDF page instead of as a document container.

---

## Changelog

| Summary | Viewer | Type | Key | Linked Issues |
|---------|--------|------|-----|---------------|
| Security hardening | Both | Security | AR-18313 | |
| Security hardening | Both | Security | AR-18388 | |
| Security and dependency updates in Docker images | Both | Security | AR-18369 | TMAPR-6845 |
| Dependency security update | Both | Security | AR-18417 | |
| Docker base image security update | Both | Security | AR-18425 | |
| Dependency security updates (Horizon) | Horizon | Security | AR-18444 | |
| Dependency security update | Both | Security | AR-18354 | |
| Disable Spring Security Observation | Both | Evolution | AR-18400 | |
| Missing fallback to file system storage for annotations in standalone mode | Horizon | Evolution | AR-18329 | |
| CMIS connector option to bypass Alfresco PDF renditions and serve native content | Classic | Evolution | AR-18406 | TMAPR-6870 |
| Remove deprecated `arender-ui-{react,vue,svelte,angular}` wrapper libraries | Horizon | Evolution | AR-18385 | |
| Improve Left Panel with single button navigation and multiple views | Horizon | Evolution | AR-18222 | |
| Add Highlight Selected Text annotation | Horizon | Evolution | AR-17777 | |
| Highlight annotations add color selection | Horizon | New feature | AR-18314 | |
| Display of the comments panel | Horizon | Evolution | AR-17922 | |
| Comment status | Horizon | Evolution | AR-17973 | |
| Comment reply and edit | Horizon | Evolution | AR-17974 | |
| Comment move | Horizon | Evolution | AR-17975 | |
| Add German (DE) language support for EML email header rendering | Both | Evolution | AR-18404 | TMAPR-6871 |
| Multi-document URL upload renders only the last document | Horizon | Bug fix | AR-18327 | |
| SVG documents cannot be opened in the viewer | Both | Regression | AR-18201 | |
| SVG document does not open as an image | Both | Bug fix | AR-18446 | |
| Free text annotation resize and move handles non-functional | Classic | Regression | AR-18402 | |
| FreeText creation should respect physical page rotation | Horizon | Bug fix | AR-17953 | |
| Error message not shown when a document is unavailable | Classic | Regression | AR-18359 | TMAPR-6842 |
| Spring Security 'continue' query parameter breaks strict URL allow-list | Both | Regression | AR-18364 | TMAPR-6843 |
| DocumentId revert issue when a key-pair value contains & and/or = characters | Classic | Bug fix | AR-18358 | TMAPR-6837, TMAPR-6858 |
| Text-to-PDF: Better handling of txt files | Both | Bug fix | AR-18401 | TMAPR-6723 |
| Error when downloading 2 documents with the same name as a zip | Both | Bug fix | AR-18412 | TMAPR-6688 |
| PDF with a single non-viewable attachment shown as a container instead of the document itself | Both | Bug fix | AR-18418 | |

---

## Download

import ARenderDownloads from '@site/src/components/ARenderDownloads';

<ARenderDownloads version="2026.1.0" filter={["rendition", "web-ui", "connector-filenet", "plugin-filenet", "plugin-alfresco", "plugin-alfresco-adf", "client-api", "rendition-api"]} />

</div>
