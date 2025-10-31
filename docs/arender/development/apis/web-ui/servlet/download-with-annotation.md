---
title: Télécharger les documents avec annotations
---

Une nouvelle servlet est déployée permettant de télécharger les documents en PDF avec les annotations.

## Requête 

Cette fonctionnalité est accessible via la servlet : **downloadDocumentWithAnnotations**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/downloadDocumentWithAnnotations?operationName=renderAnnotations'
```

Le paramètre *operationName* peut prendre plusieurs valeurs : 
* renderAnnotations : le document final sera un PDF avec les annotations appliquées sur le PDF
* renderFDFAnnotations : le document final sera un PDF avec les annotations créées en modèle sur le PDF donc modifiables.

## Réponse de la servlet

Un document est téléchargé en format PDF avec les annotations.
