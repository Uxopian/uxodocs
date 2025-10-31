---
title: Obtenir les conversions d'un document (GET)
---

Cette API permet d'obtenir les ids de conversion d'un document.

## Description technique de l'API

Point de terminaison:
```bash
GET /documents/{documentId}/conversions
```

Chemin de la ressource:

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |

## Exemples

### Obtenir les conversions

L'exemple ci-dessous permet d'obtenir les conversions d'un document
avec l'ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/conversions' \
  -H 'accept: */*'
```