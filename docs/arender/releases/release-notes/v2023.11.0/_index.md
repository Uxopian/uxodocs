---
title: "ARender v2023.11.0 – Notes de version"
description: "Version mineure améliorant le rendu des PDF signés, la gestion des URL Base64 longues, l'impression PDF/A et la cohérence visuelle des hyperliens."
---

> **Note de mise à niveau :** consultez [v2023.11.0](/fr/releases/upgrade-notes/v2023.11.0/) pour connaître la procédure détaillée.

## Aperçu

ARender 2023.11.0 est une version mineure qui renforce la précision du rendu des documents—en particulier pour les documents signés et les URL longues encodées. Elle améliore également l'impression PDF/A, la cohérence visuelle des hyperliens et corrige les régressions de navigation dans les destinations nommées.

## Prérequis

| Composant | Versions prises en charge |
| --------- | ------------------------ |
| OpenJDK   | 8 ou 11                  |

## Perspective Utilisateur

📄 **Correction de l'extraction de mise en page dans les PDF signés**  
Améliore le rendu de la mise en page des documents signés lorsque PDFOwl est utilisé. *(AR-17644)*

🌐 **Prise en charge des caractères spéciaux dans les URL Base64**  
Les longues URL de document contenant des caractères spéciaux (comme `+`, `~`) sont désormais correctement encodées et gérées. *(AR-17394)*

🔗 **Correction de l'affichage de la surbrillance des hyperliens**  
Les hyperliens de style inversé alignent désormais correctement le texte—la superposition bleue suit précisément le texte noir. *(AR-17491)*

🖨️ **Les documents PDF/A ne sont plus bloqués à l'impression**  
Les fichiers PDF/A peuvent maintenant être imprimés sans restriction via ARender. *(AR-17494)*

📍 **Correction des hyperliens vers les destinations nommées**  
Cliquer sur un lien vers une destination nommée fonctionne désormais de manière fiable, même lors de clics successifs. *(AR-17623)*

## Perspective Développeur / Intégrateur

*Aucun changement spécifique pour les développeurs ou intégrateurs dans cette version.*

## Perspective Exploitation

*Aucun changement opérationnel spécifique dans cette version.*

## Journal des modifications

| Résumé | Type | Clé | Tickets liés |
| ---------------------------------------------------------- | ---------- | -------- | ------------- |
| L'extraction de mise en page échoue pour les documents signés | Problème   | AR-17644 | TMAPR-6313    |
| Problème d'encodage dans les longues URL de document Base64 | Problème   | AR-17394 | TMAPR-6088    |
| Texte d'hyperlien en style inversé mal aligné                | Problème   | AR-17491 | TMAPR-6248    |
| Documents PDF/A bloqués à l'impression                       | Problème   | AR-17494 | TMAPR-6222    |
| Problème de navigation avec les liens de destinations nommées| Régression | AR-17623 | TMAPR-6309    |

## Téléchargement

| Description | Binary | SHA-256 |
|-------------|--------|---------|
| Installateur du serveur de rendition ARender | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.11.0/rendition-engine-installer-2023.11.0-rendition.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.11.0/rendition-engine-installer-2023.11.0-rendition.jar.sha256) |
| Interface WEB ARender – Application Spring Boot autonome | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.11.0/arondor-arender-hmi-spring-boot-package-2023.11.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/2023.11.0/arondor-arender-hmi-spring-boot-package-2023.11.0.zip.sha256) |
| HMI ARender – Application J2EE EAR – FileNet 5.x | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.11.0/arondor-arender-hmi-filenet-ear-2023.11.0.ear) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-filenet-ear/2023.11.0/arondor-arender-hmi-filenet-ear-2023.11.0.ear.sha256) |
| HMI ARender – Application J2EE WAR – Content Manager 8.1 | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.11.0/arondor-arender-hmi-cm-2023.11.0.war) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-cm/2023.11.0/arondor-arender-hmi-cm-2023.11.0.war.sha256) |
| Plugin ARender : IBM Content Navigator | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.11.0/arondor-arender-navigator-plugin-2023.11.0.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-navigator-plugin/2023.11.0/arondor-arender-navigator-plugin-2023.11.0.jar.sha256) |
| Plugin ARender : Alfresco Share | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.11.0/arender-for-alfresco-share-plugin-2023.11.0.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/2023.11.0/arender-for-alfresco-share-plugin-2023.11.0.jar.sha256) |
| Plugin ARender : Alfresco ADF (base d'intégration) | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.11.0/arender-for-alfresco-ADF-plugin-2023.11.0.zip) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/2023.11.0/arender-for-alfresco-ADF-plugin-2023.11.0.zip.sha256) |
| API ARender : Client | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.11.0/arondor-arender-client-api-2023.11.0-javadoc.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-client-api/2023.11.0/arondor-arender-client-api-2023.11.0-javadoc.jar.sha256) |
| API ARender : Rendition | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.11.0/arondor-arender-rendition-api-2023.11.0-javadoc.jar) | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-rendition-api/2023.11.0/arondor-arender-rendition-api-2023.11.0-javadoc.jar.sha256) |
