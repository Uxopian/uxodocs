---
title: Buckets
sidebar_position: 4
description: Managing the organisation with buckets search results
date: "2005-03-28T13:23:01+02:00"
last_update:
  date: '2026-01-27T09:19:20.024Z'
  author: CI/CD Bot
content_hash: 9a0bb3c13a7b828f99d9ea5b2646026ea578d40402b065f3b1cbf04072e83d5b
---

# "Managing buckets"

The buckets (or aggregated results) of a search can be organised using the JS API.

## Subscription

The first step, before being able to manipulate these buckets, is to subscribe to buckets retrieval from **FlowerDocs Core**:

- or by search, providing `searchId` the identifier of the search in question:

```javascript
var bucketAPI = JSAPI.get().getHelperFactory().getBucketAPI();
bucketAPI.register(searchId, function (buckets, callback) {
    callback.onProcessed(buckets);
});
```

- or for all searches:

```javascript
var bucketAPI = JSAPI.get().getHelperFactory().getBucketAPI();
bucketAPI.register(, function(buckets, callback){
	callback.onProcessed(buckets);
});
```

The registered subscription is called up with two variables:

- The `buckets` array contains all buckets of the same level
- The `callback` provided as input to the subscription must be called with a bucket array

:::note[Example of sorting buckets]

```javascript
var orderMap = {};

orderMap[STATUS_1] = 0;
orderMap[STATUS_2] = 1;

var bucketAPI = JSAPI.get().getHelperFactory().getBucketAPI();
bucketAPI.register("searchId", function(buckets, callback){
    var ordered = new Array();
	for(i in buckets){
		var bucket = buckets[i];
		var index = getBucketIndex(bucket);
        var bucket = buckets[i];

	callback.onProcessed(ordered);
});

function getBucketIndex(bucket){
	var request = bucket.getRequest();
    var filter = request.getFilters()[0];
    var statusName = filter.getCriteria()[0].getValues()[0];
	return orderMap[statusName];

```

:::

:::info
Deleting or adding buckets is not supported. The total number of buckets determined must be equal to that determined by **FlowerDocs Core**.
:::

## Bucket modification

The JS API lets you modify buckets resolved by **FlowerDocs Core** by exhibiting the following methods:

| Function                          | Description                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------- |
| getName()                         | Returns the name                                                                |
| setName(name)                     | Modifies the name                                                               |
| getCount()                        | Returns the number of components contained in the bucket (sum of child buckets) |
| setCount(long count)              | Modifies the number of components contained in the bucket                       |
| getLevel()                        | Returns bucket level                                                            |
| hasChildren()                     | Determines whether the bucket contains child buckets                            |
| getChildren()                     | Retrieves child buckets                                                         |
| hasParent()                       | Determines whether the bucket has a bucket parent                               |
| getParents()                      | Retrieves parent buckets (all parent levels)                                    |
| getRequest()                      | Retrieves the request executed to determine the bucket's contents               |
| setRequest(SearchRequest request) | Modifies the request executed to determine the bucket's contents                |

:::info
Children and parents buckets are provided for information only. Modifications to these are not taken into account.
:::

## Hiding a bucket

The `setSkipDisplay(boolean skip)` function is also exhibited on the `Bucket` object, enabling a bucket to be hidden and only its children displayed.

:::note[Example: hiding buckets with the same name]

```javascript
var bucketAPI = JSAPI.get().getHelperFactory().getBucketAPI();
bucketAPI.register(function(buckets, callback){
	var ordered = new Array();
	for(i in buckets){
		var bucket = buckets[i];
		if(bucket.hasChildren() && bucket.getChildren().length ==1){
			if(bucket.getName().toUpperCase() == bucket.getChildren()[0].getName().toUpperCase()){
				bucket.setSkipDisplay(true);

		ordered.push(bucket);

	callback.onProcessed(ordered);
});
```

:::

# Recovery of buckets after resolution

The buckets of a search can be recovered after resolution as follows:

```javascript
var bucketAPI = JSAPI.get().getHelperFactory().getBucketAPI();
bucketAPI.registerForResolved("searchId", function(buckets){
   for(i in buckets){
       	var bucket = buckets[i];
		console.info(bucket.getName()+ " has been resolved, count=" +bucket.getCount());

   callback.onProcessed(buckets);
});
```

This allows you to obtain resolved buckets, including counters in the case of partial buckets.
