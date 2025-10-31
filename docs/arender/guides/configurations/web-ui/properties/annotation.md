---
title: Annotations
---

## Généralités

| Description                                                             | Clé du paramètre                             | Valeur par défaut | Type    |
| ----------------------------------------------------------------------- | -------------------------------------------- | ----------------- | ------- |
| Mode de sauvegarde automatique                                          | annotation.autosave                          | false             | Booléen |
| Recharge automatiquement les annotations après sauvegarde               | annotation.autorefresh                       | true              | Booléen |
| Chargement des annotations existantes                                   | annotation.loadExisting                      | false             | Booléen |
| Affichage d'un GIF de chargement à la sauvegarde d'annotations          | annotation.loadingGIF                        | false             | Booléen |
| Recherche dans le contenu textuel des annotations                       | annotation.searchTextInAnnotations           | false             | Booléen |
| Autoriser la mise à jour des préférences d’annotation lors de l'édition | annotation.preferences.update.onEdit.enabled | false             |Booléen  |

## Autosave

| Description                                                                                     | Clé du paramètre                       | Valeur par défaut | Type    |
| ----------------------------------------------------------------------------------------------- | -------------------------------------- | ----------------- | ------- |
| La sauvegarde peut être déclenchée lors de l'utilisation de la création d'annotations répétable | annotation.autosave.repeatMode.enabled | false             | Booléen |
| Délai de la sauvegarde en millisecondes                                                         | annotation.autosave.timerDelay         | 1000              | Entier  |

## Note textuelle

| Description                                                                                                                              | Clé du paramètre                                   | Valeur par défaut | Type    |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------- | ------- |
| Opacité                                                                                                                                  | annotation.stickyNote.opacity                      | 1.0               | Décimal |
| Largeur minimum                                                                                                                          | annotation.stickyNote.minimum.width                | 250               | Entier  |
| Hauteur minimum                                                                                                                          | annotation.stickyNote.minimum.height               | 170               | Entier  |
| Couleur de fond                                                                                                                          | annotation.stickyNote.default.color                | #FFDD00           | Texte   |
| Couleur de police                                                                                                                        | annotation.stickyNote.default.fontColor            | #000000           | Texte   |
| Taille de police                                                                                                                         | annotation.stickyNote.default.fontSize             | 2                 | Entier  |
| Choix de police                                                                                                                          | annotation.stickyNote.default.font                 | Helvetica         | Texte   |
| Texte souligné                                                                                                                           | annotation.stickyNote.default.underline            | false             | Booléen |
| Texte gras                                                                                                                               | annotation.stickyNote.default.bold                 | false             | Booléen |
| Texte italique                                                                                                                           | annotation.stickyNote.default.italic               | false             | Booléen |
| Cacher la bordure                                                                                                                        | annotation.stickyNote.hide.border                  | true              | Booléen |
| Cacher les détails de la note textuelle                                                                                                  | annotation.stickyNote.hide.details                 | false             | Booléen |
| Cacher le bouton 'répondre' quand le texte est vide                                                                                      | annotation.stickyNote.can.hide.reply.button        | false             | Booléen |
| Les dimensions sont initialisées selon le zoom                                                                                           | annotation.stickyNote.according.to.zoom            | true              | Booléen |
| Le rapport hauteur champs d'édition / hauteur totale                                                                                     | annotation.stickyNote.content.edition.height.ratio | 0.7               | Décimal |
| Autoriser un lien entre le pin et la note textuelle                                                                                      | annotation.stickyNote.dotLink.enabled              | true              | Booléen |
| La taille du pin                                                                                                                         | annotation.stickyNote.pin.default.size             | 20                | Entier  |
| Le bouton pour répondre sera cacher quand la note textuelle est vide                                                                     | annotation.stickyNote.statusList.enabled           | true              | Booléen |
| Autoriser l'affichage des étiquettes : ALWAYS,HOVER,NEVER                                                                                | annotation.stickyNote.action.buttons               | HOVER             | Texte   |
| Autoriser l'affichage de la date                                                                                                         | annotation.stickyNote.show.date                    | true              | Booléen |
| Afficher les initials du créateur                                                                                                        | annotation.stickyNote.creator.name.initial.only    | true              | Booléen |
| INITIALS affiche les initiales du créateur dans l'épingle. INDEX affiche l'index de La notes textuelles                                  | annotation.stickyNote.pin.display.mode             | INITIALS          | Texte   |
| Les notes textuelles seront encadrées en bleu et le mode d'édition ne sera pas activé au clic sur l'icône de l'explorateur d'annotations | annotation.stickyNote.outline                      | false             | Booléen |

## Rectangle

| Description           | Clé du paramètre                          | Valeur par défaut | Type    |
| --------------------- | ----------------------------------------- | ----------------- | ------- |
| Opacité               | annotation.rectangle.opacity              | 0.7               | Décimal |
| Largeur minimum       | annotation.rectangle.minimum.width        | 30                | Entier  |
| Hauteur minimum       | annotation.rectangle.minimum.height       | 10                | Entier  |
| Couleur de fond       | annotation.rectangle.default.color        | #EAF39C           | Booléen |
| Couleur de la bordure | annotation.rectangle.default.border.color | #EAF39C           | Texte   |
| Taille de la bordure  | annotation.rectangle.default.border.width | 0                 | Entier  |

## Cercle

| Description           | Clé du paramètre                       | Valeur par défaut | Type    |
| --------------------- | -------------------------------------- | ----------------- | ------- |
| Opacité               | annotation.circle.opacity              | 0.7               | Décimal |
| Largeur minimum       | annotation.circle.minimum.width        | 30                | Entier  |
| Hauteur minimum       | annotation.circle.minimum.height       | 10                | Entier  |
| Couleur de fond       | annotation.circle.default.color        | #EAF39C           | Booléen |
| Couleur de la bordure | annotation.circle.default.border.color | #EAF39C           | Texte   |
| Taille de la bordure  | annotation.circle.default.border.width | 0                 | Entier  |

## Texte surligné, souligné et barré

| Description                              | Clé du paramètre                            | Valeur par défaut | Type    |
| ---------------------------------------- | ------------------------------------------- | ----------------- | ------- |
| Opacité                                  | annotation.highligthtext.opacity            | 0.7               | Décimal |
| Couleur de fond                          | annotation.highlighttext.default.color      | #EAF39C           | Texte   |
| Ratio longueur rature (souligner, barré) | annotation.highlighttext.strike.width.ratio | 0.1               | Décimal |

## Masquage

| Description                          | Clé du paramètre            | Valeur par défaut | Type    |
| ------------------------------------ | --------------------------- | ----------------- | ------- |
| Autorisation de cacher les masquages | annotation.can.hide.redact  | false             | Booléen |
| Protéger les masquages               | toolbar.redact.locked       | false             | Booléen |

## Polygone

| Description           | Clé du paramètre                    | Valeur par défaut | Type    |
| --------------------- | ----------------------------------- | ----------------- | ------- |
| Opacité               | annotation.polygon.opacity          | 0.7               | Décimal |
| Couleur de fond       | annotation.polygon.backgroundColor  | #2A4869           | Entier  |
| Largeur de la bordure | annotation.polygon.width            | 2.0f              | Décimal |
| Couleur de la bordure | annotation.polygon.borderColor      | #2A4869           | Décimal |


## Ligne connecté

| Description           | Clé du paramètre                     | Valeur par défaut | Type    |
| --------------------- | ------------------------------------ | ----------------- | ------- |
| Opacité               | annotation.polyline.opacity          | 1                 | Décimal |
| Couleur de fond       | annotation.polyline.backgroundColor  | #2A4869           | Entier  |
| Largeur de la bordure | annotation.polyline.width            | 2.0f              | Décimal |

## Main levée

| Description           | Clé du paramètre                | Valeur par défaut | Type    |
| --------------------- | ------------------------------- | ----------------- | ------- |
| Opacité               | annotation.ink.opacity          | 1                 | Décimal |
| Couleur de fond       | annotation.ink.backgroundColor  | #2A4869           | Entier  |
| Largeur de la bordure | annotation.ink.width            | 2.0f              | Décimal |

## Flèche

| Description                                                                                              | Clé du paramètre                          | Valeur par défaut | Type                               |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------------- | ---------------------------------- |
| Couleur de fond                                                                                          | annotation.arrow.backgroundColor          | #2A4869           | Texte  (format RGB ou hexadécimal) |
| Mode règle                                                                                               | annotation.arrow.computeDistance          | false             | Booléen                            |
| Taille minimale de la tête de flèche                                                                     | annotation.arrow.minimal.head.size        | -1                | Entier (-1 pour désactiver)        |
| Distance par défaut entre la tête et la queue (axe X)                                                    | annotation.arrow.x.defaultDistance        | 12                | Entier                             |
| Distance par défaut entre la tête et la queue (axe Y)                                                    | annotation.arrow.y.defaultDistance        | 12                | Entier                             |
| Opacité                                                                                                  | annotation.arrow.opacity                  | 1.0               | Décimal                            |
| Largeur de la bordure                                                                                    | annotation.arrow.border.width             | 4.0               | Décimal                            |
| Type tête : NONE, SQUARE, CIRCLE, DIAMOND, OPEN_ARROW, CLOSED_ARROW, BUTT, R_OPEN_ARROW, R_CLOSED_ARROW  | annotation.arrow.head.type                | OPEN_ARROW        | Texte                              |
| Type queue : NONE, SQUARE, CIRCLE, DIAMOND, OPEN_ARROW, CLOSED_ARROW, BUTT, R_OPEN_ARROW, R_CLOSED_ARROW | annotation.arrow.tail.type                | NONE              | Texte                              |
| Définir un degré de précision pour la mesure affichée par la flèche                                      | annotation.arrow.distance.degree.accuracy | 0.01              | Décimal                            |

## Flèche avec mesure

| Description                                                                                              | Clé du paramètre                          | Valeur par défaut | Type                               |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------------- | ---------------------------------- |
| Couleur de fond                                                                                          | annotation.arrow.backgroundColor          | #2A4869           | Texte  (format RGB ou hexadécimal) |
| Taille minimale de la tête de flèche                                                                     | annotation.arrow.minimal.head.size        | -1                | Entier (-1 pour désactiver)        |
| Distance par défaut entre la tête et la queue (axe X)                                                    | annotation.arrow.x.defaultDistance        | 12                | Entier                             |
| Distance par défaut entre la tête et la queue (axe Y)                                                    | annotation.arrow.y.defaultDistance        | 12                | Entier                             |
| Opacité                                                                                                  | annotation.arrow.opacity                  | 1.0               | Décimal                            |
| Largeur de la bordure                                                                                    | annotation.arrow.border.width             | 4.0               | Décimal                            |
| Type tête : NONE, SQUARE, CIRCLE, DIAMOND, OPEN_ARROW, CLOSED_ARROW, BUTT, R_OPEN_ARROW, R_CLOSED_ARROW  | annotation.arrow.measurement.head.type    | BUTT              | Texte                              |
| Type queue : NONE, SQUARE, CIRCLE, DIAMOND, OPEN_ARROW, CLOSED_ARROW, BUTT, R_OPEN_ARROW, R_CLOSED_ARROW | annotation.arrow.measurement.tail.type    | BUTT              | Texte                              |
| Définir un degré de précision pour la mesure affichée par la flèche                                      | annotation.arrow.distance.degree.accuracy | 0.01              | Décimal                            |

## Affichage de la date

| Description                                                                | Clé du paramètre                                 | Valeur par défaut | Type    |
| -------------------------------------------------------------------------- | ------------------------------------------------ | ----------------- | ------- |
| Affiche la date de manière humanisée dans les commentaires et sticky notes | annotation.date.display.humanizedDate.enabled    | false             | Booléen |
| Affiche la date de création dans les commentaires et sticky notes          | annotation.date.display.creationDate             | true              | Booléen |

## L'explorateur de commentaire


| Description                                                            | Clé du paramètre                                              | Valeur par défaut | Type    |
| ---------------------------------------------------------------------  | ------------------------------------------------------------- | ----------------- | ------- |
| L'ordre d'apparition des commentaires dans le panneau d'exploration    | annotation.comment.explorer.sortByIncrementDate               | false             | Booléen |
| Filtre également les annotations sur la vue de la page                 | annotation.comment.explorer.filterPageAnnotations             | true              | Booléen |
| Initialiser l'explorateur d'annotation à droite                        | annotation.comment.explorer.eastSide.enabled                  | false             | Booléen |
| Ouvrir l'explorateur d'annotation quand une annotation est éditée      | annotation.comment.explorer.openOnEdit                        | false             | Booléen |
| Animer tout en étendant l'explorateur d'annotations                    | annotation.comment.explorer.animate.on.expand                 | true              | Booléen |
| Afficher une liste simplifier de tous les auteurs                      | annotation.comment.explorer.showAllAnnotators                 | true              | Booléen |
| Afficher le nombre total d'annotations                                 | annotation.comment.explorer.showTotalAnnotationsNumber        | false             | Booléen |
| Afficher l'explorateur d'annotations au démarrage                      | annotation.comment.explorer.showAtStartup                     | false             | Booléen |
| Autoriser l'affichage des annotations en une seule ligne               | annotation.comment.explorer.inline.enabled                    | false             | Booléen |
| Afficher les annotations dans l'explorateur d'annotations en une ligne | annotation.comment.explorer.show.annotation.minimized.on.open | false             | Booléen |
| Autoriser l'affichage de la date                                       | annotation.comment.explorer.show.date                         | true              | Booléen |
| Afficher uniquement les initiales des noms des créateurs               | annotation.comment.explorer.creator.name.initial.only         | false             | Booléen |
| Autoriser à afficher une seule annotation par page                     | annotation.comment.explorer.show.one.annotation.only          | false             | Booléen |

## Le champs de texte dans les commentaires et sticky notes

Cette partie est commune aux commentaires ainsi qu'aux sticky notes.

| Description                                          | Clé du paramètre                        | Valeur par défaut | Type    |
| ---------------------------------------------------- | --------------------------------------- | ----------------- | ------- |
| Active l'entrée en mode édition par un double clique | annotation.richtext.edition.doubleClick | false             | Booléen |

## Popup d'information

Cette partie concerne l'affichage d'une popup présentant les
informations d'une annotation à son survol avec la souris. Cette
fonctionnalité a été introduite afin de permettre la consultation des
informations d'annotations qui ne sont pas éditables.


| Description                                               | Clé du paramètre                       | Valeur par défaut | Type    |
| --------------------------------------------------------- | -------------------------------------- | ----------------- | ------- |
| Activer / désactiver l'affichage de la popup              | annotation.info.popup.enabled          | true              | Booléen |
| Afficher la popup même si l'annotation est éditable       | annotation.info.popup.evenIfEditable   | false             | Booléen |
| Afficher les informations liées à la dernière mise à jour | annotation.info.popup.displayUpdate    | false             | Booléen |

### Chargement des annotations par page

Si le connecteur le supporte par le biais de l'interface
*AnnotationPageAccessor*, les annotations peuvent être chargées par page
en version 3.1.0 et supérieur.

Voici le paramètre à employer afin d'activer le chargement par page:

- annotation.loadPerPage=true

La signature de cette interface est la suivante:

``` java
List<Annotationget(int page) throws AnnotationsNotSupportedException, AnnotationCredentialsException, InvalidAnnotationFormatException;
```

Il reste alors au connecteur de faire le travail de cache/accès buffer
aux annotations afin de fournir à la  Web-UI les bonnes annotations.

## Utilisation du stockage local

L'utilisation du stockage local pour des propriétés d'annotations peut être rendu possible avec la propriété ci-dessous.
Son activation ne permet pas d'utiliser les modifications de certaines propriétés à la volée comme l'utilisation de profils.

| Description                   | Clé du paramètre             | Type    |
| ------------------------------| ---------------------------- | ------- |
| Utilisation du stockage local | annotation.use.local.storage | Booléen |