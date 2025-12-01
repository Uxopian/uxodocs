---
title: Labels
date: '2009-03-29T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 6e4cd787541b657462d9406aee814a42fa930926dfab496a928238f44550b767
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



This section explains how to configure the FlowerDocs GUI labels. The application supports French and English natively.
These native labels can be defined using: 

* property files
* the JS API (see [documentation](/apis/jsapi/labels.md))

# Defining labels

The graphical user interface supports French and English natively. Native labels can be overwritten or new languages added.
Labels can be defined using property files located in a folder called `labels` in the configuration directory.

The property file containing the labels must be named such as `&lt;locale&gt;.properties` (for example `en.properties`).

<br/>
__Example:__ Overriding the Home tab label.

<Tabs>
  <TabItem value="fr-properties" label="fr.properties">

```properties
home=Tableau de bord
```

  </TabItem>
  <TabItem value="en-properties" label="en.properties">

```properties
home=Dashboard
```

  </TabItem>
</Tabs>


# Determining the locale

The user's locale is used to determine the language of the labels to be used. This locale is determined by the locale defined in the browser.
It can also be overridden by adding the `locale` parameter to the GUI URL (for example: https://www.demo.flowerdocs.cloud/flower-docs-gui?locale=EN).

When no label is defined for the user locale, English (`en`) is used by default.

<br/>
:::info
Labels can also be determined dynamically using the [JS API](/apis/jsapi/labels.md).
:::

