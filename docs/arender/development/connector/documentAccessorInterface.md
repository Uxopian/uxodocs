---
title: "Document Accessor interface"
---







## DocumentAccessorHasFileName

If you need to distinguish between document title and filename at download time, you will need to implement
the interface **com.arondor.viewer.rendition.api.document.DocumentAccessorHasFileName**.

```java
String getFileName();
```

Implementing this interface to your documentAccessor allows you to download the file with a filename different to the document title.