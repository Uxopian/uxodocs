---
title: Rechercher du texte dans un document (GET)
---

Cette API recherche des positions de texte dans une plage de pages spécifiée, renvoyant un objet contenant la position de texte trouvée, la dernière page recherchée avant l'expiration du processus (puisque le backend a une configuration de délai d'expiration définie) et l'état global de la recherche.

Disponible depuis la version 2023.12.0

## Description technique de l'API

Point d'entrée :
```bash
GET /documents/{documentId}/search
```

Chemin de la ressource :

| Variable    | Requis | Description                                                                     |
|:------------|:-------|:--------------------------------------------------------------------------------|
| documentId  | Oui    | L'ID du document                                                                |


Paramètres de requête:

| Variable         | Requis | Description                                                                     |
|:-----------------|:-------|:--------------------------------------------------------------------------------|
| searchText       | Oui    | Le texte à rechercher                                                           |
| fromPage         | Oui    | Numéro de la page de départ de la recherche. Index à partir de 0.                                           |
| toPage           | Non    | Numéro de la dernière page de la recherche. Si ce paramètre est défini sur -1, la recherche se poursuivra jusqu'à la dernière page du document. La valeur par défaut est -1. |
| caseSensitive    | Non    | Détermine si la recherche est sensible à la casse                               |
| accentSensitive  | Non    | Détermine si la recherche est sensible aux accents                              |
| regex            | Non    | Détermine si la valeur du paramètre 'searchText' est une expression régulière   |


Response :

| Type                    | Description                                                                                                            |
|:------------------------|:-----------------------------------------------------------------------------------------------------------------------|
| MultiPagesSearchResult  | Le résultat de la recherche contenant les positions du texte trouvé dans le document entre la plage de page renseignée |


## Exemples

### Rechercher du texte dans une page

L'exemple suivant montre comment rechercher le texte "exemple" à partir de la page 2 jusqu'à la page 5 du document avec l'ID _b64_bm9yZS92SDMtMS0xMTh1735080237_. 
La recherche n'est pas sensible à la casse et aux accents.

```bash
curl -X 'GET' \
'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/pages/2/text?searchText=exemple&caseSensitive=false&accentSensitive=false&regex=false' \
-H 'accept: application/json'
```