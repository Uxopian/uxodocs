---
title: Getting Started
date: '2000-02-01T12:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 8b1cfc3f70b042d4142f699c4fc663e6e54b77d7d4bf9280b85a0be72f6f2fd3
---


# Goals

When you have completed this training module, you will be able to:

* Define a virtual folder class,
* Aggregate the contents of a virtual folder from a pivot tag,

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
