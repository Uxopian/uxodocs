---
title: "Textuel"
description: "Utilisez les tags textuels"
---

# Textuel

Le modèle de données FlowerDocs offre la possibilité de définir des tags textuels : 

* les chaines de caractère `STRING`
* les zones de texte `TEXT`

## Chaînes de caractères

Ce type permet la saisie libre d'une chaîne de caractère.
Sur ce type de tag, il est possible d'ajouter une expression régulière dans l'attribut `pattern` afin de valider la saisie de l'utilisateur.

```xml
<?xml version="1.0" encoding="UTF-8"?>

	**NomClient**
    STRING
    [A-Z]*

```

## Texte

Ce type permet la saisie libre dans une zone de texte.

```xml
<?xml version="1.0" encoding="UTF-8"?>

	**Commentaire**
    TEXT

```