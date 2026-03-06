---
title: Activating performance logs
sidebar_position: 1
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: 7c6f77441d6f25b0cb51fb056358563b4d3ae33ad582bc2979a199639bb71ba9
---

You can since ARender 4.0.1 send directly each log fragment to the disk
(through classic logger), to elasticSearch (6) or both !

## To activate the feature in ARender Web-UI war

Alter, corresponding to your need, the following properties in:

```properties
#activate/deactivate the use of the disk based logger
arender.server.perf.logger.use=true

#configure elastic search connection
arender.server.perf.es.host=localhost
arender.server.perf.es.port=9200
arender.server.perf.es.protocol=http
arender.server.perf.es.index.name=arender-performance

#activate/deactivate the propagation to elastic search of the log messages
arender.server.perf.es.use=false
```

## At rendition side

YAML properties can be added to the rendition micro service in order to
obtain the same behavior as the ARender Web-UI war:

```yml
aop:
  active: false
  activateLogger: true
  activateEs: false
  esHost: localhost
  esPort: 9200
  esIndexName: arender-rendition-performance
  esProtocol: http
```

You will have to alter those values to the desired target in order to
activate performance log at the rendition side. To activate the logs,
you will have to setup aop.active to true, then choose which backend you
want, Es, Logger or both.

The same elastic search connection parameters are found at rendition
side.

## Use the around invoke to activate the backup of failed documents

In the same manner it is possible to use the around invoke configuration
to obtain performance logs at the rendition side, it is also possible to
activate the backup of documents which caused issues to ARender.

Here are the existing parameters:

```yml
aop:
  rejectedDocs: false
  nbDaysKept: 1
  rejectedPath: "rejected/"
```

The property "rejectedDocs" activates the mechanism. The property
"nbDaysKept" indicates how many days the documents will be kept inside
the folder. The property "rejectedPath" specifies the path in which the
documents will be saved when they have errors.

Default values are the one from the example.
