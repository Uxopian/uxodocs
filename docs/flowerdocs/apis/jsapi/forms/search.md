---
title: Search
sidebar_position: 3
date: "2001-03-28T13:21:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 7eac023144b3da7d7578f8c72b93b12e294b0368dbacd2de8dd0267b832a6a8c
---

# Subscription

## Form

A search form allows users to enter criteria to access stored components. In order to interact with this type of form, it is necessary to subscribe to its opening:

```javascript
JSAPI.get().registerForSearchOpen(function (searchFormAPI, id) {
    console.log("Hidden request: " + searchFormAPI.getHiddenRequest());
});
```

**Note :** In the case of a form from the search screen, the `id` variable corresponds to the identifier of the form _template_.
<br/> In the case of a search form from a virtual folder, the `id` variable corresponds to the virtual folder identifier.

## Criteria

If you wish to react to a change in the value of a specific search criterion, subscribe as follows:

```javascript
criterionName = "EDS";
JSAPI.get()
    .getSearchFormAPI()
    .registerForCriterionChange(criterionName, function (criterion) {
        console.log(
            "Criterion " + criterion.getName() + " values changed to " + criterion.getValues()
        );
    });
```

**Note :** In this section, the `criterionName` variable corresponds, in the case of a tag, to the value of its identifier.
If this is the component class, use `classid`.

_The functions available for interacting with the criteria are available in the [following section](/docs/flowerdocs/apis/jsapi/recherche/mco)._

# Actions

A search form has two action containers available through the following functions:

| Function           | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `getHeaderActions()` | Retrieves the action container above the search results |
| `getFooterActions()` | Retrieves the action container below the search results |

The example below illustrates how to add an action to the container below the results table.

```javascript
JSAPI.get().registerForSearchOpen(function (searchFormAPI, id) {
    console.error("Call of register for open");
    var actionAPI = JSAPI.get().getActionFactoryAPI();
    var action = actionAPI.buildTextual("myCustomAction", "Test", function (actionPresenter) {
        console.info("on click");
        actionPresenter.setEnabled(false);
    });

    var footerActions = searchFormAPI.getFooterActions();
    footerActions.remove(action.getId());
    footerActions.add(action);
});
```
