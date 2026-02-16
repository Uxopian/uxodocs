---
title: List
sidebar_position: 3
description: Use tags linked to lists.
date: "2018-03-07T13:21:01+02:00"
last_update:
  date: '2026-01-29T08:27:50.243Z'
  author: CI/CD Bot
content_hash: e89db8c2e121eaac51f03580363caa65e0d9e0751feea3c3819288d5ad260c15
---

This section describes the different types of list-based tags:

- Choice list `CHOICELIST`
- Icon list `ICON`
- Free list `FREELIST`

For performance reasons, we do not recommend the use of choice lists or icon lists with more than 1000 values.

For integration with larger volumes, please contact the FlowerDocs team.

Also, FlowerDocs only displays a maximum of 100 items in the list, even if it contains more.
Simply refine the selection to display items not displayed by default.

# List of choices

A choice list tag allows you to restrict the possible values of a tag to defined choices.

:::note[Example]

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:TagClass xmlns="http://flower.com/docs/domain/common" xmlns:ns2="http://flower.com/docs/domain/tagclass"
	xmlns:ns3="http://flower.com/docs/domain/i18n">
	<id>TypeCourrier</id>
	<ns2:type>CHOICELIST</ns2:type>
	<ns2:allowedValues symbolicName="FactureClient">
		<ns2:displayNames language="FR">
			<ns3:value>Customer invoice</ns3:value>
		</ns2:displayNames>
	</ns2:allowedValues>
	<ns2:allowedValues symbolicName="BonDeCommande">
		<ns2:displayNames language="FR">
			<ns3:value>Order form</ns3:value>
		</ns2:displayNames>
	</ns2:allowedValues>
</ns2:TagClass>
```

:::

# Icon list

An icon list tag is an extension of a list of choices for which an icon can be defined.

This icon must be defined with the appropriate CSS class using the library available in FlowerDocs [Font Awesome 6.5.2](https://fontawesome.com/icons?d=gallery&m=free)

:::note[Example]

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:TagClass xmlns="http://flower.com/docs/domain/common" xmlns:ns2="http://flower.com/docs/domain/tagclass"
	xmlns:ns3="http://flower.com/docs/domain/i18n">
	<id>Priority</id>
	<ns2:type>ICON</ns2:type>
	<ns2:allowedValues symbolicName="1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:type="AllowedValueWithIcon">
		<ns2:icon>fa fa-flag black</ns2:icon>
		<ns2:displayNames language="FR">
			<ns3:value>Critique</ns3:value>
		</ns2:displayNames>
	</ns2:allowedValues>
</ns2:TagClass>
```

:::

If two icons are to be placed side by side, an icon of the following type can be used: `stacked(fas fa-exclamation red,fas fa-flag red)`.

# Free list

A free list tag is an extension of a choice list without validation. This type of list can be used to value a tag with values that are not known to FlowerDocs.

:::note[Example]

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:TagClass xmlns="http://flower.com/docs/domain/common" xmlns:ns2="http://flower.com/docs/domain/tagclass"
	xmlns:ns3="http://flower.com/docs/domain/i18n">
	<id>ReferenceClient</id>
	<ns2:type>FREELIST</ns2:type>
</ns2:TagClass>
```

:::

:::info
This type of tag is particularly well suited to integration with third-party repositories (for example, using a [lookup](/docs/flowerdocs/apis/jsapi/lookup).
:::
