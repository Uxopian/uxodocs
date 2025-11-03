---
title: "Component tracking"
date: "2002-04-28T13:20:01+02:00"
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