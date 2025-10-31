---
title: Migration de configuration de 4.x à 4.7
---

La version 4.7 apporte son lot de modification visuelle qui implique des changements de configuration au niveau des beans, mais également des propriétés dans ARender.properties ainsi que le CSS. Cette page a pour but de montrer comment bien adapter les anciennes configurations vers la nouvelle.


Depuis la 4.7.2, les configurations, faites avant la 4.7, sont rétro-compatible. Il est tout de fois conseillé de faire les modifications vers la nouvelle norme de la configuration.


## Le Toppanel

### Nouvelle organisation du Toppanel

Le Toppanel est organisé en plusieurs sections permettant d'organiser les différents boutons. Voici les différentes sections listées dans leur ordre par défaut :
- File And annotation : Contient les boutons pour les téléchargements, l'impression et les annotations
- File (Contenue dans la première section) : Contient les boutons pour les téléchargements et l'impression
- Annotation (Contenue dans la première section) : Contient les boutons pour les annotations
- Modification : Contient les boutons pour la rotation, la luminosité et le contraste
- Navigation : Contient les boutons pour la navigation dans le document
- Zoom : Contient les boutons pour le zoom
- MultiView tools : Contient les boutons pour la vue multi-document
- Plugin : Contient les boutons pour les plugins Plume et HTML
- Right : Contient les boutons devant être à droite dont l'ellipsis

```xml
<!-- Commentaire nettoyé -->
```

Cette organisation est modifiable comme dans les versions précédentes. Voici une liste des différentes propriétés servant à manipuler la disposition des différents éléments du Toppanel : 

- topPanel.widgets.beanNames
- topPanel.upload.buttons.beanNames
- topPanel.download.buttons.beanNames
- topPanel.section.file.buttons.beanNames
- topPanel.section.file.annotation.buttons.beanNames
- topPanel.section.modification.buttons.beanNames
- topPanel.ellipsis.buttons.beanNames
- topPanel.section.plugin.buttons.beanNames
- topPanel.search.buttons.beanNames
- topPanel.navigation.buttons.beanNames
- topPanel.zoom.buttons.beanNames
- topPanel.rotation.buttons.beanNames
- topPanel.annotation.buttons.beanNames
- topPanel.imageProcessing.buttons.vertical.beanNames
- topPanel.section.right.buttons.beanNames

#### Cas particuliers

La section *File and Annotation* est une section qui va simplement servir de conteneur pour les sections *File* et *Annotation* afin de les avoir côte-à-côte. 

La section *Right* est la section qui sera toujours la plus à droite et qui va contenir le bouton *Ellipsis* (Menu burger).


### Les boutons, les boutons activables et les items de sous-menu

#### Les boutons d'annotations 

Les boutons d'annotations se trouvent directement dans le toppanel dans la section d'Annotation. Le mode *répétition* est activable avec un double-clic si la propriété associée à l'annotation est bien activée.
Il est toujours possible d'avoir le mode *répétition* sur un bouton avec un simple clic. 

Pour avoir ce comportement, il faut remplacer la propriété du buttonHandler. Les annotations disposant d'une fonction de répétition vont avoir des références de bean pour le mode normal et le mode répétition.

Voici un exemple de propriété *buttonHandler* actionnant le mode répétition au clic du bouton : 


```cfg

	<ref>
<!-- Commentaire nettoyé -->
    
    
    
    
    
    
        <ref>
    <!-- Commentaire nettoyé -->
        <ref>
    <!-- Commentaire nettoyé -->
        <ref>
    <!-- Commentaire nettoyé -->
        <ref>
    <!-- Commentaire nettoyé -->
        <ref>
    <!-- Commentaire nettoyé -->
    
    
    
    
    
        <ref>
    <!-- Commentaire nettoyé -->
        <ref>
    <!-- Commentaire nettoyé -->
        <ref>
    <!-- Commentaire nettoyé -->
    **
        
        
        
    **
<!-- Commentaire nettoyé -->
```


Propriété à rajouter dans le bean *shortcut* pour activer la touche SHIFT : 


```cfg

```


Propriété à rajouter dans le bean *shortcut* pour activer la touche ALT : 


```cfg

```



#### Conversion entre bouton et item de sous-menu :

Les boutons se trouvant dans les sous menus et les boutons se trouvant dans le toppanel utilisent dorénavant des classes différentes. Cela va se traduire également par des différences de définition de bean.

##### Exemple de bouton, de bouton activable et d'item de sous-menu

Les exemples suivants montrent un bean entièrement construit pour les trois formes mentionnées. L'action qui est déclenchée par chacun est l'impression du document.


Un bouton est un simple bouton qui revient à l'état visuel initial après avoir cliqué dessus. Un bouton activable est un bouton qui restera dans un état visuel actif au clic, puis reviendra à l'état visuel par défaut après avoir cliqué dessus à nouveau.


###### Item de sous-menu

```cfg
**
    <constructor-arg value="printButton">
     and ${topPanel.print}}">
    
    
        <ref>
    <!-- Commentaire nettoyé -->
    
        **
            <!-- Commentaire nettoyé -->
        **
    <!-- Commentaire nettoyé -->
     and ${topPanel.print}}">
    
    
        <ref>
    <!-- Commentaire nettoyé -->
        **
            <!-- Commentaire nettoyé -->
        **
    <!-- Commentaire nettoyé -->
     and ${topPanel.print}}">
    
    
        <ref>
    <!-- Commentaire nettoyé -->
        **
            <!-- Commentaire nettoyé -->
        **
    <!-- Commentaire nettoyé -->

```cfg
topPanel.section.right.buttons.beanNames=documentBuilderButton,fullscreenButton,searchSection,moreButton
```




Suppression de l'id en redéfinissant la propriété : 
<!-- Commentaire nettoyé -->

```cfg
topPanel.section.right.buttons.beanNames=documentBuilderButton,fullscreenButton,moreButton
```





Ensuite, il faudra redéfinir une propriété avec le bean id *searchBox* : 
<!-- Commentaire nettoyé -->

```cfg
topPanel.section.right.buttons.beanNames=searchBox,documentBuilderButton,fullscreenButton,moreButton
```




## Modifications de nom de classes

Si vous utilisez la 4.7.0 ou 4.7.1, alors, certaines classes ont changé de package. Veuillez à bien les remplacer.

| Ancien nom de package                                                 | Nouveau nom de package                                           |
| --------------------------------------------------------------------- | ---------------------------------------------------------------- |
| com.arondor.viewer.client.toppanel.presenter.SliderPanelPresenter     | com.arondor.viewer.client.annotation.slider.SliderPanelPresenter | 
| com.arondor.viewer.client.toppanel.presenter.ActivableButtonPresenter | com.arondor.viewer.client.widgets.ActivableButtonPresenter       | 
| com.arondor.viewer.client.toppanel.presenter.DialogBoxPushButton      | com.arondor.viewer.client.widgets.DialogBoxPushButton            | 
| com.arondor.viewer.client.toppanel.presenter.SimpleTopPanelSubMenu    | com.arondor.viewer.client.widgets.SimpleTopPanelSubMenu          | 
| com.arondor.viewer.client.toppanel.presenter.TopPanelSubMenu          | com.arondor.viewer.client.widgets.TopPanelSubMenu                | 


Ces changements de classes sont valables uniquement pour la 4.7.0 et la 4.7.1. À partir de la version 4.7.2, les anciens noms de package ont été remis afin d'avoir une meilleure rétro-compatibilité.



## Modifications de bean 

Le bean avec l’id *annotationMenu* a changé de classe. La nouvelle classe est *com.arondor.viewer.client.toppanel.presenter.SimpleButtonSetPresenter*.

Les boutons de sélection de la tête ou de la queue des flèches ont été modifiés. Leur classe est maintenant *com.arondor.viewer.client.widgets.DropdownMenuItem*

La propriété *imageResource* n’est plus utilisable dans les définitions des beans.

## Suppression de bean (4.7.0 et 4.7.1)

Liste des ids de beans supprimés pour la version 4.7.0 et 4.7.1.

- documentMenu
- imageProcessingVerticalSubMenu
- addHighlightRectangleAnnotationRepeatButton
- addHighlightCircleAnnotationRepeatButton
- addArrowAnnotationRepeatButton
- addHighlightTextAnnotationRepeatButton
- addUnderlineTextAnnotationRepeatButton
- addStrikethroughTextAnnotationRepeatButton
- addPolygonAnnotationRepeatButton
- addPolylineAnnotationRepeatButton
- addFreehandAnnotationRepeatButton
- logo


Ces beans ont été remis à partir de la version 4.7.2, pour une meilleure rétro-compatibilité, dans le fichier *toppanel-configuration-legacy.xml*


## Modification de CSS:

### Icon en font:
Les icons du toppanel ont été changés. Les icons sont faits via de la font personnalisé. 

### Ajouts de variable de couleur

Les couleurs de fond, d'icône, de survole dans le toppanel peut se changer entre couleur clair et couleur foncé avec une propriété:


```cfg
preference.color.mode=DARK
```



La valeur DARK sera pour la couleur foncée par défaut, la valeur LIGHT sera pour la couleur claire et la valeur CUSTOM permet d'utiliser des couleurs custom redéfinies dans un CSS pour la class CSS nommé .custom-theme. Par défaut, la valeur CUSTOM va correspondre aux couleurs définis pour la valeur DARK.

#### DARK 

<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->

<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->

<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->

<!-- Commentaire nettoyé -->

<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->

<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->


#### LIGHT

<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->

<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->

<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->

<!-- Commentaire nettoyé -->

<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->

<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->



Ces variables de couleurs ne sont pas fonctionnels pour Internet Explorer



### Liste des modifications de CSS

#### Plugin Plume : 

| Bean id        | Ancienne class CSS | Nouvelle class CSS                                               |
| -------------- | ------------------ | ---------------------------------------------------------------- |
| plumeMenu      | aucun              | standardButton icon-plugin-plume toppanelButton                  |
| plumeButton    | aucun              | standardButton icon-plugin-plume toppanelButton                  |
| replyButton    | aucun              | standardButton icon-reply toppanelButton                         |
| replyAllButton | aucun              | standardButton dropdown-MenuButton icon-open-file toppanelButton |
| forwardButton  | aucun              | standardButton icon-forward toppanelButton                       |

#### Plugin HTML :

| Bean id         | Ancienne class CSS | Nouvelle class CSS                             |
| --------------- | ------------------ | ---------------------------------------------- |
| htmlPluginMenu  | aucun              | standardButton icon-plugin-html toppanelButton |
| viewHtmlButton  | aucun              | standardButton icon-plugin-html toppanelButton |
| closeHtmlButton | aucun              | standardButton icon-close toppanelButton       |

#### Annotations : 

| Bean id                               | Ancienne class CSS                           | Nouvelle class CSS                                     |
| ------------------------------------- | -------------------------------------------- | ------------------------------------------------------ |
| annotationMenu                        | standardButton annotationManagerButton       | fullHeight annotationMenu                              |
| showAllAnnotationsButton              | standardButton hideAnnotationButton          | standardButton icon-hide toppanelButton                |
| showAllAnnotationsAndRotationsButton  | standardButton showAnnotationButton          | standardButton icon-hide toppanelButton                |
| addStickyNoteAnnotationButton         | standardButton addAnnotationButton           | standardButton icon-add-sticky toppanelButton          |
| addHighlightRectangleAnnotationButton | standardButton rectangleAnnotationButton     | standardButton icon-highlight-area toppanelButton      |
| addFreeTextAnnotationButton           | standardButton freetextAnnotationButton      | standardButton icon-add-free-text toppanelButton       |
| addHighlightTextAnnotationButton      | standardButton highlightAnnotationButton     | standardButton icon-highlight                          |
| addUnderlineTextAnnotationButton      | standardButton underlineAnnotationButton     | standardButton icon-underline                          |
| addStrikethroughTextAnnotationButton  | standardButton strikethroughAnnotationButton | standardButton icon-strikethrough                      |
| addHighlightCircleAnnotationButton    | standardButton circleAnnotationButton        | standardButton icon-add-circle toppanelButton          |
| addObfuscateAnnotationButton          | standardButton obfuscateButton               | standardButton icon-redact-text                        |
| addObfuscateZoneAnnotationButton      | standardButton obfuscateZoneButton           | standardButton icon-redact-area                        |
| addArrowAnnotationButton              | standardButton arrowAnnotationButton         | standardButton icon-add-arrow toppanelButton           |
| addPolygonAnnotationButton            | standardButton polygonAnnotationButton       | standardButton icon-add-polygon toppanelButton         |
| addPolylineAnnotationButton           | standardButton polylineAnnotationButton      | standardButton icon-add-multiline toppanelButton       |
| addFreehandAnnotationButton           | standardButton freehandAnnotationButton      | standardButton icon-add-hand-draw toppanelButton       |
| addStampAnnotationButton              | standardButton stampAnnotationButton         | standardButton icon-add-stamp toppanelButton           |
| saveDirtyAnnotations                  | standardButton saveAnnotationsButton         | standardButton icon-save toppanelButton                |
| refreshAnnotation                     | standardButton refreshAnnotationButton       | standardButton icon-refresh-annotations toppanelButton |
| changeLineHead                        | standardButton changeHeadStyleButton         | standardButton icon-head-solid-arrow                   |
| changeLineHeadSquare                  | standardButton squareStyleButton             | standardButton icon-head-square                        |
| changeLineHeadCircle                  | standardButton circleStyleButton             | standardButton icon-head-circle                        |
| changeLineHeadButt                    | standardButton buttStyleButton               | standardButton icon-head-line                          |
| changeLineHeadDiamond                 | standardButton diamondStyleButton            | standardButton icon-head-diamond                       |
| changeLineHeadOpenArrow               | standardButton openArrowStyleButton          | standardButton icon-head-outline-arrow                 |
| changeLineHeadROpenArrow              | standardButton rOpenArrowStyleButton         | standardButton icon-head-outline-arrow-invert          |
| changeLineHeadClosedArrow             | standardButton closedArrowStyleButton        | standardButton icon-head-solid-arrow                   |
| changeLineHeadRClosedArrow            | standardButton rClosedArrowStyleButton       | standardButton icon-head-solid-arrow-invert            |
| changeLineHeadNone                    | standardButton noneStyleButton               | standardButton icon-arrow-none                         |
| changeLineTail                        | standardButton changeTailStyleButton         | standardButton icon-tail-solid-arrow                   |
| changeLineTailSquare                  | standardButton squareStyleButton             | standardButton icon-tail-square                        |
| changeLineTailCircle                  | standardButton circleStyleButton             | standardButton icon-tail-circle                        |
| changeLineTailButt                    | standardButton buttStyleButton               | standardButton icon-tail-line                          |
| changeLineTailDiamond                 | standardButton diamondStyleButton            | standardButton icon-tail-diamond                       |
| changeLineTailOpenArrow               | standardButton openArrowStyleButton          | standardButton icon-tail-outline-arrow                 |
| changeLineTailROpenArrow              | standardButton rOpenArrowStyleButton         | standardButton icon-tail-outline-arrow-invert          |
| changeLineTailClosedArrow             | standardButton closedArrowStyleButton        | standardButton icon-tail-solid-arrow                   |
| changeLineTailRClosedArrow            | standardButton rClosedArrowStyleButton       | standardButton icon-tail-solid-arrow-invert            |
| changeLineTailNone                    | standardButton noneStyleButton               | standardButton icon-arrow-none                         |


| Bean id                               | Ancien nom de propriété | Ancienne class CSS                  | Nouveau nom de propriété | Nouvelle class CSS                                     |
| ------------------------------------- | ----------------------- | ----------------------------------- | ------------------------ | ------------------------------------------------------ |
| showAllAnnotationsButton              | inactiveClassName       | standardButton hideAnnotationButton | activeClassName          | standardButton icon-show toppanelButton showAnnotation |
| showAllAnnotationsButton              | className               | standardButton showAnnotationButton | className                | standardButton icon-hide toppanelButton                |
| showAllAnnotationsAndRotationsButton  | inactiveClassName       | standardButton showAnnotationButton | activeClassName          | standardButton icon-show toppanelButton showAnnotation |
| showAllAnnotationsAndRotationsButton  | className               | standardButton showAnnotationButton | className                | standardButton icon-show toppanelButton showAnnotation |

#### Menu contextuel :

| Bean id                                 | Ancienne class CSS                                   | Nouvelle class CSS                                             |
| --------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| stampAction                             | standardButton stampAnnotationContextualMenu         | standardButton icon-add-stamp contextualMenu                   |
| freetextAction                          | standardButton freetextAnnotationContextualMenu      | standardButton icon-add-free-text contextualMenu               |
| printAction                             | standardButton printContextualMenu                   | standardButton icon-print contextualMenu                       |
| printAllAction                          | standardButton printContextualMenu                   | standardButton icon-print contextualMenu                       |
| rotateLeftAction                        | standardButton turnLeftContextualMenu                | standardButton icon-turn-page-left contextualMenu              |
| rotateRightAction                       | standardButton turnRightContextualMenu               | standardButton icon-turn-page-right contextualMenu             |
| stickyNoteAction                        | standardButton addAnnotationContextualMenu           | standardButton icon-add-sticky contextualMenu                  |
| hyperlinkAction                         | standardButton hyperlinkAnnotationContextualMenu     | standardButton icon-hyperlinks contextualMenu                  |
| cropBoxImageAction                      | standardButton cropBoxImageContextualMenu            | standardButton cropBoxImageContextualMenu contextualMenu       |
| highlightTextAction                     | standardButton highlightAnnotationContextualMenu     | standardButton icon-highlight contextualMenu                   |
| deleteHighLightTextAction               | standardButton removeContextualMenu                  | standardButton icon-delete contextualMenu                      |
| strikeoutTextAction                     | standardButton strikethroughAnnotationContextualMenu | standardButton icon-strikethrough contextualMenu               |
| underlineTextAction                     | standardButton underlineAnnotationContextualMenu     | standardButton icon-underline contextualMenu                   |
| highlightAction                         | standardButton rectangleAnnotationContextualMenu     | standardButton icon-highlight-area contextualMenu              |
| highlightCircleAction                   | standardButton circleAnnotationContextualMenu        | standardButton icon-add-circle contextualMenu                  |
| arrowAction                             | standardButton arrowAnnotationContextualMenu         | standardButton icon-add-arrow contextualMenu                   |
| closeMultiViewAction                    | standardButton clearContextualMenu                   | standardButton icon-close contextualMenu                       |
| addPolygonAction                        | standardButton polygonAnnotationContextualMenu       | standardButton icon-add-polygon contextualMenu                 |
| addPolylineAction                       | standardButton polylineAnnotationContextualMenu      | standardButton icon-add-multiline contextualMenu               |
| addFreehandAction                       | standardButton freehandAnnotationContextualMenu      | standardButton icon-add-hand-draw contextualMenu               |
| anchorAnnotationAction                  | standardButton anchorAnnotationContextualMenu        | standardButton icon-anchor contextualMenu                      |
| copyAction                              | aucun                                                | standardButton icon-copy contextualMenu                        |
| downloadContextualMenuAction            | pictreeButton saveDocumentButton                     | pictreeButton saveDocumentButton contextualMenu                |
| downloadAnnotationsContextualMenuAction | pictreeButton saveDocumentWithAnnotationsButton      | pictreeButton saveDocumentWithAnnotationsButton contextualMenu |
| createFirstContextualMenuAction         | pictreeButton saveDocumentCreateFirstButton          | pictreeButton saveDocumentCreateFirstButton contextualMenu     |
| updateFirstContextualMenuAction         | pictreeButton saveDocumentUpdateFirstButton          | pictreeButton saveDocumentUpdateFirstButton contextualMenu     |
| deleteDocumentContextualMenuAction      | pictreeButton deleteDocumentButton                   | pictreeButton deleteDocumentButton contextualMenu              |

#### Toppanel :

| Bean id                          | Ancienne class CSS                                | Nouvelle class CSS                                         |
| -------------------------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| documentBuilderButton            | standardButton selectiveCopyButton                | standardButton icon-docbuilder                             |
| firstPageButton                  | standardButton firstPageButton                    | standardButton icon-go-to-first-page noPadding             |
| previousPageButton               | standardButton prevButton                         | standardButton icon-go-to-previous-page noPadding          |
| nextPageButton                   | standardButton nextButton                         | standardButton icon-go-to-next-page noPadding              |
| lastPageButton                   | standardButton lastPageButton                     | standardButton icon-go-to-last-page noPadding              |
| previousDocumentButton           | standardButton prevButton                         | standardButton icon-go-to-previous-page noPadding          |
| nextDocumentButton               | standardButton nextButton                         | standardButton icon-go-to-next-page noPadding              |
| fullscreenButton                 | standardButton fullScreenButton                   | standardButton icon-full-screen toppanelButton             |
| printButton                      | standardButton printButton                        | standardButton icon-print toppanelButton                   |
| printAllButton                   | standardButton printButton                        | standardButton icon-print toppanelButton                   |
| uploadButton                     | standardButton fileUploadButton                   | standardButton icon-open-file toppanelButton               |
| uploadURLButton                  | standardButton urlUploadButton                    | standardButton icon-open-url toppanelButton                |
| uploadXFDFButton                 | standardButton xfdfUploadButton                   | standardButton icon-open-file toppanelButton               |
| downloadButton                   | standardButton downloadButton                     | standardButton icon-download toppanelButton                |
| downloadRootButton               | standardButton downloadRootButton                 | standardButton icon-export-zip toppanelButton              |
| downloadXFDFAnnotationsButton    | standardButton downloadXFDFAnnotationsButton      | standardButton icon-export-with-annotations toppanelButton |
| downloadAnnotationsCSVButton     | standardButton downloadAnnotationAsCSVButton      | standardButton icon-export-with-annotations toppanelButton |
| downloadPdfButton                | standardButton downloadPDFButton                  | standardButton icon-export-pdf toppanelButton              |
| downloadAllButton                | standardButton downloadAllButton                  | standardButton icon-export-pdf toppanelButton              |
| downloadAllSourcesButton         | standardButton downloadAllSourcesButton           | standardButton icon-export-zip toppanelButton              |
| downloadAnnotationsButton        | standardButton downloadAnnotationButton           | standardButton icon-export-with-annotations toppanelButton |
| downloadWithFDFAnnotationsButton | standardButton downloadWithFDFAnnotationButton    | standardButton icon-export-with-annotations toppanelButton |
| downloadFDFAnnotationsButton     | standardButton downloadFDFAnnotationButton        | standardButton icon-export-with-annotations toppanelButton |
| downloadWithCompareButton        | standardButton downloadCompareButton              | standardButton icon-download-comparison                    |
| rotateLeft                       | standardButton turnLeftButton                     | standardButton icon-turn-page-left toppanelButton          |
| rotateAllLeft                    | standardButton turnAllLeftButton                  | standardButton icon-turn-all-pages-left                    |
| rotateAllRight                   | standardButton turnAllRightButton                 | standardButton icon-turn-all-pages-right                   |
| rotateRight                      | standardButton turnRightButton                    | standardButton icon-turn-page-right toppanelButton         |
| rotateReset                      | standardButton resetRotationButton                | standardButton icon-reset-rotation                         |
| zoomFullWidth                    | standardButton zoomFullWidthButton                | standardButton icon-fit-to-width-size toppanelButton       |
| zoomFullHeight                   | standardButton zoomFullHeightButton               | standardButton icon-fit-to-height-size toppanelButton      |
| zoomFullPage                     | standardButton zoomFullPageButton                 | standardButton icon-fit-to-page toppanelButton             |
| zoomIn                           | standardButton zoomInButton                       | standardButton icon-minus                                  |
| zoomInZone                       | standardButton zoomInZoneButton                   | standardButton icon-zoom-in-area toppanelButton            |
| zoomInZoneGlass                  | standardButton zoomInZoneGlassButton              | standardButton icon-zoom-in-area-new-window toppanelButton |
| zoomOut                          | standardButton zoomOutButton                      | standardButton icon-plus                                   |
| cropBoxButton                    | standardButton cropBoxImage                       | standardButton icon-screenshot                             |
| previousButton                   | standardButton prevButton                         | standardButton icon-go-to-previous-page                    |
| synchronizeScrollButton          | standardButton synchronizeDocumentScrollingButton | standardButton icon-sync-scroll                            |
| nextButton                       | standardButton nextButton                         | standardButton icon-go-to-next-page                        |
| moreButton                       | standardButton showMoreButton                     | standardButton icon-ellipsis                               |
| menuButton                       | aucune                                            | standardButton icon-list-view                              |

### Liste des suppressions de CSS

- topPanelSubMenu:BEFORE
- topPanelActivableButton
- topPanelActivatedButton

