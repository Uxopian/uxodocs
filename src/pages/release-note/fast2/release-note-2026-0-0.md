---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2026-09-15

# To modify
version: "2026.0.0"
major_version: "2026"
latest : true #delete this line if it's not the latest version for this major version
description: "Summary of the changes in version 2026.0.0 of Fast2."
---

## **What's new?**

<br />
Fast2 2026.0.0 is a major release. The user interface has been rewritten in React, the platform moves to Java 21, Spring Boot 4 and OpenSearch 3.5, and Fast2 now ships as Docker images alongside the usual package. Campaigns gain their own parameters, a map can be exposed to several tenants, and the catalog adds AI querying, FlowerDocs deletion and a number of long-standing task fixes.

<br />

_Discover the details below..._

<br />

---
## 🌏 Generic Features & UI

### ✨ New Features
- **React interface**: The whole user interface has been rewritten in React, replacing the Svelte application. Every place — Edit, Run, Explorer, Scheduler, Maps, Libraries, Shared Objects, Servers and Team — has been rebuilt on the Uxopian design system, with the navigation rules between Edit and Run defined explicitly so that a reader keeps their map, version and campaign as they move.
- **Reverse proxy support**: Fast2 can be served from a path rather than the root of a host. A proxy that rewrites the path declares it with `X-Forwarded-Prefix`, and everything else — assets, API calls, routes — follows. Serving from the root is unchanged.

### 🔧 Improvements
- **Maps**: Several maps can be imported or downloaded at once, the import dialog validates with the Enter key, and the map list refreshes itself after a create or an import.
- **Task configuration**: A nested property can be pointed at a shared object, a Pattern field keeps its single-line editor, and a map field whose values are not Strings is now configured through the same editor its declared type deserves.
- **Long map names**: Shown in full through a tooltip rather than truncated without recourse.
- **Libraries**: The JAR import dialog reports progress and refuses a second submission while one is in flight.

### 🐞 Bug Fixes
- **Edit place**: Auto-save on task configuration, map rename, duplication and download have all been restored, along with the notifications that confirm them. Resetting the zoom no longer creates a map version, and deleting a link closes its popup.
- **Explorer**: Returning to task configuration no longer leaves the canvas broken or read-only.
- **Maps overview**: Deleting a map no longer removes the wrong one, and deleting an old version works again.
- **Configuration map**: Deleting the first row of a configuration map no longer crashes the interface.
- **Import**: Error messages are shown when an import is refused, the wording has been corrected, and a corrupted or over-long map description is reported rather than swallowed.

---

## 🔐 Authentication & Team Management

### ✨ New Features
- **Multitenancy**: A Fast2 instance can serve several tenants, each with its own maps, campaigns and members.

### 🔧 Improvements
- **Worker registration**: The public worker registration endpoint has been removed. Workers are registered by an administrator and stored in the database.
- **Worker tokens**: The `/generate-token` endpoint now answers 404 for an unknown worker instead of silently issuing a token, and its request parameter has been renamed to `workerLogin`.

### 🐞 Bug Fixes
- **Sessions**: A refresh no longer disconnects the user, and the interface no longer hangs at launch.
- **Registration**: A newly registered user is signed in as expected, the error messages are clearer, and checking whether an address already exists no longer raises a cascade of exceptions.

---

## ⚙️ Technical & Configuration

### ✨ New Features
- **Docker**: Fast2 is published as Docker images for the broker and the worker, built and pushed by the CI, and the QA and demo environments are built from those images.
- **Uxopian AI**: An AI Query task is available in the catalog, and Uxopian AI is integrated into the interface as a web component. The task takes a connection provider, so its endpoint is configured like any other.

### 🔧 Improvements
- **Java 21**: Fast2 now runs on JDK 21.
- **Spring Boot 4**: The broker and worker have moved from Spring Boot 2 to Spring Boot 4, with the `javax` libraries replaced by their `jakarta` equivalents.
- **OpenSearch 3.5**: The embedded store moves from 1.3.15 to 3.5.0. Existing data is migrated in place. The broker keeps working while OpenSearch is down and recovers on its own when it returns, instead of latching into a dead state or looping on a counter.
- **Packaging**: The package no longer carries OpenSearch Dashboards, which is repackaged on demand and will return as a sidecar. The Linux startup scripts have been reworked, and the SDK package embeds its restricted-access binaries.
- **Dependencies and security**: iText has been removed from the converter, EML and PDF analysis modules; JJWT, Drools, Jackson, Svelte, npm and Node have been upgraded; and the vulnerabilities reported by Mend have been resolved, including those reaching Fast2 through transitive dependencies.
- **Content encryption**: Can be turned off where a deployment does not want it.

### 🐞 Bug Fixes
- **JSTransform**: Works again, warns when it is not running under a GraalVM JDK, and no longer fails on newer JDKs.
- **Queues**: Are initialised correctly after a broker restart, and can be assigned to a custom task.
- **External workers**: The initialisation sequence no longer fails when a worker starts faster than the broker expects.
- **Pattern resolution**: Patterns in a `fast2` file are resolved again.
- **Remote access**: The interface can be reached from another machine with the default configuration, and the OpenJDK path used by Microsoft is part of the standard paths searched.
- **Downloads**: Contents can be downloaded from the broker again.

---

## 🚀 Campaigns & Scheduler

### ✨ New Features
- **Campaign parameters**: A campaign can carry its own parameters, defined on the map and overridden for a single run. A key can be created without a default value, invalid characters are reported as you type, and the parameters of a running campaign are read-only.

### 🔧 Improvements
- **Scheduler**: A short cron no longer starts a job that overlaps the previous run.

### 🐞 Bug Fixes
- **Resume**: A campaign with more than ten tasks can be resumed.
- **TriggerCampaign**: Triggers correctly on an instance with authentication enabled.
- **Run place**: Campaigns are sorted in the selector, and the statistics request stops once a campaign has finished.
- **Scheduler**: Jobs can be downloaded again.

---

## 📚 Places & Data Model

### 🔧 Improvements
- **Punnet properties**: A property name or value can no longer be null. The sentinel value introduced to work around it has been removed.
- **Explorer**: The column manager offers every category a punnet carries.
- **Catalog**: `AlterDocumentProperty` is marked deprecated in favour of `AlterDocumentProperties`, where a reader can see it.
- **CSV exports**: Headers omit the redundant `doc.` prefix for single-document punnets, columns can be filtered by whitelist or blacklist, and the deprecated "New column headers" parameter has been removed.
- **FlowerDocs**: A delete task has been added, and the querier can extract `selectClause` fields directly into the punnet dataset.
- **Converters**: The HTML-to-PDF converter processes child documents, and Eml2Pdf takes the language as a parameter.

### 🐞 Bug Fixes
- **Punnet serializer**: No longer produces an inconsistent dataset.
- **Punnet viewer**: Stays on the rendering the reader asked for instead of returning to the JSON tree when the punnet finishes loading.
- **RenameDocumentProperties**: A renamed multivalued property keeps its values, a missing property is skipped with a warning instead of raising an exception, and the workflow property is no longer mandatory.
- **Map versioning**: A version is created only when something has changed, and two maps whose names differ only by case are no longer treated as one.
- **Tiff2PdfBox**: The memory leak in the random-access interface has been fixed, and `Tiff2PdfIText` has been removed in its favour.
- **AWS**: The thread leak in the connection provider has been fixed, along with the prefix error.
- **FileNet**: Extraction no longer fails on a class cast in log4j, and a document holding two versions of different document classes is handled.
- **FlowerDocs**: Annotations can be extracted without the `org.eclipse.persistence` dependencies, and facts with empty values are extracted rather than refused.

---

## ⚠️ Upgrading to 2026.0.0

- **Java 21 is required.** Earlier JDKs are not supported.
- **OpenSearch is migrated in place** from 1.3.15 to 3.5.0 on first start. Back up the data directory before upgrading.
- **OpenSearch Dashboards is no longer shipped** with the package. It returns as a separately installed sidecar.
- **The public worker registration endpoint has been removed.** Workers must be declared by an administrator.
- **`/generate-token` renames its parameter** from `workerLabel` to `workerLogin`, and answers 404 for an unknown worker.
- **`AlterDocumentProperty` is deprecated.** Use `AlterDocumentProperties`.
- **`Tiff2PdfIText` has been removed.** Use `Tiff2PdfBox`.
- **Null property names and values are refused.** Maps relying on the previous `null_value` sentinel must be reviewed.

---

## 🧠 Known Issues

- **Retry Punnet**: Retrying all punnets may fail if it is done twice in a row on the same task.
- **Libraries**: A browser refresh is required to see tasks from a newly imported JAR in the catalog.
- **Authentication**: Linux doesn't auto-logout on Fast2 kill.
- **Undo/Redo**: Undo may leave ghost tasks or fail to revert config until place is reloaded.
- **Punnet Tracker**: `Copy to clipboard` currently non-functional.

---

## 🧑💻 Support Tickets Included in this Release

| Support Tickets | Solved by | Summary                                          |
| --------------- | --------- | ------------------------------------------------ |
| TMAFAST-938     | FAST-5703 | Retrieve data from the FlowerDocs querier task    |
| TMAFAST-948     | FAST-5719 | The Punnet Serializer can create inconsistent dataset |
| TMAFAST-959     | FAST-5731 | AWS prefix error                                 |

---
