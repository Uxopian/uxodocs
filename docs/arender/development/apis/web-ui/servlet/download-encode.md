---
title: Télécharger un document en fichier encodé en base64
---

Une nouvelle servlet est déployée permettant de télécharger un document encodé en base 64.

## Requête 

Cette fonctionnalité est accessible via la servlet : **downloadBase64EncodedDocument**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/downloadBase64EncodedDocument'
```

## Réponse de la servlet

Un document est téléchargé. Ce document est encodé en base 64. Il n'est pas possible de l'ouvrir s'il n'a pas été décodé.