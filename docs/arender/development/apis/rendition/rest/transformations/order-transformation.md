---
title: Demander un ordre de transformation (POST)
---

Cette API permet de demander un ordre de transformation pour créer un nouveau document dans un format attendu et selon des critères de transformation

## Description technique de l'API

Point de terminaison :
```bash
POST /transformations
```

Corps :

| Attribut              | Type                        | Requis | Description                                                             |
| :-------------------- | :-------------------------- | :----- | :---------------------------------------------------------------------- |
| format                | String                      | oui    | Le format du document en sortie                                         |
| transformationDetails | List**This is a freetext**\n**This a sticky note"
        \},
        "contents": "This a sticky note",
        "icon": "Note"
      \},
      ,
        "page": 0,
        "position": ,
        "end": 
    ]
  \},
  "format": "pdf",
  "transformationDetails": [
      ,
            ,
        
          ]
        \}
      ]
    \}
  ]
\}'
```

### Ajouter des annotations FDF dans un document

L'appel ci-dessous génère une demande d'ajout d'une annotation de type "Square" sur le document _docId_. 
Le document en sortie sera un PDF contenant une annotation FDF.

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d ',
        "documentId": ,
        "interiorColor": 
    ]
  \},
  "format": "pdf-fdf",
  "transformationDetails": [
    
      ]
    \}
  ]
\}'
```

### Fusionner plusieurs documents en un seul PDF

L'appel ci-dessous génère une demande de fusion de document.
Le document en sortie sera un PDF contenant les pages du document _docId1_ puis celles du document _docId2_.

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d ',
        
  ]
\}'
```

### Archiver des documents

L'appel ci-dessous génère une demande de fusion de document.
Le document en sortie sera une archive (zip) contenant le document _docId1_ qui sera nommé _documentTitle1_ et
le document _docId2_ qui sera nommé _documentTitle2_.

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d ',
        
  ]
\}'
```
