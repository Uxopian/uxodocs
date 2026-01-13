---
title: Document Accessor interface
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 66fc88278f7859f68bc9de1f5fa6e37e987e8d12ea24a81fc1d90c19be5540c0
---

## DocumentAccessorHasFileName

If you need to distinguish between document title and filename at download time, you will need to implement
the interface **com.arondor.viewer.rendition.api.document.DocumentAccessorHasFileName**.

```java
String getFileName();
```

Implementing this interface to your documentAccessor allows you to download the file with a filename different to the document title.
