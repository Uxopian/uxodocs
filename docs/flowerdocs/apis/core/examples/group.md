---
title: Group management
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Create, retrieve, modify, search for and delete groups
sidebar_position: 36
date: "2018-05-02T12:20:01+02:00"
content_hash: 22ff3f181c3d0c8b348708b0087b4f7fd9d02ec33272d5f93b68d5c31ccdc84b
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `GroupService` service exposes the following operations:

* `create`: to create a group
* `get`: to retrieve a group
* `update`: to modify a group
* `search`: to search for groups
* `delete`: to delete a group

# Retrieving groups
## Model
The parameters to be entered are:

|Name|Description|
|------|-----------|
|`names`|Unique identifiers of groups to be retrieved (separated by commas)|
|`resolveAuthorities`|Determines whether profiles and groups are to be resolved|

## Example
The example below shows how to retrieve groups.
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>             FlowerDocs Core base URL
# <TOKEN>                 authentication token
# <NAMES>                 group names to be retrieved
# <RESOLVE_AUTHORITIES>   whether to resolve authorities (true/false)
curl -X GET "<CORE_HOST>/rest/groups/<NAMES>?resolveAuthorities=<RESOLVE_AUTHORITIES>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private GroupService groupService;

@GetMapping
public List<Group> get() throws TechnicalException, FunctionalException
{
    List<String> names = Lists.newArrayList("administrators");
    return groupService.get(names, true);
}
```

  </TabItem>
</Tabs>

# Searching for groups
## Model
The parameter to be entered is `name`, and corresponds to the searched value. The search can be based on the group name, either fully or partially filled in.

## Example
The example below shows how to search for groups.
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <NAME>       group name
curl -X GET "<CORE_HOST>/rest/groups/search?name=<NAME>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private GroupService groupService;

@GetMapping("/search")
public List<Group> search() throws TechnicalException, FunctionalException
{
    return groupService.search("admin");
}
```

  </TabItem>
</Tabs>

# Creating and modifying a group
## Model
The model used by `create` and `update` calls looks like this:
```json
{
  "id": "string",
  "displayName": "string",
  "mail": "string",
  "attributes": [
    {
      "name": "string",
      "values": [
        "string"
      ]
    }
  ],
  "groups": [
    "string"
  ],
  "profiles": [
    "string"
  ],
  "members": [
    "string"
  ]
}
```
Here is the description associated with the call data set:

* `id`: unique group identifier
* `displayName` and `mail`: group information
* `profiles` and `groups`: respective lists of profiles and parent groups
* `members`: list of user identifiers belonging to this group
* `attributes`: list of additional attributes

## Example
The examples below show how to create and modify a group.
<Tabs>
  <TabItem value="create - rest" label="Create - REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X POST "<CORE_HOST>/rest/groups/" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "id": "developers",
  "displayName": "Development Team",
  "mail": "dev@example.com",
  "attributes": [],
  "groups": [],
  "profiles": [
    "AllUsers"
  ],
  "members": [
    "user1", "user2"
  ]
}'
```

  </TabItem>
  <TabItem value="create - java" label="Create - JAVA">

```java
@Autowired
private GroupService groupService;

public void create() throws TechnicalException, FunctionalException
{
    Group group = new Group();
    group.setId(new Id("developers"));
    group.setDisplayName("Development Team");
    group.setMail("dev@example.com");
    group.setMembers(Lists.newArrayList(new Id("user1"), new Id("user2")));
    group.setProfiles(Lists.newArrayList(new Id("AllUsers")));
    groupService.create(group);
}
```

  </TabItem>
  <TabItem value="update - rest" label="Update - REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <NAME>       group name
curl -X POST "<CORE_HOST>/rest/groups/<NAME>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "id": "developers",
  "displayName": "Dev Team",
  "mail": "dev@example.com",
  "members": [
    "user1", "user2", "user3"
  ]
}'
```

  </TabItem>
  <TabItem value="update - java" label="Update - JAVA">

```java
@Autowired
private GroupService groupService;

public void update() throws TechnicalException, FunctionalException
{
    Group group = new Group();
    group.setId(new Id("developers"));
    group.setDisplayName("Dev Team");
    group.setMembers(Lists.newArrayList(new Id("user1"), new Id("user2"), new Id("user3")));
    groupService.update(group);
}
```

  </TabItem>
</Tabs>

# Deleting a group
## Model
The parameter to be entered is `name`, the unique identifier of the group to be deleted.

## Example
The example below shows how to delete a group.
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <NAME>       group name
curl -X DELETE "<CORE_HOST>/rest/groups/<NAME>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private GroupService groupService;

public void delete() throws FunctionalException, TechnicalException
{
    String name = "developers";
    groupService.delete(name);
}
```

  </TabItem>
</Tabs>