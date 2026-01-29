---
title: Installation in Apache Tomcat
sidebar_position: 3
description: Deployment guide for IBM Filenet in Apache Tomcat application server
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 07e18357dc2eca5fba164fe756eda82f59fba20234a02b73d39c17b20a9cab38
---

Below the deployment of ARender HMI for FileNet in **Apache Tomcat**.

Limitation: Authentication to IBM FileNet has to be configured with a **technical account**.
The consequences will be that:

- Documents/Annotations/Metadata will be fetched with the technical account,
- Annotations will have the name of the technical account.
  If the need is to propagate the authentication you can either use WebSphere as Application server (see the documentation [here](/docs/arender/installation/standalone/web-ui/filenet/filenet-was).

In our example, we are deploying the presentation server
in an environment with:

- Operating System: Windows Server 2016
- Filenet 5.5
- Apache Tomcat 9.0
- ARender HMI for FileNet version

## Retrieve the ARender HMI WAR for FileNet

Using the username and password beforehand provided,
you can retrieve the web application in EAR format [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-hmi-filenet//arondor-arender-hmi-filenet-.war).

## Configuration of ARender HMI WAR for FileNet

Some additional configuration is needed in the ARender for FileNet WAR to be supported in Tomcat.

### User context configuration

Open the below file:

- arondor-arender-hmi-filenet-.war\WEB-INF\classes\arender-user-context.xml
  And replace the bean having the following id **urlFilter** by the following bean:

```xml
<bean id="urlFilter"
    class="com.arondor.viewer.server.security.RequestParameterAuthenticationFilter">
    <property name="authenticationManager" ref="authenticationManager" />
</bean>
```

### Security configuration

Remove the below file:

- arondor-arender-hmi-filenet-2023.16.0.war\WEB-INF\lib\arondor-arender-filenet-ce-2023.16.0.jar\META-INF\web-fragment.xml

### Technical account configuration for the connection to FileNet

Open the below file:

- arondor-arender-hmi-filenet-.war\WEB-INF\classes\arender-server-custom-filenet.properties
  And add the below content (change with the value matching your context):

````cfg
# Default authentication method is jaasObjectStoreProvider. To activate connect through a technical account use loginPasswordObjectStoreProvider and set the right login and password below
arender.server.filenet.authentication.method=loginPasswordObjectStoreProvider
# Example of URL for jaasObjectStoreProvider: iiop://localhost:2809/FileNet/Engine and for loginPasswordObjectStoreProvider : http://localhost:9080/wsi/FNCEWS40MTOM/

```properties
arender.server.filenet.ce.url=http://localhost:9080/wsi/FNCEWS40MTOM/
arender.server.filenet.ce.login=loginToChange
arender.server.filenet.ce.password=passwordToChange
````

### Add additional libraries

Download the below JARs:

- **xercesImpl** version **2.11.0**: [download link](https://mvnrepository.com/artifact/xerces/xercesImpl/2.11.0).
- **xml-apis** version **1.4.01**: [download link](https://mvnrepository.com/artifact/xml-apis/xml-apis/1.4.01).

And place these two libraries into the following folder: arondor-arender-hmi-filenet-.war\WEB-INF\lib.
