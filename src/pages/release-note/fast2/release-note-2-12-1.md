---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2024-09-27

# To modify
version: "2.12.1" # ex of format: 2.2.1
major_version: "2" # minor version of the release note    ex: 2.2
description: "Bugfix before next major version" # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---

## **What's up ?**

<br />
The 2.12.1 is a corrective version of 2.12.0.
We took the opportunity to add tasks and evolutions in Catalog.
Next major version is coming soon !!!

<br />
_Details below..._

<br />
## <b>Global</b>

##### Solved Issue

Premature end of campaign: Disable by default fast forward for 2.12.1 version

<br />

## <b>Catalog</b>

##### New feature

New task: CsvJdbcQuery: supports multi-valued data

New task: ConvertDateProperty: make date conversion easier

New task: DeleteFileFromSystem: delete file(s) from local storage

##### Evolution

FileNetContentExtractor: Get FileNet properties from folder object

FlowerInjector: Add a “blackList” property

##### Solved Issue

FlowerInjector: Correctly use the documentIdPattern property

<br />

## <b>Map construction</b>

##### Solved Issue

Avoid NPE when comparing MapConfigurationBean objects

<br />

## <b>Run & Explore Data</b>

##### Solved Issue

Explorer pop-up: When punnet is only composed of a folder without document, I can now see it in punnet structure

## <br />

---

<br />
## 🧐 Known issues to be fixed

- Catalog: Collapse with filter does not work with odd number of letters (identified in [v2.9.0](../release-note-2-9-0/))

- Retry punnets: Exception raised when doing a retry on task-_n_ after a retry on task-_(n+1)_ (identified in [v2.9.0](../release-note-2-9-0/))

- Logs: At Broker startup, ACR log level is debug (identified in [v2.10.0](../release-note-2-10-0/))

- Startup: Difficulties to do a cold restart after Fast2 crash (identified in [v2.10.0](../release-note-2-10-0/))
