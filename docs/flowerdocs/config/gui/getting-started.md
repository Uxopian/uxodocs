---
title: Getting Started
description: Configure the graphical user interface.
date: "1998-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 44cfe1fbc7b8412918cef044d8df610f911ead096804a0bb0e00c28d3cef7b93
---

# Introduction

The graphical user interface is configured using XML files.
These XML files are stored in FlowerDocs as `GUIConfiguration` class documents.

These files must be in Spring Beans format. The various XML fragments described in this documentation must be added to the `beans` tag:

```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xmlns:context="http://www.springframework.org/schema/context"
		xsi:schemaLocation="http://www.springframework.org/schema/beans
	       http://www.springframework.org/schema/beans/spring-beans.xsd
	       http://www.springframework.org/schema/context
	       http://www.springframework.org/schema/context/spring-context.xsd">

		<!-- Add here your custom configuration -->

	</beans>
```

To make editing these configuration files easier, they can be modified directly from the administration console.

# Instance description

The following properties are used to define the deployed instance, and must be added to the `gui.properties` file:

- `gui.client.app.desc`: defines the instance description
- `gui.client.app.logo`: defines the instance logo
- `gui.client.app.env`: defines the environment on which the instance is deployed
- `gui.client.app.style`: defines a custom CSS style sheet to be applied
- `gui.password.change.enabled`: enables/disables the action of changing a user's password
