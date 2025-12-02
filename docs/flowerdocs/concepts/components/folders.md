---
title: Folders
description: Classify your components to suit your needs.
date: '2018-03-03'
last_update:
  date: '2025-12-02T14:38:43.134Z'
  author: CI/CD Bot
content_hash: e84181869ce6c99677a85d447546e3d56a483b2fa3abaac7f18a5ec86716c411
---

:::info
Organize your documents by folder for easy retrieval.
:::



# Content

A folder is a component with children. These children can be [documents](/docs/flowerdocs/concepts/components/documents) or other folders.

<br/>
Constraints can be defined at folder class level to restrict the children that can be added to a folder. To do this, it is possible to reference the authorised component classes.

# Adding components

Via the interface, when the folder defines children, an `Add` button is used to select the component category to be created.

When indexing, it is possible to select the component class. All tags in common are listed on the write indexing form.

__Note:__ If there is only one component class, this is automatically selected.


# Permissions

In order to restrict the access or modifications that can be made to a folder, several permissions are available to control the operations that can be carried out: 

* Add or remove a child from a folder : `UPDATE_CONTENT`
* Detaching a document from a folder: `DETACH` (action possible from document indexing)
* Downloading the contents of a folder as an archive: `DOWNLOAD_CONTENT` Downloaded content contains only the documentary content of the folder and does not includes sub-folders.

 Some actions are only available if the user has write access to the folder. To do this, it must have the `UPDATE` permission and have reserved the folder (see [Reservation](/docs/flowerdocs/concepts/reservations). 

* Attaching the folder to another folder: `ATTACH`
 
<br/>
:::info
To go further, consult the Javadoc: 

* `Folder`
* `Folder classes`
:::
