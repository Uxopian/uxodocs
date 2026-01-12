---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2023-09-01

# To modify
version: "2.10.0" # ex of format: 2.2.1
major_version: "2" # minor version of the release note    ex: 2.2
# description : "Stop and restart workers from UI, Filenet injector improvement, addition of Documentum extractor" # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---

### New feature

Entropic Persistent: Faster queueing and consuming of queued punnets

Fast Forward: Optimize broker-worker communication

JSON Punnet: Support null values in arrays of data values

#### User Experience

Performance reports in Server Place

Punnet Explorer Place: Display punnet in XML or JSON

Punnet Explorer Place: Download punnet in XML

#### Tasks

AlfrescoRestDeleteNode: New task to delete documents after injection

AWSSource: Process CSV files as punnets list

ConvertWangToXFDF: Manage annotations on several pages document

DeduplicatePunnets: New task to delete duplicated punnets (based on some pattern )

GenericConvertDoc: Specify the location of format-dependent arguments

### Evolution

Campaign: Handle transition statuses (Starting and Stopping) in case of brutal broker shutdown

Campaign: Requeue all processing punnets when campaign stops

Shutdown embedded processes when shutdown Fast2

Worker: Standardize task configuration exception

#### User Experience

UI: Resize control buttons on Configuration Place

UX: Remove the shortcut of the macaron Processing to the Explorer Place

UX: Update the documentation link

#### Tasks

AlfrescoInjector: Increase timeout

Annotation: Improve scaling conversion from CM to P8 format

DeduplicatePunnets: Deal with very large amounts of data without running out of memory

JSTransform : Output println and console.log in the worker logs

Opentext: Injector handles document versioning

RandomSource: Creation of each data type supported by Fast2

### Issue

Configuration file: Commented lines are ignored under Windows

EntropicPersistent: Closed non-full queues can not be filled again when reopened

Results counters: Not fetched for the 11th task and more after a broker stop/restart

Retry Punnets: Inconsistency, sometimes punnets remain in queue

Worker: Killing Fast2 doesn't kill restarted workers

Worker: Spawned embedded workers are not killed

#### User Experience

Explorer Place: Download results provokes an out of memory for large results

Queues Place: Sources and tasks threads accept negative values

UI Canva: Deleting a task should deletes the links attached to it

UI Config task: Misalignment in the list of selected classes

UI GUI: Changing the name of a loaded map can break the GUI

UI Punnet Tracker: Wrong placement of toggle button when enlarging by double clicking

UI Map name: Not updated in maps list or url when new

UI Performance report: The stack does not close when I click outside the pop-up

Server Place: Not refreshed after new worker is started

#### Tasks

CMContentSource: Connections to CM not properly closed at the end of processing

CSVQueryTask: Inconsistent thread synchronization when parsing CSV

XSLTransform: All sub-documents remain open

### Regression

Campaign: Impossible to pause the last task of a map

Campaign: Inconsistent number of punnets when delete and run the exact same campaign

Campaign: The stop of a campaign is only effective when the source is finished

Database: Regression management of dates in open search

Map: Can be saved without a name

Worker: Kill worker acts like a restart

#### User Experience

Config Place: Campaign KOs report throw NPE when there are KO to download

Punnet Tracker: Switch between the json view and the diff view can go wrong

Scheduler Place: Jobs should launch only one campaign when scheduled time is reached

UI: Tables of server place does not take into account the displayed number data

Worker Place: Could not see workers logs from UI

#### Tasks

AlfrescoRestInjector : Could not upload content if 'name' is not on document

<br /><br /><br />
And other minor improvements.

## <br />

---

<br />
## 🧐 Known issues to be fixed

Catalog: Collapse with filter does not work with odd number of letters (identified in 2.9)

Retry punnets : Exception raised when doing a retry on [task N] after a retry on [task N+1] (identified in 2.9)

#### Planned to be fixed in 2.11

Explorer Place: Click twice on column to get available fields and then sort the datatable (identified in 2.10)

Logs: Broker startup, ACR log level is debug (identified in 2.10)

Scheduler Place: Rerun job issue (identified in 2.9)

Shared Object: Auto-save when leaving the place give bad UX (identified in 2.10)

Startup : Difficulties to do a cold restart after Fast2 crash (identified in 2.10)
