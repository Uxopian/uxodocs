---
title: Chargement du schéma de mise en page du document (POST)
---

Cette API vous permet de charger les informations de mise en page d'un document.

## Description de l'API

Endpoint :

```bash
POST /documents/layout
```

Corps de la requête:

| Paramètre      | Description                            |
|:---------------|:---------------------------------------|
| documentLayout | Les informations du layout du document |

## Exemple

### Chargement du schéma de mise en page du document

L'exemple suivant illustre comment charger les informations 
de mise en page d'un document "document_layout.json".

```bash
curl -X 'POST' \
  'http://localhost:8761/documents/layout' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  --data-binary '@document_layout.json'
```