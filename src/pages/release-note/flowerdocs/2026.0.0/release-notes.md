---
title: FlowerDocs 2026.0.0 Release notes
description: FlowerDocs 2026.0.0 Release notes
---

import FlowerDocsDownloads from '@site/src/components/FlowerDocsDownloads';

This version requires the following software prerequisites:

- **ARender**: 2026.0.1
- **Redis**: 8.8
- **OpenSearch**: 3.6.0

<br />

## Legend

- 💻 Native feature
- ⚙️ Feature requiring configuration to be enabled
- 👨‍💻 Feature requiring development to be enabled
- 👑 Premium feature

<br />

## Overview

Version 2026.0.0 is a major release that significantly modernizes FlowerDocs' technical foundations with the migration to Spring Boot 4, Spring Framework 6, and OpenSearch 3. It also brings new features for users, including a redesigned CSV export for large data volumes, a smoother search experience, and improved thumbnail display. On the security side, this version includes fixes resulting from a penetration testing campaign and strengthens the platform's protection. Finally, the REST API benefits from a migration to OpenAPI 3 and a complete Swagger reorganization to facilitate the work of integrators and AI agents.

## Upgrade Notes

The major technical changes in this version are detailed in the upgrade notes available [here](../upgrade-notes)

## For users

### 💻 Redesigned CSV export for large data volumes

The CSV export has been entirely redesigned to meet extraction needs on large data volumes, removing the 10,000-result limit from previous versions.

In practice, users select the results to export from a new dialog box, then can continue working while the export runs in the background. A tracking panel centralizes all ongoing exports and allows users to monitor their progress, cancel an export launched by mistake, or restart if needed. Once an export is complete, a notification in the top bar invites the user to download the generated file. Multiple exports can be launched in parallel, each with a clear status: in progress, completed, or failed.

<img src="/img/flowerdocs/release-notes/ExportCSV.gif" alt="Export CSV" width="1200" />
<br /><br />

### 💻 Improved search

Search has been refined to streamline everyday interactions. The **Enter** key once again triggers a search directly from the form — a shortcut expected by users that had been disabled during accessibility work (WCAG). Field input has also been corrected: spaces are now accepted in date fields and no longer cause search criteria to disappear in text fields. Finally, full-text search now recognizes the **"-"** (hyphen) character as a connector rather than an operator, making it possible to find compound terms such as "Claire-Marie" or "self-service."

**Mouse and keyboard user**
<img src="/img/flowerdocs/release-notes/UsingEnterToLauchSearch.gif" alt="Using Enter to launch the search" width="1000" />
<br /><br />

**Keyboard-only user**
<img src="/img/flowerdocs/release-notes/UsingKeyboardSearch.gif" alt="Using the keyboard on the search" width="1000" />
<br /><br />

### 💻 Improved thumbnail display

Thumbnail display has been redesigned to offer a more comfortable and predictable browsing experience.

Previously, all thumbnails loaded simultaneously, producing a "Christmas tree" effect where images appeared randomly on screen. Thumbnails now load progressively in blocks, with a visual indicator in place of images being loaded. Additionally, thumbnail display is now reserved for document views only: it has been removed from task and folder views, where the thumbnail (first page of the first attached document) was often irrelevant and could cause confusion. Sort order after a search is also corrected to respect descending order by creation date, and a default image now replaces the broken image icon when a thumbnail cannot be generated.

<img src="/img/flowerdocs/release-notes/Thumbnails.gif" alt="Displays as card" width="1000" />
<br /><br />

### 💻 ARender version update to 2026.0.1

The ARender viewer embedded in FlowerDocs has been updated to version 2026.0.1. This version provides security enhancements and significant improvements:

- When a zoom is applied to a document for better content visualization, it no longer carries over when viewing another document.
- Hooks are now available to track print and download actions from the viewer, enabling these events to be added to an audit trail.
- Office documents in landscape format are correctly displayed within the viewer.

For more information, see the ARender release notes [here](/release-note/arender/v2026.0.0/release-notes)

### 💻 New banner visual identity

The FlowerDocs banner now displays the Uxopian Software logo and favicon, along with a new background color to reflect the publisher's visual identity.

<img src="/img/flowerdocs/release-notes/BannerLogoUxopian.png" alt="Uxopian logo in the banner" width="600" />
<br /><br />

## For integrators

### 💻 Swagger — Reorganization and migration to OpenAPI 3

The FlowerDocs REST API Swagger has been entirely reorganized into business categories and migrated from Swagger 2 to OpenAPI 3. The goal: allow integrators and partners to quickly find the right endpoint without knowing the product's internal architecture. Each endpoint has been documented with a summary and a detailed description, written to be usable by both human developers and AI agents or MCP (Model Context Protocol) servers.

For more details, see the upgrade notes [here](../upgrade-notes).

### 💻 CSV export — Removal of the synchronous export

The synchronous CSV export, limited to 10,000 results, has been removed in favor of the asynchronous export, which no longer has this limitation. Integrators who directly used the synchronous endpoint to retrieve a CSV file in a single call must migrate to the asynchronous export, which works by submitting a job and then retrieving the file once it is complete.

### 👨‍💻 Renaming "OperationHook" to "RestOperationHandler"

In the Operation Handlers administration interface, the "OperationHook" type has been renamed to "RestOperationHandler" to standardize the naming and clarify the nature of this handler type. This change applies to the administration UI and associated APIs.

### ⚙️ Card display — Configuration decoupled from columns

The configuration of data displayed in card mode (thumbnails) is now independent from the column configuration in list mode. Integrators can separately configure the information visible in each display mode, without one affecting the other.

## For operators

### 💻 Technical foundation modernization

FlowerDocs 2026.0.0 significantly modernizes its technical stack to ensure the security, maintainability, and scalability of the platform:

- **Spring Boot 4 / Spring Framework 7**: major application framework migration
- **OpenSearch 3.6.0**: search engine version upgrade
- **AWS SDK 2.x**: S3 storage SDK migration
- **Plume**: update for Spring Boot 4 compatibility
- **Zuul replaced by Spring Cloud Gateway** for plugin routing

For full details on these changes and their configuration impacts, see the upgrade notes [here](../upgrade-notes).

### 💻 Security hardening

Following a penetration testing campaign, several security fixes and additional protective measures have been implemented. This version also includes the correction of vulnerabilities identified in third-party dependencies (CVEs). The security certificate is available upon request.

### 💻 Performance improvements

Performance optimizations have been carried out on this version, benchmarked with 100 concurrent users and over one million documents.

Common operations (creation, retrieval, update, deletion) are up to 2 times faster, and search up to 4 times faster. This improvement is even more pronounced in the least favorable cases (peak load, complex operations), where response times could occasionally reach several seconds: they now stay under one second, providing a more consistent experience for all users.

Environments using Operation Handlers benefit from the most significant gains. The slowdowns that could occur during creation or retrieval operations triggering chained processing have been eliminated: these operations are now up to 50 times faster in the least favorable cases.

### 💻 Anonymous usage data collection (Mixpanel)

FlowerDocs now includes anonymous usage data collection through the Mixpanel platform, enabled by default. The goal: better understand real-world usage to steer product evolution closer to user needs. This collection, limited to anonymous usage data without any personal or sensitive information, is compliant with GDPR and CCPA. It can be disabled by operators or integrators if needed — see the upgrade notes [here](../upgrade-notes).

From an infrastructure perspective, this feature introduces new outbound network flows from the FlowerDocs platform to Mixpanel servers. Operators must ensure these flows are allowed in their network configuration.

For details on the data collected, see the dedicated documentation. [here](docs\flowerdocs\config\exploit\product-analytics)

### 💻 Production-ready Docker images

The Docker images have been hardened to be more secure and more configurable.

## Bug fixes

| Bug | Ticket |
| :---- | :---- |
| **Users** |  |
| Search — Typing a space in a text field no longer causes search criteria to disappear | FD-18013 / TMAFLW-1210 |
| Shortcuts — The "+" shortcut creation button is now displayed even when all shortcuts are configured in JavaScript | FD-18119 / TMAFLW-1167 |
| Document — Downloading a document with annotations now works correctly | FD-18382 / TMAFLW-1233 |
| Document — When a zoom is applied to a document, it no longer carries over when viewing another document | TMAFLW-1157 |
| Document — Office documents in landscape format are correctly displayed within the viewer | TMAFLW-729 |
| **Integrators** |  |
| ARender — The viewer URL construction no longer duplicates parameters, which could cause display errors in certain configurations | FD-18312 / TMAFLW-1308 |
| Administration — Adding a user to a group where a member has been deleted no longer generates an error 500 | FD-18380 / TMAFLW-1280 |
| History — Mass reassignment no longer duplicates history entries on each task | FD-18381 / TMAFLW-1316 |
| Operation Handlers — Handlers now trigger reliably (fix for a random non-triggering issue) | FD-18379 / TMAFLW-1161 |
| Operation Handlers — An explicit log is now generated when a handler does not trigger due to insufficient ACLs | FD-17868 / TMAFLW-1106 |
| **Operators** |  |
| Cache — User cache population after a purge now correctly includes groups | FD-18416 / TMAFLW-1333 |
| Cache — Cache purge on group modification is now targeted and no longer purges the entire cache | FD-18394 / TMAFLW-1333 |

## Known issues

- Annotations — Unable to edit a "free text" annotation. Once created, the annotation cannot be moved or modified.
- Swagger — Authentication token reset when switching categories within the Swagger.

## FlowerDocs eProcess

### For users

The external access feature has been removed because the feature did not meet users' needs.

Apart from this removal, this version benefits from all the changes and fixes made to FlowerDocs for users.

### For integrators

The eProcess-specific export feature, which allowed exporting data and content from a task, has been removed.

Apart from this removal, this version benefits from all the changes and fixes made to FlowerDocs for integrators.

### For operators

This version includes the migration to Spring Boot 4 and Spring Framework 6, along with FlowerDocs Core. It benefits from all the fixes and improvements made to FlowerDocs for operators.

### Known issues

- Document template — Data automatically populated from FlowerDocs data is not visible in the viewer. Once the document is downloaded, the data is present.

## FlowerDocs GEC

### For users

No specific changes have been made. This version benefits from all the changes and fixes made to FlowerDocs for users.

### For integrators

No specific changes have been made. This version benefits from all the changes and fixes made to FlowerDocs for integrators.

### For operators

This version includes the migration to Spring Boot 4 and Spring Framework 6, along with FlowerDocs Core. It benefits from all the fixes and improvements made to FlowerDocs for operators.

### Known issues

- Document template — Data automatically populated from FlowerDocs data is not visible in the viewer. Once the document is downloaded, the data is present.
- Copy — Unable to access the copied mail from the success notification.

<FlowerDocsDownloads version="2026.0.0" arenderVersion="2026.0.1" />