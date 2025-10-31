---
title: Changements Rendition
---

## Document Service Broker (Module RenditionEngine)

### Propriétés dans le fichier application.properties

#### Les propriétés supprimées

| Version 4                                                 | Description                                                                             |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| eureka.client.register-with-eureka                        | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                   |
| eureka.client.fetch-registry                              | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                   |
| logging.level.com.netflix.eureka                          | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                   |
| logging.level.com.netflix.discovery                       | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                   |
| spring.servlet.multipart.enabled                          | Activer les téléchargements partitionnés                                                |
| spring.servlet.multipart.file-size-threshold              | Seuil après lequel les fichiers sont écrits sur le disque                               |
| spring.servlet.multipart.location                         | Emplacement des fichiers temporaires                                                    |
| spring.servlet.multipart.max-file-size                    | Taille maximale du fichier                                                              |
| spring.servlet.multipart.max-request-size                 | Taille maximale de la requête                                                           |
| server.tomcat.max-http-form-post-size                     | Taille maximale de la requête                                                           |
| arender.endpoint.metrics.export.document.accessor.enabled | L'export des métriques du point de terminaison de chargement de document accessor       |
| arender.endpoint.metrics.export.document.size.enabled     | L'export des métriques du point de terminaison de récupération de la taille de document |
| arender.endpoint.metrics.export.document.dpi.enabled      | L'export des métriques du point de terminaison de récupération du DPI de document       |


#### Les propriétés modifiées

| Version 4                                              | Version 2023                                           | Description                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| arender.endpoint.metrics.export.alter.document.enabled | arender.endpoint.metrics.export.transformation.enabled | L'export des métriques du point de terminaison de transformation de document         |
| arender.endpoint.metrics.export.video.enabled          | arender.endpoint.metrics.export.get.file.chunk.enabled | L'export des métriques du point de terminaison de récupération de morceau de fichier |


### Propriétés dans le fichier application.yaml

#### Les propriétés supprimées

| Version 4                              | Description                                                                                   |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| rest-template:connect-timeout          | Détermine le délai d'attente jusqu'à ce qu'une nouvelle connexion soit complètement établie   |
| rest-template:read-timeout             | Détermine le délai d'attente jusqu'à ce qu'il finisse de lire les octets de données du socket |
| rest-template:max-connection-total     | Le nombre total de connexions pouvant être réutilisées lors de futures requêtes               |
| rest-template:max-connection-per-route | Le nombre total de connexions par route pouvant être réutilisées lors de futures requêtes     |
| rest-template:max-keep-alive           | Détermine la durée de vie d'une connexion lorsqu'elle n'est pas utilisée                      |

Les connexions sont toujours configurables avec de nouvelles propriétés situées dans le fichier application.properties.

## Document Converter (Module Taskconversion)

### Propriétés dans le fichier application.properties

#### Les propriétés supprimées

| Version 4                                                 | Description                                                                                           |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| rtf.conversion.timeout                                    | Délai d'attente en secondes pour la conversion des fichiers RTF en PDF                                |
| pdf.merge.timeout                                         | Délai d'attente en secondes pour fusionner des PDF en un seul PDF                                     |
| emltopdf.custom.mail.title                                | Configuration par défaut d'eml2pdf pour les en-têtes de mail                                          |
| emltopdf.custom.mail.title.separator                      | Configuration par défaut d'eml2pdf pour les en-têtes de mail                                          |
| emltopdf.custom.mail.attachment.header                    | Configuration par défaut d'eml2pdf pour les en-têtes de mail                                          |
| emltopdf.custom.mail.display.subject.in.title             | Configuration par défaut d'eml2pdf pour les en-têtes de mail                                          |
| emltopdf.use.legacy.header                                | Configuration par défaut d'eml2pdf pour les en-têtes de mail                                          |
| emltopdf.custom.rtf.tag.list                              | Configuration par défaut d'eml2pdf pour les en-têtes de mail                                          |
| emltopdf.config.filter.special.characters.regex           | Configuration par défaut d'eml2pdf pour les en-têtes de mail                                          |
| emltopdf.config.filter.replacement.character              | Configuration par défaut d'eml2pdf pour les en-têtes de mail                                          |
| emltopdf.encode.header.with.body.encoding                 | Si true, le sujet et le titre des pièces jointes peut être encodé selon l'encodage principal du corps |
| emltopdf.config.format.date                               | Détermine le format des dates dans les mails                                                          |
| text.factory.delegate.bean.name                           | Détermine à quel bean nous déléguons la tâche de convertir le texte en pdf                            |
| arender.endpoint.metrics.export.document.accessor.enabled | L'export des métriques du point de terminaison de chargement de document accessor                     |
| arender.endpoint.metrics.export.document.size.enabled     | L'export des métriques du point de terminaison de récupération de la taille de document               |
| arender.endpoint.metrics.export.document.dpi.enabled      | L'export des métriques du point de terminaison de récupération du DPI de document                     |


#### Les propriétés modifiées

| Version 4                                                               | Version 2023                                           | Description                                                                          |
| ----------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| rendition.office.options=--headless,--convert-to,pdf:writer_pdf_Export  | rendition.office.options=--headless,--convert-to       | Options de Libre Office                                                              |
| obfuscate.deleteText=true                                               | redact.deleteText=true                                 | Changement du nom de la propriété                                                    |
| obfuscate.flattenText=false                                             | redact.flattenText=false                               | Changement du nom de la propriété                                                    |
| document.fallback.font.path=../fonts/                                   | document.font.path=../fonts/                           | Changement du nom de la propriété                                                    |
| arender.endpoint.metrics.export.alter.document.enabled                  | arender.endpoint.metrics.export.transformation.enabled | L'export des métriques du point de terminaison de transformation de document         |
| arender.endpoint.metrics.export.video.enabled                           | arender.endpoint.metrics.export.get.file.chunk.enabled | L'export des métriques du point de terminaison de récupération de morceau de fichier |


Les propriétés de configuration de la messagerie ont en fait été déplacées vers le fichier application.properties du Document Service Broker

```xml
La manière de configurer le type mime a changé, pour plus d'informations voir [ici](<!-- Commentaire nettoyé -->).
```

### Propriétés dans le fichier application.yaml

#### Les propriétés supprimées

| Version 4                                                 | Description                                                                                     |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| rest-template:connect-timeout                             | Détermine le délai d'attente jusqu'à ce qu'une nouvelle connexion soit complètement établie     |
| rest-template:read-timeout                                | Détermine le délai d'attente jusqu'à ce qu'il finisse de lire les octets de données du socket   |
| rest-template:max-connection-total                        | Le nombre total de connexions pouvant être réutilisées lors de futures requêtes                 |
| rest-template:max-connection-per-route                    | Le nombre total de connexions par route pouvant être réutilisées lors de futures requêtes       |
| rest-template:max-keep-alive                              | Détermine la durée de vie d'une connexion lorsqu'elle n'est pas utilisée                        |
| eurekastatusPageUrlPath                         | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                           |
| eurekahealthCheckUrlPath                        | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                           |
| eurekaleaseRenewalIntervalInSeconds             | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                           |
| eurekaleaseExpirationDurationInSeconds          | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                           |
| eurekametadataMap:nativeMimeType                | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                           |
| eurekaclient:enabled                            | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                           |
| eurekaclient:registerWithEureka                 | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                           |
| eurekaclient:fetchRegistry                      | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                           |
| eurekaclient:serviceUrl                         | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                           |
| eurekaclientdefaultZone             | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                           |
| apppdfFactory                         | Convertisseur de PDF                                                                            |
| appmailFactory                        | Convertisseur de Mail                                                                           |
| apparchiveFactory                     | Convertisseur d'archive                                                                         |
| appemptyDocumentConverter             | Convertisseur de document vide                                                                  |
| appsplit                  | Nom de l'opération interne qui détermine le processus de transformation de document à effectuer |
| appmultiSplit             | Nom de l'opération interne qui détermine le processus de transformation de document à effectuer |
| apphierarchicalMultiSplit | Nom de l'opération interne qui détermine le processus de transformation de document à effectuer |
| appconvert                | Nom de l'opération interne qui détermine le processus de transformation de document à effectuer |
| apprenderAnnotations      | Nom de l'opération interne qui détermine le processus de transformation de document à effectuer |
| apprenderFDFAnnotations   | Nom de l'opération interne qui détermine le processus de transformation de document à effectuer |
| appcompress               | Nom de l'opération interne qui détermine le processus de transformation de document à effectuer |
| nurse:components[0]functionality                          | Configuration du nurse pour les mails                                                           |
| nurse:components[0]factoryName                            | Configuration du nurse pour les mails                                                           |
| nurse:components[0]samplePath                             | Configuration du nurse pour les mails                                                           |
| nurse:components[0]docIdStr                               | Configuration du nurse pour les mails                                                           |

#### Les propriétés modifiées

| Version 4                                     | Version 2023                                        | Description                             |
| --------------------------------------------- | --------------------------------------------------- | --------------------------------------- |
| eurekametadataMap:context           | eurekametadataMap:context                 | Changement de la valeur de la propriété |
| appimageFactory           | appimageFactory                 | Changement de la valeur de la propriété |
| apptextFactory            | apppdfboxTextFactory            | Changement du nom de la propriété       |
| nurse:components[1]samplePath: "video.mp4"    | nurse:components[1]samplePath: "video.avi"          | Changement de la valeur de la propriété |
| nurse:components[2]factoryName: "textFactory" | nurse:components[2]factoryName: "pdfboxTextFactory" | Changement de la valeur de la propriété |

## Document Renderer (Module JNIPdfEngine)

### Propriétés dans le fichier application.properties

#### Les propriétés supprimées

| Version 4                                                 | Description                                                                             |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| arender.endpoint.metrics.export.document.accessor.enabled | L'export des métriques du point de terminaison de chargement de document accessor       |
| arender.endpoint.metrics.export.document.size.enabled     | L'export des métriques du point de terminaison de récupération de la taille de document |
| arender.endpoint.metrics.export.document.dpi.enabled      | L'export des métriques du point de terminaison de récupération du DPI de document       |

#### Les propriétés modifiées

| Version 4                                              | Version 2023                                           | Description                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| arender.endpoint.metrics.export.alter.document.enabled | arender.endpoint.metrics.export.transformation.enabled | L'export des métriques du point de terminaison de transformation de document         |
| arender.endpoint.metrics.export.video.enabled          | arender.endpoint.metrics.export.get.file.chunk.enabled | L'export des métriques du point de terminaison de récupération de morceau de fichier |


### Propriétés dans le fichier application.yaml

#### Les propriétés supprimées

| Version 4                                        | Description                                                                                   |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| eurekastatusPageUrlPath                | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| eurekahealthCheckUrlPath               | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| eurekaleaseRenewalIntervalInSeconds    | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| eurekaleaseExpirationDurationInSeconds | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| eurekaserviceUrl:defaultZone             | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| kubproviderRendition-Engine:serviceId  | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| kubproviderRendition-Engine:host       | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| kubproviderRendition-Engine:port       | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| kubproviderRendition-Engine:secure     | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| kubproviderRendition-Engine:uri        | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| cachemaxCacheSize                      | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| cachecacheDuration                     | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| rest-template:connect-timeout                    | Détermine le délai d'attente jusqu'à ce qu'une nouvelle connexion soit complètement établie   |
| rest-template:read-timeout                       | Détermine le délai d'attente jusqu'à ce qu'il finisse de lire les octets de données du socket |
| rest-template:max-connection-total               | Le nombre total de connexions pouvant être réutilisées lors de futures requêtes               |
| rest-template:max-connection-per-route           | Le nombre total de connexions par route pouvant être réutilisées lors de futures requêtes     |
| rest-template:max-keep-alive                     | Détermine la durée de vie d'une connexion lorsqu'elle n'est pas utilisée                      |



## Document Text Handler (Module PDFBoxEngine)

### Propriétés dans le fichier application.properties

#### Les propriétés supprimées

| Version 4                                                 | Description                                                                             |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| arender.endpoint.metrics.export.document.accessor.enabled | L'export des métriques du point de terminaison de chargement de document accessor       |
| arender.endpoint.metrics.export.document.size.enabled     | L'export des métriques du point de terminaison de récupération de la taille de document |
| arender.endpoint.metrics.export.document.dpi.enabled      | L'export des métriques du point de terminaison de récupération du DPI de document       |

#### Les propriétés modifiées

| Version 4                                              | Version 2023                                           | Description                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| arender.endpoint.metrics.export.alter.document.enabled | arender.endpoint.metrics.export.transformation.enabled | L'export des métriques du point de terminaison de transformation de document         |
| arender.endpoint.metrics.export.video.enabled          | arender.endpoint.metrics.export.get.file.chunk.enabled | L'export des métriques du point de terminaison de récupération de morceau de fichier |

### Propriétés dans le fichier application.yaml

#### Les propriétés supprimées

| Version 4                                        | Description                                                                                   |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| eurekastatusPageUrlPath                | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| eurekahealthCheckUrlPath               | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| eurekaleaseRenewalIntervalInSeconds    | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| eurekaleaseExpirationDurationInSeconds | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| eurekaserviceUrl:defaultZone             | Ancienne propriété qui n'est plus utilisée même dans les dernières V4                         |
| rest-template:connect-timeout                    | Détermine le délai d'attente jusqu'à ce qu'une nouvelle connexion soit complètement établie   |
| rest-template:read-timeout                       | Détermine le délai d'attente jusqu'à ce qu'il finisse de lire les octets de données du socket |
| rest-template:max-connection-total               | Le nombre total de connexions pouvant être réutilisées lors de futures requêtes               |
| rest-template:max-connection-per-route           | Le nombre total de connexions par route pouvant être réutilisées lors de futures requêtes     |
| rest-template:max-keep-alive                     | Détermine la durée de vie d'une connexion lorsqu'elle n'est pas utilisée                      |


#### Les propriétés modifiées

| Version 4                                   | Version 2023                                      | Description                             |
| ------------------------------------------- | ------------------------------------------------- | --------------------------------------- |
| eurekametadataMap:context         | eurekametadataMap:context               | Changement de la valeur de la propriété |
