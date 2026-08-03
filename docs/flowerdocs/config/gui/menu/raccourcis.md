---
title: Shortcuts
sidebar_position: 3
date: "2001-03-03T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 7e18d9ce37b4d6d446d963a543fd2c81aab7b0f76fb37386ff2f9f65d3e23f8e
---

## Creation shortcuts

The `Create` button in the menu bar facilitates access to the creation of a component of a given class.

This button is configured using a `ComponentReference` object to define:

- `category`: the type of object to be created (document, folder, task, etc.)
- `id`: class identifier

**Example :** Referencing a `DocumentAgent` class document

```xml
<bean id="documentAgentRef" class="com.flower.docs.domain.component.ComponentReference">
	<property name="category">
		<value type="com.flower.docs.domain.component.Category">DOCUMENT</value>
	</property>
	<property name="id">
		<bean class="com.flower.docs.domain.common.Id">
			<property name="value" value="DocumentAgent" />
		</bean>
	</property>
</bean>
```

This reference is then added to the shortcut button. To do this, edit the `componentCreationShortcuts` bean configuration
(or define it if it does not exist) such that:

```xml
<bean id="componentCreationShortcuts" class="java.util.ArrayList">
   <constructor-arg>
     <list>
       <ref bean="documentAgentRef"/>
     </list>
   </constructor-arg>
</bean>
```

By default, document creation is carried out via the document insertion place and then the indexing place, so that the document content is displayed during indexing.

It is also possible to have a similar behavior to other types of components and create them as popups by setting the `shortcut.document.creation.popup` team property to `true`.
