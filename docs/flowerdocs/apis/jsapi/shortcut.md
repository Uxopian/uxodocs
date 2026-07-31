---
title: Shortcuts
sidebar_position: 1
date: "2008-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 30e0bad1339c114e87d8aa625e3abb8eba7b4cdeb1df4a1365d854d27c137fbb
---

To facilitate access to certain actions, several shortcut containers can be manipulated through the JS API:

- `ContextualMenuAPI`: component contextual menu (present on search results tables)
- `MenuShortcutsAPI` : button `+` accessible from the menu bar

There are two ways of accessing these APIs:

- `get()`: access the loaded shortcut container at any time
- `registerForLoad(function(api){});` : subscribe to the loading of a shortcut container

# General

The following functions are available on shortcut containers.

| Function                                                                                             | Description                                                   |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `addCircled(String id, String icon, String color, String name, String description, Callback callback)` | Adds a shortcut with a circle type icon and hover description |
| `addIconized(String id, String icon, String color, String name, Callback callback)`                    | Adds a shortcut with an icon (FontAwesome)                    |
| `add(String id, Element element, String name, Callback callback)`                                      | Adds a shortcut with a DOM element as icon                    |
| `remove(String id)`                                                                                    | Deletes a shortcut using its identifier                       |
| `getIds()`                                                                                             | Recovers shortcut identifiers                                 |

## Examples

To subscribe to the loading of these shortcut menus, the following functions will be used:

**Create a folder from the menu bar**

```javascript
MenuShortcutsAPI.get().registerForLoad(function (api) {
    api.addCircled(
        "createFolder",
        "fas fa-folder-open",
        "flat-red",
        "Folder",
        "Create a folder",
        function () {
            var newFolder = new Folder();
            newFolder.setClassId("Folder");
            var popup = JSAPI.get().getPopupAPI().buildComponentCreation(newFolder);
            popup.show();
        }
    );
});
```

# Contextual menu

Additional functions are provided for manipulating a contextual menu:

| Function                                                                     | Description                                                                 |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `add(String groupId, String id, String icon, String label, Callback callback)` | Adds a shortcut icon to the context menu and to a group in the table header |
| `getSelected()`                                                                | Retrieves selected components                                               |
| `getCategory()`                                                                | Retrieves the category of selected components                               |

By using the `add` function, you can group actions according to need, using the same group identifier.

**Example:** Creating a task from two documents

```javascript
ContextualMenuAPI.get().registerForLoad(function(api){
	if(api.getSelected().length != 2 || api.getCategory() != "DOCUMENT"){
		return;

	api.add("customActions", "createTask", "fa fa-user" , "Task", function(){
		var newTask = new Task();
		newTask.setClassId("GEC_Step0_Creation");
		TagOracle.predict(api.getSelected(), newTask);
		newTask.addAttachments("Courrier", Ids.from(api.getSelected()), "DOCUMENT");
		var popup = JSAPI.get().getPopupAPI().buildComponentCreation(newTask);
		popup.show();
	});
});
```

**Responses to a task**

If the user selects tasks from the same class and these have responses, these responses will be displayed as actions in the contextual menu.

This feature can be disabled by adding the following JS script:

```javascript
function registerToAddAnswersInTaskContextualMenu() {}
```
