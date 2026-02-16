---
title: Folder
sidebar_position: 3
description: Folder classes
date: "2018-03-02T14:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 050a506ff2836d839208aee9d2f2206602e5af819ae6ae84dabd54b0b39f867c
---

:::info
Unlike virtual folders, which are made up of searches that dynamically find components, folders have a physical model through a parent-child relationship with the components they contain.

<br/>

A folder class defines the folder model to be created. Its specificity is the notion of the child.
:::

<br />

# Children

The folder class defines which child classes it is authorised to contain.
As many as possible can be defined. If you need to contain all the classes of a component type, for example, all the documents, you can add a child with the identifier `*` as follows:

```xml
<ns2:children category="DOCUMENT">
		<id>*</id>
</ns2:children>
```
