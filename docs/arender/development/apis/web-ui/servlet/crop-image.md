---
title: Image d'une page rognée
---

Une servlet est déployée permettant d'obtenir une image qui correspond à une page rognée d'un document.

## Requête 

Cette fonctionnalité est accessible via la servlet : **cropImageServlet**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/cropImageServlet?uuid=docUUID&locale=langue&pagePosition=page&desc=size'
```

* uuid : l'id du document
* locale : le langage du texte
* pagePosition : la page du document
* desc : les paramètres pour rogner (taille, position, couleur etc)

## Réponse de la servlet

Une image est renvoyée correspondant à la page du document en paramètre, avec un texte descriptif expliquant comment sauvegarder l'image.