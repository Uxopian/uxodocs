---
title: Other
date: "2018-03-28T13:20:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: a7f49bbd609965041e67fdce0972a5db02dea8699e8e2fc3b496539feba370fb
---

# Link to a search form

Search-based widgets can be coupled with a search form.
So by clicking on the widget title, the user will be redirected to the search form defined with pre-filled criteria if they are displayed or authorized.

To define the search form to be opened, it is necessary to add the following property to the search bean:

```xml
<property name="id">
	<bean class="com.flower.docs.domain.common.Id">
		<property name="value" value="AgentSearch" />
	</bean>
</property>
```
