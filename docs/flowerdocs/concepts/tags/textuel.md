---
title: Textual
description: Use textual tags.
date: '2018-03-07T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: a85b7d07620e3cb863c82715b611a9d41ef47156f45104dba50fadcf6c9f4c2f
---


The FlowerDocs data model allows you to define textual tags: 

* character strings `STRING`
* text fields `TEXT`


# Character strings

This type allows free input of a character string.
With this type of tag, you can add a regular expression to the `pattern` attribute to validate the user's input.

:::note[Example]
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns2:TagClass xmlns="http://flower.com/docs/domain/common" xmlns:ns2="http://flower.com/docs/domain/tagclass"
	xmlns:ns3="http://flower.com/docs/domain/i18n">
	<id>CustomerName</id>
    <ns2:type>STRING</ns2:type>
    <ns2:pattern>[A-Z]*</ns2:pattern>
</ns2:TagClass>
```
:::


# Text

This type allows free input in a text zone.

:::note[Example]
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns2:TagClass xmlns="http://flower.com/docs/domain/common" xmlns:ns2="http://flower.com/docs/domain/tagclass"
	xmlns:ns3="http://flower.com/docs/domain/i18n">
	<id>Comment</id>
    <ns2:type>TEXT</ns2:type>
</ns2:TagClass>
```
:::
