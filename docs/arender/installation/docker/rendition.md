---
title: Partie de rendition
---

## Par variables d'environement

Toutes les propriétés yaml peuvent être surchargées par variable d'environnement en suivant les règles suivantes :

- la variable d'environment doit être en lettre capitale
- les lettres en capitale sont précédés d'un **"."**
- utiliser **"_"** pour associer les objets
- utiliser **"[n]"** pour renseigner un élément d'une liste (avec **n** pour l'index)


```yaml
  nurse:
    samplesDirectory: ../../samples/
    components:
      - functionality: TKC_MailConversion
        factoryName: "mailFactory"
        samplePath: "test.msg"
        docIdStr: "m41lS4mpl3"
```


```yaml
    environment:
      - "DCV_NURSE_SAMPLES.DIRECTORY=../../samples/"
      - "DCV_NURSE_COMPONENTS[0]_FUNCTIONALITY=TKC_MailConversion"
      - "DCV_NURSE_COMPONENTS[0]_FACTORY.NAME=mailFactory"
      - "DCV_NURSE_COMPONENTS[0]_SAMPLE.PATH=test.msg"
      - "DCV_NURSE_COMPONENTS[0]_DOC.ID.STR=m41lS4mpl3"
```



---
title: Partie de rendition
---

## Par variables d'environement

Toutes les propriétés yaml peuvent être surchargées par variable d'environnement en suivant les règles suivantes :

- la variable d'environment doit être en lettre capitale
- les lettres en capitale sont précédés d'un **."**
- utiliser **"_"** pour associer les objets
- utiliser **"[n]"** pour renseigner un élément d'une liste (avec **n** pour l'index)


```yaml
nurse:
  samplesDirectory: ../../samples/
  components:
    - functionality: TKC_MailConversion
      factoryName: "mailFactory"
      samplePath: "test.msg"
      docIdStr: "m41lS4mpl3"
```


```yaml
environment:
  - "DCV_NURSE_SAMPLES.DIRECTORY=../../samples/"
  - "DCV_NURSE_COMPONENTS[0]_FUNCTIONALITY=TKC_MailConversion"
  - "DCV_NURSE_COMPONENTS[0]_FACTORY.NAME=mailFactory"
  - "DCV_NURSE_COMPONENTS[0]_SAMPLE.PATH=test.msg"
  - "DCV_NURSE_COMPONENTS[0]_DOC.ID.STR=m41lS4mpl3"
```


## Par volumes

Emplacements des fichiers de configuration :

- /arender/config/application.properties
- /arender/config/application-*.properties

- /arender/config/application.yaml
- /arender/config/application-*.yaml

```text
**{service-name}**: nom du conteneur sans le préfixe "arender"
```

## PDFOwl: une alternative pour la rendition de document

## Description

La "version" 2023.1.0 a introduit une nouvelle image Docker comme alternative au **document-renderer** habituel, nommée **document-renderer-pdfowl**.

Actuellement, cette fonctionnalité est en phase expérimentale et accessible via un accès anticipé.
Il prend actuellement en charge le rendu d'images. La mise en page, avec la gestion des calques, les filtres d'image et les fonctionnalités SVG sont encore à implémenter.

Dans le contexte du **document-renderer** actuel, si une erreur se produit dans la bibliothèque native chargée, cela entraîne le crash de l'ensemble de l'application.
L’erreur se produisant à un niveau inférieur, nous ne sommes pas en mesure de la gérer au niveau de l’application.
Pour résoudre ce problème, nous avons mis en place une application qui donne la priorité à la résilience tout en maintenant des performances optimales.
Il génère et gère des sous-processus responsables du traitement des demandes de rendu, capables de renvoyer des erreurs sans provoquer de crash dans le processus principal.

### Image docker


Exemple d'utilisation de cette image avec docker compose :

```yaml
version: "3.7"

services:
  ui:
    environment:
      - "ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS=http://service-broker:8761/"
    ports:
      - 8080:8080

  service-broker:
    environment:
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-CONVERTER=19999"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-RENDERER=9091"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-TEXT-HANDLER=8899"
      - "DSB_MICROSERVICES_PDFRENDERER=PDFOwl"
    ports:
      - 8761:8761
    volumes:
      - arender-tmp:/arender/tmp

  document-renderer:
    hostname: drn-service
    environment:
      - "DRN_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-renderer"
      - "DRN_EUREKA_INSTANCE_HOSTNAME=service-broker"
      - "DRN_EUREKA_SERVER_PORT=8761"
      - "DRN_PDFOWL_CLIENT_WATCHDOG=60000"
    ports:
      - 9091:9091
    volumes:
      - arender-tmp:/arender/tmp

  document-text-handler:
    environment:
      - "DTH_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-text-handler"
      - "DTH_EUREKA_INSTANCE_HOSTNAME=service-broker"
      - "DTH_EUREKA_SERVER_PORT=8761"
    ports:
      - 8899:8899
    volumes:
      - arender-tmp:/arender/tmp

  document-converter:
    environment:
      - "DCV_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-converter"
      - "DCV_APP_EUREKA_HOSTNAME=service-broker"
      - "DCV_APP_EUREKA_PORT=8761"
    ports:
      - 19999:19999
    volumes:
      - arender-tmp:/arender/tmp

volumes:
  arender-tmp:

```

### Configurations

Certaines propriétés sont disponibles avec des valeurs par défaut :
```cfg
# PdfOwl binary path
pdfowl.path=pdfowl
# Timeout for pdfowl commands execution in milliseconds
pdfowl.client.watchdog=10000
# Timeout for idle pdfOwl clients in milliseconds
pdfowl.client.ttl=30000
# The memory limit used for a thread to work on a single document
pdfowl.memlimit.mb=1024
```
