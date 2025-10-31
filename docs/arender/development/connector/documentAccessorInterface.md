---
title: Interface de Document Accessor
---

## DocumentAccessorHasFileName

Si vous avez besoin de faire la distinction entre le titre du document et le nom de fichier au moment du téléchargement, il faudra implémenter
l'interface **com.arondor.viewer.rendition.api.document.DocumentAccessorHasFileName**.

```java
String getFileName();
```

L'implémentation de cette interface à votre documentAccessor vous permet au téléchargement que le nom de fichier ne soit pas le même que le titre du document.