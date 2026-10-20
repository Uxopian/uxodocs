---
title: Search
sidebar_position: 5
description: Search form within a popup.
date: "2004-03-28T13:23:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: a1c9a464c61c0abc45e3a1304ee65747cd4683eee0bb464203dc2cde2f334071
---

:::info
This type of popup opens a search form in a popup.
:::

To open a search form in a popup, the following parameters are required as string:

- `category` : Category to be searched (`DOCUMENT`, `FOLDER`, `VIRTUAL_FOLDER` or `TASK`)
- `template` : Name of template to be used for search

The `callback` parameter is optional. It makes the popup a selection popup: the components chosen by the user are returned to the callback, for example to add them as attachments to a task. Opening a result from the table is then disabled. Without a callback, the popup is a plain search form.

Two functions build the popup, depending on how many components the user may select:

| Function                                                                         | Selection | Callback                                    |
| -------------------------------------------------------------------------------- | --------- | ------------------------------------------- |
| `buildSearchToSelectUnique(String category, String template, Callback callback)`   | One       | `function (component)`: a `ComponentWrapper`  |
| `buildSearchToSelectMultiple(String category, String template, Callback callback)` | Several   | `function (components)`: a `ComponentWrapper[]` |

Both functions return the popup, which is displayed with `show()`.

## Select one component

The user selects one result and validates: the callback receives the selected component.

```javascript
var popup = JSAPI.get()
    .getPopupAPI()
    .buildSearchToSelectUnique(category, template, function (component) {
        console.log("Selected component id=" + component.getId());
    });
popup.show();
```

## Select several components

The results table displays a checkbox on each row. The user checks the results and validates: the callback receives every selected component.

```javascript
var popup = JSAPI.get()
    .getPopupAPI()
    .buildSearchToSelectMultiple(category, template, function (components) {
        components.forEach(function (component) {
            console.log("Selected component id=" + component.getId());
        });
    });
popup.show();
```

The selection is kept while the user moves on to new result pages of the same search, so results checked on several pages are all returned.

:::caution Known issue
Coming back to a result page already visited shows its results unchecked, and the selection made on that page is not kept. Check those results again before validating.
:::
 The checkbox in the table header only selects the results of the current page. Starting a new search, or changing the criteria or the sort, clears the selection.

If the user validates without selecting anything, a warning is displayed and the callback is not called.

## Deprecated function

:::warning
`buildSearch(String category, String template, Callback callback)` is deprecated and will be removed in the next major release. Use `buildSearchToSelectUnique`, which has the same signature and the same behaviour.
:::

<br/>

## Search configuration

Once the popup has been built, you can access or modify the various parameters using the following functions:

| Function                                | Description                                                                                     |
| --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `getHiddenRequest()`                    | Retrieving the hidden query from the search form                                                |
| `setHiddenRequest(SearchRequest request)` | Update of the search form's hidden query                                                        |
| `getHiddenColumns()`                    | Retrieving the list of hidden columns from the search form                                      |
| `setHiddenColumns(String[] columns)`    | Update the list of hidden columns in the search form                                            |
| `setOpenOnCategoryClick(boolean open)`  | Activate/deactivate component opening when category icon is clicked. <br/> _Enabled by default_ |
