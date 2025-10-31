---
title: Intégrer ARender dans une application
---

Pour ajouter ARender à votre application, il suffit d'ajouter une balise iframe pointant sur le serveur ARender dans le code HTML de votre application.

## 1. Insertion de l'iframe

L'iframe d'ARender doit être inséré dans votre application au niveau le plus pertinent en fonction de votre utilisation d'ARender.

Voici un exemple minimal compatible avec tout type de framework :

```javascript
    **
```

- L'**id** permet d'identifier l'iframe de manière unique et d'en récupérer l'instance en JavaScript :
    `const iframe = document.getElementById('arender-iframe');`

- Le paramètre **src** doit contenir l'url de la "version" d'ARender installée.
- Le **title** est une indication textuelle de ce que contient l'iframe à des fins d'accessibilité.
- Le paramètre **allow='microphone'** est indispensable pour permettre l'utilisation d'annotations vocales dans ARender.

A ce stade de l'intégration d'ARender, une iframe menant vers ARender apparaît dans le DOM l'application hôte. Attention, elle n'est pas forcément visible pour le moment suivant l'emplacement où elle est intégrée dans l'application hôte : il faudra lui spécifier une position et des dimensions, comme proposé ci-dessous.

## 2. Informations par framework

Les tests d'intégration d'ARender ont été effectués avec les versions suivantes :
- React : "version" 18.3.1
- Angular : "version" 19.0.0
- VueJs : "version" 3.5.13
- Svelte : "version" 5.19.0

```xml
<!-- Commentaire nettoyé -->
```

```xml
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
```

      import useRef from 'react';

```xml
      function ARender() <!-- Commentaire nettoyé -->
```
          
        );
      \}

      export default ARender;

        - Créer un composant Angular (vous pouvez le faire à l'aide de cette commande CLI :
        **ng generate component Arender**)
        - Renseigner les fichiers typescript et html comme présenté ci-dessous :


```javascript
import {Component, ElementRef, ViewChild} from '@angular/core';

@Component(<!-- Commentaire nettoyé -->)
export class ARenderComponent {@ViewChild('iframeRef', { static: false}) iframeRef!: ElementRef<!-- Commentaire nettoyé -->- Ajouter ARenderComponent dans le module principal (fichier app.module.ts) si nécessaire en ajoutant le composant arender à la liste des déclarations.<!-- Commentaire nettoyé -->- Insérer le composant dans l'application, en insérant cette balise dans le code html du fichier adéquat : **&lt;app-arender&gt;&lt;/app-arender&gt;**<!-- Commentaire nettoyé -->- L'attribut **@ViewChild** permettra d'interagir aisément avec l'iframe sans passer par getElementById.<!-- Commentaire nettoyé --> Installation <!-- Commentaire nettoyé -->
  ****
<!-- Commentaire nettoyé -->Utilisation<!-- Commentaire nettoyé -->
  <Arender>
<!-- Commentaire nettoyé -->Fonctionnalités<!-- Commentaire nettoyé --> 
  <!-- Commentaire nettoyé --> 
  <!-- Commentaire nettoyé --> 
  <!-- Commentaire nettoyé -->
  <!-- Commentaire nettoyé --> 
<!-- Commentaire nettoyé --> Installation <!-- Commentaire nettoyé --> = $props();


**
  allow="microphone"
>**


  ...

```

```xml
<!-- Commentaire nettoyé -->
```

Vous pouvez utiliser le composant ARender dans votre application Svelte comme suit :

```html

	import Arender from '$components/Arender.svelte'


<Arender>
```

```xml
<!-- Commentaire nettoyé -->
```

```xml
<!-- Commentaire nettoyé --> 
```
    **- Visibilité dynamique de l'iframe : ** 
    La propriété arenderIsDisplayed contrôle l'affichage ou la dissimulation de l'iframe. 
```xml
  <!-- Commentaire nettoyé --> 
```
    **- Référence directe à l'iframe : ** 
    La propriété iframeRef lie l'élément iframe, permettant une interaction directe. 
```xml
  <!-- Commentaire nettoyé --> 
```
    **- Style personnalisé : ** 
    L'iframe peut être stylisée à l'aide de classes CSS. 
```xml
  <!-- Commentaire nettoyé --> 
```
    **- URL dynamique : ** 
    Vous pouvez modifier dynamiquement la source de l'iframe en mettant à jour l'attribut src. 
```xml
  <!-- Commentaire nettoyé -->
```

        Pour une intégration avec du CSS pur, sans utilisation d'un framework particulier, créer le fichier script suivant :

```xml
<!-- Commentaire nettoyé -->
```
```javascript
  document.addEventListener('DOMContentLoaded', function () <!-- Commentaire nettoyé -->
  
    // Ajout de l'iframe au body du HTML
    document.body.appendChild(iframe);
  
    // Fonction pour mettre à jour le HTML suite à un changement d'URL de l'iframe
    function setARenderUrl(newUrl) <!-- Commentaire nettoyé -->
  
    // Affichage / masquage de l'iframe
    function toggleArenderVisibility() <!-- Commentaire nettoyé -->
  
    // Mise à jour initiale pour gérer l'affichage de l'iframe et l'URL
    updateIframe();
  
    // Ajout de l'URL d'ARender
    setARenderUrl(''); // Indiquer ici l'URL d'ARender
  
    // Ecoute du button
    const toggleButton = document.getElementById('toggleButton');
    toggleButton.addEventListener('click', function() <!-- Expression supprimée -->;
    });
  });
  ```
<!-- Commentaire nettoyé -->
Ce script attend le chargement du DOM du document HTML auquel il sera associé, crée un élément iframe avec les paramètres nécessaires, et ajoute l'élément au DOM.

  Puis ajouter le script au fichier HTML souhaité :

  <!-- Commentaire nettoyé -->
```html

```xml
<!DOCTYPE html>
<html lang="en">
<!-- Commentaire nettoyé -->Document<!-- Commentaire nettoyé -->
```
**
    **Afficher / Masquer l'iframe**

    
**
```xml
<!-- Commentaire nettoyé -->
```

Dans cet exemple, une classe 'hidden' a été ajoutée à l'iframe quand on souhaite la masquer (en passant sa "largeur" à 0px par exemple).

Il est également possible de retirer complètement l'iframe quand elle n'est pas affichée, mais cela entraînera un rechargement d'ARender à chaque nouvel affichage.

Vous pourrez **reproduire cette façon d'associer un bouton à du code** pour tester les fonctionnalités d'ARender décrites dans les pages suivantes.

## 3. Styliser l'iframe avec du CSS

Les classes CSS associées à l'iframe vont nous permettre de la styliser.
Souvent, on souhaite afficher ARender sur une portion fixe de l'écran, occupant par exemple 60% de la "largeur" de l'écran, et ne disparaissant pas lors du scroll.
Voici un exemple de CSS commenté :
```css
iframe <!-- Expression supprimée -->
\}
```
