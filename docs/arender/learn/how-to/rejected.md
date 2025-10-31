---
title: Image de document rejeté
---

Depuis la version 4.8.0, il est possible de configurer le serveur de rendition afin d'afficher une image indiquant que le document n'a pas pu être chargé correctement.

```xml
<!-- Commentaire nettoyé -->
```

## Activer la fonctionnalité

Pour activer la fonctionnalité, il va falloir faire une modification dans le fichier *application.properties* dans le microservice *document-service-broker*.


```cfg
rejected.document.enabled=true
```



## Modifier l'image par défaut

Pour modifier l'image par défaut, il va falloir faire une modification dans le fichier *application.properties* dans le microservice *document-service-broker*.


```cfg
rejected.document.path={chemin_vers_le_document_souhaité}
```


```xml
<!-- Commentaire nettoyé -->
```


## Modifier le titre du document

Pour modifier le titre du document, il va falloir faire une modification dans le fichier *application.properties* dans le microservice *document-service-broker*.


```cfg
rejected.document.title=Custom title
```


```xml
<!-- Commentaire nettoyé -->
```
