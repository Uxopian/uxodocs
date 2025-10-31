---
title: Récupérer tous les ordres de conversion (GET)
---

Cette API permet de récupérer tous les ordres de conversion.
L'appel à cette API devra être authentifié. Les identifiants sont disponibles dans le fichier de configuration _application.yaml_ du document-service-broker.

```yaml

run-mode :
  username : username
  password : password
```

## Description technique de l'API

Point de terminaison :
```bash
GET /conversions
```

Réponse :

| Attribut             | Type                      | Description                        |
| :------------------- | :------------------------ |:-----------------------------------|
| conversionOrders     | `List&lt;ConversionOrder&gt;`     | La liste des ordres de conversion. |

## Exemples

### Récupérer tous les ordres de conversion

L'appel ci-dessous génère une demande de récupération de tous les ordres de conversion.
Il est authentifié via l'utilisation de la méthode simple du "Basic Authentication",
en considérant le nom d'utilisateur : _user_ et le mot de passe _password_.

```bash
curl -X 'GET' \
  'http://localhost:8761/conversions' \
  -H 'accept: */*' \
  -H 'Authorization: Basic dXNlcjpwYXNzd29yZA=='
```
Exemple de réponse :
```bash
[
  {
    "conversionOrderId": {
      "id": "string"
    },
    "currentState": "QUEUED",
    "documentId": "string",
    "errorMessage": "string",
    "format": "string",
    "processedDate": "2023-06-19T16:12:24.476Z",
    "processingTime": 0,
    "queuedDate": "2023-06-19T16:12:24.476Z",
    "queuedTime": 0
  }
]
```
