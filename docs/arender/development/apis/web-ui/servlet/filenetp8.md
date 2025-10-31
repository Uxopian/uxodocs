---
title: Servlet FileNet
---

## Mise à jour des métadonnées

La servlet *updateDocumentMetadataServlet* est dédiée à la mise à jour des métadonnées de document Filenet en utilisant un appel POST.

```text
Voici un exemple de l'appel POST, où *{documentId}* est à remplacer par le "documentId" du document ciblé :
```

```cfg
http://{HOST_ARENDER}/arendergwt/updateDocumentMetadataServlet?uuid={documentId}
```

Ensuite, le corps de la requête va accepter une structure JSON définissant chaque nom de métadonnée à modifier et la valeur associée. Les *propertyKey* correspondent aux propriétés *symbolicName* et *displayName* de Filenet. La *propertyValue* est la valeur que va prendre la métadonnée.

```json
{
	"propertyKey1": "propertyValue1",
	"propertyKey2": "propertyValue2"
}
```
```

