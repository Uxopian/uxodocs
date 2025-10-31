---
title: Redémarrage
---

Dans certaines situations, il peut être nécessaire de procéder au
redémarrage d’une ou des deux parties de l’application. En effet, toute
modification de configuration doit faire l’objet d’un redémarrage pour
que les changements puissent être pris en compte. Cette manipulation
peut également être appliquée en cas d’erreur inattendue. Étant donné
qu’ARender est stateless (sans état), un simple redémarrage suffit
afin de remédier à tout blocage de l’application.

## Serveur de rendition

Il suffit de redémarrer le service ARenderService. Pour cela, il suffit
d’utiliser les commandes suivantes :


```powershell
$> sc stop ARenderRenditionService
$> sc start ARenderRenditionService
```


Si le système possède **systemd** comme composant d'initialisation de votre système:

```bash
$> systemctl stop ARenderRenditionEngineService.service
$> systemctl start ARenderRenditionEngineService.service
```

Si **initd** est le composant d’initialisation de votre système, vous devrez lancer 

```bash
$> service ARenderRenditionEngineService stop
$> service ARenderRenditionEngineService start
```


## Serveur de présentation

Le redémarrage de l’application web est suffisant. Certains serveurs d’application
ne permettent pas de redémarrer séparément les applications, pour
ceux-ci il est donc nécessaire de redémarrer intégralement le serveur
d’application.
