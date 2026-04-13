---
title: Serial processing
sidebar_position: 5
description: Activate and configure serial processing sessions
date: "2005-04-28T13:20:01+02:00"
last_update:
  date: '2026-04-01T00:00:00.000Z'
  author: CI/CD Bot
content_hash: d4b6ec0b6c2de84157743ef234ee90134650dd6563cc18264894438e4c1f824e
---

Serial processing allows users to navigate through a list of documents or tasks one by one without returning to the search results. For a full description of the feature and its availability rules, see the [Serial processing concept page](/docs/flowerdocs/concepts/serial-processing).

# Activation

Serial processing sessions are configured using the JS API.
The following example enables serial processing unconditionally:

```javascript
JSAPI.get()
    .batchSession()
    .registerBuilder(function (session, callback) {
        callback.enable(session);
    });
```

By default, the session uses the query from the originating search or virtual folder.

# Customizing the session query

The JS API allows you to override the session query : for example, to restrict the session to components sharing a specific tag value:

```javascript
JSAPI.get()
    .batchSession()
    .registerBuilder(function (session, callback) {
        var request = session.getRequest();
        var clause = new SearchFilterClause();
        var criterion = new SearchCriterion();
        criterion.setName("status");
        criterion.setOperator("EQUALS_TO");
        criterion.setType("STRING");
        criterion.setValues(["TO_PROCESS"]);
        clause.getCriteria().add(criterion);
        request.getFilterClauses().add(clause);
        session.setRequest(request);
        callback.enable(session);
    });
```

# Enable/Disable the serial processing

You can then choose to enable or disable it for each menu or search.

```javascript
JSAPI.get().batchSession().registerBuilder(function(session, callback){
  	var newSession = activateBatchSession (session);
	callback.enable(newSession);
});

function activateBatchSession (session) {
	var place = session.getPlace();
	var placeId = place.getId();
	var template = place.getTemplate();

	if (placeId == 'AllTasksTab') {
		session.setEnabled(false);
		return session;
	} else if (placeId == '' && template == 'documentAllTagSearch'){
		return session;
	} else if( placeId == 'CollectiveTab') {
		session.setRequest(constructMailRequest (session));
		return session;
	}
	return null;
}

function constructMailRequest (session) {
	var request = session.getRequest();
	var filter = new AndClause();
	var classCriterion = new Criterion();
	classCriterion.setName('TypeCourrier');
	classCriterion.setOperator("EQUALS_TO");
	classCriterion.addValue(session.getComponentSource().getTagValue("TypeCourrier"));
	filter.addCriterion(classCriterion);
	request.addFilterClause(filter);
	return request;
}
```

# Session API reference

The JS API exposes the following methods on the session object:

| Function | Description |
| -------- | ----------- |
| `getRequest()` | Retrieves the query executed during the processing session |
| `setRequest(SearchRequest request)` | Modifies the query executed during the processing session |
| `getPlace()` | Retrieves the current place |
| `getSourcePlace()` | Retrieves the place at the origin of the processing session |
| `getComponentSource()` | Retrieves the component at the origin of the processing session |
| `getLast()` | Retrieves the identifier of the last component opened during the processing session |
| `setEnabled(boolean enabled)` | Disables the processing session |
| `isEnabled()` | Determines whether the processing session is active or inactive |
