---
title: "ARender v2023.12.0 – Notes de version"
description: "Correction d'un problème mineur avec l'annotation avec une couleur transparente lors du téléchargement d'un PDF avec annotations, problème avec les annotations FDF, problème avec les informations en double dans l'annotation des notes autocollantes, problème avec la configuration de rendus multiples."
---

> **Note de mise à niveau :** consultez [v2023.12.0](/fr/releases/upgrade-notes/v2023.12.0/) pour connaître la procédure détaillée.

## Aperçu

ARender 2023.12.0 est une version mineure qui inclut des correctifs et améliorations importants. Cette version corrige les problèmes d'annotations, notamment celles contenant des couleurs transparentes ou des informations dupliquées dans les en-têtes de pense-bêtes. Elle corrige également un problème de configuration lié aux URL de rendu, garantissant ainsi un équilibre de charge correct entre toutes les URL configurées au lieu d'une seule.

## Prérequis

| Composant | Versions prises en charge |
| --------- | ------------------------- |
| OpenJDK   | 8 ou 11                   |

## Perspective Utilisateur

Cette version inclut plusieurs correctifs et nouvelles fonctionnalités améliorant l'expérience utilisateur :

**Correction des annotations avec une couleur transparente**
Le téléchargement d'un PDF avec des annotations sur fond transparent ne pose plus problème. *(AR-17633)*

**Gestion des sessions**
Le connecteur ARender FileNet pour FlowerDocs ne présente plus de problème de cookie de session suite à la désactivation de Spring Session Hazelcast. *(AR-17720)*

**Problèmes d'affichage des pense-bêtes résolus**
Le contenu des pense-bêtes s'affiche désormais correctement au survol des PDF téléchargés avec des annotations FDF. *(AR-17630)*

**En-têtes de notes textuelles en double supprimés**
Les en-têtes de notes textuelles des PDF téléchargés avec annotations ne contiennent plus d'informations en double. *(AR-17624)*

**Nouveau point de terminaison de recherche**
Un nouveau point de terminaison d'API REST a été ajouté pour la fonctionnalité de recherche. *(AR-17564)*

**Paramètre de 'upload' facultatif ajouté**
Un nouveau paramètre de requête facultatif a été ajouté pour empêcher l'échec du point de terminaison de 'upload' lors du transfert d'un format non pris en charge. *(AR-17533)*

**Délai d'expiration du client REST de l'interface Web configurable**
De nouvelles propriétés ont été ajoutées pour configurer le délai d'expiration du client REST de l'interface Web. *(AR-17729)*

**Équilibrage de charge des URL de rendition multiple**
L'interface Web d'ARender équilibre désormais correctement la charge des requêtes entre toutes les URL de rendu configurées, améliorant ainsi les performances et la fiabilité. *(AR-17700)*


## Perspective Développeur / Intégrateur

Cette version introduit quelques modifications pouvant nécessiter une action :

**Mise à jour du dépôt Maven** 
Pour bénéficier de la prise en charge de la sécurité étendue avec Spring 5.x/Spring Boot 2.x, les développeurs et intégrateurs doivent ajouter le dépôt Uxopian Cloudsmith dédié à leur fichier de configuration « Maven settings.xml ». Sans cela, les projets Maven utilisant des dépendances ARender risquent de ne pas être correctement compilés avec les seuls dépôts Artifactory.

**Modifications de la gestion des sessions** 
Une modification de la gestion des sessions a été implémentée pour désactiver Spring Session Hazelcast, car le connecteur ARender FileNet pour FlowerDocs utilise déjà Spring Session Redis, ce qui a entraîné des conflits. Cela peut impacter les intégrateurs utilisant l'affinité de session.


## Perspective Exploitation

*Aucun changement opérationnel spécifique dans cette version.*

## Journal des modifications

| Résumé                                                                 | Type       | Clé      | Tickets liés            |
| ---------------------------------------------------------------------- | ---------- | -------- | ----------------------- |
| Couleur d'arrière-plan transparente de l'annotation                    | Problème   | AR-17633 | TMAPR-6323              |
| Connecteur ARender FileNet pour FlowerDocs                             | Problème   | AR-17720 | TMAPR-6189              |
| Problème d'annotation avec un PDF téléchargé avec des annotations FDF  | Problème   | AR-17630 | TMAPR-5796              |
| Nouvelle recherche de point de terminaison REST                        | Nouveauté  | AR-17564 |                         |
| Le 'upload' du point de terminaison REST n'échoue pas                  | Evolution  | AR-17533 |                         |
| Propriétés REST du client Timeout                                      | Evolution  | AR-17729 |                         |
| Configuration de Rendition multiples                                   | Régréssion | AR-17700 | TMAPR-6404 / TMAPR-6354 |

## Téléchargement

| Description | Binary | SHA-256 |
|-------------|--------|---------|
| Installateur du serveur de rendition ARender | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.12.0/rendition-engine-installer-2023.12.0-rendition.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.12.0/rendition-engine-installer-2023.12.0-rendition.jar.sha256) |
| Interface WEB ARender – Application Spring Boot autonome | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.12.0/arondor-arender-hmi-spring-boot-package-2023.12.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.12.0/arondor-arender-hmi-spring-boot-package-2023.12.0.zip.sha256) |
| HMI ARender – Application J2EE EAR – FileNet 5.x | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.12.0/arondor-arender-hmi-filenet-ear-2023.12.0.ear) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.12.0/arondor-arender-hmi-filenet-ear-2023.12.0.ear.sha256) |
| HMI ARender – Application J2EE WAR – Content Manager 8.1 | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.12.0/arondor-arender-hmi-cm-2023.12.0.war) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.12.0/arondor-arender-hmi-cm-2023.12.0.war.sha256) |
| Plugin ARender : IBM Content Navigator | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.12.0/arondor-arender-navigator-plugin-2023.12.0.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.12.0/arondor-arender-navigator-plugin-2023.12.0.jar.sha256) |
| Plugin ARender : Alfresco Share | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.12.0/arender-for-alfresco-share-plugin-2023.12.0.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.12.0/arender-for-alfresco-share-plugin-2023.12.0.jar.sha256) |
| Plugin ARender : Alfresco ADF (base d'intégration) | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.12.0/arender-for-alfresco-ADF-plugin-2023.12.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.12.0/arender-for-alfresco-ADF-plugin-2023.12.0.zip.sha256) |
| API ARender : Client | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.12.0/arondor-arender-client-api-2023.12.0-javadoc.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.12.0/arondor-arender-client-api-2023.12.0-javadoc.jar.sha256) |
| API ARender : Rendition | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.12.0/arondor-arender-rendition-api-2023.12.0-javadoc.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.12.0/arondor-arender-rendition-api-2023.12.0-javadoc.jar.sha256) |
