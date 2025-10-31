---
title: Accessibilité
---

Depuis la version 4.5, une meilleure accessibilité à l'utilisation d'ARender par des personnes ayant des problèmes de vision est disponible.

## Lecture du contenu

Le contenu des documents peut être lu grâce à des lecteurs d'écrans. 

Pour le permettre, il a été ajouté dans des balises à l'intérieur du DOM. Ces balises sont utilisables par les logiciels et par les extensions permettant la lecture d'écran. 

Par exemple, quand vous utilisez [l'extension Screen Reader de Google Chrome](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn), lorsque vous double cliquez sur la page d'un document, l'extension va lire le contenu de cette page. 

## Texte alternatif

Les images porteuses d'informations possèdent un texte alternatif avec l'attribut CSS `alt=` qui permet à des applications tierces de lire avec une voix synthétique pour que l'utilisateur sache si une action est possible en cliquant dessus ou bien si l'icône informe de quelques chose.

Liste des images et icônes possédant une représentation alternative d’une image sous forme de texte :

- Les boutons de la barre de menu
- L'explorateur des annotations
- Les onglets du panneaux latéral
- Les icônes se trouvant dans le panneau de navigation
- Les miniatures des pages des documents
- Les icônes des annotations Note textuelle


## Les notifications

Il est possible de modifier le temps d'affichage des popups de notifications. 

| Propriété                    | Description                                                                      | Valeur par défaut |
| ---------------------------- | -------------------------------------------------------------------------------- | ----------------- |
| toaster.toast.timeout        | Configure le délai d'attente pour que les notifications soient masquées (en ms)  | 2000              |


Modifier la valeur par défaut par la valeur *0* permet d'avoir accès aux éléments de la notification avec la tabulation. 


```cfg
toaster.toast.timeout=0
```


De ce fait, il est possible de fermer ou réinitialiser le panneau des notifications.


Elles possèdent l'attribut `role = alert`. Cela permet au lecteur d'écran d'informer l'utilisateur qu'une notification est apparue.


## Navigation avec le clavier

### Utilisation

Il est possible de naviguer dans ARender grâce à la touche de tabulation. Lorsqu'un élément est mis en évidence par la touche 'tabulation', un contour bleu apparaît autour de celui-ci.
 
Les déplacements de gauche à droite s'effectuent avec la touche *tab*. A l'inverse les déplacements de droite à gauche s'effectuent avec les touches *shift + tab*.

Les éléments concernés sont : 
- Les boutons du bandeau du haut
- Les sous-menus 
- Les boutons de navigations 
- Les vignettes
- Les boutons de gestions des signets
- Les boutons de la recherche avancée
- Les éléments de l'explorateur d'hyperliens
- Les boutons du bandeau d'édition
- Les sélecteurs de couleurs
- Les pop-up 
- Les champs de saisie


La navigation de certains éléments ne fonctionne pas de la même manière : 

- Navigation avec les flèches :
    - Les listes déroulantes
    - Les signets
    - Les boutons radio du même groupe 
    - Les boutons à cocher du même groupe 

- *Ctrl + entré* :
    pour entrer dans les zones de texte :
    - Annotation texte libre 
    - Notes textuelles


### Le design 

Pour paramétrer le visuel de l'élément mis en évidence à vos besoin, les classes CSS suivantes doivent être modifiées :  

```xml
<!-- Commentaire nettoyé -->
```

```css
:focus-visible,
button:focus,
select:focus,
[type="checkbox"]:focus-visible+label,
[type="radio"]:focus-visible+label {

}

.simple-outline:focus-visible,
button:focus,
select:focus {

}
```


## Problèmes de perception des couleurs 

De nouveaux styles ont été ajoutés pour permettre aux personnes atteintes de deutéranopie, de protanopie ou de tritanopie d'avoir des couleurs accordées à leurs besoins.

Chacun de ces troubles de la perception des couleurs possède son propre style. Il est possible de modifier l'aspect du produit grâce à la propriété suivante et l'une des valeurs attribuée: 

| Description                                                                                                                                     | Clé du paramètre        | Valeur par défaut | Type    |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------- | ------- |
| Changer le thème. Ne fonctionne pas sur Internet Explorer. Valeur autorisée : LEGACY, DARK, LIGHT, CUSTOM, DEUTERANOPIA, PROTANOPIA, TRITANOPIA | preference.color.mode   | LEGACY            | Texte   |



Si vous souhaitez modifier l'une des couleurs, il est possible de changer la valeur de la variable associée dans l'une des classes CSS suivante :

```xml
<!-- Commentaire nettoyé -->
```

```css
.deuteranopia-theme {

}

.protanopia-theme { 

}

.tritanopia-theme {

}
```

