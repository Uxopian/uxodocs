---
title: Rendition stack
sidebar_position: 2
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: f88c0470134397bc8ac1964575a4c88eba0be2d4b8436c8ab096e1a4e4ad6d07
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## By Environment Variables

All yaml properties can be overridden by environment variables by following the next rules:

- environment variables must be all capitalize
- capitalized character in yaml must be preceded by **"."**
- use **"\_"** to associate an object
- use **"[n]"** to set a list element (with **n** as index)

<Tabs>
<TabItem value="yaml" label="YAML Configuration">
```yaml
nurse:
  samplesDirectory: ../../samples/
    components:
      - functionality: TKC_MailConversion
        factoryName: "mailFactory"
        samplePath: "test.msg"
        docIdStr: "m41lS4mpl3"
```
</TabItem>

<TabItem value="environment" label="Environment Variables">
```yaml
  environment:
    - "DCV_NURSE_SAMPLES.DIRECTORY=../../samples/"
    - "DCV_NURSE_COMPONENTS[0]_FUNCTIONALITY=TKC_MailConversion"
    - "DCV_NURSE_COMPONENTS[0]_FACTORY.NAME=mailFactory"
    - "DCV_NURSE_COMPONENTS[0]_SAMPLE.PATH=test.msg"
    - "DCV_NURSE_COMPONENTS[0]_DOC.ID.STR=m41lS4mpl3"
```
</TabItem>
</Tabs>



## By volumes

Configuration files location:

- /arender/config/application.properties
- /arender/config/application-\*.properties
- /arender/config/application.yaml
- /arender/config/application-\*.yaml

**&#123;service-name&#125;**: container name without "arender" prefix

## PDFOwl: a document renderer alternative

### Description

The 2023.1.0 version has introduced a new docker image as an alternative of the usual **document-renderer**, named **document-renderer-pdfowl**.

This feature is currently in an experimental, early-access phase. It supports images, layouts, and layers rendering, but does not yet include image filter handling or SVG functionality.

In the existing document-renderer setup, errors within the native library can cause the entire application to crash,
as these issues occur at a low level and cannot be intercepted at the application level.

To improve stability, PDFOwl employs a resilient approach that maintains performance while isolating errors. It manages
rendering requests through sub-processes, allowing errors to be handled without affecting the main process.

### Docker image

The docker image name with the tag is `artifactory.arondor.cloud:5001/document-renderer-pdfowl:{{version}}`

Example of using this image with docker compose :

```yaml
version: "3.7"

services:
  ui:
    image: artifactory.arondor.cloud:5001/arender-ui-springboot:{{version}}
    environment:
      - "ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS=http://service-broker:8761/"
    ports:
      - 8080:8080

  service-broker:
    image: artifactory.arondor.cloud:5001/arender-document-service-broker:{{version}}
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
    image: artifactory.arondor.cloud:5001/arender-document-renderer-pdfowl:{{version}}
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
    image: artifactory.arondor.cloud:5001/arender-document-text-handler:{{version}}
    environment:
      - "DTH_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-text-handler"
      - "DTH_EUREKA_INSTANCE_HOSTNAME=service-broker"
      - "DTH_EUREKA_SERVER_PORT=8761"
    ports:
      - 8899:8899
    volumes:
      - arender-tmp:/arender/tmp

  document-converter:
    image: artifactory.arondor.cloud:5001/arender-document-converter:{{version}}
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

## Configurations

Some properties are available with default values :

```properties
# PdfOwl binary path
pdfowl.path=pdfowl
# Timeout for pdfowl commands execution in milliseconds
pdfowl.client.watchdog=10000
# Timeout for idle pdfOwl clients in milliseconds
pdfowl.client.ttl=30000
# The memory limit used for a thread to work on a single document
pdfowl.memlimit.mb=1024
```
