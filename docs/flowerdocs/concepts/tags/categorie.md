---
title: Categories
description: Organize tags by category.
date: "2018-04-07T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: b114d5b27a26540d727e6a1abe31a6a8f69dba0cb0ba0a72f51fd478a8fcb535
---

Tag categories enable logically related tags to be grouped together for display.

<br/>
Each tag category defines:

- `id`: category identifier
- `displayNames`: internationalized labels
- `tags`: tags contained in the category
- `icon` : icon based on FontAwesome fond (example : `fas fa-star`)
- `description`: description to be displayed to the user
- `reduced`: indicates whether the category is folded by default

To be displayed, a category must be linked to a component class.

:::info
Tags defined in a category and not referenced at component class level are not displayed on the indexing form.
:::

:::note[Example]

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns3:TagCategory icon="flower-button header-icon fa fa-envelope flat-purple"
	description="Fill in the fold identification information" visible="true" inline="false" reduced="false"
	xmlns="http://flower.com/docs/domain/common" xmlns:ns2="http://flower.com/docs/domain/i18n"
	xmlns:ns3="http://flower.com/docs/domain/componentclass">
	<id>MailInfo</id>
	<ns3:displayNames language="FR">
		<ns2:value>Mail information</ns2:value>
	</ns3:displayNames>
	<ns3:displayNames language="EN">
		<ns2:value></ns2:value>
	</ns3:displayNames>
	<ns3:tags>MailDate</ns3:tags>
	<ns3:tags>SubjectMail</ns3:tags>
</ns3:TagCategory>
```

:::
