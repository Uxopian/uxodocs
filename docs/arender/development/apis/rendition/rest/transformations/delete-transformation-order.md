---
title: Supprimer un ordre de transformation (DELETE)
---

Cette API permet de supprimer un ordre de transformation précédemment demandé.

## Description technique de l'API

Point de terminaison :
```bash
DELETE /transformations/<transformationOrderId>
```

Chemin de ressource :

| Variable             | Description                       |
| :------------------- | :-------------------------------- |
| transformationOderId | L'ID d'un ordre de transformation |

## Exemples

### Supprimer un ordre de transformation

L'appel ci-dessous génère une demande de suppression de l'ordre de transformation avec l'id _123e4567-e89b-12d3-a456-426614174000_.

```bash
curl -X 'DELETE' \
  'http://localhost:8761/transformations/123e4567-e89b-12d3-a456-426614174000' \
  -H 'accept: */*'
```
