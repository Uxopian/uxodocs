---
title: "Authentification"
description: "Authentifiez les utilisateurs accédant à l'application"
---

# Authentification

:::info
Plusieurs mécanismes permettent d'assurer l'authentification des utilisateurs (ou clients).
:::

## Annuaire d'entreprise

FlowerDocs supporte nativement le protocole LDAPv2 afin d'authentifier les utilisateurs :  

* récupération des groupes
* attibuts spéficiques (mail, ...)
* changement de mot de passe 
 
Les annuaires qualifiés sont : 

* Microsoft Active Directory 
* OpenLDAP
* Apache Directory Server

## OpenID Connect

Afin d'intégrer FlowerDocs avec un système d'authentification existant et mutualisé à travers le système d'information, FlowerDocs supporte le protocole OpenID Connect. 
Ce protocole permet d'authentifier un utilisateur auprès de FlowerDocs GUI. 

## Jeton

Les APIs de FlowerDocs Core permettent la génération de jeton utilisateur. Le jeton généré peut ensuite être ré-utilisé afin d'authentifier des requêtes effectuées auprès de FlowerDocs Core ou pour ouvrir FlowerDocs GUI.