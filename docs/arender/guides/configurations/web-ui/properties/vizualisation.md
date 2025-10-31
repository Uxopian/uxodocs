---
title: Visualisation
---

## Généralités


| Description                                     | Clé du paramètre                    | Valeur par défaut | Type    |
| ----------------------------------------------- | ----------------------------------- | ----------------- | ------- |
| Mode de visualisation : Simple, BookMode        | visualization.mode                  | Simple            | Texte   |
| Activation du plein écran au démarrage          | visualization.fullscreen            | false             | Booléen |
| Activation de la sauvegarde de rotation de page | visualization.rotation.save.enabled | false             | Booléen |
| Lecture automatique des vidéos                  | visualization.video.autoplay        | true              | Booléen |



## Recharger 

| Description                                                                                                                                                            | Clé du paramètre                                 | Valeur par défaut | Type    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------- | ------- |
| Rechargez les images de qualité inférieure une fois que la qualité supérieure a été récupérée (chargez toujours la taille parfaite ou économisez de la bande passante) | visualization.reload.lower.quality               | false             | Booléen |
| Différence entre l'ancienne largeur d'image et la nouvelle largeur d'image. Rechargez l'image si la différence est supérieure à cette valeur.                          | visualization.reload.minimum.width.change        | 0.1               | Entier  |
| Différence entre l'ancienne largeur d'image et la nouvelle largeur d'image sur mobile. Recharger l'image si la différence est supérieure à cette valeur                | visualization.reload.minimum.width.change.mobile | 200.0             | Entier  |


## Zoom


| Description                                                                   | Clé du paramètre                    | Valeur par défaut | Type          |
| ----------------------------------------------------------------------------- | ----------------------------------- | ----------------- | ------------- |
| Type de zoom : Default, FullWidth, FullHeight, In, Out, Custom, FullPage      | visualization.zoom.type             | FullWidth         | Texte         |
| Valeur de zoom (en %)                                                         | visualization.zoom.value            | 100               | Entier        |
| Activation de l'animation de zoom                                             | visualization.zoom.animation        | false             | Booléen       |
| Zoom selon la plus grande page (largeur ou hauteur). Sinon à la première page | visualization.zoom.by.biggest.page  | true              | Boolean       |
| Valeur de zoom personnalisée                                                  | visualization.zoom.step             | 0.1               | Décimal       |


## Changement de page


| Description                                     | Clé du paramètre                          | Valeur par défaut | Type    |
| ----------------------------------------------- | ----------------------------------------- | ----------------- | ------- |
| Changement de page au *scroll* de la souris     | visualization.pageChange.mouse            | false             | Booléen |
| Activation de l'animation au changement de page | visualization.pageChange.animation        | false             | Booléen |


**Utilisable uniquement quand visualization.bookMode=true**

| Description                                 | Clé du paramètre                     | Valeur par défaut | Type    |
| ------------------------------------------- | ------------------------------------ | ----------------- | ------- |
| Activation des coins de page                | visualization.pageCorner.enabled     | false             | Booléen |
| Activation de l'animation des coins de page | visualization.pageCorner.animation   | false             | Booléen |

## Règle

| Description            | Clé du paramètre                     | Valeur par défaut | Type    |
| ---------------------- | ------------------------------------ | ----------------- | ------- |
| Activation de la règle | visualization.guideRuler.enabled     | false             | Booléen |
| Hauteur de la règle    | visualization.guideRuler.height      | 10                | Entier  |
| Pas de la règle        | visualization.guideRuler.increment   | 10                | Entier  |

## Vue multi-document


| Description                                                        | Clé du paramètre                         | Valeur par défaut | Type    |
| ------------------------------------------------------------------ | ---------------------------------------- | ----------------- | ------- |
| Activation de la vue multi-document                                | visualization.multiview.enabled          | true              | Booléen |
| Orientation de la vue multi-document  : vertical , horizontal      | visualization.multiview.direction        | vertical          | Texte   |
| Activation de la comparaison des documents                         | visualization.multiview.doComparison     | false             | Booléen |
| Affichage de la vue multi-document au démarrage                    | visualization.multiview.showOnStart      | false             | Booléen |
| Synchronisation du *scroll* entre les deux vues                    | visualization.multiview.synchronized     | true              | Booléen |
| Activation du focus de document par clic                           | visualization.multiview.focusOnClick     | false             | Booléen |
| Configuration du temps mis pour cacher le panneau de modifications | visualization.multiview.header.timeoutMs | 5000              | Entier  |


## Notifications

### Général

| Description                                                      | Clé du paramètre            | Valeur par défaut | Type           |
| ---------------------------------------------------------------- | --------------------------- | ----------------- | -------------- |
| Temps d'affichage de la notification avant disparition (en ms)   | toaster.toast.timeout       | 2000              | Entier         |
| Affiche la notification la plus récente en haut de la pile       | toaster.toast.newestOnTop   | true              | Booléen        |

### Severe

| Description                                                      | Clé du paramètre            | Valeur par défaut | Type           |
| ---------------------------------------------------------------- | --------------------------- | ----------------- | -------------- |
| Activation des notifications pour le niveau severe               | toaster.log.severe.enabled  | true              | Booléen        |
| Disparition de la notification automatique pour le niveau severe | toaster.log.severe.autoHide | false             | Booléen        |

### Warning

| Description                                                      | Clé du paramètre             | Valeur par défaut | Type           |
| ---------------------------------------------------------------- | ---------------------------  | ----------------- | -------------- |
| Activation des notifications pour le niveau warning              | toaster.log.warning.enabled  | true              | Booléen        |
| Disparition de la notification automatique pour le niveau warning| toaster.log.warning.autoHide | true              | Booléen        |

### Info

| Description                                                       | Clé du paramètre            | Valeur par défaut | Type           |
| ----------------------------------------------------------------- | --------------------------- | ----------------- | -------------- |
| Activation des notifications pour le niveau info                  | toaster.log.info.enabled    | true              | Booléen        |
| Disparition de la notification automatique pour le niveau info    | toaster.log.info.autoHide   | true              | Booléen        |

### Config
| Description                                                      | Clé du paramètre            | Valeur par défaut | Type           |
| ---------------------------------------------------------------- | --------------------------- | ----------------- | -------------- |
| Activation des notifications pour le niveau config               | toaster.log.config.enabled  | false             | Booléen        |
| Disparition de la notification automatique pour le niveau config | toaster.log.config.autoHide | true              | Booléen        |

### Fine
| Description                                                      | Clé du paramètre            | Valeur par défaut | Type           |
| ---------------------------------------------------------------- | --------------------------- | ----------------- | -------------- |
| Activation des notifications pour le niveau fine                 | toaster.log.fine.enabled    | false             | Booléen        |
| Disparition de la notification automatique pour le niveau fine   | toaster.log.fine.autoHide   | true              | Booléen        |

### Finer 
| Description                                                      | Clé du paramètre            | Valeur par défaut | Type           |
| ---------------------------------------------------------------- | --------------------------- | ----------------- | -------------- |
| Activation des notifications pour le niveau finer                | toaster.log.finer.enabled   | false             | Booléen        |
| Disparition de la notification automatique pour le niveau finer  | toaster.log.finer.autoHide  | true              | Booléen        |

### Finest

| Description                                                      | Clé du paramètre            | Valeur par défaut | Type           |
| ---------------------------------------------------------------- | --------------------------- | ----------------- | -------------- |
| Activation des notifications pour le niveau finest               | toaster.log.finest.enabled  | false             | Booléen        |
| Disparition de la notification automatique pour le niveau finest | toaster.log.finest.autoHide | true              | Booléen        |
