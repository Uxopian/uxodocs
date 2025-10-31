---
title: Imprimer les pages
---

Une nouvelle servlet est déployée permettant d'imprimer les pages d'un document.
Un fichier HTML est affiché avec les différentes pages du document envoyées en paramètre.

## Requête 

Cette fonctionnalité est accessible via la servlet : **printPage**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/printPage?uuid=docUUID&nbPages=nbPages&renditionPrintWidth=width&browserPrintWidth=width&page=pages'
```

* uuid : l'id du document
* nbPages : le nombre de pages à imprimer
* renditionPrintWidth : la taille de l'image dans la rendition
* browserPrintWidth : la taille de l'image affichée dans le navigateur 
* pages : les numéros des pages à imprimer

## Réponse de la servlet

Un fichier HTML avec les différentes pages à imprimer.