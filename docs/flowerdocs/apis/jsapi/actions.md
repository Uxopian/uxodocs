---
title: Actions
sidebar_position: 5
date: "2001-03-01"
last_update:
  date: '2026-01-29T08:27:50.243Z'
  author: CI/CD Bot
content_hash: c135abac741b5ca41a594e0f503696e2f632b98acddff4224f895785970d8bf3
---

Several types of actions are available:

- Button: text presented as a button
- Icon: based on the icon font supported by FlowerDocs [Font Awesome 6.5.2](https://fontawesome.com/icons?d=gallery&m=free)
- DOM: HTML element

# Actions’ container

Actions are grouped into actions’ containers from which the actions can be accessed to.
To access an action, it is therefore necessary to identify which container is concerned.

<br/>

To list the actions present in a container `container`, use the following function:

```javascript
console.log("Container actions: " + container.getIds());
```

<br/>

All FlowerDocs actions’ containers are accessible via the API JS. This allows them to be manipulated. For example, you can add, delete, deactivate, hide or modify actions in this container.

## In a form

The object `componentFormAPI.getActions()` is used to interact with the actions of a form presenting a document, folder...

Several functions are available for this purpose:

| Function           | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| `getHeaderActions()` | Retrieves action container from header                              |
| `getTaskActions()`   | Retrieves action container for task creation                        |
| `getFooterActions()` | Retrieves the footer action container (validation, cancellation...) |

## Go to an action

From an action container `container`, there are several ways to access an action.

- Synchronously (which requires the action to have already been added to the container at runtime):

```javascript
var action = container.get(actionId);
```

- Asynchronously:

```javascript
container.registerForAdd(function (action) {});
```

:::info
Any customization of existing actions must be carried out in the `registerForAdd` to ensure that the action is loaded onto the form.
:::

# Actions

## Available functions

Once an action has been retrieved, you can interact with it using the functions provided:

| Functions                              | Description                                       |
| -------------------------------------- | ------------------------------------------------- |
| `setEnabled(boolean enabled)`            | Activates or deactivates the action               |
| `isEnabled()`                            | Determines whether the action is activated or not |
| `setTemporaryDisabled(boolean disabled)` | Temporarily disables an action (for buttons only) |
| `getId()`                                | Retrieves action identifier                       |
| `execute()`                              | Executes action programmatically                  |

<!---
|`getStyle()`                                  | Retrieves the action’s styles (HTML attribute ``class``)                       |
|`setStyle(String style)`                      | Defines action style                                                   		  |
|`addStyle(String style)`                      | Adds style to the action                                                       |
-->

**Example:** Disabling the action `Cancel` of a component

```javascript
formAPI.getActions().getFooterActions().registerForAdd(function(action){
    if(action.getName() == "delete") {
		action.setEnabled(false);

});
```

## Interactions with component actions

The execution of an action can be reacted at within a component indexing form.

To do this, simply use the function `registerForActionConfirmation(container, name, function(value, executor){})`:

- `container`: string correspoonfing to the action's container, either `header`, `footer` or `task`
- `name`: string correspoonfing to the name of the action
- `function(value, executor)`: the function to be executed when the user interacts with the action

**Example:** To call a function each time a user clicks on the button `Cancel` on an indexing page

```javascript
formAPI.getActions().getFooterActions().registerForAdd(function(action){
    if(action.getName() == "cancel") {
		formAPI.getActions().registerForActionConfirmation("footer", "cancel", function(value) { ...}

});
```

For even greater control over actions, the object `executor` supplied as a parameter to the closure can be used to:

- Block action execution:

```javascript
executor.hold();
```

- Resume action execution:

```javascript
executor.resume();
```

- Determine whether action execution is blocked or not:

```javascript
executor.isHeld();
```

**Note:** if an action is not blocked, it will resume once the closure has been executed.

<br/>

**Examples:** Blocking the execution of an action until an asynchronous call returns

```javascript
var actions = formAPI.getActions();
actions.registerForActionConfirmation("footer", “Validate", function(value, executor) {
    executor.hold();
    setTimeout(function(){
        executor.resume();
    }, 3000);
});
```

```javascript
var actions = formAPI.getActions();
actions.registerForActionConfirmation("footer", “Refuse", function(value, executor) {
    executor.hold();
    setTimeout(function(){
        JSAPI.get().getNotificationAPI().sendError("The task cannot be refused.");
    }, 3000);
});
```

# Build an action

Customized actions can be created thanks to API `ActionFactoryAPI`

## Button action

Two types of button action can be created:

- textual or main ones:

```javascript
JSAPI.get().getActionFactoryAPI().buildTextual(String id, String displayName, function(a){});
```

- minors

```javascript
JSAPI.get()
    .getActionFactoryAPI()
    .buildMinor(id, displayName, function (a) {});
```

**Example:** Add a button-type action to the table displaying the contents of a folder

```javascript
JSAPI.get().registerForFolderChildrenLoaded(function(api, phase, component) {
	var action = JSAPI.get().getActionFactoryAPI().buildTextual("action", "My action", function(a);

		console.log("execute action: " + a.getId());
	});
	api.getDocumentChildren().getActions().add(action);
});
```

## Icon action

This type of action is based on the FontAwesome font, offering a wide choice of icons through CSS styles.

**Example:** Add icon action on task attachments

```javascript
var cardAPI = JSAPI.get().getCardAPI();
cardAPI.registerForAttachment(function(card, task, definition, component){
	var actionAPI = JSAPI.get().getActionFactoryAPI();
	var action = actionAPI.buildIcon("myAction", “My action", "fa fa-user", function(actionPresenter){
		console.info("on click");
		actionPresenter.setEnabled(false);
    });
    card.getActions().add(action);
});
```

## Menu action

This type of action is based on the FontAwesome font, offering a wide choice of icons through CSS styles and a label.

**Example:** Add a menu action to a form header.

```javascript
var actionSet = formAPI.getActions().getHeaderActions();
var actionAPI = JSAPI.get().getActionFactoryAPI();
var action = actionAPI.buildMenu("myAction", “My menu", "fa fa-user", function(actionPresenter){
		console.info("on click");
});
actionSet.add(action)
```

## Responsive action

This type of action combines both an icon-type action and a menu-type action.

During construction, an integer is supplied to indicate the weight of this action. This weight determines the priority of the action to be displayed directly (as an icon) when enough space is available.

When there isn't enough space to display all actions, those with the greatest weight are displayed as icons first. The others are displayed in menu form.

```javascript
var actionSet = formAPI.getActions().getHeaderActions();
var actionAPI = JSAPI.get().getActionFactoryAPI();
var action = actionAPI.buildResponsive(
    "myAction",
    "My menu",
    "fa fa-user",
    10,
    function (actionPresenter) {
        console.info("on click");
    }
);
actionSet.add(action);
```

You can also change the weight of a native responsive action using the function `setWeight(String actionId, int weight)` in the action container.

```javascript
JSAPI.get().registerForComponentChange( function(formAPI, component, phase) {
	formAPI.getActions().getHeaderActions().registerForAdd(function(action) {
       if(action.getId() == “attach") {
	        formAPI.getActions().getHeaderActions().setWeight(action.getId(), 0); // In the menu

       else if(action.getId() == "replaceContent"){
	        formAPI.getActions().getHeaderActions().setWeight(action.getId(), 100); // In first position

    });
});
```

**Note:** _this type of action can only be used for `headerActions` of a component indexing form._

## DOM action

This fifth type of action also has the `name` and `label` properties. The last property is a DOM element `element`.
It is possible to interact with this DOM element using classic DOM events such as _onclick_, _onmouseover_, ...

**Example:**

```javascript
	var actionAPI = JSAPI.get().getActionFactoryAPI();

	var element = document.createElement('button');
	element.innerHTML = "Custom button title";
	var action = actionAPI.buildDOM("className", "hover label", element);

	element.onclick= function(){
		console.log("Click on DOM button");

```
