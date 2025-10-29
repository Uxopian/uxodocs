---
title: "Autorisation"
description: "Sécurisez votre application"
---

# Autorisation

:::info
Le rôle d'un objet de sécurité est de gérer les différentes permissions sur les objets dans FlowerDocs (composants, recherches sauvegardées, scopes, ...). Ces objets de sécurité sont référencés sur les objets FlowerDocs.
:::

Au sein de l'application, nous définissons deux types d'objets de sécurité : 

* Liste de contrôle d'accès (ACL)
* Proxy

Ces objets de sécurité permettent d'autoriser (ou d'interdire) une identité à effectuer une action.

## Les objets de sécurité

### Liste de contrôle d'accès (ACL)

Une liste de contrôle d'accès contient une ou plusieurs entrées de contrôle d'accès (`ACE`). 

Dans chaque entrée, les différentes permissions sont définies pour un ensemble d'identités (utilisateur, groupe, équipe).

Par exemple, quand un utilisateur veut accéder en lecture à un composant, l'application va évaluer la permission de lecture en fonction de l'ACL portée par le composant.

:::info
Si l'utilisateur n'appartient à aucune identité définie dans l'ACL référencée par un composant, il est considéré qu'il n'a pas de droit d'accès à ce composant. 

Les classes de composants portent une ACL qui est appliquée par défaut à la création d'un composant de cette classe. Cette ACL peut être modifiée plus tard par le biais d'intégration. 
:::

#### Ordre des entrées de contrôles d'accès (ACE)

L'ordre de définition des `ACE` est important car il correspond à l'ordre d'évaluation de celles-ci. La première entrée correspondant à l'utilisateur, un de ses groupes, une de ses équipes ou __*__, sera celle utilisée pour évaluer les différentes permissions de l'utilisateur pour un composant. 

Par exemple, si la première entrée a pour identité __*__ permettant de voir le composant et que la deuxième a pour identité l'identifiant de l'utilisateur X ne permettant pas de voir le composant, l'utilisateur pourra voir ce composant. 

En inversant les deux entrées de l'`ACL`, tous les utilisateurs pourront voir le composant sauf cet utilisateur X.

:::warning
* Lors de la mise en place d'`ACL`, il est préconnisé de ne pas définir d'entrées avec l'identité __*__.

En effet, cela voudrait dire qu'un utilisateur ne faisant pas partie d'un groupe pourrait quand même avoir les permissions de l'`ACL`.
Il est préférable d'ajouter le nom de tous les groupes/profils en tant qu'entité.

* Il est préconnisé de ne pas dépasser 1000 ACL sur un scope.
:::

### Proxy d'ACL

:::warning
Cette fonctionnalité est en beta. Pour toute volonté d'intégration utilisant les Proxy d'ACl, nous vous invitons à contacter l'équipe FlowerDocs afin de vous accompagner pour trouver une solution optimale à votre besoin.
:::

Un proxy permet de définir une sécurité dynamique en fonction d'une ou plusieurs règles. 

Chaque règle correspond à une liste de conditions et un identifiant d'ACL. 
Si toutes les conditions d'une règle sont satisfaites, les permissions de l'utilisateur sont déterminées selon l'ACL référencée. 

Trois types de conditions sont supportés par l'application :

* Condition sur les tags
* Condition sur la classe
* Condition sur l'utilisateur

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ACLProxy name="Acl proxy for document" xmlns="https:flower.comdocsdomainacl" xmlns:common="https:flower.comdocsdomaincommon">
	acl-proxy-document
	<rules xmlns:xsi="http:www.w3.org2001XMLSchema-instance" xsi:type="ACLConditionalRule">
		<!-- Commentaire nettoyé -->
		<!-- Commentaire nettoyé -->
		<!-- Commentaire nettoyé -->
	<!-- Commentaire nettoyé -->
		<!-- Commentaire nettoyé -->
		<!-- Commentaire nettoyé -->
		<!-- Commentaire nettoyé -->
	<!-- Commentaire nettoyé -->
		<!-- Commentaire nettoyé -->
		<!-- Commentaire nettoyé -->
		<!-- Commentaire nettoyé -->
		<!-- Commentaire nettoyé -->
	<!-- Commentaire nettoyé -->
```

:::info
Tout comme les ACLs, si aucune des règles n'est satisfaite, il est considéré que l'utilisateur n'a pas de droit d'accès au composant. 
:::

## Association d'un objet de sécurité

Un objet de sécurité est associé à un objet à travers son champ `ACL`. Ce champ ne porte que l'identifiant de l'ACL. Ainsi une ACL peut être définie sur plusieurs composants afin de fournir la possibilité de gérer des politiques de sécurité communes à des ensembles de composant. 

L'ACL référencée, par exemple sur un composant, sera utilisée pour déterminer si un utilisateur est autorisé ou non à effectuer une action sur celui-ci.

La création d'un composant est un cas particulier. En effet, celui-ci n'existant pas encore, c'est l'ACL définie au niveau de la classe de composants qui est évaluée. Ainsi afin d'autoriser un utilisateur à créer un composant, il est nécessaire qu'il possède la permission `CREATE` sur l'ACL référencée au niveau de sa classe.