---
title: "Folder content"
description: "Customise folder contents"
date: "2012-03-28T13:20:01+02:00"
---



The management of creation actions within a folder can be configured by registering a processor.
This processor determines whether or not creative actions are activated. 


```javascript
JSAPI.get().folder().registerForCreateAction(identifier, processor);
```


The `identify` variable is used to identify the folder (or context) in which the native management of creation actions should be overloaded.
This character string can take on the following values: 

* a folder identifier
* a folder class identifier
* `'*'` for all folders


The `processor` variable is a closure used to define the desired behavior: a creation action is visible or not. 
The following variables are provided as input to this closure: 

* folder: the folder concerned by the creation actions
* childCategory: the components category that can be created using the action
* action: the creative action
* callback: the callback indicates to the graphical user interface the configuration to be applied (enables asynchronous processing)

<br/>
For example, to hide the document creation action in the `Projects` folder:

```javascript
JSAPI.get().folder().registerForCreateAction("Folder",function(folder,childCategory, action, callback){
    if(folder.getName() =='Projects'&& childCategory == 'DOCUMENT'){
		callback.onSuccess(false);
	}else{
    	callback.onSuccess(true);

});
```
