---
title: Demander un ordre de conversion (POST)
---

Cette API permet de demander un ordre de conversion pour créer un nouveau document dans un format attendu

## Description technique de l'API

Point de terminaison :
```bash
POST /conversions
```

Corps :

| Attribut              | Type                  | Requis | Description                      |
| :-------------------- | :-------------------- | :----- |:---------------------------------|
| documentId            | String                | oui    | L'id du document source.         |
| format                | String                | oui    | Le format du document en sortie. |

Réponse :

| Attribut              | Type                  | Description                                                                                                                                                                            |
| :-------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| conversionOrderId     | ConversionOrderId     | L'ID de l'ordre de conversion.Il servira pour l'utilisation des autres API qui permettent par exemple d'avoir des informations sur l'ordre de conversion ou bien de la supprimer.  |

## Exemples

### Conversion d'un document

L'appel ci-dessous génère une demande de conversion d'un document déjà connu de la rendition.

```bash
curl -X 'POST' \
  'http://localhost:8761/conversions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "documentId": docId,
  "format": "pdf",
}'
```
