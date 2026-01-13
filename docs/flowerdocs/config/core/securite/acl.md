---
title: Access control list
description: Secure access to components
date: "2019-06-06"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 68ff86a70c065ff7bd154de20a232d7a52e71210cfdd4e9d98872667483c96ca
---

# Permissions

The following permissions are allowed for all components :

| Permission          | Description            |
| ------------------- | ---------------------- |
| `CREATE`            | Authorises creation    |
| `READ`              | Authorizes read access |
| `UPDATE`            | Authorises update      |
| `DELETE`            | Authorises deletion    |
| `READ_HISTORY`      | Access to history      |
| `READ_TASK_HISTORY` | Access to task history |

## Document-specific permissions:

| Permission           | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| `READ_CONTENT`       | Read content                                                    |
| `UPDATE_CONTENT`     | Update content                                                  |
| `DOWNLOAD_CONTENT`   | Download content (viewer)                                       |
| `PRINT`              | Print (viewer)                                                  |
| `CREATE_ANNOTATION`  | Create annotation (viewer)                                      |
| `READ_ANNOTATION`    | Read existing annotations (viewer)                              |
| `BUILD_NEW_DOCUMENT` | Activate document clipping (viewer)                             |
| `OBFUSCATE`          | Create obfuscation annotations and reading hidden data (viewer) |

:::info
**Note**: annotations are stored as documents in FlowerDocs.
To be authorized to create annotations, a user must have :

- `READ_ANNOTATION` and `CREATE_ANNOTATION` rights on the business document class
- `CREATE` right on the `Annotation` document class.

To be able to view annotations, a user must have :

- `READ_ANNOTATION` right on the business document class
- `READ` right on the `Annotation` document class.

**Special case for obfuscations**:
To be authorized to obfuscate documents, a user must have the `CREATE_ANNOTATION` and `OBFUSCATE` permissions on the business document class.
:::

:::info
**Page rotation**:  
All users are allowed to rotate pages. Rotation are automatically save to be accessible for other users.
:::

## Task-specific permissions:

| Permission                     | Description                          |
| ------------------------------ | ------------------------------------ |
| `APPROPRIATE`                  | Appropriate an unassigned task       |
| `APPROPRIATE_ALREADY_ASSIGNED` | Appropriate an already assigned task |
| `ASSIGN`                       | Assign a task to a user              |
| `APPLY_ANSWER`                 | Apply an answer                      |
| `UPDATE_CONTENT`               | Update attachments                   |
| `DELETE_CONTENT`               | Delete attachments                   |
| `READ_CONTENT`                 | View attachments                     |

## Virtual folder-specific permissions:

| Permission         | Description                                       |
| ------------------ | ------------------------------------------------- |
| `DOWNLOAD_CONTENT` | Access to zip export including folder's documents |

# Identities

For FlowerDocs, an identity is either a user, a group or a team. The team concept has been introduced to centralise and pool the management of authorisations common to one or more identities.

# ACL Proxy

This feature is in beta. For any integration requirements using ACl's proxies, please contact the FlowerDocs team to help you find the best solution for your needs.

`ACLProxy` type objects are used to add a business aspect to authorisation management.

A proxy is also a `SecurityObject` used to define the security to be applied to a component. It relies on conditions to determine which ACL to apply to a component.

**Example:**

For an `Invoice` document class, the following proxy could be used:

- if amount < €100: everyone has read-only permission for the document
- if amount > €100: everyone has view/modify permissions for the document

**Diagram**

```
                          SecurityObject
                                |
             _______________________________
            |                               |
     AcessControlList  <-----            ACLProxy
            |                |              |
            | 1:N            |              | * rules : List<ACLRule>  ---
            |                |                                           |
    AccessControlEntry       |                                           |
                             |                                           |
                             |           ACLRule  <-----------------------
                             |              |
                             |              | * conditions : List<String>
                             |____1:1_______| * aclId : Id
```

## Default setting

Defining an unconditional entry in a proxy allows you to define which ACL should be evaluated to create a component from **FlowerDocs GUI**.

# Roles

Roles give access to FlowerDocs features through the team concept.

To assign a role to a user:

- create a team whose identifier is the role name
- add users to a team

| Role               | Description             |
| ------------------ | ----------------------- |
| `ADMIN`            | Administers a scope     |
| `DOCUMENT_CREATOR` | Accesses the Insert tab |
