---
title: "Folders & their content"
description: "Manipulating folders in JavaScript"
date: "2004-02-02"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



A [folder](/concepts/components/folders.md) can contain components: its children.
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


