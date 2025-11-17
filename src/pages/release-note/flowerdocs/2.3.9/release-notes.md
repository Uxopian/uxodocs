---
title: Release notes
description: Release notes
---

# Dossier virtuel 

* Historisation de la requête de recherche ( et ).

# Dossier

* Indexation multiple après *Glisser Déposer* d'un dossier ou plusieurs fichiers (). *Avec Internet Explorer, le Glisser Déposer d'un dossier n'est pas possible à cause d'une limitation navigateur, il faut effectuer le Glisser Déposer avec le contenu de ce dossier*.
* Historisation du tri des tableaux de recherche ().

# Tâche 

* La touche **Entrée** valide une réponse avec motif et ne l'annule plus ().
* Les tâches de tâches n'ayant pas de pièces jointes ne bloquent plus l'affichage d'ARender ().

# Document 

* Téléchargement de tout les contenus du document et non plus uniquement le premier ().

# Recherche

* Lors du téléchargement au format CSV ou ZIP, la requête de recherche n'est plus fournie en tant que paramètre d'URL mais dans le corps de la requête pour contourner les limitations de taille d'URL d'Internet Explorer ( et ).
* Un champ conditionné par un autre champ est réinitialisé lorsqu'aucune valeur n'est sélectionnée dans l'autre champ (). 
* Les critères de type **Date** avec un opérateur **Entre** ne peuvent plus être envoyés sans valeurs au serveur ().
* Historisation de la requête de recherche ( et ).

# ARender 

* Ajout de tampons par équipe, groupe ou utilisateur ().
* Lors de l'ajout d'une pièce jointe à une tâche, celle-ci est sélectionnée et affichée dans ARender ().

# \{\{% core %\}\}

* Un DroolsOperationHandler n'est parsé qu'à son premier chargement puis mis en cache ().
* L'héritage de groupe LDAP est désormais supporté ().
* Le changement de mot de passe lorsque l'application est déployée sous forme de deux applications Web est fonctionnel ().
* Lors de la suppression de document, les fichiers associés dans Elasticsearch sont supprimés ().

# IHM 

* Diverses améliorations de style (, ) 
* La taille des URL a été réduite grâce à l'abréviation des différents paramètres ().

# Administration

* Les équipes peuvent être supprimées d'un scope sans avoir à modifier un autre champ ()
* 2 équipes ou ACLs avec des noms d'affichage identiques n'entrent plus en conflit lors de leur affichage ().

# Alfresco 

* Configuration des timeouts du client HTTP ().
* Support de la date de mise à jour dans les résultats de recherches ().
* Support de la recherche plein texte ().
* Un utilisateur est toujours remonté avec ses groupes, et non uniquement lorsqu'un administrateur ().
* Le contenu d'un document FlowerDocs est téléchargé avec le nom du document dans Alfresco ().

