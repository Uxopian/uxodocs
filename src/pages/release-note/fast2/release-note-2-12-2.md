---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2024-12-05

# To modify
version: "2.12.2" # ex of format: 2.2.1
major_version: "2" # minor version of the release note    ex: 2.2
description: "Bugfix before next major version" # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---


## **What's up ?**

<br />
The 2.12.2 is a corrective version of 2.12.0.
We took the opportunity to add tasks and evolutions in Catalog.
Next major version is coming soon !!!

<br />
_Details below..._

<br />

## <b>Catalog</b>

##### New feature

New task: ComparePunnets, compare documents and data between source and injector

New task: EmbeddedDbQuery, like CSVQueryTask but for embedded OpenSearch database

New task: PunnetCounter, count punnets as they go thru the task

New task: MFilesInjector, new connector for M-Files through its API REST

##### Evolution

AlterDocumentContent: Skip 'check if file exists' when using wildcards for content path

ArchiveBuilder: One zipped, delete source files from disk used

EmbeddedDBSource: Be able to extract more than 10 000 entries

FileNetInjector: Complete logs with advice on DateParseError

FlowerInjector: Be able to put `${map}` into the scope edit box

##### Solved Issue

AwsContentSource: Support data with null value extraction

AwsInjector: Support content without mime-type or content-type

ConvertISToXFDF: Encrypted PDF can now go through the task

DctmContentExtractor: Be able to extract large content >750 MB

DctmContentExtractor: Support Multivalued attribute a_effective_date of type 4

DeleteContent: Solve issue with HashSignTask which prevent content deletion

FileNetInjector: Prevent mapping folder in superseded version of multiversion document

IDMISContentExtractor: Force task to break when JDK8 32-bits in now correctly configured

LocalSource: Skip Exception when parse Json does not work

<br />

## <b>Run & Explore Data</b>

##### Solved Issue

Parsing: Support null properties for data in model

## <br />

---

<br />
## 🧐 Known issues to be fixed

- Catalog: Collapse with filter does not work with odd number of letters (identified in [v2.9.0](../release-note-2-9-0/))

- Retry punnets: Exception raised when doing a retry on task-_n_ after a retry on task-_(n+1)_ (identified in [v2.9.0](../release-note-2-9-0/))

- Logs: At Broker startup, ACR log level is debug (identified in [v2.10.0](../release-note-2-10-0/))

- Startup: Difficulties to do a cold restart after Fast2 crash (identified in [v2.10.0](../release-note-2-10-0/))
