---
title: User management
description: "Create, modify, search for users"
sidebar_position: 38
date: "2018-05-02T12:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: fb75b05d14a327516db404a9daaf571ce8270469ab06698bae25f270a6801a64
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `UserService` service exposes the following operations:

* `create`: to create a user
* `get`: to retrieve a user
* `update`: to modify a user
* `password`: to change a user's password
* `search`: to search for users
* `delete`: to delete a user

# Creation et modification d'un user
## Model
The model used by `create` and `update` calls looks like this:
```json
{
  "id": "string",
  "firstname": "string",
  "lastname": "string",
  "displayName": "string",
  "mail": "string",
  "password": "string",
  "credentialsExpired": true,
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
  ]
}
```
Here is the description associated with the call data set:

* `id`: unique user identifier
* `firstname`, `lastname`, `displayName` and `mail`: user information
* `password`: password
* `profiles` and `groups`: respective lists of user profiles and groups to which this user belongs
* `attributes`: list of additional attributes
* `credentialsExpired`: if the user's credentials have expired.

## Example
The examples below show how to create and modify a user.
<Tabs>
  <TabItem value="create___rest" label="Create - REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X POST "<CORE_HOST>/rest/users/" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "id": "example",
  "firstname": "Firstname",
  "lastname": "Name",
  "displayName": "Firstname name",
  "mail": "example@gmail.com",
  "password": "password",
  "credentialsExpired": false,
  "attributes": [
  ],
  "groups": [
  ],
  "profiles": [
    "AllUsers", "eEnvelope"
  ]
}'
```

  </TabItem>
  <TabItem value="create___java" label="Create - Java">

```java
@Autowired
private UserService userService;

@PostMapping
public void create() throws TechnicalException, FunctionalException
{
    User user = new User(new Id("example"), "example user", "example@gmail.com", new ArrayList<Id>(),
            new ArrayList<Id>(), new ArrayList<IdentityAttribute>(), "firstname", "lastname", "mdp", false);
    userService.create(user);
}
```

  </TabItem>
  <TabItem value="update___rest" label="Update - REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <USER_ID>    user identifier
curl -X POST "<CORE_HOST>/rest/users/<USER_ID>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "id": "example",
  "firstname": "New first name",
  "lastname": "New name",
  "mail": "example@gmail.com",
  "password": "password"
}'
```

  </TabItem>
  <TabItem value="update___java" label="Update - Java">

```java
@Autowired
private UserService userService;

@PostMapping("/update")
public void update() throws TechnicalException, FunctionalException
{
    Id id = new Id("example");
    User user = new User();
    user.setId(id);
    user.setFirstname("New first name");
    user.setLastname("New name");
    userService.update(user);
}
```

  </TabItem>
</Tabs>
# Recovery of one or more users
## Model
The parameters to be entered are :

|Name|Description|
|------|-----------|
|`ids`|Unique identifiers of users to be tracked (separated by commas)|
|`resolveAuthorities`|Determines whether profiles and groups are to be remounted|

## Example
The example below shows how to retrieve users.
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>             FlowerDocs Core base URL
# <TOKEN>                 authentication token
# <USER_IDS>              user IDs to be retrieved
# <RESOLVE_AUTHORITIES>   whether to resolve authorities (true/false)
curl -X GET "<CORE_HOST>/rest/users/<USER_IDS>?resolveAuthorities=<RESOLVE_AUTHORITIES>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private UserService userService;

@GetMapping
public List<User> get() throws TechnicalException, FunctionalException
{
    List<String> ids = Lists.newArrayList("example");
    return userService.get(ids, true);
}
```

  </TabItem>
</Tabs>

# Search for one or more user(s)
## Model
The parameter to be entered is `search`, and corresponds to the searched value. The search can be based on the user's surname, first name, the name to be displayed (`displayName`) or the user's ID, either fully or partially filled in.

## Example
The examples below show how to create and modify a user.
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <NAME>       user name
curl -X GET "<CORE_HOST>/rest/users/search?name=<NAME>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private UserService userService;

@GetMapping("/search")
public List<User> search() throws TechnicalException, FunctionalException
{
    return userService.search("le");
}
```

  </TabItem>
</Tabs>

# Changing a user's password
## Model
The parameters to be entered are :

|Name|Description|
|------|-----------|
|`id`|The user's unique identifier|
|`newPassword`|The user's new password|

## Example
The example below shows how to change a user's password.
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>      FlowerDocs Core base URL
# <TOKEN>          authentication token
# <USER_ID>        user identifier
# <NEW_PASSWORD>   the user's new password
curl -X PUT "<CORE_HOST>/rest/users/<USER_ID>/password" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"password": "<NEW_PASSWORD>"}'
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private UserService userService;

@PutMapping("/password")
public void changePassword() throws TechnicalException, FunctionalException
{
    String id = "example";
    String newPassword = "NewPass";
    userService.changePassword(id, newPassword);
}
```

  </TabItem>
</Tabs>

# Delete a user
## Model
The parameter to be entered is `id`, the unique identifier of the user to be deleted.

## Example
The example below shows how to delete a user.
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <USER_ID>    user identifier
curl -X DELETE "<CORE_HOST>/rest/users/<USER_ID>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private UserService userService;

@DeleteMapping()
public void delete() throws FunctionalException, TechnicalException
{
    String id = "example";
    userService.delete(id);
}
```

  </TabItem>
</Tabs>