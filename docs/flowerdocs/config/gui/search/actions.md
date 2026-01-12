---
title: Actions
description: Add actions in the search form.
date: "2023-03-28T13:20:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 5f3420055b33e418a62f2cb17986c75fd16a4ac994f97b4019f137c9235deac5
---

For each search form, it is possible to define a list of actions that a user can perform.

These actions must be defined through the `actions` property on the `ComponentSearchPresenter` object.

:::note[Example]

```xml
<bean id="EnvelopeSearch" class="com.flower.docs.gui.client.search.ComponentSearchPresenter" scope="prototype">
	<property name="actions">
		<list>
			<ref bean="myAction1" />
			<ref bean="myAction2" />
		</list>
	</property>
</bean>
```

:::

By default, these actions are only visible once the search has been executed. To change this behaviour, you can add the following property:

```xml
<property name="enableActionsIfDirty" value="false" />
```

# Types of action

## Component creation

An action can be added to allow users to create a component from a search form.
This type of action pre-indexes the component to be created based on the search criteria.

For example, if a user searches for a document in the `Invoice` class with a `status` tag whose value is `paid`, then the action will create a document with the same information.

:::note[Example: Folder creation]

```xml
<bean id="EnvelopeSearch" class="com.flower.docs.gui.client.search.ComponentSearchPresenter" scope="prototype">
	<property name="actions">
		<list>
			<ref bean="createComponentFromSearchAction" />
		</list>
	</property>
</bean>

<bean id="createComponentFromSearchAction" class="com.flower.docs.gui.client.search.action.ComponentCreationActionPresenter">
	<property name="componentRef">
		<bean class="com.flower.docs.domain.component.ComponentReference">
			<property name="category">
				<value type="com.flower.docs.domain.component.Category">FOLDER</value>
			</property>
			<property name="id">
				<bean class="com.flower.docs.domain.common.Id">
					<property name="value" value="Agency" />
				</bean>
			</property>
		</bean>
	</property>
</bean>
```

:::

## Screen change

`GoToPlaceActionPresenter` type actions are used to switch screens.

:::note[Example: Go to a task creation screen with verification]

```xml
<bean class="com.flower.docs.gui.client.search.action.GoToPlaceActionPresenter">
	<constructor-arg type="java.util.List">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Create envelope"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Créer une enveloppe"/>
			</bean>
		</list>
	</constructor-arg>
	<property name="place">
		<bean class="com.flower.docs.gui.client.search.CreateWithVerificationPlace">
			<property name="id">
				<bean class="com.flower.docs.domain.common.Id">
					<property name="value" value="EEnvelopeSearch" />
				</bean>
			</property>
			<property name="category">
				<value type="com.flower.docs.domain.component.Category">TASK</value>
			</property>
		</bean>
	</property>
</bean>
```

:::

# Activation

Like all actions, it is possible to define the activation strategy using the `enablingStrategy` property.

Several strategies are provided natively:

- Whatever the search results (default): `AnyResultEnablingStrategy`

```xml
<bean class="com.flower.docs.gui.client.search.action.AnyResultEnablingStrategy" />
```

- Only if the search leads to no results: `NoResultEnablingStrategy`

```xml
<bean class="com.flower.docs.gui.client.search.action.NoResultEnablingStrategy" />
```

- If the user has selected a certain number of components based on an operator: `MultipleComponentsEnablingStrategy`
  This activation strategy has two properties:

        * ``operator``: The operator used to evaluate the number of components selected. The following operators are available:  ``EQUALS_TO``, ``GREATER_THAN``, ``LESS_THAN`` and ``DIFFERENT``.
        * ``componentsCount``: The number of components

        __Example:__ Activating the action, if the number of selected components is equal or more than 2.

        ```xml
        <bean class="com.flower.docs.gui.client.search.action.MultipleComponentsEnablingStrategy">
        	<property name="componentsCount" value="2"/>
        	<property name="operator">
        		<value type="com.flower.docs.domain.search.Operators">GREATER_THAN</value>
        	</property>
        </bean>
        ```
