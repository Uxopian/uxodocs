---
title: ELK stack configuration
sidebar_position: 13
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: b967f97942ee7af08f7bfe83e70afb4d6f533e3bd07330c21aa8a32482a5a463
---

## Introduction

Analyse ARender performances in ELK stack.

ARender returns statistics on its usage, like the loading time of a document and the opened document type. Information is stored in log files. It is possible to analyse these logs with the ELK stack.

You need to use following applications from the ELK stack : Elastisearch and Kibana :

- **Elasticsearch** : stores and indexes data. It is a NoSQL base allowing to manage big data.
- **Kibana** : is a Web interface allowing to search and visualize graphical data.

In Kibana data are shown in a graphical user friendly way. Graphics creation is simple and there are lots of customization possible.

See below examples :

- Average document loading time :
  ![img](/img/arender/ELK/elk-average-time-document-loading.png)

- MIME Type distribution :
  ![img](/img/arender/ELK/elk-mimetype-loaded.png)

## Prerequisites

### To import visualizations and dashboards with .ndjson files

- Kibana version 7.2.0 and above
- ElasticSearch version 7.2.0 and above

### To import visualizations and dashboards with .json files

- Kibana version 5.x and above
- ElasticSearch version 5.x and above

## Elasticsearch

### Installation

Follow official documentation to install ElasticSearch : [https://www.elastic.co/guide/en/elasticsearch/reference/current/](https://www.elastic.co/guide/en/elasticsearch/reference/current/)

### Start ElasticSearch

Follow official documentation to start ElasticSearch : [https://www.elastic.co/guide/en/elasticsearch/reference/current/starting-elasticsearch.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/starting-elasticsearch.html)

## Kibana

### Installation

Follow official documentation to install Kibana : [https://www.elastic.co/guide/en/kibana/current/install.html](https://www.elastic.co/guide/en/kibana/current/install.html)

### Start Kibana

Follow official documentation to start Kibana : [https://www.elastic.co/guide/en/kibana/current/start-stop.html](https://www.elastic.co/guide/en/kibana/current/start-stop.html)

### Kibana configuration prerequisites

Before configuring Kibana, you need to open at least one document in ARender in order to have indexes created in Elasticsearch.

### Kibana configuration

#### Creation of index pattern

- Open Kibana in your browser. Local URL : [http://localhost:5601/app/kibana](http://localhost:5601/app/kibana)

- Go to the Management section :
  ![img](/img/arender/ELK/configuration.png)

- Go to the Index Patterns :
  ![img](/img/arender/ELK/indexpattern.png)

- Add the 2 indexes :
    - arender-performance
        - arender-rendition-performance

![img](/img/arender/ELK/ajoutpattern.png)

#### Import dashboard example

- Go to Saved Objects :
  ![img](/img/arender/ELK/savedobject.png)

- For version allowing .ndjson file import (Since Kibana 7.2.0):
    - First import visualization. Click on import and select the file : /docs/ELK/Arender-visualizations.ndjson
    - Then import dashboard. Click on import and select the file : /docs/ELK/Arender-dashboard-example.ndjson
- For version only allowing .json file import :
    - First import visualization. Click on import and select the file : /docs/ELK/Arender-visualizations.json
    - Then import dashboard. Click on import and select the file : /docs/ELK/Arender-dashboard-example.json

- Open dashboard :  
  ![img](/img/arender/ELK/dashboard.png)
