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

## General

The following functions are available on shortcut containers.

| Function                                                                                             | Description                                                   |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `addCircled(String id, String icon, String color, String name, String description, Callback callback)` | Adds a shortcut with a circle type icon and hover description |
| `addIconized(String id, String icon, String color, String name, Callback callback)`                    | Adds a shortcut with an icon (FontAwesome)                    |
| `add(String id, Element element, String name, Callback callback)`                                      | Adds a shortcut with a DOM element as icon                    |
| `remove(String id)`                                                                                    | Deletes a shortcut using its identifier                       |
| `getIds()`                                                                                             | Recovers shortcut identifiers                                 |

### Examples

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

## Contextual menu

Additional functions are provided for manipulating a contextual menu:

| Function                                                                       | Description                                                                 |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `add(String groupId, String id, String icon, String label, Callback callback)` | Adds a shortcut icon to the context menu and to a group in the table header |
| `getSelected()`                                                                | Retrieves selected components                                               |
| `getCategory()`                                                                | Retrieves the category of selected components                               |
| `registerForActionDisplayResolution(Callback callback)`                        | Subscribes to the display of each action, to hide some of them              |

By using the `add` function, you can group actions according to need, using the same group identifier.

**Example:** Creating a task from two documents

```javascript
ContextualMenuAPI.get().registerForLoad(function(api){
	if(api.getSelected().length != 2 || api.getCategory() != "DOCUMENT"){
		return;
	}

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

### Menu built for a selection

The contextual menu is rebuilt each time the user changes the selection. The `api` received by a `registerForLoad` callback is bound to the menu it was called for:

- `getSelected()` and `getCategory()` keep returning the selection of that menu, even when they are called later, for example in an asynchronous callback.
- Once the user has changed the selection and another menu is being built, `add` and `remove` called on this `api` are ignored. An action computed asynchronously for a previous selection is therefore never added to the current menu.

`ContextualMenuAPI.get().getSelected()` returns the selection of the latest menu: use the `api` received by the callback to work on the selection of the menu it was called for.

### Hide an action

`registerForActionDisplayResolution` subscribes a callback called for each action before it is displayed, in the contextual menu and in the table header. The callback receives:

- `api`: the contextual menu being built, with `getSelected()` and `getCategory()`
- `action`: the action to display, as a `MenuAction`
- `callback`: to be called with the decision

| `MenuAction` function | Description                         |
| --------------------- | ----------------------------------- |
| `getGroup()`          | Identifier of the group of the action |
| `getId()`             | Identifier of the action            |
| `getIcon()`           | Icon of the action                  |
| `getLabel()`          | Label of the action                 |

The decision is given with `callback.onSuccess(value)`:

- `false` hides the action
- any other value, `true` or `undefined`, leaves the decision to FlowerDocs: the action is displayed if the user is allowed to use it

Several callbacks can be registered: they are all called and a single `false` hides the action. The decision can be asynchronous, for example after an ACL check or a REST call, but every callback must answer: the action is displayed only once all of them have answered.

```javascript
ContextualMenuAPI.get().registerForActionDisplayResolution(function (api, action, callback) {
	if (api.getCategory() != "TASK" || action.getId() != "Reassign") {
		callback.onSuccess(undefined);
		return;
	}

	// The "Reassign" answer is only displayed for a single task
	callback.onSuccess(api.getSelected().length == 1);
});
```

The actions displayed by FlowerDocs are identified as follows:

| Group     | Action                         | Identifier                          |
| --------- | ------------------------------ | ----------------------------------- |
| `native`  | Open                           | `open`                              |
| `native`  | Open in new window             | `openInNewWindow`                   |
| `native`  | Download                       | `DOWNLOAD_CONTENT`                  |
| `native`  | Delete                         | `DELETE`                            |
| `native`  | Share                          | `SHARE`                             |
| `native`  | Attach to a folder             | `ATTACH`                            |
| `native`  | Assign me                      | `assignToMe`                        |
| `native`  | Assign to somebody             | `assignToSomebody`                  |
| `viewer`  | Visualize                      | `READ_CONTENT`                      |
| `viewer`  | Compare                        | `compare`                           |
| `tasks`   | Create a task                  | Identifier of the task class        |
| `answers` | Answers of the task class      | Identifier of the answer            |

Actions added by a script with `add` are resolved the same way, with the group and identifier given to `add`.

**Example:** hiding all the answers

```javascript
ContextualMenuAPI.get().registerForActionDisplayResolution(function (api, action, callback) {
	callback.onSuccess(action.getGroup() != "answers");
});
```

**Example:** hiding the deletion

```javascript
ContextualMenuAPI.get().registerForActionDisplayResolution(function (api, action, callback) {
	callback.onSuccess(action.getId() != "DELETE");
});
```

:::warning
Hiding an action does not remove the corresponding permission: it only changes what is displayed. Restrict what a user may do with ACLs.
:::

### Responses to a task

If the user selects tasks from the same class and these have responses, these responses will be displayed as actions in the `answers` group of the contextual menu.

To hide some or all of these responses, register a callback with `registerForActionDisplayResolution` as shown above. Do not override the `registerToAddAnswersInTaskContextualMenu` function: a script overriding it replaces the product script.
