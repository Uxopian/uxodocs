---
title: Handling folder classes
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Create, retrieve, modify, delete your folder classes
sidebar_position: 15
date: "2001-04-29T13:30:01+01:02"
content_hash: a02600989f079972ca12a122088e9c242a0d4cb75bd3a350ae552022818183bd
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `FolderClassService` service exhibits all available operations around `FolderClass` type components.

:::warning
This refers to physical folders, not virtual folders.
:::

## Retrieving folder classes

### Retrieving all folder classes

The examples below show how to retrieve the list of all folder classes present on the scope.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
curl -X GET "<CORE_HOST>/rest/folderclass" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private FolderClassService folderClassService;

public List<FolderClass> getAllFolderClass() throws FunctionalException, TechnicalException
{
    return folderClassService.getAll();
}
```

  </TabItem>
</Tabs>

### Retrieving a defined list of folder classes

The examples below show how to retrieve a list of folder classes from their identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: list of folder class identifiers, separated by commas
curl -X GET "<CORE_HOST>/rest/folderclass/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private FolderClassService folderClassService;

public List<FolderClass> getFolderClasses() throws FunctionalException, TechnicalException
{
    List<Id> folderClassesIds = Lists.newArrayList(new Id("folderClassId"));
    folderClassesIds.add(new Id("folderClass2Id"));
    return folderClassService.get(folderClassesIds);
}
```

  </TabItem>
</Tabs>

## Creating folder classes

The examples below show how to create a folder class.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
curl -X POST "<CORE_HOST>/rest/folderclass" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
        "id": "testFolder",
        "data": {
            "owner": "fadmin",
            "ACL": "acl-folder"
        },
        "tagReferences": [
            {
                "tagName": "Commentaire",
                "mandatory": false,
                "multivalued": false,
                "technical": false,
                "readonly": false,
                "order": 1
            }
        ],
        "children": [
            {
                "id": "*",
                "category": "FOLDER"
            },
            {
                "id": "*",
                "category": "DOCUMENT"
            }
        ],
        "category": "FOLDER"
    }
]'
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private FolderClassService folderClassService;

public void createFolderClasses() throws FunctionalException, TechnicalException
{
    TagReference tag = new TagReference();
    tag.setTagName("Commentaire");
    tag.setOrder(1);
    List<TagReference> tags = new ArrayList<>();
    tags.add(tag);

    ComponentReference componentFolder = new ComponentReference(new Id("*"), Category.FOLDER);
    ComponentReference componentDoc = new ComponentReference(new Id("*"), Category.DOCUMENT);
    List<ComponentReference> componentsRef = new ArrayList<>();
    componentsRef.add(componentDoc);
    componentsRef.add(componentFolder);

    FolderClass folderClass = new FolderClass();
    folderClass.setId(new Id("testFolder"));
    folderClass.setData(new Data());
    folderClass.getData().setACL(new Id("acl-folder"));
    folderClass.getData().setOwner("admin");
    folderClass.setTagReferences(tags);
    folderClass.setChildren(componentsRef);

    List<FolderClass> folderClasses = new ArrayList<>();
    folderClasses.add(folderClass);

    folderClassService.create(folderClasses);
}
```

  </TabItem>
</Tabs>

## Updating folder classes

The examples below show how to update a folder class.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: list of folder class identifiers to update, separated by commas
curl -X POST "<CORE_HOST>/rest/folderclass/<IDS>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
        "id": "testFolder",
        "data": {
            "owner": "fadmin",
            "ACL": "acl-folder"
        },
        "tagReferences": [
            {
                "tagName": "Commentaire",
                "mandatory": false,
                "multivalued": false,
                "technical": false,
                "readonly": false,
                "order": 1
            },
            {
                "tagName": "NumReference",
                "mandatory": true,
                "multivalued": false,
                "technical": false,
                "readonly": false,
                "order": 2
            }
        ],
        "children": [
            {
                "id": "*",
                "category": "FOLDER"
            },
            {
                "id": "*",
                "category": "DOCUMENT"
            }
        ],
        "category": "FOLDER"
    }
]'
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private FolderClassService folderClassService;

public List<FolderClass> updateFolderClasses(FolderClass folderClass) throws FunctionalException, TechnicalException
{
    TagReference tag = new TagReference();
    tag.setTagName("NumReference");
    tag.setOrder(2);

    folderClass.getTagReferences().add(tag);

    List<FolderClass> folderClasses = new ArrayList<>();
    folderClasses.add(folderClass);

    return folderClassService.update(folderClasses);
}
```

  </TabItem>
</Tabs>

:::warning
When using the REST service, unset fields will be cleared: you must send the entire folder class, not just the fields to modify.
:::

## Deleting folder classes

The examples below show how to delete a list of folder classes.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: list of folder class identifiers to delete, separated by commas
curl -X DELETE "<CORE_HOST>/rest/folderclass/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
	@Autowired
    private FolderClassService folderClassService;

    public void deleteFolderClasses() throws FunctionalException, TechnicalException
    {
        List<Id> folderClassesIds = Lists.newArrayList(new Id("folderClassId"));
        folderClassService.delete(folderClassesIds);
    }
```

  </TabItem>
</Tabs>

:::warning
Deletion does not perform any checks: you must verify that there are no existing instances before deleting a folder class.
:::
