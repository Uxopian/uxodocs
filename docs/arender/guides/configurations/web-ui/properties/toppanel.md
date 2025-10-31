---
title: Barre de menu
---

## Menu de document


| Description                                                                                               | Clé du paramètre                                | Valeur par défaut | Type    |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------- | ------- |
| Activer le sous-menu document                                                                             | topPanel.documentMenu                           | true              | Booléen |
| Chargement d''un document depuis le poste local                                                           | topPanel.documentMenu.upload                    | true              | Booléen |
| Chargement d''un document depuis une URL                                                                  | topPanel.documentMenu.url                       | true              | Booléen |
| Autoriser à utiliser "entrée" pour valider l'URL d'entrée à partir du bouton URL                          | topPanel.documentMenu.url.open.using.enter      | true              | Booléen |
| Chargement d''annotations au format XFDF depuis le poste local                                            | topPanel.documentMenu.xfdfUpload                | false             | Booléen |
| Téléchargement du document courant au format PDF                                                          | topPanel.documentMenu.downloadPDF               | true              | Booléen |
| Téléchargement du document courant au format natif (disponible seulement si le document n'est pas un PDF) | topPanel.documentMenu.download                  | true              | Booléen |
| Téléchargement de l'ensemble des documents visualisés                                                     | topPanel.documentMenu.downloadAll               | true              | Booléen |
| Téléchargement du document courant avec ses annotations                                                   | topPanel.documentMenu.downloadAnnotation        | true              | Booléen |
| Télécharger les annotations au format CSV                                                                 | topPanel.documentMenu.downloadCSVAnnotation     | false             | Booléen |
| Télécharger le document avec ses annotations au format FDF                                                | topPanel.documentMenu.downloadWithFDFAnnotation | false             | Booléen |
| Télécharger les annotations au format XFDF                                                                | topPanel.documentMenu.downloadXFDFAnnotations   | false             | Booléen |       
| Activer le bouton de téléchargement du document composite                                                 | topPanel.documentMenu.download.root             | true              | Booléen |
| Le comportement par défaut pour le téléchargement : DOWNLOAD_SOURCE or DOWNLOAD_NON_PDF                   | topPanel.documentMenu.download.behavior         | DOWNLOAD_NON_PDF  | Texte   |
| Télécharger tous les documents actuels au format original dans ZIP                                        | topPanel.documentMenu.downloadAllSources        | true              | Booléen |
| Télécharger les annotations au format FDF                                                                 | topPanel.documentMenu.downloadFDFAnnotations    | false             | Booléen |
| Télécharger les documents comparés côte à côte avec le résultat de comparaison dessus                     | topPanel.documentMenu.download.with.compare     | true              | Booléen |



## Menu d'impression

| Description                                                                   | Clé du paramètre | Valeur par défaut |  Type   |
| ----------------------------------------------------------------------------- | ---------------- | ----------------- | ------- |
| Affiche une boîte de dialogue permettant de sélectionner le type d'impression | topPanel.print   | true              | Booléen |

```xml
<!-- Commentaire nettoyé -->
```

```cfg
# Masquer le bouton d'impression
topPanel.print=false
```


## Menu d'annotation

| Description                                                                                         | Clé du paramètre                                 | Valeur par défaut | Type    |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------- | ------- |
| Activer le sous-menu d'annotation                                                                   | topPanel.annotationMenu                          | true              | Booléen |
| Création d''une note textuelle                                                                      | topPanel.annotationMenu.stikyNote                | true              | Booléen |
| Création d''un rectangle                                                                            | topPanel.annotationMenu.highlight                | true              | Booléen |
| Création d''un cercle                                                                               | topPanel.annotationMenu.circle                   | true              | Booléen |
| Création d''une flèche                                                                              | topPanel.annotationMenu.arrow                    | true              | Booléen |
| Création d''une flèche de mesure                                                                    | topPanel.annotationMenu.arrow.measure            | true              | Booléen |
| Création de texte surligné                                                                          | topPanel.annotationMenu.highlightText            | false             | Booléen |
| Création de texte souligné                                                                          | topPanel.annotationMenu.underlineText            | false             | Booléen |
| Création de texte barré                                                                             | topPanel.annotationMenu.strikethroughText        | false             | Booléen |
| Création d''un polygone                                                                             | topPanel.annotationMenu.polygon                  | true              | Booléen |
| Création d''une ligne connecté                                                                      | topPanel.annotationMenu.polyline                 | true              | Booléen |
| Création d''un dessin à main levée                                                                  | topPanel.annotationMenu.freehand                 | true              | Booléen |
| Création d''un lien hypertexte                                                                      | topPanel.annotationMenu.hyperlink                | false             | Booléen |
| Création d''un tampon                                                                               | topPanel.annotationMenu.stamp                    | true              | Booléen |
| Création d''une annotation audio                                                                    | topPanel.annotationMenu.sound                    | false             | Booléen |
| Afficher/masquer les annotations                                                                    | topPanel.annotationMenu.hide                     | true              | Booléen |
| Afficher/masquer annotations & rotations                                                            | topPanel.annotationMenu.hideAll                  | false             | Booléen |
| Création d'un texte libre                                                                           | topPanel.annotationMenu.freetext                 | true              | Booléen |
| Autoriser la modification de la note textuelle                                                      | topPanel.annotationMenu.stickyNote.editable      | true              | Booléen |
| Création d''un rectangle en mode répétition (ne s'annule pas à moins d'appuyer à nouveau)           | topPanel.annotationMenu.highlight.repeat         | false             | Booléen |
| Création d''une flèche en mode répétition (ne s'annule pas à moins d'appuyer à nouveau)             | topPanel.annotationMenu.arrow.repeat             | false             | Booléen |
| Création d''une flèche de mesure en mode répétition (ne s'annule pas à moins d'appuyer à nouveau)   | topPanel.annotationMenu.arrow.measure.repeat     | false             | Booléen |
| Création d''un polygone en mode répétition (ne s'annule pas à moins d'appuyer à nouveau)            | topPanel.annotationMenu.polygon.repeat           | false             | Booléen |
| Création d''une ligne connecté en mode répétition (ne s'annule pas à moins d'appuyer à nouveau)     | topPanel.annotationMenu.polyline.repeat          | false             | Booléen |
| Création d''un dessin à main levée en mode répétition (ne s'annule pas à moins d'appuyer à nouveau) | topPanel.annotationMenu.freehand.repeat          | false             | Booléen |
| Création de texte surligné en mode répétition (ne s'annule pas à moins d'appuyer à nouveau)         | topPanel.annotationMenu.highlightText.repeat     | false             | Booléen |
| Création de texte souligné en mode répétition (ne s'annule pas à moins d'appuyer à nouveau)         | topPanel.annotationMenu.underlineText.repeat     | false             | Booléen |
| Création de texte barré en mode répétition (ne s'annule pas à moins d'appuyer à nouveau)            | topPanel.annotationMenu.strikethroughText.repeat | false             | Booléen |
| Création d''un cercle en mode répétition (ne s'annule pas à moins d'appuyer à nouveau)              | topPanel.annotationMenu.circle.repeat            | false             | Booléen |
| Création d''un lien hypertexte en mode répétition (ne s'annule pas à moins d'appuyer à nouveau)     | topPanel.annotationMenu.hyperlink.repeat         | false             | Booléen |



## Navigation


| Description                | Clé du paramètre                  | Valeur par défaut | Type    |
| -------------------------- | --------------------------------- | ----------------- | ------- |
| Aller à la première page   | topPanel.pageNavigation.first     | true              | Booléen |
| Aller à la page précédente | topPanel.pageNavigation.previous  | true              | Booléen |
| Aller à la page suivante   | topPanel.pageNavigation.next      | true              | Booléen |
| Aller à la dernière page   | topPanel.pageNavigation.last      | true              | Booléen |




## Zoom

| Description                                               | Clé du paramètre               | Valeur par défaut | Type    |
| --------------------------------------------------------- | ------------------------------ | ----------------- | ------- |
| Zoom avant                                                | topPanel.zoom.in               | true              | Booléen |
| Zoom arrière                                              | topPanel.zoom.out              | true              | Booléen |
| Zoom sur une zone sélectionnée                            | topPanel.zoom.zone             | true              | Booléen |
| Adapte le zoom à la largeur de la fenêtre                 | topPanel.zoom.fullWidth        | true              | Booléen |
| Adapte le zoom à la hauteur de la fenêtre                 | topPanel.zoom.fullHeight       | true              | Booléen |
| Adapte le zoom à la largeur et à la hauteur de la fenêtre | topPanel.zoom.fullPage         | true              | Booléen |
| Activer le zoom zonale dans une fenêtre externe           | topPanel.zoom.zoneGlass        | false             | Booléen |
| Multiplication du zoom zonale                             | topPanel.zoom.zoneGlass.value  | 2                 | Entier  |




## Rotation


| Description                                                                             | Clé du paramètre            | Valeur par défaut | Type    |
| --------------------------------------------------------------------------------------- | --------------------------- | ----------------- | ------- |
| Rotation horaire de la page courante                                                    | topPanel.rotation.right     | true              | Booléen |
| Rotation anti-horaire de la page courante                                               | topPanel.rotation.left      | true              | Booléen |
| Rotation horaire et anti-horaire de toutes les pages                                    | topPanel.rotation.all       | false             | Booléen |
| Réinitialiser toutes les rotations                                                      | topPanel.rotation.reset     | false             | Booléen |
| Définit le degré de rotation appliquée lorsque vous appuyez sur les boutons de rotation | topPanel.rotation.degree    | 90                | Entier  |
| Active le sous-menu des rotations                                                       | topPanel.rotation.add       | true              | Booléen |


## Navigation des pages


| Description                  | Parameter Key                    | Default value | Type    |
| ---------------------------- | -------------------------------- | ------------- | ------- |
| Aller à la première page     | topPanel.pageNavigation.first    | true          | Booléen |
| Aller à la page précédente   | topPanel.pageNavigation.previous | true          | Booléen |
| Aller à la page suivante     | topPanel.pageNavigation.next     | true          | Booléen |
| Aller à la dernière page     | topPanel.pageNavigation.last     | true          | Booléen |


## Autres fonctionnalités


| Description                                                                                                                                                 | Parameter Key                                | Default value | Type    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------     | ------------- | ------- |
| Rafraichir les annotations                                                                                                                                  | topPanel.refresh                             | true          | Booléen |
| Recherche plein texte                                                                                                                                       | topPanel.search                              | true          | Booléen |
| Comportement de recherche par défaut. Sinon, ouvrez dans le panneau de recherche avancée                                                                    | topPanel.search.default                      | false         | Booléen |
| Si true et topPanel.search.default est true, afficher les résultats du texte de recherche dans l'explorateur de recherche avancées                          | topPanel.search.displayResultsInExplorer     | true          | Booléen |
| Le bouton de recherche "résultat suivant" passera au résultat suivant sur la page visible actuelle au lieu de reprendre là où vous avez laissé la recherche | topPanel.searchByVisiblePage                 | true          | Booléen |
| Plein écran                                                                                                                                                 | topPanel.fullscreen                          | true          | Booléen |
| Le mode plein écran masquera totalement le panneau supérieur                                                                                                | topPanel.fullscreen.hideTopPanel             | false         | Booléen |
| Le panneau supérieur sera toujours visible en plein écran et ne se cachera pas                                                                              | topPanel.fullscreen.alwaysShowTopPanel       | false         | Booléen |                                                                                                                
| Zoom encadré                                                                                                                                                | topPanel.zoomBox                             | true          | Booléen |
| Copier tout le texte du document                                                                                                                            | topPanel.document.text                       | false         | Booléen |
| Copier l'image par zone                                                                                                                                     | topPanel.cropbox.enabled                     | false         | Booléen |
| Curseur de luminosité                                                                                                                                       | topPanel.imageProcessMenu.brightness.enabled | true          | Booléen |
| Curseur de contraste                                                                                                                                        | topPanel.imageProcessMenu.contrast.enabled   | false         | Booléen |
| Curseur d'inversion de couleur                                                                                                                              | topPanel.imageProcessMenu.invert.enabled     | false         | Booléen |
| Définir comment le traitement d'image est appliqué : CURRENT_PAGE, ALL_PAGES, ALL_DOCUMENTS                                                                 | topPanel.imageProcessMenu.process.mode       | ALL_DOCUMENTS | Texte   |
