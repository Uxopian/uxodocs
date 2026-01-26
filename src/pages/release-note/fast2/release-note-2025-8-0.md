---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2025-12-05

# To modify
version: "2025.8.0"
major_version: "2025" 
description: "Summary of the changes in version 2025.8.0 of Fast2." 
---

## **What's new?**

<br />
We are excited to introduce Fast2 version 2025.8.0! This release focuses heavily on enhancing our ecosystem of connectors. The FlowerDocs integration receives significant updates with new querying capabilities and smarter injection, while the Documentum connector benefits from more robust and flexible SSH connectivity options.

Discover the details of what's new below, organized by functional area.

<br />

_Details below..._

<br />

---
## 🌏 Generic Features & UI

### 🐞 Bug Fixes
- **Explorer Place**: Resolved an issue where certain existing columns could not be selected for display in the results view.

---

## 🔐 Authentication & Team Management

*No change happened in this category for this release.*

---

## ⚙️ Technical & Configuration

### ✨ New Features
- **FlowerDocs Connector**: A new 'FlowerDocsQuery' task has been added, allowing users to perform queries directly against a FlowerDocs repository. This task was previously added to the 2.12 version of Fast2.
- **FlowerDocs Connector**: ~~A new 'FlowerDocsIndexPlainText' task can update the plain text property of a document and trigger a new indexation of the document. This can be used to allow plain text research on FlowerDocs documents.~~ *(This feature did not pass the QA phase and is therefore postponed to a next release.)*

### 🔧 Improvements
- **FlowerDocs Injector**: Improved data integrity by automatically fetching the scope/class datamodel to filter data based on target tags. Previously users had to statically define a blacklist or whitelist to prevent failures due to trying to inject document properties when there was no corresponding tag in FlowerDocs.
- **FlowerDocs Injector**: The configuration interface has been cleaned up by removing the obsolete 'category' field.
- **FlowerDocs Connector**: General usability improvements have been applied across the entire FlowerDocs module.
- **Documentum Connector**: The SSH connection mechanism has been significantly improved. It is now optional, triggers commands before execution, and utilizes a more robust heartbeat/timeout strategy for better stability.
- **Nuxeo Connector**: Enhanced the Nuxeo injection connector with more detailed logging and improved general usability.

### 🐞 Bug Fixes
- **FlowerDocs Source**: Fixed a regression where metadata was not being extracted correctly when retrieving a FlowerDocs object.
- **FlowerDocs Extractor**: Resolved an OpenSearch mapping error regarding the creation date field.

---

## 🚀 Campaigns & Scheduler

*No change happened in this category for this release.*

---

## 📚 Places & Data Model

*No change happened in this category for this release.*

---

## 🧠  Known Issues

- **Retry Punnet**: Retrying all punnets may fail if it is done twice in a row on the same task (fix planned).
- **Libraries**: A browser refresh is required to see tasks from a newly imported JAR in the catalog (fix planned).
- **Authentication**: Linux doesnâ€™t auto-logout on Fast2 kill (fix planned).
- **Trigger Campaign Task**: API call blocked unless security is disabled (fix planned).
- **Undo/Redo**: Undo may leave ghost tasks or fail to revert config until place is reloaded.
- **Punnet Tracker**: `Copy to clipboard` currently non-functional.

---

## 🧑💻 Support Tickets Included in this Release

| Support Tickets | Solved by | Summary                                                                  |
|-----------------|-----------|--------------------------------------------------------------------------|
| TMAFAST-730     | FAST-5192 | New Task: FlowerDocsQuery                                                |

---