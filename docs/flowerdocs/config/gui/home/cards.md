---
title: Miniatures
date: '2000-04-03T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 3ee1dd1aaf38e796271784db273d87a9086538de853174a79333a312ef3324f3
---


There is another type of search catalogue that is not based on a list of widgets like the ``WidgetCatalog`` but based on a search, the ``SearchWidgetCatalog``. This provides a map widget for each search. 

The properties to be defined are as follows: 

* ``category``: the component category to be searched
* ``titleTemplate``: the search template used for the title
* ``headingTemplate``: the search template used for the header
* ``contentTemplate``: the search template used for content
* ``search``: the search


```xml
<bean id="incidentCatalog" class="com.flower.docs.gui.client.home.SearchWidgetCatalog">
	<property name="category">
		<value type="com.flower.docs.domain.component.Category">TASK</value>
	</property>
	<property name="titleTemplate">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN" />
				<property name="value" value="${IncidentType}" />
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR" />
				<property name="value" value="${IncidentType}" />
			</bean>
		</list>
	</property>
	<property name="headingTemplate">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN" />
				<property name="value" value="Declared on : ${creationDate} by ${owner}" />
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR" />
				<property name="value" value="Déclaré le : ${creationDate} par ${owner}" />
			</bean>
		</list>
	</property>
	<property name="contentTemplate">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN" />
				<property name="value"
					value="&lt;b/&gt; ${classid} &lt;/b&gt; &lt;br/&gt; Status : ${StatusIncident}&lt;br/&gt; Assigned to: ${assignee}&lt;br/&gt; ${IncidentType} on : ${IncidentLocation} for building '${Building}' &lt;br/&gt;&lt;br/&gt; &lt;i&gt; Last modification : ${lastUpdateDate} &lt;/i&gt; &lt;br/&gt;" />
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR" />
				<property name="value"
					value="&lt;b/&gt; ${classid} &lt;/b&gt; &lt;br/&gt; Statut : ${StatusIncident}&lt;br/&gt;  Assigné à : ${assignee}&lt;br/&gt; ${IncidentType} au niveau de : ${IncidentLocation} pour l'immeuble : '${Building}' &lt;br/&gt;&lt;br/&gt; &lt;i&gt; Dernière modification : ${lastUpdateDate} &lt;/i&gt; &lt;br/&gt;" />
			</bean>
		</list>
	</property>
	<property name="search">
		<bean class="com.flower.docs.domain.search.SearchRequest">
			<property name="selectClause">
				<bean class="com.flower.docs.domain.search.SelectClause">
					<property name="fields">
						<list>
							<value>classid</value>
							<value>IncidentType</value>
							<value>IncidentLocation</value>
							<value>Building</value>
							<value>owner</value>
							<value>name</value>
							<value>creationDate</value>
							<value>lastUpdateDate</value>
							<value>StatusIncident</value>
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
									<property name="name" value="classid" />
									<property name="type">
										<value type="com.flower.docs.domain.search.Types">STRING</value>
									</property>
									<property name="operator">
										<value type="com.flower.docs.domain.search.Operators">EQUALS_TO</value>
									</property>
									<property name="values">
										<list>
											<value>NouvelIncident</value>
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
						<property name="name">
							<value>lastUpdateDate</value>
						</property>
						<property name="type">
							<value type="com.flower.docs.domain.search.Types">TIMESTAMP</value>
						</property>
						<property name="ascending">
							<value>false</value>
						</property>
					</bean>
				</list>
			</property>
			<property name="max" value="10"/>
		</bean>
	</property>
</bean>
```


