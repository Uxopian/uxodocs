---
title: ExceptionBuilder
description: Building a JAVA Exception with FlowerDocs identifiers
date: "2002-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 26c8cb360f0d4cb192d2a070eb8d9b1ca67f5c456a66acd21f4dd72059bdd6eb
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The builder can be used to create TechnicalException or FunctionalException with an error code.

You can pass it one or more parameters, including FlowerDocs identifiers, which will be formatted when the error message is returned.

<br/>
The following example shows how to create a TechnicalException with error code T00000 and a message indicating the problem :

<Tabs>
  <TabItem value="java" label="Java">

```Java
Id tagId = new Id("idMyTag");
	ExceptionBuilder.createTechnicalException(T00000, "Tag {} cannot have the value {}", tagId, "wrongValue", e);
```

  </TabItem>
</Tabs>

- With the builder : "Tag idMyTag cannot have the value wrongValue".
- Without the builder : "Tag [Id=(value="idMyTag")] cannot have the value wrongValue".
