---
title: Folder
description: Folder classes
date: "2018-03-02T14:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 6bb213aa0e072221f07bb255395190b1ea20f336f28a0db7b23fd29c211078f3
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
