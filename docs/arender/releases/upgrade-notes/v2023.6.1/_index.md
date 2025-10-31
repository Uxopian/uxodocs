---
title: ARender v2023.6.1 – Notes de version
---

> **Note de mise à jour :** consultez [v2023.6.1](/fr/releases/release-notes/v2023.6.1/).

## Depuis la version 2023.6.0

Aucun changement architectural ou de configuration.

### Configuration et paramètres supplémentaires

##### AR-17736: RenditionWeatherPolling : ajout des stratégies de distribution "Round robin" et "Random"

Cette amélioration ajoute deux nouveaux algorithmes pour gérer la répartition de la charge de travail de l'interface utilisateur (IHM) vers Rendition. Cette sélection intervient lorsque l'interface utilisateur doit sélectionner un serveur Rendition pour l'ouverture d'un nouveau document. Seuls les serveurs Rendition disponibles peuvent être sélectionnés, c'est-à-dire ceux ayant répondu avec succès aux requêtes du serveur d'interface utilisateur dans la dernière seconde.
La valeur de configuration de l'interface utilisateur est :
```cfg
arender.server.rendition.weather.distribution.strategy
```
Ce paramètre peut prendre les valeurs suivantes :
- ***BEST_TARGET*** : Sélectionne uniquement le serveur de rendu avec le score météo le plus élevé
- ***WEIGHTED_DISTRIBUTION*** : Sélectionne le serveur de rendu selon une sélection aléatoire pondérée en fonction du score météo
- ***ROUND_ROBIN*** (nouveau) : Utilise un algorithme Round-Robin pour parcourir la liste des serveurs de rendu disponibles.
- ***RANDOM*** (nouveau) : Sélectionne aléatoirement le serveur disponible, quel que soit le score météo.

##### AR-17639: Ajoutez d'options JVM pour configurer l'identifiant de routage ajouté à l'ID de session pour l'affinité de session

Cette fonctionnalité introduit trois nouvelles options de configuration :
- ***com.uxopian.arender.session.jvm.route*** indique le nom unique du serveur à utiliser pour falsifier le cookie de session.
- ***com.uxopian.arender.session.jvm.route.separator*** est le séparateur de caractères entre l'identifiant de session et le nom du serveur.
- ***com.uxopian.arender.session.jvm.base64 active*** désactive l'encodage final du cookie en Base64. Cette option doit être désactivée lorsque la valeur du cookie doit être interprétée par IHS.

Exemples:
```cfg
-Dcom.uxopian.arender.session.jvm.route=src01
-Dcom.uxopian.arender.session.jvm.route.separator=:
-Dcom.uxopian.arender.session.jvm.base64=false
```

##### AR-17731: Accepter (ou rejeter) les demandes de téléchargement de fichiers en fonction de l'espace disque

Par défaut, le Broker de la Rendition refusera désormais toute ouverture de document si l'espace disponible pour le stockage temporaire du contenu est inférieur à 1 Go.
Ce paramètre peut être modifié via l'option ***disk.free.space.threshold*** dans la configuration du Broker de la Rendition.
Cette valeur est un nombre flottant exprimé en gigaoctets; la valeur par défaut est 1.
Exemple:
```cfg
disk.free.space.threshold=2
```