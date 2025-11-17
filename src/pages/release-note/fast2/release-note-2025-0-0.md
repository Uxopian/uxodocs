---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2025-04-04

# To modify
version: "2025.0.0" # ex of format: 2.2.1
major_version: "2025" # minor version of the release note    ex: 2.2
description: "Summary of the changes in version 2025.0.0 of Fast2." # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---


## **What's up ?**

<br />
The 2025.0.0 is a new major version, bringing new features and a new interface.

This version guarantees retrocompatibility for the catalog.

<br />

For more information about how you can move from a previous version of Fast2 to the 2025.0.0 version, please refer to the upgrade note, available on the knowledge base: https://arondor.atlassian.net/wiki/spaces/FS/pages/5164564495/Fast2+v2025.0.0+-+Upgrade+Notes

<br />
_Details below..._

<br />

## <b>Global</b>

##### Settings - Start-up

Improvement: ReadMe.md updated.

New Feature: V2 maps compatibility → Recover maps, task configuration, campaigns, results, shared objects, jobs from V2 environments.

New Feature: Fast2 objects (maps and shared objects) are stored in OpenSearch.
Warning: maps folder and shared object file in config folder are no longer included in the standard package.

New Feature: If you create a “maps” folder and manually import maps or if you import your shared objects file in the config folder, they are taken into account and imported in OpenSearch when Fast2 starts, after which the imported files will be deleted from their folders.
In future versions, this behavior will be removed and substituted with an equivalent UI functionality to improve user experience when moving from an older to a recent version of the product.
Although version 2025.0 of Fast2 was conceived to guarantee retrocompatibility to the catalog, be very careful with your custom tasks and don’t hesitate to solicit the support team if you find it hard to use your custom tasks with this new version.

New Feature: Added a loading page during Fast2 starting (no need to refresh the navigator anymore).

Bugfix: Under Linux or Windows: workers and OpenSearch are now killed as expected when Fast2 is stopped.

##### Authentication

New Feature: Restricted access to Fast2 with Register and Login Page (can be disabled in config.properties).
Please note that Fast2 does not manage concurrent access yet. If multiple users are connected and modify the same configuration objects, it could lead to conflicts and unsynchronized changes.

New Feature: Automatic logout when token expires (4 hours of inactivity, can be modified in application.properties).

New Feature: Automatic logout only on Windows when Fast2 is killed.
Will be done on Linux in a future release.

New Feature: Restricted access to Actuator, to prevent any security risk when records of users logging into the application can be clearly read.

New Feature: Secured the broker/contents endpoint to prevent any js code injection.

New Feature: All main documentation weblinks added to the Register and Login pages (Documentation, Cookbooks, Release note, Roadmap, Support).

##### New front technology: Svelte

New Feature: New design software to build prototypes.
Design system setting-up.
Common css variables.

Improvement: All Places have been redesigned.

Improvement: Lighter and more intuitive places.

Improvement: Drop-down lists are now streamed, for better performances.

Improvement: Homogeneous components design and behaviour:
tooltip, pop-up, modal, toast, icon, input, button, table

##### Vertical banner

Improvement: Access to all places from anywhere.

New Feature: Split of the “Object Boards” place into 2 places: “Maps Overview” and “Campaigns Management”

New Feature: Rename the “Dashboards” icon into “Reports”, to go to the OpenSearch dashboard page.

New Feature: Log out available down the vertical banner.

New Feature: Ellipsis to display the place names.

New Feature: Ellipsis to display a link to the version Release Note.

##### Tables

New Feature: Add object pop-up for tables.

New Feature: Manage table columns with “Select all” and “Clear” options.

##### Map versioning

New Feature: New map version creation when editing a map after running at least one campaign on it, in order to always display the right map when opening a previous campaign.
Note that campaigns keep the same map name as a reference, but increment the “Run” number.

Bugfix: Find the correct map when opening a previous campaign.

New Feature: Read-only mode: when loading a campaign associated with an old map version, then moving to the edit place, the old version of the map is displayed in a read-only mode, preventing any modification.
Task configuration is still accessible and can be copied if need be.

New Feature: In the “Maps Overview” place, only current versions of maps are displayed by default, but their table lines can be unfolded to display all previous map versions.
Current and old versions of a map are clickable to view them in Edit Place.

New Feature: In the “Campaign Management” place, the map column displays the campaign map version.

New Feature: The map scope of a shared object is now a map version scope.

New Feature: In the “Scheduler” place, job creation is possible only on a current map version.

##### Errors management

Improvement: Task exceptions are now discriminated into several subclasses:

 - TaskException: the standard and legacy exception occurring while running a task

 - TaskConfigException and TaskOptionalConfigException: the exceptions caused by incorrect parameters in the configuration of the task

 - TaskConnectException: the exception occurring when the product fails to connect to a third party application during the execution of a task

 - TaskProcessException: the standard exception due to the execution of a task

 - TaskProcessAnnotationException, TaskProcessContentException, TaskProcessDataException and TaskProcessFolderException: the exceptions triggered when the task fails to manipulate respectively annotations, contents, metadata or folders.

Improvement: A link to the logs added in the error toasts.

Improvement: Prevent database over-storage: at 90% and 95% disk consumption, a warning written in the worker logs

<br />

## <b>Edit Place</b>

##### Headband

Improvement: The map renaming tool is now moved to the map selection drop-down list. Now the name of the map is only displayed once on the UI, avoiding redundant information.

New Feature: Display map version (see map version section).

Improvement: Added a map renaming suggestion when importing a map.

New Feature: A floppy disk icon confirms auto-saves after any map update (canva, config, name, map shared object) by displaying a little blue circle indicating save is in progress, then a green one indicating save is finished.
It can be clicked to force-save the map, in case users doubt autosave worked.

##### Canva

New Feature: Move canvas with left mouse click held (instead of using the scrollbar).

New Feature: Added zoom in / zoom out / rescale functionalities.
Supporting the mouse Ctrl+scroll shortcut.

New Feature: Added the Undo / Redo functionality on canva and configuration.

New Feature: Added the map description (long text) functionality.

 - The map description area can be reduced and moved.

 - The map description is available in the “Maps Overview” place.

Improvement: Links with a long name are now fully displayed.

##### Catalog

New Feature: Task categories identified by a dedicated icon, for better understanding of a map.

New Feature: Added the possibility to drag and drop tasks from the catalog to the canvas.

New Feature: New tasks were added to the catalog:

 - AlterPunnetProperties: to do the same as AlterPunnetProperty but for several properties at the same time.

 - DeleteContent: to delete files from local storage based on user URI input (supports wild cards and patterns)Conn

 - EmbeddedDbSource: to use punnets from a previous campaign as a source for a new campaign. A REST version is released. Both can be used, but one will be deprecated and removed in a future major version.

 - EmbeddedDbQuery: to gather metadata from punnets from a previous campaign, or previous campaigns.

 - ParseXMLAsProperties: to parse XML and add content as document metadata

 - ParseJSONAsProperties: to parse JSON and add content as document metadata

 - PunnetCounter: to count punnets as they go through (QA internal need)

Improvement: Several tasks were improved:

 - AlterDocumentContent: Add option to skip specific files based on their extensions

 - AlterDocumentContent: Improve performances

 - AlterDocumentContent: the “check if files exist” option is ignored when using wildcards, since wildcards consist in scanning for existing files validating a pattern, therefore no missing file can be defined with a wildcard.

 - AWSInjector: now avoids sending a content-type when the mime-type of a file is missing. Sending a content-type without sending the mime-type could lead to errors during the S3 injection.

 - ConvertP8ToXFDF: improve output structure of created annotation

 - CSVSource: continueOnFail avoids to stop the task processing when documentId column is empty for one document

 - CSVSource: now supports wildcards for input files

 - CSVSource: now silent fails when a file is impossible to read

 - CSVWriter: now supports a relative output path in the form of “file.csv”

 - CSVWriter: headers generation can now compile documents with different metadata between them

 - DeleteFileFromSystem: all deleted files and folders are now counted as expected

 - EndTaskWritter: this task can now manage delayed punnets, which would have caused a campaign to run forever, in previous versions.

 - FlowerDocsInjector: standard Date tags are now correctly populated with timestamps, as expected by FlowerDocs API. Since the connector doesn’t know about the type of custom tags, users are still responsible for converting dates to timestamp for custom tags.

 - HashSignTask: improved performance with resource-safe approach

 - IDMISContentExtractor: now extracts annotations with no defined color, from ImageServices, as expected.

 - IDMISContentExtractor: this task used to extract annotations and convert them immediately into a P8 format, which is not the responsibility of an extractor. Now extracts annotations in their original format, letting users decide to convert them into another format later in the map. 

 - ConvertIStoXFDF and ConvertIStoFDF: both tasks have been improved to integrate the legacy conversion capabilities of the IDMISContentExtractor.

 - IDMIS: supports extraction of documents without their content

 - MailDeleter: can now close a closed folder

 - MailMover: can now close a closed folder

 - MailMover: stores new path for documents once moved

 - MailSource: supports retrieval of mail conversations attachments

 - MoveContent: allows forcing a new file name when moving content of a document.

 - MDOWriter: allows a dynamic folder creation when prompted

 - MoveContent: allows to overwrite file

 - MovePunnet: allows a dynamic folder creation when prompted

 - TesseractInvoker: now rotates files for a better reading, based on content type

 - Tiff2PdfBox: now defines a default page orientation when the information is missing

Improvement: Some tasks are not used or can be replaced by better tasks for achieving the same goal, therefore they are removed from the task catalog to clean the catalog and make it easier to use. If you need any of these tasks, please contact support who can provide you with an archived version of them.

 - ASG Mobius

 - Ripole

 - Sanitize Jpeg

 - OpenOffice

 - DocumentIDGetter

 - FileNetDocumentIdGetter 

##### Config panel

New Feature: Expandable configuration panel.

New Feature: Help icon with a link to documentation in task and link configs.

##### Link config

New Feature: Links highlighted when their configuration panel is open

##### Task config

New Feature: Shared object edition functionality in task configuration panel.

New Feature: Queue threads edition functionality when creating a new queue.

Bugfix: Improve config task save, to avoid config losses when changing place while modifying task configuration.

Improvement: Pattern-based input: by default fills pattern fields with patterns format, plus an improved UI.

New Feature: Script-based input: added syntax highlighting in separate modals (JSTransform task for example).

New Feature: Script-based input: improved format code in separate modals (JSTransform task for example).

Bugfix: A null pattern value does not throw exceptions anymore.

<br />

## <b>Run Place</b>

##### Headband

Improvement: The campaign renaming tool is now moved to the campaign selection drop-down list. Now the name of the campaign is only displayed once on the UI, avoiding redundant information.

Improvement: Changed “Create campaign” icon which looked like a rename tool icon.

New Feature: Displays map version (see map version section).

##### Canva

Improvement: Tasks cannot be moved anymore since modifying a map is supposed to be done in the edit mode.

New Feature: Can now hold and drag the canvas with the left mouse button (instead of using the scrollbar).

New Feature: New Zoom in / Zoom out / Rescale functionalities.
Also supports Ctrl+mouse wheel.

Improvement: Hidden useless counters: queued punnets, processing punnets, and processing speed counters are hidden when they reach zero (mostly at the end of the campaign).

Improvement: Wording: “KO” replaced by “Exception” for consistency purposes.

Bugfix: Fast-forward: Premature end of campaign solved.

##### Explorer table

Improvement: Any item of the punnet metadata (columns) is now filterable.

New Feature: New task exceptions are displayed (see Task exceptions detailed section).

New Feature: Retry punnets: All punnets can be reprocessed (if no filter is selected).

##### Explorer pop-up (punnet structure)

New Feature: Syntax highlighting in xml view.

New Feature: Values are now highlighted in json view.

Bugfix: When a word is searched in a punnet, each of its occurrences is now highlighted.

##### Punnet Tracker
New Feature: Jump to another task with one click.

New Feature: Now possible to move to the next or previous task with the arrow key on the keyboard.

Bugfix: Fixed a bug when a punnet could be fully tracked because its punnetId changed during the workflow execution (tracking is now based on the punnetContextId).

New Feature: For duplicated punnets (with a fork on the workflow), you can now choose the next task to track in a list.

<br />

## <b>Maps Overview and Campaigns Management (previously Objects Board)</b>

##### Maps Overview

New Feature: Display all map versions (see map version section).

##### Campaigns Management

New Feature: Chips filter functionality on campaign status.

Improvement Feature: One report by campaign for Download Exceptions functionality.

<br />

## <b>Server Place</b>

##### Queues

New Feature: New delete queue functionality.

##### Workers & Logs

New Feature: See and download logs from navigator.

New Feature: Broker logs visible remotely (Actuator)

<br />

## <b>Shared Objects Place</b>

##### Shared Objects table

Improvement: Table homogeneous format.

Bugfix: Deleted Shared Object does not appear anymore in tasks that referred to it.

New Feature: Shared Objects are not editable on a read-only map (see map version section).

<br />

## <b>Internal</b>

##### Back-end structure

Improvement: Dependencies: cleaned or updated.

Improvement: APIs, controllers, services: reviewed.

Improvement: Broker package: reshape.

Improvement: Catalog: package architecture improved.

Improvement: Parsing of punnets is now done via Enums.

Improvement: Reduction of the pom.xml content needed to create a custom task.

Bugfix: Fixed an issue when a null value in a punnet metadata was serialized and sent to the database.

Improvement: Better management of input streams.

Improvement: For workers, the application.properties file now exposes three parameters to define the endpoint of the broker instead of the old broker.url parameter:

 - server.host

 - server.protocol

 - server.port

Improvement: In the broker logs, the ACR log level is now synchronized to the broker log level.

Improvement: Tasks will now detect when the JRE or JDK version is not the expected one, and throw the correct exception.

Bugfix: Transferring a document file between the worker and the broker led to creating a local copy of the file which wasn’t purged before a restart of the application. These temporary files are no longer kept alive after transfer.

Bugfix: Multi-threading tasks on the content of a document could lead to confusion between threads and loss of results. Fixed.

Improvement: Added a timeout in the queue management to prevent punnet from being stuck in a processing loop.

Improvement: Catalog: connector template will be used for future connectors.
Later we will apply it to old connectors.

Improvement: QA: Task class more covered by unit tests (QACI).

Improvement: QA: Stronger Broker and Worker integration tests.

Improvement: QA: More and more complete test cycles (Zephyr).

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

- Recent patches: Some recent patches directly delivered by Professional Services, whether for enhancement or bug fixing, were integrated too late in this version life cycle to be released in time. Contact your Professional Services referee if you want further information about your own installed patches. Know that 2025.0 is compatible with 2.12 worker libs.

- New task: MFilesInjector, new connector for M-Files through its API REST 

- New task: ComparePunnets, compare documents and data between source and injector 

- Evolution: FileNetInjector: Complete logs with advice on DateParseError 

- Evolution: LocalSource : Skip exception when parse Json does not work

- Security & confidentiality: Fast2 UI users can create a map and run a campaign with the JSTransform and ReadContent tasks to access local files, which represents a breach in confidentiality and security. We are working on a resolution for the final release. Please, for safety reasons, reduce access to only trusted IP addresses.

