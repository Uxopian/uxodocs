---
title: "Opération"
description: "Réagir aux opérations."
---

# Opération

## Principe

L'Operation API permet de réagir à l'exécution d'opérations au sein de FlowerDocs Core. Une **opération** est une action effectuée par un utilisateur sur un composant. 

Les **gestionnaires d'opérations** (ou OperationHandler) sont appelés lors de l'exécution d'une opération pour y réagir et appliquer des traitements spécifiques. Ils peuvent être appelés avant (*pré-traitement*) ou après (*post-traitement*) l'exécution de l'opération.

L'exécution d'une *opération* peut être découpée en trois phases : 

1. Les **OperationHandler** enregistrés dans la phase de pré-traitement sont appelés 

2. L'**Operation** est executée

3. Les **OperationHandler** enregistrés dans la phase de post-traitement sont appelés 

:::info
Le déroulement des étapes suivantes peut être interrompu par la levée d'une exception par un gestionnaire d'opérations si ce comportement est activé.
:::

## Abonnement

Afin qu'un gestionnaire d'opérations réagisse à l'exécution d'une opération, il doit y être abonné. L'abonnement à l'exécution d'une opération consiste en la création d'un document de configuration de classe `OperationHandlerRegistration`. 

L'abonnement définit le type d'opérations auxquelles le gestionnaire doit réagir en configurant une action (création, mise à jour...) et une catégorie de composants.
Sa phase d'exécution (*avant* ou *après*) indique si le gestionnaire doit réagir avant ou après l'exécution de l'opération.

En outre, l'abonnement détermine si la réaction à l'exécution d'une opération est synchrone ou asynchrone (exécutée dans un autre thread pour ne pas bloquer l'opération effectuée par l'utilisateur).

Afin de limiter le nombre d'appel, il est possible de définir un filtre d'exécution que FlowerDocs va résoudre pour déclencher ou non l'appel au gestionnaire d'opérations en fonction du contexte. 

Les champs sur lesquels ont peut appliqués des filtres dépendent de la catégorie de composants choisie, en voici la liste exhaustive :

* **Document, dossier et dossier virtuels** : liste de tags, classe de composant
* **Tâches** : listes de tags, classe de composant, utilisateur assigné, identifiant du processus
* **Classe de tâche** : identifiant, identifiant du processus
* **Autres** : identifiant

:::warning
Via l'interface d'administration, il est possible de sélectionner des champs autre, notamment sur les composants d'administration : ils ne seront pas pris en compte.
:::

## Gestionnaire d'opérations

Un **gestionnaire d'opérations** (ou OperationHandler) est un fragment de code appelé lors de l'exécution d'une opération.
Ils peuvent être classés en trois catégories : 

* **natifs** : fournis nativement par FlowerDocs Core et exécutés au sein de sa JVM
* **spécifiques** : développés spécifiquement et ajoutés comme librairies de FlowerDocs Core (*on-premise uniquement*)
* **hooks** : exposés en tant que web services REST

Afin de contextualiser leurs exécutions, un objet OperationContext est fourni en entrée. Le contexte peut être utilisé pour récupérer les informations concernant l'exécution de l'opération comme le composant concerné ou les modifications apportées.