---
title: Release notes
description: Release notes
---

# Changements importants de la 2.7

## Correctifs de sécurité

Dans l'objectif d'améliorer la sécurité au sein de FlowerDocs, de nombreux correctifs ont été apportés :
\{\{% epic id = FD-15523 %\}\} Correction de failles XSS

\{\{% epic id = FD-15494 %\}\} Correction de failles de sécurité

## ARender

📋 Montée de version ARender

## Document Builder

\{\{% epic id = FD-15616 %\}\} Diverses améliorations sur l'utilisation du Document Builder à travers FlowerDocs :

✅ Le contenu d'origine est différencié d'un contenu créé via Document Builder afin de laisser le choix à l'utilisateur de créer une nouvelle version ou un nouveau documents

✅ Dans une tâche, il est possible de préciser la pièce jointe dans laquelle ajouter le document créé depuis le Document Builder

🔴 Création d'un document temporaire à l'utilisation du Document Builder

🔴 La déconnexion après l'ouverture du Document Builder se fait sans erreur

## Composants

\{\{% epic id = FD-15647 %\}\} L'ajout de fichier en contenu de document crée un document temporaire, qui ne sera définitif qu'à la sauvegarde du document évitant ainsi les conflits de versions

🔴 La suppression d'un document attaché à une tâche n'entraîne plus de problèmes à la visualisation des autres pièces jointes de la tâche

## RGAA

Poursuite de la mise en conformité avec le RGAA :
\{\{% epic id = FD-15526 %\}\} Amélioration de la lisibilité de l'application par un lecteur d'écran

\{\{% epic id = FD-15534 %\}\} Amélioration de la navigation clavier

\{\{% epic id = FD-15300 %\}\} Amélioration du style au focus d'un élément

## Faciliter les intégrations

✅ Un pattern permet à l'intégration de définir simplement quelles classes sont autorisées en pièce jointe de tâche

## Workflow

\{\{% epic id = FD-15610 %\}\} Fin de support du Case

## Operation Handlers

\{\{% epic id = FD-12938 %\}\} Permettre de s'abonner aux opérations sur les objets d'administration FlowerDocs

## API REST

✅ L'exposition du status et de la santé de l'application au travers de services REST ne necessite plus d'authentification

✅ Le type mime d'un document est calulé lors de sa création par web services

🔴 Les API REST des jobs Redis ne sont plus exposées

## Recherche

\{\{% epic id = FD-15859 %\}\} Amélioration des filtres au sein d'un dossier virtuel

🔴 Filtre des étapes sélectionnables en fonction du workflow renseigné

## GUI

\{\{% epic id = FD-15720 %\}\} Suppression du script vendormin.js

✅ Les actions du service worker ne sont plus affichées

✅ La notification du service worker devient une notification push commune à toute l'application FlowerDocs

✅ Optimisation des temps d'affichage des objets d'administration

# Correctifs

## 2.7.1 _26/10/2023_

🔴 Amélioration du processus de migration de Elasticsearch et FlowerDocs 2.5 vers OpenSearch et FlowerDocs 2.7

🔴 L'authentification est de nouveau fonctionnelle dans FlowerDocs Companion

🔴 Les abonnements aux opérations sont executés lors de l'ouverture de composant

## 2.7.2 _10/11/2023_

🔴 Les abonnements aux opérations sur les objets d’administrations s'exécutent désormais

## 2.7.3 _15/12/2023_

✅ Le paramètre `text.extractor.max.size` permettant de modifier la limite de caractères extraits sur un document lors de la recherche plein texte est disponible dans le `core.properties`. Valeur par défaut = 100 000

## 2.7.4 _10/01/2024_

🔴 Le cache des DroolsOperationHandler ne se recharge plus à tort dans un contexte multi-scope.

🔴 Les WSDL sont de nouveau accessibles depuis les endpoints.

🔴 La connexion SSL à Redis est de nouveau fonctionnelle.

## 2.7.5 _12/01/2024_

✅ Mise à jour SDK AWS en 1.12.488.

## 2.7.6 _13/02/2024_

🔴 L'ancien contenu est désormais correctement supprimé du système de fichier lorsqu'il n'y a pas de mode de versionning.

🔴 Mettre à jour un document sans renseigner de contenu ne supprime plus l'ancien contenu.

🔴 Les documents créés avant la version 2.5 sont désormais correctement affichés.

## 2.7.7 _12/09/2024_

🔴 FlowerDocs Core démarre à nouveau lorsque le chiffrement de document est activé.

🔴 L'indexation plein texte avec le chiffrement de document.

## 2.7.8 _27/11/2024_

📋 FlowerDocs Core now includes ARender version 4.8.20
