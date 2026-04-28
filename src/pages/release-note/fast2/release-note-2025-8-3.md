---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2026-04-01

# To modify
version: "2025.8.3"
major_version: "2025" 
description: "Summary of the changes in version 2025.8.3 of Fast2." 
---

## **What's new?**

<br />
We are releasing Fast2 version 2025.8.3. This patch release addresses a critical regression in file handling, resolves dependency issues for FlowerDocs extractions, and backports important architectural improvements for worker registration from our upcoming major release.

<br />

_Discover the details below..._

<br />

---
## 🌏 Generic Features & UI

*No change happened in this category for this release.*

---

## 🔐 Authentication & Team Management

*No change happened in this category for this release.*

---

## ⚙️ Technical & Configuration

### 🔧 Improvements
- **Workers**: Backported the worker registration refactoring from the upcoming 2026 version to significantly enhance security. The `WorkerController` no longer exposes open registration endpoints. As a result, external workers now require a specifically generated authentication token (passed via the `WORKER_AUTH_TOKEN` environment variable) to securely register and connect to the broker.
- **Fast2-SDK**: The SDK package is now distributed as a "fat JAR" containing all necessary transitive dependencies. This resolves an issue where customers were blocked from compiling custom modules due to restricted access to internal Artifactory repositories. Customers can now easily install the SDK locally without requiring special credentials.

### 🐞 Bug Fixes
- **LocalSource Task**: Fixed a critical regression that caused massive disk usage during large migrations. Input files were systematically being physically copied to the shared folder due to the file encryption mechanism triggering unconditionally. Files are now efficiently referenced by their absolute paths without being copied. Additionally, content encryption is now disabled by default to simplify deployments.
- **FlowerDocs Extractor**: Resolved an issue that prevented the extraction of FlowerDocs annotations. The required `org.eclipse.persistence` libraries (core, moxy, asm, antlr) are now shipped by default in the `libs-bundle`, eliminating the need for users to add them manually.

---

## 🚀 Campaigns & Scheduler

*No change happened in this category for this release.*

---

## 📚 Places & Data Model

*No change happened in this category for this release.*

---

## 🧠 Known Issues

- **Retry Punnet**: Retrying all punnets may fail if it is done twice in a row on the same task.
- **Libraries**: A browser refresh is required to see tasks from a newly imported JAR in the catalog.
- **Authentication**: Linux doesn't auto-logout on Fast2 kill.
- **Trigger Campaign Task**: API call blocked unless security is disabled.
- **Undo/Redo**: Undo may leave ghost tasks or fail to revert config until place is reloaded.
- **Punnet Tracker**: `Copy to clipboard` currently non-functional.

---

## 🧑💻 Support Tickets Included in this Release

| Support Tickets | Solved by | Summary                                                   |
| --------------- | --------- | --------------------------------------------------------- |
| TMAFAST-925     | FAST-5688 | FlowerDocs Connector - annotations extraction fails       |

---