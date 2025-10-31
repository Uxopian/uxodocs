---
title: Lancer une recherche
---

```xml
Les fonctions de l'API JavaScript **** **[documentées ici](<!-- Commentaire nettoyé -->)** **** permettent de lancer une recherche textuelle sur un document ouvert, pour surligner et se positionner sur des éléments de texte précis sur la visionneuse ARender.
```



Pour les utiliser depuis une autre application qu'ARender, il suffira de passer l'appel depuis l'objet window de l'iframe. Le code pour accéder à cet objet sera légèrement différent suivant le framework utilisé. Vous trouverez ci-dessous un exemple de recherche simple du terme 'Arender'. Pour naviguer d'un résultat au suivant, vous pouvez rappeler la même fonction. Pour plus d'informations sur la recherche simple et l'utilisation de la recherche avancée, voir la documentation mentionnée ci-dessus.

```javascript
const iframeWindow = iframeRef.current.contentWindow
iframeWindow.getARenderJS().getSearchJSAPI().askSearchTextNext("arender")
```
```javascript
const iframeWindow = this.iframeRef.nativeElement.contentWindow;
iframeWindow.getARenderJS().getSearchJSAPI().askSearchTextNext("arender")
```
```javascript
/**
 * Renvoie l'objet ARenderJS depuis l'iframe.
 * Lève une erreur si l'iframe n'est pas accessible ou n'est pas chargé.
 */
function getARenderJS() <!-- Commentaire nettoyé -->
  throw new Error("The iframe is not accessible or not loaded.")
}

function askSearchTextNext(text) <!-- Expression supprimée -->
}
/**
 * Expose la fonction `askSearchTextNext` au composant parent.
 */
defineExpose({
  askSearchTextNext
})
```
```javascript
/**
 * Renvoie l'objet ARenderJS depuis l'iframe.
 * Lève une erreur si l'iframe n'est pas accessible ou n'est pas chargé.
 */

function getARenderJS() <!-- Commentaire nettoyé -->
  throw new Error("The iframe is not accessible or not loaded.")
}
/**
 * Demande à ARender de rechercher la prochaine occurrence du texte donné.
 * @param text Le texte à rechercher.
 */
export function askSearchTextNext(text) <!-- Expression supprimée -->
}

```
```javascript
function search() <!-- Commentaire nettoyé --> else <!-- Expression supprimée -->;
    }
}
```
