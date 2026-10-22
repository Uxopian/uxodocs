---
title: Administration roles
sidebar_position: 4
description: Delegate parts of the scope administration to granular roles
---

The roles and their purpose are described in [Identities](/docs/flowerdocs/concepts/securite/identities#roles). The sections below describe what each role opens in the administration console and on the server.

The team names used in the scope template are:

| Role                  | Team name                |
| --------------------- | ------------------------ |
| `RECOVERYBIN_MANAGER` | Recovery bin managers    |
| `USERS_MANAGER`       | Users managers           |
| `SECURITY_ADMIN`      | Security managers        |
| `DELEGATION_MANAGER`  | Delegation managers      |
| `TEMPLATE_MANAGER`    | Template managers        |
| `FUNCTIONAL_ADMIN`    | Data model managers      |
| `ADMIN`               | Administrator            |
| `SYSTEM_ADMIN`        | — *(platform-level role, not declared in the scope template)* |

## Administration screens by role

The administration console only shows the screens the user's roles open.

| Section > Screen                                                                   | `ADMIN` / `SYSTEM_ADMIN` | `FUNCTIONAL_ADMIN`  | `SECURITY_ADMIN` | `USERS_MANAGER` | `DELEGATION_MANAGER` | `TEMPLATE_MANAGER` | `RECOVERYBIN_MANAGER` |
| ---------------------------------------------------------------------------------- | ------------------------ | ------------------- | ---------------- | --------------- | -------------------- | ------------------ | --------------------- |
| Scope                                                                              | Yes     | Read-only (1)       | Read-only (1)    | Read-only (1)   | No                   | Read-only (1)      | No                    |
| Components > Document classes, Folder classes, Virtual folder classes             | Yes     | Yes (2)             | No               | No              | No                   | No                 | No                    |
| Components > Tag classes, Tag categories                                           | Yes     | Yes (2)             | No               | No              | No                   | No                 | No                    |
| Task & Process > Task classes, Process                                             | Yes     | Yes (2)             | No               | No              | No                   | No                 | No                    |
| Security > Access control                                                          | Yes     | Yes (3)             | No               | No              | No                   | No                 | No                    |
| Security > Delegations                                                             | Yes     | No                  | No               | No              | Yes                  | No                 | No                    |
| Principals > Users, Groups                                                         | Yes     | No                  | Yes (4)          | Yes (4)         | No                   | No                 | No                    |
| Principals > Directory service, OAuth                                              | Yes     | No                  | Yes              | No              | No                   | No                 | No                    |
| Principals > Teams                                                                 | Yes     | No                  | No               | Yes (4)         | No                   | No                 | No                    |
| Display > Stamps                                                                   | Yes     | Yes                 | No               | No              | No                   | Yes                | No                    |
| Templates & Email > Email bodies, Email signatures                                 | Yes     | Yes                 | No               | No              | No                   | Yes                | No                    |
| Bins > Documents, Folders, Virtual folders, Tasks                                  | Yes     | No                  | No               | No              | No                   | No                 | Yes                   |
| Any other screen _(Security > Proxies and Pages, Display > JS, CSS, XML and Plugins, Configuration, other templates)_ | Yes     | No                  | No               | No              | No                   | No                 | No                    |

1. The scope definition is read-only. The _Clear cache_ button is available.
2. Without the _Delete_ action. The ACL of an existing class is read-only: it is chosen when the class is created.
3. Create and update. Deleting an ACL is reserved to `ADMIN`.
4. Except the accounts, groups and teams that hold or grant an administration role, see [Granting administration](#granting-administration).

## Rules

### Granting administration

The administration teams are the `ADMIN` and `SYSTEM_ADMIN` teams and the six granular role teams. A team is an administration team because of its identifier: the name shown in the console does not count.

- Only `ADMIN` and `SYSTEM_ADMIN` change the members of an administration team. Only `SYSTEM_ADMIN` changes the members of the `SYSTEM_ADMIN` team.
- This applies to every way of granting a team: a user named in the team, a group named in the team, or another team named in the team.
- A user who does not hold the role required by a team cannot create, update or delete a user or a group that holds or grants this team, nor change its password.
- `USERS_MANAGER` and `SECURITY_ADMIN` change the members of the business teams, that is to say the teams whose identifier is not a role name. In the console, the _Teams_ screen is open to `USERS_MANAGER`.

A refused change returns the error `F00333`.

### Data model

`FUNCTIONAL_ADMIN` creates and updates document classes, folder classes, virtual folder classes, task classes, tag classes, tag categories and processes. It chooses the ACL of a class when creating it.

The following actions are reserved to `ADMIN` and `SYSTEM_ADMIN`:

- deleting a component class, a tag class, a tag category, a tag value or a process (error `F00329`)
- changing the ACL of an existing component class or tag class (error `F00330`)

### Cache purge

Purging the scope caches is open to `ADMIN`, `USERS_MANAGER`, `SECURITY_ADMIN`, `FUNCTIONAL_ADMIN` and `TEMPLATE_MANAGER`, so that each role sees its changes without waiting for the caches to expire. See [Purging GUI caches](/docs/flowerdocs/config/exploit/cache).

## Error codes

All these errors return the HTTP status 403.

| Code     | Message                                                                                                                                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `F00328` | `Not allowed to perform this operation, one of the following roles is required: {0}`. `{0}` lists the roles that would allow the call                                                                                     |
| `F00329` | `Your {0} role lets you edit the data model, not delete {1}. This action is reserved for the ADMIN or SYSTEM_ADMIN profile.` A caller without a data model role receives `You cannot delete {1}. This action is reserved for the ADMIN or SYSTEM_ADMIN profile.` |
| `F00330` | `Your {0} role lets you choose the ACL of a class when you create it, not change the ACL of {1}, which secures everything that uses the class. This action is reserved for the ADMIN or SYSTEM_ADMIN profile.` A caller without a data model role receives `You cannot change the ACL of {1}, which secures everything that uses the class. This action is reserved for the ADMIN or SYSTEM_ADMIN profile.` |
| `F00333` | `Not allowed to modify the privileged profile {0}`. `{0}` is the administration team the change would affect                                                                                                             |
| `F00335` | `Your {0} role lets you change the profiles of the scope {1}, not {2}. This action is reserved for the ADMIN or SYSTEM_ADMIN profile.` `{2}` lists the fields of the scope the update changes                              |

