---
title: Form
sidebar_position: 2
date: "2004-04-02T13:20:01+02:00"
last_update:
  date: '2026-02-17T14:41:59.174Z'
  author: CI/CD Bot
content_hash: ac8ae3fa4bfd699f1e9d732e1aff8728ac872c97ad6e75718ec99b4564965915
---

## Quick reference

### ComponentSearchPresenter

| Property | Type | Description |
|----------|------|-------------|
| `title` | `List<I18NLabel>` | Search form title |
| `description` | `List<I18NLabel>` | Description displayed below the title |
| `categorySelectorPresenter` | Bean | Component category (document, folder, etc.) |
| `keywordCriteriaPresenter` | Bean | Keyword search bar configuration |
| `advancedCriteriaPresenter` | Bean | Advanced criteria panel configuration |
| `hiddenRequest` | `SearchRequest` | Hidden search request ([details](/docs/flowerdocs/config/gui/search/hidden-request)) |
| `hiddenColumns` | `List<String>` | Columns to hide in results ([details](/docs/flowerdocs/config/gui/search/results)) |
| `responsePresenterProvider` | Bean | Result display mode ([details](/docs/flowerdocs/config/gui/search/results)) |
| `actions` | `List<Bean>` | Actions available on the form ([details](/docs/flowerdocs/config/gui/search/actions)) |
| `enableActionsIfDirty` | `boolean` | Show actions before search is executed (default: `true`) |
| `enableIfInvalid` | `boolean` | Allow search when form is invalid (default: `false`) |
| `emptyResultsMessages` | `List<I18NLabel>` | Custom message when no results are found |

### KeywordCriteriaPresenter

| Property | Type | Description |
|----------|------|-------------|
| `enabled` | `boolean` | Enable/disable keyword search (default: `true`) |
| `fields` | `List<String>` | Tags to search (default: all tags) |
| `showSearchButton` | `boolean` | Show a dedicated search button (default: `false`) |
| `searchButtonTitle` | `List<I18NLabel>` | Custom label for the search button |

### AdvancedCriteriaPresenter

| Property | Type | Description |
|----------|------|-------------|
| `enabled` | `boolean` | Enable/disable advanced search (default: `true`) |
| `forceOpen` | `boolean` | Open advanced search and hide the collapse button (default: `false`) |
| `displayClassSelector` | `boolean` | Show class selector (default: `true`) |
| `addEmptyCriterion` | `boolean` | Allow adding free criteria with the `+` button (default: `true`) |
| `showSearchButton` | `boolean` | Show search button (default: `false`) |
| `searchButtonTitle` | `List<I18NLabel>` | Custom label for the search button (default: `Search`) |
| `fixedCriterionPresenters` | `List<Bean>` | Pre-configured criteria displayed by default |
| `searchableCriteria` | `List<String>` | Restrict available criteria to this list (overrides `unsearchableCriteria`) |
| `unsearchableCriteria` | `List<String>` | Hide specific tags from available criteria |
| `nonUniqueCriteria` | `List<String>` | Allow a tag to appear as multiple criteria |
| `activateUniqueCriteria` | `boolean` | Enforce unique criteria (default: `true`) |
| `classCriterionPresenter` | Bean | Custom class selector |


## Category selector

Each search targets a component category (documents, folders, etc.). A category selector is available by default. To hide it, use `FakeCategorySelectorPresenter` to set the category directly:

```xml
<property name="categorySelectorPresenter">
        <bean class="com.flower.docs.gui.client.search.criteria.item.FakeCategorySelectorPresenter">
            <property name="value">
                <value type="com.flower.docs.domain.component.Category">VIRTUAL_FOLDER</value>
            </property>
        </bean>
</property>
```


## Keyword search

Enable keyword search:

```xml
<property name="keywordCriteriaPresenter">
	<bean class="com.flower.docs.gui.client.search.criteria.KeywordCriteriaPresenter" />
</property>
```

Disable it:

```xml
<property name="enabled" value="false" />
```

Restrict keyword search to specific tags:

```xml
<property name="fields">
    <list>
    	<value>Matricule</value>
    	<value>Contractor</value>
    </list>
</property>
```

Show a dedicated search button:

```xml
<property name="showSearchButton" value="true" />
```

The button label can be customized with the `searchButtonTitle` property using I18N labels.

## Advanced search

Enable advanced search:

```xml
<property name="advancedCriteriaPresenter">
    <bean class="com.flower.docs.gui.client.search.criteria.advanced.AdvancedCriteriaPresenter" />
</property>
```

Disable it:

```xml
<property name="enabled" value="false" />
```

Hide the class selector:

```xml
<property name="displayClassSelector" value="false" />
```

<!--
To make the advanced searchavailable online, add the following property:

```xml
<property name="inline" value="true" />
```
-->

Open the advanced search and hide the collapse button:

```xml
<property name="forceOpen" value="true" />
```

Override the default `Search` button label:

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


### Free criteria


By default, all tag classes defined as **searchable** can be added as search criteria.
To restrict the scope of your searches, you can:

*	Prevent users from adding a free criterion using the ``+`` button:
```xml
<property name="addEmptyCriterion" value="false" />
```

*	Hide a tag from the list of available criteria:
```xml
<property name="unsearchableCriteria">
	<list>
		<value>ServiceName</value>
		<value>Assignee</value>
	</list>
</property>
```

*	Force which tags can be used as criteria (overrides ``unsearchableCriteria``):
```xml
<property name="searchableCriteria">
	<list>
		<value>Nature</value>
	</list>
</property>
```

### Fixed criteria

Fixed criteria are pre-configured fields displayed by default. The user fills them in before running the search.

Each fixed criterion is defined as a `FilterCriterionPresenter` bean with a `model` property containing a `Criterion` object. The criterion defines the tag name, the data type and the default operator.

The configurable properties are:

| Property | Type | Description |
|----------|------|-------------|
| `model` | `Criterion` | **(required)** The search criterion defining `name`, `type`, and `operator` |
| `description` | `List<I18NLabel>` | Placeholder text displayed in the input field |
| `displayOperatorSelector` | `boolean` | Show or hide the operator selector dropdown (default: `true`) |
| `forceMonovalued` | `boolean` | Force the user to select only one value for a normally multivalued criterion (default: `false`) |
| `mandatory` | `boolean` | Make the field mandatory before the search can be executed (default: `false`) |

#### Criterion types and operators

Each criterion must declare a `type` and an `operator`. The available operators depend on the type:

| Type | Description | Available operators |
|------|-------------|-------------------|
| `STRING` | Text field | `CONTAINS`, `EQUALS_TO`, `STARTS_WITH`, `ENDS_WITH`, `DIFFERENT` |
| `TIMESTAMP` | Date picker | `BETWEEN` |
| `BOOLEAN` | Checkbox | `EQUALS_TO` |
| `INTEGER` | Numeric field | `EQUALS_TO`, `LESS_THAN`, `GREATER_THAN`, `DIFFERENT` |
| `CURRENCY` | Currency field | `EQUALS_TO`, `LESS_THAN`, `GREATER_THAN`, `DIFFERENT` |

:::info
For choice list tags and conditional tags, the available operators are `EQUALS_TO` and `DIFFERENT`.
:::

#### Examples

Only `name`, `type`, and `operator` change between criterion types -- see the types table above for valid combinations.

__String criterion__ with a description (placeholder):

```xml
<bean id="FirstnameCriterionPresenter" class="com.flower.docs.gui.client.search.criterion.FilterCriterionPresenter">
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
    </property>
</bean>
```

__Mandatory criterion__ with hidden operator selector:

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

#### Assigning criteria to the advanced search

To assign fixed criteria to an advanced search:

```xml
<property name="fixedCriterionPresenters">
    <list>
        <ref bean="FirstnameCriterionPresenter" />
        <ref bean="creationDateCriterion" />
        <ref bean="ConfidentialCriterion" />
    </list>
</property>
```

__Multiple criteria:__

By default, each tag in the list of criteria can only be used once.
To allow a tag to appear as multiple criteria, use the ``nonUniqueCriteria`` property:

```xml
<property name="nonUniqueCriteria">
	<list>
		<value>name</value>
		<value>TIAmount</value>
		<value>creationDate</value>
	</list>
</property>
```

Disable unique criteria enforcement entirely:

```xml
<property name="activateUniqueCriteria" value="false" />
```

## Class selector

Customize the class selector with a
``ComponentClassCriterionSelectorPresenter`` bean. It supports the same properties as filter criteria:

* ``displayOperatorSelector``: hide the operator selector
* ``forceMonovalued``: force single-value selection
* ``mandatory``: make the field required

__Example:__

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

The `CreatableTaskClassCriterionSelectorPresenter` class selector only displays jobs without mandatory or technical attachments, and where the user has creation rights.

Assign a class criterion to an advanced search with the `classCriterionPresenter` property:

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

## Filters

When an aggregation is defined for the [hidden request](/docs/flowerdocs/config/gui/search/hidden-request) of the search form, results are displayed in a tree structure. When a bucket is selected, the search is run using the criteria corresponding to the bucket.

## Technical data

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

## Validation

Control whether the search button is active when the form is invalid with the `enableIfInvalid` property:

* `true`: allow search even if the form is invalid
* `false`: require a valid form to activate the search button

```xml
<property name="enableIfInvalid" value="true" />
```

## Empty results message

Display a custom message when the search returns no results with the `emptyResultsMessages` property:

```xml
<property name="emptyResultsMessages">
    <list>
        <bean class="com.flower.docs.domain.i18n.I18NLabel">
            <property name="language" value="EN" />
            <property name="value" value="No document was found" />
        </bean>
        <bean class="com.flower.docs.domain.i18n.I18NLabel">
            <property name="language" value="FR" />
            <property name="value" value="Aucun document n'a été trouvé" />
        </bean>
    </list>
</property>
```

## Advanced configuration of virtual folders

Filters can be configured within a virtual folder and the search used can be overloaded to add or hide columns in the list of results.

### Tab

Follow the naming convention for the search bean:

| Scope | Bean name pattern | Example (class: `CourrierCollective`, search: `CourrierSearch`) |
|-------|------------------|----------------------------------------------------------------|
| All searches in a VF | `content{ClassId}VirtualFolder` | `contentCourriercollectiveVirtualFolder` |
| One search in a VF | `content{ClassId}VirtualFolder{SearchId}` | `contentCourriercollectiveVirtualFolderCourriersearch` |
| One search across all VFs | `contentVirtualFolder{SearchId}` | `contentVirtualFolderCourriersearch` |

:::warning
`{ClassId}` and `{SearchId}` are lowercased with the first letter capitalized. If the ID contains underscores (`_`), remove them and capitalize the following letter. Example: `Courrier_Mail` becomes `CourrierMail`.
:::

**Example**

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

### Indexation

Virtual folder search forms in indexation mode follow the same pattern as tabs, with a `{Phase}` suffix:

| Scope | Bean name pattern | Example (class: `CourrierCollective`, search: `CourrierSearch`, phase: `Modify`) |
|-------|------------------|----------------------------------------------------------------|
| All searches in a VF | `content{ClassId}VirtualFolder{Phase}` | `contentCourriercollectiveVirtualFolderModify` |
| One search in a VF | `content{ClassId}VirtualFolder{Phase}{SearchId}` | `contentCourriercollectiveVirtualFolderModifyCourriersearch` |
| One search across all indexed VFs | `contentVirtualFolder{Phase}{SearchId}` | `contentVirtualFolderModifyCourriersearch` |

Available phases: `Modify` and `ReadOnly`.

:::warning
The same underscore rule applies: remove underscores and capitalize the following letter. Example: `Courrier_Mail` becomes `CourrierMail`, so the bean name is `contentCourrierMailVirtualFolderModify`.
:::
