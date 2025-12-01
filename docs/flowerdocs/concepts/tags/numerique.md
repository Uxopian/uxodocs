---
title: Digital
description: Use digital tags.
date: '2018-03-07T13:23:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 45851e1863a2be1e36bea3538aa436ec4ecc369eaef8a17d3fe8cdcb3728d69a
---


The FlowerDocs data model allows you to define three types of digital tags: 

* integers `INT`
* decimal numbers `FLOAT`
* amounts `CURRENCY`


# Integer

This type is used to enter an integer number.

:::note[Example]
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns2:TagClass xmlns="http://flower.com/docs/domain/common" xmlns:ns2="http://flower.com/docs/domain/tagclass"
	xmlns:ns3="http://flower.com/docs/domain/i18n">
	<id>NumberDocument</id>
    <ns2:type>INT</ns2:type>
</ns2:TagClass>
```
:::


# Decimal

This type is used to enter a decimal number.

:::note[Example]
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns2:TagClass xmlns="http://flower.com/docs/domain/common" xmlns:ns2="http://flower.com/docs/domain/tagclass"
	xmlns:ns3="http://flower.com/docs/domain/i18n">
	<id>RateResa</id>
    <ns2:type>FLOAT</ns2:type>
</ns2:TagClass>
```
:::


# Amount

This type allows you to enter a decimal number with only 2 decimals stored and displayed.

:::note[Example]
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns2:TagClass xmlns="http://flower.com/docs/domain/common" xmlns:ns2="http://flower.com/docs/domain/tagclass"
	xmlns:ns3="http://flower.com/docs/domain/i18n">
	<id>AmountTTC</id>
    <ns2:type>CURRENCY</ns2:type>
</ns2:TagClass>
```
:::
