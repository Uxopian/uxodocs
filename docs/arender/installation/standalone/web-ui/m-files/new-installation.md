---
title: Nouvelle installation
---

Nous présentons ici l'installation de la Web-UI dans M-Files. 

Dans notre exemple, nous déployons la Web-UI
dans un environnement avec :

- Système d'exploitation : Windows Server 2016 Datacenter
- M-Files 
- Un serveur Tomcat9
- Avoir une Rendition fonctionnelle. Il vous suffit de suivre cette ****documentation** (lien supprimé)**.


## Étapes pour configurer la Rendition





- Démarrer le serveur ARender Rendition


## Étapes pour installer la Web-UI

En utilisant l'identifiant et mot de passe préalablement fournis (ou contacter arender-sales@arondor.com si vous souhaitez un accès),
vous pouvez récupérer la version de l'application web utilisée en format WAR


* Program Files
    * Apache Software Foundation
        * Tomcat 9.0
            * webapps


Par la suite :

Vous devez modifier différentes valeurs du fichier *arender-server.properties* en fonction de la configuration de votre coffre-fort M-Files


## Étapes pour déployer ARender sur M-Files
Pour installer ARender sur le coffre-fort M-Files, suivez les étapes ci-dessous :
- Téléchargez VAF_MFF_ArenderConnector :
- Exécuter la console d'administration M-Files
- Faites un clic droit sur le coffre-fort souhaité et sélectionnez **Applications**
- Cliquez sur **Installer...**
- Sélectionnez le fichier **VAF_MFF_ArenderConnector_22.12.3.mfappx** précédemment téléchargé
- Cliquez sur **Oui** si cette fenêtre apparaît
```xml
<!-- Commentaire nettoyé -->
```
- L'application est maintenant installée
- Cliquez sur **Fermer**
- Cliquez sur **Oui** si cette fenêtre apparaît
```xml
<!-- Commentaire nettoyé -->
```

Maintenant que nous avons installé ARender sur le coffre-fort M-Files, nous pouvons commencer à configurer l'application.

## Étapes pour configurer ARender sur M-Files

VAF_MFF_ArenderConnector utilise un fichier de configuration JSON. Vous pouvez le gérer via l'interface graphique du client M-Files Admin.

- Exécuter le client Administrateur M-Files
- Cliquez sur la flèche à côté de votre coffre-fort
```xml
<!-- Commentaire nettoyé -->
```
- Cliquez sur **Configurations** pour votre coffre-fort
- Sélectionnez **Autres applications** puis sélectionnez **VAF_MFF_ArenderConnector**. Le tableau de bord apparaît
- Cliquez sur l'onglet **Configuration**
- Remplissez toutes les propriétés de configuration. En cliquant sur l'icône **i**, vous obtiendrez une aide qui s'affichera.
```xml
<!-- Commentaire nettoyé -->
```
- Une fois que vous avez configuré, cliquez sur **Enregistrer**


## Étapes pour ouvrir un document avec M-Files

- Redémarrer le serveur IIS

```xml
<!-- Commentaire nettoyé -->
```

- Démarrer le serveur Tomcat9
- Accédez à M-Files sous le lecteur M:\

```xml
<!-- Commentaire nettoyé -->
```

- Sélectionnez votre coffre
- Faites glisser et déposez un document pour l'ouvrir avec ARender

```xml
<!-- Commentaire nettoyé -->
```
