---
title: Contexts
description: Configure indexing forms
date: "2001-03-28T13:20:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 25a34862d5040ad0b776eb3cf2e3e4f5cd0b343b0af8c4e10ed488f67968c342
---

To configure an indexing screen, you first need to identify the components for which you wish to apply the configuration. This identification is based on context.

<br/>
*These contexts will be used in the following sections to apply a particular configuration in a specific context.*

<br/>
By default, the following generic contexts are provided:

| Identifier                     | Description              |
| ------------------------------ | ------------------------ |
| `documentInsertContext`        | Create document          |
| `documentModifyContext`        | Modify document          |
| `documentReadOnlyContext`      | Read-only document       |
| `folderInsertContext`          | Create folder            |
| `folderModifyContext`          | Modify folder            |
| `folderReadOnlyContext`        | Read-only folder         |
| `virtualFolderInsertContext`   | Create virtual folder    |
| `virtualFolderModifyContext`   | Modify virtual folder    |
| `virtualFolderReadOnlyContext` | Read-only virtual folder |
| `taskInsertContext`            | Create task              |
| `taskModifyContext`            | Modify task              |
| `taskReadOnlyContext`          | Read-only task           |

To identify components more precisely, a context can be defined in terms of a component class. To do this, you need to define it manually using the `IdBasedContext` class, which allows you to define:

- component category
- component class
- phase

<br/>

The different phases available are as follows:

| Value      | Description                   |
| ---------- | ----------------------------- |
| `INSERT`   | Create component              |
| `MODIFY`   | Modify component              |
| `READONLY` | Open a component as read-only |

The different categories available are as follows:

| Value            | Description    |
| ---------------- | -------------- |
| `DOCUMENT`       | Document       |
| `FOLDER`         | Folder         |
| `VIRTUAL_FOLDER` | Virtual folder |
| `TASK`           | Task           |

** Example:** Defining a context used to configure the `IncomingMail` document creation screen.

```xml
<bean class="com.flower.docs.domain.componentclass.IdBasedContext">
	<property name="id">
		<bean class="com.flower.docs.domain.common.Id">
			<property name="value" value="CourrierEntrant" />
		</bean>
	</property>
	<property name="category">
		<value type="com.flower.docs.domain.component.Category">DOCUMENT</value>
	</property>
	<property name="phase">
		<value type="com.flower.docs.domain.componentclass.Phase">INSERT</value>
	</property>
</bean>
```
