---
title: Marque blanche
---

## Introduction

ARender permet, depuis la version 4.4.1, de retirer les différentes références à sa marque via de la configuration.

## Configuration

### Les références à ARender dans le panneau "À propos"

Une propriété permet de retirer les références à 'ARender'. Les références retirées sont celles se trouvant dans le panneau "À propos".
```xml
<!-- Commentaire nettoyé -->
```

Appliquer la propriété suivante afin de retirer ces références : 

```cfg
# Supprimer toutes les références à ARender
arender.white.labeling=true
```



Visuel après activation de la propriété de la marque blanche : 


```xml
<!-- Commentaire nettoyé -->
```

### Références lors du chargement ou de la sauvegarde


Lors du chargement ou de la sauvegarde d'un document, le texte 'ARender' est visible au centre de la page.

```xml
<!-- Commentaire nettoyé -->
```

Ce texte est configurable via la propriété suivante :


```cfg
# Affichage d'un label lors du chargement de l'UI ARender
startup.loading.label=Just-Loading
```


```xml
<!-- Commentaire nettoyé -->
```


### Modification du titre de la page

La dernière référence à ARender se trouve dans le titre par défaut de la page qui va se retrouver directement dans le fichier HTML. Pour la retirer, aller à l'emplacement où ARender Web-UI est déployé. Vous trouverez à la racine du dossier, le fichier ARender.html. Ensuite ouvrez le fichier avec un éditeur de texte afin de retirer la référence à 'ARender' :

```xml
<!-- Commentaire nettoyé -->
```

Après édition : 

```xml
<!-- Commentaire nettoyé -->
```
