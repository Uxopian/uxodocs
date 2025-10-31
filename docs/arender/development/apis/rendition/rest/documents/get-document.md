---
title: Récupérer les métadonnées d'un document (GET)
---

Cette API permet de récupérer les métadonnées d'un document.

## Description technique de l'API

Point de terminaison :
```bash
GET /documents/{documentId}
```

Chemin de ressource :

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |

Réponse :

| Type                  | Description             |
|:----------------------|:------------------------|
| DFSDocumentAccessor   | L'accesseur du document |

## Exemples

### Récupérer un document

L'appel ci-dessous génère une demande de récupération des métadonnées du document avec l'id _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237' \
  -H 'accept: */*'
```
