---
title: Hyperliens
---

## Généralités

Les propriétés suivantes doivent être mises dans le fichier *configurations/arender-custom-client.properties* si les valeurs doivent être modifiée.

- Key: hyperlinks
  
    | Description                                                    | Clé du paramètre         | Type    |
    | -------------------------------------------------------------- | ------------------------ | ------- |
    | Charger les URLs des hyperliens dans le fenêtre ARender        | hyperlinks.loadInARender | Booléen |
    | Charger les hyperliens contenus dans les documents             | hyperlinks.loadFromPDF   | Booléen |
    | Affiche le contour bleu autour des hyperliens                  | hyperlinks.displayFrame  | Booléen |
    | Autoriser les hyperliens ayant des cibles internes au document | hyperlinks.load.internal | Booléen |
    | Autoriser les hyperliens ayant des cibles externes au document | hyperlinks.load.external | Booléen |

Ces paramètres permettent d'influencer sur le comportement associé avec
les hyperliens internes, stockés dans les documents sources. Si vous ne
voulez pas que les hyperliens soient cliquable ou visibles, utilisez le
paramètre *hyperlinks.loadFromPDF=false*.

## Annotation

Les propriétés suivantes customisent la création d'annotation d'hyperliens :

- Key: annotation.hyperlink

  | Description                                                                                                                                    | Clé du paramètre                            | Type    |
  | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------- |
  | Opacité de l'annotation d'hyperlien                                                                                                            | annotation.hyperlink.opacity                | Décimal |
  | Couleur de l'annotation d'hyperlien                                                                                                            | annotation.hyperlink.default.color          | Texte   |
  | Authorise la cible de l'hyperlien d'être un document externe                                                                                   | annotation.hyperlink.externe.target.enabled | Booléen |
  | Définit la limitation de temps (en ms) pour afficher les éléments cibles de l'hyperlien                                                        | annotation.hyperlink.target.show.timeout    | Entier  |
  | Active l'ancienne création de l'hyperlien. Si à vrai, la page cible commence à partir de l'index 1, sinon elle commence à partir de l'index 0. | annotation.hyperlink.use.legacy.creation    | Booléen |
  | Si la valeur est 'true' alors cliquer sur un lien hypertexte menant à un autre document ouvrira ce document dans un nouvel onglet.             | annotation.hyperlink.open.document.tab      | Booléen |


```cfg

annotation.hyperlink.opacity=0.5f
annotation.hyperlink.default.color=#0000FF
annotation.hyperlink.externe.target.enabled=true
annotation.hyperlink.target.show.timeout=10000
annotation.hyperlink.use.legacy.creation=false
annotation.hyperlink.open.document.tab=true

```

