---
title: Other
sidebar_position: 8
date: "2018-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 8501ad020ecbc8d1cdb67ae819632798406e069b1934a554a8fef26489271e54
---

## Link to a search form

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
