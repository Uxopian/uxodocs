---
title: Identities
sidebar_position: 1
description: Organise users accessing your application
date: "2018-03-20T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 30c3d48a3fcc2cc9e4ac98e69f6dced7e26ac1c460027663451565ab6ee304c0
---

## Principle

Within the FlowerDocs platform, an identity is a user, a group of users or a team.
This concept identifies the users who use the platform so that:

- data security is guaranteed according to the authenticated user
- users can collaborate
- **FlowerDocs GUI** 's configuration is adapted to users' needs

These identities are stored in a [corporate directory](/docs/flowerdocs/config/core/securite/ldap) configured by scope or in the [internal users]’ repository (/documentation/config/core/securite/realm.md).

## Users

A represents a physical person or a third-party application. Every interaction with the platform must be linked to an authenticated user. A user can belong to a group or a team.

## Groups

A represents a set of users or other groups.
This notion is generally used to apply specific permissions according to the groups to which a user belongs.

## Teams

The notion of is similar to that of a group, except that it is managed and stored by the FlowerDocs platform.
This allows you to have user groupings distinct from those defined in the corporate directory. Teams are generally used in organisations where the hierarchy defined in the corporate directory differs from the hierarchy defined in the FlowerDocs platform.

Teams have a list of properties that can be used to configure **FlowerDocs GUI**.

## Roles

The FlowerDocs platform offers several native roles with specific permissions. A user holds a role when they are a member of the team whose identifier is the role name, directly, through a group or through another team.

| Name                  | Description                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------- |
| `RECOVERYBIN_MANAGER` | Recovery bin manager _(lists, restores and permanently deletes deleted components)_          |
| `USERS_MANAGER`       | Users manager _(users, groups, business teams)_                                              |
| `SECURITY_ADMIN`      | Security manager _(directory service, OAuth, users, groups)_                                 |
| `DELEGATION_MANAGER`  | Delegation manager _(delegations on behalf of any user)_                                     |
| `TEMPLATE_MANAGER`    | Template manager _(stamps, email bodies, email signatures)_                                  |
| `FUNCTIONAL_ADMIN`    | Data model manager _(classes, tag categories, processes, access control lists)_              |
| `ADMIN`               | Scope administrator, holds every role above                                                  |
| `SYSTEM_ADMIN`        | Platform administrator, holds `ADMIN` and every role above                                   |

Only `ADMIN` and `SYSTEM_ADMIN` grant these roles. The screens and operations each role opens, and the error codes it returns, are described in [Administration roles](/docs/flowerdocs/concepts/securite/administration-roles).
