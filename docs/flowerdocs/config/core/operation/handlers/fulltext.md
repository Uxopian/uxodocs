---
title: Content indexing
sidebar_position: 4
description: Index document content
date: "2009-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: ee3a8b7aa8797841da6b5c94c18b3efbe5bf346672095e8515d14eedbb4e547b
---

# Principle

This operation manager is used to index the content of text documents.
This processing is necessary to use full-text searches based on the `content` criterion.

This operation can be activated on the `CREATE` and `ADD_CONTENT` actions.

:::info
To manually define this operation handler, the `com.flower.docs.core.tsp.operation.fulltext.FullTextOperationHandler` identifier must be used as the value of the `OperationHandler` tag.
:::

# Using an external library

It is possible to call an external hook for indexing content using a library other than Tikka, which is the one used internally by FlowerDocs. To do this, you can add the URL of the external hook and the specific mime types on which it will be called.
<br/>
The external hook url can be built as follows : `http://{ip de la machine host}:{port}/{route}`, for example : http://25.42.62.95:3079/fullText/indexation.
:::info
The user token is automatically transmitted to this external hook : the prerequisite for using an external library is to have token authentication.
:::
