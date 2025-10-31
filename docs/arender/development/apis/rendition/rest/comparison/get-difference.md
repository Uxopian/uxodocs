---
title: Récupérer les différences (GET)
---

Cette API permet de demander une comparaison de texte et de récupérer un DocumentCompareResult.

## Description technique de l’API

Point de terminaison:
```bash
GET /difference
```

Paramètre de requête :

| Attribute             | Type                  | Required | Description                        |
| :-------------------- | :-------------------- | :------- |:-----------------------------------|
| leftDocumentId        | String                | oui      | Id du premier document à comparer. |
| rightDocumentId       | String                | oui      | Id du second document à comparer.  |

Réponse :

| Attribute             | Type                  | Description                                                   |
| :-------------------- | :-------------------- |:--------------------------------------------------------------|
| documentCompareResult | DocumentCompareResult | DocumentCompareResult contient le résultat de la comparaison. |

## Exemples

### Récupérer une différence

L'appel ci-dessous génère une demande de construction à partir de deux documents ayant pour ID :
- document ID de gauche = _123e4567-e89b-12d3-a456-426614174000_
- document ID de droite = _b64_bm9yZS92SDMtMS0xMTh1735080237_

```bash
curl -X 'GET' \
  'http://localhost:8761/difference?leftDocumentId=123e4567-e89b-12d3-a456-426614174000&rightDocumentId=b64_bm9yZS92SDMtMS0xMTh1735080237' \
  -H 'accept: */*' 
```

Exemple de réponse :

```bash
<!-- Commentaire nettoyé -->
      ],
      "left": {
        "clickableDestination": {
          "action": "string",
          "destination": "string",
          "position": {
            "h": 0,
            "w": 0,
            "x": 0,
            "y": 0
          }
        },
        "font": "string",
        "fontSize": 0,
        "individualWidths": [
          0
        ],
        "pageNumber": 0,
        "paragraphId": 0,
        "position": {
          "h": 0,
          "w": 0,
          "x": 0,
          "y": 0
        },
        "rightToLeftText": true,
        "startTime": 0,
        "text": "string"
      },
      "right": {
        "clickableDestination": {
          "action": "string",
          "destination": "string",
          "position": {
            "h": 0,
            "w": 0,
            "x": 0,
            "y": 0
          }
        },
        "font": "string",
        "fontSize": 0,
        "individualWidths": [
          0
        ],
        "pageNumber": 0,
        "paragraphId": 0,
        "position": {
          "h": 0,
          "w": 0,
          "x": 0,
          "y": 0
        },
        "rightToLeftText": true,
        "startTime": 0,
        "text": "string"
      }
    }
  ]
}
```