---
title: ExceptionBuilder
description: Building a JAVA Exception with FlowerDocs identifiers
date: '2002-03-28T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 6a0c619bcabf7bdd94b3d3dccdb3463cb67021b99e8ca9ffd6de8bb795349545
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



The  builder can be used to create TechnicalException or FunctionalException with an error code. 

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


* With the builder : "Tag idMyTag cannot have the value wrongValue".
* Without the builder : "Tag [Id=(value="idMyTag")] cannot have the value wrongValue".
