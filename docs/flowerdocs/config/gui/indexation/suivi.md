---
title: Component tracking
date: '2002-04-28T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: d546f8a9b7e2764e073dc4fe39548672bd9aab05206cd3d6f3a0ad1e52380f86
---


Component tracking allows you to view the various tasks linked to a component. This `task tracking` can be configured using the following XML fragment, by setting the desired category via the ``category`` property of a ``taskTrackingConfiguration`` bean.

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

__Note:__ *This configuration is global for a given scope.*
