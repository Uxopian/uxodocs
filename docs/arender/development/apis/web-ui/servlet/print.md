---
title: Imprimer
---

Une nouvelle servlet est déployée permettant d'imprimer les pages d'un document.
Une page HTML sera affichée pour confirmer l'impression avec les paramètres envoyés. 
Une pré-visualisation du résultat sera affiché sur cette page.

## Requête 

Cette fonctionnalité est accessible via la servlet : **printServlet**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/printServlet?uuid=docUUID&desc=description&pages=pages&imagePrintStyle=style'
```

* uuid : l'id du document
* desc : la description de l'image des pages à imprimer 
* pages : les numéros des pages à imprimer 
* imagePrintStyle : le style de l'image des pages à imprimer (optionnel)

## Réponse de la servlet

Une page HTML pour confirmer l'impression. Une pré-visualisation du résultat sera affichée sur cette page.