---
title: Release notes
description: Release notes
---

import FlowerDocsDownloads from '@site/src/components/FlowerDocsDownloads';

:::info
✅ Les évolutions, 🔴 corrections d'anomalies et 📋 tâches incluses dans cette version sont listées dans cette section.
:::

# En bref

Découvrez les changements principaux apportés par cette nouvelle version.

## Obfuscation

✅ L'[obfuscation](/documentation/config/gui/viewer/obfuscation) introduit une nouvelle fonctionnalité permettant de masquer des données au sein de documents. Que ce soit grâce à la visionneuse de documents ou aux web services exposés, les utilisateurs définissent des zones restreintes à d'autres utilisateurs.
Ces derniers n'ont ensuite plus la possibilité d'accéder aux données obfusquées (visualisation, téléchargement...).

## Dossiers

Dans la continuité des précédentes versions, l'expérience liée à l'utilisation des dossiers physiques s'améliore encore. Lors de la consultation d'un dossier physique :
✅ Les utilisateurs peuvent désormais filtrer les documents d'un dossier. A l'aide de la classe de document, son nom ou des autres critères disponibles, il est encore plus facile d'accéder au bon document.

✅ En proposant le même formulaire d'indexation, lors du dépôt de plusieurs fichiers dans un dossier, l'indexation de nouveaux documents est grandement accélérée.

## Changements importants

📋 Cette version intègre une nouvelle version de la visionneuse de documents [ARender](https://arender.io). La montée de version (4.5.1) des serveurs de rendition est requise avant le déploiement de cette nouvelle version.

📋 Un nouveau mécanisme de class loader est utilisé, par défaut, pour le chargement des classes Java utilisées par les développements spécifiques. Si besoin des classes autorisées peuvent être ajoutées à l'aide du paramètre `secured.classloader.whitelist.additional`. Ce mécanisme peut également être désactivé avec la propriété `secured.classloader.enabled=false`.

# Changelog

## \{\{% gui %\}\}

### Dossiers

✅ Filtrer les documents d'un dossier

🔴 Upload de plusieurs fichiers par Drag & Drop

✅ Pré-remplissage du formulaire de création de document à partir de ceux précédemment validés

🔴 Le classement d'un document ne doit être appliqué qu'après la sauvegarde du document

🔴 La sélection rapide de sous-dossiers conserve l'état "sélectionné" de dossiers précédemment ouverts

### Formulaires de recherche

✅ Conservation du mode d'affichage des résultats de recherche (tableau ou vignettes)

✅ Affichage de la page précédente lors du rafraîchissement d'une page de résultat vide

🔴 La borne supérieure d'un critère de type date est automatiquement positionnée à la fin de la journée

🔴 Mauvais affichage en colonne de tag contenant des caractères protégés (`"` ou `>`)

📋 Support de requête cachée (`hiddenRequest`) sans `selectClause`

🔴 Impossible de saisir le champ recherche rapide sur une tablette Android

🔴 Impossible de vider un champ de type date sur une tablette Android

📋 Empêcher le tri sur la colonne d'icône de tâches

🔴 Rendre fixe le sélecteur d'opérateur d'un critère

### Formulaires d'indexation

#### Général

🔴 Prise en compte du nom du composant pour la confirmation d'abandon des modifications

🔴 Aucune popup de confirmation n'est affichée lors d'une sauvegarde sans retour arrière

✅ Amélioration de l'affichage d'un tag avec plusieurs valeurs

#### Tâches

📋 Empêcher la sélection d'une classe technique pour une pièce jointe acceptant toutes les classes

🔴 Fil d'ariane incorrect après l'auto-assignation d'une tâche (provoquant un changement de nom)

📋 Afficher l'identifiant de la pièce jointe dans l'historique si elle n'a pas de libellé

#### Documents

🔴 Durant la comparaison de versions, l'ancienne version est affichée à gauche

🔴 Tri des versions d'un document dans l'historique

📋 Notifier l'utilisateur lors de l'échec d'un upload de fichier

### Dashlets & Rapports

🔴 Corrections liées à la définition de dashlets avec des requêtes complexes

🔴 Dans Kibana, les libellés d'un tag dont l'identifiant contient un `_` ne sont pas résolus

📋 Tri des rapports accessibles par un utilisateur

📋 Affichage de l'identifiant d'une classe de tag si elle n'a pas de libellé dans la liste d'agrégations

### API JS

📋 L'abonnement à l'exécution d'une action est désormais notifié (uniquement) après la confirmation par l'utilisateur

📋 Exposition de la [récupération des fichiers](/documentation/apis/jsapi/mcd/documents) d'un document

### Redirections

🔴 Conservation des paramètres de l'URL après l'authentification d'un utilisateur

🔴 Correction de la redirection après un changement de mot de passe

🔴 Redirection vers ARender après l'authentification lorsque demandé

📋 Encodage du paramètre `targetURL` nécessaire pour certains proxys

## \{\{% core %\}\}

### Services

✅ Support des valeurs par défaut de tags

🔴 Récupération de n'importe quel contenu d'un document à travers le service REST

🔴 La génération de document à partir d'un modèle Microsoft Word fournit un nom avec la bonne extension (REST)

### BPM

#### Connecteurs

✅ [Connecteur Docusign] pour la signature électronique

✅ Génération de fichiers à partir d'un modèle Microsoft Word

✅ [Connecteur SentAI] pour l'analyse sentimentale

✅ Exposer les connecteurs BPM à travers des [services REST]

#### Utilitaires

✅ Extraction de texte (par expression régulière et/ou par zone) d'un PDF

📋 Mise à jour des librairies [bpmn-js](https://bpmn.io/)

📋 Amélioration de l'extraction d'un identifiant par les delegates

📋 Initialisation du contexte d'exécution d'un delegate asynchrone

#### Case

✅ A partir d'un case, une tâche sans tag est démarrée dès le clic (sans affichage d'un formulaire vide)

### Performances

📋 Optimisation de la récupération des fichiers d'un document sans inclure leur contenu

📋 Amélioration des métriques exposées par le \{\{% core %\}\}

📋 Amélioration des clients REST

📋 Suppression de la synchronisation sur les événements internes

## Connecteurs

### Visionneuse de documents

✅ [Obfuscation](/documentation/config/gui/viewer/obfuscation) de document

📋 Montée de version ARender en 4.5.1

✅ L'association document / serveur de rendition est désormais stockée dans un cache (Redis si activé)

🔴 Dans certaines conditions réseaux, certaines actions ARender n'étaient pas désactivées

🔴 Visualisation de plusieurs documents à l'aide de paramètres de l'URL `docId`

🔴 Visualisation des documents au sein d'un dossier virtuel contenant d'autres catégories de composants

🔴 Nettoyage de la visionneuse lors de changement de document (notamment pour les vidéos)

### Alfresco

✅ Support d'[Elasticsearch comme moteur de recherche]

✅ Support du changement de type d'un noeud (node type specialization)

📋 Mécanisme de suppression de certains tags en retours des appels aux services de composants

### ADLDS

🔴 Modification d'identités stockées dans Microsoft ADLDS

## Sécurité

📋 Empêcher la redirection vers des sites WEB externes lors de la déconnexion

📋 Mécanisme de class loader sécurisé (basé sur une liste blanche)

✅ Chiffrement d'un répertoire à l'aide du CLM et d'un magasin de clés

## Intégration

✅ Nouveau mode de sécurité basé sur un jeton pour le [client Java](/documentation/learn/gui-plugin/implementation)

<FlowerDocsDownloads version="2.5.2" />
