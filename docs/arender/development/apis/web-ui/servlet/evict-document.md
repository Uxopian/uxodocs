---
title: Supprimer les documents
---

Une nouvelle servlet est déployée permettant de supprimer un document du cache mémoire et du système de fichiers.

## Requête 

Cette fonctionnalité est accessible via la servlet : **evictDocument**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/evictDocument?uuid=doc1UUID'
```

## Réponse de la servlet

Si le document est évincé, une page blanche apparaît et le serveur n'a plus accès au document.