---
title: Scope
description: Isolate your customers/businesses.
date: '2001-02-02'
last_update:
  date: '2025-12-02T14:29:22.460Z'
  author: CI/CD Bot
content_hash: 3b262489f3c2853146014b48afc147dd3be83dcea0d64ba9cab773b38ebd4826
---


:::info
Scopes make it possible to isolate data between different customers/businesses while using the same platform.
:::




A scope defines an application silo by isolating its data and configuration. As such, it defines : 

* user teams 
* users who can access it
* languages used


<br/>



To connect to a scope, you need to enter its identifier as a URL parameter (for example: ``http://flowerdocs.com/gui?scope=GEC``. <br/>
If FlowerDocs is behind a proxy, using the HTTP header `scope` redirects the user to **FlowerDocs GUI**  with the URL parameter `scope` and the value provided. 

<br/>

If the parameter is not set, the default scope defined with the ``scope.default`` property in the ``gui.properties``  configuration file is used.

<br/>
 It is possible to display the scope selection on the login page by configuring the ``scope.edit property`` in the ``gui.properties`` configuration file.
	
	
:::info
Access authorization to a scope is determined by the read permission on the access control list defined at scope level. More details on this mechanism can be found [here](/docs/flowerdocs/concepts/securite/autorisation).
:::
