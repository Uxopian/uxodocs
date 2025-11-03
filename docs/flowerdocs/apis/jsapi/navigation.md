---
title: "Navigation"
description: "Manage navigation between different screens"
date: "2006-03-28T13:20:01+02:00"
---

:::info
FlowerDocs uses a placeholder mechanism to define the activity (or screen) the user is currently viewing in the URL.
The fact that this placeholder is carried by the URL means that users can : 

- refresh their browser while remaining in the same context
- navigate through browser history (Previous and Next buttons)
:::


# Navigation
To control these functions via the JS API, a navigation API is provided: 

```javascript
var navigationJSAPI = JSAPI.get().getNavigationAPI();
```
<br/>

| Function                                              | Description                                                                    |
|-------------------------------------------------------|--------------------------------------------------------------------------------|
|reload()                                               | Allows you to reload the current space without confirmation                    |
|goBack(boolean confirmation)                           | Returns to previous position<br/>- ``confirmation``: Boolean to deactivate confirmation at change of place if there are unsaved modifications |               
|goToComponentPlace(String category, String identifiant, boolean confirmation)| Redirects the user to the component modification screen, providing : <br/>- ``category`` : ``DOCUMENT``, ``FOLDER``, ``TASK``, ``VIRTUAL_FOLDER`` <br/>- ``identifiant`` : identifier of component to open <br/>- ``confirmation``: Boolean to deactivate confirmation at change of place if there are unsaved modifications   |   
|goTo(Place place, boolean confirmation)                | Redirects the user to a seat <br/>- ``place`` : identifier of place to open <br/>- ``confirmation``: Boolean to deactivate confirmation at change of place if there are unsaved modifications |

It is possible to redirect the user to a place built from different [tokens](/config/gui/menu/default.md).  
__Example :__ Redirect to a task creation screen ``GEC_Step0_Creation``

```javascript
var navigationJSAPI = JSAPI.get().getNavigationAPI();
var placeToken = 'storeTask(GEC_Step0_Creation)';
navigationJSAPI.goTo(flower.docs.PlaceBuilder.build(placeToken),false);
```

<br/>
The Navigation API also allows you to override the default location (defined at profile level). 
To do this, you can subscribe to its opening via the ``registerForPlaceChange(callback) function`` 

__Example :__ Override the default placeholder with the search form ``pliSearch``

```javascript
var navigationJSAPI = JSAPI.get().getNavigationAPI();
navigationJSAPI.registerForPlaceChange(function(placeToken, callback){
   callback.go(flower.docs.PlaceBuilder.build("search(pliSearch)"));
});
```

# Current place
Thanks to the Navigation API, it is also possible to retrieve the current place and its characteristics using the `getWherePlace()` method.

```javascript
var navigationJSAPI = JSAPI.get().getNavigationAPI();
var place = navigationJSAPI.getWherePlace();
```
<br/>

This object exposes the following methods:


| Function              | Description                                        																					|
|-----------------------|-----------------------------------------------------------------------------------------------------------------|   
|getWhereId()      	   | To obtain the identifier of the current place                            	      								   	|    
|getPlaceType()         | Used to obtain the type of the current place: `HomePlace`, `SearchPlace`, `BrowsePlace`, `ModifyVirtualFolderPlace`, `ModifyFolderPlace` , `AdminPlace`|  
|getSelectedLeaf() 	   | Displays the selected aggregation in the virtual folder   												   			      |
|getOpenedItems() 	   | Retrieves the tree structure open in the virtual folder																			|
|getTemplate() 		   | Retrieves the selected search pattern				   																				| 
|getRequest()		      | Retrieves the query executed in searches and virtual folders (visible in the URL)											|
|getSearchDisplayMode() | Recovers the search display mode : `CARD` or `TABLE`																				|
|getVirtualFolderMode() | Recovers the display mode of the virtual folder : `VIEWER` or `AGGREGATION`													|
|isAdminPlace() 	      | Indicates whether the page is on the administration side 																		   |

