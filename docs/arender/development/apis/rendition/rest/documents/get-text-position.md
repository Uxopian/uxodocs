---
title: Renvoie les positions du texte (GET)
---

Cette API permet de récupérer les positions du texte d'une page

## Description technique de l'API

Point de terminaison:
```bash
GET /documents/{documentId}/pages/{page}/text/position
```

Chemin de la ressource:

| Variable   | Requis | Description                               |
|:-----------|:-------|:------------------------------------------|
| documentId | Oui    | L'ID du document                          |
| page       | Oui    | La page du document où récupérer le texte |

Réponse :

| Type         | Description         |
|:-------------|:--------------------|
| PageContents | Le texte de la page |

## Exemples

### Obtenir les postions du texte

L'appel ci-dessous permet d'obtenir le texte de la première page d’un document avec l'ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/pages/0/text/position' \
  -H 'accept: */*'
```
