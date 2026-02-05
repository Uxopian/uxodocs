---
title: Advanced search
sidebar_position: 1
date: "2020-02-02T08:20:01+02:00"
last_update:
  date: '2026-02-05T13:50:19.106Z'
  author: CI/CD Bot
content_hash: c4c91755e1995131c360fe48a4e77d575d1cf5630508c280f51568918516e8eb
---

XML files are used to configure search forms. Use the internal editor to edit the file.

<br/>

The editor can be accessed via the **Administration > Display > XML menu** :

- Click on the **+** to create a new XML file,
- In the first field, enter **Client folder search** to name the XML file,
- Enter the XML code described in the rest of this tutorial,
- Click on the **Save**button.

## Identifier

The first thing to do is to give the search a `dossierClientSearch` unique identifier. This identifier will make it easy to retrieve this search.

<br/>

This identifier will also be used to associate the search form with the team that will have access to it.

<br/>

```xml

	<bean id="dossierClientSearch" class="com.flower.docs.gui.client.search.ComponentSearchPresenter" scope="prototype">
	</bean>

```

<br/>

_Note: These two tags correspond to the start and end tags of a search definition. As a result, everything that will be described in the rest of this example must be inserted between these two tags._

<br/>

## Title, description and category

From a technical point of view, the identifier enables the search to be retrieved, but is not visible to users.

In this case, the name, description and category will make it easier to use the advanced search:

- Set the `title` property to its value **Client folders**,
- Describe the property `description` with its value **Search for a client folder by reference, surname or first name.**

<br/>
```xml

<property name="title" value="Dossiers Clients" />
<property name="description" value="Rechercher un dossier client par sa référence, son nom ou son prénom."/>

```
<br/>
Categorize the search using the `categorieSelectorPresenter` property:

* Enable a single category with the `FakeCategorySelectorPresenter` class,
* Use `VIRTUAL_FOLDER` for client folders.

<br/>
```xml
	<property name="categorySelectorPresenter">
		<bean class="com.flower.docs.gui.client.search.criteria.item.FakeCategorySelectorPresenter">
				<property name="value">
				<value type="com.flower.docs.domain.component.Category">VIRTUAL_FOLDER</value>
				</property>
		</bean>
	</property>
```

<br/>

The `keywordCriteriaPresenter` keyword search will not be used. Disable this search using the `enabled` property and its value `false`:

<br/>
```xml

<property name="keywordCriteriaPresenter">
	<bean class="com.flower.docs.gui.client.search.criteria.KeywordCriteriaPresenter">
		<property name="enabled" value="false" />
	</bean>
</property>

```
<br/>

All the properties described in the rest of this page must be placed in the `AdvancedCriteriaPresenter` bean.
Define advanced search with the `AdvancedCriteriaPresenter` property:

<br/>
```xml

<property name="advancedCriteriaPresenter">
    <bean class="com.flower.docs.gui.client.search.criteria.advanced.AdvancedCriteriaPresenter" />
</property>

```

<br/>

Disable the class selector `displayClassSelector` using its `false` value which allows only client folders to be searched as follows:

<br/>

```xml

<property name="displayClassSelector" value="false" />

```

<br/>

To force the opening of the advanced search, add the `forceOpen` property with its `true` value:

<br/>

```xml

<property name="forceOpen" value="true" />

```

<br/>

Set the `addEmptyCriterion` property to `true` so that the user can add criteria:

<br/>

```xml

<property name="addEmptyCriterion" value="true" />

```

<br/>

Define the `showSearchButton` to launch the search:

<br/>

```xml

<property name="showSearchButton" value="true" />

```
