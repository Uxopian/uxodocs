---
title: Installation in IBM Websphere (recommended)
description: Deployment guide for IBM Filenet in IBM WebSphere application server
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 230e3314d6df2d3c28b2750fae41357c634c75f1c67005dc378afbda01503c09
---







Below the deployment of ARender HMI for FileNet in **IBM WebSphere application server**.

In our example, we are deploying the presentation server
in an environment with:

- Operating System: Windows Server 2016
- Filenet 5.5
- Websphere 9.0.5.0 Application Server
- ARender HMI for FileNet version 

## Retrieve the ARender HMI EAR archive for FileNet

Using the username and password beforehand provided,
you can retrieve the web application in EAR format [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-hmi-filenet-ear//arondor-arender-hmi-filenet-ear-.ear).

## WebSphere requirements



The version of websphere used here must have java 8 installed and activated.
If you like, please follow the instructions [here](https://www.ibm.com/docs/en/was-nd/8.5.5?topic=waso-java-se-8-in-websphere-application-server-v85).



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

Websphere must be configured in parent-last which means it has to load its libraries after ARender.

- In the application list click on ARender 2023.0.X for FileNet 5.x

- Click on "Manage Modules"
  ![filenet](/img/arender/filenet/filenet-13.png)

- Click on ARender module
  ![filenet](/img/arender/filenet/filenet-11.png)

- Select in the drop down list « Class loader order »: « Classes loaded with local class loaded first (parent last) »
  ![filenet](/img/arender/filenet/filenet-14.png)
- Click on "OK" and save the modifications
- **Start** ARender application

## Installation in CPE is complete

You can now access a Filenet document via a URL formed like this:

```html
``````````http://{server_arender}:{port_arender}/ARender/?id={id}&objectStoreName={ObjectStoreName}``````````
```

![filenet](/img/arender/filenet/filenet-new-01.png)

## 🧭 Load Balancing and Session Management for ARender on IBM WebSphere


This section applies from ARender version 2023.12.0 and above.


This section will guide you to implement a robust **load balancing** architecture for **ARender** **HMI** deployed on IBM WebSphere Application Server. This setup ensures optimal performance, session stability, and high availability by leveraging **IBM HTTP Server (IHS)** as the load balancer.

### 🎯 Goals of the Implementation

- Efficiently distribute incoming HTTP requests between multiple WebSphere nodes (ARender HMI)

- Ensure session persistence (session stickiness) across requests.

- Enable configurable session cookie suffixes to support affinity routing.

---

### 🧩 Overview of the Architecture

#### Role of IHS (IBM HTTP Server)

IHS acts as a **reverse proxy and load balancer**, dispatching incoming requests to two WebSphere nodes hosting the **ARender** **HMI** (referred to as `node1` and `node2`). Request routing behavior depends on the presence of a session cookie.

##### Case 1: HTTP request does not contain a SESSION cookie

👉 IHS forwards the request to one of the nodes randomly or based on a defined weight.

##### Case 2: HTTP request contains a SESSION cookie

👉 IHS extracts the **suffix** from the session cookie (after a separator `:`), and matches it against the `CloneID` values defined in the `plugin-cfg.xml` file.

- If a match is found, the request is routed to the corresponding node (session affinity).

- If no match is found, the request falls back to the behavior of case 1\.

---

### ⚙️ Configuration on WebSphere

#### Objective: Generate node-specific session cookies

Each WebSphere node must append a custom suffix to the SESSION cookie to uniquely identify itself: `&lt;sessionId&gt;:&lt;cloneId&gt;`

Examples:

- For `node1`: **`&#123;cookieValue&#125;:cloneId1`**

- For `node2`: **`&#123;cookieValue&#125;:cloneId2`**

#### JVM Configuration Parameters

In the WebSphere Admin Console:

**Path:**  
_Servers \> Server Types \> WebSphere application servers \> &#123;Server Name&#125; \> Server Infrastructure \> Java and Process Management \> Process definition \> Additional Properties \> Java Virtual Machine_

![filenet](/img/arender/filenet/jvm-conf.png)

Add the following JVM options under **Generic JVM arguments**:

##### For `node1`:

- `-Dcom.uxopian.arender.session.jvm.route=node1`
- `-Dcom.uxopian.arender.session.jvm.route.separator=:`
- `-Dcom.uxopian.arender.session.jvm.base64=false`

##### For `node2`:

- `-Dcom.uxopian.arender.session.jvm.route=node2`
- `-Dcom.uxopian.arender.session.jvm.route.separator=:`
- `-Dcom.uxopian.arender.session.jvm.base64=false`

#### Explanation of parameters:

| Parameter                                         | Description                                                                                                                                                             |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `com.uxopian.arender.session.jvm.route`           | Specifies the suffix (`node1`, `node2`, etc.) to be appended to the random session ID (UUID). This suffix must match the CloneId attribute in plugin-cfg.xml            |
| `com.uxopian.arender.session.jvm.route.separator` | Character used to separate the session ID and suffix (should be `‘:’` for IHS by default). If CloneSeparatorChange (plugin-cf.xml) is set to true character must be ‘+’ |
| `com.uxopian.arender.session.jvm.base64`          | Set to `false`, the session ID is not base64-encoded (required by IHS for suffix extraction)                                                                            |

---

SESSION cookie must look like this

![filenet](/img/arender/filenet/session-cookie.png)
In the above example, cloneId for node1 is node1

### 🛠️ IHS Configuration (`plugin-cfg.xml`)

The IHS configuration involves four main elements:

1. **VirtualHostGroup** – defines listening addresses.

2. **ServerCluster** – lists the backend WebSphere nodes.

3. **UriGroup** – defines which URL patterns are managed.

4. **Route** – links the above components.

#### Example configuration:

```xml
<ServerCluster CloneSeparatorChange="false" GetDWLMTable="true" IgnoreAffinityRequests="false" LoadBalance="Round-Robin" Name="ARender_ServerCluster" PostBufferSize="0" PostSizeLimit="-1" RemoveSpecialHeaders="true" RetryInterval="60" ServerIOTimeoutRetry="-1">
   <Server CloneId="node1" Name="node1" ServerIOTimeout="900">
      <Transport Hostname="localhost" Port="9080" Protocol="http"/>
   </Server>
   <Server CloneId="node2" Name="node2" ServerIOTimeout="900">
      <Transport Hostname="localhost" Port="9081" Protocol="http"/>
   </Server>
</ServerCluster>
<UriGroup Name="ARender_UriGroup">
   <Uri AffinityCookie="SESSION" AffinityURLIdentifier="jsessionid" Name="/ARender/*"/>
</UriGroup>
<Route ServerCluster="ARender_ServerCluster" UriGroup="ARender_UriGroup" VirtualHostGroup="ARender_VirtualHostGroup"/>
```

#### Explanation:

- All URLs matching `/ARender/*` are routed to either `node1` or `node2`.

- The `SESSION` cookie is used for session stickiness (affinity).

- Internal communications occur via ports `9080` and `9081` on `localhost`.

---

### ✅ Expected Outcome

With this configuration:

- Each user session is consistently routed to the appropriate HMI node, based on the cookie suffix.

- Sessions remain stable and uninterrupted in a clustered environment.

- The system is extensible and supports future scalability.
