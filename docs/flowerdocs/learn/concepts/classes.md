---
title: "Classes"
date: "2000-03-02"
---


# What is it for?

A class defines a type or family of objects. 
This notion facilitates the design of FlowerDocs-based solutions by defining a typology of objects that can be reused in a FlowerDocs scope.


# Tag classes

`Tags` are metadata that can be defined on a component. They can be used to characterize the product and find it more easily, thanks to filters on these tags.

<br/>
The tags that can be defined on a component are determined by the existing tag classes. This type of class ensures the consistency of data stored in FlowerDocs. Typically, the amount of an invoice `Amount` is a decimal number; each time this tag is used on a component, the value entered must be a decimal number.

<br/>
FlowerDocs offers several types of values for a tag: 


* [String](/concepts/tags/textuel.md) (e.g. reference, contractor) on which a validation mask (or pattern) can be defined
* [Decimal number](/concepts/tags/numerique.md) (e.g. amount, tax)
* [Integer](/concepts/tags/numerique.md) (e.g. Number of supporting documents)
* [Currency](/concepts/tags/numerique.md)
* Boolean (True/False)
* User
* [Date](/concepts/tags/date.md) (e.g. due date, effective date)
* [Choice list](/concepts/tags/liste.md) (e.g. invoice types)
* [Text field](/concepts/tags/textuel.md) (e.g. description, comment)
* [Conditional value list](/concepts/tags/liste.md)
* [Choice list](/concepts/tags/liste.md)



:::info
Add tags to your components by [referencing a tag class](/concepts/classes/tag-reference.md) at component class level.
:::



# Component classes

A component class defines the common characteristics of a logical set of components. These sets are characterized by [tags](/concepts/tags/overview.md) (or metadata), security, business or technical rules that are specific to them.   


This section defines the notion of component class, used to characterize the components (documents, folders, tasks, etc.) handled within the application.
In this way, every component refers to a class of components via its identifier.

<br/>
A component class defines a type of component: 

* tags that can be linked to a component
* the default security to be applied by defining an ACL identifier to be applied
* tag categories to visually group tags into functional blocks
* internationalized labels to provide a multilingual application
* technical nature


*Depending on the category of the component class, specifications can be added.*  


# Linking a tag to a component

When a tag is referenced on a component class, it can then be characterized with the following parameters: 

* Mandatory: indicates whether a value is mandatory for validation
* Technical: indicates whether the user has access to this tag 
* Read-only: indicates whether or not the user can modify the tag value
* Multivalued: indicates whether or not the tag can have several values
* Default value: the default value when the tag is not filled (variables can be used for dates, such as ``$`dayDate```)
* A validation mask (regular expression): if defined, overrides the one defined in the tag class
* Display order
* A description to display a tooltip




:::info
Add tags to your components by [referencing a tag class](/concepts/classes/tag-reference.md) at component class level.
<br/>
[ComponentClass](/concepts/classes/getting-started.md)      ---&rightarrow;      [TagReference](/concepts/classes/tag-reference.md)     ---&rightarrow;      [TagClass](/concepts/tags/overview.md)
:::
