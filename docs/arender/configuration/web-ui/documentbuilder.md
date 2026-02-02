---
title: "Document builder"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 16aa08b3f4e58b881871bdbb6c11a83b12068306e99aa393786e9d60fe732f7c
---

## General

- Key: documentbuilder

    | Description                                                                            | Parameter Key                                | Type    |
    | -------------------------------------------------------------------------------------- | -------------------------------------------- | ------- |
    | Enable/disable this component                                                          | enabled                                      | Boolean |
    | Hide/Show the document builder button                                                  | button.visible                               | Boolean |
    | Make thumbs of document builder draggable (or not)                                     | thumbs.draggable                             | Boolean |
    | Enable document builder at startup                                                     | activateOnStartup                            | Boolean |
    | Hide document navigator                                                                | hideDocumentNavigator                        | Boolean |
    | Width (in pixel)                                                                       | width                                        | Integer |
    | Save behavior                                                                          | save.behavior                                | String  |
    | Download created document after save.                                                  | save.download                                | Boolean |
    | Clear the created document after save. Otherwise, the document is frozen (since 2.2.1) | save.delete                                  | Boolean |
    | Display warning popups when documents are dirty                                        | displaySaveWarning                           | Boolean |
    | Enable local download button in the document builder contextual menu                   | contextual.menu.download.enabled             | Boolean |
    | Enable annotation download button in the document builder contextual menu              | contextual.menu.download.annotations.enabled | Boolean |
    | Enable create first document button in the document builder contextual menu            | contextual.menu.createFirst.enabled          | Boolean |
    | Enable update first document button in the document builder contextual menu            | contextual.menu.updateFirst.enabled          | Boolean |
    | Enable delete document button in the document builder contextual menu                  | contextual.menu.delete.enabled               | Boolean |

```cfg title="arender.properties"
# Enable DocumentBuilder. The saved document will be created into
# document referential, then frozen if the save is successful.

documentbuilder.enabled=true
documentbuilder.save.behavior=CREATE_NEW_FIRST_DOCUMENT
documentbuilder.save.delete=false
```
