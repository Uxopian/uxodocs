---
title: Obtenir un morceau de fichier (GET)
---

Cette API permet d'obtenir un morceau de fichier avec une plage de positions donnée.

## Description technique de l'API

Point de terminaison:
```bash
GET /documents/{documentId}/file/chunk
```

Chemin de la ressource:

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |


Paramètres de requête:

| Paramètre  | Requis | Description                                              |
|:-----------|:-------|:---------------------------------------------------------|
| format     | Non    | Le format du document dans lequel on récupère le morceau |

Ressource de l'en-tête:

| Variable | Requis | Description                                                                    |
|:---------|:-------|:-------------------------------------------------------------------------------|
| range    | Oui    | Valeur de la plage au format “bytes=x-y” avec x et y étant des nombres entiers |

## Exemples

### Obtenir tronçon

L'exemple ci-dessous permet d'obtenir un morceau pour un document
avec l'ID _b64_bm9yZS92SDMtMS0xMTh1735080237_ au format txt qui existe en rendition.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/file/chunk?format=txt' \
  -H 'accept: */*' \
  -H 'Range: bytes=0-10'
```