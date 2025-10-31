---
title: Structure des documents
---

L'objet `document Layout` décrit la structure d'un document.

Une nouvelle servlet est déployée permettant d'afficher un fichier Json correspondant à la structure du document.

## Requête 

Cette fonctionnalité est accessible via la servlet : **documentLayout**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/documentLayout?uuid=doc1UUID'
```

## Réponse de la servlet

Le navigateur affiche la structure du document en langage Json.

Voici un exemple de fichier Json :  

``` json
{
    "type": "com.arondor.viewer.client.api.document.DocumentPageLayout",
    "documentId": {
        "id": "doc1UUID"
    },
    "documentTitle": "title.pdf",
    "mimeType": "application/pdf",
    "pageDimensionsList": [
        {
            "width": 720.0,
            "height": 405.0,
            "rotation": 0,
            "dpi": 0,
            "pageLayers": null
        },
        {
            "width": 720.0,
            "height": 405.0,
            "rotation": 0,
            "dpi": 0,
            "pageLayers": null
        },
        {
            "width": 720.0,
            "height": 405.0,
            "rotation": 0,
            "dpi": 0,
            "pageLayers": null
        },
    ]
}
```