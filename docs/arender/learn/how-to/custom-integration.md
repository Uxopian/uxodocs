---
title: dossier d'intégration personnalisées
---

Dans le dossier de configuration d'ARender (Web-UI) se situent deux
fichiers permettant d'ajouter des intégrations personnalisées pour
ARender.

Ces fichiers sont vides par défaut et permettent à chaque version de
recopier l'intégration personnalisée facilement sans se soucier du
contenu de ce fichier.

Le but est d'éviter les conflits d'écrasement de version, mais il reste
important de vérifier les nouveaux paramètres pour garder sa version
d'ARender à jour.

- Dans la Web-UI:
  
  - configurations/arender-custom-integration.xml (configuration de la GUI utilisateur)
  - configurations/arender-custom-server-integration.xml  (configuration du serveur)

- Si vous ne souhaitez pas placer vos configurations dans le war
  ARender, vous pouvez alors utiliser les deux variables
  d'environnement suivantes :

  - customXmlServerPath : indique le chemin vers le fichier
    arender-custom-server-integration.xml .
  - customXmlClientPath : indique le chemin vers le fichier
    arender-custom-integration.xml.

Par exemple, vous pouvez définir la variable customXmlServerPath pour la
faire pointer sur un chemin de votre système de fichier :

```cfg
file\\configuration\\arender-server-configuration.xml
```
