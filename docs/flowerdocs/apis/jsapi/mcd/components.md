---
title: Components
description: Manipulating component in JavaScript
date: "2001-02-01"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: e4bddf9af11d97a77414af92d76be2bc19e9e411be30ee8f0c5381a315d38b39
---

:::info
The [components](/docs/flowerdocs/concepts/components/getting-started) are the main objects used by FlowerDocs.
Thanks to the JS API, they can be manipulated by scripts to meet specific needs in the development of vertical solutions.
:::

# Component instantiation

Each category of component can be manipulated using the JS API through a specific object. The following constructors can be used to instantiate a component:

```javascript
var newDocument = new Document();
var newTask = new Task();
var newFolder = new Folder();
var newVFolder = new VirtualFolder();
```

Each of these objects has its own functions:

- common to all components
- specific to a component category

# Access to internal information

Several pieces of information are maintained by the FlowerDocs platform for internal purposes.
Depending on the information, the following functions are available to access or modify it (_when modification is authorised_):

| Functions                | Description                                    |
| ------------------------ | ---------------------------------------------- |
| getId()                  | Component identifier retrieval                 |
| setId(String id)         | Definition of component identifier             |
| getName()                | Component name retrieval                       |
| setName(String name)     | Component name definition                      |
| setClassId(String name)  | Component class definition                     |
| getClassId()             | Component class identifier retrieval           |
| String getCategory()     | Category recovery                              |
| getACL()                 | Retrieving the ACL referenced by the component |
| setACL(String aclId)     | Definition of the ACL to be applied            |
| getStatus()              | Component status retrieval                     |
| setStatus(String status) | Component status definition (see Javadoc)      |
| getVersion()             | Component version retrieval                    |
| setVersion(long version) | Component version definition                   |
| getCreationDate()        | Retrieving the component creation date         |
| getLastUpdateDate()      | Retrieving the component update date           |
| getOwner()               | Component owner retrieval                      |

# Tags management

The [tags](/docs/flowerdocs/concepts/tags/overview) of a component can be manipulated via the JS API using several functions.
The `getTags()` function can be used to determine the tags already present on a component by returning an array containing the names of each of the component's tags.

## Adding or modifying a tag

To add a tag to a component, use the `addTag(name, value, readonly)` function. The second parameter `value` can be a character string or an array of strings to define multiple values.

Using this function for a tag already present on the component overwrites existing values. It can be used to modify tag values.

The third parameter `readonly` is a Boolean indicating whether the tag should be displayed as read-only or not.

## Tag recovery

To access the values of a tag present on a component, the functions `getTagValue(String name)` and `getTagValues(String name)` are exposed on the component object.
The first returns the first value of a tag (_character string_), while the second returns an array containing all the values of a tag.

:::note[Retrieving the value of a tag on a task]

```javascript
var task = new Task();
task.addTag("Amount", "1234", false);
if(task.getTags().includes("Amount")){
    console.info('The amount is ' + task.getTagValue("Amount"));

```

:::
