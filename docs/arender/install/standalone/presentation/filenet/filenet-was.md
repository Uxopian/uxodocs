---
title: "ARender for FileNet in IBM Websphere Application Server (recommended)"
last_update:
  date: '2026-02-02T12:16:59.945Z'
  author: CI/CD Bot
content_hash: f3d331d38289b730c9ca17d26373928b265a0f1d2dc62a4c8a5aca093bd5bf4f
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Below the deployment of ARender HMI for FileNet in **IBM WebSphere application server**.

In our example, we are deploying the presentation server
in an environment with:

- Operating System: Windows Server 2016
- Filenet 5.5
- Websphere 9.0.5.0 Application Server
- ARender HMI for FileNet version 4.8.21

## Retrieve the ARender HMI EAR archive for FileNet

Using the username and password beforehand provided,
you can retrieve the web application in EAR format [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-hmi-filenet-ear/4.8.21/arondor-arender-hmi-filenet-ear-4.8.21.ear).

## WebSphere requirements

:::warning

The version of websphere used here must have java 8 installed and activated.
If you like, please follow the instructions [here](https://www.ibm.com/docs/en/was-nd/8.5.5?topic=waso-java-se-8-in-websphere-application-server-v85).

:::

## Deployment of the EAR in IBM WebSphere

- Open a **WebSphere console** at [https://serveur_websphere:9043/ibm/console](https://serveur_websphere:9043/ibm/console)

- Go in "Applications" tab, then click on "**WebSphere enterprise applications**"

- To launch installation, click on "**Install**"

![filenet](/img/arender/filenet/filenet-02.png)

- Choose the EAR path to deploy and click on "**Next**"

![filenet](/img/arender/filenet/filenet-03.png)

- To accept default parameters, click on "**Next**"

![filenet](/img/arender/filenet/filenet-05.png)

![filenet](/img/arender/filenet/filenet-06.png)

- Select webserver(s) and/or server(s) of the Workplace, then click on "**Next**"

![filenet](/img/arender/filenet/filenet-07.png)

- To accept the parameters by default (virtual host: default_host), click on "**Next**"

![filenet](/img/arender/filenet/filenet-08.png)

![filenet](/img/arender/filenet/filenet-09.png)

- In recap window, click on "**Finish**" to begin the installation with these parameters after checking them

![filenet](/img/arender/filenet/filenet-10.png)

## Post setup

### Libraries loading order

<Tabs>

<TabItem value="Since 4.8.9" label="Since 4.8.9">

Nothing to configure.

</TabItem>

<TabItem value="Before 4.8.9" label="Before 4.8.9">

Websphere must be configured in parent-last which means it has to load its libraries after ARender.

- In the application list click on ARender 4.8.X for FileNet 5.x

- Click on "Manage Modules"

![filenet](/img/arender/filenet/filenet-13.png)

- Click on ARender module

![filenet](/img/arender/filenet/filenet-11.png)

- Select in the drop down list « Class loader order »: « Classes loaded with local class loaded first (parent last) »

![filenet](/img/arender/filenet/filenet-14.png)

- Click on "OK" and save the modifications

- **Start** ARender application

</TabItem>

</Tabs>

## Installation in CPE is complete

You can now access a Filenet document via a URL formed like this:

```html
http://{server_arender}:{port_arender}/ARender/?id={id}&objectStoreName={ObjectStoreName}
```

![filenet](/img/arender/filenet/filenet-new-01.png)
