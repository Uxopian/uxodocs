---
title: Ancienne installation
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

- Dézipper ARenderApp.zip avec 7zip
- Ouvrez **dashboard.html**
- Modifiez l'URL de l'UI par celle que vous déployez (dans l'exemple il s'agit du 4.8.7)
```xml
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
```
- Ouvrez votre coffre
- Installer le ARenderApp.zip dans les applications de votre coffre.

```xml
<!-- Commentaire nettoyé -->
```
*( M-Files Admin -> choisir le coffre -> clique droit -> Applications -> Installer )*

- Déconnectez-vous du coffre et reconnectez-vous pour vous assurer que les changements sont pris en compte


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
