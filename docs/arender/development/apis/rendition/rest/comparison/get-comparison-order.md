---
title: Récupérer un ordre de comparaison (GET)
---

Cette API permet de récupérer un ordre de comparaison précédemment demandé.

## Description technique de l’API

Point de terminaison :
```bash
GET /comparisons/<comparisonOrderId>
```

Chemin de ressource :

| Variable             | Type     | Requis  | Description                                                           |
| :------------------- |:---------|:--------|:----------------------------------------------------------------------|
| comparisonOrderId    | String   | oui     | L'id de l'ordre de comparaison à récupérer.                           |

Paramètre de requête :

| Variable             | Type     | Requis  | Description                                                           |
| :------------------- |:---------|:--------|:----------------------------------------------------------------------|
| timeoutMs            | String   | non     | Le temps d'attente maximum avant de recupérer l'ordre de comparaison. |

Réponse :

| Attribute             | Type                  | Description          |
| :-------------------- | :-------------------- |:---------------------|
| comparisonOder        | ComparisonOrder       | Ordre de comparaison |

## Exemples

### Récupérer un ordre de comparaison

L'appel ci-dessous génère une demande de récupération de l'ordre de comparaison avec l'id _123e4567-e89b-12d3-a456-426614174000_ et un temps d'attente de 6000 milliseconds.

```bash
curl -X 'GET' \
  'http://localhost:8761/comparisons/123e4567-e89b-12d3-a456-426614174000?timeoutMs=6000' \
  -H 'accept: */*'
```


Exemple de réponse :

```bash
{
  "comparisonOrderId": {
    "id": "string"
  },
  "currentState": "QUEUED",
  "errorMessage": "string",
  "fuzz": 0,
  "highlightColor": "string",
  "leftDocumentId": "string",
  "lowlightColor": "string",
  "processedDate": "2023-06-19T15:17:14.454Z",
  "processingTime": 0,
  "queuedDate": "2023-06-19T15:17:14.454Z",
  "queuedTime": 0,
  "rightDocumentId": "string",
  "targetDocumentId": "string"
}
```
