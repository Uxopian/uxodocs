---
title: "Périmètre"
---

# Scope

:::info
Les scopes permettent d'isoler les données entre différents clients / métiers tout en utilisant une même plateforme.
:::

Un scope définit un silo applicatif en isolant ses données et sa configuration. À ce titre, il définit : 

* les équipes d'utilisateurs 
* les utilisateurs pouvant accéder à celui-ci
* les langues utilisées


Afin de se connecter à un scope, il est nécessaire de renseigner son identifiant comme paramètre d'URL (par exemple : `https://flowerdocs.com/gui?scope=GEC`).

Si FlowerDocs est derrière un proxy, l'utilisation d'une en-tête HTTP `scope` permet de rediriger l'utilisateur vers FlowerDocs GUI avec le paramètre d'URL `scope` et la valeur fournie.


Si le paramètre n'est pas renseigné, le scope par défaut défini avec la propriété `scope.default` dans le fichier de configuration `gui.properties` est utilisé.

```properties
# Dans gui.properties
scope.default=PRODUCTION
```


Il est possible d'afficher la sélection du scope sur la page de login en configurant la propriété `scope.edit` dans le fichier de configuration `gui.properties`.

```properties
# Dans gui.properties
scope.edit=true
```

## Sécurité et autorisations

:::info
L'autorisation de l'accès à un scope est déterminée par la permission de lecture sur la liste de contrôle d'accès définie au niveau du scope. Plus de détails sur ce mécanisme peuvent être consultés dans la section [Sécurité](../securite/).
:::