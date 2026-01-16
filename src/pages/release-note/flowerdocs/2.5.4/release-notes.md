---
title: Release notes
description: Release notes
---

import FlowerDocsDownloads from '@site/src/components/FlowerDocsDownloads';

:::info
✅ Les évolutions, 🔴 corrections d'anomalies et 📋 tâches incluses dans cette version sont listées dans cette section.
:::

Cette version est la dernière version mineure de la 2.5. Elle contient principalement des correctifs afin de la stabiliser avant la fin de son développement.

<br/>

# Changements importants de la 2.5.4

## \{\{% gui %\}\}

### Visionneuse de document

✅ Montée de version ARender 4.6.9.

### Indexation

🔴 L'absence de règle par défaut pour un `ACLProxy` ne provoque plus d'exception.

### Historique

🔴 Le nombre de version affichées dans l'historique est basé sur la propriété `MAX_FACTS`.

🔴 Les versions créées manuellement sont antérieures à la version de travail.

🔴 Après la restauration d'une version, la version de travail est la version restaurée.

🔴 L'ouverture du suivi des tâches ne remonte plus d'erreur.

### Recherche

🔴 Les critères de recherche sont à nouveau ajoutés en colonnes dans le tableau des résultats de la recherche.

🔴 La sélection dans un critère d'un processus sans classe de tâche de départ ne provoque plus d'erreur.

### Administration

🔴 L'éditeur de propriété d'équipe ne stocke plus les valeurs vides ou nulles.

🔴 Les valeurs conditionnelles ajoutées depuis la console d'administration sont utilisables depuis l'application.

🔴 Les diagramme de processus et table de décisions peuvent être sauvegardés tous les deux après leurs ouvertures successives.

🔴 Les pièces jointes sont non obligatoires par défaut si aucune information n'est fournie.

✅ Les pages privées peuvent embarquer l'API JS.

### Expérience utilisateur

🔴 Le fil d'Ariane ne chevauche plus le titre ni les actions du composant dans le cas où il est très long.

📋 Diverses améliorations de style pour les dossiers, menu d'actions, steppers, ...

🔴 Les menus ne pouvant pas être résolus ne bloquent plus l'affichage des autres menus.

🔴 L'action de création depuis un dossier virtuel est visible uniquement si une classe de composant est autorisée à être créée pour le dossier virtuel courant.

🔴 Amélioration de la validation des dates.

🔴 Dans les dashlets _Liste_, les résultats de recherche n'ayant pas de valeur sont affichés avec le libellé _Inconnu_.

## \{\{% core %\}\}

### Services

🔴 Les caches d'annotations et de réservations ne sont plus partagés entre les différents scopes d'un même environnement.

🔴 Le `hash` des fichiers temporaires est stocké et restitué via les _WebServices_.

🔴 Un unique document préférence utilisateur est créé lors de plusieurs créations de favoris concurrentes.

🔴 La détermination automatique du libellé d'une version est également effectuée pour les libellés personnalisés.

🔴 La propriété `MAX_FACTS` est configurable via une `Feature`.

### LDAP

🔴 L'héritage de groupe est configurable et mis en cache par scope.

📋 Les filtres de groupes et d'utilisateurs sont configurables par scope.

### Templates

🔴 Restauration du support des méthodes utilitaires du moteur Thymeleaf pour l'affichage d'un template dans une page.

✅ Les modèles Microsoft Word sont utilisables pour générer des fichiers temporaires.

### Connecteurs

🔴 En mode Multi DAO, la DAO principale est appelée avant celle d'Elasticsearch.

#### Alfresco

📋 La surcharge de l'identifiant de nœud Alfresco peut-être désactivée.

✅ Support des sous-clauses de recherche.

## CLM

🔴 Amélioration de l'import de scope supportant les documents multi-contenus.

# Correctifs

## 2.5.4.1 _31/03/2022_

### Corrections

🔴 Tous les objets sont affichés dans les différents tableaux de l'administration FlowerDocs et plus uniquement les 100 premiers

🔴 La popup d'ajout des catégories de tags dans l'administration porte le bon titre

🔴 Ajout de l'icône du plugin HTML manquant du nouveau thème ARender

🔴 La scrollbar dans les dossiers virtuels s'affiche au changement de bucket

📋 Les titres longs des composants sont tronqués pour pouvoir afficher correctement les actions

🔴 Les filtres des operations hooks sont maintenant affichés dans l'administration FlowerDocs

🔴 Les légendes des buckets vides sont correctement affichées dans les histogrammes

📋 Les réponses dont les codes sont compris entre 200 et 300 sont supportées par le connecteur HTTP

📋 L'ouverture des buckets dans un dossier virtuel en onglet ne provoque plus une remontée en haut de liste

📋 Le bouton de purge de cache dans l'administration de FlowerDocs est maintenant traduit en anglais par `Clear cache`

### Évolutions

📋 Montée de version ARender en 4.6.10

📋 L'onglet de l'administration FlowerDocs s'appelle maintenant `Administration`

📋 Le Web Service des réservations est exposé depuis le RuleContextUtil

## 2.5.4.2 _14/04/2022_

🔴 Une classe de composant sans ACL pouvant être créée depuis un dossier virtuel n'empêche plus l'affichage de celui-ci dans l'application

🔴 Les valeurs par défaut vides sont ignorées à la création ou modification de composant

🔴 La scrollbar s'affiche en bas des pages de recherche pour faciliter la navigation

## 2.5.4.3 _28/04/2022_

### Anomalie

🔴 Le download de contenu depuis FlowerDocs ne laisse plus d'iframe dans le DOM

🔴 Le cache des réservations est purgé uniquement lors du purge des caches par un SYS_ADMIN

🔴 L'ouverture d'un processus sans `data` n'empêche plus son affichage depuis l'administration FlowerDocs

🔴 Les valeurs par défaut sont positionnées uniquement en création sur les tags non obligatoires non présents sur le composant par FlowerDocs core

🔴 Les dossiers sont de nouveaux sélectionnables afin de pouvoir attacher un composant à celui-ci

📋 Le menu des applications a une taille adapté à son contenu

### Évolution

✅ La API JSde FlowerDocs expose la possibilité de connaître l'item sélectionné pour la place courante

✅ Des classes ont été ajoutées à la liste des classes chargées et utilisables par les Drools, scripts etc.

📋 Montée de version ARender en 4.6.11

## 2.5.4.4 _02/05/2022_

✅ Configuration de la validation du paramètre Nonce lors d'une authentification via OpenId Connect

## 2.5.4.5 _06/05/2022_

🔴 Correction d'une faille de sécurité

## 2.5.4.6 _17/06/2022_

✅ Seuls les fichiers sont considérés pour le calcul du nombre de fichiers ajoutés lors du Drag and Drop depuis Outlook

## 2.5.4.7 _29/06/2022_

✅ Support de la configuration de l’attribut de Cookie SameSite

## 2.5.4.8 _07/10/2022_

✅ Montée de version ARender en 4.6.16

🔴 Gestion des contextes basé sur l'identifiant pour le champ titre en indexation

📋 Désactivation de la publication des métriques dans Cloudwatch avec le connecteur de fichier AWS S3 par défaut

## 2.5.4.9 _25/01/23_

✅ Montée de version ARender en 4.6.18

✅ Le _Time to live (TTL)_ de cache est configurable par type d'objet ou combinaison scope et type d'objet

✅ Le TTL par défaut, pour les caches n'ayant pas de configuration, est désormais configurable

🔴 L'icone de chargement d'une recherche des listes de choix est caché après la réception des résultats et non plus à la fin de la requête

🔴 Affichage dans ARender des enfants indirectes d'une agrégation d'un dossier virtuel

## 2.5.4.10 _30/03/23_

✅ Les `OperationHandler` ne sont plus exécutés sur les recherches internes d'annotations

🔴 Correction de faille de sécurité

## 2.5.4.11 _19/06/23_

✅ Mise à jour SDK AWS en 1.12.488

## 2.5.4.12 _23/06/23_

🔴 Correction du client Alfresco pour empêcher des réinitialisations de la connexion

<FlowerDocsDownloads version="2.5.4" />
