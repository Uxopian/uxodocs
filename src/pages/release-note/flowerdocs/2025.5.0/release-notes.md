---
title: FlowerDocs 2025.5.0 Release notes
description: FlowerDocs 2025.5.0 Release notes
---

import FlowerDocsDownloads from '@site/src/components/FlowerDocsDownloads';

This version requires the following software prerequisites:

- **ARender**: 2023.21.0
- **Redis**: 6.2.12
- **OpenSearch**: 1.3.19

<br />

**Legend**

- 💻 Native feature
- ⚙️ Feature requiring configuration to be enabled
- 👨‍💻 Feature requiring development to be enabled
- 👑 Premium feature

<br />

## Overview

Version 2025.5.0 is a minor release that includes bug fixes reported by users and integration partners. It also includes the restoration of the Enter key to trigger a search and the update of the ARender viewer to version 2023.21.0.

## Upgrade Notes

The technical changes in this version are detailed in the upgrade notes available [here](../upgrade-notes)

## For users

### 💻 Improved search

Search has been refined to streamline everyday interactions. The **Enter** key once again triggers a search directly from the form — a shortcut expected by users that had been disabled during accessibility work (WCAG). Field input has also been corrected: spaces no longer cause search criteria to disappear in text fields.

### 💻 ARender version update to 2023.21.0

The ARender viewer embedded in FlowerDocs has been updated to version 2023.21.0. This update covers versions 2023.18.0 through 2023.21.0 and includes several fixes and improvements:

- PDF form checkboxes are now correctly displayed in the viewer.
- Arrow annotations now work correctly: comments are no longer lost after saving, and the ghost broken-image icon no longer appears on creation.
- Conversion of large Office documents (DOCX) is significantly faster for environments using DirectOffice.

## For integrators

No specific changes have been made. This version benefits from all the fixes listed in the bug fixes section.

## For operators

### 💻 Improved user cache management

User cache purging has been improved: when a group is modified, only the affected group and its members are purged from the cache, instead of purging the entire cache. Cache reconstruction after a purge now correctly includes the user's groups.

### 💻 Security Enhancements (CVE Fixes)

Several CVEs have been addressed in this version. Specific details are withheld to protect against exploit attempts.

## Bug fixes

| Bug | Ticket |
| :---- | :---- |
| **Users** |  |
| Search — Typing a space in a text field no longer causes search criteria to disappear | FD-18235 / TMAFLW-1210 |
| Shortcuts — The "+" shortcut creation button is now displayed even when all shortcuts are configured in JavaScript | FD-18383 / TMAFLW-1167 |
| Document — Downloading a document with annotations now works correctly | FD-18247 / TMAFLW-1233 |
| **Integrators** |  |
| Administration — Adding a user to a group where a member has been deleted no longer generates an error 500 | FD-18263 / TMAFLW-1280 |
| History — Mass reassignment no longer duplicates history entries on each task | FD-18246 / TMAFLW-1316 |
| Operation Handlers — Handlers now trigger reliably (fix for a random non-triggering issue) | FD-18262 / TMAFLW-1161 |
| Operation Handlers — An explicit log is now generated when a handler does not trigger due to insufficient ACLs | FD-18384 / TMAFLW-1106 |
| **Operators** |  |
| Cache — User cache population after a purge now correctly includes groups | FD-18418 / TMAFLW-1333 |
| Cache — Cache purge on group modification is now targeted and no longer purges the entire cache | FD-18401 / TMAFLW-1333 |

## Known issues

No known issues specific to this version.

## FlowerDocs eProcess

### Overview

No specific changes have been made to this version. It benefits from all the fixes and improvements made to FlowerDocs.

## FlowerDocs GEC

### Overview

No specific changes have been made to this version. It benefits from all the fixes and improvements made to FlowerDocs.