---
title: Recherche
description: Fonctionnalités de recherche dans ARender
sidebar_position: 2
keywords: ["feature", "recherche", "avancée"]
---

# Recherche

## Rechercher du texte

Cliquer sur la zone de recherche et saisir le(s) terme(s) recherché(s)

![Zone de recherche](/img/docusaurus.png)

Par exemple, entrer « Document » et taper sur « Entrée »

![Résultat recherche](/img/docusaurus.png)

## Recherche avancée

### Généralité 

La recherche avancée est accessible à partir de l'explorateur de recherches. Par défaut, elle est activée.
La largeur de l'explorateur est configurable.

![Explorateur de recherche](/img/docusaurus.png)

| Propriété                        | Description                              | Valeur par défaut |
| -------------------------------- | ---------------------------------------- | ----------------- |
| advanced.searchexplorer.enabled  | Active l'explorateur de recherche        | true              |
| documentnavigator.search.width   | Changer la largeur de l'explorateur      | 400               |

```cfg
advanced.searchexplorer.enabled=true
```

### Utilisation

Cliquez sur la zone de recherche et saisissez le(s) terme(s) à rechercher.

#### Options de recherches

Plusieurs options de recherches sont à votre disposition.

A droite de la zone de recherche il y a : 
* Le bouton activant la sensibilité à la casse : les textes en majuscules et minuscules peuvent être traités comme distincts (sensibilité à la casse) ou équivalent (insensibilité à la casse).
* Le bouton activant la sensibilité aux accents : la sensibilité de l'accent est liée à la prise en compte des accents.
* Le bouton activant les expressions régulières : les expressions régulières ("regex") sont des modèles utilisés pour faire correspondre les combinaisons de caractères dans les chaînes.

![Options de recherche](/img/docusaurus.png)

Si vous cliquez sur le bouton à gauche de la zone de recherche, deux listes déroulantes apparaissent.

La liste déroulante de gauche permet de choisir l'étendue de la recherche :
* Le document entier 
* Page courante
* Tous les documents

La liste déroulante de droite permet de choisir le contenu cible de la recherche : 
* Avec les annotations
* Sans les annotations
* Seulement les annotations 

![Options avancées](/img/docusaurus.png)

#### Lancer la recherche

ARender propose plusieurs types de recherche : 
* La recherche classique 
* La recherche qui surligne le texte correspondant à la recherche sur le document 
* La recherche qui biffe le texte correspondant à la recherche sur le document 

Si vous avez activé la propriété permettant de biffer un document et que vous avez les droits pour, le bouton de recherche et biffer apparaîtra.

Le bouton correspondant à la recherche qui surligne les résultats est activé par défaut.

| Propriété                                         | Description                               | Valeur par défaut |
| ------------------------------------------------- | ----------------------------------------- | ----------------- |
| advanced.searchexplorer.search.highlight.enabled  | Active le bouton chercher et surligner    | true              |

```cfg
advanced.searchexplorer.search.highlight.enabled=true
```

Les résultats apparaîtront dans l'explorateur de recherche et le texte correspondant à la recherche sera mis en avant sur le document.

#### Gestion des résultats de recherche

Grâce aux boutons d'en tête vous pouvez rafraîchir les résultats de recherche (1) , réinitialiser la recherche (2) et réduire/développer l'affichage des résultats (3).

![Gestion résultats](/img/docusaurus.png)

Par exemple, entrer « Document » et taper sur « Entrée ».

## Recherche avancée
### Généralité 
La recherche avancée est accessible à partir de l'explorateur de recherches. Par défaut, elle est activée.
La largeur de l'explorateur est configurable.