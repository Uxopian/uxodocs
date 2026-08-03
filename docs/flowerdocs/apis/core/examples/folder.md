---
title: Handling a folder
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Create, retrieve, modify, delete and search your folders, manage children
sidebar_position: 11
date: "2001-04-29T13:30:01+01:00"
content_hash: 2fb9db51b959b6ce27afc606fedeaa22b10e713f733c66481c98e0cbe12de8d2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `Folder` service exposes all the operations available around `FOLDER` type components.

## Folder retrieval

The examples below show how to retrieve folders from a list of identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        list of folder identifiers to be retrieved
curl -X GET "<CORE_HOST>/rest/folders/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private FolderService folderService;

public List<Folder> get() throws TechnicalException, FunctionalException
{
    List<Id> ids = Lists.newArrayList(new Id("folderId"));
    return folderService.get(ids);
}
```

  </TabItem>
</Tabs>

## Folder creation

The examples below show how to create a list of folders.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X POST "<CORE_HOST>/rest/folders" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
  {
    "category": "FOLDER",
    "data": {
      "ACL": "acl-folder",
      "classId": "FolderClass",
      "owner": "jna"
    },
    "name": "My Folder",
    "tags": [
      {
        "name": "FolderRef",
        "readOnly": false,
        "value": [
          "REF-001"
        ]
      },
      {
        "name": "Description",
        "readOnly": false,
        "value": [
          "Sample folder"
        ]
      }
    ]
  }
]'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private FolderService folderService;

public List<Folder> create() throws FunctionalException, TechnicalException
{
    Folder folder = ComponentBuilder.component(Category.FOLDER).name("My Folder")
            .classId(new Id("FolderClass")).acl("acl-folder").build();
    folder.getData().setOwner("jna");
    folder.setTags(new Tags());
    folder.getTags().getTags().add(TagBuilder.name("FolderRef").value("REF-001").build());
    folder.getTags().getTags().add(TagBuilder.name("Description").value("Sample folder").build());
    return folderService.create(Arrays.asList(folder));
}
```

  </TabItem>
</Tabs>

## Folder modification

This operation updates the data in a folder: tags and data (class identifier, ACL, owner, etc.).

:::info
This service operates on a cancel and replace basis, so all tag values must be supplied by the service at the time of update. It is therefore advisable to retrieve the folder, make the changes and call the update service.
:::

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        list of folder identifiers to be updated
curl -X POST "<CORE_HOST>/rest/folders/<IDS>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
  {
    "category": "FOLDER",
    "data": {
      "ACL": "acl-folder",
      "classId": "FolderClass",
      "owner": "jna"
    },
    "name": "My Updated Folder",
    "tags": [
      {
        "name": "FolderRef",
        "readOnly": false,
        "value": [
          "REF-001"
        ]
      },
      {
        "name": "Description",
        "readOnly": false,
        "value": [
          "Updated description"
        ]
      }
    ]
  }
]'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private FolderService folderService;

public List<Folder> update(Folder folder) throws FunctionalException, TechnicalException
{
	folder.setName("My Updated Folder");
	folder.getData().setACL(new Id("acl-folder"));
	folder.getData().setClassId(new Id("FolderClass"));
	ComponentHelper.setTagValue(folder, "Description", "Updated description");
	return folderService.update(Arrays.asList(folder));
}
```

  </TabItem>
</Tabs>

## Folder search

The search operations all work on the same model as described [here](./search).

## Folder deletion

The examples below show how to delete a list of folders from a list of identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        list of folder identifiers to be deleted
curl -X DELETE "<CORE_HOST>/rest/folders/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private FolderService folderService;

public void delete() throws FunctionalException, TechnicalException
{
    List<Id> ids = Lists.newArrayList(new Id("folderId"));
    folderService.delete(ids);
}
```

  </TabItem>
</Tabs>

## Managing children

Folders can contain children (documents, tasks, or other folders). The following operations allow managing the children of a folder.

### Adding children

This operation adds children to a folder without removing existing ones.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <ID>         folder identifier
curl -X PUT "<CORE_HOST>/rest/folders/<ID>/children" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
  {
    "id": "documentId1",
    "category": "DOCUMENT"
  },
  {
    "id": "taskId1",
    "category": "TASK"
  }
]'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private FolderService folderService;

public void addChildren() throws FunctionalException, TechnicalException
{
    Id folderId = new Id("folderId");
    List<ComponentReference> children = new ArrayList<>();
    children.add(new ComponentReference(new Id("documentId1"), Category.DOCUMENT));
    children.add(new ComponentReference(new Id("taskId1"), Category.TASK));
    folderService.addChildren(folderId, children);
}
```

  </TabItem>
</Tabs>

### Replacing children

This operation replaces all existing children with the provided list.

:::warning
This operation removes all existing children before adding the new ones. Make sure to include all desired children in the request.
:::

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <ID>         folder identifier
curl -X POST "<CORE_HOST>/rest/folders/<ID>/children" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
  {
    "id": "documentId1",
    "category": "DOCUMENT"
  },
  {
    "id": "documentId2",
    "category": "DOCUMENT"
  }
]'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private FolderService folderService;

public void replaceChildren() throws FunctionalException, TechnicalException
{
    Id folderId = new Id("folderId");
    List<ComponentReference> children = new ArrayList<>();
    children.add(new ComponentReference(new Id("documentId1"), Category.DOCUMENT));
    children.add(new ComponentReference(new Id("documentId2"), Category.DOCUMENT));
    folderService.replaceChildren(folderId, children);
}
```

  </TabItem>
</Tabs>

### Removing children

This operation removes specific children from a folder.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <ID>         folder identifier
curl -X DELETE "<CORE_HOST>/rest/folders/<ID>/children" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
  {
    "id": "documentId1",
    "category": "DOCUMENT"
  }
]'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private FolderService folderService;

public void removeChildren() throws FunctionalException, TechnicalException
{
    Id folderId = new Id("folderId");
    List<ComponentReference> children = new ArrayList<>();
    children.add(new ComponentReference(new Id("documentId1"), Category.DOCUMENT));
    folderService.deleteChildren(folderId, children);
}
```

  </TabItem>
</Tabs>
