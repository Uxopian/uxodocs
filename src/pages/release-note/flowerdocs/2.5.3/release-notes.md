---
title: Release notes
description: Release notes
---

:::info
✅ Les évolutions, 🔴 corrections d'anomalies et 📋 tâches incluses dans cette version sont listées dans cette section.
:::

# En bref

Découvrez les changements principaux apportés par cette nouvelle version.



## Une nouvelle console d'administration

✅ Cette nouvelle version intègre une toute nouvelle console d'administration. Son objectif : faciliter la conception de scopes.
Au menu, un ensemble de fonctionnalités facilitant la vie aux administrateurs : 

* gestion de la navigation (fil d'ariane, retours arrière, liens cliquables entre les objets...)
* validation des objets
* guider les utilisateurs en leur proposant des valeurs quand cela est possible
* usage d'un objet : savoir où il est utilisé
* et plein d'autres à découvrir dans l'application

## Restreindre l'exécution de gestionnaires d'opérations

Introduits il y a plusieurs années, les [gestionnaires d'opérations](/documentation/concepts/operation)  sont massivement utilisés pour réagir à des opérations déclenchées au sein de la plateforme FlowerDocs. A l'usage, une fonctionnalité est apparue comme manquante : pouvoir restreindre les contextes dans lesquels un gestionnaire d'opérations doit être notifié.

✅ Avec les [filtres d'exécution](/documentation/config/core/operation/registration#filtres), un administrateur définit les critères devant être satisfaits afin qu'un gestionnaire d'opérations soit notifié. Ils sont présentés sous la forme de critères de recherches. 

## Un meilleur suivi de composant

✅ Désormais, le suivi des événements et activités liés à un composant sont consultables dans un écran unique. Pour un composant, les utilisateurs peuvent y trouver : 

* son [historique](/documentation/concepts/facts) 
* les tâches liées (celles ayant le composant ouvert en pièce jointe)
* ses versions s'il s'agit d'un document

✅ Pour une meilleure clarté de l'historique, les événements peuvent être regroupés dans des ["faits métiers"](/documentation/concepts/facts#les-faits-métiers). Certaines opérations techniques peuvent ainsi être reléguées pour mettre en avant les opérations apportant le plus de valeur.


# Changelog

## \{\{% gui %\}\}

<!--
### Historique

✅ As a client, I search for facts

✅ As an integrator, I create business facts

✅ As a user, I see facts grouped by requestId

✅ As a user, I see document versions in a dedicated popup

✅ As a user, I scroll in order to display older facts

✅ Display a specific message in task history after the modification of an attachment

🔴 Cannot get fact from documents with brackets in idenfiers
-->

### Accès à l'application

✅ Les utilisateurs sélectionnent le scope sur lequel se connecter grâce à une liste déroulante. Cette liste propose les différents scopes auxquels s'est connecté l'utilisateur. *Ce nouveau champ peut être masqué en ajoutant le paramètre `scope.edit=false` dans le fichier `gui.properties`*

✅ Sur certains navigateurs et terminaux, \{\{% gui %\}\} peut être installée comme une application native et apparaître sur l'écran d'accueil comme n'importe quelle autre application (Edge 94+, Chrome 94+, Safari on iOS 15+...) grâce au support d'[A2HS](https://developer.mozilla.org/fr/docs/Web/Progressive_web_apps/Add_to_home_screen).

📋 Support du protocole OAuth2 sans affinité de session

🔴 Un utilisateur déjà authentifié peut se connecter à nouveau à l'aide du protocole OAuth2.


### Visualisation

🔴 Un utilisateur peut à nouveau éditer ses tampons personnels.

🔴 Un utilisateur peut créer et supprimer un signet lors de la visualisation d'un document.

🔴 Lors de la visualisation d'un dossier virtuel, deux demandes de visualisation étaient soumises au serveur.


### Optimisations

📋 A l'ouverture de l'interface graphique, les scripts personnalisés sont désormais chargés en parallèle afin d'accélérer une première ouverture de l'application.

🔴 Le mécanisme de détection de modification d'un scope ne doit pas tenir compte de l'utilisateur connecté.

📋 🔴 🔴 Améliorations de la gestion de l'URL des écrans qui effectuent des requêtes asynchrones pour éviter des problèmes de navigation.

📋 Ajout d'une [fonction JavaScript](/documentation/apis/jsapi/autre/util#comparaison-de-version) utilitaire permettant de comparer un numéro de version à la version déployée.


### Tâches 

🔴 Suite à l'assignation d'une tâche à un autre utilisateur, l'écran courant est à nouveau rafraîchi.

🔴 🔴 L'auto-assignation et la suppression d'une tâche close ne sont plus possibles.



## \{\{% core %\}\}

### Gestionnaire d'opérations


✅ [Filtres d'exécution](/documentation/config/core/operation/registration#filtres) d'un gestionnaire d'opérations

✅ Gestionnaire d'opérations permettant d'[exécuter un script JavaScript](/documentation/config/core/operation/handlers/script)

✅ Gestionnaire d'opérations permettant de lancer un nouveau processus

✅ Lors de la mise à jour d'un composant ou de l'application d'une réponse, un gestionnaire d'opérations a accès au composant non modifié (\{\{% javadoc class="com.flower.docs.operation.api.UpdateComponentOperationContext" %\}\}).

🔴 L'exécution d'un gestionnaire d'opérations avant la création d'un document provoque la perte de son contenu dans certaines situations.

🔴 Eléments Redis qui restent indéfiniment en attente après un arrêt / relance de la plateforme

### BPM

✅ Traduction française du modeler de processus

✅ Implémentation d'un connecteur pour le **S**ervice d'**A**rchivage **E**lectronique [STRATOW].

🔴 Lors de la génération d'une empreinte de tâche, l'utilisateur auquel est assignée la tâche n'est plus conservé.

### Connecteurs

#### Alfresco

✅ Gestion des documents avec plusieurs contenus à l'aide de l'aspect `fd:hasMultipleContent`.

🔴 Lorsque l'[écriture en Y] est activée, la suppression de tags techniques doit être réalisée suite à une recherche de composants pour permettre l'export en CSV des résultats.

✅ Possibilité d'effectuer des recherches sans remonter de résultat.

#### Elasticsearch

🔴 Possibilité de trier les résultats d'une recherche sur un tag de type `BOOLEAN`.

### Autres

✅ Les templates [Thymeleaf](/documentation/config/core/templates/html) utilisés pour la génération de [pages](/documentation/config/core/pages) peuvent accéder à l'objet [`util`](/documentation/config/core/appendices/context-util) et utiliser des expressions SPEL.


✅ Afin de faciliter le développement de scripts JavaScript, certaines classes peuvent être utilisées sans leur package *(exemples: `Document`, `SearchRequestBuilder`...)*

✅ Le service de gestion de versions \{\{% javadoc class="com.flower.docs.service.api.component.VersionService" %\}\} est désormais exposé à travers l'objet [`util`](/documentation/config/core/appendices/context-util).

📋 Lors de la modification d'un document utilisé comme configuration, le cache approprié est automatiquement vidé.

📋 Lors de la suppression physique d'un document, il est détaché de ses dossiers parents en tant qu'administrateur.
