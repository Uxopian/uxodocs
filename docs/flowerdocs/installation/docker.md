---
title: "Docker"
description: "Installation Docker de FlowerDocs"
---

# Installation Docker

Cette page décrit comment lancer un environnement Docker, prérequis inclus. 

:::warning
Concernant la configuration des applications OpenSearch, Redis et OpenLDAP, merci de se référer aux documents des produits pour un usage en production.
:::
 
## Pré-requis

* Si vous êtes externe à Arondor/Uxopian, veuillez contacter le support FlowerDocs pour obtenir les images Docker.
* Récupérer le livrable `flower-templates-\{version\}-package.zip`
* Dezipper le livrable

:::warning
Dans le dossier `docker`, un fichier `.env` est présent. Il peut être caché suivant votre système. Ce fichier permet de définir les variables utilisés dans les fichiers Docker Compose.
:::

## Installation ARender Rendition 

* Ouvrir le dossier `docker`
* Copier les fichiers `.env`, `arender-stack.yml` dans le dossier de votre choix 
* Lancer la commande suivante dans ce dossier : `docker-compose -f arender-stack.yml up`

## Installation FlowerDocs

* Dans le même dossier, lancer la commande : `docker-compose -f flower-stack.yml up`

## Accès aux applications

Une fois les conteneurs démarrés, les applications sont accessibles aux adresses suivantes :

* **FlowerDocs GUI** : http://localhost:8080
* **FlowerDocs Core** : http://localhost:8081  
* **ARender HMI** : http://localhost:8082
* **OpenSearch** : http://localhost:9200
* **Redis** : localhost:6379

## Configuration avancée

Les fichiers de configuration peuvent être personnalisés en modifiant les variables d'environnement dans le fichier `.env` ou en montant des volumes personnalisés dans les conteneurs.