---
title: Éviction du document (DELETE)
---

Cette API vous permet de supprimer un document du système.

## Description de l'API

Endpoint :
```bash
GET /documents/<documentId>
```

Chemin de la ressource:

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |

## Exemple 

### Supprimer un document

L'exemple suivant permet de supprimer un document avec l'identifiant 
du document spécifié.

```bash
curl -X DELETE 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237'
```