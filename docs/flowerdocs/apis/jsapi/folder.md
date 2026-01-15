---
title: Folder content
description: Customise folder contents
date: "2012-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: e16c6483c7c00c299f243634ac2404d83974fb9589b0779e5745c019a764095d
---

The management of creation actions within a folder can be configured by registering a processor.
This processor determines whether or not creative actions are activated.

```javascript
JSAPI.get().folder().registerForCreateAction(identifier, processor);
```

The `identify` variable is used to identify the folder (or context) in which the native management of creation actions should be overloaded.
This character string can take on the following values:

- a folder identifier
- a folder class identifier
- `'*'` for all folders

The `processor` variable is a closure used to define the desired behavior: a creation action is visible or not.
The following variables are provided as input to this closure:

- folder: the folder concerned by the creation actions
- childCategory: the components category that can be created using the action
- action: the creative action
- callback: the callback indicates to the graphical user interface the configuration to be applied (enables asynchronous processing)

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
