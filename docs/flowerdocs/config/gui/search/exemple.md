---
title: Full example
sidebar_position: 7
date: "2023-03-29T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 2c295a036d44d76382b93e58efaba7f501257c21da8281d5e3b1701751e2463b
---

```xml
<bean id="AgentSearch" class="com.flower.docs.gui.client.search.ComponentSearchPresenter" scope="prototype">
	<!-- Title -->
	<property name="title">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Agent folders search"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Recherche de dossiers agents"/>
			</bean>
		</list>
	</property>
	<property name="description">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Fill criteria to easily find desired folder"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Remplissez les critères pour retrouver facilement le dossier désiré"/>
			</bean>
		</list>
	</property>
	<!-- Category: search virtual folders only -->
	<property name="categorySelectorPresenter">
		<bean class="com.flower.docs.gui.client.search.criteria.item.FakeCategorySelectorPresenter">
			<property name="value">
				<value type="com.flower.docs.domain.component.Category">VIRTUAL_FOLDER</value>
			</property>
		</bean>
	</property>
	<!-- Keyword search: disabled -->
	<property name="keywordCriteriaPresenter">
		<bean class="com.flower.docs.gui.client.search.criteria.KeywordCriteriaPresenter">
			<property name="enabled" value="false" />
		</bean>
	</property>
	<!-- Advanced search: fixed criteria, no class selector -->
	<property name="advancedCriteriaPresenter">
		<bean class="com.flower.docs.gui.client.search.criteria.advanced.AdvancedCriteriaPresenter">
			<property name="enabled" value="true" />
			<property name="showSearchButton" value="true" />
			<property name="displayClassSelector" value="false" />
			<property name="fixedCriterionPresenters">
				<list>
					<ref bean="MatriculeCriterionPresenter" />
					<ref bean="creationDateCriterion" />
				</list>
			</property>
		</bean>
	</property>
	<!-- Hidden columns -->
	<property name="hiddenColumns">
		<list>
			<value>status</value>
			<value>Matricule</value>
		</list>
	</property>
	<!-- Hidden request: columns, filter, max results -->
	<property name="hiddenRequest">
		<bean class="com.flower.docs.domain.search.SearchRequest">
			<property name="selectClause">
				<bean class="com.flower.docs.domain.search.SelectClause">
					<property name="fields">
						<list>
							<value>name</value>
							<value>classid</value>
							<value>creationDate</value>
							<value>lastUpdateDate</value>
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
									<property name="name" value="name" />
									<property name="type">
										<value type="com.flower.docs.domain.search.Types">STRING</value>
									</property>
									<property name="operator">
										<value type="com.flower.docs.domain.search.Operators">STARTS_WITH</value>
									</property>
									<property name="values">
										<list>
											<value>Agent</value>
										</list>
									</property>

								</bean>
							</list>
						</property>
					</bean>
				</list>
			</property>
		</bean>
	</property>
	<!-- Empty results message -->
	<property name="emptyResultsMessages">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN" />
				<property name="value" value="No agent document was found" />
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR" />
				<property name="value" value="Aucun dossier agent n'a été trouvé" />
			</bean>
		</list>
	</property>
</bean>

<!-- Criterion: EDS (string, contains) -->
<bean id="EDSCriterionPresenter" class="com.flower.docs.gui.client.search.criterion.FilterCriterionPresenter">
    <property name="model">
        <bean class="com.flower.docs.domain.search.Criterion">
            <property name="name" value="EDS" />
            <property name="type">
                <value type="com.flower.docs.domain.search.Types">STRING</value>
            </property>
            <property name="operator">
                <value type="com.flower.docs.domain.search.Operators">CONTAINS</value>
            </property>
        </bean>
    </property>
</bean>

<!-- Criterion: Matricule (string, starts with) -->
<bean id="MatriculeCriterionPresenter" class="com.flower.docs.gui.client.search.criterion.FilterCriterionPresenter">
    <property name="model">
        <bean class="com.flower.docs.domain.search.Criterion">
            <property name="name" value="Matricule" />
            <property name="type">
                <value type="com.flower.docs.domain.search.Types">STRING</value>
            </property>
            <property name="operator">
                <value type="com.flower.docs.domain.search.Operators">STARTS_WITH</value>
            </property>
        </bean>
    </property>
</bean>

<!-- Criterion: creationDate (timestamp, between) -->
<bean id="creationDateCriterion" class="com.flower.docs.gui.client.search.criterion.FilterCriterionPresenter">
	<property name="model">
		<bean class="com.flower.docs.domain.search.Criterion">
			<property name="name" value="creationDate" />
			<property name="type">
				<value type="com.flower.docs.domain.search.Types">TIMESTAMP</value>
			</property>
			<property name="operator">
				<value type="com.flower.docs.domain.search.Operators">BETWEEN</value>
			</property>
		</bean>
	</property>
</bean>
```
