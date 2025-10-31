---
title: Récupérer un ordre de transformation (GET)
---

Cette API permet de récupérer un ordre de transformation précédemment demandé.

## Description technique de l'API

Point de terminaison :
```bash
GET /transformations/<transformationOrderId>
```

Chemin de ressource :

| Variable             | Description                       |
| :------------------- | :-------------------------------- |
| transformationOderId | L'ID d'un ordre de transformation |

Réponse :

| Attribut            | Type                | Description                                                               |
| :------------------ | :------------------ | :------------------------------------------------------------------------ |
| transformationOrder | TransformationOrder | Contient toutes les informations relatives au TransformationOrderId donné |

## Exemples

### Récupérer un ordre de transformation

L'appel ci-dessous génère une demande de récupération de l'ordre de transformation avec l'id _123e4567-e89b-12d3-a456-426614174000_.

```bash

curl -X 'GET' \
  'http://localhost:8761/transformations/123e4567-e89b-12d3-a456-426614174000' \
  -H 'accept: */*'
```
