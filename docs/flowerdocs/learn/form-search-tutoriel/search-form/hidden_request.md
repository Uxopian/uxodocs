---
title: Hidden request
sidebar_position: 3
date: "2020-04-04T10:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 26b22bb96cee54d44c9cfce23d90cc913f6777c960152e421db64c6266ce67be
---

In the previous section, you saw how to define the form and search criteria. You will now see how to configure the results display.

<br/>

To do this, you are going to use a hidden request because the user cannot interact with it.

<br/>

This XML block should be placed in the `ComponentSearchPresenter` bean, at the same level as the `advancedCriteriaPresenter` property.

This hidden search is defined using the `hiddenRequest` property:

<br/>

```xml

<property name="hiddenRequest">
	<bean class="com.flower.docs.domain.search.SearchRequest">
		<!-- Ajoutez ici les différentes parties décrites dans la suite -->
	</bean>
</property>

```

## Columns to be displayed

Place the `SelectClause` property in the `SearchRequest` bean. Set this property as below to display the table columns:

:::note[XML code: Definition of columns to be displayed]

```xml

<property name="selectClause">
	<bean class="com.flower.docs.domain.search.SelectClause">
		<property name="fields">
			<list>
				<!-- Colonnes à afficher -->
				<value>name</value>
				<value>NomClient</value>
				<value>RefClient</value>
			</list>
		</property>
	</bean>
</property>

```

:::

<br/>

![](/img/flowerdocs/documentation/learn/display_colonnes.png)

## Filter

Place the `filterClauses` property after the `selectClause` property. Set the `filterClauses` property as below to search client folders:

- The `STRING` type is used to specify that the search criterion will be a character string,
- The `EQUALS_TO` operator will be responsible for client folder feedback,
- the customer files to be searched will be of the `ClientFile` type,

:::note[XML code: Filter definition]

```xml

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
								<value>DossierClient</value>
							</list>
						</property>
					</bean>
				</list>
			</property>
		</bean>
	</list>
</property>

```

:::

## Sorting

FlowerDocs allows results to be sorted according to techniques and tags.

<br/>

In this case, you will sort the result according to the `creationDate` property, which is the date on which the customer files were created.

<br/>

Use the `orderClauses` property to define the sorting of customer files from most recent to oldest:

:::note[XML code: Definition of customer file sorting]

```xml

<property name="orderClauses">
	<list>
		<bean class="com.flower.docs.domain.search.OrderClause">
			<property name="name" value="creationDate" />
			<property name="ascending" value="false" />
		</bean>
	</list>
</property>

```

:::

<br/>

The number of results returned by the search. This property allows you to set a default number of results to be displayed per result page:

<br/>

```xml

<property name="max" value="25" />

```
