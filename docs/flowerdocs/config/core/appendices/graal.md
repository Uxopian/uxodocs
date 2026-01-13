---
title: Graal
description: JavaScript engine included in FlowerDocs Core.
date: "2002-03-28T13:20:01+02:00"
custom_edit_url: null
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 2f67714270d34548148923661621bc8b1ba7716ebff204b9202fd2bb3e55f9bc
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Principle

The [Graal](https://www.graalvm.org/latest/reference-manual/js/) engine is used to execute scripts within the JVM. JavaScript syntax and Java classes loaded into the JVM can be used to add specific logic to a process.

No additional Javascript module is provided.

## Instantiate an object

In order to instantiate an object or call a static method of a Java class, the full class name must be specified or a reference to the class must be obtained.

<Tabs>
  <TabItem value="complete-name" label="Complete name">

```java
var document = new com.flower.docs.domain.document.Document();
```

  </TabItem>
  <TabItem value="reference" label="Reference">

```java
var Document = com.flower.docs.domain.document.Document;
var document = new Document();
```

  </TabItem>
</Tabs>

To facilitate the development of scripts using the objects provided by FlowerDocs, certain classes can be directly named without using their full name or a reference.

## Restrictions

For security reasons, a specific class loader is used to execute the scripts in the JVM. Access to certain classes is therefore restricted. This can be disabled using the `secured.classloader.enabled=false` property. If required, certain classes or packages can be defined as secured using the `secured.classloader.whitelist.additional` property.
