---
title: Utility functions
sidebar_position: 4
date: "2018-03-28T13:22:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 5715fc1c292c11006e83af7415cd8f1933c095eafc56da4a2a28128802dbc860
---

## Permissions

It is possible to determine whether the current user has got a permission:

- from a component

```javascript
ACLHelper.isGranted(component, "CREATE", function (granted) {
    console.info("granted: " + granted);
});
```

- from an ACL identifier

```javascript
ACLHelper.isGranted(component.getACL(), "CREATE", function (granted) {
    console.info("granted: " + granted);
});
```

## Identifier extraction

To extract identifiers from an array of components, you can use the following function:

```javascript
Ids.from(components);
```

## Tag Propagation

To propagate common tag values from one or more components to a target component, the following functions are available:

| Functions                                  | Description                                                          |
| ------------------------------------------ | -------------------------------------------------------------------- |
| `predict(sourceComponent, targetComponent)`  | Propagate common tags from a component to a target component         |
| `predict(sourceComponents, targetComponent)` | Propagate common tags from a set of components to a target component |

**Example:** Creating a task from two documents

```javascript
ContextualMenuAPI.get().registerForLoad(function(api){
	if(api.getSelected().length != 2 || api.getCategory() != "DOCUMENT"){
		return;

	var icon = new Icon();
	icon.setContent("fa fa-user flat-mauve");
	api.add("createTask", icon.asElement() , "Task", function(){
		var newTask = new Task();
		newTask.setClassId("GEC_Step0_Creation");
		TagOracle.predict(api.getSelected(), newTask);
		newTask.addAttachments("Courrier", Ids.from(api.getSelected()), "DOCUMENT");
		var popup = JSAPI.get().getPopupAPI().buildComponentCreation(newTask);
		popup.show();
	});
});
```

## Version comparison

The `compareVersion('x.y.z')` function compares the input version with the deployed version:

| Results | Description                                                  |
| ------- | ------------------------------------------------------------ |
| `-1`    | The deployed version is older than the supplied version \*   |
| `0`     | The deployed version is identical to the supplied version \* |
| `1`     | The deployed version is newer than the supplied version \*   |

\*_comparison does not take the patch number into account_
