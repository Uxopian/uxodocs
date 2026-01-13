---
title: Hidden request
date: "2004-04-03T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 571bc39d6a71fb5525e466d3d3622a11b113551fd8011817532e48d0a2ef11bd
---

For each search form, a search request can be set up that is hidden and therefore not visible to users.

This request allows you to:

- add hidden criteria
- configure the columns to be displayed
- set default sorting
- set the number of results to be displayed

The `ComponentSearchPresenter` object accepts a `hiddenRequest` property with a `com.flower.docs.domain.search.SearchRequest` class bean.

:::note[Example]

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

:::

<br/>

In some cases, it may be necessary to add tags to the `selectClause` of the hidden request in order to retrieve the values of a tag without the column being visible. This can be achieved by adding the `hiddenColumns` property to the `ComponentSearchPresenter` object, as shown below:

```xml
<property name="hiddenColumns">
	<list>
		<value>TypeCourrier</value>
	</list>
</property>
```

:::info

- We recommend using the notion of hidden requests to simplify access to components, rather than to secure access to them.
- Add the `ADD_FILTERS_TO_SELECT` criterion with the `true` value in the request contexts to display the criteria filled in as columns.
  :::
