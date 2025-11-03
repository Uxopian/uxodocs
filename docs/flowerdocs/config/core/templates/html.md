---
title: "HTML templates"
description: "Reusable templates, by scope, that can be enhanced with variables"
date: "2020-02-01"
custom_edit_url: null
---


# Principle

An HTML template is a document with an HTML file. This file is used by the [Thymeleaf] template engine (https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html) to generate a new HTML file from a set of variables (or context).
It allows you to generate documents based on the same template, using HTML.

:::info
Use these HTML templates to: 

* Add [private or public pages](/config/core/pages.md)
:::


# Syntax

*This section does not cover all the possibilities offered by the [Thymeleaf] engine (https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html)#using-texts) but is intended to provide an initial overview.*

## Texts

The `th:text` attribute defines the textual value of an HTML tag. It can thus be used with a context variable to display its value: 

```xml
<span th:text="${customerName}">Mrs. Murielle Palutat</span>
```
When the HTML file is generated, the text of the `span` tag is replaced by that of the context variable. It is advisable to define a default text in this type of tag to facilitate rendering previews.

With the `th:text` attribute, the generated text is escaped. If variables contain HTML (e.g. for hypertext links), it is necessary to use the `th:utext` attribute, which does not escape the generated text.

## Conditions

The `th:if` attribute conditions the addition of the tag to which it is added. This attribute can be used, for example, to define conditional text blocks: 

```xml
<p th:if="${customerAge > 18}">...</p>
```

# Configuration

These templates can be defined directly from the admin console in the `Templates > HTML` section.
They are stored as `Template` class technical documents with the `TemplateType` tag whose value is `HTML`.

:::info
The possibilities for providing variables differ according to the use of templates. See the appropriate documentation for details.
:::
