---
title: Release notes
description: Release notes
---

# \{\{% gui %\}\} : Général

* Support de l'affichage pour mobiles amélioré
* Les informations liées au scope et à l'utilisateur connecté s'affichent dans son espace (accessible en cliquant sur l'avatar).
* La gestion de favoris est désormais généralisée. Les utilisateurs peuvent les retrouver depuis leur espace (bandeau de droite)
* Affichage d'un fil d'ariane correspondant à l'historique de navigation dans l'application.

## Changement de configuration

* Montée de version de *FontAwesome* de 4.4 à 5.6.1. Un préfixe est désormais obligatoire avant l'icône : [Icônes](https://coderthemes.com/ubold/layouts/light/icons-font-awesome.html)

# Recherche

* Les actions contextuelles sur les résultats de recherche sont visibles dès la sélection d'un résultat au dessus du tableau. 
* La sélection des colonnes de résultats utilise désormais un bouton dédié.

# Dossier virtuel

* Le widget permettant d'explorer le contenu d'un dossier virtuel a été refondu. Il offre désormais la possibilité à l'utilisateur de switcher entre la vue ARender et la vue tabulaire.

# Page d'accueil 

* Ajout de nouveaux widgets : Donut et Histogramme. [Configuration](./documentation/config/gui/home/charts)

# Administration 

* Refonte globale de l'organisation de l'administration pour un accès à l'information simplifié.
* Modification de la configuration de \{\{% gui %\}\} directement depuis la console d'administration.
* Les tags conditionnels peuvent être créés et modifiés depuis \{\{% gui %\}\}.
* Copie d'une classe de composants pour faciliter la création de classe similaires.

# API JS

* Les actions ajoutées dans les menus de raccourcis peuvent avoir une description. [Documentation](./documentation/apis/jsapi/shortcut#général) 
* Une fonction de l'API de menu contextuel permet d'ajouter une action dans le menu ainsi que dans l'en-tête du tableau de résultats. [Documentation](./documentation/apis/jsapi/shortcut##menu-contextuel) 

## Changement de configuration

* **Dépréciation** : Il faut utiliser la fonction ``action.getId()`` à la place de ``action.getName()``.
* **Dépréciation** : Pour récupérer ou rechercher des composants, il faut utiliser l'API de service de composant à la place des APIs  ``ComponentGetJSAPI`` et ``ComponentSearchJSAPI``.
* **Dépréciation** : Il faut utiliser l'API de service de composant à la place de  ``ComponentGetJSAPI``.
* **Dépréciation** : Pour mettre à jour une valeur ou récupérer les valeurs d'un champ, les fonctions à utiliser sont `setObjectValue`et `getObjectValue`. [Documentation](./documentation/apis/jsapi/forms/getting-started#les-champs-simples) 
* L'API d'administration n'existe plus, il faut désormais utiliser du JQuery.

# Configuration transverse \{\{% gui %\}\} / \{\{% core %\}\}

* Ajout de la notion de feature.
* Les propriétés ``script.class``, ``css.class``,``gui.config.class`` ne sont plus supportées. La configuration des classes techniques est remplacée par la nouvelle notion de features. 

# CLM 

* Chiffrement/déchiffrement de mot de passe
* Support du merge de plusieurs scopes  [Documentation](./documentation/install/clm/merge)

# \{\{% core %\}\} 

* Support de mots de passe chiffrés dans les fichiers de configuration

## Changement de configuration 

* La valeur par défaut de la propriété ``job.thread`` passe de 4 à 8.

# Elasticsearch

* Intégration d'un ``Operation Handler`` permettant de faire de l'OCR de document basé sur Tesseract

# Alfresco 

## Changement de configuration 

* La montée de version Spring Boot utilise une nouvelle définition des valeurs d'une collection avec l'utilisation de crochets ([Documentation Spring](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-Configuration-Binding#map-based-binding)), il faut donc mettre à jour les propriétés suivantes : 
 *  Configuration des aspects : `alfresco.aspects.fdt\:type=fdt:aspect1|fdt:aspect2` à remplacer par `alfresco.aspects[fdt\:type]=fdt:aspect1|fdt:aspect2`.
 *  Configuration du classement automatique : ``alfresco.auto.classify.fdg\:Claim` à remplacer par `alfresco.auto.classify.paths[fdg\:Claim]`.
 * Configuration de la sécurité applicative en fonction des tags : `alfresco.acl.strategies.fdg\:Claim=ACL_%(fdg:categorie)_%(fdg:sousCategorie)` à remplacer par 
 `alfresco.acl.strategies[fdg\:Claim]=ACL_%(fdg:categorie)_%(fdg:sousCategorie)`.
 
# FileNet 

* La propriété ``com.flower.filenet.bpm.acl.provider`` n'est plus supportée. Il suffit désormais de fournir un bean implémentant ``BPMACLProvider``.
*  Montée de version : JPA 2.2

# Operation Hook 

* **Attention :** si migration des OperationHooks sur Spring Boot, il est nécessaire de désactiver la sécurité

# Exploitation 

* Exposition de web services REST permettant de monitorer et gérer une stack FlowerDocs. [Documentation](./documentation/config/exploit/actuator)
* Authentification avec le standard OAuth 2 (Google, Github...) basé sur un document de configuration.
	
## Changement de configuration

* ``Logback`` est utilisé pour la gestion des logs applicatifs à la place de ``Log4j``. [Configuration](./documentation/config/exploit/logs)
* Les propriétés de configuration ``Redis`` sont désormais basées sur celles provenant de la librairie *Spring Data Redis*. [Configuration](./documentation/config/core/ha#cluster-redis)

## Montée de version 

* ARender 4.0.3-2
* Java 8 (minimum Update 191)
* Apache Tomcat : minimum 8.5.39
* Spring 5.1.2
* Spring Boot 2.1.0
* JPA 2.2
* FontAwesome 5.6.1


