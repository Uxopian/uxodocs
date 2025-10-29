---
title: "Overview"
description: "Taguez vos composants pour les retrouver plus facilement"
---

# Overview

Les `tags` sont des métadonnées définies sur un composant permettant de le caractériser et de le retrouver plus facilement. 

Ces métadonnées peuvent être de différents types afin d'assurer une cohérence des données stockées dans FlowerDocs.

Une classe de tags permet de définir la typologie et les caractéristiques d'un tag au sein d'un scope. 
Cette classe de tags s'applique à l'ensemble des tags associés aux composants et est composée des éléments suivants : 

* `id` : identifiant technique du tag
* `displayNames` : nom d'affichage du tag (ex : Nom agence, N° immeuble, etc.) internationalisé
* `searchable` : booléen pour rendre le tag recherchable ou non  
* `type` : type du tag

| Type | Description |
|------|---------------------|
| `STRING` | [Chaîne de caractères](textuel.md) (ex : référence, nom du client …) |
| `TEXT` | [Champ texte](textuel.md) (ex : commentaire …) |
| `CHOICELIST` | [Liste de choix](liste.md) (ex : type de document …) |
| `ICON` | [Liste d'icônes](liste.md) (ex : canal d'entrée …) |
| `FREELIST` | [Liste libre](liste.md) (ex : référence liée à un SI externe …) |
| `CONDITIONAL` | [Liste de valeurs conditionnées](conditionnel.md) (ex : liste des services en fonction de la direction …) |
| `FLOAT` | [Nombre décimal](numerique.md) (ex : taux, proportion …) |
| `INT` | [Nombre entier](numerique.md) (ex : nombre de pièces justificatives …) |
| `CURRENCY` | [Nombre décimal](numerique.md) limité à 2 décimales (ex : montant …) |
| `DATE` | [Date](date.md) (ex : date d'échéance …) |
| `BOOLEAN` | Case à cocher (ex : secret médical …) |
| `USER` | Lié à un utilisateur de l'annuaire (ex : responsable …) |

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>

	**Identifier**
	
		Display name
	
	
		Nom d'affichage
	
	
        <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
    
	TYPE
    true

```

:::info
Ajoutez des tags à vos composants en référençant une classe de tags au niveau d'une classe de composant.
:::