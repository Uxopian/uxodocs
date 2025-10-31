---
title: Vérifier un document (GET)
---

Cette API vous permet de vérifier l'existence d'un document spécifique.

## Description technique de l'API

Point d'entrée :
```bash
GET /documents/{documentId}/check
```

Chemin de la ressource:

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |

Réponse :

| Type       | Description                                   |
|:-----------|:----------------------------------------------|
| HttpStatus | Status HTTP indiquant l'existence du document |

## Exemples

### Vérifier un document

L'exemple ci-dessous montre comment vérifier l'existence d'un 
document avec l'identifiant _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/check' \
  -H 'accept: application/json'
```