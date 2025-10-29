---
title: "Dossiers virtuels"
description: "Les classes de dossiers virtuels"
---

# Dossiers virtuels

:::info
Contrairement aux dossiers qui ont un lien parent-enfant avec les composants qu'ils contiennent, les dossiers virtuels sont composés de recherches permettant de trouver dynamiquement les composants. 

Une classe de dossiers virtuels permet de définir le modèle de dossier virtuel à créer. Sa spécificité est la notion de recherche.
:::

Les dossiers virtuels d'une même classe partagent une même liste de recherche, qui leur permet d'avoir la même forme de présentation des composants.

La particularité des recherches des dossiers réside dans la possibilité d'agréger les résultats en fonction d'un critère et la variabilisation des recherches. 

## Agrégation

Si la recherche définie dans le dossier contient une agrégation, les composants remontés par la recherche seront regroupés sous forme de `Bucket`. Il est également possible d'imbriquer des agrégations pour avoir des `buckets` basés sur plusieurs critères.

:::warning
Il est préconisé de ne pas faire d'agrégation à plus de 3 niveaux

Lorsque l'arborescence d'un dossier virtuel est en mode `Visualiser`, nous préconisons de ne pas dépasser les 100 documents affichés dans ARender.
:::

## Variabilisation des recherches 

Dans les recherches d'une classe de dossiers virtuels, les critères définis peuvent être des valeurs fixes ou bien sous forme de variable. Le fonctionnement est identique aux tags conditionnels pour la résolution de variable.

Grâce à ce mécanisme, il est possible de définir un même dossier virtuel de *Banette personnelle* en utilisant un critère `assignee = $\{user.id\}`. 
Les variables de types `tags` se basent sur les tags portés par le dossier virtuel.

:::warning
Il est préconisé d'utiliser des critères à valeurs fixes (comme des listes de choix) et de ne pas dépasser les 100 valeurs possibles.

Les agrégations sur des critères de type dates, entiers, chaines de caractères et textes ne sont pas supportées par FlowerDocs.
:::