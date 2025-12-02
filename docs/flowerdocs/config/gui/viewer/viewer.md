---
title: Configuration
description: Configure the ARender viewer.
slug: arender-config
date: '2005-06-28T13:20:01+02:00'
last_update:
  date: '2025-12-02T14:44:23.025Z'
  author: CI/CD Bot
content_hash: 464f5d6fcc43e689c2d73dfbaa1e56bfa7395f9e5488a414f6bd295c67a424b2
---


# Profile override 

## Global

It is possible to override the ARender profile (and its parameters) by defining the property: ``gui.client.arender.profile``. The value of this property will be added to the URL calling ARender.


## By scope 

In the context of a shared FlowerDocs platform, it is possible to have different parameter requirements for each scope. In order to override the ARender profile per scope, a `GUIConfiguration` document must be created, containing the following `arenderConfig` bean:


```xml 
<bean id="arenderConfig" class="com.flower.docs.gui.client.files.viewer.ARenderConfiguration" scope="singleton">
		<property name="profil" value="arender&amp;annotation.stickyNote.default.color=%23000000" />
</bean>
```

This example lets you change the default color of sticky notes.


It is not recommended to modify Arender properties by setting parameters in properties files. Properties that are not defined in the documentation are not qualified by FlowerDocs: the correct operation of the application is therefore not guaranteed with these modifications.

