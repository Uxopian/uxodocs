---
title: Notifications
---

## Modifier les notifications

- Objet : getARenderJS()

    | Fonction                     | Description                                                                     | Arguments                                                                   |
    | ---------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
    | registerNotifyLogEvent(hook) | Enregistre une fonction hook qui altère les notifications avant de les afficher | **callback :** la fonction à appeler en cas d'affichage d'une notification  |

Les fonctions suivantes permettent d'altérer les notifications reçues
via la fonction hook.

- Objet : getARenderJS()

    | Fonction                               | Description                             | Argument                                                                                                                                                                                           |
    | -------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |


```js
getARenderJS().registerNotifyLogEvent(function(event, level, message)<!-- Expression supprimée -->;
});
```

