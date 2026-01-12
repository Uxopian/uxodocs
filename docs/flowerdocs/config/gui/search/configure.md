---
title: Form
date: "2004-04-02T13:20:01+02:00"
last_update:
    date: "2025-12-02T14:29:22.460Z"
    author: CI/CD Bot
content_hash: 6b77c8d1e98fe4fd5a5c1a997e316f776480ed7294a5f0d6b301bbd6cb0e4fe3
---

# Category selector

To run a search, you need to define the type of object you are looking for (documents, folders, etc.): a component category.

A category selector is available for this purpose. To hide it, the `FakeCategorySelectorPresenter` class is used to define the category without the user having to select it.

**Example:** Defining the category for a virtual folder search

```xml
<property name="categorySelectorPresenter">
        <bean class="com.flower.docs.gui.client.search.criteria.item.FakeCategorySelectorPresenter">
            <property name="value">
                <value type="com.flower.docs.domain.component.Category">VIRTUAL_FOLDER</value>
            </property>
        </bean>
</property>
```

# Keyword search

The keyword search is configured by adding the following property:

```xml
<property name="keywordCriteriaPresenter">
	<bean class="com.flower.docs.gui.client.search.criteria.KeywordCriteriaPresenter" />
</property>
```

To disable the keyword search, add the following property to the `KeywordCriteriaPresenter` class bean:

```xml
<property name="enabled" value="false" />
```

By default, the keyword search will search all component tags. You can change this behaviour and specify which tags
should be searched by keyword:

```xml
<property name="fields">
    <list>
    	<value>Matricule</value>
    	<value>Contractor</value>
    </list>
</property>
```

# Advanced search

The keyword search is configured by adding the following property:

```xml
<property name="advancedCriteriaPresenter">
    <bean class="com.flower.docs.gui.client.search.criteria.advanced.AdvancedCriteriaPresenter" />
</property>
```

To disable the keyword search, add the following property:

```xml
<property name="enabled" value="false" />
```

By default, the advanced search allows you to filter on one or more component classes.
To avoid displaying the class selector, add the following property:

```xml
<property name="displayClassSelector" value="false" />
```

<!--
To make the advanced searchavailable online, add the following property:

```xml 
<property name="inline" value="true" />
```
-->

To open the advanced search and hide the button for collapsing it, add the following property:

```xml
<property name="forceOpen" value="true" />
```

The default action label is `Search`, which can be overridden by adding the property:

```xml
<property name="searchButtonTitle">
	<list>
		<bean class="com.flower.docs.domain.i18n.I18NLabel">
			<property name="language" value="EN"/>
			<property name="value" value="Verify"/>
		</bean>
		<bean class="com.flower.docs.domain.i18n.I18NLabel">
			<property name="language" value="FR"/>
			<property name="value" value="Vérifier"/>
		</bean>
	</list>
</property>
```

:::info
When using a search criterion on a `CONDITIONAL` tag, if the tag on which it depends is not filled in, all the values of the `CONDITIONAL` tag are displayed.
:::

## Free criteria

By default, all tag classes defined as **searchable** can be added as search criteria.
To restrict the scope of your searches, you can:

- Prevent users from adding a free criterion using the `+` button: add the following property to the `AdvancedCriteriaPresenter` bean:

```xml
<property name="addEmptyCriterion" value="false" />
```

- Hide a tag from the list of available criteria: add its identifier value to the `unsearchableCriteria` property

```xml
<property name="unsearchableCriteria">
	<list>
		<value>ServiceName</value>
		<value>Assignee</value>
	</list>
</property>
```

- Force tags that can be used as criteria in a search form: add the value of its identifier to the `searchableCriteria` property.
  When this property is set, the `unsearchableCriteria` property is not used.

```xml
<property name="searchableCriteria">
	<list>
		<value>Nature</value>
	</list>
</property>
```

## Fixed criteria

The advanced search can be configured to display, by default, fixed criteria that the user only has to fill in before running the search.
For string criteria, it is possible to define a description, using the `description` property, which will be presented to the user.

To define a fixed criterion:

```xml
<bean id="FirstnameCriterionPresenter" class="com.flower.docs.gui.client.search.criterion.SimpleCriterionPresenter">
    <property name="model">
        <bean class="com.flower.docs.domain.search.Criterion">
            <property name="name" value="Firstname" />
            <property name="type">
                <value type="com.flower.docs.domain.search.Types">STRING</value>
            </property>
            <property name="operator">
                <value type="com.flower.docs.domain.search.Operators">CONTAINS</value>
            </property>
        </bean>
    </property>
	<property name="description">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Collaborator firstname"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Prénom du collaborateur"/>
			</bean>
		</list>
	</property></bean>
```

To assign these criteria to an advanced search:

```xml
<property name="fixedCriterionPresenters">
	<list>
		<ref bean="FirstnameCriterionPresenter" />
	</list>
</property>
```

A field display can be customised with a `com.flower.docs.gui.client.search.criterion.FilterCriterionPresenter` class bean using various properties:

- `displayOperatorSelector`: hides the operator selector
- `forceMonovalued`: forces the user to choose only one value for a normally multivalued criterion
- `mandatory`: makes the field mandatory for searching

**Example:**

```xml
<bean id="ValidationStatusCriterionPresenter" class="com.flower.docs.gui.client.search.criterion.FilterCriterionPresenter">
	<property name="description">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Enter a value"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Saisissez une valeur"/>
			</bean>
		</list>
	</property>
	<property name="displayOperatorSelector" value="false" />
	<property name="forceMonovalued" value="true" />
	<property name="mandatory" value="true" />
	<property name="model">
		<bean class="com.flower.docs.domain.search.Criterion">
			<property name="name" value="ValidationStatus" />
			<property name="type">
				<value type="com.flower.docs.domain.search.Types">STRING</value>
			</property>
			<property name="operator">
				<value type="com.flower.docs.domain.search.Operators">STARTS_WITH</value>
			</property>
		</bean>
	</property>
</bean>
```

To assign these criteria to an advanced search:

```xml
<property name="fixedCriterionPresenters">
	<list>
		<ref bean="ValidationStatusCriterionPresenter" />
	</list>
</property>
```

**Multiple criteria:**

By default, all these criteria are defined as `unique`, i.e. each tag in the list of criteria can only be used once.
However, it is possible to define that a tag can correspond to several criteria, thanks to the `nonUniqueCriteria` property:

```xml
<property name="nonUniqueCriteria">
	<list>
		<value>name</value>
		<value>TIAmount</value>
		<value>creationDate</value>
	</list>
</property>
```

This feature can be disabled by adding the `activateUniqueCriteria` property

```xml
<property name="activateUniqueCriteria" value="false" />
```

# Class selector

The selection of the component class during a search can be customized using a
`com.flower.docs.gui.client.search.criteria.clazz.ComponentClassCriterionSelectorPresenter` class bean.

This class criterion can be customized in the same way as the filter criteria listed above:

- `displayOperatorSelector`: hides the operator selector
- `forceMonovalued`: forces the user to choose only one value for a normally multivalued criterion
- `mandatory`: makes the field mandatory for searching

**Example:**

```xml
<bean id="classIdCriterionPresenter" class="com.flower.docs.gui.client.search.criteria.clazz.ComponentClassCriterionSelectorPresenter">
	<property name="displayOperatorSelector" value="false" />
	<property name="forceMonovalued" value="true" />
	<property name="mandatory" value="true" />
	<property name="model">
		<bean class="com.flower.docs.domain.search.Criterion">
			<property name="name" value="classid" />
			<property name="type">
				<value type="com.flower.docs.domain.search.Types">STRING</value>
			</property>
			<property name="operator">
				<value type="com.flower.docs.domain.search.Operators">EQUALS_TO</value>
			</property>
		</bean>
	</property>
</bean>
```

The `com.flower.docs.gui.client.search.criteria.clazz.CreatableTaskClassCriterionSelectorPresenter` class selector
will only display jobs that do not have mandatory or technical attachments, and where the user has creation rights.

To assign this class criterion to an advanced search, set the `classCriterionPresenter` property and display the class criterion:

```xml
<property name="advancedCriteriaPresenter">
		<bean class="com.flower.docs.gui.client.search.criteria.advanced.AdvancedCriteriaPresenter">
			<property name="enabled" value="true" />
			<property name="displayClassSelector" value="true" />
			<property name="showSearchButton" value="true" />
			<property name="classCriterionPresenter" ref="classIdCriterionPresenter" />
		</bean>
</property>
```

# Filters

When an aggregation is defined for the [hidden request](/docs/flowerdocs/config/gui/search/hidden-request) of the search form, results are displayed in a tree structure. When a bucket is selected, the search is run using the criteria corresponding to the bucket.

# Technical data

Technical information positioned by FlowerDocs can also be used as a search criterion or filter:

- `name`: component title
- `id`: component identifier
- `classid`: component class identifier
- `owner`: login of the user who created the component
- `creationDate`: component creation date
- `lastUpdateDate`: date the component was last modified
- `workflow`: workflow identifier, applies only to `TASK` components
- `assigned`: login of the user to whom the task is assigned, applies only to `TASK` components
- `content`: file content, only concerns `DOCUMENT` components

:::info
To be able to search this data, you need to define a `.com.flower.docs.gui.client.search.SearchableFieldCatalog` type `dataCriteriaCatalog` bean.
:::

# Validation

To decide whether or not the search button should be disabled, the `enableIfInvalid` property can be set. This property accepts the following values:

- `true`: the search form may be invalid
- `false`: the form must be valid to activate the action

:::note[Example]

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
				<property name="value" value="Rechercher des dossiers agents"/>
			</bean>
		</list>
	</property>
	<property name="enableIfInvalid" value="true" />
</bean>
```

:::

# Advanced configuration of virtual folders

Filters can be configured within a virtual folder and the search used can be overloaded to add or hide columns in the list of results.

## Tab

To do this, simply follow the naming convention for the search bean as follows:

- to apply the form to all searches in the virtual folder, use the following bean name: `content{VirtualFolder class id with first letter in uppercase}VirtualFolder`

    **Example:** for the CourrierCollective virtual folder class, the name of the associated search form bean will be `contentCourriercollectiveVirtualFolder`

- to apply the form to one of the searches in a virtual folder, use the following bean name: `content{VirtualFolder class id with first letter capitalized}VirtualFolder{search id with first letter capitalized}`

    **Example:**for the CourrierCollective virtual folder class with the CourrierSearch search, the name of the associated search form bean will be `contentCourriercollectiveVirtualFolderCourriersearch`

- to apply the form to this search for all virtual folders, use the following bean: `contentVirtualFolder{search id with first letter in uppercase}`

    **Example:** for the CourrierSearch search, the name of the associated search form bean will be `contentVirtualFolderCourriersearch`

<br/>

If the virtual folder or search form ID contains underscores (`_`), then this is not carried over into the bean name and the following letter must be capitalized.
**Example :** for the Courrier_Mail virtual folder class, the name of the associated search form bean will be `contentCourrierMailVirtualFolder`.

:::note[Example]

```xml
	<bean id="contentCourriercollectiveVirtualFolderCourriersearch"
		class="com.flower.docs.gui.client.search.ComponentSearchPresenter"
		scope="prototype">
		<property name="responsePresenterProvider">
			<bean
				class="com.flower.docs.gui.client.search.response.TableSearchResponsePresenterProvider" />
		</property>
		<property name="categorySelectorPresenter">
			<bean
				class="com.flower.docs.gui.client.search.criteria.item.FakeCategorySelectorPresenter">
				<property name="value">
					<value type="com.flower.docs.domain.component.Category">TASK</value>
				</property>
			</bean>
		</property>
		<property name="keywordCriteriaPresenter">
			<bean
				class="com.flower.docs.gui.client.search.criteria.KeywordCriteriaPresenter">
				<property name="enabled" value="false" />
			</bean>
		</property>
		<property name="hiddenColumns">
			<list>
				<value>status</value>
				<value>classid</value>
				<value>B_DirectionDestinataire</value>
			</list>
		</property>
		<property name="advancedCriteriaPresenter">
			<bean
				class="com.flower.docs.gui.client.search.criteria.advanced.AdvancedCriteriaPresenter">
				<property name="enabled" value="true" />
				<property name="forceOpen" value="true" />
				<property name="inline" value="false" />
				<property name="displayClassSelector" value="false" />
				<property name="addEmptyCriterion" value="false" />
				<property name="showSearchButton" value="true" />
				<property name="searchButtonTitle">
					<list>
						<bean class="com.flower.docs.domain.i18n.I18NLabel">
							<property name="language" value="EN"/>
							<property name="value" value="Filter"/>
						</bean>
						<bean class="com.flower.docs.domain.i18n.I18NLabel">
							<property name="language" value="FR"/>
							<property name="value" value="Filtrer"/>
						</bean>
					</list>
				</property>
				<property name="fixedCriterionPresenters">
					<list>
						<ref bean="ObjetCriterion" />
						<ref bean="DateCriterion" />
						<ref bean="NomAdherentCriterion" />
					</list>
				</property>
				<property name="searchableCriteria">
					<list>
						<value>B_DateCourrier</value>
						<value>B_NomClient</value>
						<value>B_ObjetCourrier</value>
					</list>
				</property>
			</bean>
		</property>
	</bean>
```

:::

## Indexation

The definition of a search form for a virtual folder in indexing is very similar to the one in tabbing, you just need to respect the naming convention of the search bean as follows:

- to apply the form to all searches in the virtual folder, use the following bean name: `content{VirtualFolder class id with first letter in uppercase}VirtualFolder{Phase}`

    **Example:** for the CourrierCollective virtual folder class under modification, the name of the associated search form bean will be `contentCourriercollectiveVirtualFolderModify`

- to apply the form to one of the searches in a virtual folder, use the following bean name: `content{VirtualFolder class id with first letter in uppercase}VirtualFolder{Phase}{search id with first letter in uppercase}`

    **Example:**for the CourrierCollective virtual folder class with the CourrierSearch search, the name of the associated search form bean will be `contentCourriercollectiveVirtualFolderModifyCourriersearch`

- to apply the form to this search for all indexed virtual folders, use the following bean: `contentVirtualFolder{Phase}{search id with first letter in uppercase}`

    **Example:** for the CourrierSearch search, the name of the associated search form bean will be `contentVirtualFolderModifyCourriersearch`

_NB:_ The available values for the phase are: `Modify` and `ReadOnly`.

<br/>

If the virtual folder or search form ID contains underscores (`_`), then this is not carried over into the bean name and the following letter must be capitalized.
Example :\_\_ for the Courrier_Mail virtual folder class, the name of the associated search form bean will be `contentCourrierMailVirtualFolderModify`.
