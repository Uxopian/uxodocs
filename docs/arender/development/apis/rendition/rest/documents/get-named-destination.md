---
title: Obtenir les destinations nommées (GET)
---

Cette API vous permet de récupérer les destinations nommées d'un document spécifique.

## Description de l'API


Endpoint :
```bash
GET /documents/{documentId}/destinations
```

Chemin de la ressource:

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |

Réponse :

| Type              | Description                                |
|:------------------|:-------------------------------------------|
| NamedDestinations | Liste des destinations nommées du document |

## Exemples

### Récupérer les destinations nommées

L'exemple suivant récupère les destinations nommées d'un document 
avec l'ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X GET 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/destinations' \
  -H 'accept: application/json'
```