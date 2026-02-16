---
title: Search
sidebar_position: 2
date: "2000-04-01T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 63aee69c7a86bc79149de43f59ad42e52b11740833dbb88da96f488ad4c44887
---

This type of widget displays the concatenation of fields present in the `selectClause` search for each component retrieved by the configured search.

Users can click on one of the displayed results to access the component.

In the example below, we start by defining the request that will populate the widget:

```xml
<bean id="tenLastBillRequest" class="com.flower.docs.domain.search.SearchRequest">
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
	<property name="filterClauses">
		<list>
			<bean class="com.flower.docs.domain.search.AndClause">
				<property name="criteria">
					<list>
						<bean class="com.flower.docs.domain.search.Criterion">
							<property name="name" value="classid" />
							<property name="type">
								<value type="com.flower.docs.domain.search.Types">STRING</value>
							</property>
							<property name="operator">
								<value type="com.flower.docs.domain.search.Operators">EQUALS_TO</value>
							</property>
							<property name="values">
								<list>
									<value>ProviderBill</value>
								</list>
							</property>
						</bean>
					</list>
				</property>
			</bean>
		</list>
	</property>
	<property name="orderClauses">
		<list>
			<bean class="com.flower.docs.domain.search.OrderClause">
				<property name="name" value="creationDate" />
				<property name="ascending" value="false" />
			</bean>
		</list>
	</property>
</bean>
```

Next, we build the `tenLastBillWidget` widget to display the search.
In this example, we define:

- the type of component required, the category: here `DOCUMENT`, the available categories are `DOCUMENT`, `TASK`, `FOLDER`, `VIRTUAL_FOLDER`.
- internationalized widget title and description
- the previously defined request `tenLastBillRequest`

```xml
<bean id="tenLastBillWidget" class="com.flower.docs.gui.client.home.HomeSearchPresenter">
	<property name="description" >
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="EN" />
					<property name="value" value="My first search" />
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="FR" />
					<property name="value" value="Ma première recherche configurée" />
			</bean>
		</list>
	</property>
	<property name="search">
		<bean class="com.flower.docs.domain.search.Search">
			<property name="category">
				<value type="com.flower.docs.domain.component.Category">DOCUMENT</value>
			</property>
			<property name="request" ref="tenLastBillRequest" />
			<property name="displayNames">
				<list>
					<bean class="com.flower.docs.domain.i18n.I18NLabel">
						<property name="language" value="EN" />
						<property name="value" value="My last bills" />
					</bean>
					<bean class="com.flower.docs.domain.i18n.I18NLabel">
						<property name="language" value="FR" />
						<property name="value" value="Mes 10 dernières factures" />
					</bean>
				</list>
			</property>
		</bean>
	</property>
</bean>
```

Finally, we associate the widget `tenLastBillWidget` with a catalog named `homeWidgets`

```xml
<bean id="homeWidgets" class="com.flower.docs.gui.client.util.SimpleWidgetCatalog">
	<property name="widgets">
		<list>
			<ref bean="tenLastBillWidget" />
		</list>
	</property>
</bean>
```
