---
title: Récupérer l'image d'une page
---

Une nouvelle servlet est déployée permettant de récupérer l'image d'une page.

## Requête 

Cette fonctionnalité est accessible via la servlet : **imageServlet**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/imageServlet?uuid=docUUID&pagePosition=page&desc=size'
```

* uuid : l'id du document
* pagePosition : la page du document
* desc : la taille de l'image en pixel

## Réponse de la servlet

Une image apparaît, elle correspond à la page du document passé en paramètre.