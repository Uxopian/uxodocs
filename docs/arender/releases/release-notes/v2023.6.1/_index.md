---
title: "ARender v2023.6.1 – Notes de version"
description: "Version mineure incluant de nouvelles stratégies de distribution de documents vers les renditions, l'acceptation des requêtes basée sur l'espace disque, la résolution d'un problème avec l'identifiant de document périssable chiffré non réversible et de problème avec la configuration de rendus multiples"
---

> **Note de mise à niveau :** consultez [v2023.6.1](/fr/releases/upgrade-notes/v2023.6.1/) pour connaître la procédure détaillée.

## Aperçu

ARender 2023.6.1 est une version mineure qui augmente la résilience de la rendition empêchant le chargement de documents qui peuvent faire saturer l'espace disque. Elle ajoute aussi de nouvelles stratégies de distribution de documents vers les différentes renditions configurées et inclut également divers corrections.

## Prérequis

| Composant | Versions prises en charge |
| --------- | ------------------------ |
| OpenJDK   | 8 ou 11                  |

## Perspective Utilisateur

##### Équilibrage de charge des URL de rendition multiple
L'interface Web d'ARender équilibre désormais correctement la charge des requêtes entre toutes les URL de rendu configurées, améliorant ainsi les performances et la fiabilité. *(AR-17700)*

##### Distribution des documents vers les serveurs de rendition
L'interface Web d'ARender propose de nouvelles stratégies de distribution de documents, donnant ainsi plus de possibilité de configuration selon en fonction des cas d'usage des utilisateurs. *(AR-17736)*

##### Limitation des requêtes de chargement de document
Le serveur de rendition prend maintenant en compte l'espace disque disponible pour ainsi déterminer si il doit accepter ou pas des requêtes de chargement de document. *(AR-17731)*

##### Mes IDs de documents périssables cryptés sont réversibles
Les IDs de documents périssables cryptés qui contiennent l'horodatage EOL sont réversibles, ce qui permettra au document d'être automatiquement rechargée si il est invincé du cache. *(AR-17686)*


## Perspective Développeur / Intégrateur

*Aucun changement spécifique pour les développeurs ou intégrateurs dans cette version.*

## Perspective Exploitation

*Aucun changement opérationnel spécifique dans cette version.*

## Journal des modifications

| Résumé | Type | Clé | Tickets liés |
| ------ | ---- | --- | ------------ |
| Lorsque EncryptedPerishableSelfContainedDocumentIdGenerator est rétabli, gérez également le cas d'horodatage EOL | Evolution | AR-17686 | |
| Un seul des serveurs de rendu configurés est pris en compte | Régression | AR-17700 | TMAPR-6404 / TMAPR-6354 | |
| RenditionWeatherPolling : ajout des stratégies de distribution « Round robin » et « Random » | Evolution | AR-17736 | |
| Accepter (ou rejeter) les demandes de téléchargement de fichiers en fonction de l'espace disque | Evolution | AR-17731 | |
| Ajoutez des options JVM pour configurer l'identifiant de routage ajouté à l'ID de session pour l'affinité de session | Evolution | AR-17639 | |


## Téléchargement

| Description | Binary | SHA-256 |
|-------------|--------|---------|
| Installateur du serveur de rendition ARender | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.6.1/rendition-engine-installer-2023.6.1-rendition.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.6.1/rendition-engine-installer-2023.6.1-rendition.jar.sha256) |
| Interface WEB ARender – Application Spring Boot autonome | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.6.1/arondor-arender-hmi-spring-boot-package-2023.6.1.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.6.1/arondor-arender-hmi-spring-boot-package-2023.6.1.zip.sha256) |
| HMI ARender – Application J2EE EAR – FileNet 5.x | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.6.1/arondor-arender-hmi-filenet-ear-2023.6.1.ear) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.6.1/arondor-arender-hmi-filenet-ear-2023.6.1.ear.sha256) |
| HMI ARender – Application J2EE WAR – Content Manager 8.1 | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.6.1/arondor-arender-hmi-cm-2023.6.1.war) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.6.1/arondor-arender-hmi-cm-2023.6.1.war.sha256) |
| Plugin ARender : IBM Content Navigator | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.6.1/arondor-arender-navigator-plugin-2023.6.1.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.6.1/arondor-arender-navigator-plugin-2023.6.1.jar.sha256) |
| Plugin ARender : Alfresco Share | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.6.1/arender-for-alfresco-share-plugin-2023.6.1.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.6.1/arender-for-alfresco-share-plugin-2023.6.1.jar.sha256) |
| Plugin ARender : Alfresco ADF (base d'intégration) | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.6.1/arender-for-alfresco-ADF-plugin-2023.6.1.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.6.1/arender-for-alfresco-ADF-plugin-2023.6.1.zip.sha256) |
| API ARender : Client | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.6.1/arondor-arender-client-api-2023.6.1-javadoc.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.6.1/arondor-arender-client-api-2023.6.1-javadoc.jar.sha256) |
| API ARender : Rendition | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.6.1/arondor-arender-rendition-api-2023.6.1-javadoc.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.6.1/arondor-arender-rendition-api-2023.6.1-javadoc.jar.sha256) |