---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2025-10-03

# To modify
version: "2025.6.0"
major_version: "2025" 
description: "Summary of the changes in version 2025.6.0 of Fast2." 
---

## **What's new?**

<br />
We are excited to introduce Fast2 version 2025.6.0! This release introduces a new task for interacting with external systems and enhances existing capabilities to offer more flexibility.

Discover the details of what's new below.

<br />

### 💡 Important Note on Release Scope

The File Encryption feature, which was planned for this version to encrypt all temporary files, did not pass our final quality assurance tests. To ensure platform stability, we have decided to postpone its release. It will be integrated into the next version after further validation.

<br />

_Details below for the other features..._

<br />

---
## 🌏 Generic Features & UI

No change has been operated on this part.

---

## 🔐 Authentication & Team Management

No change has been operated on this part.

---

## ⚙️ Technical & Configuration

### ✨ New Features
- **REST Connector**: A new generic task to consume REST APIs has been added, initially supporting the GET method.

### 🔧 Improvements
- **REST Connector**: The new REST API task has been enhanced to also support the DELETE method.
- **PatternResolver**: This configuration task now supports multi-value data, allowing for more complex data manipulation.
- **Serialization**: Content is now serialized with its corresponding file extension, improving how data is handled and identified.
- **Codebase**: The entire project has been reformatted to ensure code style consistency and improve readability.

### 🐞 Bug Fixes
- **Development Environment**: Fixed a build issue that occurred specifically on Windows operating systems.

---

## 🚀 Campaigns & Scheduler

No change has been operated on this part.

---

## 📚 Places & Data Model

No change has been operated on this part.

---

## 🧠 Known Issues

- **OpenText Connector**: A regression was introduced, earlier in this major version, that could not be detected due to an issue with our integration test execution following the migration from JUnit 4 to JUnit 5. A fix has been prepared and will be available in the next version.
- **Retry Punnet**: Retrying all punnets may fail if it is done twice in a row on the same task (fix planned).
- **Libraries**: A browser refresh is required to see tasks from a newly imported JAR in the catalog (fix planned).
- **Authentication**: Linux doesn’t auto-logout on Fast2 kill (fix planned).
- **Trigger Campaign Task**: API call blocked unless security is disabled (fix planned).
- **Undo/Redo**: Undo may leave ghost tasks or fail to revert config until place is reloaded.
- **Punnet Tracker**: `Copy to clipboard` currently non-functional.

---

## 🧑‍💻 Support Tickets Included in this Release

No change in this version deals with a support ticket.

---

## ⚠️ Erratum
- **Connectors**: Contrary to what was communicated lately, there is no new JSON Parsing task in this release. This false information was published due to an incorrect status on a cancelled ticket.
