---
title: Identities
description: Organise users accessing your application
date: "2018-03-20T13:20:01+02:00"
last_update:
    date: "2025-12-02T14:29:22.460Z"
    author: CI/CD Bot
content_hash: a4b15a1a1d62b886da9fa61708f37dc4878c6f8ce570b9c4a79028a841245d2a
---

# Principle

Within the FlowerDocs platform, an identity is a user, a group of users or a team.
This concept identifies the users who use the platform so that:

- data security is guaranteed according to the authenticated user
- users can collaborate
- **FlowerDocs GUI** 's configuration is adapted to users' needs

These identities are stored in a [corporate directory](/docs/flowerdocs/config/core/securite/ldap) configured by scope or in the [internal users]’ repository (/documentation/config/core/securite/realm.md).

# Users

A represents a physical person or a third-party application. Every interaction with the platform must be linked to an authenticated user. A user can belong to a group or a team.

# Groups

A represents a set of users or other groups.
This notion is generally used to apply specific permissions according to the groups to which a user belongs.

# Teams

The notion of is similar to that of a group, except that it is managed and stored by the FlowerDocs platform.
This allows you to have user groupings distinct from those defined in the corporate directory. Teams are generally used in organisations where the hierarchy defined in the corporate directory differs from the hierarchy defined in the FlowerDocs platform.

Teams have a list of properties that can be used to configure **FlowerDocs GUI**.

# Roles

The FlowerDocs platform offers several native roles with specific permissions. A role can be assigned to a user by defining a team whose identifier is the role name.

| Name               | Description                                   |
| ------------------ | --------------------------------------------- |
| `FUNCTIONAL_ADMIN` | Functional administrator _(data model)_       |
| `SECURITY_ADMIN`   | Security Administrator _(ACL, identities...)_ |
| `ADMIN`            | Scope administrator                           |
| `SYSTEM_ADMIN`     | Platform administrator                        |
