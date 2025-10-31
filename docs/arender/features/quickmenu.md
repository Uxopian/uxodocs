---
title: Menu rapide
---

## Description

Le menu rapide est un menu contextuel qui apparait à la fin d'une sélection de texte. 
Ce menu est positionné en dessous du texte et va permettre d'exécuter des actions sur le texte.

Ce menu est désactivable avec la configuration suivante : 

```cfg
# Activates ARender quick contextual menu when text is selected
quick.contextual.menu.enabled=false
```


```xml
<!-- Commentaire nettoyé -->
```

## Actions

### Création d'annotations

Les annotations nécessitant une sélection de texte possèdent leur bouton de création dans le menu rapide.
Le menu rapide supporte l'ajout des annotations suivantes : 
- surlignage
- soulignage
- barré
- biffure (Si l'utilisateur à les droits d'ajout)
- hyperlien 

Chaque bouton est activé par défaut. Vous pouvez désactiver individuellement les boutons avec les configurations suivantes : 

```cfg
# Enables a textual highlight annotation creation option for the quick contextual menu
quick.contextual.menu.hasHighlightText=false

# Enables a strike through annotation creation option for the quick contextual menu
quick.contextual.menu.hasStrikeoutText=false

# Enables an underline annotation creation option for the quick contextual menu
quick.contextual.menu.hasUnderlineText=false

# Enables a hyperlink creation option for the quick contextual menu
quick.contextual.menu.hasHyperlink=false

# Enables a hyperlink area creation option for the quick contextual menu
quick.contextual.menu.hasHyperlinkZone=false

# Enables a redact annotation creation option for the quick contextual menu
quick.contextual.menu.hasRedactText=false
```



### Copie de texte

Un bouton pour copier le texte sélectionné est activé par défaut.
Ce bouton est désactivable avec la configuration suivante : 


```cfg
# Enables a copy selected text option for the quick contextual menu
quick.contextual.menu.hasCopyText=false
```

