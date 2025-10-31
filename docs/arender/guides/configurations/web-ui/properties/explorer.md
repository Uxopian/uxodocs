---
title: Navigateur de document
---

## Généralités

Le navigateur de document est, par défaut, ouvert sur l'explorateur de vignettes. L'utilisateur peut naviguer entre les différents panneaux en cliquant sur l'icon correspond. Il peut également fermer le navigateur de document en cliquant sur l'icône du panneau déjà ouvert.

| Description                                                                  | Clé du paramètre                      | Valeur par défaut | Type   |
| ---------------------------------------------------------------------------- | ------------------------------------- | ----------------  | ------ |
| Largeur du navigateur de document (en pixels)                                | documentnavigator.width               | 320               | Entier |
| Largeur du navigateur de recherches (en pixels)                              | documentnavigator.search.width        | 400               | Entier |
| Largeur du navigateur d'annotations (en pixels)                              | documentnavigator.annotation.width    | 400               | Entier |
| Le temps d'affichage des poignées du séparateur (déprécié en v.4.7.0, en ms) | documentnavigator.ears.hideTimerDelay | 100               | Entier |
| Position du séparateur à l'ouverture (Default, Reduced, Expanded)            | documentnavigator.initialWidth        | Default           | Texte  |
| Configurer le ratio à appliquer au navigateur de documents                   | documentnavigator.expand.reduce.ratio | 70                | Entier |

## Explorateur de vignettes

Le tableau ci-dessous présente la configuration générale de cet
explorateur.


| Description                                                                  | Clé du paramètre                              | Valeur par défaut | Type          |
| ---------------------------------------------------------------------------- | --------------------------------------------- | ----------------- | ------------- |
| Activation/désactivation de cet explorateur                                  | thumbexplorer.enabled                         | true              | Booléen       |
| Indentation entre un document fils et son père (en pixels)                   | thumbexplorer.indentation                     | 20                | Entier        |
| Niveau de profondeur de sous documents à charger                             | thumbexplorer.maxLevelToLoad                  | 10                | Entier        |
| Activation/désactivation de l'affichage de métadonnées                       | thumbexplorer.metadata                        | true              | Booléen       |
| Permet aux titres des vignettes d'avoir un contenu HTML                      | thumbexplorer.title.allowHTML                 | false             | Booléen       |
| Les vignettes afficheront une popup avec les métadonnées du document (en ms) | thumbexplorer.layout.loading.delay            | 5                 | Entier        |
| Permet de créer une ancre URL vers une page à partir des vignettes           | thumbexplorer.contextualMenu.createPageAnchor | true              | Booléen       |



Le tableau ci-dessous présente la configuration liée aux vignettes.


| Description                                                                           | Clé du paramètre                     | Valeur par défaut | Type   |
| ------------------------------------------------------------------------------------- | ------------------------------------ | ----------------- | ------ |
| Largeur des vignettes (en pixels)                                                     | thumbexplorer.thumb.width            | 100               | Entier |
| Marge entre chaque vignette (en pixels)                                               | thumbexplorer.thumb.margin           | 5                 | Entier |
| Largeur de l'explorateur à partir de laquelle les vignettes s'élargissent (en pixels) | thumbexplorer.thumb.grow.min         | 300               | Entier |
| Incrément d'élargissement des vignettes (en pixels)                                   | thumbexplorer.thumb.grow.increment   | 10                | Entier |
| Configurer le ratio de croissance correspondant à la croissance du panel              | thumbexplorer.thumb.grow.ratio       | 1                 | Entier |




## Explorateur d'annotations


| Description                                                                                                           | Clé du paramètre                                              | Valeur par défaut | Type    |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------- | ------- |
| Activation de l'affichage de l'onglet de l'explorateur                                                                | annotation.comment.explorer.enabled                           | true              | Booléen |
| Possibilité d’afficher les annotations au format réduit                                                               | annotation.comment.explorer.inline.enabled                    | false             | Booléen |
| Affichage des annotations au format réduit dès l’ouverture de l’explorateur d’annotation                              | annotation.comment.explorer.show.annotation.minimized.on.open | false             | Booléen |
| Configurer l'explorateur d'annotations sur le côté est d'ARender                                                      | annotation.comment.explorer.eastSide.enabled                  | false             | Booléen |
| Ouvrir l'explorateur d'annotations lorsqu'une annotation est modifiée                                                 | annotation.comment.explorer.openOnEdit                        | false             | Booléen |
| Animer tout en étendant l'explorateur d'annotations                                                                   | annotation.comment.explorer.animate.on.expand                 | true              | Booléen |
| Afficher une liste simplifiée de tous les auteurs dans l'explorateur d'annotations                                    | annotation.comment.explorer.showAllAnnotators                 | true              | Booléen |
| Afficher un nombre total d'annotations dans l'explorateur d'annotations                                               | annotation.comment.explorer.showTotalAnnotationsNumber        | false             | Booléen |
| Afficher l'explorateur d'annotations au démarrage d'ARender comme panneau par défaut                                  | annotation.comment.explorer.showAtStartup                     | false             | Booléen |
| Activer/Désactiver pour filtrer également les annotations dans la vue de la page                                      | annotation.comment.explorer.filterPageAnnotations             | false             | Booléen |
| Configurer le tri par incrémentation de la date sinon par décrémentation de la date                                   | annotation.comment.explorer.sortByIncrementDate               | true              | Booléen |
| Autoriser ou non l'affichage de la date                                                                               | annotation.comment.explorer.show.date                         | true              | Booléen |
| Afficher uniquement les initiales du nom du créateur                                                                  | annotation.comment.explorer.creator.name.initial.only         | false             | Booléen |
| Activer l'affichage d'une seule annotation par page                                                                   | annotation.comment.explorer.show.one.annotation.only          | false             | Booléen |
| Afficher l'icône cible lorsque l'annotation n'est pas la note textuelle numérotée, sinon l'icône du type d'annotation | annotation.comment.display.target.enabled                     | false             | Booléen |
| Activer l'entrée en mode édition en cliquant sur un commentaire dans l'explorateur d'annotation                       | comment.edit.annotation.onselection.enabled                   | true              | Booléen |


## Explorateur de signets


| Description                                                     | Clé du paramètre                         | Valeur par défaut | Type    |
| --------------------------------------------------------------- | ---------------------------------------- | ----------------- | ------- |
| Activation/désactivation de cet explorateur                     | bookmarkexplorer.enabled                 | true              | Booléen |
| Afficher l'explorateur de signets au démarrage de l'application | bookmarkexplorer.showAtStartup           | false             | Booléen |
| Rendre les signets déplaçables                                  | bookmarkexplorer.draggable               | true              | Booléen |
| Activer/Désactiver la création de signets                       | bookmarkexplorer.add.bookmark.enabled    | true              | Booléen |
| Activer/Désactiver la suppression de signets                    | bookmarkexplorer.delete.bookmark.enabled | true              | Booléen |
| Activer/Désactiver l'animation des signets                      | bookmarkexplorer.animation.enabled       | true              | Booléen |


## Explorateur de la rechercher avancée

| Description                                                                                                                | Clé du paramètre                                 | Valeur par défaut | Type    |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------- | ------- |
| Activation/désactivation de cet explorateur                                                                                | advanced.searchexplorer.enabled                  | true              | Booléen |
| Définir la longueur de caractère minimale autorisée                                                                        | advanced.searchexplorer.min.characterLength      | 0                 | Entier  |
| Définir la longueur de caractère maximale autorisée                                                                        | advanced.searchexplorer.max.characterLength      | 255               | Entier  |
| La recherche est mise à jour lors de l'actualisation des annotations lorsque l'explorateur de recherche avancée est activé | advanced.searchexplorer.updates.enabled          | false             | Booléen |
| Le bouton pour rechercher et surligner est activé                                                                          | advanced.searchexplorer.search.highlight.enabled | true              | Booléen |



## Explorateur des liens hypertextes

| Description                                 | Clé du paramètre          | Valeur par défaut | Type    |
| ------------------------------------------- | ------------------------- | ----------------- | ------- |
| Activation/désactivation de cet explorateur | hyperlinkexplorer.enabled | true              | Booléen |



## Explorateur pour biffer

| Description                                       | Clé du paramètre          | Valeur par défaut | Type    |
| ------------------------------------------------- | ------------------------- | ----------------- | ------- |
| Activation/désactivation de cet explorateur       | redactexplorer.enabled    | false             | Booléen |
| Activer le bouton de création de biffure          | redactexplorer.redact     | true              | Booléen |
| Activer le bouton de création de biffure par zone | redactexplorer.redactZone | true              | Booléen |