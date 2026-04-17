---
title: Manipulating a tag class
sidebar_position: 18
description: Create, retrieve, modify, delete your tag classes
date: "2001-04-29T13:30:01+01:02"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: fa1574c25594f3ab71b44359564e5fb27050e8c9ce5fd1babf81167a48b2e510
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `TagClassService` service exposes all the operations available around `TagClass` type components.

# Retrieving tag classes

The examples below show how to retrieve all tag classes.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
curl -X GET "<CORE_HOST>/rest/tagclass" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private TagClassService tcService;

public List<TagClass> getAll() throws FunctionalException, TechnicalException
{
    return tcService.getAll();
}
```

  </TabItem>
</Tabs>

# Tag class creation

The examples below show how to create a tag class.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
curl -X POST "<CORE_HOST>/rest/tagclass" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
        "data": {
            "owner": "user1",
            "creationDate": "2023-10-04 11:00:00.000 +0200"
        },
        "type": "STRING",
        "displayNames": [
            {
                "value": "TagCreate",
                "language": "EN"
            },
            {
                "value": "TagCreation",
                "language": "FR"
            }
        ],
        "searchable": false,
        "id": "TagCreation"
    }
]'
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private TagClassService tcService;

public List<TagClass> create() throws FunctionalException, TechnicalException
{
    List<TagClass> tcList = new ArrayList<VirtualFolderClass>();

    TagClass tc = new TagClass();
    tc.setId(new Id("TestTag"));
    tc.setType(TagValueType.STRING);
    tc.setData(new Data());
    List<I18NLabel> labels = new ArrayList<>();
    I18NLabel labelEN = new I18NLabel("TagValue", "EN");
    I18NLabel labelFR = new I18NLabel("TagValeur", "FR");
    labels.add(labelFR);
    labels.add(labelEN);
    tc.setDisplayNames(labels);

    tcList.add(tc);

    return tcService.create(vfcList);
}
```

  </TabItem>
</Tabs>

# Modifying tag classes

This operation updates the data of a tag class

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: comma-separated list of tag class identifiers to be updated
curl -X POST "<CORE_HOST>/rest/tagclass/<IDS>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
        "data": {
            "owner": "user1",
            "creationDate": "2023-10-04 11:00:00.000 +0200"
        },
        "type": "STRING",
        "displayNames": [
            {
                "value": "TagUpdate",
                "language": "EN"
            },
            {
                "value": "TagMaJ",
                "language": "FR"
            }
        ],
        "searchable": false,
        "id": "TagCreation"
    }
]'
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private TagClassService tcService;

public List<TagClass> update(TagClass tc) throws FunctionalException, TechnicalException
{
    List<I18NLabel> labels = new ArrayList<>();
    I18NLabel labelEN = new I18NLabel("NewTagValue", "EN");
    I18NLabel labelFR = new I18NLabel("NouvelleTagValeur", "FR");
    labels.add(labelFR);
    labels.add(labelEN);
    tc.setType(TagValueType.STRING);
    tc.setDisplayNames(labels);

    List<TagClass> tcList = new ArrayList<TagClass>();
    tcList.add(tc);

    return tcService.create(tcList);
}

```

  </TabItem>
</Tabs>

# Tag class search

The example below shows how to retrieve a tag class from a list of identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: comma-separated list of tag class identifiers to be retrieved
curl -X GET "<CORE_HOST>/rest/tagclass/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private TagClassService tcService;

public List<TagClass> get() throws FunctionalException, TechnicalException
{
    List<Id> ids = Lists.newArrayList(new Id("Test"));
    return tcService.get(ids);
}
```

  </TabItem>
</Tabs>

# Tag class deletion

This operation deletes a list of tag classes from a list of identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: comma-separated list of tag class identifiers to be deleted
curl -X DELETE "<CORE_HOST>/rest/tagclass/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private TagClassService tcService;

@DeleteMapping()
public void delete() throws FunctionalException, TechnicalException
{
    List<Id> ids = Lists.newArrayList(new Id("Test"));
    tcService.delete(ids);
}
```

  </TabItem>
</Tabs>