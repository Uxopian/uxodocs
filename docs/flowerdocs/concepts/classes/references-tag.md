---
title: "Références de tag"
description: "Tagguez vos composants en référençant des tags sur une classe de composants"
---

# Références de tag

Il est possible de caractériser un tag référencé sur une classe de composants par les paramètres suivants :

* **Obligatoire** : indique si une valeur est obligatoire pour la validation
* **Technique** : indique si l'utilisateur a accès à ce tag 
* **Lecture seule** : indique si l'utilisateur peut modifier ou non la valeur du tag
* **Multivalué** : indique si le tag peut avoir plusieurs valeurs ou non. Il est recommandé de ne pas dépasser une limite de 10 valeurs possibles dans un tag multivalué.
* **Valeur par défaut** : la valeur par défaut lorsque le tag n'est pas renseigné
* **Un masque de validation** (expression régulière) : si défini, surcharge celui défini au niveau de la classe de tags
* **Ordre d'affichage**
* **Une description** permettant d'afficher une infobulle

:::info
La valeur par défaut est positionnée par FlowerDocs Core uniquement au moment de la création : si la valeur du tag est vidée alors la valeur par défaut ne sera pas positionnée.

A la création, la valeur par défaut est positionée si le tag est non obligatoire et non présent. S'il est non obligatoire avec une valeur vide, alors la valeur vide est positionnée.

Côté interface graphique, la valeur par défaut est positionnée à l'ouverture du formulaire de création d'un composant.
:::

## Valeur par défaut 

Les valeurs par défaut sont valables uniquement à la création : si la valeur du tag est vidée alors la valeur par défaut ne sera pas positionnée. 

Il est possible d'utiliser des variables comme valeur par défaut :

* `$\{dayDate\}` : la date courante
* `$\{user.id\}` : l'identifiant de l'utilisateur connecté