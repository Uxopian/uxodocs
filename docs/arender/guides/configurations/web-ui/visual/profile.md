---
title: Profils
---

## Introduction

Dans ARender un profil permet de configurer l'interface ARender de
différentes manières selon les appels.

Il est possible de jouer sur de nombreux paramètres comme le CSS,
l'affichage ou non des icônes, la largeur des panels etc...

## Profils livrés avec le produit

ARender est livré avec les profils décrits ci-dessous :

| Nom                                             | Description                                                                                                                                          |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| configurations/arender-custom-server.properties | Fichier de configuration contenant toutes les propriétés disponibles commentées. Décommenter et modifier toute propriété que vous souhaitez utiliser |

## Ajout d'un ou N profils

Il est possible d'ajouter 1 ou plusieurs profil(s) spécifique(s) à
ARender de manière à dédier différentes interfaces à différents
utilisateurs ou groupes d'utilisateurs.

Les propriétés sont listées et commentées dans le fichier **configurations/arender-custom-client.properties** de ARender
Web-UI.

### Étapes pour créer un nouveau profil

#### Standalone

- Créer un fichier nommé par exemple *nouveauProfil.properties*
- Y renseigner les propriétés à modifier (exemple:
  `visualization.rotation.save.enabled=true`)
- Enregistrer le fichier et ajouter le au dossier **configurations** du jar ARender

Pour déclencher l'utilisation de ce profil dans ARender il faut
ajouter le paramètre *props* dans l'URL avec comme valeur le nom (sans
l'extension) du fichier :

`http://localhost:8080/?url=../samples/arender.pdf&props=nouveauProfil`

#### Docker

- Créer un fichier nommé par exemple *nouveauProfil.properties*
- Y renseigner les propriétés à modifier (exemple:
  `visualization.rotation.save.enabled=true`)
- Enregistrer le fichier.
- Lors du "docker run", utiliser un volume pour placer le fichier *nouveauProfil.properties* dans */home/arender/ARenderConfiguration/*
Exemple de volume : docker run -e ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS=http://votre_ip_rendition:8761 -v C:\nouveauProfil.properties:/home/arender/ARenderConfiguration/nouveauProfil.properties  -p 127.0.0.1:8080:8080 votre_image_id

Pour déclencher l'utilisation de ce profil dans ARender il faut
ajouter le paramètre *props* dans l'URL avec comme valeur le nom (sans
l'extension) du fichier :

`http://localhost:8080/?url=../samples/arender.pdf&props=nouveauProfil`
