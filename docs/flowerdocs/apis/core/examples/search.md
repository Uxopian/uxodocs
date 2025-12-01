---
title: Search for a component
description: Build your search queries
date: '2001-03-29T13:30:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 8750b939018ea6e8071718bddd39f5b9421095b65f11f47e79b43f8225b645e1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



Search queries enable you to search for components stored in FlowerDocs according to various criteria. These search queries are composed as follows: 

# The different clauses 

## Select clause
	
Use ``selectClause`` to define the fields to be brought up. It consists of a list of ``fields`` values. 

## Clauses Filter

Use ``filterClauses`` to define filters to be applied to the search. A ``filterClause`` is composed as follows: 

- ``criteria``: filter criteria
- ``filterClauses`` : les sous-filters

A Filter clause can contain one or more other clauses, enabling you to perform complex queries with logical AND and OR operators. 
There are two types of Filter clause for this purpose: 

- ``AndClause`` : Clause **AND**, a logical AND operator is applied between its criteria and sub-clauses 
- ``OrClause`` : Clause **OR**, a logical OR operator is applied between its criteria and sub-clauses

## Clauses Order

The ``orderClauses`` allow you to define the order in which results will be returned. They are composed as follows: 

- ``name``: the name of the criterion on which to sort
- ``type``: type of criterion
- ``ascending``: sorting in ascending or descending order

# Pagination of results

- ``start`` : Defines the start of the search page
- ``max`` : Defines the maximum number of results to be returned


Searches return a maximum of 10,000 results; an error occurs when paging after this limit.

 
# Examples

The examples below show how to search for a document with a name containing the `invoice` string.

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}/rest/documents/search HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host

-- Headers --
token: {{token}
Content-Type: application/json

--Body (json) --

    "filterClauses": [

            "criteria": [

                    "name": "name",
                    "operator": "CONTAINS",
                    "type": "STRING",
                    "values": [
                        "invoice"
                    ]

            ]

    ],
    "max": 10

```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService documentService;

public void search() throws FunctionalException, TechnicalException

	Criterion criterion = CriterionBuilder.field(NAME).operator(CONTAINS).value("facture").build();
	FilterClause filter = FilterClauseBuilder.init().criterion(criterion).build();
	SearchRequest request = SearchRequestBuilder.init().filter(filter).build();
	SearchResponse response = documentService.search(request);

```

  </TabItem>
</Tabs>


:::info
In search criteria, the ``CONTAINS`` operator is not case-sensitive (does not distinguish between upper and lower case), unlike the ``EQUALS_TO`` and ``DIFFERENT`` operators.
So the above example will retrieve documents whose name contains: "invoice", but also “INVOICE", "Invoice" ...
:::


These examples need to be adapted for each component category.
