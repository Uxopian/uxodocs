---
title: Récupérer le contenu de la page d'un document
---

Une nouvelle servlet est déployée permettant d'obtenir un fichier Json avec le contenu d'une page d'un document.

## Requête 

Cette fonctionnalité est accessible via la servlet : **pageContent**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/pageContent?uuid=docuuid&pagePosition=numPage'
```

* uuid : l'id du document
* pagePosition : la page du document

## Réponse de la servlet

Un fichier Json est retourné avec les informations sur le contenu de la page passée en paramètre.

Voici un exemple de fichier Json : 
```json
<!-- Commentaire nettoyé -->,
      "text": "Features",
      "individualWidths": [
        15.070442,
        15.797394,
        15.601685,
        10.960312,
        15.76944,
        10.904404,
        15.797394,
        13.448761
      ],
      "fontSize": 27.0,
      "font": "BCDIEE+Oxygen bold",
      "paragraphId": 0,
      "rightToLeftText": false,
      "startTime": -1.0
    }
  ],
  "imageHyperlinkPositionList": []
}
```