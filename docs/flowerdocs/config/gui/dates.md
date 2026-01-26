---
title: Date management
sidebar_position: 12
date: "2009-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: d5234d1833165ee9df37ca9b394e6e65e5d2869b7ae14d2a4c919f25df8a4d1a
---

# Global configuration

Within the FlowerDocs GUI, several date formats can be defined:

- In forms using the `gui.date.form` property
- In table columns using the `gui.date.table` property
- For technical information popups `gui.date.technical`
- For other locations, use the `gui.date.display` property

For more information on the different formats supported, please consult [this](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html).

**Example:**

In a form, to obtain dates of the type 01/12/2016, the `gui.date.form=dd/MM/yyyy` property must be defined. This type of date makes it easier to enter dates manually without using the DatePicker object.

# Date format configuration by tag class or tag reference

In a `Date` tag class or a `Date` tag reference, it is possible to use a custom date format from [supported date formats](/docs/flowerdocs/concepts/tags/date). Format internationalization is managed by the application.
