---
title: ARender v2023.13.0 – Notes de version
---

> **Note de mise à jour :** consultez [v2023.13.0](/fr/releases/release-notes/v2023.13.0/).

## Depuis la version 2023.12.0

Dans cette version, nous avons introduit la prise en charge de la personnalisation du format du cookie de session afin de mieux prendre en charge l’affinité de session (sessions persistantes) sur différents équilibreurs de charge (LB), notamment IBM HTTP Server (IHS).

## Produit

### Configuration

#### ARender Web-UI

Certains équilibreurs de charge interprètent les cookies de session différemment. Si beaucoup acceptent les formats standards, d'autres (par exemple, IHS) nécessitent des séparateurs de route ou des structures de cookies spécifiques pour prendre en charge l'affinité de session. Cette amélioration offre une flexibilité pour configurer le comportement des cookies de session sans modifier le code de l'application.

Vous pouvez désormais contrôler le formatage du cookie de session à l'aide des propriétés JVM suivantes :

```cfg
# Définit l'identifiant de route (par exemple, l'ID d'instance ou le nom du noeud) ajouté à l'ID de session
com.uxopian.arender.session.jvm.route
# Définit le caractère séparateur entre l'ID de session et la route
com.uxopian.arender.session.jvm.route.separator
# Active ou désactive l'encodage Base64 de l'ID de session
com.uxopian.arender.session.jvm.base64
```

Documentation se trouve [ici](/fr/installation/standalone/web-ui/filenet/filenet-was/#-répartition-de-charge-et-gestion-de-session-pour-arender-sur-ibm-websphere)


**Note:**

Ces options sont facultatives. Si elles ne sont pas définies, l'application utilisera le comportement par défaut.
Veillez à appliquer ces paramètres de manière cohérente sur tous les nœuds derrière l'équilibreur de charge pour une affinité optimale.


## Important

### Régression

_(Mis à jour le 30/09/2025)_

Les images Docker pour FileNet et Alfresco en version 2023.13.0 ne contiennent pas les fichiers JAR des connecteurs requis dans le conteneur :

- Alfresco : **artifactory.arondor.cloud/arender-ui-springboot:2023.13.0-alfresco**
- FileNet : **artifactory.arondor.cloud/arender-ui-springboot:2023.13.0-filenet**


#### Contournement

Pour rétablir le bon fonctionnement, ajoutez manuellement le fichier JAR du connecteur dans le conteneur :

- Connecteur Alfresco : Télécharger [ici](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-cmis/2023.13.0/arondor-arender-cmis-2023.13.0-jar-with-dependencies.jar).
- Connecteur FileNet : Télécharger [ici](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-filenet-ce/2023.13.0/arondor-arender-filenet-ce-2023.13.0-jar-with-dependencies.jar).

Montez le fichier JAR à l’emplacement suivant dans le conteneur, **/home/app/lib**.