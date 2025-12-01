---
title: History
description: Managing a component's history
date: '2012-03-28T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: fe441c65eaa5ef4d329f225ac2f01e4a56a824cc1119619d737ad3a144a6bb2d
---


:::info
The history allows to display the modifications made to a component since its creation. This history can be manipulated to add, modify or delete facts.
:::



A fact allows you to trace an action performed on a component and thus provide a component history. 

# Factual information

The facts are made up of several pieces of information that allow us to identify the precise action performed and its context.

## Object identification

The object on which a fact took place can be identified from the object type and its identifier. 

| Functions               	| Description                            |
|---------------------------|----------------------------------------|
|getObjectType()          	| Object type retrieval           		 | 
|setObjectType(String type) | Modification object type          	 |
|getObjectId()          	| Object identifier retrieval			 |
|setObjectId(String id)     | Object identifier modification		 |


## Context

In order to provide information on the context in which a fact took place, several types of information are available: 

| Functions                                  | Description                                            |
|--------------------------------------------|--------------------------------------------------------|
|getUser()                                   | User recovery                                          | 
|setUser(String user)                        | User Modification                                      | 
|getAction()                                 | Action performed recovery                              | 
|setAction(String action)                    | Action performed modification                          | 
|getDescription()                            | Description retrieval                                  | 
|setDescription(String description)          | Description modification                               | 
|getCreationDate()                           | Action completion date recovery                        | 
|setCreationDate(Date date)                  | Action completion date modification                    | 



The actions (see [`com.flower.docs.domain.fact.Action`](#javadoc-com-flower-docs-domain-fact-Action)) supported for facts are:

* ``CREATE``: Component creation
* ``UPDATE``: Component update
* ``VERSION``: Creating a component version
* ``ASSIGN``: Assignment of a task to a user
* ``ADD_CONTENT``: Adding an attachment to tasks, adding or updating content for documents and adding components to a folder
* ``DELETE_CONTENT``: Deleting an attachment to tasks, deleting content for documents and deleting components to a folder
* ``REVERT``: Restores a version of a document


## Additional fields

In addition to information natively stored in the facts, additional fields can be stored (or simply displayed) using [`com.flower.docs.domain.common.ResultField`](#javadoc-com-flower-docs-domain-common-ResultField). 

 


| Functions                                  | Description                                                        |
|--------------------------------------------|--------------------------------------------------------------------|
|getUpdatedFields()                          | Fact fields recovery                                               | 
|setUpdatedFields(ResultField[] fields)      | Fact fields modification                                           | 
|addUpdatedField(ResultField fields)         | Add a field to the fact                                            | 
|addUpdatedFields(ResultField[] fields)      | Add several fields to the fact                                     |

```javascript
var fact = new Fact();
var field = new ResultField();
field.setName("RefClient");
field.setValue("1234");
fact.addUpdatedField(field)
```

# Add facts

In certain business contexts, it may be necessary to build your own facts. To do this, several functions are available for this purpose:

To add new facts, it is first necessary to obtain a fact instance with one of the following constructors: 

| Functions                                  | Description                                                                    |
|--------------------------------------------|--------------------------------------------------------------------------------|
|new Fact(Component component)               | Creating a fact from a component                                     	      |
|new Fact()                                  | Creating an empty fact                                                         |


To modify a component's history, you need to subscribe to the history opening feature:

```javascript
var factAPI = JSAPI.get().getHelperFactory().getFactAPI();  
factAPI.register(component.getId(), function(facts, callback){
	//Manipulate facts of component
});
```

The `facts` array provided as input to the subscription contains the facts determined natively by the application.
In order to modify the facts displayed to users, it is necessary to provide a modified array to the `callback` provided: 


```javascript
var factAPI = JSAPI.get().getHelperFactory().getFactAPI();  
factAPI.register(component.getId(), function(facts, callback){
	var processed = new Array();
	callback.onProcessed(processed);
});
```

:::note[Example: adding two facts to a component's history]
```javascript
JSAPI.get().registerForComponentChange(function(componentFormAPI, component, phase) {        
	var factAPI = JSAPI.get().getHelperFactory().getFactAPI();
	factAPI.register(component.getId(), function(facts, callback){
		var fact1 = new Fact(component);
		var date1 = new Date("January 15, 2017 11:13:00");
		fact1.setUser(JSAPI.get().getUserAPI().getUserId());
		fact1.setCreationDate(date1.getTime());
		fact1.setAction("UPDATE");
		var field1 = new ResultField();
		field1.setName("RefClient");
		field1.setValue("2018-01-01 12:01:07.006 +0100");
		fact1.addUpdatedField(field1);

		var fact2 = new Fact(component);
		var date2 = new Date("January 16, 2017 11:13:00");
		fact2.setCreationDate(date2.getTime());
		fact2.setDescription("Description for fact2");

		facts.push(fact1);		
		facts.push(fact2);
		callback.onProcessed(facts);
	});
});
```
:::



<br/>
:::info
Configuring the fields to be historised with a class document ``FactFieldsConfiguration``.
:::
