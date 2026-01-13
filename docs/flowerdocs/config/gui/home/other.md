---
title: Other
date: "2018-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 697e8b5f2ddb7e66ea640144c9f908ce73673bd524dd0fb99e29dbd31d56c508
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
