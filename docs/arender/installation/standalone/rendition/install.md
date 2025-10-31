---
title: Installation
---

Si l'installation est une montée de version de la version 4.8 vers la version 2023.0, merci de consulter la documentation 
```xml
détaillée de mise à jour [ici](<!-- Commentaire nettoyé -->).
```

## Installation avec l'installeur

Nous recommandons l'installation d'ARender via l'installeur car il contient tous les logiciels additionnels nécessaires 
au bon fonctionnement du produit et dans les versions validées par nos équipes. C'est la méthode d'installation la plus 
fiable. 
Le seul prérequis est un JDK ou JRE valide (voir **Prérequis** (lien supprimé)).

### Téléchargement de l'installeur

Utilisez les informations d'identification fournies (contactez arender-sales@arondor.com pour demander l'accès) pour 
télécharger le fichier JAR d'installation de Rendition :


### Installation

Exécuter la commande ci-dessous :

```bash
```

Voici un exemple des étapes d'installation sous Windows :

* Sélectionner le dossier d'installation :

```xml
<!-- Commentaire nettoyé -->
```

* Sélectionner les composants à installer. Les composants non sélectionnées devront être installés manuellement.

```xml
<!-- Commentaire nettoyé -->
```

* Écran de fin d'installation :
```xml
<!-- Commentaire nettoyé -->
```

* Les logiciels installés, à l'exception de LibreOffice, seront situés dans le dossier ***third_party*** :

```xml
<!-- Commentaire nettoyé -->
```

**Félicitations, l'installation est terminée !**

## Méthodes d'Installation Alternatives d'ARender

## Installation en mode silencieux

#### Télécharger le fichier de configuration


#### Configuration de l'installation

Diverses propriétés peuvent être ajoutées : 

| Propriétés                                       | Mandatory/Optional | Fonction                                                     | Valeurs possibles |
| ------------------------------------------------ | ------------------ | ------------------------------------------------------------ | ----------------- |
| INSTALL_PATH                                     | Obligatoire        | Destination de l'installation                                | Chemin absolue    |
| arender.silent.install                           | Optionnel          | Mettre à true lors d'une installation silencieuse (-options) | True/false        |
| arender.install.as.service                       | Optionnel          | Installer en tant que service                                | True/false        |
| arender.install.libreoffice                      | Optionnel          | Installer Libreoffice                                        | True/false        |
| arender.install.wkhtmltopdf.portable             | Optionnel          | Installer Wkhtmltopdf                                        | True/false        |
| arender.install.imagemagick.portable             | Optionnel          | Installer ImageMagick                                        | True/false        |
| arender.install.ffmpeg.portables                 | Optionnel          | Installer FFmpeg en mode portable                            | True/false        |
| arender.install.msoffice.prerequisites (Windows) | Optionnel          | Installer les prérequis Microsoft Office pour ARender        | True/false        |

Exemple, pour une installation en mode silencieux, ajouter la propriété **arender.silent.install=true** dans 
**install-rendition.properties**.

#### Commande d'installation silencieuse

Pour une installation en mode silencieux, une option doit être passée en paramètre au moment de lancer l'installation avec le jar.
```bash
$> java -jar ARender-rendition-installer.jar -options install-rendition.properties
```

### Installation avec le package zip

#### Prérequis

Pour l'installation avec le package zip, les logiciels additionnels doivent être installés manuellement.

```xml
<!-- Commentaire nettoyé -->
```
Nous vous recommandons d’utiliser Chocolatey pour gérer cela facilement : 
Nous vous recommandons d'installer ces logiciels à partir des packages de distribution officiels de l'OS. 

| Type de Documents       | Logiciel                        | Prérequis                                                                                                  |
| ----------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Documents Office        | LibreOffice ou Microsoft Office | LibreOffice 5+ (LibreOffice 5 sur RHEL/CentOS (6) nécessite libGL.so.1). Microsoft Office 2013+.           |
| Images                  | ImageMagick                     | ImageMagick 7+ (sous Windows, valider que le binaire convert.exe existe, sinon, le lier à from magick.exe) |
| Mails et HTML           | WKHtmlToPdf                     | wkhtmltopdf 0.12.5+                                                                                        |
| Vidéos, Audios et GIFs  | FFmpeg                          | FFmpeg 2.8.15+                                                                                             |

S'assurer que les logiciels additionnels sont dans la PATH du serveur :

| Logiciel    | Variable qui doit être présente dans la variable d'environnement PATH du serveur                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| LibreOffice | *soffice*                                                                                                                                         |
| ImageMagick | *magick* (Sous Windows, valider que la librairie nommée convert.exe existe, si ce n'est pas le cas merci de la créer via un lien vers magick.exe) |
| WKHtmlToPdf | *wkhtmltopdf*                                                                                                                                     |
| FFmpeg      | *ffmpeg* and *ffprobe*                                                                                                                            |

#### Configuration de l'OS (Linux uniquement)

Si le serveur n'a pas de serveur X (Linux), veuillez installer xfvb et exécuter les commandes ci-dessous :

```bash
$> echo -e '#!/bin/bash\nxvfb-run -a --server-args="-screen 0, 1024x768x24" /usr/bin/wkhtmltopdf -q $*' > /usr/bin/wkhtmltopdf.sh
$> chmod a+x /usr/bin/wkhtmltopdf.sh
$> ln -s /usr/bin/wkhtmltopdf.sh /usr/local/bin/wkhtmltopdf
```

#### Installation

Dézipper le fichier zip de la rendition dans le dossier de votre choix.

Nous recommandons un dossier proche de la racine sous les systèmes Windows pour mieux absorber la limite de caractères 
des systèmes de fichier Windows.
