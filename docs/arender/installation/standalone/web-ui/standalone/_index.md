---
title: Installation
---

Ci-après, une installation standard d’ARender Web-UI.

Pour installer sur **IBM FileNet**, vous pouvez sauter cette page et vous rendre directement sur :
```xml
[Installation de ARender sur IBM FileNet](<!-- Commentaire nettoyé -->).
```

Depuis ARender 2023.0.0, le déploiement de la WEB-UI ARender a été modifié. Veuillez consulter la 
```xml
documentation détaillée de mise à jour [ici](<!-- Commentaire nettoyé -->).
```

## Prérequis


### Matériel

| Catégorie   | Minimum | Conseillé                                                                                        |
| ----------- | ------- | ------------------------------------------------------------------------------------------------ |
| Nb Serveur  | 1       | Environ le nombre de serveur de rendition divisé par deux (exemple 4 serveurs de rendition donc 2 serveurs de présentation)|
| RAM         | 1Go     | 2Go                                                                                              |                                                           
| Type de CPU | 64Bits  | 64Bits                                                                                           |

### Logiciel

| Logiciel                   | Pré-requis                                                                   |
| -------------------------- | ---------------------------------------------------------------------------- |
| Java Runtime               | JRE 1.8 64 bits Minimum, OpenJDK 11 conseillé. JRE IBM J9 et java 17 ne sont pas supportés.                                                                                                                                                                                                                                       |
```xml
| ARender Rendition démarré  | La page de météo de la Rendition doit être au vert, voir [la documentation liée](<!-- Commentaire nettoyé -->). Si ce n'est pas le cas, merci d'installer la Rendition en suivant [cette documentation](<!-- Commentaire nettoyé -->).|
```

## Installation

### Download installation files

* Se munir du couple login/mot de passe d'accès à notre répertoire de binaires (si vous n'avez pas d'accès merci de prendre contact avec nous : arender-sales@arondor.com)
* Télécharger le zip :


* Décompresser le fichier zip dans le dossier de votre choix (Appelons le *[Web-UI-folder]*).
>Le fichier zip contient les script d'installation de la web-ui en tant que service mais aussi les scripts utiles à la suppression et au démarrage de ce service.

## Démarrage

* Extraire le contenu du zip dans le dossier de votre choix. (Appelons le *[Web-UI-folder]*)

* Ouvrir une console et utiliser la commande suivante : 


## Ouvrir une nouvelle fenêtre navigateur

Accès à  via un navigateur web.

```xml
<!-- Commentaire nettoyé -->
```


```text
L'URL à utiliser doit être comme suit : &lt;http:\{Web-UI-HostName\}:\{port-Web-UI\}\{ARenderContext\}&gt;:
```
```text
- *\{Web-UI-HostName\}* : le nom d'hôte du serveur d'application
```
```text
- *\{port-Web-UI\}* : le port du serveur d'application
```

### Pas de Rendition fonctionnelle en local

Si vous rencontrez l'erreur suivante, merci de lire la suite.

```xml
<!-- Commentaire nettoyé -->
```

Cela peut signifier que :
* Soit la Rendition en locale n'est pas installée ou démarrée : 
```xml
    * Dans ce cas merci de revenir sur la documentation ci-après : [Documentation d'installation de la Rendition](<!-- Commentaire nettoyé -->). 
```
* Soit la Rendition est installée sur un serveur disant :
```xml
    * Dans ce cas il faut configurer ARender en suivant la documentation sur la propriété **arender.server.rendition.hosts** : [Configuration de ARender Web-UI](<!-- Commentaire nettoyé -->).
```

## Installation de ARender Web-UI en service

* Ouvrir une ligne de commande avec les droits **administrateur**,
* Se rendre dans le dossier **[Web-UI-folder]**
* Exécuter le script d’installation comme indiqué ci-dessous :



```xml
<!-- Commentaire nettoyé -->
```
```cmd
$> .\ARenderHmiService-install.bat
```
```bash
$> ./ARenderHmiService-install.sh
```
    
Le service **ARenderHMIService** devrait être créé et en cours d'exécution sur le port 8080.
