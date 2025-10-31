---
title: Configuration
---

## Fichiers de configuration de ARender Web-UI

> Les fichiers de configuration ARender sont situés dans le dossier **configurations/** du package ARender Web-UI.

| Nom du fichier                        | Rôle et Contenu                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arender-custom-client.properties      | Fichier de configuration des **propriétés client** ARender Web-UI. Toutes les propriétés y sont listées. Décommenter et modifier la valeur des propriétés pour utiliser. Plus d'information ici : **Profile** (lien supprimé)                                                  |
| arender-custom-server.properties      | Fichier de configuration des **propriétés serveur** ARender Web-UI. Toutes les propriétés y sont listées. Décommenter et modifier la valeur des propriétés pour utiliser.                                                                                                                                                             |
| arender-custom-integration.xml        | Fichier de configuration des **Bean Spring XML**. Ajoutez y votre **configuration cliente** spécifique.                                                                                                                                                                                                                               |
| arender-custom-server-integration.xml | Fichier de configuration des **Bean Spring XML**. Ajoutez y votre **configuration serveur** spécifique.                                                                                                                                                                                                                               |
| application.properties                | Fichier de configuration des **propriétés Spring Boot**. Ajoutez-y votre configuration spécifique Spring Boot. Les différentes propriétés disponibles sont listées dans la [documentation en ligne Spring]("https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html"). (Fichier à créer si besoin).|

### Définition du serveur de Rendition

Pour définir un ou plusieurs serveurs de Rendition distant, modifier le fichier de configuration 
**arender-custom-server.properties** comme suit :


```cfg
arender.server.rendition.hosts=\{rendition_server_1:8761/\},\{rendition_server_2:8761/\},\{rendition_server_n:8761/\}
```


```text
La valeur de chaque _"\\{rendition_server_x\\}"_ ci-dessus doit être modifiée par la bonne URL de chaque serveur de 
```
Rendition.

*(N'oubliez pas de redémarrer ARender Web-UI)*

## Fichiers de ressources personnalisés de ARender Web-UI

> Les fichiers de ressources doivent être placés dans un dossier **public/** à la racine du package ARender Web-UI.

#### Exemple d'externalisation dans *public*

Pour l'ajout d'un fichier *.css* qui sera nommé *test.css* et sera placé directement dans le dossier *public* :

```xml
<!-- Commentaire nettoyé -->
```

```cfg
style.sheet=css/arender-style.css,test.css
```


## Définition du dossier de sauvegarde des annotations XFDF

Un dossier par défaut est configuré dans ARender pour sauvegarder les
annotations XFDF en tant que fichier XML.

**L'utilisateur lançant le serveur d'application doit avoir les droits
de lecture et d'écriture sur ce dossier.**

Par défaut, les annotations XFDF sont sauvegardées dans un dossier
*ARenderAnnotations/* lui-même créé dans le dossier HOME de
l'utilisateur lançant le serveur d'application.

Si le serveur d'application est lancé en "service" sur
windows (*sans utilisateur configuré pour le lancer*) le dossier sera
créé dans _C:\Windows\System32\config\systemprofile_.

Pour configurer un dossier en particulier, il faut soit créer :

- soit modifier le fichier de propriété serveur
  *arender-custom-server.properties* et y ajouter la propriété
  **arender.server.annotations.xfdf.localstorage.default.path** avec
  la valeur voulue
- une propriété système nommée
  **arender.annotation.xfdf.localstorage.default.path** et lui donner
  la valeur du dit dossier,

## Feuille de style : ARender-mat.css

La plupart des composants graphiques d’ARender peuvent être paramétrés
dans la feuille de style. Consulter le fichier pour plus de détails.

*Cette feuille de style est liée au profil par défaut.
Se référer au Guide de configuration pour plus de détails.*


## Configurer le partage de cache entre tous les ARender Web-UIs

Il est possible de configurer le partage de cache entre tous les Web-UIs via la configuration de Hazelcast.
Il permet un meilleur support de la scalabilité de la Web-UI grâce à son système partage de cache distribué.

  Cette configuration ne doit être faite que si les conditions ci-après sont réalisées :
  * Pas de session permanentes (sticky session) sur le répartiteur de charge en amont des ARender Web-UIs
  * Le partage de cache via hazelcast entre toutes les Rendition doit être actif 
  * Le dossier temporaire des Rendition soit être partagé entre tous les serveurs de Rendition (Avec NFS ou Lustre FSx)

Pour activer la fonctionnalité de partage de cache il faut modifier le fichier 
**arender-custom-server.properties** comme suit :

```xml
<!-- Commentaire nettoyé -->
```

```cfg
# Defines the cache strategy to use. Valid values : ehCacheStrategy, hazelCastStrategy
arender.server.cache.strategy=hazelCastStrategy
# Path of the hazelCast configuration file, if the value is empty then the default one in the classpath will be used. 
arender.server.cache.hazelCast.config.path=
# Types of routing table map (local only : Classic OR with Redis backup : Redis OR with Hazelcast backup : Hazelcast)
# Possible values are : Classic, Redis or Hazelcast
arender.server.routing.table.type=Hazelcast
```


Ci-dessous la configuration par défaut de Hazelcast dans ARender :


```cfg
hazelcast:
  map:
    documentAccessorsHMI:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
    directDocumentMap:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
    spring:oauth2:oauth2Authorized:
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
  network:
    port:
      port: 5702
    join:
      auto-detection:
        enabled: true
    rest-api:
      enabled: true
      endpoint-groups:
        CLUSTER_READ:
          enabled: true
        HEALTH_CHECK:
          enabled: true
        WAN:
          enabled: true
        DATA:
          enabled: true
```




Pour l'instant les connecteurs supportés par ARender n'ont pas encore subi les changements nécessaires pour faire supporter HazelCast.

Si vous avez implémenté votre propre connecteur, il faudra alors rendre votre DocumentAccessor correctement sérialisable/désérialisable.

