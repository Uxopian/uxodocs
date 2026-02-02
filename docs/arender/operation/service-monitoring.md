---
title: "Monitoring"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 28873608e062651615cad42e2e686bb87e81f3daf5a6f903a6019a044bcec16d
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


### Service status

The service responsible for documents rendition need to be watch over in
order to supervise the rendition server.

To watch over it, you need to check the service's status to check it's
state.

Between different operating system, normal behaviour identification
status is different:

<Tabs>
<TabItem value="Windows" label="Windows">

```powershell
$> sc query ARenderRenditionService
```

If the service is correctly running this command will return: 4 RUNNING
</TabItem>
<TabItem value="Linux" label="Linux">

If **systemd** is the is the system initialisation component:

```bash
$> systemctl status ARenderRenditionEngineService.service
```

If **initd** is the is the system initialisation component:

```bash
$> service ARenderRenditionEngineService status
```

If the service is correctly running this command will return: STARTED
</TabItem>
</Tabs>

### Monitoring system

Since version 4, ARender allows sending performance logs to ElasticSearch and viewing metrics on the Kibana dashboard. 
It is interesting to have the metric data of a service but we must not restrict ourselves to a single monitoring system. 
This is why we have integrated Micrometer into ARender in order to facilitate the sending of metrics to different monitoring systems.

So far we have only made these monitoring systems available: Prometheus, Elasticsearch and Datadog.

We will add later, other systems so as not to be limited to only those.

#### Configuration of the monitoring system
##### Web-UI Server properties

You will find below the list of default properties on the Web-UI Server side.

<Tabs>
<TabItem value="From 4.8.0 to 4.8.4" label="From 4.8.0 to 4.8.4">
```cfg
arender.server.metrics.tags.host=arender-hmi
arender.server.metrics.tags.application=arender

# Set the registry name to use to export metrics
# Possible value : prometheus, elastic, datadog
# Default to elastic
arender.server.meter.registry.name=elastic

# Prometheus configurations
arender.server.export.prometheus.enabled=false
arender.server.export.prometheus.descriptions=false
arender.server.export.prometheus.frequency.amount=1
arender.server.export.prometheus.frequency.unit=MINUTES

# Elastic configurations
arender.server.export.elastic.enabled=false
arender.server.export.elastic.host=http://localhost:9200
arender.server.export.elastic.index=arender-micrometer-metrics
arender.server.export.elastic.index-date-format=yyyy-MM
arender.server.export.elastic.timestamp-field-name=@timestamp
arender.server.export.elastic.auto-create-index=true
arender.server.export.elastic.user-name=
arender.server.export.elastic.password=
arender.server.export.elastic.frequency.amount=1
arender.server.export.elastic.frequency.unit=MINUTES

# Datadog configurations
arender.server.export.datadog.enabled=false
arender.server.export.datadog.api-key=
arender.server.export.datadog.application-key=
arender.server.export.datadog.descriptions=false
arender.server.export.datadog.host-tag=instance
arender.server.export.datadog.uri=https://app.datadoghq.com
arender.server.export.datadog.frequency.amount=1
arender.server.export.datadog.frequency.unit=MINUTES
```
</TabItem>

<TabItem value="From 4.8.5 to 4.8.6" label="From 4.8.5 to 4.8.6">
```cfg
arender.server.metrics.tags.host=arender-hmi
arender.server.metrics.tags.application=arender

arender.server.metrics.process.enabled=true
arender.server.metrics.jvm.enabled=true
arender.server.metrics.system.enabled=true

# Set the registry name to use to export metrics
# Possible value : prometheus, elastic, datadog, cloudwatch
# Default to elastic
arender.server.meter.registry.name=elastic

# Prometheus configurations
arender.server.export.prometheus.enabled=false
arender.server.export.prometheus.descriptions=false
arender.server.export.prometheus.frequency.amount=5
arender.server.export.prometheus.frequency.unit=MINUTES

# Elastic configurations
arender.server.export.elastic.enabled=false
arender.server.export.elastic.host=http://localhost:9200
arender.server.export.elastic.index=arender-micrometer-metrics
arender.server.export.elastic.index-date-format=yyyy-MM
arender.server.export.elastic.timestamp-field-name=@timestamp
arender.server.export.elastic.auto-create-index=true
arender.server.export.elastic.user-name=
arender.server.export.elastic.password=
arender.server.export.elastic.frequency.amount=5
arender.server.export.elastic.frequency.unit=MINUTES

# Datadog configurations
arender.server.export.datadog.enabled=false
arender.server.export.datadog.api-key=
arender.server.export.datadog.application-key=
arender.server.export.datadog.descriptions=false
arender.server.export.datadog.host-tag=instance
arender.server.export.datadog.uri=https://app.datadoghq.com
arender.server.export.datadog.frequency.amount=5
arender.server.export.datadog.frequency.unit=MINUTES

# CloudWatch configurations
arender.server.export.cloudwatch.enabled=false
arender.server.export.cloudwatch.namespace=arenderHMI
arender.server.export.cloudwatch.region=eu-west-1
arender.server.export.cloudwatch.frequency.amount=5
arender.server.export.cloudwatch.frequency.unit=MINUTES
```
</TabItem>

<TabItem value="Since 4.8.7" label="Since 4.8.7">
```cfg
arender.server.metrics.tags.host=arender-hmi
arender.server.metrics.tags.application=arender

arender.server.metrics.process.enabled=false
arender.server.metrics.jvm.enabled=false
arender.server.metrics.system.enabled=false

# Set the registry name to use to export metrics
# Possible value : prometheus, elastic, datadog, cloudwatch
# Default to elastic
arender.server.meter.registry.name=elastic

# Prometheus configurations
arender.server.export.prometheus.enabled=false
arender.server.export.prometheus.descriptions=false
arender.server.export.prometheus.frequency.amount=5
arender.server.export.prometheus.frequency.unit=MINUTES

# Elastic configurations
arender.server.export.elastic.enabled=false
arender.server.export.elastic.host=http://localhost:9200
arender.server.export.elastic.index=arender-micrometer-metrics
arender.server.export.elastic.index-date-format=yyyy-MM
arender.server.export.elastic.timestamp-field-name=@timestamp
arender.server.export.elastic.auto-create-index=true
arender.server.export.elastic.user-name=
arender.server.export.elastic.password=
arender.server.export.elastic.frequency.amount=5
arender.server.export.elastic.frequency.unit=MINUTES

# Datadog configurations
arender.server.export.datadog.enabled=false
arender.server.export.datadog.api-key=
arender.server.export.datadog.application-key=
arender.server.export.datadog.descriptions=false
arender.server.export.datadog.host-tag=instance
arender.server.export.datadog.uri=https://app.datadoghq.com
arender.server.export.datadog.frequency.amount=5
arender.server.export.datadog.frequency.unit=MINUTES

# CloudWatch configurations
arender.server.export.cloudwatch.enabled=false
arender.server.export.cloudwatch.namespace=arenderHMI
arender.server.export.cloudwatch.region=eu-west-1
arender.server.export.cloudwatch.frequency.amount=5
arender.server.export.cloudwatch.frequency.unit=MINUTES
```
</TabItem>

</Tabs>


##### Rendition properties

Below is the list of default properties for all rendition services.

From version 4.8.0 to 4.8.4 :

<Tabs>
<TabItem value="Broker (DSB)" label="Broker (DSB)">
```cfg
management.metrics.tags.host=arender-broker
management.metrics.tags.application=arender
management.metrics.distribution.percentiles-histogram.http.server.requests=true
management.metrics.distribution.sla.http.server.requests=100ms, 400ms, 500ms, 2000ms
management.metrics.distribution.percentiles.http.server.requests=0.5, 0.9, 0.95, 0.99


# Prometheus monitoring system
management.endpoints.web.exposure.include=prometheus,metrics,health
management.endpoint.prometheus.enabled=false
management.endpoint.metrics.enabled=true


# ElasticSearch monitoring system
management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.step=1m
management.metrics.export.elastic.index=arender-micrometer-metrics
management.metrics.export.elastic.host=http://localhost:9200


# DataDog monitoring system
management.metrics.export.datadog.enabled=false
# Datadog API key
management.metrics.export.datadog.api-key=YOUR_KEY
# The step size to use (ie the reporting frequency).
management.metrics.export.datadog.step=1m
management.metrics.export.datadog.uri=https://app.datadoghq.com/
```
</TabItem>

<TabItem value="TaskConversion (DCV)" label="TaskConversion (DCV)">
```cfg
management.metrics.tags.host=arender-taskconversion
management.metrics.tags.application=arender
management.metrics.distribution.percentiles-histogram.http.server.requests=true
management.metrics.distribution.sla.http.server.requests=100ms, 400ms, 500ms, 2000ms
management.metrics.distribution.percentiles.http.server.requests=0.5, 0.9, 0.95, 0.99


# Prometheus monitoring system
management.endpoints.web.exposure.include=prometheus,metrics,health,shutdown
management.endpoint.prometheus.enabled=false
management.endpoint.metrics.enabled=true


# ElasticSearch monitoring system
management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.step=1m
management.metrics.export.elastic.index=arender-micrometer-metrics
management.metrics.export.elastic.host=http://localhost:9200


# DataDog monitoring system
management.metrics.export.datadog.enabled=false
# Datadog API key
management.metrics.export.datadog.api-key=YOUR_KEY
# The step size to use (ie the reporting frequency).
management.metrics.export.datadog.step=1m
management.metrics.export.datadog.uri=https://app.datadoghq.com/
```
</TabItem>

<TabItem value="PDFBox (DTH)" label="PDFBox (DTH)">
```cfg
management.metrics.tags.host=arender-pdfbox
management.metrics.tags.application=arender
management.metrics.distribution.percentiles-histogram.http.server.requests=true
management.metrics.distribution.sla.http.server.requests=100ms, 400ms, 500ms, 2000ms
management.metrics.distribution.percentiles.http.server.requests=0.5, 0.9, 0.95, 0.99


# Prometheus monitoring system
management.endpoints.web.exposure.include=prometheus,metrics,health,shutdown
management.endpoint.prometheus.enabled=false
management.endpoint.metrics.enabled=true


# ElasticSearch monitoring system
management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.step=1m
management.metrics.export.elastic.index=arender-micrometer-metrics
management.metrics.export.elastic.host=http://localhost:9200


# DataDog monitoring system
management.metrics.export.datadog.enabled=false
# Datadog API key
management.metrics.export.datadog.api-key=YOUR_KEY
# The step size to use (ie the reporting frequency).
management.metrics.export.datadog.step=1m
management.metrics.export.datadog.uri=https://app.datadoghq.com/
```
</TabItem>

<TabItem value="JNI (DRN)" label="JNI (DRN)">
```cfg
management.metrics.tags.host=arender-jni
management.metrics.tags.application=arender
management.metrics.distribution.percentiles-histogram.http.server.requests=true
management.metrics.distribution.sla.http.server.requests=100ms, 400ms, 500ms, 2000ms
management.metrics.distribution.percentiles.http.server.requests=0.5, 0.9, 0.95, 0.99


# Prometheus monitoring system
management.endpoints.web.exposure.include=prometheus,metrics,health,shutdown
management.endpoint.prometheus.enabled=false
management.endpoint.metrics.enabled=true


# ElasticSearch monitoring system
management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.step=1m
management.metrics.export.elastic.index=arender-micrometer-metrics
management.metrics.export.elastic.host=http://localhost:9200


# DataDog monitoring system
management.metrics.export.datadog.enabled=false
# Datadog API key
management.metrics.export.datadog.api-key=YOUR_KEY
# The step size to use (ie the reporting frequency).
management.metrics.export.datadog.step=1m
management.metrics.export.datadog.uri=https://app.datadoghq.com/
```
</TabItem>
</Tabs>

From version 4.8.5 to 4.8.6 :

<Tabs>
<TabItem value="Broker (DSB)" label="Broker (DSB)">
```cfg
management.metrics.tags.host=arender-broker
management.metrics.tags.application=arender
management.metrics.distribution.percentiles-histogram.http.server.requests=true
management.metrics.distribution.sla.http.server.requests=100ms, 400ms, 500ms, 2000ms
management.metrics.distribution.percentiles.http.server.requests=0.5, 0.9, 0.95, 0.99

management.metrics.enable.tomcat=false
management.metrics.enable.http=false
management.metrics.enable.logback=false
management.metrics.enable.jvm=true
management.metrics.enable.process=true
management.metrics.enable.system=true

# Prometheus monitoring system
management.endpoints.web.exposure.include=prometheus,metrics,health
management.endpoint.prometheus.enabled=false
management.endpoint.metrics.enabled=true


# ElasticSearch monitoring system
management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.step=5m
management.metrics.export.elastic.index=arender-micrometer-metrics
management.metrics.export.elastic.host=http://localhost:9200


# DataDog monitoring system
management.metrics.export.datadog.enabled=false
# Datadog API key
management.metrics.export.datadog.api-key=YOUR_KEY
# The step size to use (ie the reporting frequency).
management.metrics.export.datadog.step=5m
management.metrics.export.datadog.uri=https://app.datadoghq.com/


# CloudWatch monitoring system
management.metrics.export.cloudwatch.enabled=false
management.metrics.export.cloudwatch.namespace=brokerNameSpace
management.metrics.export.cloudwatch.step=5m
management.metrics.export.cloudwatch.batchSize=20
management.metrics.export.cloudwatch.region=eu-west-1
```
</TabItem>

<TabItem value="TaskConversion (DCV)" label="TaskConversion (DCV)">
```cfg
management.metrics.tags.host=arender-taskconversion
management.metrics.tags.application=arender
management.metrics.distribution.percentiles-histogram.http.server.requests=true
management.metrics.distribution.sla.http.server.requests=100ms, 400ms, 500ms, 2000ms
management.metrics.distribution.percentiles.http.server.requests=0.5, 0.9, 0.95, 0.99

management.metrics.enable.tomcat=false
management.metrics.enable.http=false
management.metrics.enable.logback=false
management.metrics.enable.jvm=true
management.metrics.enable.process=true
management.metrics.enable.system=true

# Prometheus monitoring system
management.endpoints.web.exposure.include=prometheus,metrics,health,shutdown
management.endpoint.prometheus.enabled=false
management.endpoint.metrics.enabled=true


# ElasticSearch monitoring system
management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.step=5m
management.metrics.export.elastic.index=arender-micrometer-metrics
management.metrics.export.elastic.host=http://localhost:9200


# DataDog monitoring system
management.metrics.export.datadog.enabled=false
# Datadog API key
management.metrics.export.datadog.api-key=YOUR_KEY
# The step size to use (ie the reporting frequency).
management.metrics.export.datadog.step=5m
management.metrics.export.datadog.uri=https://app.datadoghq.com/


# CloudWatch monitoring system
management.metrics.export.cloudwatch.enabled=false
management.metrics.export.cloudwatch.namespace=converterNameSpace
management.metrics.export.cloudwatch.step=5m
management.metrics.export.cloudwatch.batchSize=20
management.metrics.export.cloudwatch.region=eu-west-1
```
</TabItem>

<TabItem value="PDFBox (DTH)" label="PDFBox (DTH)">
```cfg
management.metrics.tags.host=arender-pdfbox
management.metrics.tags.application=arender
management.metrics.distribution.percentiles-histogram.http.server.requests=true
management.metrics.distribution.sla.http.server.requests=100ms, 400ms, 500ms, 2000ms
management.metrics.distribution.percentiles.http.server.requests=0.5, 0.9, 0.95, 0.99

management.metrics.enable.tomcat=false
management.metrics.enable.http=false
management.metrics.enable.logback=false
management.metrics.enable.jvm=true
management.metrics.enable.process=true
management.metrics.enable.system=true

# Prometheus monitoring system
management.endpoints.web.exposure.include=prometheus,metrics,health,shutdown
management.endpoint.prometheus.enabled=false
management.endpoint.metrics.enabled=true


# ElasticSearch monitoring system
management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.step=5m
management.metrics.export.elastic.index=arender-micrometer-metrics
management.metrics.export.elastic.host=http://localhost:9200


# DataDog monitoring system
management.metrics.export.datadog.enabled=false
# Datadog API key
management.metrics.export.datadog.api-key=YOUR_KEY
# The step size to use (ie the reporting frequency).
management.metrics.export.datadog.step=5m
management.metrics.export.datadog.uri=https://app.datadoghq.com/


# CloudWatch monitoring system
management.metrics.export.cloudwatch.enabled=false
management.metrics.export.cloudwatch.namespace=pdfboxNameSpace
management.metrics.export.cloudwatch.step=5m
management.metrics.export.cloudwatch.batchSize=20
management.metrics.export.cloudwatch.region=eu-west-1
```
</TabItem>

<TabItem value="JNI (DRN)" label="JNI (DRN)">
```cfg
management.metrics.tags.host=arender-jni
management.metrics.tags.application=arender
management.metrics.distribution.percentiles-histogram.http.server.requests=true
management.metrics.distribution.sla.http.server.requests=100ms, 400ms, 500ms, 2000ms
management.metrics.distribution.percentiles.http.server.requests=0.5, 0.9, 0.95, 0.99

management.metrics.enable.tomcat=false
management.metrics.enable.http=false
management.metrics.enable.logback=false
management.metrics.enable.jvm=true
management.metrics.enable.process=true
management.metrics.enable.system=true

# Prometheus monitoring system
management.endpoints.web.exposure.include=prometheus,metrics,health,shutdown
management.endpoint.prometheus.enabled=false
management.endpoint.metrics.enabled=true


# ElasticSearch monitoring system
management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.step=5m
management.metrics.export.elastic.index=arender-micrometer-metrics
management.metrics.export.elastic.host=http://localhost:9200


# DataDog monitoring system
management.metrics.export.datadog.enabled=false
# Datadog API key
management.metrics.export.datadog.api-key=YOUR_KEY
# The step size to use (ie the reporting frequency).
management.metrics.export.datadog.step=5m
management.metrics.export.datadog.uri=https://app.datadoghq.com/


# CloudWatch monitoring system
management.metrics.export.cloudwatch.enabled=false
management.metrics.export.cloudwatch.namespace=rendererNameSpace
management.metrics.export.cloudwatch.step=5m
management.metrics.export.cloudwatch.batchSize=20
management.metrics.export.cloudwatch.region=eu-west-1
```
</TabItem>
</Tabs>

Since 4.8.7 : 

<Tabs>
<TabItem value="Broker (DSB)" label="Broker (DSB)">
```cfg
management.metrics.tags.host=arender-broker
management.metrics.tags.application=arender
management.metrics.distribution.percentiles-histogram.http.server.requests=true
management.metrics.distribution.sla.http.server.requests=100ms, 400ms, 500ms, 2000ms
management.metrics.distribution.percentiles.http.server.requests=0.5, 0.9, 0.95, 0.99

management.metrics.enable.tomcat=false
management.metrics.enable.http=false
management.metrics.enable.logback=false
management.metrics.enable.jvm=false
management.metrics.enable.process=false
management.metrics.enable.system=false

# Prometheus monitoring system
management.endpoints.web.exposure.include=prometheus,metrics,health
management.endpoint.prometheus.enabled=false
management.endpoint.metrics.enabled=true


# ElasticSearch monitoring system
management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.step=5m
management.metrics.export.elastic.index=arender-micrometer-metrics
management.metrics.export.elastic.host=http://localhost:9200


# DataDog monitoring system
management.metrics.export.datadog.enabled=false
# Datadog API key
management.metrics.export.datadog.api-key=YOUR_KEY
# The step size to use (ie the reporting frequency).
management.metrics.export.datadog.step=5m
management.metrics.export.datadog.uri=https://app.datadoghq.com/


# CloudWatch monitoring system
management.metrics.export.cloudwatch.enabled=false
management.metrics.export.cloudwatch.namespace=brokerNameSpace
management.metrics.export.cloudwatch.step=5m
management.metrics.export.cloudwatch.batchSize=20
management.metrics.export.cloudwatch.region=eu-west-1
```
</TabItem>

<TabItem value="TaskConversion (DCV)" label="TaskConversion (DCV)">
```cfg
management.metrics.tags.host=arender-taskconversion
management.metrics.tags.application=arender
management.metrics.distribution.percentiles-histogram.http.server.requests=true
management.metrics.distribution.sla.http.server.requests=100ms, 400ms, 500ms, 2000ms
management.metrics.distribution.percentiles.http.server.requests=0.5, 0.9, 0.95, 0.99

management.metrics.enable.tomcat=false
management.metrics.enable.http=false
management.metrics.enable.logback=false
management.metrics.enable.jvm=false
management.metrics.enable.process=false
management.metrics.enable.system=false

# Prometheus monitoring system
management.endpoints.web.exposure.include=prometheus,metrics,health,shutdown
management.endpoint.prometheus.enabled=false
management.endpoint.metrics.enabled=true


# ElasticSearch monitoring system
management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.step=5m
management.metrics.export.elastic.index=arender-micrometer-metrics
management.metrics.export.elastic.host=http://localhost:9200


# DataDog monitoring system
management.metrics.export.datadog.enabled=false
# Datadog API key
management.metrics.export.datadog.api-key=YOUR_KEY
# The step size to use (ie the reporting frequency).
management.metrics.export.datadog.step=5m
management.metrics.export.datadog.uri=https://app.datadoghq.com/


# CloudWatch monitoring system
management.metrics.export.cloudwatch.enabled=false
management.metrics.export.cloudwatch.namespace=converterNameSpace
management.metrics.export.cloudwatch.step=5m
management.metrics.export.cloudwatch.batchSize=20
management.metrics.export.cloudwatch.region=eu-west-1
```
</TabItem>

<TabItem value="PDFBox (DTH)" label="PDFBox (DTH)">
```cfg
management.metrics.tags.host=arender-pdfbox
management.metrics.tags.application=arender
management.metrics.distribution.percentiles-histogram.http.server.requests=true
management.metrics.distribution.sla.http.server.requests=100ms, 400ms, 500ms, 2000ms
management.metrics.distribution.percentiles.http.server.requests=0.5, 0.9, 0.95, 0.99

management.metrics.enable.tomcat=false
management.metrics.enable.http=false
management.metrics.enable.logback=false
management.metrics.enable.jvm=false
management.metrics.enable.process=false
management.metrics.enable.system=false

# Prometheus monitoring system
management.endpoints.web.exposure.include=prometheus,metrics,health,shutdown
management.endpoint.prometheus.enabled=false
management.endpoint.metrics.enabled=true


# ElasticSearch monitoring system
management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.step=5m
management.metrics.export.elastic.index=arender-micrometer-metrics
management.metrics.export.elastic.host=http://localhost:9200


# DataDog monitoring system
management.metrics.export.datadog.enabled=false
# Datadog API key
management.metrics.export.datadog.api-key=YOUR_KEY
# The step size to use (ie the reporting frequency).
management.metrics.export.datadog.step=5m
management.metrics.export.datadog.uri=https://app.datadoghq.com/


# CloudWatch monitoring system
management.metrics.export.cloudwatch.enabled=false
management.metrics.export.cloudwatch.namespace=pdfboxNameSpace
management.metrics.export.cloudwatch.step=5m
management.metrics.export.cloudwatch.batchSize=20
management.metrics.export.cloudwatch.region=eu-west-1
```
</TabItem>

<TabItem value="JNI (DRN)" label="JNI (DRN)">
```cfg
management.metrics.tags.host=arender-jni
management.metrics.tags.application=arender
management.metrics.distribution.percentiles-histogram.http.server.requests=true
management.metrics.distribution.sla.http.server.requests=100ms, 400ms, 500ms, 2000ms
management.metrics.distribution.percentiles.http.server.requests=0.5, 0.9, 0.95, 0.99

management.metrics.enable.tomcat=false
management.metrics.enable.http=false
management.metrics.enable.logback=false
management.metrics.enable.jvm=false
management.metrics.enable.process=false
management.metrics.enable.system=false

# Prometheus monitoring system
management.endpoints.web.exposure.include=prometheus,metrics,health,shutdown
management.endpoint.prometheus.enabled=false
management.endpoint.metrics.enabled=true


# ElasticSearch monitoring system
management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.step=5m
management.metrics.export.elastic.index=arender-micrometer-metrics
management.metrics.export.elastic.host=http://localhost:9200


# DataDog monitoring system
management.metrics.export.datadog.enabled=false
# Datadog API key
management.metrics.export.datadog.api-key=YOUR_KEY
# The step size to use (ie the reporting frequency).
management.metrics.export.datadog.step=5m
management.metrics.export.datadog.uri=https://app.datadoghq.com/


# CloudWatch monitoring system
management.metrics.export.cloudwatch.enabled=false
management.metrics.export.cloudwatch.namespace=rendererNameSpace
management.metrics.export.cloudwatch.step=5m
management.metrics.export.cloudwatch.batchSize=20
management.metrics.export.cloudwatch.region=eu-west-1
```
</TabItem>
</Tabs>

#### Configuring sent metrics

ARender sends several different metrics to the monitoring system.
To avoid overloading the system with dozens of metrics sent by ARender,
properties are made available so you can enable/disable the metrics and tags/dimensions you need.

##### Web-UI Server properties

<Tabs>
<TabItem value="From 4.8.0 to 4.8.4" label="From 4.8.0 to 4.8.4">
```cfg
# ARender endpoint export metric
arender.endpoint.metrics.export.has.document.enabled=false
arender.endpoint.metrics.export.bookmarks.enabled=false
arender.endpoint.metrics.export.document.layout.enabled=true
arender.endpoint.metrics.export.document.metadata.enabled=false
arender.endpoint.metrics.export.image.enabled=true
arender.endpoint.metrics.export.page.contents.enabled=false
arender.endpoint.metrics.export.search.enabled=false
arender.endpoint.metrics.export.advanced.search.enabled=false
arender.endpoint.metrics.export.load.document.enabled=true
arender.endpoint.metrics.export.evict.enabled=false
arender.endpoint.metrics.export.alter.document.enabled=true
arender.endpoint.metrics.export.document.accessor.enabled=true
arender.endpoint.metrics.export.annotation.enabled=false
arender.endpoint.metrics.export.compare.enabled=true
arender.endpoint.metrics.export.named.destination=false
arender.endpoint.metrics.export.video.enabled=true
arender.endpoint.metrics.export.document.size.enabled=true
arender.endpoint.metrics.export.document.dpi.enabled=false
arender.endpoint.metrics.export.weather.enabled=false
arender.endpoint.metrics.export.readiness.enabled=false
arender.endpoint.metrics.export.signature.enabled=false
arender.endpoint.metrics.export.printable.pdf.enabled=true

# Whitelist tags to be exported, comma separated
arender.endpoint.metrics.export.whitelist.tags=host,documentId,mimeType
```
</TabItem>

<TabItem value="From 4.8.5 to 4.8.6" label="From 4.8.5 to 4.8.6">
```cfg
# ARender endpoint export metric
arender.endpoint.metrics.export.has.document.enabled=false
arender.endpoint.metrics.export.bookmarks.enabled=false
arender.endpoint.metrics.export.document.layout.enabled=true
arender.endpoint.metrics.export.document.metadata.enabled=false
arender.endpoint.metrics.export.image.enabled=true
arender.endpoint.metrics.export.page.contents.enabled=false
arender.endpoint.metrics.export.search.enabled=false
arender.endpoint.metrics.export.advanced.search.enabled=false
arender.endpoint.metrics.export.load.document.enabled=true
arender.endpoint.metrics.export.evict.enabled=false
arender.endpoint.metrics.export.alter.document.enabled=true
arender.endpoint.metrics.export.document.accessor.enabled=true
arender.endpoint.metrics.export.annotation.enabled=false
arender.endpoint.metrics.export.compare.enabled=true
arender.endpoint.metrics.export.named.destination=false
arender.endpoint.metrics.export.video.enabled=true
arender.endpoint.metrics.export.document.size.enabled=true
arender.endpoint.metrics.export.document.dpi.enabled=false
arender.endpoint.metrics.export.weather.enabled=false
arender.endpoint.metrics.export.readiness.enabled=false
arender.endpoint.metrics.export.signature.enabled=false
arender.endpoint.metrics.export.printable.pdf.enabled=true

# Whitelist tags to be exported, comma separated
arender.endpoint.metrics.export.whitelist.tags=host,mimeType

# Metric tool to time or count the request. Possible values : TIMER, COUNTER
arender.metric.meter.tool=COUNTER
```
</TabItem>

<TabItem value="Since 4.8.7" label="Since 4.8.7">
```cfg
# ARender endpoint export metric
arender.endpoint.metrics.export.has.document.enabled=false
arender.endpoint.metrics.export.bookmarks.enabled=false
arender.endpoint.metrics.export.document.layout.enabled=false
arender.endpoint.metrics.export.document.metadata.enabled=false
arender.endpoint.metrics.export.image.enabled=false
arender.endpoint.metrics.export.page.contents.enabled=false
arender.endpoint.metrics.export.search.enabled=false
arender.endpoint.metrics.export.advanced.search.enabled=false
arender.endpoint.metrics.export.load.document.enabled=false
arender.endpoint.metrics.export.evict.enabled=false
arender.endpoint.metrics.export.alter.document.enabled=false
arender.endpoint.metrics.export.document.accessor.enabled=false
arender.endpoint.metrics.export.annotation.enabled=false
arender.endpoint.metrics.export.compare.enabled=false
arender.endpoint.metrics.export.named.destination=false
arender.endpoint.metrics.export.video.enabled=false
arender.endpoint.metrics.export.document.size.enabled=false
arender.endpoint.metrics.export.document.dpi.enabled=false
arender.endpoint.metrics.export.weather.enabled=false
arender.endpoint.metrics.export.readiness.enabled=false
arender.endpoint.metrics.export.signature.enabled=false
arender.endpoint.metrics.export.printable.pdf.enabled=false
arender.endpoint.metrics.export.opening.time.enabled=false
arender.endpoint.metrics.export.url.parsing.enabled=false

# Whitelist tags to be exported, comma separated
arender.endpoint.metrics.export.whitelist.tags=host,mimeType
# Blacklist tags to be exported from system meter (jvm, process, http, tomcat, etc)
arender.system.metrics.export.blacklist.tags=

# Metric tool to time or count the request. Possible values : TIMER, COUNTER
arender.metric.meter.tool=COUNTER
```
</TabItem>

</Tabs>

You will find below the list of metric names as well as the tags/dimensions sent, which can be used to whitelist the tags to send.

##### Rendition properties

You will find below the list of properties allowing to deactivate the metrics as well as to whitelist the tags to be sent.

Note: These are the same properties for each of the rendition services.

<Tabs>
<TabItem value="From 4.8.0 to 4.8.4" label="From 4.8.0 to 4.8.4">
```cfg
# ARender endpoint metrics export
arender.endpoint.metrics.export.has.document.enabled=false
arender.endpoint.metrics.export.bookmarks.enabled=false
arender.endpoint.metrics.export.document.layout.enabled=true
arender.endpoint.metrics.export.document.metadata.enabled=false
arender.endpoint.metrics.export.image.enabled=true
arender.endpoint.metrics.export.page.contents.enabled=false
arender.endpoint.metrics.export.search.enabled=false
arender.endpoint.metrics.export.advanced.search.enabled=false
arender.endpoint.metrics.export.load.document.enabled=true
arender.endpoint.metrics.export.evict.enabled=false
arender.endpoint.metrics.export.alter.document.enabled=true
arender.endpoint.metrics.export.document.accessor.enabled=true
arender.endpoint.metrics.export.annotation.enabled=false
arender.endpoint.metrics.export.compare.enabled=true
arender.endpoint.metrics.export.named.destination=false
arender.endpoint.metrics.export.video.enabled=true
arender.endpoint.metrics.export.document.size.enabled=true
arender.endpoint.metrics.export.document.dpi.enabled=false
arender.endpoint.metrics.export.weather.enabled=false
arender.endpoint.metrics.export.readiness.enabled=false
arender.endpoint.metrics.export.signature.enabled=false
arender.endpoint.metrics.export.printable.pdf.enabled=true
arender.endpoint.metrics.export.convert.enabled=true
arender.endpoint.metrics.export.health.record.enabled=false

# Whitelist tags to be exported, comma separated
arender.endpoint.metrics.export.whitelist.tags=host,documentId,mimeType
```
</TabItem>

<TabItem value="From 4.8.5 to 4.8.6" label="From 4.8.5 to 4.8.6">
```cfg
# ARender endpoint metrics export
arender.endpoint.metrics.export.has.document.enabled=false
arender.endpoint.metrics.export.bookmarks.enabled=false
arender.endpoint.metrics.export.document.layout.enabled=true
arender.endpoint.metrics.export.document.metadata.enabled=false
arender.endpoint.metrics.export.image.enabled=true
arender.endpoint.metrics.export.page.contents.enabled=false
arender.endpoint.metrics.export.search.enabled=false
arender.endpoint.metrics.export.advanced.search.enabled=false
arender.endpoint.metrics.export.load.document.enabled=true
arender.endpoint.metrics.export.evict.enabled=false
arender.endpoint.metrics.export.alter.document.enabled=true
arender.endpoint.metrics.export.document.accessor.enabled=true
arender.endpoint.metrics.export.annotation.enabled=false
arender.endpoint.metrics.export.compare.enabled=true
arender.endpoint.metrics.export.named.destination=false
arender.endpoint.metrics.export.video.enabled=true
arender.endpoint.metrics.export.document.size.enabled=true
arender.endpoint.metrics.export.document.dpi.enabled=false
arender.endpoint.metrics.export.weather.enabled=false
arender.endpoint.metrics.export.readiness.enabled=false
arender.endpoint.metrics.export.signature.enabled=false
arender.endpoint.metrics.export.printable.pdf.enabled=true
arender.endpoint.metrics.export.convert.enabled=true
arender.endpoint.metrics.export.health.record.enabled=false

# Whitelist tags to be exported, comma separated
arender.endpoint.metrics.export.whitelist.tags=host,mimeType
arender.endpoint.metrics.export.correlation.id.tag.enabled=false

# Metric tool to time or count the request. Possible values : TIMER, COUNTER
arender.metric.meter.tool=COUNTER
```
</TabItem>

<TabItem value="Since 4.8.7" label="Since 4.8.7">
```cfg
# ARender endpoint metrics export
arender.endpoint.metrics.export.has.document.enabled=false
arender.endpoint.metrics.export.bookmarks.enabled=false
arender.endpoint.metrics.export.document.layout.enabled=false
arender.endpoint.metrics.export.document.metadata.enabled=false
arender.endpoint.metrics.export.image.enabled=false
arender.endpoint.metrics.export.page.contents.enabled=false
arender.endpoint.metrics.export.search.enabled=false
arender.endpoint.metrics.export.advanced.search.enabled=false
arender.endpoint.metrics.export.load.document.enabled=false
arender.endpoint.metrics.export.evict.enabled=false
arender.endpoint.metrics.export.alter.document.enabled=false
arender.endpoint.metrics.export.document.accessor.enabled=false
arender.endpoint.metrics.export.annotation.enabled=false
arender.endpoint.metrics.export.compare.enabled=false
arender.endpoint.metrics.export.named.destination=false
arender.endpoint.metrics.export.video.enabled=false
arender.endpoint.metrics.export.document.size.enabled=false
arender.endpoint.metrics.export.document.dpi.enabled=false
arender.endpoint.metrics.export.weather.enabled=false
arender.endpoint.metrics.export.readiness.enabled=false
arender.endpoint.metrics.export.signature.enabled=false
arender.endpoint.metrics.export.printable.pdf.enabled=false
arender.endpoint.metrics.export.convert.enabled=false
arender.endpoint.metrics.export.health.record.enabled=false

# Whitelist tags to be exported, comma separated
arender.endpoint.metrics.export.whitelist.tags=host,mimeType
arender.endpoint.metrics.export.correlation.id.tag.enabled=false

# Metric tool to time or count the request. Possible values : TIMER, COUNTER
arender.metric.meter.tool=COUNTER
```
</TabItem>

</Tabs>

#### Cache metrics

Since 4.8.15, ARender also monitors its internal cache usage (Hazelcast/Ehcache).

To enable the export of cache metrics, some configurations are needed.

For Rendition component, you will need to enable the following property in the Broker microservice:

```cfg title="application.properties"
management.metrics.export.hazelcast.enabled=true
```

For the Web-UI component, you will need to enable the following property:

```cfg title="arender-server-custom-vanilla.properties"
arender.server.cache.export.enabled=true
```




#### List of all metrics

Below is the list of all metrics sent to the configured monitoring system :

| Name                                                 | Tags / Dimensions                                                        |
|------------------------------------------------------|--------------------------------------------------------------------------|
| arender.notify.opening.times (from 4.8.0 to 4.8.5)   | documentId, moduleLoadingTime, documentLoadingTime                       |
| arender.document.opening (from 4.8.5)                | documentId, mimeType                                                     |
| arender.document.opening.time (from 4.8.5)           | documentId, mimeType                                                     |
| arender.application.opening.time (from 4.8.5)        | documentId, mimeType                                                     |
| arender.document.has                                 | documentId                                                               |
| arender.document.evict                               | documentId                                                               |
| arender.document.accessor                            | documentId, selector                                                     |
| arender.document.accessor.content                    | documentId, selector                                                     |
| arender.document.accessor.content.raw                | documentId, selector                                                     |
| arender.document.accessor.load                       |                                                                          |
| arender.document.accessor.load.url                   |                                                                          |
| arender.document.load                                |                                                                          |
| arender.document.bookmarks                           | documentId                                                               |
| arender.document.signatures                          | documentId                                                               |
| arender.document.layout                              | documentId, mimeType, pageCount, documentWidth, documentHeight, duration |
| arender.document.layout.progressive.update           | documentId                                                               |
| arender.document.metadata                            | documentId                                                               |
| arender.document.page.contents                       | documentId, page                                                         |
| arender.document.image                               | documentId, page, pageDescription, pageWidth, pageRotation               |
| arender.document.image.svg                           | documentId, page, pageDescription, pageWidth, pageRotation               |
| arender.document.alter                               |                                                                          |
| arender.document.search.page                         | documentId, page                                                         |
| arender.document.search.pages                        | documentId                                                               |
| arender.document.advanced.search                     | documentId                                                               |
| arender.document.advanced.search.page                | documentId, page                                                         |
| arender.document.start.partial.loading               | documentId, mimeType, documentTitle, contentSize                         |
| arender.document.continue.partial.loading            | documentId, offset, finished                                             |
| arender.document.compare                             | documentIdLeft, documentIdRight                                          |
| arender.document.compare.image                       | documentIdLeft, documentIdRight                                          |
| arender.document.named.destinations                  | documentId                                                               |
| arender.document.create.printable.pdf                | documentId                                                               |
| arender.document.upload                              | documentId, mimeType, documentTitle                                      |
| arender.document.size                                | documentId, selector                                                     |
| arender.document.page.dpi                            | documentId, page                                                         |
| arender.annotation.accessor                          | documentId                                                               |
| arender.annotation.extract                           | documentId, formatType                                                   |
| arender.annotation.convert.stamps                    | documentId                                                               |
| arender.annotation.generate                          | documentId, formatType                                                   |
| arender.annotation.generate.pdf.with.fdf.annotations | documentId                                                               |
| arender.annotation.search.text                       | documentId                                                               |
| arender.annotation.creation.policy                   | documentId                                                               |
| arender.annotation.update                            | documentId                                                               |
| arender.annotation.delete                            | documentId                                                               |
| arender.annotation.create                            | documentId                                                               |
| arender.annotation.get                               | documentId                                                               |
| arender.video.chunk                                  | documentId, start, length                                                |
| arender.weather                                      |                                                                          |
| arender.health.readiness                             |                                                                          |

All these properties have common tags/dimensions: **exceptionClass**, **exceptionMessage**, **host** and **correlationId**.
The **exceptionClass** and **exceptionMessage** tags are only added to metrics if they are not empty or null.

#### Example

##### Prometheus

To activate the sending of metrics on the Web-UI side, all you have to do is first indicate the desired registry among the 3 possible registries: prometheus, elastic and datadog.
Then activate the export on the desired monitoring system.

Here we will use Prometheus.


```cfg title="arender-serveur-default.properties"
arender.server.meter.registry.name=prometheus
arender.server.export.prometheus.enabled=true
```

Then, it will be necessary to indicate in the configuration of the Prometheus server the end point on which it must recover the metrics.
Prometheus metrics on the Web-UI side are exposed on the /arendergwt/prometheus endpoint as well as the host/port on which ARender Web-UI is deployed.
You should have something similar to this configuration below:

```cfg title="`PROMETHEUS_SERVER_PATH`/prometheus.yaml"
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    metrics_path: '/arendergwt/prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ["localhost:8080"]
```

In addition, for the rendition part, all you have to do is activate the export of metrics to Prometheus on each of the rendition services.

```cfg title="application.properties"
management.endpoint.prometheus.enabled=true
```


In the same way as the Web-UI part, it is also necessary to indicate the end point on which the metrics are exposed. On the rendition side, this is exposed on the /actuator/prometheus endpoint.

<Tabs>
<TabItem value="Broker (DSB)" label="Broker (DSB)">
```cfg
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    metrics_path: '/actuator/prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ["localhost:8761"]
```
</TabItem>

<TabItem value="TaskConversion (DCV)" label="TaskConversion (DCV)">
```cfg
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    metrics_path: '/actuator/prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ["localhost:19999"]
```
</TabItem>

<TabItem value="PDFBox (DTH)" label="PDFBox (DTH)">
```cfg
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    metrics_path: '/actuator/prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ["localhost:8899"]
```
</TabItem>

<TabItem value="JNI (DRN)" label="JNI (DRN)">
```cfg
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    metrics_path: '/actuator/prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ["localhost:9091"]
```
</TabItem>
</Tabs>