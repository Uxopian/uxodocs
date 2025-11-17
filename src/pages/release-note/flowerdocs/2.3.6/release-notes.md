---
title: Release notes
description: Release notes
---

# Formulaires

* Le sélecteur de classe et les tags sous forme de liste de choix et utilisateur ont une nouvelle présentation (, , ).


# Recherche 

* Actions en masse disponibles dans le menu contextuel pour les dossiers  ().
* Actions de réponse à une tâche disponible dans le menu contextuel ().
* Ajout des valeurs 75 et 100 dans sélecteur de nombre de résultats des tableaux de recherche ().
* La sélection de résultats est maintenant remise à zéro à chaque de page ().
* Le nombre de recherches sauvegardées est désormais affiché  ().

# ARender 

* FlowerDocs s'appuie désormais sur la version 3.1.10 d'ARender. Cette montée de version implique une mise à jour des serveurs de rendition.
* Visualisation des fichiers temporaires dans ARender, par exemple les pièces jointes à leur ajout ou les documents avant création ().
* Le WAR spécifique pour incluant le connecteur FileNet n'est désormais plus publié. Le connecteur FileNet a été intégré au WAR ARender standard. La configuration associée est nécessaire.

# \{\{% core %\}\}

* Délégation des droits d'un utilisateur à un autre ().
* Configuration des champs à sauvegarder dans les faits de l'historique ().
* Des messages d'erreurs personnalisés peuvent désormais être renvoyés par les OperationHook aux utilisateurs finaux ().
* Augmentation du nombre d'abonnement à des opérations (auparavant limité à 10) ().

# API JS

* Exposition des services de composant ().
* Simplification de la récupération et modification des valeurs d'un composant ().
* Les événements de changement de classes en indexation sont envoyés avec l'identifiant ``Class``. Précédemment, le premier évenement était envoyé avec l'identifiant ``classid`` et les suivant avec ``Class`` ().


# Sécurité

* Protection contre les attaques XSS ().
* Protection contre les attaques de type _path tranversal attack_ (). 
