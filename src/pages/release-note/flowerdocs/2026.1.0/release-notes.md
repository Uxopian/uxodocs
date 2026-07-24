---
title: FlowerDocs 2026.1.0 Release notes
description: FlowerDocs 2026.1.0 Release notes
---

import FlowerDocsDownloads from '@site/src/components/FlowerDocsDownloads';

This version requires the following software prerequisites:

- **ARender**: 2026.1.0  
- **Redis**: 8.8  
- **OpenSearch**: 3.6.0

<br />

**Legend**

- 💻 Native feature (enabled by default)  
- ⚙️ Feature requiring configuration  
- 👨‍💻 Feature requiring development  
- 👑 Premium feature

<br />

## **Overview**

FlowerDocs 2026.1.0 is a consolidation release. It improves the reliability of search, CSV export, column management, virtual folder display in ARender, and document versioning. It also removes the Lasso feature, hidden by default since version 2025.4.0, and includes an ARender update to version 2026.1.0.

## **Upgrade Notes**

The major technical changes in this version are detailed in the upgrade notes available [here](https://doc.uxopian.com/release-note/flowerdocs/2026.1.0/upgrade-notes/). 

## **For users**

This release focuses on day-to-day reliability, with improvements to search (quick search, saved searches, and pagination), CSV export, column management, virtual folder display in ARender, and annotations. See the fixes below for details.

#### **💻 Removal of the Lasso feature**

The Lasso feature, hidden by default since version 2025.4.0 and no longer in use, has been removed from the product.

#### **💻 ARender viewer update**

The ARender viewer embedded in FlowerDocs has also been updated to version 2026.1.0. This update resolves several issues:

* Resizing and moving a free-text annotation now work reliably again.  
* The correct error message now displays when a document is unavailable.  
* Document identifiers containing the "&" or "=" characters are no longer truncated or altered when opened.  
* Downloading several documents with identical names into a single archive no longer causes an error.  
* PDF versions of emails can now also display headers in German, in addition to French and English.

For more information, see the ARender release notes [here](https://doc.uxopian.com/release-note/arender/v2026.1.0/release-notes/).

## **For integrators**

#### **💻 Technical fixes**

Several technical fixes have also been made to the Swagger interface, visual customization, and redirect error messages, see the fixes below for details.

## **For operators**

#### **💻 Security**

Several CVEs have been addressed in this version. Specific details are withheld to protect against exploit attempts. 

#### **💻 Logging**

A warning message is now added to the application logs when a FlowerDocs instance is used over HTTP rather than HTTPS, to help operations teams identify insecure configurations.

#### **💻 Migration tool for 2026**

The migration tool for upgrading from 2025 to 2026 is now functional in AWS environments using managed services. See the documentation for the detailed procedure.

#### **💻 ARender update : performance and security**

The update to ARender 2026.1.0 also reduces resource consumption on the rendition server, thanks to the default deactivation of a Spring Security observation mechanism that had become unnecessarily costly since the migration to Spring Boot 4\. This same ARender update also includes its own set of security fixes and Docker image updates following the continuous analysis of its third-party dependencies.

For more information, see the ARender release notes [here](https://doc.uxopian.com/release-note/arender/v2026.1.0/release-notes/).

## **Bug fixes**


| Bug | Ticket |
| ----- | ----- |
| **Users** |  |
| CSV Export — Column headers corresponding to native technical tags are now correctly translated when the interface language is set to French. |  |
| CSV Export — A column added via a filter clause is now correctly included in the exported file. |  |
| Columns — The "Assign To" tag is no longer incorrectly displayed as a default column, in line with the defined configuration. |  |
| Interface — Icon alignment for instance title actions has been fixed. | FD-17037 / TMAFLW-1066 |
| Search — A search containing only a quick-search criterion can now be saved, and a saved search of this type can now be edited. | FD-18286 / FD-15446 / TMAFLW-261 |
| Search — Selecting an item at the bottom of the results list no longer causes a visual jump. | FD-17866 / TMAFLW-1116 |
| Search — Changing the number of results per page on a saved search now correctly updates the pagination. | FD-17801 / TMAFLW-1074 |
| Documents — Navigation now works normally again after deleting a document attached to a task. |  |
| Virtual folders — When a user does not have permission to view one of the documents in a virtual folder, the documents they are allowed to view are now displayed normally in ARender. | FD-16893 / FD-16847 / FD-16738 / TMAFLW-1204 / TMAFLW-1203  |
| Annotations — Annotations added from a task no longer disappear after saving. | FD-18261 / TMAFLW-1101 |
| **Integrators** |  |
| Swagger — The authentication token now remains active when switching categories, without needing to be re-entered. |  |
| Redirect errors — Error messages now identify the affected route when a redirect error occurs. | FD-17869 / TMAFLW-1083 |
| **Operators** |  |
| Administration — A warning message is now added to the logs when FlowerDocs is used over HTTP. |  |
| Versioning — For document classes configured with manual versioning, adding new content now correctly removes the old file from storage (S3 or file system).  |  |

## **Known issues**

*No known issues specific to FlowerDocs for this version.*

---

## **FlowerDocs eProcess**

### **For users**

No specific changes have been made to eProcess beyond the above. This version benefits from all the improvements and fixes made to FlowerDocs for users.

### **For integrators**

#### **💻 Companion**

Documents added from Companion in eProcess solutions can now be indexed immediately: the indexing form, which previously failed to appear, now appears correctly.

#### **💻 History**

In the solution templates: the `classid` technical field is now consistently set on tasks during unassignment, ensuring the task class's custom icon displays reliably in the history. No impact on users. 

#### ⚙️ **Customization banner**

Custom banner color now works correctly through the intended CSS variable, without needing to add `!important`. This concerns integrators who customize branding and is not noticeable to end users. 

### **For operators**

No specific changes have been made to eProcess. This version benefits from all the improvements and fixes made to FlowerDocs for operators.

### **Bug fixes**

| Bug | Ticket |
| ----- | ----- |
| **Integrators** |  |
| Companion — The indexing form now appears correctly when adding a document from Companion, allowing it to be indexed immediately. | BUSOL-534 |

### **Known issues**

*No known issues specific to eProcess for this version.*

---

## **FlowerDocs GEC**

### **For users**

No specific changes have been made to GEC beyond the above. This version benefits from all the improvements and fixes made to FlowerDocs for users.

### **For integrators**

#### **💻 Companion**

Documents added from Companion in GEC solutions can now be indexed immediately: the indexing form, which previously failed to appear, now appears correctly.

#### **💻 History**

In FlowerDocs GEC: the `classid` technical field is now consistently set on tasks created during mail copying or routing, ensuring the custom icon for GEC task classes displays reliably in the history. No impact on users. 

#### ⚙️ **Customization banner**

Custom banner color now works correctly through the intended CSS variable, without needing to add `!important`. This concerns integrators who customize branding and is not noticeable to end users. 

### **For operators**

No specific changes have been made to GEC. This version benefits from all the improvements and fixes made to FlowerDocs for operators.

### **Bug fixes**

| Bug | Ticket |
| ----- | ----- |
| **Users** |  |
| Mail copying — A copied mail now correctly keeps the "To process" status when the mail's Recipient field is populated. |   |
| **Integrators** |  |
| Companion — The indexing form now appears correctly when adding a document from Companion, allowing it to be indexed immediately. | BUSOL-534 |

### **Known issues**

*No known issues specific to GEC for this version.*

<FlowerDocsDownloads version="2026.1.0" arenderVersion="2026.1.0" />