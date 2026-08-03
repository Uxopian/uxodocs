---
title: Handling delegations
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Create, modify, delete delegations
sidebar_position: 25
date: "2001-03-30T13:20:01+02:00"
content_hash: f43b07e89e487cc0683a7fa274acb9bc980f5cdd6ba6872db7f3515b5c60eb37
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `Delegations` service exhibits all available operations around delegations.

## Retrieving delegations

The examples below show how to retrieve delegations using the various `get` operations:

### Retrieval by identifier

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        identifiers of the delegations to retrieve, separated by commas

curl -X GET "<CORE_HOST>/rest/delegation/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DelegationService service;

public List<Delegation> getDelegation() throws TechnicalException, FunctionalException
{
	List<Id> ids = Lists.newArrayList(new Id("delegationId"));
    return service.get(ids);
}
```

  </TabItem>
</Tabs>

### Retrieval by delegate

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>           FlowerDocs Core base URL
# <TOKEN>               authentication token
# <USER_ID>             identifier of the user the delegation was given to
# <INCLUDE_TERMINATED>  boolean

curl -X GET "<CORE_HOST>/rest/delegation/delegate/<USER_ID>?includeTerminated=<INCLUDE_TERMINATED>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DelegationService service;

public List<Delegation> getDelegationByDelegate() throws TechnicalException, FunctionalException
{
	return service.getByDelegate(new Id("userDelegateId"), true);
}
```

  </TabItem>
</Tabs>

### Retrieval by delegator

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>           FlowerDocs Core base URL
# <TOKEN>               authentication token
# <USER_ID>             identifier of the user who gave the delegation
# <INCLUDE_TERMINATED>  boolean

curl -X GET "<CORE_HOST>/rest/delegation/delegator/<USER_ID>?includeTerminated=<INCLUDE_TERMINATED>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DelegationService service;

public List<Delegation> getDelegationByDelegator() throws TechnicalException, FunctionalException
{
	return service.getByDelegator(new Id("userDelegatorId"), true);
}
```

  </TabItem>
</Tabs>

## Creating delegations

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

curl -X POST "<CORE_HOST>/rest/delegation" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
  {
    "creationDate": "2024-04-07 13:59:53.401 +0100",
    "creator": "jna",
    "delegate": "phu",
    "delegator": "jna",
    "description": "test création délégation",
    "end": "2024-04-09 13:59:53.401 +0100",
    "start": "2024-04-07 13:59:53.401 +0100"
  }
]'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DelegationService service;

public List<Delegation> createDelegation() throws TechnicalException, FunctionalException
{
    Date start = new Date();
    Date end = new Date();

    Delegation del = new Delegation();
    del.setCreationDate(new Date());
    del.setEnd(end);
    del.setStart(start);
    del.setCreator(new Id("jna"));
    del.setDelegator(new Id("jna"));
    del.setDelegate(new Id("phu"));
    del.setDescription("test création délégation");

    List<Delegation> listDel = new ArrayList<Delegation>();
    listDel.add(del);

    return service.create(listDel);
}
```

  </TabItem>
</Tabs>

## Updating delegations

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        identifiers of the delegations to update, separated by commas

curl -X POST "<CORE_HOST>/rest/delegation/<IDS>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
  {
    "creationDate": "2024-04-07 13:59:53.401 +0100",
    "creator": "jna",
    "delegate": "nca",
    "delegator": "jna",
    "description": "delegation jna to nca",
    "end": "2024-04-09 13:59:53.401 +0100",
    "start": "2024-04-07 13:59:53.401 +0100"
  }
]'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DelegationService service;

public List<Delegation> updateDelegation(Delegation del) throws TechnicalException, FunctionalException
{
    del.setCreator(new Id("jna"));
    del.setDelegator(new Id("jna"));
    del.setDelegate(new Id("nca"));
    del.setDescription("delegation jna to nca");

    List<Delegation> listDel = new ArrayList<Delegation>();
    listDel.add(del);

    return service.update(listDel);
}
```

  </TabItem>
</Tabs>

:::warning
When using the REST service, unset fields will be cleared: you must send the entire delegation object, not just the fields to modify.
:::

## Deleting delegations

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        identifiers of the delegations to delete, separated by commas

curl -X DELETE "<CORE_HOST>/rest/delegation/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DelegationService service;

public List<Delegation> deleteDelegation() throws TechnicalException, FunctionalException
{
	List<Id> ids = Lists.newArrayList(new Id("delegationId"));
    return service.delete(ids);
}
```

  </TabItem>
</Tabs>
