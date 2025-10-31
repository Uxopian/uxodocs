---
title: Obtenir les signatures (GET)
---

Cette API vous permet d'obtenir les signatures d'un document précédemment transmis.

## Description technique de l'API

Point d'entrée :
```bash
GET /documents/{documentId}/signatures
```


Chemin de la ressource:

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |

Réponse :

| Type         | Description                |
|:-------------|:---------------------------|
| Signatures   | Les signatures du document |

## Exemples

### Obtenir les signatures

L'appel ci-dessous génère une requête pour obtenir les signatures du document avec l'ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/signatures' \
  -H 'accept: */*'
```