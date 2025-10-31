---
title: IBM FileNet
---

## ARender UI Spring Boot pour IBM FileNet

### Configuration avec un compte de service

Depuis la version 2023.4.0, nous avons créé une image Docker dédiée pour ARender UI Spring Boot avec le connecteur FileNet 

Pour démarrer le conteneur, exécutez :

```bash
-e ARENDERSRV_ARENDER_SERVER_FILENET_AUTHENTICATION_METHOD="LoginPasswordObjectStoreProvider"\
-e ARENDERSRV_ARENDER_SERVER_FILENET_CE_URL="http://<!-- Commentaire nettoyé -->/wsi/FNCEWS40MTOM/"\
-e ARENDERSRV_ARENDER_SERVER_FILENET_CE_LOGIN="!-- Balise avec caractères invalides supprimée --"
```

### Configuration avec OAuth2

Remarque : Si vous ne disposez pas des informations d'identification nécessaires pour l'artefact ARender, veuillez contacter arendre-support@arondor.com.

Dans notre exemple, nous utiliserons Docker Compose pour que l’ensemble de la pile soit opérationnel.


```cfg
version: "3.7"

services:
  ui:
    environment:
      - "ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS=http://service-broker:8761/"
      # Vous pouvez configurer les propriétés ARender via une variable d'environnement ou avec le fichier de configuration dans un volume comme plus bas
      #- "ARENDERSRV_ARENDER_SERVER_OAUTH2_ENABLED=true"
      #- "ARENDERSRV_ARENDER_SERVER_FILENET_AUTHENTICATION_METHOD=oauth2ObjectStoreProvider"
      #- "ARENDERSRV_ARENDER_SERVER_FILENET_CE_URL=http://localhost:9080/wsi/FNCEWS40MTOM/"
    ports:
      - 8080:8080
    # Ici nous copions notre configuration pour OAuth2 dans un volume
    volumes:
      - ./volume/config/application.yml:/home/arender/application.yml
      - ./volume/configurations/arender-custom-server.properties:/home/arender/configurations/arender-custom-server.properties

  service-broker:
    environment:
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-CONVERTER=19999"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-RENDERER=9091"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-TEXT-HANDLER=8899"
    ports:
      - 8762-8770:8761
    volumes:
      - arender-tmp:/arender/tmp

  document-renderer:
    hostname: drn-service
    environment:
      - "DRN_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-renderer"
      - "DRN_EUREKA_INSTANCE_HOSTNAME=service-broker"
      - "DRN_EUREKA_SERVER_PORT=8761"
    ports:
      - 9091-9100:9091
    volumes:
      - arender-tmp:/arender/tmp

  document-text-handler:
    environment:
      - "DTH_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-text-handler"
      - "DTH_EUREKA_INSTANCE_HOSTNAME=service-broker"
      - "DTH_EUREKA_SERVER_PORT=8761"
    ports:
      - 8899-8908:8899
    volumes:
      - arender-tmp:/arender/tmp

  document-converter:
    environment:
      - "DCV_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-converter"
      - "DCV_APP_EUREKA_HOSTNAME=service-broker"
      - "DCV_APP_EUREKA_PORT=8761"
    ports:
      - 19999-20008:19999
    volumes:
      - arender-tmp:/arender/tmp

volumes:
  arender-tmp:
```



Les fichiers de configuration d'ARender ou de connecteur peuvent être placés dans le dossier **/home/arender/configurations/** du conteneur.
Connector lib peut être placé dans le dossier **/home/arender/lib/** du conteneur.
