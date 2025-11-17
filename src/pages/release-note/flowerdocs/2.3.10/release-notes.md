---
title: Release notes
description: Release notes
---


# Dossier

* Lors de l'ajout d'un enfant à un dossier, la mise à jour des dossiers est faite après la mise à jour des enfants.

# Tâche 

* Utilisation du nom des réponses avec motifs dans la notification plutôt que leur identifiant.

# Dossier virtuel 

* Les résultats affichées dans un dossier virtuel sont cohérent avec l'agrégation sélectionnée lors du retour au dossier virtuel depuis un écran de modification de composant.  et 

# Configuration 

* Support d'une valeur par défaut pour les tags techniques.

# Historique 

* Affichage du nom pour les tags conditionnels plutôt que leur identifiant dans l'historique.

# Recherche

* Utilisation du formateur de date dédié à la recherche et non celui par défaut.
* Résolution des variables dans une recherche lors de l'export sous forme de CSV ou d'archive.
* Lors de l'ouverture d'une recherche sauvegardée, ses critères sont correctement affichés.
* Le cache de recherche fonctionne désormais dès la première recherche.
* L'export en CSV des dossiers virtuels est fonctionnel.

# ARender 

* **Montée de version en 3.1.14-2**.
* Affichage de l'action de téléchargement au format source.
* Support de la sélection de texte dans les notes textuelles et zone de texte libre pour Internet Explorer 11.
* Désactivation des actions d'upload depuis le poste utilisateur et depuis une URL.
* Annulation des demandes de changement de document s'il y a déjà une demande en cours, afin d'éviter les appels inutiles et boucles.,

# Plume 

* Désactivation de l'upload de fichier depuis le poste utilisateur.
* Affichage de l'action "Répondre à tous" depuis une pièce jointe de tâche ayant pour contenu un mail.

# Administration

* Vérification de l'unicité de l'identifiant d'une équipe à la création.
* Correction de la création des rapports de l'IHM d'administration.
* Tri des popup de sélection de classes de tâches depuis les workflows, pièces jointes, enfants de dossiers et catégories de tag par nom.

# \{\{% core %\}\}

* Normalisation des identifiants utilisateurs. Si `EnableLowerCaseOfUserName=true` : l'identifiant d'un utilisateur est passé en minuscule. Si `EnableLowerCaseOfUserName=false`,  l'identifiant de l'utilisateur respecte la casse définie dans le LDAP.

# Elasticsearch

* Tri des faits d'historique par date de création lors de leur récupération.

# Alfresco 

* Configuration du nombre de membres d'un groupe maximum et du nombre de groupes maximum d'un utilisateur remonté par Alfresco.
* Amélioration de la construction de critère avec l'opérateur `EQUALS_TO`.
