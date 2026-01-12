---
title: “Folders
description: Classify your components to suit your needs.
date: "2000-05-03"
last_update:
    date: "2025-12-02T14:38:43.134Z"
    author: CI/CD Bot
content_hash: b175366b28b5ea920d924323ab72ad11b6540d3858da0439e54835578db37d84
---

:::info
Organize your documents by folder for easy retrieval.
:::

# Folder contents

A folder is a component with children. These children can be [documents](/docs/flowerdocs/concepts/components/documents) or other folders.

<br/>
Constraints can be defined at folder class level to restrict the children that can be added to a folder. To do this, it is possible to reference the authorized component classes.

# Folder permissions

In order to restrict access to, or modifications of, a document's content, a number of permissions are available to control possible operations:

- Add or delete a folder child from a folder : `UPDATE_CONTENT`
- Detach a document from a folder: `DETACH` (action possible from document indexing)
- Download the contents of a folder as an archive: `DOWNLOAD_CONTENT` Downloaded content contains only the documentary content of the folder and does not include subfolders.

Some actions are only available if the user has write access to the document. To do this, it must have the `UPDATE` permission and have reserved the folder (see [Reservation](/docs/flowerdocs/concepts/reservations).

- Attach the folder to another folder: `ATTACH`

<br/>
:::info
To go further, consult the Javadoc:

- `Folder`
- `Folder classes`
  :::
