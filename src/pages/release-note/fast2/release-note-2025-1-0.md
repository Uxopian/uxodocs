---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2025-05-02

# To modify
version: "2025.1.0"
major_version: "2025" 
description: "Summary of the changes in version 2025.1.0 of Fast2." 
---


## **What's up ?**

<br />
The 2025.1.0 is a new minor version, bringing new features, enhancements and bug fixes.

This version guarantees retrocompatibility for the catalog.

<br />
_Details below..._

<br />

## <b>Global</b>

##### Authentication

Improvement: Increase password restrictions on the register page. Password restriction will now be displayed in UI to help users understand what they need to change to have their password validated.

Improvement: The login page is now protected against brute force attacks. Multiple unsuccessful retries will lead to user's IP being restricted from loging for some time.

Bugfix: Fixed a bug when password was sent unprotected to the API during user creation, leading to spying softwares being able to read and use these credentials.

##### Notifications

Bugfix: Fixed a bug when scrolling in a pop-up window was impossible.

##### Vertical banner

Improvement: The Fast2 logo is now a direct link to the documentation website (fast2.tech).

Bugfix: Fixed a bug when the Fast2 version displayed wasn't correctly updated.

<br />

## <b>Edit Place</b>

##### Drop-down lists

Bugfix: Fixed a bug when the size of a drop-down list didn't properly adapt to the number of values in the list.

##### Map construction

Bugfix: Fixed a bug when task configuration could sometimes not be saved before users moved to another place.

Bugfix: Fixed a bug when importing a map from version 2.12 of Fast2 would lead to the shared object name not being displayed as a task name in the canvas.

##### Catalog

New Feature: New task ConvertDateProperties which allows to convert date in a different format, for instance from a DateTime format to a timestamp format.

New Feature: New task NuxeoQuery to check in a Nuxeo environment if a document already exists.

Improvement: The retrievalName property is now mapped before content creation, in the FileNetContentExtractor.

Improvement: FileNetInjector now supports injection of multi-content documents.

Improvement: The script property in the JSTransform task now also supports a file path.

<br />

## <b>Run Place</b>

##### Explorer Place

Bugfix: Fixed a buf whan filters on specific columns could not work. This fix does not include date columns.

Bugfix: Fixed a bug when selecting columns in the list from the bottom to the top would lead to their filters being permutated between columns.

<br />

## <b>Maps Overview and Campaigns Management (previously Objects Board)</b>

##### Maps Overview

No noticeable change in this version.

##### Campaigns Management

No noticeable change in this version.

<br />

## <b>Server Place</b>

##### Workers & Logs

Bugfix: Fixed a bug when broker logs couldn't be downloaded from UI as an admin user.

<br />

## <b>Shared Objects Place</b>

No noticeable change in this version.

<br />

## <b>Scheduler Place</b>

##### Scheduler

Bugfix: Fixed a bug when jobs could stay blocked for no explicit reason.

Bugfix: Fixed a bug when the scheduler prevented the selection of an unlimited number of executions once a limit number of executions had been configured.

## <br />

---

<br />
## 🧐 Known issues

- Authentication: No automatic logout on Linux when Fast2 is killed. This situation will be resolved in a future release.

- Trigger Campaign task: Security prevents consumption of APIs when trying to launch a new campaign. A Trigger Campaign task can only succeed if security is disabled. This situation will be resolved in a future release.

- Undo/redo: After consecutive usage of the undo feature, the application can sometimes take time to remove a recently added task from the map, then allow the link creation from the removed task as if it was still in the map. Undoing map configuration changes can sometimes lead to the configuration staying unchanged. After leaving, then coming back to the edit place, the configuration is correctly changed.

- Map deletion: Trying to delete maps when campaigns are still running will wrongly trigger a deletion toast message. In a future release, the application will give the choice to stop the campaign or cancel the map deletion.

- Punnet Tracker: Copying a punnet to the clipboard does not work at the moment.

- SleepTask: Please note that a sleep on a task will occur on the thread and therefore will reduce the pool of resources for other tasks. Use a dedicated queue and be sure to have enough threads to put all the required punnets to sleep at the same time.

- Recent patches: Some recent patches directly delivered by Professional Services, whether for enhancement or bug fixing, were integrated too late in this version life cycle to be released in time. Contact your Professional Services referee if you want further information about your own installed patches. Know that 2025.1 is compatible with 2.12 worker libs. (are concerned: MFilesInjector, ComparePunnets, FileNetInjector, LocalSource)

- Security & confidentiality: Fast2 UI users can create a map and run a campaign with the JSTransform and ReadContent tasks to access local files, which represents a breach in confidentiality and security. We are working on a resolution for the final release. Please, for safety reasons, reduce access to only trusted IP addresses.

