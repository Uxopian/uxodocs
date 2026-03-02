---
title: Overview
last_update:
  date: '2026-02-05T16:03:58.461Z'
  author: CI/CD Bot
sidebar_position: 1
content_hash: 0c7f33f84689c14283ef9a292459db85437686ef1d36c13343304ddf38d8e383
---

This page details the configuration of ARender for the ECM Alfresco

:::note
To continue on this page, ARender standalone must have been correctly configured.

If not yet, then head to this link [here](/docs/arender/installation/standalone/web-ui/standalone).
:::

## Connector 

Add the cmis connector in the folder /lib.

* Download the jar file [arondor-arender-cmis-{{version}}-jar-with-dependencies.jar](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-cmis/{{version}}/arondor-arender-cmis-{{version}}-jar-with-dependencies.jar)

## Configurations 

### Connexion between ARender and Alfresco

ARender for Alfresco connector enabled communication between ARender and Alfresco Content Services (and Alfresco Process Services).

By default, ARender is configured to communicate with a local Alfresco using CMIS.

* To configure the **CMIS connection** (editor recommendation) with a remote Alfresco, add the below property:

```properties title="configurations/arender-custom-server.properties"
arender.server.alfresco.atom.pub.url=http://alfrescoHost/alfresco/api/-default-/cmis/versions/1.1/atom
```

:::note
Authentication will be done using an **Alfresco ticket**.
:::

* To configure the **SOAP connection** (editor recommendation) with a remote Alfresco, add the below properties:

```properties title="configurations/arender-custom-server.properties"
arender.server.alfresco.use.soap.ws=true
arender.server.alfresco.soap.ws.url=http://alfrescoHost/alfresco/cmisws/cmis?wsdl
arender.server.alfresco.user=userNameValue
arender.server.alfresco.password=passwordValue
```

* Context path handling

The context path is the path that’s used by applications (for example, Alfresco Share, SOLR, SharePoint, and others).
If you want to deploy to a context path that isn’t */alfresco*, it needs to be specified with the following property:

```properties
arender.server.alfresco.context=my-context-path
```

By default, the context path is *alfresco* (for /alfresco).


### Annotations

#### Details on annotation storage

No configuration is needed for annotations storage in Alfresco.

Annotations will be stored as a child node of the document Node itself. Child node name is : `cm:arender-annotations-v{version document}`.

![Annotation child node image](pathname:///img/arender/alfresco/ARender4Alfresco-AnnotationChildNode.png)

## The installation is complete

You can now start the alfresco server and try to open a file with a link formed like this:

```html
http://{arender_serveur}:{arender_port}/ARenderHMI/?nodeRef={nodeRef}&user={user}&alf_ticket={ticket}&versionLabel={version}
```

More information about Alfresco connector [here](/docs/arender/guides/configurations/web-ui/connectors/alfresco/features-acs).