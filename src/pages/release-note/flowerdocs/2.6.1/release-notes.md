---
title: Release notes
description: Release notes
---

import FlowerDocsDownloads from '@site/src/components/FlowerDocsDownloads';

:::info
✅ Les évolutions, 🔴 corrections d'anomalies et 📋 tâches incluses dans cette version sont listées dans cette section.
:::

# Changements importants de la 2.6.1

✅ Dans la continuité de mise en conformité avec le RGAA, la navigation clavier a été entièrement revue pour une meilleure accessibilité.

✅ Un menu d'accessibilité est disponible grâce à un raccourci clavier (`Ctrl+Alt+N`, avec `N` pour navigation) afin de pouvoir naviguer plus simplement entre les différents éléments de chaque écran.

# Changelog

## GUI

✅ Le sélecteur de colonne à afficher permet de rechercher facilement les colonnes souhaitées

✅ Support du mode `non over` du OffMenu

🔴 Les libellés de date de création par défaut des vignettes ainsi que le message de service worker sont internationalisés

🔴 Le nom des tampons textuels est mis à jour dans le menu utilisateur

🔴 Les notifications d'erreur sont affichées plus longtemps pour permettre d'être entièrement lues

🔴 Les actions d'édition et de suppression des délégations sont restaurées dans le menu utilisateur

🔴 Tous les champs et données d'un composant (tags, pièces jointes, processus, description) sont mis à jour en adéquation avec le changement de classe effectué

🔴 Diverses améliorations du comportement du lasso

### RGAA

✅ En navigant au clavier, l'utilisateur peut parcourir la popup ouverte sans aller derrière celle-ci

✅ Dans la continuité de mise en conformité avec le RGAA, la gestion du focus et la mise en valeur des élements au focus a été amélioré.

✅ Les notifications sont lisibles par des lecteurs d'écran

### Administration

🔴 Les fichiers de configuration vides n'empêchent plus le rechargement de la page à leur sauvegarde

🔴 Les liste des critères de filtre de recherche d'un dossier virtuel et type de tags sont triées par ordre alphabétique

✅ La navigation pour l'administration des pages est facilitée par le lien vers le modèle associé à la page

### Dashlets

✅ Le total de composants de chaque agrégation est affiché dans la légende des différents widgets de page d'accueil

✅ La création de dashlet de type `Compteur` est possible depuis les recherches

✅ Les widgets de pages d'accueil sont consultables en plein écran

📋 Les champs disponibles à la création de dashlet sont basés sur le catalogue de critères recherchables

## Intégration

### API JS

✅ L'API JS permet de savoir si un composant a été modifié

✅ Une popup de confirmation est affichable lors d'un retour sur la place précédente via l'API JS

### CLM

🔴 Le merge effectué par le CLM conserve l'ordre des propriétés pour tous les objets

## Sécurité

✅ Affichage de l'onglet `Insérer` soumis au rôle `DOCUMENT_CREATOR` pour tout utilisateur incluant les administrateurs

✅ Sécurisation des `OperationHook` grâce à l'injection du token de l'utilisateur courant avec le tag `InjectToken`

🔴 Les exceptions FlowerDocs des plugins de la GUI sont transmises dans la réponse d'erreur

✅ Les données sensibles des fichiers de configuration stockés dans FlowerDocs sont chiffrables

## Exploitation

📋 La configuration de la rendition ARender dans \{\{% core %\}\} utilise la même propriété que \{\{% gui %\}\} : `arender.rendition.nodes`

### S3

✅ Support de la configuration du endpoint et de l'accès forcée par chemin

📋 La région spécifiée dans la configuration du bucket supporte désormais le nom de la région et non plus uniquement son nom dans le SDK

### Cache

✅ Le Time to live (`TTL`) de cache est configurable par type d’objet ou combinaison scope et type d’objet

✅ Le TTL par défaut, pour les caches n’ayant pas de configuration, est désormais configurable

## OpenSearch

🔴 Le nombre maximum de composants remontés lors d'une recherche n'est plus limité à 10000

## Companion

🔴 L'affichage de l'action de configuration du Companion depuis les applications Microsoft Office supportées est soumise au paramètre `admin`

# Correctifs

## 2.6.1.1 _11/07/2023_

🔴 Le webservices FlowerDocs `job-rest-controller` sont de nouveau exposés

<FlowerDocsDownloads version="2.6.1" />
