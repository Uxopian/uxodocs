---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2026-01-13

# To modify
version: "2025.8.2"
major_version: "2025" 
description: "Summary of the changes in version 2025.8.2 of Fast2." 
---

## **What's new?**

<br />
We are releasing Fast2 version 2025.8.2. This minor patch focuses on restoring remote accessibility to the platform and streamlining deployment processes.

<br />

_Details below..._

<br />

---
## 🌏 Generic Features & UI

### 🐞 Bug Fixes
- **Accessibility**: Resolved a regression that prevented users from accessing the Fast2 web interface from a remote server.

---

## 🔐 Authentication & Team Management

*No change happened in this category for this release.*

---

## ⚙️ Technical & Configuration

### ✨ New Features
- **Deployment**: Official Docker images are now deployed and available for the Fast2 2025 version, facilitating containerized environments setup.

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

*Issues fixed in this released version were not submitted by support tickets.*

| Support Tickets | Solved by | Summary                                                   |
| --------------- | --------- | --------------------------------------------------------- |

---