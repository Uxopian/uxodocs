---
title: Handling facts (audit trail)
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Create, retrieve and search audit trail events
sidebar_position: 20
date: "2001-04-29T13:30:01+01:00"
content_hash: 5769b085fec5244494ec3e4dbb20952484650326ab8bc24416eec238b260c136
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Facts represent audit trail events recorded on components (documents, folders, tasks, virtual folders). Each fact captures an action performed by a user on a component.

# Retrieving facts

The examples below show how to retrieve facts for a document. The same pattern applies to folders (`/rest/folders`), tasks (`/rest/tasks`) and virtual folders (`/rest/virtualFolders`).

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <ID>         document identifier
curl -X GET "<CORE_HOST>/rest/documents/<ID>/facts" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private FactService factService;

public List<Fact> getFacts() throws TechnicalException, FunctionalException
{
    Id componentId = new Id("documentId");
    return factService.get(componentId, Category.DOCUMENT);
}
```

  </TabItem>
</Tabs>

:::info
The same endpoint pattern is available for all component types:

* Documents: `GET /rest/documents/<ID>/facts`
* Folders: `GET /rest/folders/<ID>/facts`
* Tasks: `GET /rest/tasks/<ID>/facts`
* Virtual folders: `GET /rest/virtualFolders/<ID>/facts`
:::

# Creating a fact

The examples below show how to create a fact for a document.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <ID>         document identifier
curl -X POST "<CORE_HOST>/rest/documents/<ID>/facts" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "action": "CUSTOM_ACTION",
  "description": "Custom audit event",
  "technical": false
}'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private FactService factService;

public Fact createFact() throws TechnicalException, FunctionalException
{
    Id componentId = new Id("documentId");
    Fact fact = new Fact();
    fact.setAction("CUSTOM_ACTION");
    fact.setDescription("Custom audit event");
    fact.setTechnical(false);
    return factService.create(componentId, Category.DOCUMENT, fact);
}
```

  </TabItem>
</Tabs>

# Searching for facts

Facts can be searched using a `SearchRequest` object, which allows filtering by component, user, action, date range, etc.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X POST "<CORE_HOST>/rest/facts" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "searchCriteria": [
    {
      "name": "objectId",
      "value": "documentId"
    },
    {
      "name": "action",
      "value": "CUSTOM_ACTION"
    }
  ],
  "paginationContext": {
    "maxResults": 50,
    "pageIndex": 0
  }
}'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private FactService factService;

public SearchResult<Fact> searchFacts() throws TechnicalException, FunctionalException
{
    SearchRequest request = new SearchRequest();
    request.getSearchCriteria().add(new SearchCriteria("objectId", "documentId"));
    request.getSearchCriteria().add(new SearchCriteria("action", "CUSTOM_ACTION"));
    request.setPaginationContext(new PaginationContext(50, 0));
    return factService.search(request);
}
```

  </TabItem>
</Tabs>