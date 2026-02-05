---
title: "Docker"
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: 202c5d24325974bf756b037eec9ba1e137d3b6d12a069b278a70b952f1e177ef
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Registry

### Location

All ARender docker images are available on our artifactory, [artifactory.arondor.cloud](https://artifactory.arondor.cloud).

### Login

To authenticate, use the docker command with your artifactory credentials

```bash
$> docker login artifactory.arondor.cloud:5001
```

If you do not have access to our artifactory, please contact our **support service**.

## Repository list

A complete ARender stack is composed by 6 types of containers:

| Component             | Repository                      |         Latest Version  |   Suffix |
| :-------------------- | :------------------------------ | ---------------------:  | -------: |
| web UI                | arender-ui                      | 4.8.21 |          |
| or Alfresco web UI    | arender-ui                      | 4.8.21 | alfresco |
| or IBM FileNet web UI | arender-ui                      | 4.8.21 |  filenet |
|                       |                                 |                         |          |
| rendition             | arender-document-service-broker | 4.8.21 |          |
| rendition             | arender-document-renderer       | 4.8.21 |          |
| rendition             | arender-document-text-handler   | 4.8.21 |          |
| rendition             | arender-document-converter      | 4.8.21 |          |

### Pulling images

To pull images, use docker pull command with Arondor registry as prefix.

<Tabs>
<TabItem value="default" label="default">

```bash
$> docker pull artifactory.arondor.cloud:5001/<Repository>:<Version>
```

</TabItem>
<TabItem value="specific" label="specific">

```bash
$> docker pull artifactory.arondor.cloud:5001/<Repository>:<Version>-<Suffix>
```

</TabItem>
</Tabs>

## Docker compose

To start ARender quickly with docker-compose, execute the following commands:

```bash
$> wget -O docker-compose.yml /docs/docker/v4/docker-compose.yml
$> echo "4.8.21=4.8.21" > .env
$> docker-compose up -d
```

These commands will run the configuration below:

<Tabs>
<TabItem value="Since 4.5" label="Since 4.5">

```yaml
version: "3.7"

services:
  ui:
    image: artifactory.arondor.cloud:5001/arender-ui:${4.8.21}
    container_name: ui
    environment:
      - "ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS=http://dsb-service:8761/"
    ports:
      - 8080:8080

  service-broker:
    image: artifactory.arondor.cloud:5001/arender-document-service-broker:${4.8.21}
    container_name: dsb-service
    environment:
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DCV-SERVICE=19999"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DRN-SERVICE=9091"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DTH-SERVICE=8899"
    ports:
      - 8761:8761
    volumes:
      - arender-tmp:/arender/tmp

  document-renderer:
    image: artifactory.arondor.cloud:5001/arender-document-renderer:${4.8.21}
    container_name: drn-service
    environment:
      - "DRN_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=drn-service"
      - "DRN_EUREKA_INSTANCE_HOSTNAME=dsb-service"
      - "DRN_EUREKA_SERVER_PORT=8761"
    ports:
      - 9091:9091
    volumes:
      - arender-tmp:/arender/tmp

  document-text-handler:
    image: artifactory.arondor.cloud:5001/arender-document-text-handler:${4.8.21}
    container_name: dth-service
    environment:
      - "DTH_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=dth-service"
      - "DTH_EUREKA_INSTANCE_HOSTNAME=dsb-service"
      - "DTH_EUREKA_SERVER_PORT=8761"
    ports:
      - 8899:8899
    volumes:
      - arender-tmp:/arender/tmp

  document-converter:
    image: artifactory.arondor.cloud:5001/arender-document-converter:${4.8.21}
    container_name: dcv-service
    environment:
      - "DCV_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=dcv-service"
      - "DCV_APP_EUREKA_HOSTNAME=dsb-service"
      - "DCV_APP_EUREKA_PORT=8761"
    ports:
      - 19999:19999
    volumes:
      - arender-tmp:/arender/tmp

# Shared temporary folder
volumes:
  arender-tmp:
```

</TabItem>
<TabItem value="before 4.5" label="before 4.5">

```yaml
version: "2"

services:
  ui:
    image: artifactory.arondor.cloud:5001/arender-ui:4.4.1
    mem_limit: 2g
    container_name: ui
    environment:
      - "ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS=http://dsb-service:8761/"
    ports:
      - 80:8080

  service-broker:
    image: artifactory.arondor.cloud:5001/arender-document-service-broker:4.4.1
    mem_limit: 1g
    container_name: dsb-service
    environment:
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DCV-SERVICE=19999"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DRN-SERVICE=9091"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DTH-SERVICE=8899"
    ports:
      - 8761:8761

  document-renderer:
    image: artifactory.arondor.cloud:5001/arender-document-renderer:4.4.1
    mem_limit: 1g
    container_name: drn-service
    environment:
      - "DRN_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=drn-service"
      - "DRN_EUREKA_INSTANCE_HOSTNAME=dsb-service"
      - "DRN_EUREKA_SERVER_PORT=8761"
    ports:
      - 9091:9091

  document-text-handler:
    image: artifactory.arondor.cloud:5001/arender-document-text-handler:4.4.1
    mem_limit: 1g
    container_name: dth-service
    environment:
      - "DTH_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=dth-service"
      - "DTH_EUREKA_INSTANCE_HOSTNAME=dsb-service"
      - "DTH_EUREKA_SERVER_PORT=8761"
    ports:
      - 8899:8899

  document-file-storage:
    image: artifactory.arondor.cloud:5001/arender-document-file-storage:4.4.1
    mem_limit: 500m
    container_name: dfs-service
    environment:
      - "DFS_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=dfs-service"
      - "DFS_EUREKA_INSTANCE_METADATA.MAP_SOURCE.D.F.S=http://dfs-service:8081"
      - "DFS_EUREKA_INSTANCE_HOSTNAME=dsb-service"
      - "DFS_EUREKA_SERVER_PORT=8761"
    ports:
      - 8081:8081

  document-converter:
    image: artifactory.arondor.cloud:5001/arender-document-converter:4.4.1
    mem_limit: 1g
    container_name: dcv-service
    environment:
      - "DCV_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=dcv-service"
      - "DCV_APP_EUREKA_HOSTNAME=dsb-service"
      - "DCV_APP_EUREKA_PORT=8761"
    ports:
      - 19999:19999
```

</TabItem>
</Tabs>
