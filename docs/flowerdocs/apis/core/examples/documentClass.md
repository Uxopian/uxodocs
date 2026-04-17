---
title: Handling document classes
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Create, retrieve, modify, delete your document classes
sidebar_position: 14
date: "2001-04-29T13:30:01+01:02"
content_hash: d770bf8e5b86648529b2ad985902049f40537974ad25e500b7001fd3c850665d
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `DocumentClassService` service exhibits all available operations around `DocumentClass` type components.

# Retrieving document classes

## Retrieving all document classes

The examples below show how to retrieve all document classes.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
curl -X GET "<CORE_HOST>/rest/documentclass" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private DocumentClassService docClassService;

public List<DocumentClass> getAllDocumentClass() throws FunctionalException, TechnicalException
{
    return docClassService.getAll();
}
```

  </TabItem>
</Tabs>

## Retrieving a defined list of document classes

The examples below show how to retrieve a list of document classes from their identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: list of document class identifiers
curl -X GET "<CORE_HOST>/rest/documentclass/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private DocumentClassService docClassService;

public List<DocumentClass> getDocumentClasses() throws FunctionalException, TechnicalException
{
    List<Id> docClassesIds = Lists.newArrayList(new Id("docClassId"));
    docClassesIds.add(new Id("docClass2Id"));
    return docClassService.get(docClassesIds);
}
```

  </TabItem>
</Tabs>

# Creating document classes

The examples below show how to create a document class.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
curl -X POST "<CORE_HOST>/rest/documentclass" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
        "id": "CourrierTest",
        "data": {
            "owner": "fadmin",
            "creationDate": "2024-03-07 13:59:53.401 +0100",
            "lastUpdateDate": "2024-03-07 13:59:53.401 +0100",
            "ACL": "acl-courrier"
        },
        "tagCategories": [
            "InfoCourrier",
            "InfoClient"
        ],
        "tagReferences": [
            {
                "tagName": "RefClient",
                "mandatory": false,
                "multivalued": false,
                "technical": false,
                "readonly": false,
                "order": 0,
                "descriptions": [
                    {
                        "value": "Internal customer reference allowing to classify it",
                        "language": "EN"
                    },
                    {
                        "value": "Référence interne du client permettant de faire le lien avec son dossier",
                        "language": "FR"
                    }
                ]
            }
        ],
        "displayNames": [
            {
                "value": "Courrier Test",
                "language": "FR"
            }
        ],
        "descriptions": [
            {
                "value": "Test Document issu d'\''une chaîne d'\''acquisition",
                "language": "FR"
            }
        ],
        "RetentionDuration": {
            "value": 0,
            "unit": "MONTH"
        },
        "category": "DOCUMENT",
        "active": false,
        "technical": false
    }
]'
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private DocumentClassService docClassService;

public void createDocumentClasses() throws FunctionalException, TechnicalException
{
    List<Id> tagCat = new ArrayList<Id>();
    tagCat.add(new Id("InfoCourrier"));
    tagCat.add(new Id("InfoClient"));

    List<I18NLabel> tagRefLabels = new ArrayList<>();
    I18NLabel tagReflabelFR = new I18NLabel(
            "Référence interne du client permettant de faire le lien avec son dossier", "FR");
    I18NLabel tagReflabelEN = new I18NLabel("Internal customer reference allowing to classify it", "EN");
    tagRefLabels.add(tagReflabelFR);
    tagRefLabels.add(tagReflabelEN);

    List<I18NLabel> docClassLabels = new ArrayList<>();
    I18NLabel docClasslabelFR = new I18NLabel("Test Document issu d'une chaîne d'acquisition", "FR");
    docClassLabels.add(docClasslabelFR);

    TagReference tag = new TagReference();
    tag.setTagName("NumReference");
    tag.setDescriptions(tagRefLabels);
    List<TagReference> tags = new ArrayList<>();
    tags.add(tag);

    DocumentClass docClass = new DocumentClass();
    docClass.setId(new Id("CourrierTest"));
    docClass.setData(new Data());
    docClass.getData().setOwner("admin");
    docClass.getData().setCreationDate(new Date());
    docClass.getData().setACL(new Id("acl-courrier"));
    docClass.setTagCategories(tagCat);
    docClass.setTagReferences(tags);
    docClass.setDescriptions(docClassLabels);
    docClass.setCategory(com.flower.docs.domain.component.Category.DOCUMENT);

    List<DocumentClass> docClasses = new ArrayList<>();
    docClasses.add(docClass);

    docClassService.create(docClasses);
}
```

  </TabItem>
</Tabs>

# Updating document classes

The examples below show how to update a document class.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: list of document class identifiers to update, separated by commas
curl -X POST "<CORE_HOST>/rest/documentclass/<IDS>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
        "id": "CourrierTest",
        "data": {
            "owner": "fadmin",
            "creationDate": "2024-03-07 13:59:53.401 +0100",
            "lastUpdateDate": "2024-03-07 13:59:53.401 +0100",
            "ACL": "acl-courrier"
        },
        "tagCategories": [
            "InfoClient"
        ],
        "tagReferences": [
            {
                "tagName": "RefClient",
                "mandatory": true,
                "multivalued": false,
                "technical": false,
                "readonly": false,
                "order": 0
            }
        ],
        "displayNames": [
            {
                "value": "Courrier Test",
                "language": "FR"
            }
        ],
        "descriptions": [
            {
                "value": "Test Document issu d'\''une chaîne d'\''acquisition",
                "language": "FR"
            }
        ],
        "RetentionDuration": {
            "value": 0,
            "unit": "MONTH"
        },
        "category": "DOCUMENT",
        "active": false,
        "technical": false
    }
]'
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private DocumentClassService docClassService;

public List<DocumentClass> updatedocClass(DocumentClass docClass) throws FunctionalException, TechnicalException
{
    TagReference tag = new TagReference();
    tag.setTagName("NameClient");

    docClass.getTagCategories().remove(new Id("InfoCourrier"));
    docClass.getTagReferences().add(tag);
    List<DocumentClass> docClasses = new ArrayList<>();
    docClasses.add(docClass);

    return docClassService.update(docClasses);
}
```

  </TabItem>
</Tabs>

:::warning
When using the REST service, unset fields will be cleared: you must send the entire document class, not just the fields to modify.
:::

# Deleting document classes

The examples below show how to delete a list of document classes.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: list of document class identifiers to delete, separated by commas
curl -X DELETE "<CORE_HOST>/rest/documentclass/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private DocumentClassService docClassService;

public void deleteDocumentClasses() throws FunctionalException, TechnicalException
{
    List<Id> docClassesIds = Lists.newArrayList(new Id("docClassId"));
    docClassService.delete(docClassesIds);
}
```

  </TabItem>
</Tabs>

:::warning
Deletion does not perform any checks: you must verify that there are no existing instances before deleting a document class.
:::