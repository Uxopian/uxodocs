---
title: Détruire la session
---

Une nouvelle servlet est déployée permettant de détruire les informations de la session de l'utilisateur.

## Requête 

Cette fonctionnalité est accessible via la servlet : **destroySession**

La requête est utilisable avec n'importe quelle méthode HTTP.


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/destroySession'
```

## Réponse de la servlet

La session sera détruite dont les informations d'ARender suivantes : 
* user 
* userAgent
* versionUserAgent