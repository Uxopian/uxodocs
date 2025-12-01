---
title: IBM FileNet
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 5811fed8acbed05e4ac7a64a20654ee63f49a81574bece4ed041701f673cc6c8
---







## ARender UI Spring Boot for IBM FileNet

### Configuration with a service account

Since v2023.4.0, we have created dedicated Docker image for ARender UI Spring Boot with FileNet connector 
named arender-ui-springboot:-filenet.

To run the container, execute:

```bash
$> docker run /arender-ui-springboot:-filenet \
-e ARENDERSRV_ARENDER_SERVER_FILENET_AUTHENTICATION_METHOD="LoginPasswordObjectStoreProvider"\
-e ARENDERSRV_ARENDER_SERVER_FILENET_CE_URL="http://<filenet-url>:<filent-port>/wsi/FNCEWS40MTOM/"\
-e ARENDERSRV_ARENDER_SERVER_FILENET_CE_LOGIN=<account-name>\
-e ARENDERSRV_ARENDER_SERVER_FILENET_CE_PASSWORD=<account-password>
```

### Configuration with OAuth2

Note: If you do not have the necessary credential for ARender artifactory, please contact arender-support@arondor.com.

In our example, we will be using Docker Compose so we can have the whole stack up and running.



```cfg
version: "3.7"

services:
  ui:
    image: artifactory.arondor.cloud:5001/arender-ui-springboot:-filenet
    environment:
      - "ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS=http://service-broker:8761/"
      # You can configure ARender properties through environment variable or with the configuration file in a volume like further down
      #- "ARENDERSRV_ARENDER_SERVER_OAUTH2_ENABLED=true"
      #- "ARENDERSRV_ARENDER_SERVER_FILENET_AUTHENTICATION_METHOD=oauth2ObjectStoreProvider"
      #- "ARENDERSRV_ARENDER_SERVER_FILENET_CE_URL=http://localhost:9080/wsi/FNCEWS40MTOM/"
    ports:
      - 8080:8080
    # Here we copy our configuration for OAuth2 in a volume
    volumes:
      - ./volume/config/application.yml:/home/arender/application.yml
      - ./volume/configurations/arender-custom-server.properties:/home/arender/configurations/arender-custom-server.properties

  service-broker:
    image: artifactory.arondor.cloud:5001/arender-document-service-broker:
    environment:
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-CONVERTER=19999"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-RENDERER=9091"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-TEXT-HANDLER=8899"
    ports:
      - 8762-8770:8761
    volumes:
      - arender-tmp:/arender/tmp

  document-renderer:
    image: artifactory.arondor.cloud:5001/arender-document-renderer:
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
    image: artifactory.arondor.cloud:5001/arender-document-text-handler:
    environment:
      - "DTH_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-text-handler"
      - "DTH_EUREKA_INSTANCE_HOSTNAME=service-broker"
      - "DTH_EUREKA_SERVER_PORT=8761"
    ports:
      - 8899-8908:8899
    volumes:
      - arender-tmp:/arender/tmp

  document-converter:
    image: artifactory.arondor.cloud:5001/arender-document-converter:
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




ARender or connector configuration files can be put in the **/home/arender/configurations/** folder of the container.
Connector lib can be put in the **/home/arender/lib/** folder of the container.
