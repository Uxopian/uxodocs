---
title: Télécharger les documents
---

Une nouvelle servlet est déployée permettant de télécharger les documents. 
Les documents peuvent être téléchargés au format source, en PDF ou en ZIP.

## Requête 

Cette fonctionnalité est accessible via la servlet : **downloadServlet**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/downloadServlet?uuid=docUUID&sourceId=source&title=TitreDocument&type=type'
```

* uuid : l'id du document
* sourceId : id initial du document (optionel). Utile si l'id du document est transformé
* title : titre du document téléchargé
* type : type de téléchargement :
    * INITIAL : type initial du document (sans les annotations)
    * RENDERED : type qui ne pourra pas subir de conversion (pdf, mp4, tiff)
    * COMPRESSED : type zip

## Réponse de la servlet

Le document envoyé en paramètre est téléchargé au format correspondant au paramètre `type`. Il va être renommé selon le paramètre `title`. 