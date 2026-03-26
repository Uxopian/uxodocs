---
title: Manipulating a tag category
description: Create, retrieve, modify, delete your tag categories
sidebar_position: 13
date: "2001-04-29T13:30:01+01:02"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `TagCategoryService` service exposes all the operations available around `TagCategory` type components.

# Retrieving tag categories

The examples below show how to retrieve all tag categories.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/tagcategory" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private TagCategoryService tcService;

public List<TagCategory> getAll() throws FunctionalException, TechnicalException
{
    return tcService.getAll();
}
```

  </TabItem>
</Tabs>

The examples below show how to retrieve tag categories from a list of identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        comma-separated list of tag category identifiers to be retrieved
curl -X GET "<CORE_HOST>/rest/tagcategory/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private TagCategoryService tcService;

public List<TagCategory> get() throws FunctionalException, TechnicalException
{
    List<Id> ids = Lists.newArrayList(new Id("categoryId"));
    return tcService.get(ids);
}
```

  </TabItem>
</Tabs>

# Tag category creation

The examples below show how to create a tag category.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X POST "<CORE_HOST>/rest/tagcategory" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
        "id": "DocumentType",
        "displayNames": [
            {
                "value": "Document Type",
                "language": "EN"
            },
            {
                "value": "Type de document",
                "language": "FR"
            }
        ],
        "tags": [
            { "value": "Invoice" },
            { "value": "Contract" },
            { "value": "Report" }
        ],
        "icon": "folder",
        "description": "Category for document types",
        "visible": true,
        "inline": false,
        "reduced": false
    }
]'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private TagCategoryService tcService;

public List<TagCategory> create() throws FunctionalException, TechnicalException
{
    TagCategory tc = new TagCategory();
    tc.setId(new Id("DocumentType"));
    List<I18NLabel> labels = new ArrayList<>();
    labels.add(new I18NLabel("Document Type", "EN"));
    labels.add(new I18NLabel("Type de document", "FR"));
    tc.setDisplayNames(labels);
    tc.setTags(Lists.newArrayList(new Id("Invoice"), new Id("Contract"), new Id("Report")));
    tc.setVisible(true);

    return tcService.create(Arrays.asList(tc));
}
```

  </TabItem>
</Tabs>

# Modifying tag categories

This operation updates the data of a tag category.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        comma-separated list of tag category identifiers to be updated
curl -X POST "<CORE_HOST>/rest/tagcategory/<IDS>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
        "id": "DocumentType",
        "displayNames": [
            {
                "value": "Doc Type",
                "language": "EN"
            },
            {
                "value": "Type de doc",
                "language": "FR"
            }
        ],
        "tags": [
            { "value": "Invoice" },
            { "value": "Contract" },
            { "value": "Report" },
            { "value": "Letter" }
        ],
        "visible": true,
        "inline": true,
        "reduced": false
    }
]'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private TagCategoryService tcService;

public List<TagCategory> update(TagCategory tc) throws FunctionalException, TechnicalException
{
    List<I18NLabel> labels = new ArrayList<>();
    labels.add(new I18NLabel("Doc Type", "EN"));
    labels.add(new I18NLabel("Type de doc", "FR"));
    tc.setDisplayNames(labels);
    tc.setTags(Lists.newArrayList(new Id("Invoice"), new Id("Contract"), new Id("Report"), new Id("Letter")));
    tc.setInline(true);

    return tcService.update(Arrays.asList(tc));
}
```

  </TabItem>
</Tabs>

# Tag category deletion

This operation deletes a list of tag categories from a list of identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        comma-separated list of tag category identifiers to be deleted
curl -X DELETE "<CORE_HOST>/rest/tagcategory/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private TagCategoryService tcService;

public void delete() throws FunctionalException, TechnicalException
{
    List<Id> ids = Lists.newArrayList(new Id("DocumentType"));
    tcService.delete(ids);
}
```

  </TabItem>
</Tabs>