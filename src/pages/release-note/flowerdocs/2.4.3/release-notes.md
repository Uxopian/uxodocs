---
title: Release notes
description: Release notes
---

# Evolutions

## GUI

* Optimisation des performances de l'affichage des documents d'un dossier virtuel ().
* Création de dashlet sur la page d'accueil par les utilisateurs ().
* Notification push ().
* Support de langues supplémentaires via l'ajout de fichier de propriété contenant les libellés ().
* Conservation du mode de présentation d'un dossier virtuel (agrégation ou tabulaire) lors de la navigation ().
* Affichage direct des actions secondaires de composant et de recherche lorsqu'il y a suffisamment de place ().

* Le champ `classid` est désormais membre du contexte d'un formulaire ().



## Ergonomie

* Navigation au clavier dans les formulaires avec la touche tabulation ().
* Amélioration de la gestion de la touche Entrée dans les popups ().
* Amélioration du redimensionnement des panneaux ().
* Mise en évidence du champ ayant le focus ().
* Fil d'Ariane à gauche et plus contrasté.
* Critères d'un formulaire de recherche :  
 * les critères sont affichés sur une seule colonne dès que la taille de la fenêtre est inférieure à `1900px`.
 * les critères libres peuvent être filtrés.
 * possibilité de réduire le panneau de critères.
* Résultats de recherche : 
 * les actions de téléchargement ont été remontées au dessus des résultats.
 * le nombre de résultats est affiché directement dans le titre de l'encart.
 * les en-têtes sont fixes lorsque l'utilisateur scroll (pour les navigateurs le supportant).
 * augmentation du contraste (en-têtes, lignes sélectionnées...).
 * le sélecteur de colonnes reste ouvert après la sélection/désélection d'une colonne.
 * Drag & Drop des colonnes \{\{% beta %\}\}
 * Conservation des colonnes sélectionnées \{\{% beta %\}\}


## Alfresco

* Support des tags de type `ICON` ().
* Support des réservations pour les tâches et dossiers virtuels ().
* Par défaut, les tags techniques ne sont plus propagés d'un composant à un autre ().
* Modifications du modèles par défaut
 * Tri sur la colonne `assigné à` ().
* Support d'une ACL par défaut sur les classes de composants ()
* Par défaut, la gestion de conflit de version Elasticsearch est désactivée ()

## ARender

* Création de tampon personnalisé par les utilisateurs ayant la permission `CREATE_ANNOTATION` sur le scope ().
* La locale de l'utilisateur est fournie à ARender afin d'adapter la rendition des emails ()

## CLM

* Lorsque une erreur est renvoyée lors de l'exécution, un code de retour approprié est renvoyé ().
* Import d'objets Kibana ()
* Afin de faciliter la gestion de classe de tags avec des valeurs, un nouveau job a été introduit afin d'en générer à partir d'un CSV ().

# Corrections

* Modifications de code à travers la console d'administration en utilisant Internet Explorer ().
* Dashlet de type DONUT avec Internet Explorer.
* Création de tâche à partir d'une sélection de plusieurs composants ().
* Une valeur d'un tag conditionnel pouvait être considérée comme valide si elle n'était pas du tout autorisée ().
* Dans une popup, la scrollbar n'est pas cliquable ()
* Le contenu d'un dossier n'est affiché que si l'utilisateur a la permission `READ_CONTENT` ().

# Correctifs 

## 2.4.3.1 _20/01/2020_

###  GUI

* Amélioration des performances des champs conditionnels ().
* L'affichage des favoris est fait de façon asynchrone ().
* Le scroll est fonctionnel dans les résultats de recherche sur Firefox ().
* Amélioration de l'affichage des popups de création de tampons et dashlets sur Internet Explorer ().

### Alfresco 

* Augmentation du nombre maximum d'objets à remonter lors de la récupération de la configuration, des pièces jointes de tâche (,, ). 
* Désactivation de la décoration des tags multivalués et meilleure gestion de la surcharge de la valeur par défaut ().

### ARender

* Le menu ARender est correctement affiché lorsque l'environnement a des lenteurs ().
* Le profil fourni via intégration à ARender est fourni en mode externe ().

## 2.4.3.2 _06/02/2020_

### Ergonomie 

* Le calendrier d'un tag de type Date est désormais internationalisé ().
* Le menu de vertical reste replié lorsque l'utilisateur redimensionne les différents panneaux de l'application (indexation, visionneuse, recherche, ...) (). 
* Amélioration du support mobile et de la gestion du scroll (, ).

### Tag conditionnel 

* Le champ de recherche des champs conditionnel est à nouveau fonctionnel ().
* Les valeurs autorisées des champs conditionnels sont triées par ordre alphabétique ().
* Les valeurs affichées lors d'un export de résultat de recherche des tags conditionnels sont localisées (). 
* Restriction la liste de valeurs autorisées d'un tag conditionnel en JS ().

### Internet Explorer 11

* Amélioration de la gestion de l'historique des recherches via mot-clés dû à la restriction de taille d'URL avec Internet Explorer ().
* Les pièces jointes de tâches sont affichées dans l'ordre d'ajout et non de façon aléatoire ().

### Autres

* L'action de téléchargement au format natif est affichée lorsque le document n'est pas un PDF ().
* Lors de la navigation entre une recherche et une recherche en popup, la sauvegarde de la recherche suivante n'est plus la dernière ouverte mais la recherche courante  ().

## 2.4.3.3 _25/02/2020_

### Ergonomie

* La section de tampon personnalisé n'est affiché que si l'utilisateur a des tampons personnalisés ou qu'il peut en créer ().
* Les critères fixes ne sont plus affiché dans le sélecteur de critères additionnels ().
* Les critères additionnels sont triés par ordre alphabétique ().

### Internet Explorer 11

* Amélioration des performances de chargements du tableau de résultats de recherche ().
* Amélioration de l'affichage d'une entrée de l'historique si elle est longue ().
* Les popups n'apparaissent plus avec une transparence ().

### Dossier virtuel 

* La tentative d'affichage d'un document pour lequel l'utilisateur n'est pas autorisé à voir le contenu masque la visionneuse ().
* Le panel de chargement est correctement masqué lors du clic sur le chevron dans l'arborescence du dossier virtuel ().

### Alfresco

* La récupération des favoris est fonctionnel avec Alfresco ().

## 2.4.3.4 _26/02/2020_
* Correction d'une régression introduite en 2.4.3.3 empêchant l'ouverture d'un composant depuis une recherche en double cliquant dessus ().

## 2.4.3.5 _13/03/2020_
### ARender 

* **Montée de version ARender : 4.0.4-2** ().
* L'erreur lors de la mise à jour d'une annotation non autorisée ne bloque pas les futures mise à jour d'annotation ().

### Sécurité 

* Correction d'une faille XSS ().
* Correction d'exposition de données ( et  ).

### Autres 

* Le *drag and drop* d'un fichier sur une pièce jointe de tâche initialise la popup de création du document avec le nom du fichier ().
* Correction d'une régression introduite en 2.4.3.3 affichant un tableau sans colonnes dans la corbeille de purge ().

## 2.4.3.6 _15/06/2020_

* L'ajout de composant à une pièce jointe de tâche multivaluée ne peut plus mener à une duplication des références vers les composants déjà attachés à cette pièce jointe ().

## 2.4.3.7 _19/06/2020_

* Le endpoint ARender permettant de vérifier l'état de la rendition est accessible sans authentification ().
* Le filtre de vérification du scope peut être désactivé ().
