---
title: Fonctionnalités Alfresco Share
---

## Configurer ARender pour des groupes spécifiques

Pour configurer le viewer ARender pour des groupes spécifiques Alfresco, veuillez suivre la procédure suivante :

- Aller sur la page de déploiement de module : **/share/page/modules/deploy**
- Choisir le module ARender : **ARender Preview Plugin**
- Sélectionner l'évaluateur de droite : **group.module.evaluator**
- Dans le *Evaluator Properties* :

```yaml
negate : false

relation : OR

groups :  
```

## Configurer les types de document à ouvrir avec ARender

Pour sélectionner les types de document à ouvrir avec ARender, les autres seront ouverts avec le viewer par défaut configuré dans votre système.

Pour cela ajouter le contenu indiqué ci-dessous :

``` xml

        
    

        
    

```
