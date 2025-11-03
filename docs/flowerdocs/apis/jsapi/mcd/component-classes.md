---
title: "Component classes"
description: "Manipulating component classes in JavaScript"
date: "2001-02-02"
---


:::info
The [component classes](/concepts/classes/getting-started.md) define component typologies.
Thanks to the JS API, they can be manipulated by scripts to access a scope's data model.
:::



# Retrieving a component class

Each category of component class can be manipulated using the JS API through a specific object. 
An instance of this object can be retrieved using the following functions: 

* Document class: ``JSAPI.get().documentClass()``
* Folder class: ``JSAPI.get().folderClass()``
* Virtual folder class: ``JSAPI.get().virtualFolderClass()``
* Task class: ``JSAPI.get().taskClass()``

<br/>

This object can be used to retrieve component classes in the same category. To achieve this, a `get` function is exhibited. It is used to query the client-side cache first. If one or more classes have not already been cached, the services exhibited by **FlowerDocs Core** will be queried to retrieve the missing classes.

```javascript
JSAPI.get().documentClass().get(["Document"], 
	function(classes){
		console.info("Success!");
	},
	function(error){
		console.error("Document classes could not be got: " + error);

);
```


# Component class information

Component classes contain information used by the Core or graphical user interface. They can be retrieved using the following functions: 

| Functions                                             | Description                                                                                                    |
|-------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
|getId()                                                | Component class identifier retrieval                                                        |        
|getLocalizedDisplayName()                              | Retrieval of the internationalized class name according to the current user's language            |        
|getLocalizedDescription()                              | Retrieval of the internationalized class description according to the current user's language |        
|getTagReferences()                                     | Retrieval of tag references carried by the component class                                          |        

<!--- Does not work actually
|getDisplayNames()                                      | Retrieval of class names                                                                             |        
|getDescriptions()                                      | Retrieval of class descriptions                                                                     |        

For the functions ``getDisplayNames()`` and ``getDescriptions()``, the returns are in the form of the label I18N 
--> 
 

# Access to tag references 

Each component class has a list of [tag references](/concepts/classes/tag-reference.md). These references can be used to associate [tag classes](/concepts/tags/overview.md) to a component typology.

From a component class, the `getTagReferences()` function exhibits tag references in the form of an array of objects. The following functions can be used for each of these objects: 


| Functions                                             | Description                                                                                                       |
|-------------------------------------------------------|----------------------------------------------------------------------|
|getTagName()                                           | Retrieval of the tag reference name                                                                        |        
|getLocalizedDescription()                              | Retrieval of the internationalized reference description according to the current user's language |        
|getPattern()                                           | Retrieval of the tag reference pattern                                                                    |        
|getDefaultValue()                                      | Retrieval of the default tag reference value                                                       |        
|getOrder()                                             | Retrieval of the position of the tag reference                                                                |        
|isMandatory()                                          | Determines whether the tag is mandatory                                                                               |        
|isMultivalued()                                        | Determines whether the tag is multivalued                                                                                |        
|isReadonly()                                           | Determines whether the tag is read-only                                                                          |        
|isTechnical()                                          | Determines whether the tag is technical                                                                                 |        

