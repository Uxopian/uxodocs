---
title: XFDF des annotations
---

## Télécharger les XFDF ou FDF

Une servlet est déployée permettant de télécharger le fichier XFDF ou FDF des annotations d'un document. 

### Requête 

Cette fonctionnalité est accessible via la servlet : **servletXFDFAnnotations**

La requête est utilisable en GET


#### Exemple d'utilisation

``` bash
curl -X GET 'http://<!-- Commentaire nettoyé -->/ARender/arendergwt/servletXFDFAnnotations?uuid=docUUID"
```

* uuid : l'id du document
* yourXFDF : le titre de votre fichier XFDF

Si le fichier ou les annotations sont au format FDF, ils seront chargés au format XFDF.

**Exemple de fichier XFDF**

``` xml
<?xml version="1.0" encoding="UTF-8"?>






```


### Réponse de la servlet

Le fichier XFDF des annotations du document envoyé en paramètre est chargé dans le document en paramètre.