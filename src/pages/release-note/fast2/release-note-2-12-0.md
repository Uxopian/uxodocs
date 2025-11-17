---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2024-05-20

# To modify
version: "2.12.0" # ex of format: 2.2.1
major_version: "2" # minor version of the release note    ex: 2.2
description: "Bugfix and a lot of evolutions" # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---


## **What's up ?**

<br />
The 2.12.0 version is the last minor version before the next major one !!!

Thanks to your feedback, bugfix has been our priority.
A lot of evolutions have still been done.

You will find a new EmbeddedDBSource connector, better quality of tasks and the Explorer Place.


And much more !
<br />
_Details below..._

<br />

## <b>Global</b>

##### Evolution

EntropicPersistent: Campaigns run well on same queue even if one of them is deleted

Json punnet: Improve serialization robustness and retrocompatibility

Json punnet: Single universal format during serialization to support all metadata format

OpenSearch: Upgrade from 1.3.1 to 1.3.15 version

Security: Upgrade other minor versions of dependencies


##### Solved Issue

Database: Internal Opensearch supports Date-type metadata

Startup: Receive a reasonable number of warning logs when jcmd is not found

Map update: “Date modified” in local is updating only when map is modified (and not when it is used)

<br />

## <b>Catalog</b>

##### New feature

New: EmbeddedDBSource, a source for our embedded OpenSearch

##### Evolution

AlterDocumentProperties: Add boolean to delete old properties

FlowerInjector: Flower connection provider is multi-thread safe

FlowerInjector: Have a whitelist of document properties to inject


##### Solved Issue

CSV Source: Parse special characters correctly

LocalSource : Parse a JSON file with special characters correctly

FlowerInjector: Supports multi thread with components

IDMISContentExtractor: Update ImageServices extractor for Fast2 2.x

wkHtmlToPdfConverter: Better conversion robustness


##### Regression

DctmContentExtractor: Fix memory management to support big amount of documents

LocalSource: Recover the possibility to configure the task with relative path



<br />

## <b>Map construction</b>

##### New feature

Scheduler: Configure maximum number of job executions from the UI

##### Evolution

Scheduler & Email: Standardize fields creation behavior

##### Solved Issue

Link condition: Incorrect configuration sends errors and broker does not freeze anymore

Scheduler: Active box not available before job creation anymore

Scheduler:  job, wait the end of a campaign to start a new one (no overlapping)

##### Regression

Queue: Place refresh and update issues are fixed

<br />

## <b>Run & Explore Data</b>

##### Evolution

Dashboard: Fetch lighter minimal build for OpenSearch Dashboards package

Email: Display relevant information in campaign statistics report

Explorer Place: Add documentId in CSV downloaded from step results

Explorer pop-up: Improve the display of XML punnet

Punnet Tracker: Sort PunnetContext list by previous punnet context ID strengthens the backwork


##### Solved Issue


Database: Backwards compatibility solved with “Run” prefixed renamed “Try” for campaigns

Explorer pop-up: Tooltip “History Punnet” updated to “Punnet Tracker”

Punnet Tracker: Track order issue is fixed with Exception punnets

Punnet Tracker: Stop at the end of the workflow


##### Regression

Explorer Place: Complex data structure is properly present in the downloaded CSV

<br /><br />
_And other minor improvements..._

## <br />

---

<br />
## 🧐 Known issues to be fixed

- Catalog: Collapse with filter does not work with odd number of letters (identified in [v2.9.0](../release-note-2-9-0/))

- Retry punnets: Exception raised when doing a retry on task-_n_ after a retry on task-_(n+1)_ (identified in [v2.9.0](../release-note-2-9-0/))

- Logs: At Broker startup, ACR log level is debug (identified in [v2.10.0](../release-note-2-10-0/))

- Startup: Difficulties to do a cold restart after Fast2 crash (identified in [v2.10.0](../release-note-2-10-0/))
