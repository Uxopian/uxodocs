---
title: Administration roles
sidebar_position: 4
description: Delegate parts of the scope administration to granular roles
---

## Principle

The administration of a scope is shared between two full administration roles, `ADMIN` and `SYSTEM_ADMIN`, and six granular roles. Each granular role opens one part of the administration console, and the server applies the same limits to the web services: a call outside the caller's role is refused with an HTTP 403 error.

A user holds a role when they are a member of the team whose identifier is the role name. Membership can be direct, through a group or through another team. The [Identities](/docs/flowerdocs/concepts/securite/identities#roles) page describes teams and the list of native roles.

- `ADMIN` holds every granular role.
- `SYSTEM_ADMIN` holds `ADMIN` and every granular role.
- The granular roles do not imply each other: a user who needs two of them must be a member of both teams.

## Roles

| Role                  | Team name in the scope template | What it administers                                                                                                         |
| --------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `RECOVERYBIN_MANAGER` | Recovery bin managers           | Lists, restores and permanently deletes the components held in the recovery bins                                            |
| `USERS_MANAGER`       | Users managers                  | Users, groups and business teams. Reads role teams without being able to change them                                        |
| `SECURITY_ADMIN`      | Security managers               | Directory service and OAuth configuration, users and groups                                                                 |
| `DELEGATION_MANAGER`  | Delegation managers             | Delegations, on behalf of any user                                                                                          |
| `TEMPLATE_MANAGER`    | Template managers               | Stamps, email bodies and email signatures                                                                                   |
| `FUNCTIONAL_ADMIN`    | Data model managers             | Component classes, tag classes, tag categories, task classes, processes and access control lists, plus the screens of `TEMPLATE_MANAGER` |
| `ADMIN`               | Administrator                   | The whole scope                                                                                                             |
| `SYSTEM_ADMIN`        |                                 | The whole platform, including the creation and deletion of scopes                                                          |

## Administration screens by role

The administration console only shows the screens the user's roles open. In the table below, `ADMIN` stands for `ADMIN` and `SYSTEM_ADMIN`.

| Section > Screen                                                                   | `ADMIN` | `FUNCTIONAL_ADMIN`  | `SECURITY_ADMIN` | `USERS_MANAGER` | `DELEGATION_MANAGER` | `TEMPLATE_MANAGER` | `RECOVERYBIN_MANAGER` |
| ---------------------------------------------------------------------------------- | ------- | ------------------- | ---------------- | --------------- | -------------------- | ------------------ | --------------------- |
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

### Scope definition

- Only `ADMIN` and `SYSTEM_ADMIN` update the scope definition: description, languages, display names and ACL of the scope.
- `USERS_MANAGER` and `SECURITY_ADMIN` may send a scope update that changes the teams only, within the limits of [Granting administration](#granting-administration). Any other change is refused with the error `F00335`.
- Creating and deleting a scope is reserved to `SYSTEM_ADMIN`.

### Data model

`FUNCTIONAL_ADMIN` creates and updates document classes, folder classes, virtual folder classes, task classes, tag classes, tag categories and processes. It chooses the ACL of a class when creating it.

The following actions are reserved to `ADMIN` and `SYSTEM_ADMIN`:

- deleting a component class, a tag class, a tag category, a tag value or a process (error `F00329`)
- changing the ACL of an existing component class or tag class (error `F00330`)

### Access control lists

- Creating and updating an ACL requires `FUNCTIONAL_ADMIN`.
- Deleting an ACL requires `ADMIN`.

A refused call returns the error `F00328`.

### Users and groups

`USERS_MANAGER` and `SECURITY_ADMIN` create, update and delete users and groups, and change the password of another user, within the limits of [Granting administration](#granting-administration).

### Directory service and OAuth

The `LDAPConfiguration` and `OAuthClientConfiguration` documents are secured by the class ACL `acl-security-configuration-administration`, which grants every permission to `ADMIN` and `SECURITY_ADMIN`.

### Delegations

Every user manages the delegations they give. `DELEGATION_MANAGER` creates, updates and deletes delegations on behalf of any user. See [Delegation](/docs/flowerdocs/config/gui/delegation).

### Stamps, email bodies and email signatures

These objects are documents, secured by ACLs rather than by a role check:

- Email bodies and email signatures are documents of class `Template`, secured by the class ACL `acl-template-administration`. It grants read access to every user, and write access to `ADMIN`, `TEMPLATE_MANAGER` and `FUNCTIONAL_ADMIN`.
- Stamp templates are documents of class `UserPreference`, secured by the proxy `acl-preferences`. Its rules give `TEMPLATE_MANAGER` and `FUNCTIONAL_ADMIN` full control on the stamp templates. See [Stamp templates](/docs/flowerdocs/config/gui/viewer/stamps).

### Recovery bin

`RECOVERYBIN_MANAGER` sees every component of the recovery bins, whatever the ACL of the component, and restores or permanently deletes it. The role grants nothing on the components that are not in a recovery bin.

The recovery bin of a component category is listed with `POST /rest/<category>/recoverybin/search`, for example `POST /rest/documents/recoverybin/search`. Restoring a component is an update of its status, and deleting it permanently is a delete, both on the usual endpoints of the category.

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

## Role teams in a scope

### Scopes created from the template

The `scope.xml` file of the default [template](/docs/flowerdocs/install/clm/template) declares the six granular role teams, with no members. Add members to the teams you want to use:

```xml
<ns2:profiles>
    <id>RECOVERYBIN_MANAGER</id>
    <ns2:name>Recovery bin managers</ns2:name>
    <ns2:Description>Lists, restores and permanently deletes the components held in the recovery bins. No other administration right.</ns2:Description>
    <ns2:principals>recovery-bin-team</ns2:principals>
</ns2:profiles>
```

The template also carries the ACLs these roles rely on:

- `acl-security-configuration-administration` on the `LDAPConfiguration` and `OAuthClientConfiguration` classes
- `acl-template-administration` on the `Template` class
- the stamp template rules of the `acl-preferences` proxy

### Existing scopes

An existing scope does not receive the role teams. Add the teams you want to use, with these identifiers:

- `RECOVERYBIN_MANAGER`
- `USERS_MANAGER`
- `SECURITY_ADMIN`
- `DELEGATION_MANAGER`
- `TEMPLATE_MANAGER`
- `FUNCTIONAL_ADMIN`

Two ways are available, both reserved to `ADMIN` and `SYSTEM_ADMIN`:

- **Administration console**: in _Principals > Teams_, create a team whose identifier is the role name, then add its members.
- **CLM**: export the scope definition, add the teams to the exported `scope.xml`, then update the scope with it:

```properties
<clm> export-scope --scope=<scope> --template=<folder>
<clm> update-scope --scope=<scope> --template=<folder>
```

:::warning
`update-scope` replaces the whole scope definition with the `scope.xml` file of the template: description, ACL and every team. Start from an export of the scope itself, never from the default template, or the teams created since the scope was deployed are lost.
:::
