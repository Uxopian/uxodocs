---
title: Rechercher du texte dans une page (GET)
---

Cette API vous permet de rechercher les positions du texte au sein d'une page spécifique d'un document.

## Description technique de l'API

Point d'entrée :
```bash
GET /documents/{documentId}/pages/{page}/text
```

Chemin de la ressource :

| Variable    | Requis | Description                                                                     |
|:------------|:-------|:--------------------------------------------------------------------------------|
| documentId  | Oui    | L'ID du document                                                                |
| page        | Oui    | L'index de la page dans laquelle vous souhaitez effectuer la recherche de texte |


Paramètres de requête:

| Variable         | Requis | Description                                                                     |
|:-----------------|:-------|:--------------------------------------------------------------------------------|
| searchText       | Oui    | Le texte à rechercher                                                           |
| caseSensitive    | Non    | Détermine si la recherche est sensible à la casse                               |
| accentSensitive  | Non    | Détermine si la recherche est sensible aux accents                              |
| regex            | Non    | Détermine si la valeur du paramètre 'searchText' est une expression régulière   |


Response :

| Type              | Description                                                               |
|:------------------|:--------------------------------------------------------------------------|
| PageSearchResult  | Le résultat de la recherche contenant les positions du texte dans la page |


## Exemples

### Rechercher du texte dans une page

L'exemple suivant montre comment rechercher le texte "exemple" dans la page 2 du document avec l'ID _b64_bm9yZS92SDMtMS0xMTh1735080237_. 
La recherche n'est pas sensible à la casse et aux accents.

```bash
curl -X 'GET' \
'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/pages/2/text?searchText=exemple&caseSensitive=false&accentSensitive=false&regex=false' \
-H 'accept: application/json'
```