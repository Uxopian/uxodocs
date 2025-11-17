---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2023-12-13

# To modify
version: "2.11.0" # ex of format: 2.2.1
major_version: "2" # minor version of the release note    ex: 2.2
description: "New connectors and UX improvement" # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---

:::warning
Backwards compatibility issue concerning the database between 2.11.0 and other versions.

The backwards/upwards catalog compatibility remains untouched.

Wait for 2.12.0 or contact us.
:::

<br />

## **What's up ?**

<br />
The 2.11.0 version offers new FlowerDocs and OpenText connectors !

The user experience is the priority of Fast2 team. Work has been done to give you:

- Harmonious Email and Job places

- Easier map construction with more information displayed

- New name and icone for the configuration place

- Cleaner Explorer Place

And much more !
<br />
_Details below..._
<br /><br />
📺 _Will be shown at the Release party - 2024 Q1_
<br />

## <b>Global</b>

##### Evolution

Homogeneous behavior when renaming with invalid map, campaign, job or email name

##### Solved Issue

Give access to 3rd party code from internet to Fast2 interface

Prevent `jcmd not found` to disturb broker starting procedure

Clean logback libs duplicates in workerlibs and worker package

Worker: Be sure it is embedded by default

<!-- Worker: Fix unit test related to Spring -->

<br />

## <b>Catalog</b>

##### New feature

New: FlowerDocs extractor

New: FlowerDocs injector

New: OpenText extractor

##### Evolution

AlfrescoRestInjector: Create tree structures during content updating

AlfrescoRestInjector: Update properties of parent when content is moved in Alfresco

Annotations: Improve unit tests for annotation conversion

AWSSource or CSVSource: Handle corrupted headers for CSV files

Tesseract: Handle page rotation 📺

TesseractInvoker: Handle multiple documents in punnet

##### Solved Issue

CMSource: Support extraction of Custom Properties

CSV and AWS Source: NotCompliantMBeanException error was displayed in log

JSTransform: Encode properly special characters

OpenText Injector: Solve injection exception after 10'000 docs

OpenText Injector: No more concurrent-modification exceptions with multithreading

OpenText Injector: Punnets well processed in OpenText incremental injection

Wang annotations: Convert annotations placed at the edge of the page

<br />

## <b>Map construction</b>

##### New feature

Task config: Bring patch version in UI 📺

Canva: Display the primary task name if renamed 📺

Shared Object: Improve save experience - Rollback the Save button

##### Evolution

Map: Improve Default Map

##### Solved Issue

Canva: Changing the task type in config task changes the original name in task widget

Canva: Improved contrast of the original task name with Punnet Tracker highlight
<br /><br /><br />

## <b>Run & Explore Data</b>

##### Evolution

Campaign: Rename _"Try"_ with _"Run"_ suffix when executing

“Configuration place” renamed “Object Boards” and improved icon

Email: Add _"Create"_ button to create an object and warn empty mandatory fields 📺

Explorer Place: Displayed only popular columns by default 📺

Explorer Place: Fetch all column values when select column in list

Scheduler job: Add _"Create"_ button and warn when mandatory fields are not set📺

##### Solved Issue

Email: No more NPE during email parsing

Email: Same email can be created only once and no more delete issues

Email: Right toast message is displayed when trying to Create email with wrong typo

Explorer Place: No need to click twice on column to get available fields or sort the datatable

Explorer Place: No 2nd _"Exception class"_ column appears when refreshing table

Explorer Place: Prevent “Document name” column to display when document has no `name` metadata

<br /><br /><br />
_And other minor improvements..._

## <br />

---

<br />
## 🧐 Known issues to be fixed

#### Planned to be fixed in next releases

- Scheduler: Job does not wait the end of campaign to start a new one when job action is `START_AS_NEW` (identified in [v2.10.0](../release-note-2-10-0/))

- Startup: Difficulties to do a cold restart after Fast2 crash (identified in [v2.10.0](../release-note-2-10-0/))

- Queues: Refresh Server Place displays empty queues table (identified in [v2.10.0](../release-note-2-10-0/))

- Explorer pop-up: XML view should display correct information like the output XML file (identified in [v2.11.0](../release-note-2-11-0/))

#### Lower priority

- Catalog: Collapse with filter does not work with odd number of letters (identified in [v2.9.0](../release-note-2-9-0/))

- Retry punnets: Exception raised when doing a retry on task-_n_ after a retry on task-_(n+1)_ (identified in [v2.9.0](../release-note-2-9-0/))

- Logs: At Broker startup, ACR log level is debug (identified in [v2.10.0](../release-note-2-10-0/))

- Explorer place : only `String`-type data are searchable in the columns. `punnetId` and `Date` values are not usable.
