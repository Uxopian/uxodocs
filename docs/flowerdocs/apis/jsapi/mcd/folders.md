---
title: Folders & their content
description: Manipulating folders in JavaScript
date: '2004-02-02'
last_update:
  date: '2025-12-02T14:29:22.460Z'
  author: CI/CD Bot
content_hash: 0b37595c39f86a10768dac45f320a9e4d7ff9a793df0b638f378f32f69d86c7b
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



A [folder](/docs/flowerdocs/concepts/components/folders) can contain components: its children.
A folder's children can be components of any category, but only documents and sub-folders are displayed in **FlowerDocs GUI**.


| Functions                                                                    | Description                                                                    |
|------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
|addChildren(String folderId, ComponentReference[] children, boolean replace)  | Adding children to a folder                                                   |        
|deleteChildren(String folderId, ComponentReference[] children)                | Deleting children from a folder                                             |        

# Adding content

To add a component to a folder, it must be referenced as a child of the folder using a `ComponentReference` object.
From this reference, the `addChildren(id, childReferences, replace, successCallback)` function revealed by the `JSAPI.get().folder()` service can be used.
The Boolean `replace` is used to indicate whether the content of the folder should be replaced by the new referenced children.


<Tabs>
  <TabItem value="add-document-to-a-folder" label="Add document to a folder">

```javascript
var childReference = new ComponentReference("documentId", "DOCUMENT");
JSAPI.get().folder().addChildren("folderId", [childReference], false, function(){
	console.info("The document has been added as child");
});
```

  </TabItem>
</Tabs>



# Deleting content

A component can be deleted from a folder so that it is no longer referenced as one of its children, using the `deleteChildren(folderId, childReferences, successCallback) function`

<Tabs>
  <TabItem value="delete-document-from-a-folder" label="Delete document from a folder">

```javascript
var childReference = new ComponentReference("documentId", "DOCUMENT");
JSAPI.get().folder().deleteChildren(folderId, [childReference], function () {
	console.info('The document has been removed from folder'");
});
```

  </TabItem>
</Tabs>


