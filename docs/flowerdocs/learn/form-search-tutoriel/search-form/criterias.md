---
title: Criteria
date: '2020-03-03T09:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: d42f1356d0c4c0d4709d5a052cac74594559326d2d2ecb9fb3285e56d44d0052
---


:::info
In order to use a tag as a search criterion, it must be defined as **searchable** when it was created!
:::


<br/>

Search criteria represent the content of the search form.

<br/>

The advanced search can be configured to display, by default, criteria that the user only needs to fill in before running the search. This property is placed in the `AdvancedCriteriaPresenter` bean. Criteria are added via the `fixedCriterionPresenters` property:

<br/>

```xml

<property name="fixedCriterionPresenters">
	<list>
	</list>
</property>

```
<br/>

Between the ` tags&lt;list&gt;` and `</list>` add your search criteria.

Place the criterion definition at the beginning of the XML body. The `NomAdherentCriterion` search criterion is defined as follows:

* the `NomClient` tag which is a search criterion
* The criterion is a `STRING` character string
* `EQUALS_TO` is the operator that will help the search to find the client

:::note[XML code: Definition of Criteria]
```xml

<bean id="NomAdherentCriterion" class="com.flower.docs.gui.client.search.criterion.SimpleCriterionPresenter">
    <property name="model">
        <bean class="com.flower.docs.domain.search.Criterion">
            <property name="name" value="NomClient" />
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
:::


_Note: The definition remains the same for the `RefClientCriterion` criteria and `PrenomClientCriterion`, we just need to change the values of the properties `description`, `nom` and the `id` identifier of the bean._

<br/>

The different properties of a criterion :

* `name`: (here equal to `NomClient`) the symbolic name of the tag to be used as a criterion.

* `type`: the type of value to be entered in the field (`Field type`).

* `operator`: the default operator displayed in the search ([Operator] (/javadocs/domain/com/flower/docs/domain/search/Operators.html)).

<br/>

Reference the criteria in the list using the bean identifier:

<br/>

```xml

<property name="fixedCriterionPresenters">
	<list>
		<ref bean="RefClientCriterion" />
		<ref bean="NomAdherentCriterion" />
        <ref bean="PrenomClientCriterion" />
	</list>
</property>

```
<br/>

