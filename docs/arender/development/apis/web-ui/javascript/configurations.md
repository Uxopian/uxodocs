---
title: Configurations
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: de4e2ddc46b969df50451773d7f83a2dd9ab62f265a46c37edbe50b04863fd77
---

### Retrieve the value of a UI property in JS

Since version 2023.4.0, it is possible to retrieve the value of some properties from ARender's JS APIs.
To be precise, these are the UI configuration properties which can be found in _configurations/arender-custom-client.properties_.

### JS API

Object: getARenderJS()

| Function         | Arguments (type)  | Description                                    |
| ---------------- | ----------------- | ---------------------------------------------- |
| getConfiguration | property (String) | Allows you to retrieve the value of a property |

### Recoverable properties

Here is the list of properties recoverable in version 2023.4.0:

| Property                                      | Default value (in _configurations/arender-custom-client.properties_) |
| --------------------------------------------- | -------------------------------------------------------------------- |
| documentnavigator.width                       | 320                                                                  |
| documentnavigator.initialWidth                | Default                                                              |
| thumbexplorer.contextualMenu.createPageAnchor | true                                                                 |
| thumbexplorer.columns                         | 2                                                                    |

### Example

Recovery of the property value _thumbexplorer.contextualMenu.createPageAnchor_

```js
getARenderJS().getConfiguration("thumbexplorer.contextualMenu.createPageAnchor");
```
