---
title: FlowerDocs 2025.1 Release notes
description: FlowerDocs 2025.1 Release notes
---

import FlowerDocsDownloads from '@site/src/components/FlowerDocsDownloads';

This version requires the following software versions as prerequisites:

- **ARender**: 2023.8.1
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

Version 2025.1 introduces significant advances in functionality and usability. It also includes patches and security enhancements (CVEs).  
Highlights include a redesigned login page for improved visual comfort, simplified document adding for both users and APIs, and enhanced full-text search.

# Upgrade Notes

You can find out about the major technical changes in this version by consulting the upgrade notes [here](./upgrade-notes)

# For Functional Users

## 💻 Login page, a new style

The login page has been modified to make it easier for users to view. Depending on the settings, the login page offers username and password authentication and/or single sign-on.
![Image](/uxodocs/img/flowerdocs/release-notes/PageConnexion_EN.png)

## 💻 Easier to add documents

New ways of manually adding a document to FlowerDocs have been added to reduce the number of actions users have to perform, saving a significant amount of time.

To add a document to FlowerDocs without a specific context, you can now **drag and drop a file from your workstation to the ‘+’ button** on the banner.
![Image](/uxodocs/img/flowerdocs/release-notes/AjoutDocD&D_EN.gif)

Depending on the settings, it is also possible to add a document **directly to a virtual folder** using the 'Add document' button or by dragging and dropping directly into the file plan area. The new document is automatically indexed in the same way as the folder to simplify indexing and avoid errors.
![Image](/uxodocs/img/flowerdocs/release-notes/AjoutDocDossier_EN.gif)

_\* Depending on the settings, the "+" button or the "Add a document" button will appear in a virtual folder._

## 💻 Full-text search, a complete use

Full-text search has been optimised, allowing the use of '' to perform strict searches and extract text from zip documents.

The word or words being searched for are also **automatically highlighted in the viewer**, so users can quickly see why the document has appeared in the search results.
![Image](/uxodocs/img/flowerdocs/release-notes/RecherchePleinTexte_EN.gif)

_\* As a reminder, full text search can be enabled in the settings._

## 💻 Optimised versions management

You can restore a version directly from the version you are viewing. This makes it quicker and easier to restore the version you want.
![Image](/uxodocs/img/flowerdocs/release-notes/Restore_EN.png)

## 💻 Serial processing

Serial processing is available by opening it in the same window or assigning it to yourself from the context menu, to suit all applications.  
![Image](/uxodocs/img/flowerdocs/release-notes/TraitementSerie_EN.gif)

This function is not available when opening in a new window, to avoid errors or misunderstandings between different processing sessions.

## 💻 Faster access to product information

Information about the product, such as the version installed, is moved from the avatar menu to the menu.
![Image](/uxodocs/img/flowerdocs/release-notes/MenuAPropos_EN.gif)

## 👨‍💻 The ARender viewer, improvements and new features

This new version of the viewer offers enhanced security and the following new features:

- Disable information notifications (blue) to make it easier to consult documents. Error messages are always present to warn of abnormal behaviour.  

- Integration with Mixpanel, which provides anonymous usage data to the Uxopian team, enabling data-driven improvements to ARender. No personal or sensitive information is collected, ensuring full compliance with the RGPD, the California Consumer Privacy Act (CCPA) and other global privacy standards.  
  By centralising this anonymous data, we gain valuable insight into feature usage, enabling us to prioritise updates and deliver meaningful improvements for all users.  
  You can change this default configuration by following the documentation [here](/documentation/config/gui/viewer/product-analytics)

**Transparency First :**  
Our approach to data collection and usage is fully documented, ensuring clarity and trust :
[More about Product Analytics](https://docs.arender.io/learn/product-analytics/)

# For integrators

## 💻 Administration

Addition of an Asynchronous column in the Operations Handlers table to facilitate analysis.
![Image](/uxodocs/img/flowerdocs/release-notes/OHTableau_EN.png)

## ⚙️ Virtual folder

A new parameter has been added to limit the document classes created directly from a virtual folder: children
![Image](/uxodocs/img/flowerdocs/release-notes/DossierClientEnfant_EN.png)![Image](/uxodocs/img/flowerdocs/release-notes/DossierClientEnfant_XML.png)
To find out more, see the upgrade notes [here](./upgrade-notes#adding-documents-made-easy)

## 👨‍💻 CLM

The Command Line Manager (CLM) has been modified to make it easier to use when updating the data model with an import. The scope.xml file is no longer mandatory, which means that the settings made for the teams can be retained.  
Documentation available [here](/documentation/install/clm/jobs#update).

## 👨‍💻 New endpoints for documents

Two new REST APIs are available for :

- Create a document with the associated file in a single call instead of successive calls: create a temporary file, create a document, then link the temporary file to the document : `/core/rest/documents/unique`
- Update a document to add a file in a single call instead of successive calls: Create a temporary file, then link the temporary file to the document : `/core/rest/documents/\{id\}/unique`

These two new APIs will make it easier to create or update a document. They will also facilitate error management for applications using FlowerDocs services.

## 👨‍💻 Login page, SSO activation only

The configuration of the login page allows you to activate only the SSO (Single Sign On) connection to enhance the security of the platform
To find out more, see the upgrade notes [here](./upgrade-notes#login-page).

# For operators

## 💻 Performance enhancement, User tag

Reviewed the operation of user tags to reduce the number of calls to the directory to retrieve users when populating lists with users.

## 💻 When a user is deleted, all their data is deleted

Users can add documents, tasks or folders to their Favourites, save searches and customise FlowerDocs to suit their needs. This information is unique to the user and is therefore deleted when the user is removed from FlowerDocs to avoid storing orphaned information.

A user's saved searches that have been shared with other users will be kept so as not to interfere with their use.

## 💻 OpenSearch, using alias

In order to facilitate operations, OpenSearch indexes are now queried via their aliases instead of their names. It is still possible to query the index directly, but this is deprecated.
To find out more, see the upgrade note [here](./upgrade-notes#exploitation).

## 👨‍💻 End points

- A new API has been created to make it easier to purge the GUI cache : `/\{gui\}/rest/caches/\{cacheNames\}`.
  More details [here](/documentation/config/exploit/cache)

- The API for checking the status of Core machines no longer requires authentication, to facilitate the platform's monitoring mechanisms : `\{core\}/actuator/status`

# Bug fixes

| Bug                                                                                                                                                                                                                       | Ticket support        |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------- |
| **Functional user**                                                                                                                                                                                                       |                       |
| Full-text search \- Text extraction from emails is now functional                                                                                                                                                         |                       |
| Search \- The & character is interpreted as a standard character and not as a value separator.                                                                                                                            | [TMAFLW-761](https://arondor.atlassian.net/browse/TMAFLW-761)            |
| Physical folder \- Whatever the configuration of the user workstation (window size), child folders or documents are displayed correctly.                                                                                  | [TMAFLW-540](https://arondor.atlassian.net/browse/TMAFLW-540)            |
| Virtual folder \- Whatever the configuration of the user workstation, the list of documents is displayed.                                                                                                                 | [TMAFLW-594](https://arondor.atlassian.net/browse/TMAFLW-594) [TMAFLW-866](https://arondor.atlassian.net/browse/TMAFLW-866) |
| Virtual folder \- The ratio between the panel of the indexing form and the panel of the viewer or list of documents, set in the configuration file, is respected whatever the configuration of the workstation.           | [TMAFLW-650](https://arondor.atlassian.net/browse/TMAFLW-650)            |
| Virtual folder \- Data that can be added in columns in tables is always available, whatever display the user chooses                                                                                                      | [TMAFLW-1019](https://arondor.atlassian.net/browse/TMAFLW-1019)           |
| Currency type tag \- The comma or full stop is accepted as the separator between the integer part and the decimal part.                                                                                                   | [TMAFLW-876](https://arondor.atlassian.net/browse/TMAFLW-876)            |
| SSO connection \- The SSO connection is always available, even after the platform has been restarted.                                                                                                                     | [TMAFLW-971](https://arondor.atlassian.net/browse/TMAFLW-971)            |
| Task \- Users can annotate a document attached to a task even if the task is read-only. This depends on the rights granted to the attached document                                                                       | [TMAFLW-1006](https://arondor.atlassian.net/browse/TMAFLW-1006)           |
| Task \- The task icon is always displayed in the columns of a results table, even if the table does not have the class id column.                                                                                         |                       |
| Sequential processing \- When serial processing is enabled, if the user opens a component and then a pop-up for adding or indexing a document, for example, and cancels these actions, the user returns to the component. |                       |
| **Integrator**                                                                                                                                                                                                            |                       |
| CLM \- The CLM (Command Line Manager) is now working in https mode. The SSL error that appeared previously, suggesting that there was a problem, no longer exists.                                                        |                       |
| GUIConfiguration file error handling \- GUIConfiguration file errors are now better handled. Error-free files are loaded even if a file has an error and the error message clearly identifies the file with the problem.  | [TMAFLW-840](https://arondor.atlassian.net/browse/TMAFLW-840)            |
| Task attachment \- Tasks are saved with document classes containing the permitted special characters attached.                                                                                                            | [TMAFLW-1001](https://arondor.atlassian.net/browse/TMAFLW-1001)           |

# Known issues

- The new endpoints for creating or saving a document by directly associating it with a file have does not work with Swagger.
- Highlighting the searched word(s) in the viewer after a full-text search does not work the first time you view the page (first opening of open in new window). If you open the page a second time or refresh it, the words will be highlighted without having to search in the viewer.

# FlowerDocs eProcess

## For functional users

### 💻 All reports are clickable

For more intuitive and faster access to envelopes from the home page, the donut and histogram reports available to all users are clickable.
![Image](/uxodocs/img/flowerdocs/release-notes/WidgeteProcess_EN.gif)

### 💻 Adding a document to a folder

Adding a document to a folder has been modified to take advantage of all the ergonomic improvements of FlowerDocs within eProcess. More information [here](./#span-title-native-feature-class-span-rn-i-class-fa-solid-fa-laptop-i-rn-style-color-651fff-i-i-class-fa-solid-fa-check-i-rn-style-color-33cc33-font-size-0-5em-i-span-easier-to-add-documents).

## For Operators

### 💻 Performance Improvement for Envelope Assignment

The process of assigning envelopes to a specific user has been reviewed to reduce the number of calls to the directory to retrieve the users authorised in the eProcess.

# Bug Fixes

| Bug                                                                                                                                                             | Ticket support |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- |
| **Operator**                                                                                                                                                    |                |
| The eProcess APIs for creating or modifying an envelope have been modified to cache tag classes and their values to prevent performance degradation during use. |                |

# FlowerDocs GEC

## For functional users

### 💻 All reports are clickable

For more intuitive and faster access to mails from the home page, the donut and histogram reports available to all users are clickable.
![Image](/uxodocs/img/flowerdocs/release-notes/WidgetGEC_EN.gif)

### 💻 Adding a document to a folder

Adding a document to a folder has been modified to take advantage of all the ergonomic improvements of FlowerDocs within eProcess. More information [here](./#span-title-native-feature-class-span-rn-i-class-fa-solid-fa-laptop-i-rn-style-color-651fff-i-i-class-fa-solid-fa-check-i-rn-style-color-33cc33-font-size-0-5em-i-span-easier-to-add-documents).

<FlowerDocsDownloads version="2025.1" arenderVersion="2023.8.1" />
