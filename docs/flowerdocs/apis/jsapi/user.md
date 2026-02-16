---
title: User
sidebar_position: 10
date: "2007-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 0389727ac7f534de11288304fb059417670b0981b82cab174e9084567fdd2f20
---

A JS API can be used to obtain information about users:

```javascript
JSAPI.get().getUserAPI();
```

# Get a user object

Two methods are available to obtain a user object:

- Common user :

```javascript
JSAPI.get().getUserAPI().getCurrentUser();
```

- Other user :

```javascript
JSAPI.get()
    .getUserAPI()
    .getUser("kta", function (user) {
        console.log("user: " + user.getId());
    });
```

<br/>

| Functions                                 | Description                                       |
| ----------------------------------------- | ------------------------------------------------- |
| getScope()                                | Retrieve the scope to which the user is connected |
| getCurrentUser()                          | Current user recovery                             |
| getUser(String id, UserCallback closure)  | Recovering a user by identifier                   |
| addAttribute(String name,String[] values) | Add attribute for logged-in user                  |
| removeAttribute(String name)              | Delete attribute values for logged-in user        |

# User information

The functions listed below can be called on a user object.

| Functions                       | Description                                  |
| ------------------------------- | -------------------------------------------- |
| getId()                         | User recovery                                |
| getDisplayNames()               | User label recovery                          |
| getFirstName()                  | User first name recovery                     |
| getLastName()                   | User last name retrieval                     |
| getProfiles()                   | Retrieve the teams to which the user belongs |
| getGroups()                     | Retrieve groups to which the user belongs    |
| getMail()                       | Retrieve user email address                  |
| getAttributeValue(String name)  | Retrieve the value of a user attribute       |
| getAttributeValues(String name) | Retrieve user attribute values               |

The token is no longer reassembled when users are retrieved by **FlowerDocs GUI**, to prevent it being used by a malicious individual.
<br/>
It is still possible to retrieve the user's token when retrieving users via **FlowerDocs GUI** by configuration. To do this, the following property must be added to the `gui.properties` file:
`user.expose-token=true`

# Assignee Provider

An `Assignee Provider` provides the GUI with a callback that is executed when a user searches for a user to assign a task to. By default, all users will be remoted.

In certain business situations, it may be necessary to filter these users. To do this, the User API provides the function :

```javascript
var userAPI = JSAPI.get().getUserAPI();
userAPI.registerAssigneeProvider(function (tasks, key, callback) {});
```

<br/>

The function parameters are:

| Parameter | Description                               |
| --------- | ----------------------------------------- |
| tasks     | List of tasks on which assignment is made |
| key       | User name                                 |
| callback  | callback function executed                |

2 methods are available to call the callback:

- _callback.provide(users)_ - must be called with an object array `User`.
- _callback.na()_ - do not filter users.

<br/>

:::info
In the case of a search-based assignment, the `tasks` parameter is built from the search results. They do not include tags that are not present in the associated SearchResult object, and are therefore dependent on the search form.
:::

A filter type is provided by default through the REST web service `./plugins/rest/profiles/&lt;profiles&gt;/users/`. This web service lets you search for users belonging to one or more teams.

**Example**: selection of users from the `LEGAL` and `ADMIN` teams:

```javascript
var userAPI = JSAPI.get().getUserAPI();
userAPI.registerAssigneeProvider(function (tasks, key, callback) {
    var profile = "LEGAL,ADMIN";
    $.get("./plugins/rest/profiles/" + profile + "/users/" + key, function (data) {
        var users = new Array();
        $.each(data, function (k, v) {
            users.push(User.fromJSON(JSON.stringify(v)));
        });
        callback.provide(users);
    });
});
```
