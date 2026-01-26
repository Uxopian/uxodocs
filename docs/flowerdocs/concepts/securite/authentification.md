---
title: Authentication
sidebar_position: 2
description: Authenticate users accessing the application
date: "2018-03-27T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 712bda49ba18526d1b606cbe65813b70a0faef2be9c241c322b8f21b267b221c
---

:::info
Several mechanisms can be used to authenticate users (or clients).
:::

# Company directory

FlowerDocs natively supports the LDAPv2 protocol for user authentication:

- recovery of groups
- special attributes (mail, ...)
- change password

Qualified directories are:

- Microsoft Active Directory
- OpenLDAP
- Apache Directory Server

# OpenID Connect

To integrate FlowerDocs with an existing authentication system shared across the information system, FlowerDocs supports the OpenID Connect protocol.
This protocol is used to authenticate a user to **FlowerDocs GUI**.

# Token

The **FlowerDocs Core** APIs enable user tokens to be generated. The token generated can then be re-used to authenticate requests made to **FlowerDocs Core** or to open **FlowerDocs GUI**.

More information can be found [here](/docs/flowerdocs/config/core/securite/token).
