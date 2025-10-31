---
title: Recherche textuelle
---

### Fonctions de recherche
Ces fonctions permettent de lancer une recherche textuelle sur un document ouvert, pour surligner et se positionner sur des éléments de texte précis.

- Objet : getARenderJS().getSearchJSAPI()

    | Fonction                                                                                                                         | Description                              | Argument                           |
    | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ---------------------------------- |
    | askSearchTextNext(searchText)                                                                                                    | Recherche pour le prochain mot           | **searchText**: (String) le mot que l'on cherche                                                                                                                                                                                                                                                                                                                                                       |
    | askSearchTextPrevious(searchText)                                                                                                | Recherche pour le précédent mot          | **searchText**: (String) le mot que l'on cherche                                                                                                                                                                                                                                                                                                                                                       |
    | clearSearchResults()                                                                                                             | Efface les résultats de la recherche     |                                                                                                                                                                                                                                                                                                                                                                                                        |

### Recherche simple

La fonction **askSearchTextNext** permet de lancer une recherche simple. Elle prend en paramètre d'entrée le texte à rechercher.
```javascript
getARenderJS().getSearchJSAPI().askSearchTextNext("arender")
```
Cette recherche surligne le texte recherché sur l'ensemble des documents ouverts, sans respecter la casse, et positionne le viewer sur le premier élément correspondant à partir de la page sur laquelle on est positionné.

Il est ensuite possible de naviguer de proche en proche en rappelant la même fonction :
```javascript
getARenderJS().getSearchJSAPI().askSearchTextNext("arender")
```

Scroller sur le document dans ARender entre deux appels relancera la recherche à partir de la page en cours.

Il est également possible de se rendre à l'occurrence précédente du texte recherché en faisant appel à la fonction **askSearchTextPrevious** :
```javascript
getARenderJS().getSearchJSAPI().askSearchTextPrevious("arender")
```

Une fois la recherche terminée, pour enlever la mise en évidence des résultats de recherche sur le document, il conviendra d'utiliser la fonction **clearSearchResults** :
```javascript
getARenderJS().getSearchJSAPI().clearSearchResults()
```

### Recherche avancée

Le panneau de recherche avancée d'ARender permet de préciser davantage une recherche textuelle.
Celui-ci peut être ouvert directement depuis l'API JavaScript avec la fonction **askAdvancedSearchText**.
Cette fonction prend 6 paramètres en entrée :
- **searchText** : le texte recherché
- **isCaseSensitive** : sensibilité à la casse (true ou false)
- **isAccentSensitive** : sensibilité aux accents
- **isRegex** : si isRegex vaut true, **searchtext** sera interprété comme une expression régulière.
- **SearchAction** : précise le périmètre de la recherche et peut prendre ces trois valeurs :
    - *CurrentPage* : Recherche sur la page courante
    - *AllPages* : Recherche sur l'ensemble des pages du document courant
    - *AllDocuments* : Recherche dans tous les documents
- **searchAnnotation** : Précise si la recherche inclut les annotations
    - *WithAnnotations* : Recherche dans le texte du document et les annotations
    - *WithoutAnnotations* : Recherche dans le texte du document uniquement
    - *OnlyAnnotations* : Recherche dans les annotations uniquement
- **postSearchAction** : Précise ce qui doit être fait des éléments trouvés :
    - *null* : Aucun traitement particulier
    - *Redact* : Les éléments trouvés sont convertis en annotation de type masquage (le texte ne s'affiche qu'au survole de la souris)
    - *Highlight* : les éléments recherchés sont convertis en annotations de type surlignage

**Voici un exemple classique d'utilisation :**

```javascript
getARenderJS().getSearchJSAPI().askAdvancedSearchText("arender", false, false, false, "AllDocuments", "WithAnnotations", null)
```
Dans cet exemple :
- la recherche porte sur le terme "arender"
- la recherche ne tient pas compte de la casse
- la recherche ne tient pas compte des accents
- le terme de recherche n'est pas une regex
- la recherche est effectuée sur l'ensemble des documents ouverts
- la recherche porte sur le texte du document ainsi que les annotations ajoutées par l'utilisateur
- aucun traitement particulier n'est effectué sur les éléments retournés par la recherche.


La navigation de proche en proche et le nettoyage des résultats se font de la même façon que pour la recherche simple, avec les fonctions **askSearchTextNext**, **askSearchTextPrevious**, et **clearSearchResults**.

**- Exemple de recherche par expression régulière :**

Une expression régulière (ou regex) est une règle permettant de définir quelles séquences de caractères ressortent dans une recherche.
```xml
Par exemple, ** &#92;b&#92;w<!-- Balise invalide supprimée -->&#92;b", false, false, true, "AllDocuments", "WithAnnotations", null)
```
```
