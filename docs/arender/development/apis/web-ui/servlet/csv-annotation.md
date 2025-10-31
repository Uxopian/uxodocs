---
title: Télécharger le CSV des annotations
---

Une nouvelle servlet est déployée permettant de télécharger le fichier CSV des annotations d'un document. 

## Requête 

Cette fonctionnalité est accessible via la servlet : **servletCSVAnnotations**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/servletCSVAnnotations?uuid=docUUID'
```


## Réponse de la servlet

Le fichier CSV des annotations du document envoyé en paramètre est téléchargé.