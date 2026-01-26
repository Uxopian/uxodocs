---
title: Getting Started
sidebar_position: 1
date: "2000-02-01T12:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 2f4378ae346305f312cdc44640940532dc026ff2ab763c1d30366166cc63b34a
---

# Goals

When you have completed this training module, you will be able to:

- Define a virtual folder class,
- Aggregate the contents of a virtual folder from a pivot tag,

<!--
* Create action if permission `UPDATE_CONTENT`,
* Tabular or ARender view (if document),
* Mode switcher (with explanation of sheets according to mode).
-->

# Definition

A virtual folder is a folder for which the content (or children) is resolved dynamically. There is no physical link between the virtual file and its children.

<br/>

These children are determined by one or more searches defined at the class level of the virtual folder. These searches can contain criteria with variables so that search results depend on the tags of the virtual folder or the logged-in user.

<br/>
Thus two `ClientFolder` class virtual folders can have different contents by adding a `ClientReference` criterion with the `${tags.ClientReference}` value. When a virtual folder is displayed, the `${tags.ClientReference}` variable is replaced by the value of the virtual folder's `ClientReference` tag.

# Prerequisites

For this tutorial, a scope with the `learn` module is recommended.
