---
title: "Content Manager"
last_update:
  date: '2026-02-02T12:16:59.945Z'
  author: CI/CD Bot
content_hash: 2132c361225a7eb5ec6dbcd103cc5e8946d60935049d4b31d8caab4eb11f3975
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Below a detail on how to deploy ARender for Content Manager.

In our example, we are deploying the presentation server in an environment with:

- Operating System: Windows Server 2012 R2 Standard
- Content Manager 8.6
- Websphere 9.0.5.0 Application Server (you can also use Apache Tomcat 8+)
- ARender HMI version VERSION

## Retrieve the ARender HMI archive

Using the username and password beforehand provided,
you can retrieve the web application in EAR format [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-hmi-cm-ear/VERSION/arondor-arender-hmi-cm-ear-VERSION.ear).

## WebSphere requirements

:::warning

The version of websphere used here must have java 8 installed and activated.
If you like, please follow the instructions [here](https://www.ibm.com/support/knowledgecenter/en/SSYGQH_6.0.0/admin/install/inst_was_switch_java.html).

:::

## Deployment in WebSphere

- Open a WebSphere console at [https://serveur_websphere:9043/ibm/console](https://serveur_websphere:9043/ibm/console)

- Go in the "Applications" tab, then click on "WebSphere enterprise applications"

- To launch installation, click on "Install"

![filenet](/img/arender/filenet/filenet-02.png)

- Choose the EAR path to deploy and click on "Next"

![filenet](/img/arender/filenet/cm-03.png)

- To accept default parameters, click on "Next"

![filenet](/img/arender/filenet/filenet-05.png)

![filenet](/img/arender/filenet/filenet-06.png)

- Select webserver(s) and/or server(s) of the Workplace, then click on "Next"

![filenet](/img/arender/filenet/filenet-07.png)

- To accept the parameters by default (virtual host: default_host), click on "Next"

![filenet](/img/arender/filenet/filenet-08.png)

![filenet](/img/arender/filenet/filenet-09.png)

- In recap window, click on « Finish » to begin the installation with these parameters after checking them

![filenet](/img/arender/filenet/filenet-10.png)

## Post setup

### Libraries loading order

<Tabs>

<TabItem value="Since 4.8.9" label="Since 4.8.9">

Nothing to configure.

</TabItem>

<TabItem value="Before 4.8.9" label="Before 4.8.9">

Websphere must be configured in parent-last which means it has to load its libraries after ARender.

- In the application list click on **ARender 4.8.X for Content Manager**

- Click on **Manage Modules**

![filenet](/img/arender/filenet/cm-11.png)

- Click on the WAR: **arondor-arender-hmi-cm-4.8.X.war**

![filenet](/img/arender/filenet/cm-12.png)

- Select the parent-last configuration in the **Class loader order** drop-down list

![filenet](/img/arender/filenet/cm-13.png)

- Click on "OK" and save the modifications

- **Start** ARender application

</TabItem>

</Tabs>

## ARender deployment for Content Manager is complete

You can now access a file via a URL formed like below:

```html
http://localhost:9080/ARender/?docid=86%203%20ICM8%20ICMNLSDB7%20NOINDEX59%2026%20A1001001A16B08B91035E0007718%20A16B08B91035E000771%2014%201000
```