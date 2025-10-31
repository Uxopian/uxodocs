---
title: ARender v2023.14.0 – Notes de version
---

> **Note de mise à jour :** consultez [v2023.14.0](/fr/releases/release-notes/v2023.14.0/).

## Depuis la version 2023.13.0

Cette version n'apporte aucune modification d'architecture, mais des propriétés de configuration supplémentaires ont été ajoutées.

## Configuration

#### Propriétés de configuration ajoutées

#### Rendu

**trusted.root.certificates.path** : Chemin d'accès au dossier contenant les certificats de confiance Adobe, Liste de confiance approuvée Adobe (AATL).
**image.conversion.target.mime.type** : Type MIME des images générées pour le document TIFF. Les valeurs possibles sont _image/png_ et _image/jpeg_.
**disk.free.space.threshold** : Vérification de la disponibilité du seuil d'espace disque (en Go) pour le téléchargement du document vers le rendu.

## Produit

#### Modifications techniques

- Amélioration du point de terminaison de préparation /readiness qui échouait lorsque trop de threads HTTP étaient alloués.
- Amélioration de l'écriture et de la vérification des fichiers temporaires dans le système de fichiers.
- L'utilisateur final est correctement redirigé vers la page de connexion configurée lors de l'actualisation de la page web après l'expiration de sa session.
- Ajout de la prise en charge manquante du recadrage d'image et du filtre d'image avec le microservice PDFOwl


## Important

### Régression

_(Mis à jour le 30/09/2025)_

Les images Docker pour FileNet et Alfresco en version 2023.13.0 ne contiennent pas les fichiers JAR des connecteurs requis dans le conteneur :

- Alfresco : **artifactory.arondor.cloud/arender-ui-springboot:2023.14.0-alfresco**
- FileNet : **artifactory.arondor.cloud/arender-ui-springboot:2023.14.0-filenet**


#### Contournement

Pour rétablir le bon fonctionnement, ajoutez manuellement le fichier JAR du connecteur dans le conteneur :

- Connecteur Alfresco : Télécharger [ici](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-cmis/2023.14.0/arondor-arender-cmis-2023.14.0-jar-with-dependencies.jar).
- Connecteur FileNet : Télécharger [ici](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-filenet-ce/2023.14.0/arondor-arender-filenet-ce-2023.14.0-jar-with-dependencies.jar).

Montez le fichier JAR à l’emplacement suivant dans le conteneur, **/home/app/lib**.


### Cloudsmith

Veuillez noter que les binaires de cette version ne sont pas disponibles sur Cloudsmith en raison d'un problème de publication lors de la sortie.

Cependant, tous les binaires de cette version sont disponibles sur Artifactory et peuvent être consultés et utilisés sans problème.

Nous nous excusons pour la gêne occasionnée et mettons tout en œuvre pour que les futures versions soient publiées de manière cohérente sur tous les canaux de distribution.