---
title: Documents & their files
description: Manipulating documents in JavaScript
date: '2004-02-01'
last_update:
  date: '2025-12-02T14:26:41.610Z'
  author: CI/CD Bot
content_hash: 6069e333bbea1c38c649c70483c980af7be19251ab68909a001ca386d810c7b9
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



# Handling files

In addition to the tags associated with a [document](../.././../concepts/components/documents), files can be associated with it.
The JS API enables them to be manipulated through various consultation or modification functions.

## File access

From a `Document` object, the `getDocumentFiles()` function reveals an array of `DocumentFile` objects from which the following functions can be used: 

| Functions                                             | Description                                                                    |
|-------------------------------------------------------|--------------------------------------------------------------------------------|
|getId()                                                | File identifier recovery                                       |   
|setId(String id)                                       | File identifier definition                                         |        
|getName()                                              | File name retrieval                                                 |        
|setName(String name)                                   | File name definition                                                   |        
|getFormatCode()                                        | File format retrieval                                              |        
|setFormatCode(String formatCode)                       | File format definition                                                |        
|getCreationDate()                                      | Retrieving the file creation date                                 |        


<Tabs>
  <TabItem value="list-files-in-a-document" label="List files in a document">

```javascript
var doc = formAPI.getComponent();
doc.getDocumentFiles().forEach(function(file){
   console.info('The document has file: '+file.getId());
});
```

  </TabItem>
  <TabItem value="get-document-files" label="Get document files">

```javascript
JSAPI.get().document().getFiles(component.getId(), function(files){
    files.forEach(function(file){
        console.info('The document has file: '+file.getId());
    }); 
});
```

  </TabItem>
</Tabs>


File identifiers can also be retrieved from a document using the `getFiles()` function.

## Files modification

The list of files in a `Document` object can be initialised or modified using the JS API. 
To achieve this, the functions `addFile(tempFileId)` or `setFiles(tempFileIds)` can be used. 
Changes made to the object will only be taken into account when a document is created.


<Tabs>
  <TabItem value="create-a-document-with-a-text-file" label="Create a document with a text file">

```javascript
function createDocument(tempFileId, callback){
    var doc = new Document();
    doc.setName('My document');
    doc.setClassId('Document');
    doc.addFile(tempFileId);
    JSAPI.get().document().create([doc],function(created){
        callback(created[0]);
    });

function uploadTextFile(text, callback){
    var formData = new FormData();
    formData.append('file', new File([new Blob([text])], 'my-file.txt'));
    $.ajax({
        url: './upload',
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            callback(data.split('|')[0]);

    });   

uploadTextFile('Some text content', (tempFileId)=>{
    createDocument(tempFileId,(doc)=>{
        JSAPI.get().getNavigationAPI().goToComponentPlace(doc.getCategory(), doc.getId(), false);
    });
});
```

  </TabItem>
</Tabs>


# Versioning

If version management (or _versioning_) is enabled for a document, information about its different versions can be consulted using the following functions: 

| Functions                                             | Description                                                                    |
|-------------------------------------------------------|--------------------------------------------------------------------------------|
|getVersionSeriesId()                                   | Retrieving the VersionSeries identifier                                 |
|getVersionLabel()                                      | Retrieving the label of the current version                                 |
|isCurrentVersion()                                     | Determines whether the document is the current version                               |
