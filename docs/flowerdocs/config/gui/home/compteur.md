---
title: Counter
date: "2000-04-15T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: d81aeb46b0b7a475509e430658b10ee366ed93758431d3c795ca1e73fd754774
---

A counter displays the number of search results in a widget on the home page.

```xml
<bean id="myCounter" class="com.flower.docs.gui.client.home.SearchCountPresenter">
	<property name="header">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="EN" />
					<property name="value" value="New incidents" />
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="FR" />
					<property name="value" value="Nouveaux incidents" />
			</bean>
		</list>
	</property>
	<property name="title">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN" />
				<property name="value" value="Currently : " />
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR" />
				<property name="value" value="Actuellement : " />
			</bean>
		</list>
	</property>
	<property name="icon" value="cardCount-icon far fa-file-archive flat-red" />
	<property name="search">
		<bean class="com.flower.docs.domain.search.Search">
			<property name="category">
				<value type="com.flower.docs.domain.component.Category">TASK</value>
			</property>
			<property name="request">
				<bean class="com.flower.docs.domain.search.SearchRequest" />
			</property>
		</bean>
	</property>
</bean>
```
