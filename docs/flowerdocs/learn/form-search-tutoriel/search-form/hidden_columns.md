---
title: Hidden columns
sidebar_position: 4
date: "2020-05-05T11:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: ceb875015d5bc96f0ff5c25ec5ac338a1c95ec6637808671144c72f2bf345790
---

<br/>

Add this XML block at the same level as the `hiddenRequest`. You can also hide certain results columns to make your search results more elegant:

<br/>

```xml
<property name="hiddenColumns">
	<list>
		<value>status</value>
		<value>classid</value>
	</list>
</property>

```

<br/>
