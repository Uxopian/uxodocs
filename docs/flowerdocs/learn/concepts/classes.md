---
title: Classes
date: "2000-03-02"
last_update:
    date: "2025-12-02T14:29:22.460Z"
    author: CI/CD Bot
content_hash: 0b5dce5a6fc600a2bd01d5499ebec116ff28d40963be9256ae1b58f9f5d8fa24
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

- [String](/docs/flowerdocs/concepts/tags/textuel) (e.g. reference, contractor) on which a validation mask (or pattern) can be defined
- [Decimal number](/docs/flowerdocs/concepts/tags/numerique) (e.g. amount, tax)
- [Integer](/docs/flowerdocs/concepts/tags/numerique) (e.g. Number of supporting documents)
- [Currency](/docs/flowerdocs/concepts/tags/numerique)
- Boolean (True/False)
- User
- [Date](/docs/flowerdocs/concepts/tags/date) (e.g. due date, effective date)
- [Choice list](/docs/flowerdocs/concepts/tags/liste) (e.g. invoice types)
- [Text field](/docs/flowerdocs/concepts/tags/textuel) (e.g. description, comment)
- [Conditional value list](/docs/flowerdocs/concepts/tags/liste)
- [Choice list](/docs/flowerdocs/concepts/tags/liste)

:::info
Add tags to your components by [referencing a tag class](/docs/flowerdocs/concepts/classes/tag-reference) at component class level.
:::

# Component classes

A component class defines the common characteristics of a logical set of components. These sets are characterized by [tags](/docs/flowerdocs/concepts/tags/overview) (or metadata), security, business or technical rules that are specific to them.

This section defines the notion of component class, used to characterize the components (documents, folders, tasks, etc.) handled within the application.
In this way, every component refers to a class of components via its identifier.

<br/>
A component class defines a type of component:

- tags that can be linked to a component
- the default security to be applied by defining an ACL identifier to be applied
- tag categories to visually group tags into functional blocks
- internationalized labels to provide a multilingual application
- technical nature

_Depending on the category of the component class, specifications can be added._

# Linking a tag to a component

When a tag is referenced on a component class, it can then be characterized with the following parameters:

- Mandatory: indicates whether a value is mandatory for validation
- Technical: indicates whether the user has access to this tag
- Read-only: indicates whether or not the user can modify the tag value
- Multivalued: indicates whether or not the tag can have several values
- Default value: the default value when the tag is not filled (variables can be used for dates, such as ``$`dayDate```)
- A validation mask (regular expression): if defined, overrides the one defined in the tag class
- Display order
- A description to display a tooltip

:::info
Add tags to your components by [referencing a tag class](/docs/flowerdocs/concepts/classes/tag-reference) at component class level.
<br/>
[ComponentClass](/docs/flowerdocs/concepts/classes/getting-started) ---&rightarrow; [TagReference](/docs/flowerdocs/concepts/classes/tag-reference) ---&rightarrow; [TagClass](/docs/flowerdocs/concepts/tags/overview)
:::
