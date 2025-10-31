---
title: Serveur de présentation
---

## Configuration

### Par variable d'environment

Toutes les propriétés peuvent être renseignées par variable d'environment en suivant les règles suivantes :

- la variable d'environment doit être en lettre capitale
- remplacer les **"."** par **"_"**
- les propriétés de profile d'ARender doivent commencer par `"ARENDER_"`
- les propriétés de serveur d'ARender doivent commencer par `"ARENDERSRV_"`

preference.color.mode -> ARENDER_COLOR_PREFERENCE

arender.server.rendition.hosts -> ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS

### Par volumes

#### Profile

**Emplacement du fichier configuration par défaut :** /usr/local/tomcat/webapps/ROOT/WEB-INF/classes/arender.properties

**Emplacement du dossier pour la configuration personnel :** /home/arender/ARenderConfiguration

Voir la documentation :

- **Profile** (lien supprimé)
- **Liste des propriété front ARender** (lien supprimé)

#### Serveur

**Emplacement du fichier configuration par défaut :** /home/arender/ARenderConfiguration/arender-custom-server.properties

**Emplacement du dossier pour la configuration personnel :** /home/arender/ARenderConfiguration
