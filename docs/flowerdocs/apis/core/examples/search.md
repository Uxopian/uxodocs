---
title: Search for a component
sidebar_position: 3
description: Build your search queries
date: "2001-03-29T13:30:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 16d5fdd9d70059393c3e9be3e6cff667f28a59b6af9b99a42cc75e8b8fd2f3cb
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Search queries enable you to search for components stored in FlowerDocs according to various criteria. These search queries are composed as follows:

## The different clauses

### Select clause

Use ``selectClause`` to define the fields to be brought up. It consists of a list of ``fields`` values.

### Clauses Filter

Use ``filterClauses`` to define filters to be applied to the search. A ``filterClause`` is composed as follows:

- ``criteria``: filter criteria
- ``filterClauses`` : les sous-filters

A Filter clause can contain one or more other clauses, enabling you to perform complex queries with logical AND and OR operators.
There are two types of Filter clause for this purpose:

- ``AndClause`` : Clause **AND**, a logical AND operator is applied between its criteria and sub-clauses
- ``OrClause`` : Clause **OR**, a logical OR operator is applied between its criteria and sub-clauses

### Clauses Order

The ``orderClauses`` allow you to define the order in which results will be returned. They are composed as follows:

- ``name``: the name of the criterion on which to sort
- ``type``: type of criterion
- ``ascending``: sorting in ascending or descending order

## Pagination of results

- ``start`` : Defines the start of the search page
- ``max`` : Defines the maximum number of results to be returned

:::warning
Searches return a maximum of 10,000 results; an error occurs when paging after this limit.
:::

## Examples

The examples below show how to search for a document with a name containing the `invoice` string.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

curl -X POST "<CORE_HOST>/rest/documents/search" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "filterClauses": [
        {
            "criteria": [
                {
                    "name": "name",
                    "operator": "CONTAINS",
                    "type": "STRING",
                    "values": [
                        "invoice"
                    ]
                }
            ]
        }
    ],
    "max": 10
}'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService documentService;

public void search() throws FunctionalException, TechnicalException
{
	Criterion criterion = CriterionBuilder.field(NAME).operator(CONTAINS).value("facture").build();
	FilterClause filter = FilterClauseBuilder.init().criterion(criterion).build();
	SearchRequest request = SearchRequestBuilder.init().filter(filter).build();
	SearchResponse response = documentService.search(request);
}
```

  </TabItem>
</Tabs>

:::info
In search criteria, the ``CONTAINS`` operator is not case-sensitive (does not distinguish between upper and lower case), unlike the ``EQUALS_TO`` and ``DIFFERENT`` operators.
So the above example will retrieve documents whose name contains: "invoice", but also "INVOICE", "Invoice" ...
:::

## Select clause and ordering

This example shows how to select specific fields and sort results. Here we search for documents of class `Invoice`, returning only the name, class ID, and creation date, sorted by most recent first.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

curl -X POST "<CORE_HOST>/rest/documents/search" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "selectClause": {
        "fields": ["name", "classid", "creationDate"]
    },
    "filterClauses": [
        {
            "criteria": [
                {
                    "name": "classid",
                    "operator": "EQUALS_TO",
                    "type": "STRING",
                    "values": ["Invoice"]
                }
            ]
        }
    ],
    "orderClauses": [
        {
            "name": "creationDate",
            "type": "TIMESTAMP",
            "ascending": false
        }
    ],
    "start": 0,
    "max": 20
}'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService documentService;

public void search() throws FunctionalException, TechnicalException
{
	Criterion criterion = CriterionBuilder.field(CLASSID).operator(EQUALS_TO).value("Invoice").build();
	FilterClause filter = FilterClauseBuilder.init().criterion(criterion).build();
	OrderClause order = new OrderClause("creationDate", TIMESTAMP, false);
	SearchRequest request = SearchRequestBuilder.init()
		.display("name", "classid", "creationDate")
		.filter(filter)
		.order(order)
		.max(20)
		.build();
	SearchResponse response = documentService.search(request);
}
```

  </TabItem>
</Tabs>

## Multiple criteria (AND)

When a filter clause contains multiple criteria, they are combined with an AND operator. This example searches for documents of class `Invoice` whose `B_ClientName` tag contains "Dupont".

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

curl -X POST "<CORE_HOST>/rest/documents/search" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "filterClauses": [
        {
            "criteria": [
                {
                    "name": "classid",
                    "operator": "EQUALS_TO",
                    "type": "STRING",
                    "values": ["Invoice"]
                },
                {
                    "name": "B_ClientName",
                    "operator": "CONTAINS",
                    "type": "STRING",
                    "values": ["Dupont"]
                }
            ]
        }
    ],
    "max": 10
}'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService documentService;

public void search() throws FunctionalException, TechnicalException
{
	Criterion classCriterion = CriterionBuilder.field(CLASSID).operator(EQUALS_TO).value("Invoice").build();
	Criterion tagCriterion = CriterionBuilder.name("B_ClientName").operator(CONTAINS).value("Dupont").build();
	FilterClause filter = FilterClauseBuilder.and()
		.criterion(classCriterion)
		.criterion(tagCriterion)
		.build();
	SearchRequest request = SearchRequestBuilder.init().filter(filter).max(10).build();
	SearchResponse response = documentService.search(request);
}
```

  </TabItem>
</Tabs>

## Date range search (BETWEEN)

Use the ``BETWEEN`` operator with the ``TIMESTAMP`` type to search within a date range. The values are epoch timestamps in milliseconds. This example finds documents created during the year 2024.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

# Date values in epoch milliseconds:
#   1704067200000 = 2024-01-01T00:00:00Z
#   1735689600000 = 2025-01-01T00:00:00Z

curl -X POST "<CORE_HOST>/rest/documents/search" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "filterClauses": [
        {
            "criteria": [
                {
                    "name": "creationDate",
                    "operator": "BETWEEN",
                    "type": "TIMESTAMP",
                    "values": ["1704067200000", "1735689600000"]
                }
            ]
        }
    ],
    "max": 50
}'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService documentService;

public void search() throws FunctionalException, TechnicalException, ParseException
{
	Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse("2024-01-01");
	Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse("2025-01-01");
	Criterion criterion = CriterionBuilder.field(CREATION_DATE)
		.operator(BETWEEN).type(TIMESTAMP)
		.value(startDate).value(endDate)
		.build();
	FilterClause filter = FilterClauseBuilder.init().criterion(criterion).build();
	SearchRequest request = SearchRequestBuilder.init().filter(filter).max(50).build();
	SearchResponse response = documentService.search(request);
}
```

  </TabItem>
</Tabs>

## OR logic

To search for documents matching one condition OR another, use an ``OrClause``. The ``type`` field must be set explicitly to indicate OR logic. This example finds documents whose class is either `Invoice` or `Contract`.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

curl -X POST "<CORE_HOST>/rest/documents/search" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "filterClauses": [
        {
            "type": "com.flower.docs.domain.search.OrClause",
            "clauses": [
                {
                    "type": "com.flower.docs.domain.search.AndClause",
                    "criteria": [
                        {
                            "name": "classid",
                            "operator": "EQUALS_TO",
                            "type": "STRING",
                            "values": ["Invoice"]
                        }
                    ]
                },
                {
                    "type": "com.flower.docs.domain.search.AndClause",
                    "criteria": [
                        {
                            "name": "classid",
                            "operator": "EQUALS_TO",
                            "type": "STRING",
                            "values": ["Contract"]
                        }
                    ]
                }
            ]
        }
    ],
    "max": 10
}'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService documentService;

public void search() throws FunctionalException, TechnicalException
{
	Criterion invoiceCrit = CriterionBuilder.field(CLASSID).operator(EQUALS_TO).value("Invoice").build();
	Criterion contractCrit = CriterionBuilder.field(CLASSID).operator(EQUALS_TO).value("Contract").build();
	FilterClause invoiceClause = FilterClauseBuilder.and().criterion(invoiceCrit).build();
	FilterClause contractClause = FilterClauseBuilder.and().criterion(contractCrit).build();
	FilterClause orClause = FilterClauseBuilder.or()
		.filter(invoiceClause)
		.filter(contractClause)
		.build();
	SearchRequest request = SearchRequestBuilder.init().filter(orClause).max(10).build();
	SearchResponse response = documentService.search(request);
}
```

  </TabItem>
</Tabs>

## Combined AND + OR

Multiple ``filterClauses`` at the root level are combined with AND. This example searches for `Invoice` documents created in 2024, where the client name is either "Dupont" or "Martin". The first filter clause handles the AND conditions (class + date), while the second uses an OR clause for the client names.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

curl -X POST "<CORE_HOST>/rest/documents/search" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "filterClauses": [
        {
            "criteria": [
                {
                    "name": "classid",
                    "operator": "EQUALS_TO",
                    "type": "STRING",
                    "values": ["Invoice"]
                },
                {
                    "name": "creationDate",
                    "operator": "BETWEEN",
                    "type": "TIMESTAMP",
                    "values": ["1704067200000", "1735689600000"]
                }
            ]
        },
        {
            "type": "com.flower.docs.domain.search.OrClause",
            "clauses": [
                {
                    "type": "com.flower.docs.domain.search.AndClause",
                    "criteria": [
                        {
                            "name": "B_ClientName",
                            "operator": "EQUALS_TO",
                            "type": "STRING",
                            "values": ["Dupont"]
                        }
                    ]
                },
                {
                    "type": "com.flower.docs.domain.search.AndClause",
                    "criteria": [
                        {
                            "name": "B_ClientName",
                            "operator": "EQUALS_TO",
                            "type": "STRING",
                            "values": ["Martin"]
                        }
                    ]
                }
            ]
        }
    ],
    "max": 10
}'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService documentService;

public void search() throws FunctionalException, TechnicalException, ParseException
{
	Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse("2024-01-01");
	Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse("2025-01-01");

	Criterion classCrit = CriterionBuilder.field(CLASSID).operator(EQUALS_TO).value("Invoice").build();
	Criterion dateCrit = CriterionBuilder.field(CREATION_DATE).operator(BETWEEN).type(TIMESTAMP)
		.value(startDate).value(endDate).build();
	FilterClause andClause = FilterClauseBuilder.and()
		.criterion(classCrit).criterion(dateCrit).build();

	Criterion dupontCrit = CriterionBuilder.name("B_ClientName").operator(EQUALS_TO).value("Dupont").build();
	Criterion martinCrit = CriterionBuilder.name("B_ClientName").operator(EQUALS_TO).value("Martin").build();
	FilterClause orClause = FilterClauseBuilder.or()
		.filter(FilterClauseBuilder.and().criterion(dupontCrit).build())
		.filter(FilterClauseBuilder.and().criterion(martinCrit).build())
		.build();

	SearchRequest request = SearchRequestBuilder.init()
		.filter(andClause).filter(orClause).max(10).build();
	SearchResponse response = documentService.search(request);
}
```

  </TabItem>
</Tabs>

## Searching other component types

The same search model applies to folders, tasks, and virtual folders — only the endpoint changes.

<Tabs>
  <TabItem value="folder" label="Folder">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

# Search for folders of class "Project"
curl -X POST "<CORE_HOST>/rest/folders/search" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "filterClauses": [
        {
            "criteria": [
                {
                    "name": "classid",
                    "operator": "EQUALS_TO",
                    "type": "STRING",
                    "values": ["Project"]
                }
            ]
        }
    ],
    "max": 10
}'
```

  </TabItem>
  <TabItem value="task" label="Task">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

# Search for tasks assigned to a specific user
curl -X POST "<CORE_HOST>/rest/tasks/search" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "filterClauses": [
        {
            "criteria": [
                {
                    "name": "assignee",
                    "operator": "EQUALS_TO",
                    "type": "STRING",
                    "values": ["jdoe"]
                }
            ]
        }
    ],
    "max": 10
}'
```

  </TabItem>
</Tabs>

These examples can be adapted for each component category.
