---
title: Textual search
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: 298d6dd9e77fd9e02d2cca093514dc073e821c1da2c361fedf9ebae04839965a
---

### Search features

- Object: getARenderJS().getSearchJSAPI()

    | Function                                                                                                                   | Description                  | Argument                                   |
    | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------ |
    | askAdvancedSearchText(searchText,isCaseSensitive,isAccentSensitive,isRegex,SearchAction,searchAnnotation,postSearchAction) | Advanced search              |                                            |
    | askSearchTextNext(searchText)                                                                                              | Searching the next term      | **searchText**: (String) the text searched |
    | askSearchTextPrevious(searchText)                                                                                          | Searching the previous term  | **searchText**: (String) the text searched |
    | clearSearchResults()                                                                                                       | Clear current search results |                                            |

### Simple search

The **askSearchTextNext** function is used to perform a simple search. It takes the text to search for as its input parameter:

```javascript
getARenderJS().getSearchJSAPI().askSearchTextNext("arender");
```

This search highlights the searched text across all open documents, case-insensitively, and positions the viewer on the first matching element starting from the current page.

You can then navigate sequentially by calling the same function again:

```javascript
getARenderJS().getSearchJSAPI().askSearchTextNext("arender");
```

Scrolling through the document in ARender between two calls will restart the search from the current page.

To navigate to the previous occurrence of the searched text, you can use the **askSearchTextPrevious** function:

```javascript
getARenderJS().getSearchJSAPI().askSearchTextPrevious("arender");
```

Once the search is completed, to remove the highlighting of search results on the document, you can use the clearSearchResults function:

```javascript
getARenderJS().getSearchJSAPI().clearSearchResults();
```

### Advanced Search

The advanced search panel in ARender allows for more precise text searches.
It can be opened directly from the JavaScript API using the **askAdvancedSearchText** function.

This function takes 6 input parameters:

- **searchText**: The text to search for.
- **isCaseSensitive**: Case sensitivity.
- **isAccentSensitive**: Accent sensitivity (true or false).
- **isRegex**: If isRegex is true, **searchText** will be interpreted as a regular expression.
- **SearchAction**: Specifies the scope of the search and can take the following values:
    - _CurrentPage:_ Search on the current page.
    - _AllPages:_ Search across all pages of the current document.
    - _AllDocuments:_ Search across all documents.
- **searchAnnotation**: Specifies whether the search includes annotations:
    - _WithAnnotations:_ Search within the document text and annotations.
    - _WithoutAnnotations:_ Search within the document text only.
    - _OnlyAnnotations:_ Search within annotations only.
- **postSearchAction**: Specifies what to do with the found elements:
    - _null:_ No specific action.
    - _Redact:_ The found elements are converted into redaction annotations (text is hidden and only displayed on mouse hover).
    - _Highlight:_ The searched elements are converted into highlight annotations.

**- Here is a classic example of usage:**

```javascript
getARenderJS()
  .getSearchJSAPI()
  .askAdvancedSearchText("arender", false, false, false, "AllDocuments", "WithAnnotations", null);
```

In this example:

- The search targets the term "arender".
- The search is case-insensitive.
- The search ignores accents.
- The search term is not a regex.
- The search is conducted across all open documents.
- The search covers the document text as well as annotations added by the user.
- No specific action is performed on the elements returned by the search.

Navigation through results and clearing search results are done in the same way as for a simple search, using the **askSearchTextNext**, **askSearchTextPrevious**, and **clearSearchResults** functions.

**- Example of a regular expression search:**

A regular expression (or regex) is a rule that defines which sequences of characters are highlighted in a search.
For example, <code>\b\w&#123;16,&#125;\b</code> will match words containing more than 16 characters.

To perform a search with this regex, you would run the search as follows, making sure to specify _true_ for the **isRegex** parameter:

```javascript
getARenderJS()
  .getSearchJSAPI()
  .askAdvancedSearchText(
    "\b\w{16,}\b",
    false,
    false,
    true,
    "AllDocuments",
    "WithAnnotations",
    null
  );
```
