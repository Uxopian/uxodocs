---
title: Getting Started
description: >-
  Display only the tabs or sub-menus you want according to user profiles in
  Administration
date: '2020-01-01T12:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 1d566011ed35cb187d52e41975e5effe9ac63c279c765cafc08a9992449578a5
---


# Goal

In this module, we will look at how to hide tabs or submenus depending on the current user's profile. 


# Before getting started

This tutorial is based on [retrieving the teams to which the current user belongs via the FlowerDocs JS API](/apis/jsapi/actions.md).

In this training course we will only use the `ADMIN` or `MANAGER` profiles. It is therefore necessary to have a scope containing these user profiles. 

Users belonging to `ADMINs` will have access to all tabs, while `MANAGERs` will not have access to the following tabs: 

* Memory diagnostics	
* Proxies
* Users 
* Directories
* OAuth
* CSS
* XML
* Plugins 
* Operations subscriptions  
* Historical facts 		
* Email servers 	

