---
title: Overview
description: Component class overview
date: '2018-03-01T12:20:01+02:00'
custom_edit_url: null
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: d4f92b6f1673e5486c50a5aea0269a4d072fc4eb87483cff9faddf50986ee80c
---



A component class defines the common characteristics of a logical set of components. These sets are characterised by [tags](/concepts/tags/overview.md) (or metadata), security, business or technical rules that are specific to them.   


This section defines the notion of component class, used to characterise the components (documents, folders, tasks, etc.) handled within the application.
In this way, every component refers to a class of components via its identifier.


When defining identifiers, we recommend using only: alphanumeric characters, "-" and "_" (spaces are not recommended). <br/>
Regex: `^[a-zA-Z0-9-_]$`<br/>
This recommendation is mandatory for all FlowerDocs versions above 2.6. 


<br/>
A component class defines a type of component: 

* tags that can be linked to a component
* the default security to be applied by defining an ACL identifier to be applied
* tag categories to visually group tags into functional blocks
* international labels to provide a multilingual application
* technical character


*Depending on the category of the component class, special features can be added.*  
