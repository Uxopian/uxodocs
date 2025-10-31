---
title: Installation dans Share
---

Nous présentons ici la suite de l'installation de la Web-UI, dans le module Share de Alfresco.

## Récupérer les archives du serveur de présentation

En utilisant l'identifiant et mot de passe préalablement fournis,

## Redéploiement du serveur de présentation dans Alfresco

Si votre Alfresco et module Share ne partagent pas le même Tomcat, il faudra déposer les plugins
`arender-for-alfresco-share-plugin-{version}.jar` et `arender-for-alfresco-ACS-plugin-{version}.jar` dans le dossier `lib/` de chacune de ces
applications déployées.

S’ils sont déployés dans le même Tomcat, déposer les plugins `arender-for-alfresco-share-plugin-{version}.jar` et `arender-for-alfresco-ACS-plugin-{version}.jar` dans ` {alfresco_tomcat}/shared/lib`.

Les deux plugins permettent respectivement d'étendre l'API REST d'ACS utilisée par ARender et l'intégration du viewer ARender dans Share.

Ajouter les lignes suivantes dans le fichier ` {alfresco_tomcat}/shared/classes/alfresco/web-extension/share-config-custom.xml` entre les balises `alfresco-config` :

```xml
<config evaluator="string-compare" condition="Arender">
        <!-- Exemple d'URL du serveur ARender -->
        <!-- http://{arender_serveur}:{arender_port}/{arender_contexte} -->
</config>
```

## Installation terminée

Vous pouvez maintenant démarrer le serveur Alfresco et tenter d'ouvrir un fichier stocké dans celui-ci.

Vous avez terminé l'installation rapide d'ARender pour Alfresco Share. Pour aller plus loin dans la configuration du connecteur ARender pour Alfresco, consultez la documentation de configuration avancée.
