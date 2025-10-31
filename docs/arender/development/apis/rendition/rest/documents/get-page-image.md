---
title: Obtenir l'image d'une page (GET)
---

Cette API vous permet d'obtenir l'image d'une page spécifique d'un document.

## Description technique de l'API

Point d'entrée :
```bash
GET /documents/{documentId}/pages/{page}/image
```

Chemin de la ressource:

| Variable    | Requis | Description                                                                                |
|:------------|:-------|:-------------------------------------------------------------------------------------------|
| documentId  | Oui    | L'ID de référence du document                                                              |
| page        | Oui    | L'index de la page dont vous souhaitez obtenir l'image                                     |


Paramètres de requête:

| Variable              | Requis | Description                                                                                |
|:----------------------|:-------|:-------------------------------------------------------------------------------------------|
| pageImageDescription  | Non    | La description de l'image de la page. Elle spécifie la largeur, la rotation et les filtres |


Réponse :

| Type   | Description                      |
|:-------|:---------------------------------|
| Image  | L'image de la page au format PNG |

## Exemples

### Obtenir l'image d'une page

L'exemple suivant montre comment récupérer l'image de la page 2 du document avec l'ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.
L'image a une largeur de 200 et une rotation de 90 degrés.
De plus, l'image a des filtres appliqués, notamment des ajustements de contraste et de luminosité, ainsi qu'une inversion.
```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/pages/2/image?pageImageDescription=IM_200_90_FILTERS~C~35~B~-100~I~50' \
  -H 'accept: */*'
```