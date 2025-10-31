---
title: Demander une conversion d'annotations
---

Cette API permet de demander les annotations d'un document au format demandé

## Description technique de l'API

Point de terminaison :
```bash
POST /annotations/conversion
```

Paramètre de requête :

| Variable             | Type   | Requis | Description                                                                          |
| :------------------- |:-------|:-------|:-------------------------------------------------------------------------------------|
| sourceType           | String | oui    | Le type actuel des annotations du document, les valeurs acceptées sont XFDF or FDF.  |
| targetType           | String | oui    | Le type attendu des annotations du document, les valeurs acceptées sont XFDF or FDF. |
| documentId           | String | oui    | L'id du document contenant les annotations.                                          |

En-tête:

| Variable             | Type     | Requis   | Description                                |
| :------------------- |:---------|:---------|:-------------------------------------------|
| Accept               | String   | oui      | Le format attendu en retour de la requête. |
 
Réponse :

| Attribute             | Type                     | Description                                   |
| :-------------------- | :----------------------- |:----------------------------------------------|
| annotations           | InputStream ou JSON      | Les annotations converties au format demandé. |

## Exemples

### Conversion des annotations d'un document

L'appel suivant génère une requête de conversion des annotations XFDF vers FDF pour le document avec l'id _b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9ZmFjMTgyOWItYjc0Ni00ZGVlLTg1YWEtNTZhNzY4NTcyOGMx_ et renvoie le résultat sous la forme d'un InputStream.

```bash
$ curl -X 'POST'\
  'http://localhost:8761/annotations/conversion?sourceType=XFDF&targetType=FDF&documentId=b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9ZmFjMTgyOWItYjc0Ni00ZGVlLTg1YWEtNTZhNzY4NTcyOGMx'\
  -H 'accept: application/octet-stream'\
  -H 'Content-Type: application/octet-stream'\
  --data-binary '@Titre.pdf'
```