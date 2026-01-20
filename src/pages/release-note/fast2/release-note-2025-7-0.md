---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2025-11-07

# To modify
version: "2025.7.0"
major_version: "2025"
latest: true #delete this line if it's not the latest version for this major version
description: "Summary of the changes in version 2025.7.0 of Fast2."
---

## **What's new?**

<br />
We are excited to introduce Fast2 version 2025.7.0! This release introduces a new task for interacting with external systems and enhances existing capabilities to offer more flexibility.

Discover the details of what's new below.

<br />

### 💡 Important Note on Release Scope

We are excited to introduce Fast2 version 2025.7.0! This new release brings the long-awaited Temporary File Encryption feature, significantly enhancing platform security. It also includes new diagnostic tools, major improvements to the Scheduler, and numerous fixes.

Discover the details of what's new below, organized by functional area.

<br />

_Details below for the other features..._

<br />

---

## 🌏 Generic Features & UI

### 🔧 Improvements

- **Task Configuration**: The user experience for creating and managing queues has been completely redesigned for better usability and migrated to Svelte 4.

### 🐞 Bug Fixes

- **Drop-down Menus**: Corrected a visual regression on the 'Select All' and 'Clear All' buttons.
- **Punnets Management**: Punnet management will no longer fail when a document has more than 500 versions. Backported to a potential version 2.12.5 if it needs to be published. Note that due to the architecture of the queue management system and the need to load punnets in the broker memory, there is still a soft limit to the number of versions of documents in a punnet. It is strongly advised to limit the number of versions to less than a few hundreds, users being unlikely to read such a large volume of different versions of a document.

---

## 🔐 Authentication & Team Management

### 🔧 Improvements

- **Logging**: Error logging for JWT (JSON Web Tokens) has been improved for clearer debugging when issues occur.

### 🐞 Bug Fixes

- **Logging**: Fixed an issue that generated an excessive amount of logs when the authentication module was disabled.
- **Workers**: Resolved a startup problem that occurred when launching the broker after an external worker while authentication was enabled.

---

## ⚙️ Technical & Configuration

### ✨ New Features

- **Security**: End-to-end encryption for all temporary files generated or used by Fast2 is now available. This feature, postponed from the last release, has passed all quality tests and significantly enhances data security.
- **Diagnostics**: Fast2 will now automatically generate a heap dump file in the event of an 'Out of Memory' crash, facilitating easier analysis and debugging of memory-related issues.

### 🔧 Improvements

- **REST Connector**: The Generic REST API task has been enhanced to support the POST method, including sending a request body. Field names and descriptions have also been clarified.
- **FlowerDocs Connector**: The FlowerSource connector can now correctly resolve patterns.

### 🐞 Bug Fixes

- **OpenText Connector**: Fixed a regression from the 2025.6.0 release where the OpenText connector's blacklist was incorrectly functioning as a whitelist.
- **ZipSource Task**: Resolved a memory leak and fixed a configuration error where no fields were displayed for the task.
- **Embedded Database**: Fixed an issue where annotation ID values were not being correctly serialized.
- **Worker Configuration**: Workers now correctly use the memory settings declared in `env.properties` for auto-start.
- **API Documentation**: The Swagger (OpenAPI) documentation has been cleaned up for all controllers to be more accurate and clear.

---

## 🚀 Campaigns & Scheduler

### 🔧 Improvements

- **Job Configuration**: Job configurations from the Scheduler can now be exported and imported, allowing for easier backup and migration.
- **Email Reports**: It is now possible to configure a specific "From" email address to be used for sending campaign statistics reports.

### 🐞 Bug Fixes

- **Import**: Fixed an issue that allowed importing a scheduled job with the same name as an existing one, which could cause conflicts.

---

## 📚 Places & Data Model

### 🐞 Bug Fixes

- **Explorer Place**: Resolved an issue where it was no longer possible to filter on columns after a punnet creation.
- **Explorer Place**: The Explorer is now able to display results even when the underlying data size is exceptionally large (exceeding the maximum integer limit).

---

## 🧠 Known Issues

- **Retry Punnet**: Retrying all punnets may fail if it is done twice in a row on the same task (fix planned).
- **Libraries**: A browser refresh is required to see tasks from a newly imported JAR in the catalog (fix planned).
- **Authentication**: Linux doesn’t auto-logout on Fast2 kill (fix planned).
- **Trigger Campaign Task**: API call blocked unless security is disabled (fix planned).
- **Undo/Redo**: Undo may leave ghost tasks or fail to revert config until place is reloaded.
- **Punnet Tracker**: `Copy to clipboard` currently non-functional.

---

## 🧑‍💻 Support Tickets Included in this Release

| Support Tickets | Solved by | Summary                                                                  |
| --------------- | --------- | ------------------------------------------------------------------------ |
| [TMAFAST-859](https://arondor.atlassian.net/browse/TMAFAST-859)     | [FAST-5444](https://arondor.atlassian.net/browse/FAST-5444) | Failing to extract dctm extractor if document has more than 500 versions |
| [TMAFAST-840](https://arondor.atlassian.net/browse/TMAFAST-840)     | [FAST-5397](https://arondor.atlassian.net/browse/FAST-5397) | Failed Authentication Warning in Fast2-2025                              |
| [TMAFAST-779](https://arondor.atlassian.net/browse/TMAFAST-779)     | [FAST-5193](https://arondor.atlassian.net/browse/FAST-5193) | Not able to send/receive "Email statistics feature" from the Worker P... |

---
