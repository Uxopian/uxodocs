---
title: Getting started
sidebar_position: 1
date: "2004-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 8c868f31e44f0087745a4f06134744c2660be2b28f978e45c56c667454991a9b
---

:::info
Search forms are pre-configured templates made available to end users.
:::

# Presentation

A search form allows you to fully configure a search screen.
These are associated with scope teams to personalize the display presented to the user.

<br/>
__Example:__ A basic ``AgentSearch`` search form with the title Agent file search with description

```xml
<bean id="RechercheAgent" class="com.flower.docs.gui.client.search.ComponentSearchPresenter" scope="prototype">
  	<property name="title">
			<list>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="EN"/>
					<property name="value" value="Agent folder search"/>
				</bean>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="FR"/>
					<property name="value" value="Rechercher de dossier agent"/>
				</bean>
			</list>
		</property>
		<property name="description">
			<list>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="EN"/>
					<property name="value" value="Do not fill criteria to find all agent folders"/>
				</bean>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="FR"/>
					<property name="value" value="Ne remplissez aucun critère pour retrouver l'ensemble des dossiers agents"/>
				</bean>
			</list>
		</property>
</bean>
```

<br/>

# Define access

Link a search form to a user team via:

- the CLM and the `scope.xml` file:
  :::note[Team example]

```xml
<profiles>
	<name>ALL_USERS</name>
	<Description>User profile</Description>
	<principals>ou=users,dc=arondor,dc=com</principals>
	<properties>
		<ns3:name>search.template</ns3:name>
		<ns3:value>RechercheAgent(fr=Agent search,en=Agent search)</ns3:value>
	</properties>
</profiles>
```

:::

- the administration console: in the `Security > Teams > Properties` section, add a `Search form ` property

<br/> 
This property has the following value: `&lt;identifiant&gt;(&lt;language&gt;=&lt;label&gt;,&lt;language2&gt;=&lt;label2&gt;)` for example `template_id(fr=Label de formulaire,en=form label)`

<br/>
:::info
If no label is entered, the title from the search form will be used.
:::
