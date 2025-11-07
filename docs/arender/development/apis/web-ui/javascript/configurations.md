---
title: "Configurations"
---







### Retrieve the value of a UI property in JS

Since version 2023.4.0, it is possible to retrieve the value of some properties from ARender's JS APIs.
To be precise, these are the UI configuration properties which can be found in *configurations/arender-custom-client.properties*.

### JS API

Object: getARenderJS()

| Function         | Arguments (type)  | Description                                    |
| ---------------- | ----------------- | ---------------------------------------------- |
| getConfiguration | property (String) | Allows you to retrieve the value of a property |

### Recoverable properties

Here is the list of properties recoverable in version 2023.4.0:

| Property                                      | Default value (in *configurations/arender-custom-client.properties*) |
| --------------------------------------------- | -------------------------------------------------------------------- |
| documentnavigator.width                       | 320                                                                  |
| documentnavigator.initialWidth                | Default                                                              |
| thumbexplorer.contextualMenu.createPageAnchor | true                                                                 |
| thumbexplorer.columns                         | 2                                                                    |

### Example



Recovery of the property value *thumbexplorer.contextualMenu.createPageAnchor*

```js
getARenderJS().getConfiguration("thumbexplorer.contextualMenu.createPageAnchor")
```
