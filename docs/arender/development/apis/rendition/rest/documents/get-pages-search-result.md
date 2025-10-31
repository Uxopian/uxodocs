---
title: Obtenir les résultats de recherche des pages (GET)
---

Cette API vous permet d'obtenir les résultats de recherche des pages d'un document spécifique.

## Description technique de l'API

Point d'entrée :
```bash
GET /documents/{documentId}/pages
```

Chemin de la ressource:

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |


Paramètres de requête:

| Variable        | Requis | Description                                                                   |
|:----------------|:-------|:------------------------------------------------------------------------------|
| searchText      | Oui    | Le texte à rechercher                                                         |
| accentSensitive | Non    | Détermine si la recherche est sensible aux accents                            |
| caseSensitive   | Non    | Détermine si la recherche est sensible à la casse                             |
| regex           | Non    | Détermine si la valeur du paramètre 'searchText' est une expression régulière |



Réponse :

| Type               | Description                                         |
|:-------------------|:----------------------------------------------------|
| PagesSearchResult  | Les résultats de recherche des pages au format JSON |

## Exemples

### Obtenir les résultats de recherche des pages

L'appel suivant génère une requête pour obtenir les résultats de recherche
pour le document avec l'ID b64_bm9yZS92SDMtMS0xMTh1735080237. 
La recherche est effectuée pour le texte "exemple" 
avec une sensibilité à la casse activée.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/pages?searchText=exemple&caseSensitive=true' \
  -H 'accept: application/json'
```