---
title: Récupérer les annotations d'un document PDF (GET)
---

Cette API vous permet de récupérer les annotations d'un document spécifique.

## Description de l'API

Endpoint:
```bash
GET /documents/{documentId}/file/annotations
```

Chemin de la ressource:

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |

Réponse:

| Type        | Description                                                                          |
|:------------|:-------------------------------------------------------------------------------------|
| InputStream | Les annotations du document sous la forme d'un fichier dans le corps de la réponse   |

## Exemples

### Récupérer les annotations du document

L'exemple suivant récupère les annotations d'un document PDF avec l'ID 
_b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X GET 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/file/annotations' \
  -H 'accept: application/octet-stream'
```