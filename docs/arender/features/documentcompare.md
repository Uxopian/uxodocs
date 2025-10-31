---
title: Comparaison de document
---

## Mettre deux documents en comparaison


La comparaison d'images est une fonctionnalité disponible à partir
de la version 4.4.0


### Lancement manuel

#### Dans le cas de documents textuels

Pour activer la comparaison de deux documents, effectuer un clic droit
dans le volet de navigation au niveau du document à comparer avec celui
en cours de visualisation, en cliquant sur *Ouvrir comme un nouveau
document*.

```xml
<!-- Commentaire nettoyé -->
```

Le document s'ouvre alors à côté du premier et les résultats de la
comparaison s'affichent.

```xml
<!-- Commentaire nettoyé -->
```

#### Dans le cas de documents de type image

Pour activer la comparaison de deux images, effectuer un clic droit
dans le volet de navigation au niveau du document à comparer avec celui
en cours de visualisation, en cliquant sur *Ouvrir comme un nouveau
document et comparer les images*.

```xml
<!-- Commentaire nettoyé -->
```

Le document s'ouvre alors à côté du premier et les résultats de la
comparaison s'affichent.

```xml
<!-- Commentaire nettoyé -->
```

### Lancement automatique au démarrage de l'application

Pour lancer automatiquement la comparaison des documents au démarrage de
l'application, utiliser le paramètre :

    visualization.multiView.doComparison=true

La comparaison ne se lancera que si au moins deux documents sont chargés
dans l'applciation.

Le premier document chargé s'ouvrira à gauche et le second à droite.

Si les deux documents sont des images, alors ce sera la comparaison
d'images qui sera lancée.

Comment quitter le mode comparaison ? =============================

- Pour quitter, cliquer sur la croix présente dans le coin en haut à
  droite du document à fermer.

```xml
<!-- Commentaire nettoyé -->
```

- Il est également possible d'effectuer un clic droit puis de
  sélectionner *Fermer la vue multiple*.

```xml
<!-- Commentaire nettoyé -->
```

## Analyser les résultats d'une comparaison

La couleur d'une ligne définit sa différence avec l'autre document :

| Couleur | Signification                    |
| ------- | -------------------------------- |
| Verte   | Ligne ajoutée                    |
| Rouge   | Ligne supprimée                  |
| Grise   | Ligne modifiée                   |
| Orange  | Modification au sein d'une ligne |

```xml
<!-- Commentaire nettoyé -->
```

## Parcourir les résultats obtenus

### Navigation dans les résultats

```xml
<!-- Commentaire nettoyé -->
```

Cliquer sur le bouton *Résultat suivant* ou *Résultat précédent*
redirigera sur le résultat le plus proche, peu importe le document.

```xml
<!-- Commentaire nettoyé -->
```

### Défilement synchronisé des documents

Par défaut, lorsqu'une comparaison est effectuée, le défilement
synchronisé des documents est actif.

Il est possible de le désactiver en utilisant le bouton correspondant
dans le bandeau de navigation.

### Correspondance des résultats

Cliquer sur un résultat renvoi à la ligne correspondant à cette
différence dans l'autre document.

```xml
<!-- Commentaire nettoyé -->
```

## Spécificités du mode comparaison

- Le mode vue multiple intègre un système de document courant, désigné
  par le dernier par lequel est passé la souris.
  
  C'est ce document qui est pris en compte pour la majorité des
  fonctionnalités : Annotations, Téléchargement, Impression, Recherche
  textuelle, Rotation de page ...

- Le changement de document à l'aide des vignettes du volet de
  navigation est désactivé.
  
  Seules les vignettes correspondant aux documents ouverts en mode
  comparaison permettent de changer de page au sein de celui-ci.

## Définir le focus de document par clic

Pour définir le focus de document par clic utilisé le paramètre :

    visualization.multiView.focusOnClick=true

## Le résultat de la comparaison d'images

Après le lancement de la comparaison d'images, une nouvelle vue s'affiche où
vous pouvez voir les deux images comparées, une boîte de configuration dans laquelle
vous pouvez modifier les valeurs de la "fuzz", la "highlight color" et la "lowlight color",
ainsi que le résultat de l'image.


```xml
<!-- Commentaire nettoyé -->
```

La comparaison d'images est basée sur des calculs mathématiques affectés
par la valeur du "fuzz". Plus la valeur du "fuzz" est élevée, moins le calcul
de comparaison de pixels est précis.

La valeur par défaut est 3 et est configurable avec la propriété suivante :


```cfg
# Setup the default image comparison tolerance value. Value between 0 and 100. Value in percentage.
visualization.image.comparison.default.fuzz=3
```


Par défaut, les différences sont les zones rouges (highlight color) et les pixels
qui ne sont pas considérés comme différents sont incolores (lowlight color).

Les couleurs sont configurables avec les propriétés suivantes :


```cfg
# Setup the default image comparison highlight color. Highlight for the pixels difference
visualization.image.comparison.default.highlight.color=#FF0000

# Setup the default image comparison lowlight color. Lowlight for the common pixels
visualization.image.comparison.default.lowlight.color=none
```

## Télécharger les documents avec les résultats

### Avec l'interface
Une fois la comparaison faite, un bouton est disponible pour le téléchargement des deux documents côte à côte avec les résultats de comparaison dessus.

```xml
<!-- Commentaire nettoyé -->
```

### Avec la servlet

Exemple d'URL permettant d'utiliser la servlet pour effectuer une comparaison puis le téléchargement des documents côte à côte avec les résultats de comparaison dessus.


```
http://<!-- Commentaire nettoyé -->&right="document_id_right"
```

## Autoriser le changement de document avec un défilement vertical

Par défaut, il est impossible de changer de document avec un défilement vertical lors d'une comparaison de document.
Il est possible de changer ce comportement et d'autoriser le changement de document avec un défilement vertical avec la configuration suivante :


```cfg
# Allow the vertical scrolling to change document while in multiview
visualization.multiView.allow.scroll.document.change=true
```

