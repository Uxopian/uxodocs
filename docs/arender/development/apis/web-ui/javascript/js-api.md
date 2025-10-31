---
title: Bien commencer avec l'API javascript
description: Configuration et utilisation de l'API JavaScript ARender
sidebar_position: 1
keywords: ["configuration", "js", "javascript"]
---

# Bien commencer avec l'API javascript

## Configurer un fichier JavaScript personnalisé

Le fichier JavaScript personnalisé doit contenir une fonction du type :

```js
function arenderjs_init(arenderjs_){ ... }
```

Cette fonction est appelée au démarrage d'ARender, l'argument
*arenderjs_* est l'objet JavaScript qui collecte toutes les API,
fournies par ARender.

Votre fichier Javascript peut être configuré pour être utilisé dans
ARender de deux façons distinctes :

## Utiliser la propriété arenderjs.startupScript

La propriété arenderjs.startupScript, si elle est définie, sera utilisée
par ARender pour récupérer le fichier Javascript personnalisé et
l'exécuter lorsque l'interface sera prête.

Cette propriété peut être définie dans le fichier de profil, :

```cfg
arenderjs.startupScript=scripts/myarenderscript.js
```

Ou directement dans les paramètres URL :

```html
https://www.demo.arender.io/?url=https://arender.io/docs/demo/ARender-doc-demo.pdf&arenderjs.startupScript=scripts/arenderJSPAPITest.js
```