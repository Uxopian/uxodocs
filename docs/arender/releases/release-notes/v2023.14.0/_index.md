---
title: "ARender v2023.14.0 – Notes de version"
description: "Version mineure incluant un correctif pour les coordonnées de sélection de texte incorrectes et de 
---

> **Note de mise à niveau :** consultez [v2023.14.0](/fr/releases/upgrade-notes/v2023.14.0/) pour connaître la procédure
> détaillée.

## Aperçu

ARender 2023.14.0 est une version mineure qui inclut plusieurs correctifs pour le rendu de texte, les interactions avec 
les hyperliens, les signatures numériques et la stabilité de la plateforme. Cette version inclut également des mises à 
jour de sécurité et des améliorations pour l'installation hors ligne de RHEL8.

## Prérequis

| Composant | Versions prises en charge |
| --------- | ------------------------- |
| OpenJDK   | 8 ou 11                   |

## Perspective Utilisateur

**Détection correcte du type MIME pour les fichiers .txt**  
ARender détecte désormais correctement certains fichiers .txt comme du texte plutôt que comme des e-mails, garantissant 
ainsi un rendu correct. (AR-16678)

**Prise en charge améliorée des signatures numériques**  
Les données de signature PDF sont désormais conformes lors de l'utilisation de certificats racines configurés. 
(AR-17212)

**Optimisation de la taille des PDF pour la conversion TIFF**  
Les PDF générés conservent désormais une taille raisonnable lors de la conversion TIFF en JPEG et du téléchargement du 
résultat. (AR-17326)

**Correction du chevauchement des styles d'hyperliens inversés**  
Les surlignages des hyperliens inversés ne provoquent plus de problèmes de chevauchement visuel lorsque PDFOwl est 
actif. (AR-17469)

**Fermeture correcte du panneau DocLink**  
Lorsque vous désactivez le mode hyperlien ou que vous utilisez la touche Échap, le panneau de droite du document se 
ferme correctement. (AR-17486)

**Correction des titres dans le navigateur d'hyperliens**  
Les cibles des hyperliens affichent désormais correctement les titres des documents dans le navigateur d'hyperliens. 
(AR-17640)

**Correction des caractères spéciaux dans les documents HTML**  
Les caractères spéciaux des fichiers .html s'affichent désormais correctement. (AR-17805)

## Perspective Développeur / Intégrateur

**Gestion de l'expiration des jetons**  
ARender redirige désormais correctement les utilisateurs vers la page de connexion si leur jeton d'actualisation a
expiré, évitant ainsi les erreurs HTTP 500.
(AR-17769)

**Installation hors ligne améliorée pour RHEL8**  
L'installation de Rendition s'effectue désormais correctement dans les environnements RHEL8 sans accès à Internet.
(AR-17782)

**Mise à niveau de sécurité de Spring Boot**  
Spring a été mis à niveau vers la version 2.7.18 et Spring Boot vers la version 2.7.29 afin de corriger les récentes CVE
de sécurité. (AR-17841, AR-17851)

## Perspective Exploitation

*Aucun changement opérationnel spécifique dans cette version.*

## Journal des modifications

| Résumé                                                                    | Type      | Clé                                                       | Problèmes liés                                                                        |
|---------------------------------------------------------------------------|-----------|-----------------------------------------------------------|---------------------------------------------------------------------------------------|
| Fichiers .txt détectés à tort comme e-mail                                | Anomalie  | [AR-16678](https://arondor.atlassian.net/browse/AR-16678) | [TMAPR-5550](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-5550) |
| Signature numérique non affichée correctement                             | Anomalie  | [AR-17212](https://arondor.atlassian.net/browse/AR-17212) | [TMAPR-6064](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6064) |
| PDF trop volumineux après conversion TIFF en JPEG                         | Anomalie  | [AR-17326](https://arondor.atlassian.net/browse/AR-17326) | [TMAPR-6108](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6108) |
| Le style d'hyperlien inversé provoque un chevauchement avec PDFOwl        | Anomalie  | [AR-17469](https://arondor.atlassian.net/browse/AR-17469) |                                                                                       |
| Le document de droite ne se ferme pas lors de la désactivation de DocLink | Anomalie  | [AR-17486](https://arondor.atlassian.net/browse/AR-17486) | [TMAPR-6235](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6235) |
| Le navigateur d'hyperliens affiche un titre de document incorrect         | Anomalie  | [AR-17640](https://arondor.atlassian.net/browse/AR-17640) | [TMAPR-6327](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6327) |
| L'expiration du jeton d'actualisation ne redirige pas                     | Anomalie  | [AR-17769](https://arondor.atlassian.net/browse/AR-17769) | [TMAPR-6401](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6401) |
| Échec de l'installation hors ligne de RHEL8                               | Anomalie  | [AR-17782](https://arondor.atlassian.net/browse/AR-17782) |                                                                                       |
| Problème de caractères spéciaux dans les fichiers .html                   | Anomalie  | [AR-17805](https://arondor.atlassian.net/browse/AR-17805) | [TMAPR-6474](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6474) |
| Mise à niveau de Spring Boot pour des raisons de sécurité                 | Anomalie  | [AR-17841](https://arondor.atlassian.net/browse/AR-17841) |                                                                                       |
| Mise à niveau de Spring Boot pour obtenir des CVE supplémentaires         | Anomalie  | [AR-17851](https://arondor.atlassian.net/browse/AR-17851) |                                                                                       |

## Téléchargement

| Description                                              | Binary                                                                                                                                                                                                | SHA-256                                                                                                                                                                                                     |
|----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Installateur du serveur de rendition ARender             | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.14.0/rendition-engine-installer-2023.14.0-rendition.jar)  | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.14.0/rendition-engine-installer-2023.14.0-rendition.jar.sha256)  |
| Interface WEB ARender – Application Spring Boot autonome | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.14.0/arondor-arender-hmi-spring-boot-package-2023.14.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.14.0/arondor-arender-hmi-spring-boot-package-2023.14.0.zip.sha256) |
| HMI ARender – Application J2EE EAR – FileNet 5.x         | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.14.0/arondor-arender-hmi-filenet-ear-2023.14.0.ear)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.14.0/arondor-arender-hmi-filenet-ear-2023.14.0.ear.sha256)                 |
| HMI ARender – Application J2EE WAR – Content Manager 8.1 | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.14.0/arondor-arender-hmi-cm-2023.14.0.war)                                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.14.0/arondor-arender-hmi-cm-2023.14.0.war.sha256)                                   |
| Plugin ARender : IBM Content Navigator                   | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.14.0/arondor-arender-navigator-plugin-2023.14.0.jar)               | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.14.0/arondor-arender-navigator-plugin-2023.14.0.jar.sha256)               |
| Plugin ARender : Alfresco Share                          | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.14.0/arender-for-alfresco-share-plugin-2023.14.0.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.14.0/arender-for-alfresco-share-plugin-2023.14.0.jar.sha256)             |
| Plugin ARender : Alfresco ADF (base d'intégration)       | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.14.0/arender-for-alfresco-ADF-plugin-2023.14.0.zip)                 | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.14.0/arender-for-alfresco-ADF-plugin-2023.14.0.zip.sha256)                 |
| API ARender : Client                                     | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.14.0/arondor-arender-client-api-2023.14.0-javadoc.jar)                   | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.14.0/arondor-arender-client-api-2023.14.0-javadoc.jar.sha256)                   |
| API ARender : Rendition                                  | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.14.0/arondor-arender-rendition-api-2023.14.0-javadoc.jar)             | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.14.0/arondor-arender-rendition-api-2023.14.0-javadoc.jar.sha256)             |
