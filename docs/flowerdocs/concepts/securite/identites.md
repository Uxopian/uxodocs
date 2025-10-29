---
title: "Identités"
description: "Organisez les utilisateurs accédant à votre application"
---

# Identités

## Principe

Au sein de la plateforme FlowerDocs, une identité est un utilisateur, un groupe d'utilisateurs ou une équipe. 
Cette notion permet d'identifier les utilisateurs qui utilisent la plateforme afin que : 

* la sécurité des données soit assurée en fonction de l'utilisateur authentifié
* les utilisateurs puissent collaborer
* la configuration de FlowerDocs GUI soit adaptée en fonction des usages des utilisateurs

Ces identités sont stockées dans un annuaire d'entreprise configuré par scope ou dans le référentiel d'utilisateurs internes.

## Utilisateurs

Un utilisateur représente une personne physique ou une application tierce. Chaque interaction avec la plateforme requiert d'être liée à un utilisateur préalablement authentifié. Un utilisateur peut appertenir à un groupe ou une équipe.

## Groupes

Un groupe représente un ensemble d'utilisateurs ou d'autres groupes.
Cette notion est généralement utilisée afin d'appliquer des permissions particulières en fonction des groupes auxquels appartient un utilisateur.

## Equipes

La notion d'équipe est similaire à celle de groupe à la différence qu'elle est gérée et stockée par la plateforme FlowerDocs.
Elle permet ainsi d'avoir des regroupements d'utilisateurs distincts de ceux définis dans l'annuaire d'entreprise. Les équipes sont généralement utilisées dans les organisations où la hiérarchie définie dans l'annuaire d'entreprise diffère de celle liée aux usages dans la plateforme FlowerDocs.

Les équipes possèdent une liste de propriétés permettant de configurer FlowerDocs GUI.

## Rôles

La plateforme FlowerDocs propose plusieurs rôles natifs offrant des permissions particulières. Un rôle peut être affecté à un utilisateur en définissant une équipe dont l'identifiant est le nom du rôle.