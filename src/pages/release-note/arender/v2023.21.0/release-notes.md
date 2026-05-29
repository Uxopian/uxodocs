---
title: "ARender v2023.21.0 – Release Notes"
draft: false
date: "2026-05-29"
weight: -202321
aliases:
  - /release/2023.21/
description: "Email rendering fixes for S/MIME signed messages, embedded images and hyperlinks, PDF hyperlink navigation to named and cross-document destinations, more robust text search, and a security upgrade."
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

<div className="arender-release-notes">

> **Upgrade note:** See [v2023.21.0](../upgrade-notes) for detailed instructions.

# ARender v2023.21.0 – Release Notes

ARender 2023.21.0 is a maintenance release on the 2023.x (ARender Classic) line. It focuses on **email rendering**, with fixes for digitally signed (S/MIME) messages, embedded images, and double-encoded hyperlinks, and on **PDF hyperlink navigation**, so that internal named destinations and cross-document links land at the correct in-page position.

The release also hardens **text search** against documents that mix scripts such as Arabic or Hebrew, refines **word-by-word text selection**, and upgrades embedded platform dependencies to address known security advisories.

---

## Security

#### Embedded platform upgraded

`Changed` — Embedded platform dependencies have been upgraded to address known vulnerabilities of critical and high severity in the application server and networking libraries. For detailed information about the specific advisories addressed, please contact [ARender support](https://arondor.atlassian.net/servicedesk/customer/portals).

---

## Bug fixes

#### Digitally signed (S/MIME) emails render correctly

`Fixed` — Digitally signed (S/MIME) email messages no longer render with a garbled attachment appended after the message body. The signed content is now parsed correctly so the email displays as expected.

#### Emails with embedded images now open

`Fixed` — Email messages containing an embedded image no longer fail to open in ARender. These messages now render reliably.

#### Email hyperlinks no longer double-encoded

`Fixed` — Hyperlink URLs extracted from emails were double-encoded by the PDF URI extractor, producing broken links. URLs are now encoded once and resolve correctly.

#### Hyperlinks to named destinations scroll to the right position

`Fixed` — Clicking an internal PDF hyperlink that targets a named destination now scrolls to the precise position recorded in that destination, instead of stopping at the top of the destination page. This matches the behavior of desktop PDF readers.

#### Cross-document hyperlink notifications include the target position

`Fixed` — Click notifications for cross-document (GoToR) hyperlinks now include the target position on top of the target page, consistent with internal (GoTo) hyperlinks. Integrations that listen for link clicks through the JavaScript API can scroll the target document to the correct location.

#### Text search handles combining diacritics

`Fixed` — Running a text search on PDFs that contain Arabic, Hebrew, or other scripts with stacked vowel marks no longer hangs. Search now returns results for these documents instead of timing out without an error.

#### Word-by-word selection excludes leading punctuation

`Fixed` — In word-by-word selection mode (`text.selection.use.legacy=false`), selecting words enclosed in parentheses no longer pulls the opening parenthesis into the selection. Only the word characters are selected, which keeps hyperlink anchors clean.

#### Annotation buttons in the More menu show their active state

`Fixed` — Annotation tool buttons that overflow into the toolbar's More dropdown now receive the active-state highlight when selected, matching the buttons that stay in the visible toolbar. This affects narrower viewports where part of the annotation toolbar collapses into the dropdown.

#### Document link no longer fails on startup

`Fixed` — A race condition when opening a document link at startup (`topPanel.docLink.activateOnStartup=true`) could throw an `IndexOutOfBoundsException`. The startup sequence now opens the document link reliably.

---

## Changelog

| Summary | Issue Type | Key | Linked Issues |
|---------|------------|-----|---------------|
| [Rendition] Digitally signed (S/MIME) emails render with garbled child after the body | Issue | AR-18349 | TMAPR-6773 |
| Email containing image does not open in ARender | Issue | AR-17392 | TMAPR-5657 |
| [Rendition] Email hyperlink URL is double-encoded by PDF /URI extractor | Issue | AR-18343 | TMAPR-6721 |
| GoTo hyperlink to named destination: in-page position never applied, view stays at top of page | Issue | AR-18370 | TMAPR-6704 |
| Cross-document (GoToR) hyperlink click notification missing LEFT_POSITION and TOP_POSITION | Issue | AR-18331 | TMAPR-6717 |
| [Rendition] PositionTextParser.sortTextPosition throws IllegalArgumentException on PDFs with Arabic combining diacritics | Issue | AR-18357 | TMAPR-6839 |
| Word-by-word text selection pulls opening parenthesis into the selection when text.selection.use.legacy=false | Issue | AR-18340 | TMAPR-6742 |
| [HMI] Annotation buttons in More-menu dropdown miss active-state highlight | Issue | AR-18351 | TMAPR-6709 |
| Race condition in MainScreenSplitPresenter.openDocLink() causes IndexOutOfBoundsException when topPanel.docLink.activateOnStartup=true | Issue | AR-18245 | TMAPR-6395 |
| [Security] Fix CVEs vulnerability of critical/high level on Tomcat and Netty library | Dev W/O UX | AR-18391 | |

---

## Download

import ARenderDownloads from '@site/src/components/ARenderDownloads';

<ARenderDownloads version="2023.21.0" filter={["rendition", "web-ui", "connector-filenet", "hmi-cm", "plugin-filenet", "plugin-alfresco", "plugin-alfresco-adf", "client-api", "rendition-api"]} />

</div>
