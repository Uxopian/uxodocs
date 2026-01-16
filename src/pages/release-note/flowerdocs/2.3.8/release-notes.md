---
title: Release notes
description: Release notes
---

import FlowerDocsDownloads from '@site/src/components/FlowerDocsDownloads';

# Page d'accueil

- Les widgets basés sur des recherches peuvent désormais afficher plusieurs champs. Pour cela, l'ensemble des champs renseignés dans la `selectClause` de la requête sont concaténés pour chaque résultat ().

# Formulaires

- Amélioration de la sélection de classe ou de valeur d'une liste de choix. La recherche au sein des valeurs possibles est réalisée mot par mot ( et ).
- Depuis un formulaire de modification d'une tâche, il est possible de s'approprier ou d'assigner la tâche ().
- Pour les tags de type `USER` ainsi que l'assignation d'une tâche, il est possible de filtrer les utilisateurs proposés en fonction d'équipe(s) ().
- Si une liste de choix obligatoire n'a qu'une seule valeur, celle-ci est automatiquement sélectionnée pour remplir le tag ().

# Historique

- L'assignation est historisée ().
- Les faits d'ajout et suppression de contenu sont correctement affichés dans \{\{% gui %\}\} ().
- Dans l'en-tête d'un composant, une action `Information` permet de savoir qui a reservé un composant et pour les tâches à qui elle est assignée ().

# Recherche

- Un widget permettant de filtrer les résultats grâce aux agrégations a été ajouté ().
- Dans un dossier virtuel, la première recherche est sélectionnée et ouverte ().
- Il est possible de gérer les actions affichées au dessus des résultats d'une recherche ().

# ARender

- FlowerDocs s'appuie désormais sur la version **3.1.11-2** d'ARender.
- Le plugin ARender, Plume, est désormais supporté par FlowerDocs (). **[Documentation d'installation](/documentation/connecteurs/plume/getting-started)**.

# Fast2

- Support de l'injection de dossiers virtuels ().
- Mise à jour de dossier existant ().
- Support des propriétés de type date dans les recherches ().

# \{\{% core %\}\}

- Lors de la suppression d'un document, ses annotations sont également supprimées ().
- Pour les dossiers, dossiers virtuels et recherche de documents, il est possible d'exporter les documents sous forme d'archive ZIP avec une structure à plat. Pour les recherches et chaque agrégation d'un dossier virtuel, le nombre de document dans le ZIP est limité par la propriété `core.convert.service.max.search.results` avec une valeur par défaut de **200**.
- Correction des contrôles réalisés lors de la vérification de tag en lecture seule ().

# Intégration

- Les libellés de \{\{% gui %\}\} peuvent être surchargés en JavaScript et/ou par des fichiers de propriétés (). **[Configuration](./documentation/config/gui/labels)** et **[JSAPI](./documentation/apis/jsapi/labels)**.
- Le service de classe de tags et le DAO de faits (_FactDAO_) sont accessibles au sein d'un `DroolsOperationHandler` ( et ).
- Le message du code d'erreur F00039 permet d'afficher son premier paramètre et non plus le deuxième, il n'est donc plus nécessaire de lui fournir un premier paramètre vide ().
- Un style CSS a été ajouté pour chaque type de menu contextuel afin de les modifier plus facilement en CSS ou JS ().

<FlowerDocsDownloads version="2.3.8" />
