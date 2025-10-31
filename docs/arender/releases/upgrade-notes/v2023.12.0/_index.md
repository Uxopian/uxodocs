---
title: ARender v2023.12.0 – Notes de version
---

> **Note de mise à jour :** consultez [v2023.12.0](/fr/releases/release-notes/v2023.12.0/).

## Depuis la version 2023.11.0

Cette version introduit de nouvelles configurations de propriétés et des modifications dans la gestion des sessions. Les intégrateurs auront désormais besoin d'un accès supplémentaire à notre nouveau dépôt Cloudsmith pour les bibliothèques et binaires Maven.


## Produit

### Configuration

#### Maven

À partir de cette version, ARender publiera les bibliothèques dans les dépôts Uxopian Cloudsmith. Les développeurs doivent configurer les dépôts Cloudsmith ; sinon, le projet Maven ne sera pas compilé correctement.

Vous trouverez ci-dessous le fichier de configuration `settings.xml`, qui inclut les dépôts Artifactory et Cloudsmith.



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Commentaire nettoyé -->

  <!-- Commentaire nettoyé -->
      **arondor**
      **ARTIFACTORY_ID**
      <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
      **uxopian-release**
      **CLOUDSMITH_ID**
      <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
      **uxopian-herodevs**
      **CLOUDSMITH_ID**
      <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->

  <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
          **arondor**
          **https://artifactory.arondor.cloud/artifactory/arondor-all/**
        <!-- Commentaire nettoyé -->
      <!-- Commentaire nettoyé -->
          <snapshots >
          **arondor**
          **https://artifactory.arondor.cloud/artifactory/arondor-all/**
        <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
      <!-- Commentaire nettoyé -->
  <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
  <!-- Commentaire nettoyé -->
```


Remplacez **ARTIFACTORY_ID** par l'identifiant utilisateur du client/partenaire.
Remplacez **ARTIFACTORY_TOKEN** par la clé Artifactory du client/partenaire.
Remplacez **CLOUDSMITH_ID** par l'identifiant utilisateur du client/partenaire.
Remplacez **CLOUDSMITH_TOKEN** par la clé API Cloudsmith du client/partenaire.

Pour accéder à Artifactory ou Cloudsmith, veuillez contacter l'équipe d'assistance ARender à l'adresse arender-support@uxopian.com.


#### ARender Web-UI

Les propriétés de configuration suivantes ont été ajoutées côté serveur de ARender Web-UI.



```cfg
# Configure a limit on the number of bytes that can be buffered (in bytes)
arender.server.rendition.rest.max.in.memory.size=8000000
# The maximum number of connections before starting pending acquisition on existing ones
arender.server.rendition.rest.max.connections=200
# The maximum time after which a pending acquire must complete (in milliseconds)
arender.server.rendition.rest.pending.acquire.timeout=120000
# The maximum number of registered requests for acquire to keep in a pending queue
# Set the value "-1" for no limit
arender.server.rendition.rest.pending.acquire.max.count=-1
# The Duration after which the channel will be closed when idle (in milliseconds)
# Set the value "-1" for no limit
arender.server.rendition.rest.max.idle.time=-1
# The Duration after which the channel will be closed (in milliseconds)
# Set the value "-1" for no limit
arender.server.rendition.rest.max.life.time=-1
# The maximum time to read a response through the network (in milliseconds)
arender.server.rendition.rest.read.timeout=120000
# The maximum time to write a request through the network (in milliseconds
arender.server.rendition.rest.write.timeout=120000
```


### Session Management

#### ARender Web-UI

Avant la version 2023.4.0, la gestion des sessions était assurée par le conteneur de servlets. Le cookie de session était nommé **JSESSIONID** pour tous les types de packaging (WAR, EAR ou JAR).

De la version 2023.4.0 à la version 2023.11.0, la gestion des sessions était assurée par Spring Session Hazelcast. Le cookie de session était nommé **SESSION** pour tous les types de packaging.

À partir de la version 2023.12.0 :

Pour les packagings WAR et EAR, la gestion des sessions est désormais assurée par le conteneur de servlets, et le cookie est nommé **JSESSIONID**.

Pour les packagings JAR, Spring Session Hazelcast est utilisé par défaut, et le cookie est nommé **SESSION**. Vous pouvez désactiver cette option pour revenir à la gestion des sessions par le conteneur de servlets en définissant la propriété suivante : ```arender.server.session.hazelcast.enabled=false```.


--------------------------------------------------------------------------------------------------------------------------------------------------------------
|  Version  |  WAR/EAR   |                                                                JAR                                                                |
|-----------|------------|-----------------------------------------------------------------------------------------------------------------------------------|
| 4.8.x     | JSESSIONID |                                                                N/A                                                                |
| 2023.0.0  | JSESSIONID |                                                             JSESSIONID                                                            |
| 2023.1.0  | JSESSIONID |                                                             JSESSIONID                                                            |
| 2023.2.0  | JSESSIONID |                                                             JSESSIONID                                                            |
| 2023.3.0  | JSESSIONID |                                                             JSESSIONID                                                            |
| 2023.4.0  | SESSION    |                                                              SESSION                                                              |
| 2023.5.0  | SESSION    |                                                              SESSION                                                              |
| 2023.6.0  | SESSION    |                                                              SESSION                                                              |
| 2023.7.0  | SESSION    |                                                              SESSION                                                              |
| 2023.8.0  | SESSION    |                                                              SESSION                                                              |
| 2023.9.0  | SESSION    |                                                              SESSION                                                              |
| 2023.10.0 | SESSION    |                                                              SESSION                                                              |
| 2023.11.0 | SESSION    |                                                              SESSION                                                              |
| 2023.12.0 | JSESSIONID | SESSION (arender.server.session.hazelcast.enabled=true, par défaut) / JSESSIONID (arender.server.session.hazelcast.enabled=false) |



## Important

### Régression

_(Mis à jour le 30/09/2025)_

Les images Docker pour FileNet et Alfresco en version 2023.12.0 ne contiennent pas les fichiers JAR des connecteurs requis dans le conteneur :

- Alfresco : **artifactory.arondor.cloud/arender-ui-springboot:2023.12.0-alfresco**
- FileNet : **artifactory.arondor.cloud/arender-ui-springboot:2023.12.0-filenet**


#### Contournement

Pour rétablir le bon fonctionnement, ajoutez manuellement le fichier JAR du connecteur dans le conteneur :

- Connecteur Alfresco : Télécharger [ici](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-cmis/2023.12.0/arondor-arender-cmis-2023.12.0-jar-with-dependencies.jar).
- Connecteur FileNet : Télécharger [ici](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-filenet-ce/2023.12.0/arondor-arender-filenet-ce-2023.12.0-jar-with-dependencies.jar).

Montez le fichier JAR à l’emplacement suivant dans le conteneur, **/home/app/lib**.