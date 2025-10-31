---
title: Alfresco
---

Cette page détaille la configuration d'ARender pour la GED Alfresco.


Pour continuer sur cette page, ARender en standalone doit être correctement configuré.

```xml
Si ce n'est pas le cas, merci de vous rendre [ici](<!-- Commentaire nettoyé -->).
```

## Connecteur 

Ajouter le connecteur cmis dans le dossiers /lib.


## Configurations 

### Définition de la connexion à Alfresco

Le connecteur ARender pour Alfresco permet une communication entre ARender et Alfresco Content Services (et Alfresco Process Services).

Par défaut, ARender est configuré pour communiquer en CMIS avec un Alfresco en local.

* Pour configurer la **communication CMIS** (recommandation éditeur) avec un Alfresco installé sur un autre serveur, ajouter la propriété ci-dessous avec la valeur voulue :


```cfg
arender.server.alfresco.atom.pub.url=http://alfrescoHost/alfresco/api/-default-/cmis/versions/1.1/atom
```

L'authentification à Alfresco se fera avec un **ticket Alfresco**

* Pour configurer la **communication SOAP**, ajouter les propriétés ci-dessous avec la valeur voulue :


```cfg
arender.server.alfresco.use.soap.ws=true
arender.server.alfresco.soap.ws.url=http://alfrescoHost/alfresco/cmisws/cmis?wsdl
arender.server.alfresco.user=userNameValue
arender.server.alfresco.password=passwordValue
```

*  Gestion du contexte

Le contexte est le chemin utilisé par les applications (par exemple, Alfresco Share, SOLR, SharePoint et d'autres).
Si vous souhaitez déployer vers un contexte qui n'est pas */alfresco*, il doit être spécifié avec la propriété suivante :

```cfg
Arender.server.alfresco.context=mon-contexte
```

Par défaut, le contexte est *alfresco* (pour /alfresco).


### Annotations

#### Détails sur le stockage des annotations

Aucune configuration n'est nécessaire pour la gestion des annotations ARender dans Alfresco.

```text
Ces dernières sont sauvegardées en tant que child node du document lui-même. Le nom du child node est : **cm:arender-annotations-v\{version document\}**
```

```xml
<!-- Commentaire nettoyé -->
```

## L'installation est terminée

Vous pouvez maintenant démarrer le serveur alfresco et tenter d'ouvrir un fichier avec un lien formé de cette manière :

```html
http://{arender_serveur}:{arender_port}/ARenderHMI/?nodeRef={nodeRef}&user={user}&alf_ticket={ticket}&versionLabel={version}
```


```xml
Plus d'informations sur le connecteur Alfresco [ici](<!-- Commentaire nettoyé -->)
```
