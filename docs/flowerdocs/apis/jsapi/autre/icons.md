---
title: Icons
description: Modify component icons in JavaScript
date: '2000-02-01'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: ad2556de6056379e317fbc7c72c34e5e3419310a3c4ce9b0fe095323b4f2ce98
---

:::info
Each component category has its own icon in **FlowerDocs GUI**. For tasks, the icon can be defined by class, to provide a different icon for each user step.
:::

# Icon Resolver

In certain situations, it may be necessary to define an icon based on a component's tags. 
To do this, you can define an _Icon Resolver_ to define the icon to be applied to a component.
_multiple Icon Resolvers can be defined, in which case the first one to respond with a value will be taken into account._

_Icon Resolvers_ are used to resolve a component's icon when it is displayed in **FlowerDocs GUI**. 

# Recording

An _Icon Resolver_ can be registered using the function `registerComponentIconResolver(resolver,tags)` exposed by `JSAPI.get().getHelperFactory()`. 
The `resolver` parameter corresponds to a function accepting two parameters: 

* `component`: the component whose icon is to be defined
* `callback`: object whose `onSuccess()` function must be called once the icon calculation has been completed (in the case where the icon is not defined by the _Icon Resolver_, the `onSuccess()` function must be called with no value)

The `tags` parameter corresponds to the list of tags according to which the icon will be resolved. 
<br/>
**Example:** To define an icon of type _loupe_ for all components of class `IncomingMail`, it is possible to register an _Icon Resolver_ such as : 

```javascript
JSAPI.get().getHelperFactory().registerComponentIconResolver(function(component, callback){
  if(component.getClassId() == 'IncomingMail'){
    callback.onSuccess('fa fa-search');
  }else{
    callback.onSuccess(null);

});
```

<br/>
**Example:** To define a _loupe_ type icon for all components with the tag value `TypeCourrier` equal to `Order` and the `Status` equal to `TODO`, it is possible to register a _Icon Resolver_ such as : 

```javascript
JSAPI.get().getHelperFactory().registerComponentIconResolver(function (component, callback) {
	if (component.getTagValue('MailType') == 'Order' && component.getTagValue('Status') == ‘TODO') {
		callback.onSuccess('fa fa-search');
	} else {
		callback.onSuccess(null);
	}}, 'MailType', 'Status');
```
