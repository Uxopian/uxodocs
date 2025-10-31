---
title: Hyperliens
---

## Description 
Les hyperliens sont visibles sur les documents chargés dans ARender. En cliquant dessus, vous pouvez accéder à un autre contenu. 
Vous aurez besoin d’un texte source qui sera le texte sélectionné et qui sera cliquable, et d’une cible.

## Utilisations 

Pour permettre la création d'hyperliens, surlignez du texte, le bouton *Créer un lien* apparaîtra alors.
En cliquant dessus, un menu demandera de sélectionner une page ou de fournir une URL.

```xml
<!-- Commentaire nettoyé -->
```

Pour sélectionner la page, changez simplement la page depuis le navigateur de documents et appuyez sur le bouton *OK*.

Pour fournir une URL, entrez l'URL souhaitée dans la zone de texte et appuyez sur le bouton *OK*.

Pour créer un hyperlien vers une zone, cliquez sur le bouton *Créer un lien vers une zone*.

```xml
<!-- Commentaire nettoyé -->
```

La fenêtre contextuelle ci-dessous apparaît permettant la sélection de la zone cible.

```xml
<!-- Commentaire nettoyé -->
```

Pour modifier le texte source d'un lien hypertexte, cliquez sur le bouton d'édition (icone de crayon) dans le panneau 
source du lien hypertexte souhaité dans l'explorateur d'hyperliens.

```xml
<!-- Commentaire nettoyé -->
```

La source peut être modifiée en sélectionnant un nouveau texte et en appuyant sur le bouton *OK*.

Pour modifier la cible, cliquez sur le bouton d'édition (icone de crayon) dans le panneau cible.

```xml
<!-- Commentaire nettoyé -->
```

Il est alors demandé de sélectionner l'option souhaitée : 
- *sélectionner la page*
- *sélectionner la zone* 
- *saisir votre URL*


## Explorateur d’hyperliens

Les hyperliens sont visibles dans l’explorateur d’hyperlien. Par défaut, il est activé.


```cfg
hyperlinkexplorer.enabled=true
```


```xml
<!-- Commentaire nettoyé -->
```

Il permet de voir pour chaque hyperlien : 

* le nom du créateur 
* la date
* le texte source
* le document source
* la cible 

```xml
<!-- Commentaire nettoyé -->
```


Plusieurs options d’affichage vous sont mises à disposition : 

| Propriété                                                   | Description                                                                  | Valeur par défaut |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------- |
| annotation.date.display.creationDate                        | Affiche la date de création sinon la date de la dernière modification        | true              |
| annotation.comment.explorer.show.date                       | Active l'affichage de la date                                                | true              |
| annotation.comment.explorer.creator.name.initial.only       | Affiche les initiales du créateur                                            | false             |
| toolbar.securityList.checkOwner                             | Active la liste de sécurité pour les annotations de l'utilisateur courant    | true              |
| annotation.date.display.humanizedDate.enabled               | Affiche la date humanisée                                                    | false             |



### Filtrer les hyperliens

A partir de l’explorateur des hyperliens il est possible d’appliquer un filtre. Pour cela, vous pouvez utiliser le bandeau en haut de l'explorateur dédié aux filtres et aux tris. 

```xml
<!-- Commentaire nettoyé --> 
```


Plusieurs options de filtre sont disponibles :
* par document
* par créateur
* par date
* par utilisateur courant

Vous pouvez également utiliser les boutons de filtres mis à disposition dans l'explorateur d'hyperlien. 

Un pour filtrer en fonction du nom de l’utilisateur. Il apparaît au survol du nom de l'utilisateur.

```xml
<!-- Commentaire nettoyé --> 
```


Quand ce filtre est activé, il devient bleu. Pour le désactiver, il suffit de cliquer une nouvelle fois dessus.

```xml
<!-- Commentaire nettoyé -->
```


Le deuxième filtre pour filtrer en fonction de la date. Il apparaît au survol de la date (uniquement si celle-ci est affichée).

```xml
<!-- Commentaire nettoyé --> 
```


Lui aussi est bleu quand il est activé. Pour le désactiver, il suffit de cliquer une nouvelle fois dessus.

```xml
<!-- Commentaire nettoyé --> 
```

## Liens entre documents

La fonctionnalité *docLink* permet de créer des hyperliens entre documents. 
Elle peut être activée via une propriété dédiée dans le fichier de 
configuration.

```xml
<!-- Commentaire nettoyé -->
```

```cfg
topPanel.docLink=true
```


Une fois activée, un bouton dédié apparaît dans le panneau supérieur.

```xml
<!-- Commentaire nettoyé -->
```

Il est également possible d'activer automatiquement la fonctionnalité au chargement du document en utilisant la propriété suivante :

```xml
<!-- Commentaire nettoyé -->
```

```cfg
topPanel.docLink.activateOnStartup=true
```


### Activation

Deux options sont disponibles via un menu déroulant :
- Lien texte bleu : Style classique d’hyperlien, avec un texte cliquable en bleu.
- Lien cadre bleu : Le texte cliquable est entouré d’un cadre bleu.

Lorsqu’elle est activée, la fonctionnalité docLink affiche les documents côte à 
côte en mode multi-vue.
Le document de gauche représente la source de l'hyperlien et le document de 
droite représente la cible.
Dans un premier temps, du texte doit être séléctionné dans le document source, 
le document cible est ainsi désactivé et le curseur passe en mode de sélection 
de texte. 

Le cas générique consiste en une ouverture de deux documents dans ARender, 
ceux-ci apparaissent dans la multi-vue, des cas plus spécifiques sont également
pris en charge : 

- Document unique :
  Le même document est ouvert deux fois dans la multi-vue, côte à côte.
- Avec trois documents ou plus : 
  Seuls les deux premiers documents sont affichés côte à côte avec une
  restriction empêchant de changer de document.
- En mode multi-vue ou mode comparaison activé :
  Les documents restent en place, le mode docLink ajuste automatiquement 
  l’affichage avec la désactivation du document cible et le nettoyage des 
  résultats de comparaison pour permettre la création de lien.

### Création 

Une fois le mode docLink activé, une sélection de texte doit être effectuée sur
le document source.
Après cela, le document source devient désactivé et le document cible est activé
pour définir la cible de l'hyperlien.

Un clic sur une position dans le document cible crée immédiatement l’hyperlien 
et les documents reviennent à leur état initial.

Si la propriété *ui.legacy.enabled=false* est utilisée, il est possible de 
cliquer directement sur une vignette pour créer un hyperlien au niveau de la 
page entière, au lieu d’une position précise.

### Désactivation 

En cliquant sur le bouton docLink ou en appuyant sur ÉCHAP, le mode docLink est 
désactivé. Avec une source sélectionnée, une alerte s’affiche pour avertir 
l’utilisateur de l’abandon du processus de création de l’hyperlien.
