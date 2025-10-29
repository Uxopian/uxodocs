---
title: "Dossier"
description: "Les classes de dossiers"
---

# Dossier

:::info
Contrairement aux dossiers virtuels qui sont composés de recherches permettant de trouver dynamiquement les composants, les dossiers ont un modèle physique par le biais d'un lien parent-enfant avec les composants qu'ils contiennent. 

Une classe de dossiers permet de définir le modèle de dossier à créer. Sa spécificité est la notion d'enfant. 
:::

## Enfants

La classe de dossiers permet de définir quelles sont les classes d'enfants qu'elle est autorisée à contenir. 
Il est possible d'en définir autant que possible. Si le besoin est de contenir toutes les classes d'un type de composant, par exemple, tous les documents, il est possible d'ajouter un enfant avec l'identifiant `*` de la façon suivante : 

```xml 

		*****

```