---
title: Document attachment
sidebar_position: 7
description: Popups displayed within the graphical user interface
date: "2004-03-28T13:25:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 5f2ad1b595ab3d159b8a7122b206be7de94b7bd03a1c091085027fc936cb906b
---

This section describes the possible interactions with the widget called `ComponentAttacher` which allows you to attach a component to a folder.

This type of popup cannot be created manually, but it is possible to subscribe to its opening in the following way:

```javascript
JSAPI.get()
    .getPopupAPI()
    .registerForComponentAttacherOpen(function (popup) {
        popup.setTitle("My new title");
        popup.setRapidSearchVisible(false);
        popup.getActions().get("advancedSearch").setEnabled(false);
    });
```

Properties that can be modified on other popup types can also be modified on this one. The following functions are specific to this type of popup:

| Property                                 | Description                                                                                   |
| ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| setRapidSearchVisible(boolean visible)   | Quick search visibility                                                                       |
| setSearchTemplate(String searchTemplate) | Defining the search form used for advanced search                                             |
| attach(Folder folder)                    | Attaches the current component to a folder                                                    |
| getActions()                             | Allows to retrieve the corresponding ActionSetAPI, to manipulate the various actions present. |

The actions available via the `getActions()` method are:

- `browseFolder`: Browse folder tree
- `advancedSearch`: Advanced search
- `newFolder`: Creating a new folder

<br/>

The popup displayed when the action is clicked `browseFolder` will display a folder tree. It's possible that for some requirements the complete tree structure won't meet your needs, and that a certain part of the tree structure
is authorised for an `attachment`. In this case, you can restrict the display of the various folders in this tree structure as follows:

```javascript
folderAttacher = JSAPI.get().getPopupAPI().getFolderAttacher();
folderAttacher.register(function(folder,toAttach, callback){
	if(folder.getName() == "2014"){
    	console.error("Remove item " + folder.getName() + " from browse tree");
		callback.onSuccess(null);

	else if(folder.getName() == "Arondor"){
		console.log("Force disable selection for "+ folder.getName());
		callback.onSuccess(new SelectableTreeItem(folder.getName(),false));

	else{
		console.log("Use applicative selection for "+ folder.getName());
		callback.onSuccess(new SelectableTreeItem(folder.getName());

});
```

In the example above, the component with the name _Arondor_ will be displayed, but not selectable. The one with the name _2014_ will not be displayed and the others will be.
<br/>
In the latter case, the selection used is the one calculated by the application, i.e it's only displayed if the current component class is in the folder's list of authorised children.
