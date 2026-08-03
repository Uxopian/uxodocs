---
title: Internal users
sidebar_position: 4
description: Define internal users
date: "2019-06-02T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: a3d6cf2baacb92831962d8470f19057ff36af68818ab0b2e9836eba4f83e6442
---

:::info
FlowerDocs-specific users can be defined in **FlowerDocs Core**. These users can be used as service accounts, for administrators, etc.
:::

<br/>

## System user

The `system` user is the account used by the various FlowerDocs applications. This information can be configured using the `system.admin.username` and `system.admin.password` parameters.

<br/>
This account is used by:

- **FlowerDocs GUI** to load its configuration
- **FlowerDocs Core** to run OperationHandlers
- CLM to manage scopes
- The FlowerDocs Java client to simplify authentication to FlowerDocs

_For each of these applications, we recommend configuring the account used (a different one for each application)._

## Other users

**FlowerDocs Core** allows you to define additional accounts and their information:

- `id`: account identifier
- `password`: the account password
- `profiles`: account profiles (roles, groups, teams)

These additional accounts can be set in the `core.properties` and `gui.properties` files:

```properties
internal.realm.users[0].id=client1
internal.realm.users[0].password=<password>
internal.realm.users[0].profiles=ADMIN,ALL_USERS,LEGAL,BUSINESS,MARKETING,ACCOUNTING
```

:::info
The different accounts defined in **FlowerDocs Core** can be used for **all** existing scopes.
:::
