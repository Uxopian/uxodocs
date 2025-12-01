---
title: Overview
description: Tag your components to find them more easily.
date: '2018-03-02T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 8021a5203127f233d194ec4c6a54b559580bd40cafff942eb8c6be610e133e04
---


 `tags` are metadata defined on a component to characterize it and make it easier to find. 

This metadata can be of different types to ensure consistency of the data stored in FlowerDocs.

<br/>
A `tag class` defines the typology and characteristics of a tag within a scope. 
This tag class applies to all tags associated with components, and is made up of the following elements: 

* `id`: technical tag identifier
* `displayNames`: tag display name (ex : Agency name, building no., etc.) internationalized
* `searchable`: Boolean to make the tag searchable or not  
* `Type`: tag id

|Type|Description|
|------|---------------------|
|`STRING`|[String](/concepts/tags/textuel.md) (e.g. reference, customer name ...)|
|`TEXT`|[Text field](/concepts/tags/textuel.md) (ex: comment ...)|
|`CHOICELIST`|[Choice list](/concepts/tags/liste.md) (e.g. type of document ...)|
|`ICON`|[Icon list](/concepts/tags/liste.md) (e.g. input channel ...)|
|`FREELIST`|[Choice list](/concepts/tags/liste.md) (e.g.: reference linked to an external IS ...)|
|`CONDITIONAL`|[Conditional value list](/concepts/tags/liste.md) (e.g.: list of departments according to direction ...)|
|`FLOAT`|[Decimal number](/concepts/tags/numerique.md) (e.g.: rate, proportion ...)|
|`INT`|[Integer](/concepts/tags/numerique.md) (e.g.: number of supporting documents ...)|
|`CURRENCY`|[Decimal number](/concepts/tags/numerique.md) limited to 2 decimal places (e.g.: amount ...)|
|`DATE`|[Date](/concepts/tags/date.md) (e.g. due date ...)|
|`BOOLEAN`|Check box (e.g.: medical confidentiality ...)|
|`USER`|Linked to a directory user (e.g. manager)|

:::note[Example]
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:TagClass xmlns="http://flower.com/docs/domain/common" xmlns:ns2="http://flower.com/docs/domain/tagclass"
	xmlns:ns3="http://flower.com/docs/domain/i18n">
	<id>Identifier</id>
	<ns2:displayNames language="EN">
		<ns3:value>Display name</ns3:value>
	</ns2:displayNames>
	<ns2:displayNames language="FR">
		<ns3:value>Display name</ns3:value>
	</ns2:displayNames>
	<ns2:data>
        <owner>owner</owner>
        <creationDate>2017-10-03 23:26:32.169 +0200</creationDate>
        <lastUpdateDate>2017-04-02 11:44:40.909 +0200</lastUpdateDate>
    </ns2:data>
	<ns2:type>TYPE</ns2:type>
    <ns2:searchable>true</ns2:searchable>
</ns2:TagClass>
```
:::


:::info
Add tags to your components by [referencing a tag class](/concepts/classes/tag-reference.md) at component class level.
:::

