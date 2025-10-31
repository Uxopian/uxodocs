---
title: Rotation
---

### Rotation de pages

- Objet : getARenderJS().getRotateJSAPI()

    | Fonction                                                                          | Description                                                                        |
    | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
    | askRotateCurrentPageLeft()                                                        | Rotation de la page active sur la gauche (sens inverse des aiguilles d'une montre) |
    | askRotateCurrentPageRight()                                                       | Rotation de la page active sur la droite (sens des aiguilles d'une montre)         |
    | askRotateAllPageLeft()                                                            | Rotation de toutes les pages sur la gauche                                         |
    | askRotateAllPageRight()                                                           | Rotation de toutes les pages sur la droite                                         |
    | askRotatePage(int pageNumber, String documentId, int rotation, boolean clockwise) | Rotation de la page du document                                                    |
    
    * pageNumber : : Le numéro de la page du document à pivoter
    * documentId : L'id du document
    * rotation : La rotation à appliquer (ex : 90, 180 or 270)
    * clockwise : Si true, la page pivote à droite, si false la page pivote à gauche


```js
// Pivote la page 3 du document ayant pour id "test" de 90° vers la droite
getARenderJS().getRotateJSAPI().askRotatePage(2, "test", 90, true);

// Pivote la page 3 du document ayant pour id "test" de 270° vers la gauche
getARenderJS().getRotateJSAPI().askRotatePage(2, "test", 270, false);
```

