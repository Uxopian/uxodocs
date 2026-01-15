---
title: Digital
description: Use digital tags.
date: "2018-03-07T13:23:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: c99baf0f23abfb7e4a65ca8805dea6b55aa415cf22f942f128a034252f8fa1ac
---

The FlowerDocs data model allows you to define three types of digital tags:

- integers `INT`
- decimal numbers `FLOAT`
- amounts `CURRENCY`

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
