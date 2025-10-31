---
title: Mise à jour de la version 4 à la version 2023
---

Bienvenue dans la documentation de migration d'ARender, où nous allons vous guider à travers le processus de mise à 
niveau de la version 4 vers la version 2023 d'ARender. 

La principale évolution de cette mise à jour concerne la partie UI, avec le passage d'un déploiement WAR en version 4 
vers un déploiement **Spring Boot** en version 2023. 

Pour la partie Rendition, notez qu'elle s'installe de la même manière en versions 4 et 2023.

## Introduction

La version 2023 d'ARender représente une étape importante dans l'évolution de la partie UI de notre produit, avec un 
passage vers Spring Boot pour améliorer **la stabilité, les performances et la flexibilité de déploiement**. 

Cette documentation a été créée pour vous guider dans le processus de migration de la partie UI de la version 4 vers la
version 2023, en mettant l'accent sur les changements nécessaires pour le déploiement Spring Boot.

## Prérequis
Avant de commencer la migration de la partie UI d'ARender, assurez-vous de remplir les prérequis suivants :

* Une connaissance de base de Spring Boot.
* Le binaire ARender UI en version 2023 doit être téléchargé et prêt à être déployé. Lien de téléchargement : 
* Le binaire ARender Rendition en version 2023 doit être téléchargé et prêt à être installé. Lien de téléchargement :
* Les configurations spécifiques de votre déploiement ARender en version 4.

## Migration de la Version 4 à la Version 2023 d'ARender

### Migration de ARender Rendition
Avant d'installer ARender Rendition en Version 2023, vous devez effectuer les étapes suivantes pour migrer votre installation
actuelle (Version 4) vers la Version 2023 :

* **Arrêt et suppression du service de la Rendition** 


```powershell
$> sc stop ARenderRenditionService
$> .\removeService.bat
```


Si **systemd** est le composant système :

```bash
$> systemctl stop ARenderRenditionEngineService.service
$> ./removeService.sh
```

Si **initd** est le composant système :

```bash
$> service ARenderRenditionEngineService stop
$> ./removeService.sh
```


* **Installation de la Rendition en version 2023** : suivez les instructions d'installation détaillées dans la 
```xml
  documentation officielle, disponibles [ici](<!-- Commentaire nettoyé -->).
```
  Cette documentation vous guidera à travers le processus d'installation de la Version 2023.

* **Transfert des propriétés** : une fois ARender Rendition Version 2023 installée, vous devrez transférer les propriétés 
  et configurations de votre installation actuelle (Version 4) vers la nouvelle installation. Pour ce faire, 
  référez-vous à la liste des changements de propriétés disponible
```xml
  [ici](<!-- Commentaire nettoyé -->) pour vous assurer que toutes les configurations 
```
  nécessaires sont correctement migrées vers la Version 2023.

* **Configuration d'ARender Rendition Version 2023** : après le transfert des propriétés, vous pouvez configurer ARender
  Rendition Version 2023 selon vos besoins spécifiques en suivant la documentation
```xml
  [ici](<!-- Commentaire nettoyé -->).
```

### Migration de ARender UI


Veuillez noter que cette documentation n'est pas destinée à la configuration d'ARender dans IBM FileNet.
Pour la configuration dans IBM FileNet, aucune modification n'est nécessaire entre les versions 4 et 2023 d'ARender.


Avant d'installer ARender UI en Version 2023, vous devez effectuer les étapes suivantes pour migrer votre installation
actuelle (Version 4) vers la Version 2023 :
* **Arrêt du Service du serveur d'application** : assurez-vous de stopper le service de votre serveur d'application 
  actuel où ARender UI Version 4 est déployé. Ceci garantira une transition en douceur vers la Version 2023.

* **Installation de la Version 2023 d'ARender WEB-UI** : suivez les instructions d'installation détaillées dans la 
  documentation officielle d'ARender UI Version 2023, disponibles 
```xml
  [ici](<!-- Commentaire nettoyé -->).
```
  Cette documentation vous guidera à travers le processus d'installation de la Version 2023.

* **Transfert des propriétés** : Une fois ARender UI Version 2023 installé, vous devrez transférer les propriétés et 
  configurations de votre installation actuelle (Version 4) vers la nouvelle installation. Pour ce faire, référez-vous à
```xml
  la liste des changements de propriétés listée [ici](<!-- Commentaire nettoyé -->) pour vous
```
  assurer que toutes les configurations nécessaires sont correctement migrées vers la Version 2023.

* **Configuration d'ARender UI Version 2023** : après le transfert des propriétés, vous pouvez configurer ARender UI 
  Version 2023 selon vos besoins spécifiques en suivant la documentation 
```xml
  [ici](<!-- Commentaire nettoyé -->).
```
