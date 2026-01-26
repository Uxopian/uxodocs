---
title: Overview
sidebar_position: 1
description: Component class overview
date: "2018-03-01T12:20:01+02:00"
custom_edit_url: null
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: ff312d26a749d20305f324444d476adbdda701035b9a6966a1f306c30bb29017
---

A component class defines the common characteristics of a logical set of components. These sets are characterised by [tags](/docs/flowerdocs/concepts/tags/overview) (or metadata), security, business or technical rules that are specific to them.

This section defines the notion of component class, used to characterise the components (documents, folders, tasks, etc.) handled within the application.
In this way, every component refers to a class of components via its identifier.

When defining identifiers, we recommend using only: alphanumeric characters, "-" and "_" (spaces are not recommended). <br/>
Regex: `^[a-zA-Z0-9-_]$`<br/>
This recommendation is mandatory for all FlowerDocs versions above 2.6.

<br/>
A component class defines a type of component:

- tags that can be linked to a component
- the default security to be applied by defining an ACL identifier to be applied
- tag categories to visually group tags into functional blocks
- international labels to provide a multilingual application
- technical character

_Depending on the category of the component class, special features can be added._
