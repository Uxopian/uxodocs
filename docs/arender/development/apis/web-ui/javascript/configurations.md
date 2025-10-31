---
title: Configurations
---

### Récupérer la valeur d'une propriété UI en JS

Depuis la version 2023.4.0, il est possible de récupérer la valeur de certaines propriétés depuis les API JS d'ARender.
Pour précision, il s'agit des propriétés de configuration de l'UI que l'on peut retrouver dans *configurations/arender-custom-client.properties*.

### API JS

Objet: getARenderJS()

| Fonction         | Arguments (type)  | Description                                   |
| ---------------- | ----------------- | --------------------------------------------- |
| getConfiguration | property (String) | Permet de récupérer la valeur d'une propriété |

### Propriétés récupérables

Voici la liste des propriétés récupérables à la version 2023.4.0:

| Propriété                                     | Valeur par défaut (dans *configurations/arender-custom-client.properties*) |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| documentnavigator.width                       | 320                                                                        |
| documentnavigator.initialWidth                | Default                                                                    |
| thumbexplorer.contextualMenu.createPageAnchor | true                                                                       |
| thumbexplorer.columns                         | 2                                                                          |

### Exemple


Récupération de la valeur de la propriété *thumbexplorer.contextualMenu.createPageAnchor*

```js
getARenderJS().getConfiguration("thumbexplorer.contextualMenu.createPageAnchor")
```
