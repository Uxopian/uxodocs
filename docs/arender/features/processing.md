---
title: Traitement des images
---

Pour améliorer la visibilité des éléments sur certains documents, il est possible de manipuler le contraste, la luminosité et l'inversion de couleur. Cette manipulation se fait à l'aide d'un curseur allant de -100 à 100 où 0 est la valeur par défaut. 


```xml
<!-- Commentaire nettoyé -->
```


Les boutons permettant de faire apparaitre les sliders individuellement, peuvent être activés ou non par les propriétés suivantes :  

```cfg
#Activate the brightness slider
topPanel.imageProcessMenu.brightness.enabled=true
#Activate the contrast slider
topPanel.imageProcessMenu.contrast.enabled=true
# Activate the invert colors slider
topPanel.imageProcessMenu.invert.enabled=true
```


Par défaut, les boutons pour les sliders du contraste et de la luminosité sont activés.


Le traitement de l'image peut être appliqué de trois façons différentes :
- La page courante
- Toutes les pages du document courant
- Toutes les pages de tous les documents ouverts



```cfg
# Set how image processing is applied : CURRENT_PAGE, ALL_PAGES, ALL_DOCUMENTS
topPanel.imageProcessMenu.process.mode=ALL_DOCUMENTS
```


