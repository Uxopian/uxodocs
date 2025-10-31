---
title: Récupérer tous les ordres de transformation (GET)
---

Cette API permet de récupérer tous les ordres de transformation.

## Description technique de l'API

Point de terminaison :
```bash
GET /transformations
```

Réponse :

| Attribut             | Type                      | Description                          |
| :------------------- | :------------------------ | :----------------------------------- |
| transformationOrders | `List&lt;TransformationOrder&gt;` | La liste des ordre de transformation |

## Exemples

### Récupérer tous les ordres de transformation

L'appel ci-dessous génère une demande de récupération des ordres de transformation.

```bash
curl -X 'GET' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*'
```
