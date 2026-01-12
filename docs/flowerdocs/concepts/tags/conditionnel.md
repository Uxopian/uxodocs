---
title: Conditional
description: Condition the lists associated with your tags according to context.
date: "2018-03-07T13:22:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 9ebfc35430c217db2043e1f234bc6734caf960a21c98020d91899ea599eb151a
---

The `CONDITIONAL` type is used to define conditions on the various choices (or sets of choices) offered to the user in indexing or search forms.

Objects [`com.flower.docs.domain.tagclass.ConditionalAllowedValue`](#javadoc-com-flower-docs-domain-tagclass-ConditionalAllowedValue) supporting multiple conditions can be defined for a given choice. In this case, all that's needed is for one condition to be satisfied for the user to be offered a choice.

# Tag conditions

Conditions can relate to the tags of a component or a search form. _They consist of an identifier, an operator and a value._

To identify the tag to which the condition applies, you need to use a character string of the type `${tags.&lt;tag_id&gt;}` where `&lt;tag_id&gt;` is the tag identifier.

For tags, the operators `==` or `!=` can be used to indicate the presence or non-presence of a value, respectively.

Typically, the different types of conditions supported for tags are as follows:

- `${tags.&lt;tag_id&gt;}==X`: Existing tag containing (at least) the value _X_
- `${tags.&lt;tag_id&gt;}!=X`: Tag does not exist or does not contain the value indicated by _X_

:::info
These conditions apply only to tags displayed in the indexing or search form.
:::

`CONDITIONAL` tags are not used in multivalued mode, otherwise the conditions for each value cancel each other out.

Please note that a conditional tag can only be defined on two levels.
Only the first level includes `ConditionalAllowedValue` tags, the lower level only includes `allowedValues` tags.
In addition, the symbolicName of each `allowedValues` tag must be unique.

:::note[Example]

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<TagClass xmlns="http://flower.com/docs/domain/tagclass" xmlns:ns4="http://flower.com/docs/domain/i18n">

	<id>B_ServiceDestinataire</id>
	<ns2:type>CONDITIONAL</ns2:type>
    <ns2:allowedValues xsi:type="ns2:ConditionalAllowedValue" symbolicName="SERVICE" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	    <ns2:allowedValues symbolicName="NA">
	        <ns2:displayNames language="EN">
	            <ns3:value>--Undefined department--</ns3:value>
	        </ns2:displayNames>
	        <ns2:displayNames language="FR">
	            <ns3:value>--Service indéfini--</ns3:value>
	        </ns2:displayNames>
	    </ns2:allowedValues>
	    <ns2:allowedValues symbolicName="ERROR">
	        <ns2:displayNames language="EN">
	            <ns3:value>Error</ns3:value>
	        </ns2:displayNames>
	        <ns2:displayNames language="FR">
	            <ns3:value>Error</ns3:value>
	        </ns2:displayNames>
	    </ns2:allowedValues>
	    <ns2:conditions>${tags.B_DirectionDestinataire}==00NA</ns2:conditions>
    </ns2:allowedValues>

</TagClass>
```

:::
