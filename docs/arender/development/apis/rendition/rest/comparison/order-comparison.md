---
title: Demander un ordre de compraison (POST)
---

Cette API permet de demander un ordre de comparaison et de récupérer un ComparisonOrderId.

## Description technique de l’API

Point de terminaison :
```bash
POST /comparisons
```

Corps :

| Attribute             | Type                  | Required | Description                                                                                   |
| :-------------------- | :-------------------- | :------- |:----------------------------------------------------------------------------------------------|
| leftDocumentId        | String                | oui      | Id du premier document à comparer.                                                            |
| rightDocumentId       | String                | oui      | Id du second document à comparer.                                                             |
| fuzz                  | String                | non      | Détermine la précision de la comparaison. La valeur doit être entre 0 et 100.                 |
| highlightColor        | String                | non      | Couleur de surlignage des différences. La valeur doit être hexadécimal sans le caractère '#'. |
| lowlightColor         | String                | non      | Couleur de surlignage des similarités. La valeur doit être hexadécimal sans le caractère '#'. |

Réponse :

| Attribute             | Type                  | Description                                                                                                                                                                        |
| :-------------------- | :-------------------- |:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| comparisonOrderId     | ComparisonOrderId     | Id d'ordre de comparaison.Il servira pour l'utilisation des autres API qui permettent par exemple d'avoir des informations sur l'ordre de comparaison ou bien de la supprimer. |

## Exemples

### Demander un ordre de comparaison

L'appel ci-dessous génère une demande de comparaison de deux documents déjà connus de la rendition.

```bash
curl -X 'POST' \
  'http://localhost:8761/comparisons' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
      "fuzz": 0,
      "highlightColor": "ff0000"",
      "leftDocumentId": "docId1",
      "lowlightColor": "ffffff",
      "rightDocumentId": "docId2"
}'
```