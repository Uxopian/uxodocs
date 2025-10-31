---
title: Obtenir les signets (GET)
---

Cette API vous permet de récupérer les signets d'un document spécifique.

## Description technique de l'API

Point d'accès :
```bash
GET /documents/{documentId}/bookmarks
```

Chemin de la ressource:

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |

Réponse :

| Type       | Description             |
|:-----------|:------------------------|
| Bookmarks  | Les signets du document |

## Exemples

### Obtenir les Bookmarks

L'exemple ci-dessous montre comment récupérer les signets 
d'un document avec l'ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/bookmarks' \
  -H 'accept: application/json'
```