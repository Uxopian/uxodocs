---
title: Récupérer un ordre de conversion (GET)
---

Cette API permet de récupérer un ordre de conversion précédemment demandé.

## Description technique de l'API

Point de terminaison :
```bash
GET /conversions/<ConversionOrderId>
```

Chemin de ressource :

| Variable             | Description                    |
| :------------------- |:-------------------------------|
| conversionOderId     | L'ID d'un ordre de conversion. |

Réponse :

| Attribut              | Type                  | Description            |
| :-------------------- | :-------------------- |:-----------------------|
| conversionOrder       | ConversionOrder       | L'ordre de conversion. |

## Exemples

### Récupérer un ordre de conversion

L'appel ci-dessous génère une demande de récupération de l'ordre de conversion avec l'id _123e4567-e89b-12d3-a456-426614174000_.

```bash

curl -X 'GET' \
  'http://localhost:8761/conversions/123e4567-e89b-12d3-a456-426614174000' \
  -H 'accept: */*'
```

Exemple de réponse :
```bash
{
  "conversionOrderId": {
    "id": "string"
  },
  "currentState": "QUEUED",
  "documentId": "string",
  "errorMessage": "string",
  "format": "string",
  "processedDate": "2023-06-19T16:10:36.927Z",
  "processingTime": 0,
  "queuedDate": "2023-06-19T16:10:36.927Z",
  "queuedTime": 0
}
```