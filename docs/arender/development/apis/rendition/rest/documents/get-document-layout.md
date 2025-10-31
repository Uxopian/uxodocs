---
title: Obtenir le layout du document (GET)
---

Cette API vous permet de récupérer les informations de layout (mise en page) d'un document.

## Description de l'API

Endpoint :
```bash
GET /documents/{documentId}/layout
```


Chemin de la ressource:

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |

Réponse :

| Type           | Description                            |
|:---------------|:---------------------------------------|
| DocumentLayout | Les informations du layout du document |

## Exemple

### Obtenir la mise en page du document

L'exemple suivant récupère les informations de layout d'un document avec 
l'ID du document spécifié.

```bash
curl -X GET 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/layout'
```

### Résultat

L'exemple suivant montre un DocumentLayout pour un PDF de deux pages.

```bash
{
  "type": "com.arondor.viewer.client.api.document.DocumentPageLayout",
  "documentId": {
    "id": "b64_N2U5MzY0MmQtYTQ4YS00MzBlLThiYWYtMjhhMjdlNGZlMDQz"
  },
  "documentTitle": null,
  "mimeType": "application/pdf",
  "pageDimensionsList": [
    {
      "width": 595,
      "height": 841,
      "rotation": 0,
      "dpi": 72,
      "pageLayers": null
    },
    {
      "width": 595,
      "height": 841,
      "rotation": 0,
      "dpi": 72,
      "pageLayers": null
    }
  ]
}
```