---
title: GET version
---

Cette API vous permet de récupérer les versions d'ARender et des outils installés.

## Description technique de l'API

Point d'accès:
```bash
GET /version
```

Réponse :

| Type  | Description                          |
|:------|:-------------------------------------|
| JSON  | Les versions d'ARender et des outils |

## Exemples

### Récupérer les versions

```bash
curl -X 'GET' 'http://localhost:8761/version' -H 'accept: application/json'
```