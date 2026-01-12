---
title: Document builder
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: f22dea08244e1a5502ff0cc7e52811acc816d3f3bd236678f5fc07f24e857eb5
---

## General

| Description                                                                                                | Parameter Key                                                            | Default value       | Type    |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------- | ------- |
| Enable/disable this component                                                                              | documentbuilder.enabled                                                  | false               | Boolean |
| Hide/Show the document builder button                                                                      | documentbuilder.button.visible                                           | true                | Boolean |
| Make thumbs of document builder draggable (or not)                                                         | documentbuilder.thumbs.draggable                                         | true                | Boolean |
| Enable document builder at startup                                                                         | documentbuilder.activateOnStartup                                        | false               | Boolean |
| Hide document navigator                                                                                    | documentbuilder.hideDocumentNavigator                                    | false               | Boolean |
| Width (in pixel)                                                                                           | documentbuilder.width                                                    | 280                 | Integer |
| Save action                                                                                                | documentbuilder.save.action                                              | save                | String  |
| Save behavior (UPDATE_NO_DOCUMENT, CREATE_NEW_FIRST_DOCUMENT, UPDATE_FIRST_DOCUMENT, UPDATE_ALL_DOCUMENT)  | documentbuilder.save.behavior                                            | UPDATE_NO_DOCUMENT  | String  |
| Download created document after save.                                                                      | documentbuilder.save.download                                            | true                | Boolean |
| Clear the created document after save. Otherwise, the document is frozen (since 2.2.1)                     | documentbuilder.save.delete                                              | false               | Boolean |
| Display warning popups when documents are dirty                                                            | documentbuilder.displaySaveWarning                                       | true                | Boolean |
| Create child document (folders)                                                                            | documentbuilder.addChild.enabled                                         | false               | Boolean |
| Create new document (not only compose)                                                                     | documentbuilder.createDocument.enabled                                   | true                | Boolean |
| Delete on right click a list of selected thumbs                                                            | documentbuilder.deleteSelectedThumbs.enabled                             | true                | Boolean |
| Create a new document from selected thumbs                                                                 | documentbuilder.createDocumentFromSelectedThumbs.enabled                 | true                | Boolean |
| Close the builder                                                                                          | documentbuilder.close.enabled                                            | true                | Boolean |
| Display the legacy save document builder button                                                            | documentbuilder.button.legacySave.enabled                                | false               | Boolean |
| Display the button : download the builder document locally                                                 | documentbuilder.button.download.enabled                                  | true                | Boolean |
| Display the button : run custom action on builder document                                                 | documentbuilder.button.custom.enabled                                    | false               | Boolean |
| Display the button : download the builder document with annotation                                         | documentbuilder.button.download.annotations.enabled                      | false               | Boolean |
| Display the button : update all documents                                                                  | documentbuilder.button.updateAll.enabled                                 | false               | Boolean |
| Display the button : Create new first document                                                             | documentbuilder.button.createFirst.enabled                               | false               | Boolean |
| Display the button : Update the document                                                                   | documentbuilder.button.updateFirst.enabled                               | false               | Boolean |
| Display the saveAll button, even if documents are empty                                                    | documentbuilder.button.saveAll.active.when.empty                         | false               | Boolean |
| Display the updateAll button, even if documents are empty                                                  | documentbuilder.button.updateAll.active.when.empty                       | false               | Boolean |
| Sets up the policy to populate the document builder (CopyCurrentDocument or EmptyDocument)                 | documentbuilder.populatorPolicy                                          | CopyCurrentDocument | String  |
| Sets up the policy CopyCurrentDocument from the builder : need to flatten the documents indentation or not | documentbuilder.populatorPolicy.CopyCurrentDocument.flattenNodeHierarchy | true                | Boolean |
| Hides the document builder button until all documents have been loaded                                     | documentbuilder.button.hideUntilLoaded                                   | true                | Boolean |
| Thumb navigator view behavior after processing a download in document builder                              | documentbuilder.afterDownload                                            | hide                | String  |
| Display the button : Refresh the document to its original state                                            | documentbuilder.button.refresh.enabled                                   | true                | Boolean |
| Enable local download button in the document builder contextual menu                                       | documentbuilder.contextual.menu.download.enabled                         | false               | Boolean |
| Enable annotation download button in the document builder contextual menu                                  | documentbuilder.contextual.menu.download.annotations.enabled             | false               | Boolean |
| Enable create first document button in the document builder contextual menu                                | documentbuilder.contextual.menu.createFirst.enabled                      | false               | Boolean |
| Enable update first document button in the document builder contextual menu                                | documentbuilder.contextual.menu.updateFirst.enabled                      | false               | Boolean |
| Enable delete document button in the document builder contextual menu                                      | documentbuilder.contextual.menu.delete.enabled                           | false               | Boolean |
