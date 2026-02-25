---
title: FlowerDocs 2025.3.0 Release notes
description: FlowerDocs 2025.3.0 Release notes
---

import FlowerDocsDownloads from '@site/src/components/FlowerDocsDownloads';

This version requires the following software versions as prerequisites:

- **ARender**: 2023.15.0
- **Redis**: 6.2.12
- **OpenSearch**: 1.3.19

<br />

**Legend**

- 💻 Native feature
- ⚙️ Feature requires configuration to be activated
- 👨‍💻 Feature requiring development to be activated
- 👑 Premium feature

<br />

# Overview

Version **2025.3.0** has been developed to enhance the clarity, efficiency and user-friendliness of FlowerDocs.  
Key features include streamlined report creation, CSV export synchronised with the display, an optimised ARender viewer, a more intuitive interface and enhancements that facilitate routine tasks.


# Upgrade Notes

You can find out about the major technical changes in this version by consulting the upgrade notes [here](../upgrade-notes)

# For Users

## 💻 Reports

Following on from the optimisations introduced in version 2025.2.0, FlowerDocs is continually working to enhance the report creation experience. The objective is to facilitate the identification data for graph construction.

### New field nomenclature

The former options "**Aggregation 1**" and "**Aggregation 2**" have been replaced by more explicit labels:

* **Display by**  *(formerly Aggregation 1)* : This data represents the key data points that are displayed in the graph.  
* **Break down by** *(formerly Aggregation 2)* : This data enables you to subdivide the display according to a second criterion.

![Image](pathname:///img/flowerdocs/release-notes/Histogram.png)

This new terminology has been designed to make data manipulation more intuitive and to help users better understand the structure of their Donuts and Histograms.

We will continue to enhance the reports to make them a true business management tool. Please feel free to share your needs or ideas and vote on our [product portal](https://portal.productboard.com/xm7hyfq2qsh4iq5go1hqbc7g) to guide future developments.

## 💻 CSV export improvement

The CSV export has been adjusted to ensure precise alignment with the data displayed in the results tables. Exported files now **contain the same columns and information as those visible on the screen.**  
This change prevents any discrepancies between the display and the export, making the feature more efficient.

## 💻 The ARender viewer, improvements

FlowerDocs is pleased to announce the inclusion of **ARender 2023.15.0**, which incorporates several enhancements developed since version 2023.12.0. This upgrade ensures a more stable, precise, and efficient viewing experience.

**Please find below a list of the main contributions to FlowerDocs:**

* **The enhanced text selection feature** ensures a higher level of reliability, particularly in complex PDFs, thereby guaranteeing that the copy accurately reflects the display.  
* **The enhanced rendering and conversion processes** (managing text files, and digital signatures) ensure greater consistency between original documents and their display.  
* **Enhanced stability and resilience** thanks to several critical fixes and improved connection management.  
* **New performance metrics (MixPanel)** enabling better usage tracking (TTV, consultation time, page views).


# For integrators

## 💻 Renaming of the "Task & BPM" menu to "Task and Process"

The "**Task & BPM**" menu has been renamed "**Task and Process**" in order to use clearer terminology that is more in line with the features offered.  
Please note that this change is purely visual and does not affect current functionality for users or integrators.

![Image](pathname:///img/flowerdocs/release-notes/Task_Process.png)


# For operators

## 💻 Security Enhancements (CVE Fixes)

Several CVEs have been addressed in this version. Specific details are withheld to protect against exploit attempts.


# Bug fixes

| Bug | Linked issues |
| :---- | :---- |
| **Users** |  |
| **Companion** - After creating or updating a document from Companion, the link to Open the document in FlowerDocs is functional. |  |
| **Companion** - When creating a Word document in FlowerDocs, if it has the same name as a file added on the same day, only creation is offered, not updating. |  |
| When a task (a mail, a case) is not assigned to the logged-in user, the "Delete" action is not available, even if the user has the right to do so. | [TMAFLW-564](https://arondor.atlassian.net/browse/TMAFLW-564) |
| Text tag - Corrections suggested by the browser's spell checker are taken into account. | [TMAFLW-1024](https://arondor.atlassian.net/browse/TMAFLW-1024) |
| Virtual folder (Left menu) - A virtual folder composed of different searches may have different columns for each search. <br /> Which columns are displayed ? Follow the documentation [here](/flowerdocs/documentation/config/gui/search/results) | [TMAFLW-1110](https://arondor.atlassian.net/browse/TMAFLW-1110) |
| Search criteria are no longer automatically added to the columns of the results table. A criterion is only added if: the operator is not "Equals" the operator is "Equals" and multiple values are searched for This is to allow users to differentiate between results more quickly.<br /> Which columns are displayed ? Follow the documentation [here](/flowerdocs/documentation/config/gui/search/results) | [TMAFLW-1075](https://arondor.atlassian.net/browse/TMAFLW-1075) |
| **Integrators** |  |
| The **WS renameFile** works with the FS (file system) connector. It is possible to rename a file without losing other information such as code format, creation date, size, etc.  | [TMAFLW-1158](https://arondor.atlassian.net/browse/TMAFLW-1158) |
| The UserService and GroupService services provided in the FlowerDocs API are functional in Operation Handler scripts. | [TMAFLW-1045](https://arondor.atlassian.net/browse/TMAFLW-1045) |
| **JSAPI lookups** are once again functional on the User tag. | [TMAFLW-1135](https://arondor.atlassian.net/browse/TMAFLW-1135) |
| The Rest API can be used in plugins and hooks with token injection mode. | [TMAFLW-1168](https://arondor.atlassian.net/browse/TMAFLW-1168) |
| **Operation Handler** - An operation handler executed BEFORE on an object with mandatory tags that are not filled in runs without error. | [TMAFLW-1147](https://arondor.atlassian.net/browse/TMAFLW-1147) |

# Known issues

* Columns: the "Assigned to" tag is displayed in the column if it is used in the query (hiddenRequest), even if the tag has been added to the columns to be hidden (hiddenColumns).  
* Virtual folder in list mode; pagination is not retained after refreshing the page or going back in the browser.

# FlowerDocs eProcess

## Overview

No specific changes have been made to this version. It benefits from the following corrections and improvements made by FlowerDocs:

* Improved reporting


### Bug fixes

| Bug | Linked issues |
| :---- | :---- |
| **Users** |  |
| Document - When the confidentiality of a document is removed, the default security settings are reapplied to that document. |  |
| Cases - An administrator or manager can no longer unassign a case when it is being modified, i.e., when it is reserved. | [TMAFLW-1112](https://arondor.atlassian.net/browse/TMAFLW-1112) |

# FlowerDocs GEC

## Overview

No specific changes have been made to this version. It benefits from the following corrections and improvements made by FlowerDocs:

* Improved reporting
  

### Bug fixes

| Bug | Linked issues |
| :---- | :---- |
| **Utilisateurs** |  |
| Mails - An administrator or manager can no longer reassign a mail when it is being modified, i.e., when it is reserved. | [TMAFLW-1112](https://arondor.atlassian.net/browse/TMAFLW-1112) |

# Patch versions

## Companion 2025.3.1 _08/12/2025_

### 💻 Companion Add-in – Improved Authentication Handling (TMAFLW-685 / TMAFLW-1186)

The Companion add-in now uses the **Edge WebView** library instead of the legacy Internet Explorer component.

This change enables the handling of larger authentication tokens, particularly for users who belong to a high number of groups.

This update also improves JavaScript compatibility, as Edge uses the same engine as Chrome.

The Companion MSI installer is available [here](/uxodocs/docs/flowerdocs/connecteurs/companion/install)

## Companion 2025.3.0 _29/12/2025_

### 💻 Companion Add-in – Improved Authentication Handling (TMAFLW-685 / TMAFLW-1186)

The token is no longer passed through the URL but is now transmitted via an **HTTP header**, whose maximum size can be configured at the infrastructure level.

The Companion MSI installer is available [here](/uxodocs/docs/flowerdocs/connecteurs/companion/install)

<FlowerDocsDownloads version="2025.3.0" arenderVersion="2023.15.0" />