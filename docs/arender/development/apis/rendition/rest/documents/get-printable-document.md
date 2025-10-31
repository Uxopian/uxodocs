---
title: Obtenir le document imprimable (GET)
---

Cette API vous permet d'obtenir la version imprimable d'un document spécifique.

## Description technique de l'API

Point d'entrée :
```bash
GET /documents/{documentId}/printable
```

Chemin de la ressource:

| Variable   | Requis | Description       |
|:-----------|:-------|:------------------|
| documentId | Oui    | L'ID du document  |

Réponse :

| Type                  | Description                           |
|:----------------------|:--------------------------------------|
| HttpServletResponse   | Le document imprimable au format PDF  |

## Exemples

### Obtenir le document imprimable

L'exemple suivant illustre comment obtenir le document imprimable pour un document 
spécifique avec l'ID _b64_bm9yZS92SDMtMS0xMTh1735080237_. Le paramètre -o permet de 
sauvegarder le résultat dans un fichier de sorti.

```bash
curl -X 'GET' \
'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/printable' \
-H 'accept: application/pdf' \
-o document_imprimable.pdf
```