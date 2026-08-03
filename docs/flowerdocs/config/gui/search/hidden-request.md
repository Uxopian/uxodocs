---
title: Hidden request
sidebar_position: 3
date: "2004-04-03T13:20:01+02:00"
last_update:
  date: '2026-02-17T14:41:59.174Z'
  author: CI/CD Bot
content_hash: 5041555190c2e5ec7b3b1145a6294e89c580c061bee5440e4df58e583ac23635
---

Define a hidden search request on a form to apply criteria, columns, sorting, or aggregations invisible to users.

The `ComponentSearchPresenter` object accepts a `hiddenRequest` property with a `com.flower.docs.domain.search.SearchRequest` class bean. This request allows you to:

* add hidden criteria
* configure the columns to be displayed
* set default sorting
* set the number of results to be displayed
* configure aggregations for tree-view display


**Example**

```xml
<bean id="monFormulaire" class="com.flower.docs.gui.client.search.ComponentSearchPresenter"
		scope="prototype">
		<!-- ... -->
		<property name="hiddenRequest">
			<bean class="com.flower.docs.domain.search.SearchRequest">
				<property name="selectClause">
					<bean class="com.flower.docs.domain.search.SelectClause">
						<property name="fields">
							<list>
								<!-- Columns to display-->
								<value>name</value>
								<value>TypeCourrier</value>
							</list>
						</property>
					</bean>
				</property>
				<property name="filterClauses">
					<list>
						<bean class="com.flower.docs.domain.search.AndClause">
							<!-- Hidden criteria -->
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
												<value>CourrierEntrant</value>
											</list>
										</property>
									</bean>
								</list>
							</property>
						</bean>
					</list>
				</property>
				<!-- Search results to display -->
				<property name="max" value="42" />
			</bean>
		</property>
		<!-- ... -->
	</bean>
```

## Sorting

The default sort order of results is configured using the `orderClauses` property on the `SearchRequest` object. Each `OrderClause` defines a field name and a sort direction.

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

Multiple sort clauses can be combined. They are applied in order of declaration.

## Aggregation

An aggregation groups search results by field values, displaying them as a tree structure. When a bucket is selected, the search is filtered to match that bucket's criteria.

Aggregations are configured using the `aggregation` property on the `SearchRequest` object with a `FieldAggregation` bean. Nested aggregations create multi-level grouping.

```xml
<property name="aggregation">
    <bean class="com.flower.docs.domain.search.FieldAggregation">
        <property name="nested">
            <list>
                <bean class="com.flower.docs.domain.search.FieldAggregation">
                    <property name="field" value="TypeCourrier" />
                </bean>
                <bean class="com.flower.docs.domain.search.FieldAggregation">
                    <property name="field" value="CanalEntree" />
                </bean>
            </list>
        </property>
    </bean>
</property>
```

## Hidden columns

To retrieve tag values via the `selectClause` without displaying them as visible columns, use the `hiddenColumns` property on the `ComponentSearchPresenter`. See [Search results](/docs/flowerdocs/config/gui/search/results) for details.


:::info

* We recommend using the notion of hidden requests to simplify access to components, rather than to secure access to them.
* Add the `ADD_FILTERS_TO_SELECT` criterion with the `true` value in the request contexts to display the criteria filled in as columns.

:::
