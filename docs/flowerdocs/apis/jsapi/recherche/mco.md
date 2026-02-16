---
title: Model
sidebar_position: 1
description: Searching for components through the JS API
date: "2005-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: dd7cbfc5dee20f359c4bd072f4407c0e3d9bcd68ddd522ba54927bf770d6288c
---

To search for components via the JS API, use the `search` function for the various service APIs **[here](../mcd/services)**.

# Queries, filters and criteria

**Objects :**

- `SearchRequest`

| Function                                   | Description                                          |
| ------------------------------------------ | ---------------------------------------------------- |
| addSelect(String field)                    | Adds a field to be remounted                         |
| addFilterClause(FilterClause filterClause) | Adds an additional criterion                         |
| getFilters()                               | Retrieves an array containing all `FilterClause`     |
| addOrderClause(OrderClause orderClause)    | Adds a field on which to sort search results         |
| setMax(int max)                            | Defines the maximum number of results to be returned |
| getMax()                                   | Retrieves the maximum number of results to return    |
| setStart(int start)                        | Defines the start of the search page                 |
| getStart()                                 | Retrieves the start of the search page               |

- `AndClause`

| Function                          | Description                                                  |
| --------------------------------- | ------------------------------------------------------------ |
| addCriterion(Criterion criterion) | Add a search criterion                                       |
| getCriteria()                     | Retrieves an array containing all the criteria of the clause |

- `Criterion`

| Function                    | Description                                                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| getName()                   | Retrieves the name of the criterion                                                                                                                                      |
| setName(String name)        | Defines the name of the criterion                                                                                                                                        |
| getOperator()               | Retrieves the criterion operator                                                                                                                                         |
| setOperator(String operator | Defines the criterion operator. Possible values are : `EQUALS_TO` `CONTAINS`, `LESS_THAN`, `GREATER_THAN`, `STARTS_WITH`, `ENDS_WITH`, `DISPLAY`, `DIFFERENT`, `BETWEEN` |
| getType()                   | Retrieves the criterion type                                                                                                                                             |
| setType(String type)        | Defines the criterion type. Possible values are : `STRING`, `TIMESTAMP`, `BOOLEAN`, `INTEGER`, `CURRENCY`                                                                |
| getValues()                 | Retrieves criterion values                                                                                                                                               |
| addValue(String value)      | Adds a value to the criterion                                                                                                                                            |
| addValues(String[] values)  | Adds an array of values to the criterion                                                                                                                                 |

:::info
The `EQUALS_TO` and `DIFFERENT` operators are case-sensitive (differentiate between upper and lower case).
:::

# Sorting

- `OrderClause`

| Function                          | Description                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| setName(String name)              | Defines the name of the criterion                                                  |
| setType(String type)              | Defines the type of field: `STRING`, `TIMESTAMP`, `BOOLEAN`, `INTEGER`, `CURRENCY` |
| setAscending(boolean isAscending) | Defines whether sorting is ascending or descending                                 |

Building a query :

```javascript
var request = new SearchRequest();
request.setMax(20);
request.setStart(0);

var orderClause = new OrderClause();
orderClause.setName("creationDate");
orderClause.setType("TIMESTAMP");
orderClause.setAscending(true);
request.addOrderClause(orderClause);

var filters = new AndClause();
request.addFilterClause(filters);

var criterion = new Criterion();
criterion.setName("Matricule");
criterion.setType("STRING");
criterion.addValue("P0002095");
filters.addCriterion(criterion);

JSAPI.get().document().search(request, function(results)

		// Simple dump of all results
		console.log("results.length=" + results.length);
		for (var i = 0; i < results.length; i++)

			var result = results[i];
			console.log("id=" + result.getId() + ", name=" + result.getFieldValue("name"));

		// Jump to first document found
		if ( results.length > 0 )

			var result = results[0];
			var id = result.getId();
			JSAPI.get().getNavigationAPI().goToComponentPlace("DOCUMENT", id);

	},
	function(error){
		console.error("Error on document search: " + error);
	});
```

It is possible to obtain the values of a search result in two different ways:

- `getFieldValue(fieldName)` : Retrieves all existing values for this field as a string. If the field contains several values, they are separated by the `§` character.

- `getFieldValues(fieldName)` : Retrieves all existing values for this field as an array of strings.
