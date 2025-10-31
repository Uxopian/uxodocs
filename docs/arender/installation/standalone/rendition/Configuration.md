---
title: Configuration
---

## Configuration de l'antivirus

Désactiver le scan du dossier et des sous-dossiers de la Rendition.

## Configuration du cache

### Local vs Shared

ARender utilise Hazelcast pour gérer le cache.

#### Cache local

Par défaut, chaque instance de Rendition maintient son propre cache, ce qui implique que les données en cache ne sont 
pas partagées entre toutes les instances de Rendition.

#### Cache partagé

Avec un NFS (Network File System) partagé et un Hazelcast correctement configuré, les données peuvent être partagées 
entre toutes les instances de Rendition.

**Avantages du cache partagé:**

* **Redondance Améliorée** : En cas de panne d'une instance, les autres peuvent toujours accéder aux documents mis en 
  cache sans avoir à les récupérer à nouveau.
* **Performance Optimisée** : Réduit le temps de récupération des documents, car ceux déjà mis en cache restent 
  disponibles pour toutes les instances, améliorant ainsi la rapidité et la fiabilité dans des environnements multi-instances.

Pour des informations complètes sur Hazelcast, consultez la [documentation Hazelcast](https://docs.hazelcast.com/home/).

#### Configuration par Défaut de Hazelcast

Le fichier de configuration (hazelcast.yaml) se trouve dans les ressources de RenditionEngine.



```cfg
hazelcast:
  map:
    documentAccessors:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
    conversionOrders:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
    transformationOrders:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
  network:
    join:
      auto-detection:
        enabled: false
    rest-api:
      enabled: true
      endpoint-groups:
        CLUSTER_READ:
          enabled: true
        HEALTH_CHECK:
          enabled: true
        WAN:
          enabled: true
        DATA:
          enabled: true

```


| Propriété                   | Description                                                                                                                                                                                                                                                                                                                                                                                        | 
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| max-idle-seconds            | Cette propriété permet de définir le temps où le document est gardé en cache. Cette valeur est en seconde. Par défaut, un document reste en cache 1 heure, donc la valeur par défaut est *3600*. Vous pouvez retrouver plus de détails sur [la documentation associé d'Hazelcast](https://docs.hazelcast.com/cloud/map-configurations#max-idle-seconds).                                           |
| eviction-policy             | Cette propriété permet de définir la politique d'éviction des documents en cache lorsque la valeur maximale du cache est dépassé. Par défaut, la valeur est *NONE* ce qui correspond à aucune éviction et que la taille maximum est ignoré. Vous pouvez retrouver plus de détails sur [la documentation associé d'Hazelcast](https://docs.hazelcast.com/cloud/map-configurations#eviction-policy). |
| max-size-policy             | Cette propriété définie comment Hazelcast va calculer la taille maximum du cache. Par défaut la valeur est *PER_NODE* qui définie que la taille maximum du cache est appliqué pour chaque membre du cluster. Vous pouvez retrouver plus de détails sur [la documentation associé d'Hazelcast](https://docs.hazelcast.com/cloud/map-configurations#max-size-policy).                                |
| size                        | Cette propriété définie la taille maximum du cache. Par défaut la valeur est *5*. Vous pouvez retrouver plus de détails sur [la documentation associé d'Hazelcast](https://docs.hazelcast.com/cloud/map-configurations#max-size).                                                                                                                                                                  |
| network.join.auto-detection | Cette propriété permet de définir le mécanisme de détection d'Hazelcast des membres d'un clusters sur le même réseau. Par défaut la valeur est *false*. Vous pouvez retrouver plus de détails sur [la documentation associé d'Hazelcast](https://docs.hazelcast.com/imdg/4.1.2/clusters/network-configuration#join).                                                                               |

### Nettoyage du répertoire temporaire au démarrage

Bien que Hazelcast gère l'éviction des entrées dans le cache, il est aussi possible de configurer un nettoyage du 
répertoire de cache au démarrage de l'application en utilisant :

#### Configuration

```cfg
default.document.path.startup.clear=true
```

#### Paramétrage du Temps de Nettoyage

Par défaut, tous les dossiers créés il y a **plus d'un jour** sont supprimés.

Vous pouvez ajuster cette valeur en modifiant la configuration ci-dessous :

```cfg
temp:
  files:
    folder: ../../tmp/
    house-keeping:
      expiration:
        time: 1
        unit: DAYS
```

| Property | Description                                                                      | 
| -------- | -------------------------------------------------------------------------------- |
| time     | La valeur numérique du temps                                                     |
| unit     | L'unité de temps associée, qui peut être "SECONDS", "MINUTES", "HOURS" et "DAYS" |

### rest-api

L'API REST est activé par défaut avec la propriété *enabled: true*. Vous pouvez retrouver plus de détails sur 
[la documentation associé d'Hazelcast](https://docs.hazelcast.com/hazelcast/5.0/maintain-cluster/rest-api).

##### endpoint-groups

Cette section permet de définir les endpoint group qui peuvent être utilisés avec l'API REST. Vous pouvez retrouver 
plus de détails sur [la documentation associé d'Hazelcast](https://docs.hazelcast.com/hazelcast/5.0/maintain-cluster/rest-api#using-rest-endpoint-groups).

###### CLUSTER_READ

Permet l'accès aux endpoints suivants : 

- /hazelcast/rest/cluster
- /hazelcast/rest/management/cluster/state
- /hazelcast/rest/license (GET)
- /hazelcast/rest/management/cluster/version (GET)
- /hazelcast/rest/management/cluster/nodes
- /hazelcast/rest/instance
- /hazelcast/rest/log-level (GET)

###### HEALTH_CHECK

Permet l'accès aux endpoints suivants : 

- /hazelcast/health/node-state
- /hazelcast/health/cluster-state
- /hazelcast/health/cluster-safe
- /hazelcast/health/migration-queue-size
- /hazelcast/health/cluster-size
- /hazelcast/health/ready

### Personnalisation de la Configuration Hazelcast

Pour personnaliser la configuration Hazelcast, créez votre propre fichier hazelcast.yaml et copiez-y la configuration du

À chaque mise à jour d’ARender, lisez attentivement les notes de version afin de prendre en compte les éventuels 
changements de configuration.

Après avoir créé votre fichier de configuration, modifiez le fichier custom-setenv.bat (ou custom-setenv.sh) pour 
indiquer le chemin du nouveau fichier.

Ajoutez l’argument suivant à la liste des arguments JVM : **-Dhazelcast.config=chemin_vers_votre_fichier**.

Si le chemin spécifié est hazelcast.yaml, alors le fichier doit être placé dans le dossier 

```cfg
set ARENDER_BROKER_JVM_ARGS=-Djava.net.preferIPv4Stack=true -Djava.net.preferIPv6Addresses=false -Dloader.path="client_libs/" -Dfile.encoding=UTF-8 -Dhazelcast.config=hazelcast.yaml
```

### Paramètres du Répertoire de Cache

#### Pour des Répertoires de Cache Séparés entre Plusieurs Instances de Rendition

##### Désactivation de l'Auto-Détection

Assurez-vous que la propriété d'auto-détection est désactivée (c’est le paramètre par défaut).

##### Configuration du Web-UI

Spécifiez chaque hôte de Rendition dans la configuration du serveur Web-UI. La distribution des tâches sera gérée en 
fonction de l'état de santé des instances de Rendition.

Les détails de configuration sont disponibles sur la **page dédiée** (lien supprimé).

```xml
#### Pour des Répertoires de Cache Partagés entre Plusieurs Instances de Rendition <!-- Expression supprimée -->
```

##### Ouverture du port Hazelcast

Par défaut, Hazelcast utilise le port **5701**. Assurez-vous que ce port soit ouvert sur tous les serveurs de Rendition pour 
permettre la communication.

##### Activation de l'Auto-Détection

Activez l'auto-détection pour permettre à Hazelcast de reconnaître toutes les instances de Rendition.

##### Emplacement des Instances de Rendition

Vérifiez que toutes les instances de Rendition sont sur le même sous-réseau pour permettre le partage de cache.

##### Configuration du Répertoire Partagé

Pour utiliser Hazelcast avec plusieurs instances de Rendition et un répertoire partagé, le répertoire doit être hébergé 
sur un système de fichiers partagé de type [NFS](https://fr.wikipedia.org/wiki/Network_File_System).

Chaque microservice doit spécifier l’emplacement du répertoire de cache partagé dans le fichier application.yaml.

```xml
<!-- Commentaire nettoyé -->
```


```cfg
temp:
  files:
    folder: ../../tmp/
```


```cfg
shared-files:
  sharedPath: ../../tmp/
```


```cfg
shared-files:
  sharedPath: ../../tmp/
```

```cfg
tmp:
  dir:
    doc: ../../tmp/

shared-files:
  sharedPath: ../../tmp/
```


## Load Balancer

### Configurer le Web-UI avec un Load Balancer

Cette configuration est nécessaire uniquement si le cache est partagé entre plusieurs instances de Rendition. Voir :

* **Pour des Répertoires de Cache Partagés entre Plusieurs Instances de Rendition** (lien supprimé),
* **Cache Partagé** (lien supprimé).

Si un Load Balancer est présent entre le Web-UI et les instances de Rendition, indiquez l’hôte du Load Balancer dans la
configuration du serveur Web-UI, au lieu de lister les hôtes des instances de Rendition individuelles.

```cfg
arender.server.rendition.hosts=LOAD_BALANCER_HOST
```

Les détails de configuration sont trouvables sur la **page dédiée** (lien supprimé).

### Configurer le Web-UI sans Load Balancer

Si aucun Load Balancer n'est utilisé, spécifiez chaque hôte de Rendition dans la configuration du serveur Web-UI. La 
distribution des tâches sera gérée en fonction de l'état de santé des instances de Rendition.

Vous trouverez la configuration détaillée sur la **page dédiée** (lien supprimé).

## Configuration du Système de Fichiers en Réseau (NFS)

Cette configuration est nécessaire uniquement si le cache est partagé entre plusieurs instances de Rendition. Voir :

* **Pour des Répertoires de Cache Partagés entre Plusieurs Instances de Rendition** (lien supprimé),
* **Cache Partagé** (lien supprimé).

Une configuration NFS correcte est essentielle pour synchroniser les différents nœuds. Deux optimisations principales 
peuvent entraîner une désynchronisation des clients NFS :

* **Écriture asynchrone** (par défaut) : Cette option est activée par défaut.
* **Cache de lecture local** : La configuration NFS doit inclure les options suivantes pour assurer la synchronisation des clients :

```cfg
sync,noac,lookupcache=none
```

**Références :** \
[nfs(5) - Linux man page 10.3](https://linux.die.net/man/5/nfs) \
[NFS Red Hat Enterprise Linux 6](https://access.redhat.com/documentation/fr-fr/red_hat_enterprise_linux/6/html/storage_administration_guide/fscachenfs)

## Sélection du backend Office (Optionnel)

ARender propose trois configurations pour la conversion de documents Office en PDF, chacune ayant ses avantages et 
inconvénients :

* **LibreOffice**
  * **Description** : Convertit les documents Microsoft, OpenOffice et LibreOffice.
  * **Avantages** : Gratuit et open-source, compatible avec de nombreux formats.
  * **Inconvénients** : La qualité de conversion peut varier sur les documents complexes ; support limité pour la résolution de problèmes.

* **Microsoft Office**
  * **Description** : Convertit les documents Microsoft, OpenOffice et LibreOffice.
  * **Avantages** : Excellente qualité de conversion, particulièrement pour les fichiers Office complexes.
  * **Inconvénients** : Nécessite une licence Microsoft Office, ce qui ajoute un coût supplémentaire.

* **DirectOffice (Recommandé pour une expérience Premium)**
  * **Description** : Convertit les documents Microsoft ; utilise LibreOffice pour les fichiers OpenOffice et LibreOffice.
  * **Avantages** : Conversion rapide et de haute qualité ; résolution rapide des problèmes avec le support Uxopian.
  * **Valeur ajoutée** : Idéal pour les entreprises recherchant une qualité constante et un support technique fiable.

```xml
<!-- Commentaire nettoyé -->
```


Aucune action n'est nécessaire, c'est la configuration par défaut :).


Pour activer DirectOffice, il doit être configuré pour être associé aux types MIME souhaités :

* Ouvrez le dossier **modules\TaskConversion**
* Modifiez **application-security.yml**
* Ajoutez le contenu suivant :

```cfg
mimetype:
  support:
    msoffice: "${mime.type.msoffice.publisher},${mime.type.msoffice.visio},${mime.type.msoffice.rtf},${mime.type.msoffice.project}"
    libreoffice: "${mime.type.libreoffice.text},${mime.type.libreoffice.sheet},${mime.type.libreoffice.presentation},${mime.type.libreoffice.graphics}"    
    directoffice: "${mime.type.msoffice.word},${mime.type.msoffice.excel},${mime.type.msoffice.powerpoint}"
```

#### Versions de Microsoft Office compatibles

Microsoft Office 2013 et versions ultérieures. Compatible avec Office 365 si le serveur est connecté à Internet. Nous 
recommandons également de maintenir Office à jour.

-------------------------------------------------------------------
#### Options d'installation

**Installation automatique**

* Téléchargez et décompressez [AromsCheck](/docs/AromsCheck.zip)
* Exécutez **runCheck.bat** pour un paramétrage automatique.

**Installation manuelle**

Ignorez cette installation manuelle si l'installation automatique a réussi.

* Téléchargez et installez les logiciels suivants :
  * .Net 4.5 : [Télécharger](&lt;https:www.microsoft.comen-usdownloaddetails.aspx?id=30653&gt;)
  * Microsoft Visual C++ redistribuable 2010 : [Télécharger](&lt;https:www.microsoft.comen-USDownloadconfirmation.aspx?id=14632&gt;)
  * Microsoft Visual C++ redistribuable 2008 : [Télécharger](&lt;https:www.microsoft.comen-usdownloaddetails.aspx?id=15336&gt;)
-------------------------------------------------------------------
#### Configuration

##### Configuration système Windows

**Créez les dossiers système ci-dessous**
```cfg
C:\Windows\System32\config\systemprofile\Desktop
C:\Windows\SysWOW64\config\systemprofile\Desktop
```

**Note de configuration importante**

* Exécutez le service de rendu avec un compte local : Assurez-vous que le compte utilisé (Administrateur ou non) peut 
  ouvrir Microsoft Office sans fenêtres contextuelles, celles-ci pouvant interrompre le rendu.
* Configuration de conversion Excel : Ouvrez Excel avec l'utilisateur qui lancera ARender Rendition. Une imprimante par
  défaut doit être configurée dans Excel (par exemple, une imprimante de sortie XPS) ; sinon, Excel ne pourra pas gérer 
  la mise en page et les conversions.
* Évitez les imprimantes de sessions à distance : Ne définissez pas une imprimante de session distante comme imprimante 
  par défaut, car elle se déconnectera en fin de session, interrompant les conversions.

##### Configuration ARender pour Microsoft Office

Pour configurer le rendu de documents Microsoft Office :
* Ouvrez le dossier suivant : **modules\TaskConversion\aroms2pdf**
* Modifiez **aroms.properties**

| Propriété            | Valeur par défaut      | Détail |
| :------------------- | :--------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PDF/A                | false                  | PDFs généré par ARender sont des PDF/A                                                                                                                               |
| processAutoKill      | false                  | Termine les anciens processus Office au démarrage de Aroms                                                                                                           |
| TimeoutS             | 120                    | Temps maximum de conversion pris par ARender pour générer un PDF via MS Office. Au delà de ce temps, le processus est terminé                                        |
| AromsHost            | http://localhost:8000/ | URL sur laquelle Aroms est exposé                                                                                                                                    |
| LockFields           | false                  | Désactive la mise à jour des champs variable (comme les dates) du document Office                                                                                    |
| IgnorePrintAreas     | true                   | Désactive l'impression des lignes vides                                                                                                                              |
| FitSheetOnOnePage    | true                   | True: MS Office va imprimer le document sur une seule page. False: Comportement par défaut de MS Office (découpage en plusieurs page si le document est trop grand). |


## PDFOwl : une alternative pour le rendu de documents

### Description

Nous avons introduit **PDFOwl** comme alternative au moteur de rendu de documents standard **JNIPdfEngine**.

Cette fonctionnalité prend en charge le rendu d’images, de mises en page et de calques, mais ne gère pas encore les 
filtres d'image ni la fonctionnalité SVG.

Dans la configuration actuelle du moteur de rendu de documents, des erreurs dans la bibliothèque native peuvent 
entraîner le **crash complet de l'application**, ces problèmes se produisant à un niveau bas et ne pouvant pas être 
interceptés au niveau de l'application.

Pour renforcer la stabilité, PDFOwl adopte une approche résiliente tout en préservant la performance. Il gère les 
demandes de rendu via des sous-processus, permettant ainsi de traiter les erreurs sans impact sur le processus principal.

### Installation

* Accédez à : **modules\RenditionEngine**,
* Ouvrez ou créez le fichier **application.properties**,
* Ajoutez la propriété suivante :
```cfg
micro-services.pdf-renderer=PDFOwl
```

### Configurations

PDFOwl propose plusieurs propriétés configurables avec des valeurs par défaut listées ci-après.

Pour modifier ces valeurs :
* Accédez au dossier : **modules\PDFOwl**,
* Ouvrez ou créez le fichier **application.properties**,
* Ajoutez la (ou les) propriété(s) et la (leur) valeur souhaitée.

```cfg
# Chemin du binaire PdfOwl
pdfowl.path=pdfowl
# Timeout d'exécution des commandes pdfowl en millisecondes
pdfowl.client.watchdog=10000
# Timeout pour les clients pdfOwl inactifs en millisecondes
pdfowl.client.ttl=30000
# Limite mémoire utilisée par un thread pour travailler sur un document unique
pdfowl.memlimit.mb=1024
```

## PDF Configuration

Depuis la version 2023.6.0, nous avons introduit la prise en charge des porte-documents PDF (PDF Portfolio) et les PDF avec pièces jointes.

Un porte-documents PDF est une collection de plusieurs fichiers (PDF, documents Word, feuilles Excel, images, etc.) combinés dans un seul conteneur PDF.

Un PDF avec pièces jointes est un fichier PDF standard qui contient d'autres fichiers intégrés.

### Configurer les porte-documents PDF (PDF Portfolio)

Depuis 2023.7.0, elle est désactivée par défaut.

Pour activer la fonctionnalité porte-documents PDF, définissez la propriété suivante sur ``true``.


```cfg
arender.server.document.pdf.portfolio.enabled=true
```



### Configurer les PDF avec pièces jointes

Depuis 2023.7.0, cette fonction est désactivée par défaut.

Pour activer la fonctionnalité PDF avec pièces jointes, définissez la propriété suivante sur ``true``.


```cfg
arender.server.document.pdf.attachments.enabled=true
```




Avant 2023.6.0, le DocumentLayout d'un PDF était de type DocumentPageLayout pour un PDF avec pièces jointes, il ne pouvait donc pas contenir d'informations concernant les fichiers joints.

Mais depuis 2023.6.0, lorsque la propriété est activée, le PDF avec pièces jointes est de type DocumentContainer.
Dans cette structure :
- Le premier enfant de la liste ```children``` représente le document PDF lui-même.
- Le deuxième enfant est un DocumentContainer qui contient tous les fichiers joints au sein du PDF.



### Configurer le délai d'expiration du flux de recherche PDF

Depuis la version 2023.12.0, un nouveau point de terminaison permet de rechercher du texte dans une plage de pages spécifique d'un document. La recherche s'exécute pendant une durée définie par la configuration du délai d'expiration du rendu. Si la recherche expire, elle s'arrête à la dernière page activement recherchée. La réponse renvoie alors tous les résultats trouvés jusqu'à ce point, l'état de la recherche et l'index de cette dernière page.

Pour modifier le délai d'expiration, définissez la propriété suivante :


```cfg
# Définir le délai d'expiration du flux de recherche PDF en millisecondes
pdf.search.stream.timeout=500
```

