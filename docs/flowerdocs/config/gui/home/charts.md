---
title: Graphs
sidebar_position: 7
date: "2000-06-28T13:20:01+02:00"
last_update:
  date: '2026-01-27T09:19:20.024Z'
  author: CI/CD Bot
content_hash: 8839780dbcb1e82b0d2b1e016e3e46c5939a4d2cb84d7d5f3bcde46ee5a81d97
---

On the home page, graphs defined by searches can be displayed. The chart type is automatically determined from the number of aggregations:

- one level of aggregation: donut
- two levels of aggregation: histogram

# Donut

**Example: Donut of my mails according to their status**

```xml
<bean id="myMailsGraph" class="com.flower.docs.gui.client.home.graph.HomeGraphPresenter">
	<property name="search">
		<bean class="com.flower.docs.domain.search.Search">
			<property name="id">
			    <bean class="com.flower.docs.domain.common.Id">
			        <property name="value" value="pliSearch" />
			    </bean>
			</property>
			<property name="category">
				<value type="com.flower.docs.domain.component.Category">TASK</value>
			</property>
			<property name="request">
				<bean class="com.flower.docs.domain.search.SearchRequest">
					<property name="selectClause">
						<bean class="com.flower.docs.domain.search.SelectClause">
							<property name="fields">
								<list>
									<value>name</value>
								</list>
							</property>
						</bean>
					</property>
					<property name="filterClauses">
						<list>
							<bean class="com.flower.docs.domain.search.AndClause">
								<property name="criteria">
									<list>
										<bean class="com.flower.docs.domain.search.Criterion">
											<property name="name" value="assignee" />
											<property name="type">
												<value type="com.flower.docs.domain.search.Types">STRING</value>
											</property>
											<property name="operator">
												<value type="com.flower.docs.domain.search.Operators">EQUALS_TO</value>
											</property>
											<property name="values">
												<list>
													<value>${user.id}</value>
												</list>
											</property>
										</bean>
									</list>
								</property>
							</bean>
						</list>
					</property>
					<property name="aggregation">
						<bean class="com.flower.docs.domain.search.FieldAggregation">
							<property name="field" value="Statut" />
						</bean>
					</property>
				</bean>
			</property>
			<property name="displayNames">
				<list>
					<bean class="com.flower.docs.domain.i18n.I18NLabel">
						<property name="language" value="EN"/>
						<property name="value" value="My mails"/>
					</bean>
					<bean class="com.flower.docs.domain.i18n.I18NLabel">
						<property name="language" value="FR"/>
						<property name="value" value="Mes courriers"/>
					</bean>
				</list>
			</property>
		</bean>
	</property>
	<property name="description">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN" />
				<property name="value" value="Mails which are assigned to me" />
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR" />
				<property name="value" value="Les courriers qui me sont assignés" />
			</bean>
		</list>
	</property>
</bean>
```

<br/>

The following result on the home page:

![Donut demonstration](/img/flowerdocs/documentation/donut.png)

:::info
To redirect the user when clicking on a series, override the `handleDonutClick(selector, fieldName, fieldValue, label)` JavaScript method.
:::

**Exemple : Redirect to PersonelleTab with filter on selected Statut value**

```js
	function handleDonutClick(selector, fieldName, fieldValue, label){
		if (selector.indexOf("#pliSearch") != -1 && fieldName==="Statut") {
	      	var place = new flower.docs.PlaceBuilder.build("browse(id=PersonnelleTab,leaf=" + fieldValue + ")");
	      	JSAPI.get().getNavigationAPI().goTo(place);

```

# Histogram

With this type of graph, the first level of aggregation is used to display vertical columns. The second level defines the series.

**Example: Histogram of all correspondence by department and status**

```xml
<bean id="allMailsGraph" class="com.flower.docs.gui.client.home.graph.HomeGraphPresenter">
	<property name="search">
		<bean class="com.flower.docs.domain.search.Search">
			<property name="id">
			    <bean class="com.flower.docs.domain.common.Id">
			        <property name="value" value="allSearch" />
			    </bean>
			</property>
			<property name="category">
				<value type="com.flower.docs.domain.component.Category">TASK</value>
			</property>
			<property name="request">
				<bean class="com.flower.docs.domain.search.SearchRequest">
					<property name="selectClause">
						<bean class="com.flower.docs.domain.search.SelectClause">
							<property name="fields">
								<list>
									<value>name</value>
								</list>
							</property>
						</bean>
					</property>
					<property name="filterClauses">
						<list>
							<bean class="com.flower.docs.domain.search.AndClause">
								<property name="criteria">
									<list>
										<bean class="com.flower.docs.domain.search.Criterion">
											<property name="name" value="assignee" />
											<property name="type">
												<value type="com.flower.docs.domain.search.Types">STRING</value>
											</property>
											<property name="operator">
												<value type="com.flower.docs.domain.search.Operators">DISPLAY</value>
											</property>
											<property name="values">
												<list>
													<value>${user.id}</value>
												</list>
											</property>
										</bean>
									</list>
								</property>
							</bean>
						</list>
					</property>
					<property name="aggregation">
						<bean class="com.flower.docs.domain.search.FieldAggregation">
							<property name="field" value="ServiceDestinataire" />
							<property name="nested">
								<list>
									<bean class="com.flower.docs.domain.search.FieldAggregation">
										<property name="field" value="Statut" />
									</bean>
								</list>
							</property>
						</bean>
					</property>
				</bean>
			</property>
			<property name="displayNames">
				<list>
					<bean class="com.flower.docs.domain.i18n.I18NLabel">
						<property name="language" value="EN"/>
						<property name="value" value="All mails"/>
					</bean>
					<bean class="com.flower.docs.domain.i18n.I18NLabel">
						<property name="language" value="FR"/>
						<property name="value" value="Tous les courriers"/>
					</bean>
				</list>
			</property>
		</bean>
	</property>
	<property name="description">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN" />
				<property name="value" value="All the mails in FlowerDocs" />
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR" />
				<property name="value" value="Tous les courriers dans FlowerDocs" />
			</bean>
		</list>
	</property>
</bean>
```

The following result on the home page:

![Histogram demonstration](/img/flowerdocs/documentation/histogram.png)

:::info
To redirect the user when clicking on a series, override the `handleStackedBarClick(selector, bar, serie)` JavaScript method.
:::

**Exemple : Redirect to CollectiveTab tab with filter on selected series and Status value**

```js
function handleStackedBarClick(selector, barName,barValue, serieName, serieValue){
	if (selector.indexOf("#allSearch") != -1) {
		var place = new flower.docs.PlaceBuilder.build("browse(id=CollectiveTab,leaf=" + barValue + "__"+ serieValue + ")");
	  	JSAPI.get().getNavigationAPI().goTo(place);

```
