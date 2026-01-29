---
title: Installation
sidebar_position: 3
date: "2001-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-29T08:51:52.623Z'
  author: CI/CD Bot
content_hash: fc520dbf77f998ac2a139d5dda4697669d6641e5d95446316e292b9aa706abb3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# OpenSearch installation

## Installation procedure

There are several ways to install OpenSearch, explained step by step in the [official documentation](https://opensearch.org/docs/1.3/opensearch/install/index).

## Configuration

To configure your OpenSearch instance, edit the ``$`OPENSEARCH_HOME`/config/opensearch.yml`` file as follows:

- To define the name of the OpenSearch cluster, uncomment the `cluster.name` property and change its value (eg: `flower-es-dev`)
- In the case of an OpenSearch cluster, uncomment the `node.name` property and change its value to that of your choice (e.g. `node-1`)
- Add the `action.auto_create_index: false` property
- If several OpenSearch nodes are deployed on the same computer, you need to change the value of the `http.port` property
- To access OpenSearch from a remote server, you need to uncomment the `network.host` property and set one of the following values:
    - `0.0.0.0`
    - DNS name
    - IP address

<br/>

### Security

OpenSearch internal users are defined in the ``$`OPENSEARCH_HOME`/plugins/opensearch-security/securityconfig/internal_users.yml`` file.

Only keep the users you need, and change their passwords to avoid using default values for security reasons.

To change a user's password:

- run command: ``$`OPENSEARCH_HOME`/plugins/opensearch-security/tools/hash.sh -p &lt;new_password&gt;``
- Replace the password hash in the ``$`OPENSEARCH_HOME`/plugins/opensearch-security/securityconfig/internal_users.yml`` file for the desired user.
- in order for the changes to take effect, run the ``$`OPENSEARCH_HOME`/plugins/opensearch-security/tools/securityadmin.sh`` script

<br/>
For more information on securing an OpenSearch instance, official documentation is available [here](https://opensearch.org/docs/1.3/security-plugin/index).

### Start

#### Manuel

Finally, start OpenSearch by going to the ``$`OPENSEARCH_HOME`/bin`` folder and running the `opensearch` script.

#### Service

To install OpenSearch as a `systemd` service, the following file must be created in the /etc/systemd/system directory as follows:

#### Opensearch serivce
```ini
[Unit]
Description=opensearch
Wants=network-online.target
After=network-online.target

[Service]
RuntimeDirectory=opensearch
PrivateTmp=true

WorkingDirectory=${OPENSEARCH_HOME}

User=${OPENSEARCH_USER}
Group=${OPENSEARCH_USER}

ExecStart=${OPENSEARCH_HOME}/bin/opensearch -p ${OPENSEARCH_HOME}/opensearch.pid -q

StandardOutput=journal
StandardError=inherit

# Specifies the maximum file descriptor number that can be opened by this process
LimitNOFILE=65536

# Specifies the memory lock settings
LimitMEMLOCK=infinity

# Specifies the maximum number of processes
LimitNPROC=4096

# Specifies the maximum size of virtual memory
LimitAS=infinity

# Specifies the maximum file size
LimitFSIZE=infinity

# Disable timeout logic and wait until process is stopped
TimeoutStopSec=0

# SIGTERM signal is used to stop the Java process
KillSignal=SIGTERM

# Send the signal only to the JVM rather than its control group
KillMode=process

# Java process is never killed
SendSIGKILL=no

# When a JVM receives a SIGTERM signal it exits with code 143
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

To have the service started automatically by systemd, run the following commands:

<Tabs>
  <TabItem value="enable-opensearch-service" label="Enable OpenSearch service">

```bash
systemctl enable opensearch.service
```

  </TabItem>
</Tabs>

### Validation

To check that OpenSearch is working properly, go to http://localhost:9200/.

# Development environment 

Docker Compose must be installed on your computer in order to set up the technical components required for FlowerDocs to function properly without the need to install and configure each of them. The following configuration is used to deploy OpenSearch and Redis. 

<br/> 

From the folder where the following file has been added, run the following command to start Docker containers: 
 
```sh
${DOCKER_COMPOSE_PATH} -f opensearch-stack.yml up
```


```yml
version: '3'
services:
  opensearch-node1:
    image: opensearchproject/opensearch:1.3.4
    container_name: opensearch-node1
    environment:
      - cluster.name=opensearch-cluster
      - node.name=opensearch-node1
      - bootstrap.memory_lock=true # along with the memlock settings below, disables swapping
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m" # minimum and maximum Java heap size, recommend setting both to 50% of system RAM
      - "DISABLE_INSTALL_DEMO_CONFIG=true" # disables execution of install_demo_configuration.sh bundled with security plugin, which installs demo certificates and security configurations to OpenSearch
      - "DISABLE_SECURITY_PLUGIN=true" # disables security plugin entirely in OpenSearch by setting plugins.security.disabled: true in opensearch.yml
      - "discovery.type=single-node" # disables bootstrap checks that are enabled when network.host is set to a non-loopback address
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536 # maximum number of open files for the OpenSearch user, set to at least 65536 on modern systems
        hard: 65536
    volumes:
      - opensearch-data1:/usr/share/opensearch/data
      - ./custom-opensearch.yml:/usr/share/opensearch/config/opensearch.yml
    ports:
      - 9200:9200
      - 9600:9600 # required for Performance Analyzer
    networks:
      - opensearch-net

  redis:
    image: redis:6.2.7
    container_name: redis-opensearch
    ports:
      - 6379:6379

volumes:
  opensearch-data1:

networks:
  opensearch-net:
```