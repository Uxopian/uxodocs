---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2026-04-28

# To modify
version: "2025.9.0"
major_version: "2025" 
latest : true #delete this line if it's not the latest version for this major version
description: "Summary of the changes in version 2025.0.0 of Fast2." 
---

## **What's new?**

<br />
This version introduces new Azure Blob Storage connectors, enhances FlowerDocs integrations and CSV exports, expands pattern resolution for deployment-friendly configurations, and resolves multiple edge cases surrounding null/empty metadata. It also brings important security updates and worker tooling refinements.

<br />

_Discover the details below..._

<br />

---
## 🌏 Generic Features & UI

### 🐞 Bug Fixes
- **CSVWriter**: Fixed a configuration UI issue where the "New column headers" field was incorrectly behaving as a broken dropdown. It has been restored to a functional multiline text input.

---

## 🔐 Authentication & Team Management

*No change happened in this category for this release.*

---

## ⚙️ Technical & Configuration

### ✨ New Features
- **Azure Connectors**: Introduced new Azure Blob Storage connectors (inject, source/listing, and content source) to fully support Azure-based migrations and PoCs.
- **FlowerDocs**: The `FlowerDocsQuerier` task can now extract `selectClause` fields directly into the punnet dataset, enabling metadata enrichment without requiring additional queries.

### 🔧 Improvements
- **Configuration Patterns**: Expanded pattern resolution support to allow variables in paths for `CsvJdbcQuery`, `AWSSource`, and `LocalSource`, making configurations much more deployment-friendly.
- **Worker API**: Improved API clarity by renaming the request parameter in the /generate-token endpoint from `workerId` to `workerLabel` in the Swagger and endpoint contract.
- **Security**: Remediated multiple dependency vulnerabilities by bumping several libraries based on recent Mend security scans.

### 🐞 Bug Fixes
- **TriggerCampaign**: Resolved an issue where the task was blocked when broker authentication was enabled. It now fully supports `WORKER_AUTH_TOKEN` bearer authentication, adds a "trigger on last punnet only" option, and prevents logging crashes on lifecycle threads.
- **RenameProperties**: Added an optional "ignore missing properties" setting. The task will now issue a warning and skip the operation instead of throwing an exception when a property to rename is absent.
- **FlowerDocs Extraction**: Workflow and assignee fields are no longer treated as mandatory during task extraction, preventing `NullPointerException` errors and gracefully handling null fields.
- **FlowerDocs Actuator**: The `FlowerContentExtractor` now safely falls back to the legacy service instead of failing when actuator access is missing (e.g., when FlowerDocs 2.4 returns a 401).
- **Empty Metadata Handling**: Fixed serialization failures in the `FlowerContentExtractor` by ensuring facts with empty values are handled safely.
- **Punnet Serialization**: Ensured consistent punnet parsing and serialization for empty properties, preventing downstream deserialization issues in tasks like `LocalSource` and `AWSSource`.

---

## 🚀 Campaigns & Scheduler

*No change happened in this category for this release.*

---

## 📚 Places & Data Model

### 🔧 Improvements
- **CSV Exports**: Cleaned up CSVWriter headers by omitting the redundant "doc." prefix for single-document punnets (the prefix remains active for multi-document punnets to ensure clear disambiguation).

---

## 🧠 Known Issues

- **Retry Punnet**: Retrying all punnets may fail if it is done twice in a row on the same task.
- **Libraries**: A browser refresh is required to see tasks from a newly imported JAR in the catalog.
- **Authentication**: Linux doesn't auto-logout on Fast2 kill.
- **Undo/Redo**: Undo may leave ghost tasks or fail to revert config until place is reloaded.
- **Punnet Tracker**: `Copy to clipboard` currently non-functional.

---

## 🧑💻 Support Tickets Included in this Release

| Support Tickets | Solved by | Summary                                                  |
| --------------- | --------- | -------------------------------------------------------- |
| TMAFAST-917     | FAST-5644 | CSVWriter version fast2_2025                             |
| TMAFAST-926     | FAST-5644 | CSVWriter : new column headers non renseignable          |
| TMAFAST-935     | FAST-5702 | Donnée "Workflow" non obligatoire                        |
| TMAFAST-938     | FAST-5703 | Retreive data from the FlowerDocs querier task           |
| TMAFAST-942     | FAST-5718 | Add pattern for CsvJdbcQuery + AWS Source + Local source |
| TMAFAST-944     | FAST-5708 | Détection de version sur FlowerContentExtractor          |

---