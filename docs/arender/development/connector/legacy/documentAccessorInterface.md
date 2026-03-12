---
title: Document Accessor interface
sidebar_position: 1
last_update:
  date: '2026-03-06T09:35:14.456Z'
  author: CI/CD Bot
content_hash: 911f4aba45e933b82dd0a0d04c5ad9ba93e3d7546aac3360a8f69b19f9d49e18
---

:::info Legacy Model
This page documents the legacy JAR-based connector model used with the GWT HMI frontend. For new integrations with the ReactJS frontend, see the [REST Connector](../rest-connector/architecture.md) documentation.
:::

## DocumentAccessorHasFileName

If you need to distinguish between document title and filename at download time, you will need to implement
the interface **com.arondor.viewer.rendition.api.document.DocumentAccessorHasFileName**.

```java
String getFileName();
```

Implementing this interface to your documentAccessor allows you to download the file with a filename different to the document title.
