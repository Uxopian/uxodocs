---
title: Installation
sidebar_position: 3
date: "2001-03-28T13:20:01+02:00"
last_update:
  date: '2026-02-05T13:50:19.106Z'
  author: CI/CD Bot
content_hash: a375e80de6769c614d0c2827e7863895aa6ec4aac3e8c8abddd282bb2657c0e5
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

:::note[opensearch.service]

```sh
[Unit]

```properties
Description=opensearch
Wants=network-online.target
After=network-online.target
```

[Service]

```properties
RuntimeDirectory=opensearch
PrivateTmp=true
```

WorkingDirectory=$`OPENSEARCH_HOME`

```properties
User=${OPENSEARCH_USER}
Group=${OPENSEARCH_USER}
```

ExecStart=$`OPENSEARCH_HOME`/bin/opensearch -p $`OPENSEARCH_HOME`/opensearch.pid -q

```properties
StandardOutput=journal
StandardError=inherit
```

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
:::



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
