---
title: Document Accessor interface
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: dce8863a6011a848e969548f3ad8e3761fb674c097e07d82a1c9b31378710190
---

## DocumentAccessorHasFileName

If you need to distinguish between document title and filename at download time, you will need to implement
the interface **com.arondor.viewer.rendition.api.document.DocumentAccessorHasFileName**.

```java
String getFileName();
```

Implementing this interface to your documentAccessor allows you to download the file with a filename different to the document title.
