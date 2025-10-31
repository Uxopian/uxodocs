---
title: Activer les logs de performance
---

Vous pouvez depuis ARender 4.0.1 envoyer vos logs de performance soit
sur le disque, soit vers elastic search (6), soit les deux !

## Du côté ARender Web-UI (war)

Modifier au besoin les propriétés suivantes dans votre fichier :


```cfg
#active/désactive la partie logger disque
arender.server.perf.logger.use=true

#configuration d'elastic search
arender.server.perf.es.host=localhost
arender.server.perf.es.port=9200
arender.server.perf.es.protocol=http
arender.server.perf.es.index.name=arender-performance
#activation de l'envoi vers elastic search
arender.server.perf.es.use=false
```


## Du côté Rendition

Des propriétés YAML peuvent être ajoutées à la rendition afin de faire
le même comportement que le war Web-UI ARender :

```xml
<!-- Commentaire nettoyé -->
```

```yaml
    aop :
      active : false
      activateLogger : true
      activateEs : false
      esHost: localhost
      esPort: 9200
      esIndexName: arender-rendition-performance
      esProtocol: http

```


Il faut donc moduler avec le paramètre aop.active afin d'activer les
logs de performance côté rendition, puis choisir si la partie Logger
(disque) ou Es (elasticSearch) sera utilisée pour l'envoi des données.
On retrouve les même paramètres et les mêmes fonctionnements que pour le
war Web-UI.

## Utiliser l'AOP des logs de performance de rendition pour activer la sauvegarde des documents en rejet

De la même manière qu'il est possible d'utiliser et activer le
fonctionnement AOP pour avoir les logs de performance d'ARender, il est
possible d'activer la sauvegarde des documents en rejet.

Voici les trois paramétrages possibles:

```xml
<!-- Commentaire nettoyé -->
```

```yaml
    aop :
      rejectedDocs: false
      nbDaysKept: 1
      rejectedPath: "rejected/"
```


La propriété "rejectedDocs" si elle est active fait fonctionner la
sauvegarde des documents en erreur. La propriété "nbDaysKept" indique le
nombre de jours durant lesquels les documents vont être sauvegardés. La
propriété "rejectedPath" indique le chemin vers lequels les fichiers
vont être copiés.

Les valeurs par défaut sont celles indiquées dans l'exemple.
