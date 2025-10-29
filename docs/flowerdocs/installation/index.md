---
title: "Installation"
---

# Avant de commencer

## Couche de présentation

### FlowerDocs GUI
FlowerDocs GUI est une application WEB assurant la couche de présentation.
Elle est développée sur la base de technologies [Spring Boot](https://spring.io/projects/spring-boot) et WEB (HTML, JavaScript...).

Port par défaut : 8080. Il peut être surchargé en utilisant la propriété `server.port` dans le fichier `gui.properties`.

### ARender HMI 

[ARender HMI](https://arender.io/), produit développé par [Uxopian](https://www.uxopian.com), est une application WEB intégrée dans FlowerDocs GUI en tant qu'`iframe`. Elle permet la visualisation des documents générés via ARender Rendition Server.

Port par défaut : 8080. Il peut être surchargé en utilisant la propriété `server.port` dans le fichier `application.properties`.

## Couche de services

### FlowerDocs Core

FlowerDocs Core est le **moteur de GED**. C'est une application Web Java basée sur [Spring Boot](https://spring.io/projects/spring-boot). Elle permet de gérer de très grandes quantités de documents (ajout, suppression, mise à jour de documents, recherche, dossiers dynamiques etc.). Elle expose des Web Services **SOAP** et **REST** qui sont consommés par les différents clients : 

* l'Interface Web native FlowerDocs GUI
* des applications tierces 
* etc.

Pour la persistance des données, OpenSearch est utilisé pour la partie métadonnées et un espace de stockage pour la partie contenus de documents. La communication avec OpenSearch est réalisée via ses API REST. 
Le stockage des contenus des documents est réalisé en fonction des besoins et le protocole d'échange dépend de la technologie étudiée.

Une intégration avec un annuaire d'entreprise (type LDAP(s)) est requise pour accéder aux informations liées aux utilisateurs de l'application.

Port par défaut : 8081. Il peut être surchargé en utilisant la propriété `server.port` dans le fichier `core.properties`.

### ARender Rendition Server

[ARender Rendition](https://arender.io/), produit développé par [Uxopian](https://www.uxopian.com), est le moteur de rendition permettant notamment de générer les images correspondant aux différentes pages des documents à visualiser.
Ce moteur expose une API REST permettant, depuis le poste client, de récupérer les différents éléments nécessaires à la visualisation.

Port par défaut : 8761.

## Données

### OpenSearch
Le moteur d'indexation et de recherche OpenSearch, application Java standalone, est utilisé pour l'indexation et la recherche des données. Il fournit un moteur de recherche distribué et multi-entité ainsi qu'un stockage NoSQL de type Document. FlowerDocs utilise ces fonctionnalités pour stocker les métadonnées du document dans la partie NoSQL et les capacités avancées de moteur de recherche pour les requêtes sur les documents, les tâches et les dossiers.

La communication se fait via l'OpenSearch Transport Protocol qui repose sur un module spécifique basé sur TCP.

Port par défaut : 9200.

### Stockage des contenus
Les **contenus** des documents (PDF, Microsoft Office Word, etc.) gérés par FlowerDocs ne sont pas stockés dans OpenSearch mais sur un espace de stockage dédié qui peut être :

* un système de fichiers type NAS via **NFS**
* un service de stockage objet type **AWS S3** via les API REST mise à disposition

```xml
<!-- Commentaire nettoyé -->
```
![Exemple d'architecture](/img/documentation/fd-architecture.png)

### Redis

Redis est une base de données en mémoire utilisé majoritairement comme message broker.
Avec FlowerDocs, il est utilisé pour gérer certains caches ainsi que pour son mécanisme de file d'attente de traitement asynchrone d'OperationHandler.

Port par défaut : 6379.
