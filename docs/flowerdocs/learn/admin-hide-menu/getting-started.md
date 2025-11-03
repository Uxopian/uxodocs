---
title: "Getting Started"
description: "Display only the tabs or sub-menus you want according to user profiles in Administration"
date: "2020-01-01T12:20:01+02:00"
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

