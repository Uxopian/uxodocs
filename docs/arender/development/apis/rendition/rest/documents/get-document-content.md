---
title: Obtenir le contenu d'un document (GET)
---

Cette API vous permet de récupérer le contenu d'un document dans un format spécifique
demandé, au format original dans le cas contraire.

## Description de l'API

Endpoint :
```bash
GET /documents/{documentId}/file
```

Chemin de la ressource:

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |


Paramètres de requête:

| Parameter | Requis | Description                     |
|:----------|:-------|:--------------------------------|
| format    | Non    | Le format de sortie du document |


Réponse :

| Type                | Description                                |
|:--------------------|:-------------------------------------------|
| HttpServletResponse | Le contenu du document en tant que fichier |

## Exemple

### Obtenir le contenu d'un document

L'exemple suivant récupère le contenu d'un document avec l'ID du document spécifié dans le format PDF.
Le paramètre -o permet de sauvegarder le résultat dans un fichier de sorti.

```bash
curl -X GET 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/file?format=pdf' -o document.pdf
```


