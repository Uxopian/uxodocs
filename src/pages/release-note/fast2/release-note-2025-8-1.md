---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2025-12-19

# To modify
version: "2025.8.1"
major_version: "2025" 
description: "Summary of the changes in version 2025.8.1 of Fast2." 
---

## **What's new?**

<br />
We are releasing Fast2 version 2025.8.1. This is a critical patch release focused on platform stability and security. It addresses a severe thread leak, mitigates critical CVEs through library updates, and ensures better data integrity for Shared Objects.

Additionally, this version integrates the OpenText extraction capabilities from the LTS branch.

<br />

_Details below..._

<br />

---
## 🌏 Generic Features & UI

*No change happened in this category for this release.*

---

## 🔐 Authentication & Team Management

*No change happened in this category for this release.*

---

## ⚙️ Technical & Configuration

### ✨ New Features
- **OpenText Connector**: The extraction capabilities for OpenText have been ported from the 2.x-LTS branch to the current 2025 version, ensuring feature parity.

### 🔧 Improvements
- **Security**: Migrated Spring libraries to HeroDevs versions to ensure long-term support and enhanced security compliance.
- **Security**: Addressed and removed critical CVEs to harden the platform against vulnerabilities.

### 🐞 Bug Fixes
- **AWS Connector**: Fixed a huge thread leak in the AWS connection provider that could lead to severe performance degradation or crashes.

---

## 🚀 Campaigns & Scheduler

*No change happened in this category for this release.*

---

## 📚 Places & Data Model

### 🐞 Bug Fixes
- **Shared Objects**: Resolved an issue where the `UpdateSharedObject` task was writing data using an incorrect structure, ensuring data integrity is maintained after updates.

---

## 🧠 Known Issues

- **Retry Punnet**: Retrying all punnets may fail if it is done twice in a row on the same task.
- **Libraries**: A browser refresh is required to see tasks from a newly imported JAR in the catalog.
- **Authentication**: Linux doesnâ€™t auto-logout on Fast2 kill.
- **Trigger Campaign Task**: API call blocked unless security is disabled.
- **Undo/Redo**: Undo may leave ghost tasks or fail to revert config until place is reloaded.
- **Punnet Tracker**: `Copy to clipboard` currently non-functional.

---

## 🧑💻 Support Tickets Included in this Release

| Support Tickets | Solved by | Summary                                                   |
| --------------- | --------- | --------------------------------------------------------- |
| TMAFAST-885     | FAST-5513 | Systematic exception on value update (on Shared Objects). |

---