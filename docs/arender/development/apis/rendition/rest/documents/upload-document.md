---
title: Charger un document (POST)
---

Cette API vous permet de charger un document.

## Description de l'API

Endpoint :
```bash
POST /documents
```


Paramètres de requête:

| Variable          | Requis | Description                                                                                                                                                                                                                                       |
|:------------------|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| documentId        | Non    | L'ID du document                                                                                                                                                                                                                                  |
| documentTitle     | Non    | Le titre du document                                                                                                                                                                                                                              |
| documentUrl       | Non    | L'URL du document                                                                                                                                                                                                                                 |
| failOnUnsupported | Non    | **Introduit dans la version 2023.12.0.** Si la valeur est **true** ou non spécifiée, le chargement d'un document non supporté renverra une erreur. Si la valeur est **false**, le chargement d'un document non supporté ne renverra pas d'erreur. |

Corps de la requête:

| Variable     | Description                                       |
|:-------------|:--------------------------------------------------|
| inputStream  | Le flux d'entrée contenant le contenu du document |


Réponses:

| Type       | Description                                                                                                       |
|:-----------|:------------------------------------------------------------------------------------------------------------------|
| DocumentId | L'ID du document. Un nouveau documentId est généré si aucun documentId est fourni dans les paramètres de requête |

## Exemples

### Charger un document

L'exemple suivant charge un document à partir d'un fichier nommé 
"example.pdf" sans spécifier de titre de document ni d'URL.

```bash
curl -X 'POST' \
  'http://localhost:8761/documents' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/octet-stream' \
  --data-binary '@example.pdf'
```

L'exemple suivant charge un document par URL.

```bash
curl -X 'POST' \
  'http://localhost:8761/documents?documentUrl=https%3A%2F%2Fdemo.arender.io%2Fdocs%2Fdemo%2FPDFReference15_v5.pdf' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/octet-stream' \
  -d ''
```