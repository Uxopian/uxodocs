---
title: Release notes
description: Release notes
---

# Sécurité

- Chiffrement des contenus stockés sur système de fichiers ()
- Vérification de l'intégrité des contenus stockés sur système de fichiers avec des empreintes SHA-256 ()
- Forcer le scope à l'aide d'une en-tête HTTP `scope` positionnée par un reverse proxy ()
- Utilisation d'attributs LDAP distincts pour les identifiants d'utilisateurs et de groupes ()
- Utilisation de la configuration LDAP des identifiants en minuscule pour la recherche et la récupération d'utilisateurs ()
- La définition du endpoint `UserInfo` n'est plus obligatoire pour la configuration d'un Identity Provider OIDC ()
- Le jeton utilisateur n'est, par défaut, plus exposé au niveau de la GUI () [Documentation](/documentation/apis/jsapi/user#informations-d-un-utilisateur)
- \{\{% gui %\}\} supporte une [règle d'ACL Proxy par défaut](/documentation/config/core/securite/acl#règle-par-défaut) (sans condition) pour autoriser la création ()

# GUI

## Recherche

## Formulaires de recherche

- Affichage du libellé du workflow après exécution d'une recherche ()
- Affichage de l'identifiant de la classe de tag ne disposant pas de libellé dans le sélecteur de critères ()
- Exécution du lookup dans le cas de tag de type `FreeList` après rafraîchissement de la recherche ( et )
- Affichage du libellé de suggestions pour un critère après l'exécution de la recherche ()
- Calcul de la validité d'un critère de type `Date` lors de la suppression de toutes ses valeurs ()

### Résultats de recherche

- Téléchargement de plusieurs documents sélectionnés dans un tableau de résultats de recherche (unitairement ou dans une archive ZIP) ()
- Conservation de la page courante de résultats dans l’historique ()
- Génération de vignette pour les documents composites (archives, emails ou avec plusieurs contenus) ()
- Téléchargement de l'export CSV ou ZIP avec un nom basé sur le contexte courant (nom de la recherche ou du dossier) ( et )
- Amélioration de la conservation des colonnes de résultats (, et )
- Tri alphabétique sans prise en compte de la casse et des accents dans le sélecteur de colonnes ()

### Recherches sauvegardées

- Conservation de la catégorie lorsque la recherche est sauvegardée à partir d'un formulaire avec sélecteur de catégorie ()
- Récupération des identités non présentes dans le LDAP ne bloque plus l'affichage des autres identités ()
- Impossibilité de partager une recherche à des équipes si une d'entre elles ne possède pas de nom ()

## API JS

- Résolution dynamique des icônes de composants (, , et ) [Documentation](/documentation/apis/jsapi/autre/icons)
- Nouveau plugin permettant d'afficher une [barre de recherche rapide](/documentation/learn/search-box/search-box) ()
- Abonnement à l'assignation d'une tâche ()[Documentation](/documentation/apis/jsapi/mcd/tasks#réagir-à-une-assignation)
- Conservation de la valeur courante lors de l'ajout de valeurs autorisées pour un tag conditionnel ()
- Déclenchement de l'événement d'ouverture d'une recherche après le chargement des critères ()
- Retour correspondant à l’état d'activation des actions d'une pièce jointe de tâche lors de l'appel à la fonction `isEnabled()` ()

## Composant

- Amélioration du déverrouillage d’un composant à la fermeture du navigateur ()
- Calcul de la validité d'un tag de type `Date` lors de la suppression de toutes ses valeurs ()
- Application des suggestions pour les tags en lecture seule ()
- Exécution du lookup dans le cas de tag de type `FreeList` à l'ouverture d'un composant ()
- Affichage de l'identifiant de l'utilisateur lorsqu'il n'est pas présent dans le LDAP ()
- Affichage de l'icône d'un tag de type `ICON` en lecture seule ()
- Harmonisation de l'affichage des noms de composants en lecture seule (, et )

### Document

- Suppression de l'affichage de popup d'avertissement lors de la restauration de version pour un document modifié ()
- Remplacement du nom de document par celui du dernier fichier ajouté s'il n'a pas été modifié par l'utilisateur lors de la création d'un document ()
- Utilisation de la même contrainte d'ajout de fichiers via Drag & Drop et depuis l'explorateur () [Documentation](/documentation/config/gui/indexation/form#document)

### Tâche

- Restauration de l’application de réponse avec message de confirmation lors de la création de tâche en popup )
- Harmonisation du comportement de création de tâche en activité et popup ()
- Suppression de pièce jointe temporaire ne nécessite plus la permission `DELETE_CONTENT` ()
- Synchronisation entre les pièces jointes et ARender lors de la création d'une tâche ()
- Affichage des pièces jointes n'est plus bloqué par les pièces jointes de type dossier virtuel ()

### Dossier virtuel

- Visualisation du contenu des dossiers virtuels au sein d'ARender uniquement s'il contient des documents ( et )

### Dossier

- Restauration de l'affichage des actions d'en-tête et pied de page lorsque le dossier est réservé ( et )
- Affichage du sélecteur de classe lors de la création d'un composant au sein d'un dossier ayant plusieurs classes autorisées ()

## Console d'administration

- Accès à l'écran d'administration des délégations pour les administrateurs disposant du rôle `DELEGATION_MANAGER` ()
- Restauration de la sélection de conditions ()
- Support de la suppression des objets de sécurité (ACL et ACL Proxy ) ()
- Affichage du diagramme de conception d'un case dès sa création ()
- Désactivation de l’action de sauvegarde lorsque :
    - une classe de tag a un identifiant invalide ()
    - une ACL n'a pas d'entrée ()
- Support des formats de date contenant des virgules ()

## Expérience utilisateur

- Amélioration de l'internationalisation de la configuration ()
- Amélioration de l'affichage de l'action permettant de vider la sélection dans les listes de choix ()
- Traduction des libellés natifs dans les listes de choix ()
- Modification du libellé de l'action permettant de détacher une pièce jointe ()
- Suppression du copyright dans le bas de page ()

<br/>
Cette nouvelle version intègre diverses améliorations de style concernant : 
 
*  Les popups se chevauchant ()
*  Les popups de liste de choix ()
*  La popup d'attachement d'un composant à un dossier ( et )
*  La popup de partage d'une recherche ()
*  Les suggestions pour les tags de type chaîne de caractères ()

### Préférences

- Rafraîchissement des dashlets et tampons après leurs modifications lorsque le service worker est désactivé ()
- Support des critères de type `Date` ayant uniquement un minimum ou maximum ()
- Affichage des dashlets lorsqu'un utilisateur a accès à un catalogue de widgets ()
- Amélioration de la redirection des dashlets vers des formulaires de recherche (, et )
- Fil d'Ariane incorrect après l'ouverture de favoris depuis le panneau utilisateur ()
- Affichage des favoris sans nom ()
- Amélioration du calcul de validité lors de l'édition de tampons ()

## Autre

- Restauration du support des plugins par scope avec Redis ()

# Core

## Services

- Support de la restauration des composants invalides ()
- Mise à jour de composant obsolète provoque une erreur afin d'éviter d'écraser des modifications antérieures ()
- Vérification de l'unicité des enfants ajoutés à un dossier ()
- Changement de propriétaire de composant uniquement possible par un administrateur lors de la mise à jour celui-ci ()
- Restriction de la modification des tags en lecture seule via les WebServices ()
- Mise à jour de la propriété `component.search.ignore.classes` pour cacher les nouvelles classes techniques ()

## Workflow

- Séparation du delegate HTTP en deux : un pour les réponses textuelles et un pour les fichiers ()
- Possibilité d'éditer les variables d'entrées personnalisées lors de la génération de fichier ()
- Support de la conversion en PDF à partir d'un fichier généré à partir d'un template HTML ()
- Affichage du diagramme de case uniquement si l'utilisateur a la permission `READ_HISTORY` pour le dossier ()

# Connecteurs

## ARender

Le connecteur ARender a évolué afin d'intégrer la dernière version, 4.3.1, de la visionneuse de documents ARender (). Cette nouvelle version du connecteur intègre divers correctifs concernant :

- L'encodage des noms de documents contenant des espaces ()
- Des erreurs JavaScript à l'ouverture de documents ou de tâches ()
- Des boutons non visibles lors de l'édition de notes textuelles ()
- La possibilité de supprimer un document lors de la composition de nouveaux documents ()
- La prévention de mise en cache, par le navigateur, de certaines feuilles de style ()
- La visibilité de certaines actions (composition de document, création d'annotations) en fonction des permissions de l'utilisateur connecté ( et )

## Kibana

- Support des ACL Proxy : les composants qui référencent un ACL Proxy peuvent désormais être restitués dans les dashboards ()
- Résolution des libellés pour les tags basés sur des listes de choix ( et )
- Support de la mise à jour d'objets Kibana à l'aide du CLM ()
- Par défaut, la création d'un scope avec le CLM ne définit plus de `timeFieldName`. Ce champ est défini avec la valeur de l'argument `timeFieldName` fourni à la commande d'exécution du CLM ()

## Plume

- Variables sans valeurs ne provoquent plus d'erreur JavaScript ()
- Support des tags contenant des \_ dans les templates ()
- Support du caractère espace dans les noms de pièces jointes ()

# Référentiels de données

## Alfresco

- Export en CSV d'une recherche porte l’extension attendue ()
- Récupération des utilisateurs n'ayant pas de nom ou prénom ne bloque plus la recherche d'utilisateurs ()
- Ajout du type Route dans le modèle 2.4-2.5 ()
- Ajout des alias de préférences utilisateur ()
- Amélioration du chargement des préfixes et aspects pour les requêtes CMIS ()
- Désactivation de la promotion de document est forcée ()
- Récupération par l'administrateur des décorations et des aspects ()
- Support d'OpenID Connect ()
- Utilisation d’un cache pour les utilisateurs ()

## FileNet

- Support du Multi-Realm ()

# Correctifs

## 2.5.1.1 _29/04/2021_

- Drag & Drop de plusieurs fichiers dans un dossier physique ()
- Encodage du paramètre `targetURL` passé dans les URLs ()
- ADLDS : Possibilité de modifier un utilisateur ou un groupe ()

## 2.5.1.2 _04/05/2021_

- **Montée de version** de la visionneuse de documents ARender en **4.3.2** ()
