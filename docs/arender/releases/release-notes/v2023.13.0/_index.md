---
title: "ARender v2023.13.0 – Notes de version"
description: "Version mineure incluant un correctif pour les coordonnées de sélection de texte incorrectes et de 
---

> **Note de mise à niveau :** consultez [v2023.13.0](/fr/releases/upgrade-notes/v2023.13.0/) pour connaître la procédure
> détaillée.

## Aperçu

ARender 2023.13.0 est une version mineure qui corrige un problème d'alignement des coordonnées lors de la sélection de 
texte, et introduit de nouvelles options JVM pour permettre l'affinité de session (sticky session) dans les déploiements
en cluster WebSphere ND.

## Prérequis

| Composant | Versions prises en charge |
| --------- | ------------------------- |
| OpenJDK   | 8 ou 11                   |

## Perspective Utilisateur

**Coordonnées de sélection de texte corrigées**  
La sélection de texte correspond maintenant à la position réelle du contenu visible, même dans les cas complexes. *(AR-17426)*

## Perspective Développeur / Intégrateur

**Affinité de session WebSphere ND**  
De nouvelles options JVM permettent de configurer l'identifiant de routage ajouté à la session, afin d'assurer
l'affinité de session (sticky session) dans un environnement WebSphere en cluster. *(AR-17638)*

## Perspective Exploitation

*Aucun changement opérationnel spécifique dans cette version.*

## Journal des modifications

| Résumé                                         | Type     | Clé      | Tickets liés  |
|------------------------------------------------|----------| -------- | ------------- |
| Mauvaise position de sélection de texte        | Anomalie | AR-17426 | TMAPR-6178    |
| Options JVM pour affinité de session (WAS ND)  | Anomalie | AR-17638 |               |

## Téléchargement

| Description | Binary | SHA-256 |
|-------------|--------|---------|
| Installateur du serveur de rendition ARender | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.13.0/rendition-engine-installer-2023.13.0-rendition.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.13.0/rendition-engine-installer-2023.13.0-rendition.jar.sha256) |
| Interface WEB ARender – Application Spring Boot autonome | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.13.0/arondor-arender-hmi-spring-boot-package-2023.13.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.13.0/arondor-arender-hmi-spring-boot-package-2023.13.0.zip.sha256) |
| HMI ARender – Application J2EE EAR – FileNet 5.x | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.13.0/arondor-arender-hmi-filenet-ear-2023.13.0.ear) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.13.0/arondor-arender-hmi-filenet-ear-2023.13.0.ear.sha256) |
| HMI ARender – Application J2EE WAR – Content Manager 8.1 | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.13.0/arondor-arender-hmi-cm-2023.13.0.war) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.13.0/arondor-arender-hmi-cm-2023.13.0.war.sha256) |
| Plugin ARender : IBM Content Navigator | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.13.0/arondor-arender-navigator-plugin-2023.13.0.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.13.0/arondor-arender-navigator-plugin-2023.13.0.jar.sha256) |
| Plugin ARender : Alfresco Share | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.13.0/arender-for-alfresco-share-plugin-2023.13.0.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.13.0/arender-for-alfresco-share-plugin-2023.13.0.jar.sha256) |
| Plugin ARender : Alfresco ADF (base d'intégration) | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.13.0/arender-for-alfresco-ADF-plugin-2023.13.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.13.0/arender-for-alfresco-ADF-plugin-2023.13.0.zip.sha256) |
| API ARender : Client | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.13.0/arondor-arender-client-api-2023.13.0-javadoc.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.13.0/arondor-arender-client-api-2023.13.0-javadoc.jar.sha256) |
| API ARender : Rendition | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.13.0/arondor-arender-rendition-api-2023.13.0-javadoc.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.13.0/arondor-arender-rendition-api-2023.13.0-javadoc.jar.sha256) |
