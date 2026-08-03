---
title: Stored searches
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Create, retrieve, modify, delete your stored searches
sidebar_position: 21
date: "2018-04-01T12:20:01+01:57"
content_hash: 47470d531b928b47c8c926f6186dba96147cf25dad7bf03ffb3b6b0afc5dc02a
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `StoredSearchService` service exhibits all available operations around `StoredSearch` type components.

## Retrieval

### Retrieving all stored searches

The examples below show how to retrieve all stored searches of a scope.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
curl -X GET "<CORE_HOST>/rest/storedsearch" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private StoredSearchService service;

public List<StoredSearch> getAllStoredSearch() throws FunctionalException, TechnicalException
{
    return service.getAll();
}
```

  </TabItem>
</Tabs>

### Retrieving a defined list

The examples below show how to retrieve a list of stored searches from their identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: list of stored search identifiers
curl -X GET "<CORE_HOST>/rest/storedsearch/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private StoredSearchService service;

public List<StoredSearch> getStoredSearch() throws FunctionalException, TechnicalException
{
    List<Id> storedSearchIds = Lists.newArrayList(new Id("folderStoredSearch"));
    return service.get(storedSearchIds);
}
```

  </TabItem>
</Tabs>

## Creation

The examples below show how to create a stored search.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
curl -X POST "<CORE_HOST>/rest/storedsearch" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
        "template": "DefaultSearch",
        "data": {
            "owner": "phu",
            "creationDate": "2024-04-05 14:08:03.790 +0200",
            "lastUpdateDate": "2024-04-05 14:08:03.790 +0200",
            "ACL": "STORED_SEARCH"
        },
        "recipients": {
            "users": [
                "phu"
            ]
        },
        "id": "testFolderStoredSearch",
        "category": "FOLDER",
        "request": {
            "selectClause": {
                "fields": [
                    "name",
                    "classid",
                    "creationDate"
                ]
            },
            "orderClauses": [
                {
                    "name": "creationDate",
                    "type": "TIMESTAMP",
                    "ascending": false
                }
            ],
            "start": 0,
            "max": 10
        },
        "displayNames": [
            {
                "value": "test folder stored search",
                "language": "EN"
            },
            {
                "value": "test dossier recherche sauvegardée",
                "language": "FR"
            }
        ]
    }
]'
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private StoredSearchService service;

public List<StoredSearch> createStoredSearch() throws FunctionalException, TechnicalException
{
    List<Id> usersIds = Lists.newArrayList(new Id("phu"));
    RecipientPrincipals users = new RecipientPrincipals();
    users.setUsers(usersIds);

    List<I18NLabel> labels = new ArrayList<>();
    I18NLabel labelFR = new I18NLabel("test dossier recherche sauvegardée", "FR");
    I18NLabel labelEN = new I18NLabel("test folder search stored", "EN");
    labels.add(labelFR);
    labels.add(labelEN);

    List<String> fields = Lists.newArrayList("name");
    fields.add("classid");
    fields.add("creationDate");
    SelectClause selectClause = new SelectClause();
    selectClause.setFields(fields);
    OrderClause orderClause = new OrderClause("creationDate", TIMESTAMP, false);
    List<OrderClause> orderClauses = Lists.newArrayList(orderClause);
    SearchRequest request = new SearchRequest();
    request.setStart(0);
    request.setMax(10);
    request.setSelectClause(selectClause);
    request.setOrderClauses(orderClauses);

    StoredSearch search = new StoredSearch();
    search.setId(new Id("testFolderStoredSearch"));
    search.setCategory(FOLDER);
    search.setTemplate("DefaultSearch");
    search.setDisplayNames(labels);
    search.setData(new Data());
    search.getData().setOwner("phu");
    search.getData().setACL(new Id("STORED_SEARCH"));
    search.setRecipients(users);
    search.setRequest(request);

    List<StoredSearch> storedSearchList = Lists.newArrayList(search);
    return service.create(storedSearchList);
}
```

  </TabItem>
</Tabs>

## Update

The examples below show how to update a stored search.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: list of stored search identifiers
curl -X POST "<CORE_HOST>/rest/storedsearch/<IDS>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
        "template": "DefaultSearch",
        "data": {
            "owner": "phu",
            "creationDate": "2024-04-05 14:08:03.790 +0200",
            "lastUpdateDate": "2024-04-05 14:08:03.790 +0200",
            "ACL": "STORED_SEARCH"
        },
        "recipients": {
            "users": [
                "phu",
                "jna"
            ]
        },
        "id": "testFolderStoredSearch",
        "category": "FOLDER",
        "request": {
            "selectClause": {
                "fields": [
                    "name",
                    "classid",
                    "creationDate"
                ]
            },
            "orderClauses": [
                {
                    "name": "creationDate",
                    "type": "TIMESTAMP",
                    "ascending": false
                }
            ],
            "start": 0,
            "max": 20
        },
        "displayNames": [
            {
                "value": "Folder",
                "language": "EN"
            },
            {
                "value": "Dossier",
                "language": "FR"
            }
        ]
    }
]'
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private StoredSearchService service;

public List<StoredSearch> updateStoredSearch(StoredSearch search) throws FunctionalException, TechnicalException
{
    List<I18NLabel> labels = new ArrayList<>();
    I18NLabel labelFR = new I18NLabel("Dossiers", "FR");
    I18NLabel labelEN = new I18NLabel("Folder", "EN");
    labels.add(labelFR);
    labels.add(labelEN);

    search.getRecipients().getUsers().add(new Id("jna"));
    search.getRequest().setMax(20);
    search.setDisplayNames(labels);

    List<StoredSearch> storedSearchList = Lists.newArrayList(search);
    return service.update(storedSearchList);
}
```

  </TabItem>
</Tabs>

:::warning
When using the REST service, unset fields will be cleared: you must send the entire stored search, not just the fields to modify.
:::

## Deletion

The examples below show how to delete a list of stored searches.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: list of stored search identifiers
curl -X DELETE "<CORE_HOST>/rest/storedsearch/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private StoredSearchService service;

public void deleteStoredSearch() throws FunctionalException, TechnicalException
{
    List<Id> storedSearchIds = Lists.newArrayList(new Id("testFolderStoredSearch"));
    service.delete(storedSearchIds);
}
```

  </TabItem>
</Tabs>
