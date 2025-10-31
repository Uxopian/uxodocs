---
title: Supprimer un ordre de conversion (DELETE)
---

Cette API permet de supprimer un ordre de conversion précédemment demandé.

## Description technique de l'API

Point de terminaison :
```bash
DELETE /conversions/<ConversionOrderId>
```

Chemin de ressource :

| Variable             | Description                                |
| :------------------- |:-------------------------------------------|
| conversionOderId     | L'ID d'un ordre de conversion à supprimer. |

## Exemples

### Supprimer un ordre de conversion

L'appel ci-dessous génère une demande de suppression de l'ordre de conversion avec l'id _123e4567-e89b-12d3-a456-426614174000_.

```bash
curl -X 'DELETE' \
  'http://localhost:8761/conversions/123e4567-e89b-12d3-a456-426614174000' \
  -H 'accept: */*'
```
