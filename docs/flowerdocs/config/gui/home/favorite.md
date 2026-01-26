---
title: Favorites
sidebar_position: 3
date: "2000-04-02T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 9497951c3e0f44447242f29cd2b8037ef8767899c8c28d94dc82d119f0206758
---

This type of widget displays the user's favorites based on a configured search.

Users can click on the results displayed to access the component.

In the example below, we start by defining the request that will populate the widget:

```xml
<bean id="favoriteRequest" class="com.flower.docs.domain.search.SearchRequest">
	<property name="selectClause">
		<bean class="com.flower.docs.domain.search.SelectClause">
			<property name="fields">
				<list>
					<value>name</value>
				</list>
			</property>
		</bean>
	</property>
	<property name="max" value="10" />
</bean>
```

Note that the `id` property used in this bean represents the bean identifier for a parameterized search.

Next, we build the `favoriteDocumentsWidget` widget to display the search.
In this example, we define:

- the type of component required, the category: here `DOCUMENT`, the available categories are `DOCUMENT`, `TASK`, `FOLDER`, `VIRTUAL_FOLDER`.
- the widget's internationalized title and description
- the request defined previously `favoriteRequest`

```xml
<bean id="favoriteDocumentsWidget" class="com.flower.docs.gui.client.preferences.favorite.HomeFavoritesPresenter">
	<property name="search">
		<bean class="com.flower.docs.domain.search.Search">
			<property name="id">
			    <bean class="com.flower.docs.domain.common.Id">
			        <property name="value" value="documentSearch" />
			    </bean>
			</property>
			<property name="category">
				<value type="com.flower.docs.domain.component.Category">DOCUMENT</value>
			</property>
			<property name="request" ref="favoriteRequest" />
			<property name="displayNames">
				<list>
					<bean class="com.flower.docs.domain.i18n.I18NLabel">
						<property name="language" value="EN"/>
						<property name="value" value="My favorites"/>
					</bean>
					<bean class="com.flower.docs.domain.i18n.I18NLabel">
						<property name="language" value="FR"/>
						<property name="value" value="Mes favoris"/>
					</bean>
				</list>
			</property>
		</bean>
	</property>
</bean>
```

And finally, we associate the `favoriteDocumentWidget` widget with a catalog named `homeWidgets`

```xml
<bean id="homeWidgets" class="com.flower.docs.gui.client.util.SimpleWidgetCatalog">
	<property name="widgets">
		<list>
			<ref bean="favoriteDocumentsWidget" />
		</list>
	</property>
</bean>
```

The widget title is clickable, allowing users to directly access the associated search results by pressing it.
