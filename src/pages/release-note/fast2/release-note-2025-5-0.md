---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2025-09-05

# To modify
version: "2025.5.0"
major_version: "2025"
description: "Summary of the changes in version 2025.5.0 of Fast2."
---

## **What's new?**

<br />
We are excited to introduce Fast2 version 2025.4.1! This new release brings highly anticipated features, as well as numerous improvements and fixes aimed at strengthening the platform's stability, security, and user experience.

Discover the details of what's new below, organized by functional area.

<br />

Note: due to a critical issue in the final packaging of the 2025.4.0, it will never be released, and is replaced by the current 2025.4.1 version.

<br />

_Details below for the other features..._

<br />

---

## 🔍 Feature Highlight: (beta) Folders in CSVWriter

Dus to several requests from our customers, we included a new feature for the CSVWriter task: **add Folder Metadata**.

### What is it?

This new feature allows you to add Folder metadata while writing a punnet down to a CSV file. Some customers realized that part of the metadata in the source ECM environment wasn't located on the documents but on the folders the documents are in. This can often happen when your ECM environment uses folders as contracts, clients, or claims folders. The id of the business object the document is supposed to be attached to is only available on its folder.

Now with a single click, you activate this new option and write the folder metadata alongside the document metadata in your CSV files.

### How to use it?

Activating the option is just a click in the task configuration, in the Fast2 UI. But if you feel like using it, there are limitations you must know about, first.

**Single level of depth**: In the Fast2 model, documents avec be linked to folders which also contain other folders or documents, and so on digging very far in a rich object hierarchy. For performances and scalability purposes, this feature will only consider the first level of hierarchy, basically including the metadata of folders directly containing documents.

**Single combination per CSV line**: the implementation is as follows:

- If a document belongs to several folders, the CSV file will contain one row per unique document/folder combination.
- If a document has no folder, it will appear on a single line with blank folder data values.

This behavior is consistent with an SQL OUTER JOIN between documents and folders, as it includes all documents, even those without a matching folder (unlike the INNER JOIN used between punnets and documents).

<br />

---

## 🌏 Generic Features & UI

### 🔧 Improvements

- **Manage Columns**: The `Clear All` links and default column settings have been harmonized for a more consistent user experience.
- **Libraries**: The user interface for the `Campaign Started` pop-up has been improved for better clarity.

### 🐞 Bug Fixes

- **Tables**: Long text fields are now correctly truncated again to avoid breaking the layout.
- **Sorting**: Alphabetical order is now correctly respected in tables and drop-down lists.

---

## 🔐 Authentication & Team Management

### 🐞 Bug Fixes

- **Team Place**: Fixed a critical issue that prevented resetting passwords, deleting members, or changing member roles.
- **Registration**: It is now possible again to submit the registration form by pressing the `Enter` key.

---

## ⚙️ Technical & Configuration

### 🔧 Improvements

- **Connectors**: The CSVWriter can now append folder data to the output file, and the CSV source now correctly handles whitespaces.
- **Hot Reload**: JAR information is now grouped by groupId to improve clarity.
- **Testing**: The testing framework for connector packages has been migrated to JUnit 5, modernizing the codebase.

### 🐞 Bug Fixes

- **Performance**: Resolved a major memory leak by harmonizing Jackson library versions and upgrading the Spring framework.
- **Tasks**: Fixed an issue where the `ApplyDroolsTask` was not working correctly.
- **Queues**: Fixed an issue in an integration test related to the default queue to improve reliability.

---

## 🚀 Campaigns & Scheduler

No change has been operated on this part.

---

## 📚 Places & Data Model

### ✨ New Features

- **Server Place**: It is now possible to display the JDK version used by each worker.

### 🐞 Bug Fixes

- **Explorer Place**: The `Retry Punnet` feature now works correctly when a date filter is applied.

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

| Support Tickets | Solved by | Summary                                                       |
| --------------- | --------- | ------------------------------------------------------------- |
| TMAFAST-785     | FAST-5345 | Memory leak : Homogeneize jackson versions and upgrade spring |
| TMAFAST-799     | FAST-3807 | (beta) CSVWriter: Append folder data to output csv file       |
| TMAFAST-822     | FAST-5359 | ApplyDroolsTask doesn't work                                  |

## ⚠️ Erratum

- **Connectors**: Contrary to what was published lately, the following improvement is not include in version 2025.5.0: the FileNet connector now supports the `required` property for injection based on the document class.
