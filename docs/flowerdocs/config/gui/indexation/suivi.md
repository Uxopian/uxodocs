---
title: Component tracking
sidebar_position: 4
date: "2002-04-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: b506b187595ad42651149c82f1256534410223bdd89067b97e462bfac340ab76
---

Component tracking allows you to view the various tasks linked to a component. This `task tracking` can be configured using the following XML fragment, by setting the desired category via the `category` property of a `taskTrackingConfiguration` bean.

<br/>
__Example:__ Keeping track of related documents

```xml
<bean id="taskTrackingConfiguration"
class="com.flower.docs.gui.client.task.tracking.TaskTrackingConfiguration">
	<property name="category">
		<value type="com.flower.docs.domain.component.Category">DOCUMENT</value>
	</property>
	<property name="title">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR" />
				<property name="value" value="Suivi des copies" />
			</bean>
		</list>
	</property>
</bean>
```

**Note:** _This configuration is global for a given scope._
