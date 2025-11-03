---
title: "Date management"
date: "2009-03-28T13:20:01+02:00"
---



# Global configuration

Within the FlowerDocs GUI, several date formats can be defined: 

* In forms using the ``gui.date.form`` property
* In table columns using the ``gui.date.table`` property
* For technical information popups ``gui.date.technical``
* For other locations, use the ``gui.date.display`` property

For more information on the different formats supported, please consult [this](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html).


__Example:__ 

In a form, to obtain dates of the type 01/12/2016, the ``gui.date.form=dd/MM/yyyy`` property must be defined. This type of date makes it easier to enter dates manually without using the DatePicker object.


# Date format configuration by tag class or tag reference

In a ``Date`` tag class or a ``Date`` tag reference, it is possible to use a custom date format from [supported date formats](/concepts/tags/date.md). Format internationalization is managed by the application.