---
title: "Implementation"
date: "2020-02-01T11:20:01+02:00"
---


# Starting a session based on the context

We will restrict the start of processing sessions. We want only tasks opened from buckets `In process`  and `To be processed` of a virtual folder to trigger a processing session. 

To do this, we need to know the location when the task is opened, as well as the aggregation selected if the location is a virtual folder location.

:::note[ __Determining the place at the origin of the session__]
```javascript
var place = session.getPlace();
var aggregation = place.getSelectedLeaf();
// A virtual folder place is a BrowsePlace
if(place.getPlaceType().startsWith('Browse') && (aggregation.indexOf('ENCOURS') != -1 || aggregation.indexOf('ATRAITER') != -1 )){
    // the aggregation selected when the component was opened is `In process` or `To be processed` 

else{
    // no session should be started 

```
:::


We therefore obtain the following script: 
:::note[__Starting a session restricted to a virtual folder__]
```javascript
JSAPI.get().batchSession().registerBuilder(function(session, callback){
  	var place = session.getPlace();
    var aggregation = place.getSelectedLeaf();
	// A virtual folder place is a BrowsePlace
if(place.getPlaceType().startsWith('Browse') && (aggregation.indexOf('ENCOURS') != -1 || aggregation.indexOf('ATRAITER') != -1 )){
		callback.enable(session);
	}else{
		callback.enable(null);

});
```
:::


# To go further: manipulate the processing session

We now want to force the session to open only those tasks for which the priority entered is the same as that of the task at the origin of the session. 
To do this, the user could modify the application search to include this search criterion. 
However, it is also possible, by configuration, to modify the [session request](/apis/jsapi/recherche/list-processing.md)
 as well as other parameters.

In our example, we will modify our request and add the following priority criterion: 
:::note[ __Modifying the session request__]
```javascript
var request = session.getRequest();
var filter = new AndClause();
var classCriterion = new Criterion();
classCriterion.setName('Priorite');
classCriterion.setOperator("EQUALS_TO");
classCriterion.addValue(session.getComponentSource().getTagValue("Priorite"));
filter.addCriterion(classCriterion);
request.addFilterClause(filter);
session.setRequest(request);
```
:::


With this script, all the tasks opened in the rest of the processing session will have the same priority: 
:::note[__Activating the session while maintaining priority__]
```javascript
JSAPI.get().batchSession().registerBuilder(function(session, callback){
  	var place = session.getPlace();
    var aggregation = place.getSelectedLeaf();
	if(place.getPlaceType().startsWith('Browse') && (aggregation.indexOf('ENCOURS') != -1 || aggregation.indexOf('ATRAITER') != -1 )){
        var request = session.getRequest();
  	    var filter = new AndClause();
  	    var classCriterion = new Criterion();
  	    classCriterion.setName('Priorite');
  	    classCriterion.setOperator("EQUALS_TO");
  	    classCriterion.addValue(session.getComponentSource().getTagValue("Priorite"));
  	    filter.addCriterion(classCriterion);
  	    request.addFilterClause(filter);
  	    session.setRequest(request);
		callback.enable(session);
	}else{
		callback.enable(null);

});
```
:::



By modifying the request to add a more restrictive criterion than the original request, when the user processes the last task of that query, the session ends.
