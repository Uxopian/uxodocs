---
title: Release notes
description: Release notes
---

# Significant changes in 2.8

## Security vulnerabilities

With the aim of improving security within FlowerDocs, several fixes have been made :
✅ Service Directory password encryption via the CLM

🔴 Minor security vulnerabilities fixed on the CLM and administration GUI

## Search enhancements

Several changes have been made to the search function to make it easier and more fluid to use :

✅ The “Search” and “Add criteria” buttons are always visible on the screen, regardless of the number of search criteria.

✅ Manually added criteria remain displayed until the form is reset. They are saved when a search is saved, so that users can customize their searches even further.

✅ New functionality for resetting added and entered search criteria to return to the default search form.

<br />

When criteria are displayed in columns :
✅ Le nombre de résultats par page et le bouton pour ajouter des colonnes sont toujours visibles au-dessus des tableaux quel que soit le nombre de résultats affichés.

✅ The number of results per page and the button for adding columns are always visible above the tables, regardless of the number of results displayed.

## SSO

✅ When there is an SSO and a directory service, FlowerDocs uses the identifier retrieved from the directory service for all actions performed in FlowerDocs.

## Administration

\{\{% epic id = FD-15971 %\}\} CLM, it is now possible to partially update a scope with the following commands : update-config, update-model, update-report, update-content, update-scope

## WS

✅ Full-text search - Exposure of a WS for adding, deleting and updating the textual content of a file retrieved by a third-party application in FlowerDocs.

# Facilitating integration

🔴 The variable $\{user.authorities\} takes into account all user information: directory groups and FlowerDocs profiles, whatever the context of use.

## Full-text search

✅ From the administration GUI, it is possible to configure an external OperationHook that calls a technical component external to FlowerDocs to extract the textual content of documents by filtering on the desired mime types for indexing.

## ScriptOperationHandler

🔴 Filters are taken into account when executing operation handler scripts.

🔴 Operation handler scripts can be run on administration components.

## Tasks

✅ It is possible to add technical parameters when applying a response to a task. This makes it possible to convey the information required for technical processing without overloading the FlowerDocs data model.

## Default scope

📋 Added a deliverable containing the basic FlowerDocs scope needed to run the application.

📋 Add the acl-annotation ACL to the “Annotation” document class to make it easier to understand how annotations security works.

# Bug fixes

## Tags

🔴 FlowerDocs manages the fact of not displaying suggestions on a read-only tag.

## Menus (Virtual Folders)

🔴 Counters are always displayed regardless of the size of the label for the various levels (aggregations).

## Results table

🔴 Display conditional tag labels regardless of the condition performed.

🔴 Display of the special character “ ‘ “ in table columns.

## Folders (Virtual Folders)

🔴 Display of the special character “ ‘ “ in the classification plan (aggregations).

## Task

🔴 Creation of a task after verification of its existence, tooltips are displayed for all tags present in the pop-up.

## History

🔴 Special characters are correctly displayed.

## Companion Plugin, interface with the Office suite

🔴 E-mail transfer from Outlook to FlowerDocs is back on track.

🔴 The Companion plugin works with HTTPS and SSL security.

## RGAA

🔴 Improved contrast in the “History” pop-up.

🔴 Reading List tags when they are read-only.

🔴 Text tags displayed in black when in write mode.

## Administration

🔴 Conditional tag: it is now possible to condition the display of values according to a component's class identifier.

🔴 Deleting a report from the GUI is now functional.

🔴 When deleting a user from a group, confirmation is requested to avoid mistakes.

🔴 Operation handler - The section is always displayed from the administration GUI.

🔴 Scope teams are now displayed correctly from the “Identities/Teams” menu in administration.

## WS

🔴 Adding a document - The addFiles service returns the identifier of the file created, regardless of the versioning mode defined for the document class.

# Known issues

## Search

- Full-text search - After restoring a document version, the content of the restored version is not re-indexed and therefore not searchable.
- The “Reset” action must not be present on the document search pop-up.
- The focus remains on the “Reset” action after clicking on it.

# Patch versions

## 2.8.1 _03/06/2024_

### :closed_lock_with_key: Security

**ARender version upgrade to 4.8.17 to benefit from the fix to resolve a vulnerability.**

This patch strengthens the application's security and protects our users from potential threats.

For more details, please contact us via our ticketing tool !

### ARender

**ARender version upgrade from 4.8.13 to 4.8.17 to benefit from all the improvements made in the viewer.**

For more information, see the ARender release notes[here](https://hub.arender.io/fr/technical-blog).

### RGAA

✅ To ensure that the product meets general accessibility requirements for all types of disability, a link to the FlowerDocs accessibility declaration has been added to the avatar menu.

### Bug fixes

🔴 **:mag_right: Search : “Reset” action removed from pop-ups**

To avoid visual overload on document search pop-ups, the action to reset the search form has been removed.
<br/><br/>

🔴 **:mag_right: Full-text search : indexing content after restoration**

It is now possible to search the contents of a document after restoring a version.

In previous versions of the product, following a restore, the associated content was not indexed and therefore not searchable.
<br/><br/>

🔴 **RGAA - Improved keyboard navigation on verification pop-ups before creating a task.**

Here's how it works to comply with RGAA rules :
Existing tasks are checked when the focus is on the “Check” button in the pop-up window.

The pop-up is closed if the user uses the “Esc” key or if the focus is on the “Close” button.

If the focus is in a pop-up field, then when the enter key is pressed, the action is performed in the field (input validation, list scrolling, etc.).
<br/><br/>

🔴 **Viewing a document directly in ARender**

When a document is viewed in the viewer in external mode, i.e. without the FlowerDocs forms being displayed, the user rights set up in FlowerDocs are once again taken into account.

Ex: a user who has the right to download or print the document can do so again.

## 2.8.2 _27/06/2024_

🔴 Updating a document without adding content no longer deletes the old content.

## 2.8.3 _31/12/2024_

✅ ARender version upgrade from 4.8.17 to 4.8.20 to benefit from all the improvements made in the viewer.

## 2.8.4 _04/03/2025_

✅ ARender version upgrade to 4.8.21
