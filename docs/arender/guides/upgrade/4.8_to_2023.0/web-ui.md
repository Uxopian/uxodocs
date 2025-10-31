---
title: Changements Web-UI
---

## Propriétés 

###  Changements des propriétés clients (arender.properties)
 
#### Les propriétés supprimées

| Propriétés V4                                           | Description                                                                          |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| topPanel.logo                                           | Affiche le logo du toppanel                                                          |
| topPanel.logo.url                                       | Définit l'URL du logo du toppanel                                                    |
| topPanel.logo.width                                     | La largeur du logo du toppanel (en pixels)                                           |
| topPanel.logo.height                                    | La hauteur du logo du toppanel (en pixels)                                           |
| topPanel.logo.margin.left                               | La marge gauche du logo du toppanel (en pixels)                                      |
| topPanel.section.file.annotation.buttons.beanNames      | La liste des widgets à définir (noms de bean XML) pour la section fichier/annotation |
| topPanel.section.modification.buttons.beanNames         | La liste des widgets à définir (noms de bean XML) pour la section de modification    |
| topPanel.section.plugin.buttons.beanNames               | La liste des widgets à définir (noms de bean XML) pour les plugins                   |
| topPanel.navigation.buttons.beanNames                   | La liste des widgets à définir (noms de bean XML) pour la section de navigation      |
| topPanel.zoom.buttons.beanNames                         | La liste des widgets à définir (noms de bean XML) pour la section zoom               |
| topPanel.rotation.buttons.beanNames                     | La liste des widgets à définir (noms de bean XML) pour la section rotation           |
| topPanel.imageProcessMenu.processBrightness             | Configure le curseur pour gérer la luminosité                                        |
| topPanel.imageProcessMenu.processContrast               | Configure le curseur pour gérer le contraste                                         |
| topPanel.imageProcessMenu.maxBrightness                 | Configure la valeur maximale du curseur de luminosité                                |
| topPanel.imageProcessMenu.maxContrast                   | Configure la valeur maximale du curseur de contraste                                 |
| topPanel.imageProcessMenu.defaultBrightness             | Définit la valeur par défaut du curseur de luminosité                                |
| topPanel.imageProcessMenu.defaultContrast               | Définit la valeur par défaut du curseur de contraste                                 |
| advanced.searchexplorer.tooltipOnHover.enabled          | Active l'info-bulle au survol                                                        | 
| advanced.searchexplorer.caseSensitive.tooltip.enabled   | Active l'info-bulle sensible à la casse                                              | 
| advanced.searchexplorer.accentSensitive.tooltip.enabled | Active l'info-bulle sensible aux accents                                             | 
| annotationexplorer.enabled                              | Active l'ancien explorateur d'annotations                                            | 
| annotation.richtext.edition.doubleClick.time            | Configure le temps du double-clic par défaut en millisecondes (ms)                   | 
| filter.comment.showTabImage                             | Permet de filtrer l'annotation dans l'explorateur de commentaires                    | 
| filter.comment.showTabLabel                             | Affiche une étiquette au lieu d'une icône pour le filtrage                           | 
| filter.comment.showSwitchFilter                         | Affiche le bouton de filtre pour les demandes résolues/non résolues                  | 
| annotationExplorer.showStickyNoteReplies                | Ancien explorateur d'annotations, affiche les réponses aux notes autocollantes       | 
| annotationExplorer.showStickyNoteLabel                  | Ancien explorateur d'annotations, affiche les étiquettes des notes autocollantes     | 
| annotationExplorer.adaptativeWidth.enabled              | Ancien explorateur d'annotations, adapte la largeur du panneau en conséquence        | 


#### Les propriétés renommées

| Propriétés V4                                | Propriétés V2023                                                                            | Description                                                                                                                               |
| -------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| topPanel.section.file.buttons.beanNames      | topPanel.section.left.buttons.beanNames                                                     | La liste des widgets à définir (noms de bean XML) pour la partie gauche du toppanel                                                       |
| topPanel.annotation.buttons.beanNames        | toolbar.annotation.buttons.beanNames                                                        | La liste des widgets à définir (noms de bean XML) pour la barre d'outils d'annotation                                                     |
```xml
| topPanel.obfuscate                           | redactexplorer.redact                                                                       | Active le bouton pour biffer du texte ([documentation](<!-- Commentaire nettoyé -->))                                   |
| topPanel.obfuscateZone                       | redactexplorer.redactZone                                                                   | Active le bouton pour biffer en zone  ([documentation](<!-- Commentaire nettoyé -->))                                   |
```
| toolbar.lockedObfuscate                      | toolbar.redact.locked                                                                       | Toutes les biffures sont bloqués après la sauvegarde et ne peuvent plus être éditées                                                      |
| annotation.canHideObfuscate                  | annotation.can.hide.redact                                                                  | Toutes les biffures peuvent être cachées en utilisant le boutons pour cacher les annotations                                              | 
```xml
| topPanel.imageProcessMenu                    | topPanel.imageProcessMenu.brightness.enabled et topPanel.imageProcessMenu.contrast.enabled  | Activer le curseur de luminosité / Activer le curseur de contraste  ([documentation](<!-- Commentaire nettoyé -->)) |
```


### Changements des propriétés serveur (arender-server-custom-vanilla.properties)

#### Les propriétés supprimées

| Propriétés V4                                | Description             |
| -------------------------------------------- | ----------------------- |
| arender.rest.b64.encoding                    | REST API configurations | 
| arender.rest.serialization.model             | REST API configurations | 

#### Les propriétés modifiées

| Propriétés V4                                | Modification                                                                                                                                                                                                                                                                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| arender.server.default.annotation.accessor   | La valeur est passée de *xfdfAnnotationAccessor* à *redactConverterAnnotationAccessor* afin de faciliter la conversion du model de biffage V4 vers celui de V2023. La valeur *xfdfAnnotationAccessor* se retrouve à la propriété *arender.server.wrapper.source.annotation.accessor* | 

## Beans

### Les configurations UI (arender-hmi-configuration.xml)

#### Les beans supprimés

| Bean id V4             |
| ---------------------- |
| sorterCommentPresenter | 
| annotationExplorer     |

#### Les beans modifiés

| Bean id V4      | Modification                                                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shortcutManager | Ce bean ne possède plus la valeur des raccourcis claviers. Pour les modifier, utiliser la propriété qui correspond au raccourci voulu. Par exemple : shortCut.print.key | 


### Les configurations d'événements (events-configuration.xml)

#### Les beans renommés

| Bean id V4                  | Modification                                               |
| --------------------------- | ---------------------------------------------------------- |
| obfuscateCreationAction     | Il a été modifié par le bean **redactCreationAction**.     | 
| obfuscateZoneCreationAction | Il a été modifié par le bean **redactZoneCreationAction**. | 


### Les configurations des annotations du toppanel (toppanel-annotations-configuration.xml)

#### Les beans renommées

| Bean id V4                       | Modification                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| addObfuscateAnnotationButton     | Ce bean a été remplacé par **addRedactAnnotationButton**. Il est dans arender-hmi-configuration.xml     | 
| addObfuscateZoneAnnotationButton | Ce bean a été remplacé par **addRedactZoneAnnotationButton**. Il est dans arender-hmi-configuration.xml | 


### Les configurations du toppanel (toppanel-configuration.xml)

#### Les beans modifiés

| Bean id V4                                                                             | Modification                                                                                                                                                  |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| separatorHorizontal, separatorVertical, obfuscationSeparator, printSeparatorHorizontal | Ils n'existent plus et ont été remplacés (rotationSeparatorVertical, annotationSeparatorVertical). Il est toujours possible d'ajouter vos propres séparateurs | 
| fileAndAnnotationSection                                                               | Maintenant, cela correspond au bean **topPanelLeftSection**. Le toppanel est maintenant séparé en trois sections. C'est la section de gauche.                 | 


## Classes

### Les classes modifiées

| Classes V4                  | Classe actuelle           | ArtifactId de la dépendance V4 | ArtifactId de la dépendance actuelle |
| --------------------------- | ------------------------- | ------------------------------ | ------------------------------------ |
| DocumentServiceRestClient   | RenditionRestClient       | arondor-arender-client-javarmi | arender-rendition-rest-client        |

### Les classes supprimées

| Classes V4                     |
| ------------------------------ |
| DocumentAccessorHasContentSize |
