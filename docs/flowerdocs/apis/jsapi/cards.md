---
title: Cards
date: '2009-03-28T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 959edce7abe91f1b14f0cbd0273cc6f81f5cdddbaa4cb2553ea25f28e8fbb27c
---


# Available Objects

## Card

The functions available on the cards are as follows: 


| Function                                  | Description                                                           |
|-------------------------------------------|-----------------------------------------------------------------------|
|setTitle(String title)                     | Modifies card title                                                   |        
|setHeading(String heading)                 | Modifies card description                                             | 
|getActions()                               | Recovers the card's action container                                  | 
|getStyle()                                 | Retrieves the card's CSS class                                        | 
|addStyle(String style)                     | Adds the CSS class to the card                                        | 
|setStyle(String style)                     | Replaces the card's CSS classes with the one provided                 | 
|asElement()                                | Retrieves the card as a DOM element                                   | 


## Container cards 

Container cards are large cards into which content can be added. The functions available are as follows: 


| Function                                   | Description                                                           |
|--------------------------------------------|-----------------------------------------------------------------------|
|setTitle(String title)                      | Modifies card title                                                   |        
|setCaption(String caption)                  | Modifies card description                                             |
|setIcon(String icon)                        | Modifies card icon                                                    | 
|addCard(Card card)                          | Add a card to this one                                          		 |
|setContent(Component content)               | Allows to add a DOM element to the card                               |
|setVisible(boolean isVisible)               | Allows to hide or show the card                                    	 |
|setReduced(boolean isReduced)               | Allows to reduce the card (only the title is visible)                 | 
|getStyle()                            		 | Retrieves the card's CSS class                                        | 
|addStyle(String style)                      | Adds the CSS class to the card                                        | 
|setStyle(String style)                      | Replaces the card's CSS classes with the one provided                 | 


# Recording

To access the cards, you need to register when you add them. There are two types of cards for which the JS API can register, 
cards of attachments and search results.

## Search result

Subscription to the addition of a search result card is performed using the ``cardAPI`` object: 

```javascript
var cardAPI = JSAPI.get().getCardAPI();
cardAPI.registerForComponent(function(card component){
	...

```

The function parameters are: 

* ``card``: the added card
* ``component``: the component created from the search result


__Example:__ 

```javascript
var cardAPI = JSAPI.get().getCardAPI();
cardAPI.registerForComponent(function(card component){
	var actionAPI = JSAPI.get().getActionFactoryAPI();
	var myElement = document.createElement('button'); 
	myElement.innerHTML = "Custom button title";
	var action = actionAPI.buildDOM("className", "My action description", myElement);

	card.getActions().add(action);
	card.setTitle("Title");
	card.setHeading("Heading");

	myElement.onclick= function(){ 
		console.log(card);
		console.log(component.getClassId());

});
```

## Attachment

### Loading

For each attachment definition, you can subscribe to the loading of the corresponding card through a subscription mechanism using the ``cardAPI`` object: 

```javascript
var cardAPI = JSAPI.get().getCardAPI();
cardAPI.registerForAttachment(function(card, task, attDefinition, component){
	...

```

The function parameters are: 

* ``card``: the added card
* ``task``: the task to which the attachment is attached
* ``attDefinition``: the definition of the attachment 
* ``attComponent``: the component attached to the task


__Examples:__ 

```javascript
var cardAPI = JSAPI.get().getCardAPI();

cardAPI.registerForAttachment(function(card, task, definition, component){
	var actionAPI = JSAPI.get().getActionFactoryAPI();
	var myElement = document.createElement('button'); 
	myElement.innerHTML = "Custom button title";
	var action = actionAPI.buildDOM("className", "My action description", myElement);
	
	card.getActions().add(action);
	card.setTitle("Title");
	card.setHeading("Heading");

	myElement.onclick= function(){ 
		console.log(card);
		console.log(task.getClassId());
		console.log(definition.getClassId());
		console.log(component);

});
```

To programmatically add an attachment to a task, you can trigger an event such as: 

```javascript
var doc = new Document();
doc.setName("Attached document");
doc.setClassId("Claim");

var event = new AddTaskAttachmentEvent("Attachment2", doc);
var formAPI = JSAPI.get().getComponentFormAPI(<identifiant du composant>);
formAPI.fireEvent(event);

```

In order to display the previously programmatically added attachment in the viewer, it must be notified as follows: 
```javascript
formAPI.fireEvent(new AttachmentsLoadedEvent(formApi.getComponent()));   
```

### Changes

To react to changes made by users to attachments, you can subscribe to changes on the ``card`` object: 

```javascript
card.registerForChange(function(attachment){
	console.info("Detected attachment change: " + attachment);		
});
```

### Actions

Cards with attachments of type `DOCUMENT` have a set of native actions.

These actions can be managed programmatically using their identifier: 

* `upload-version`: uploading a new version of a document
* `delete-version`: deleting the uploaded version
* `upload-attached`: uploading a document to be created
* `delete-attached`: deleting existing document added
