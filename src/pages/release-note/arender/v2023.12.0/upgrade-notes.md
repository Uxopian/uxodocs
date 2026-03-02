---
title: ARender v2023.12.0 – Upgrade Notes
date: "2025-07-28"
---

> **Release note:** See [v2023.12.0](../release-notes).

## From version 2023.11.0

This release introduces new property configurations and changes to session management. Integrators will now require additional access to our new Cloudsmith repository for Maven libraries and binaries.

## Product

### Configuration

#### Maven

Starting with this version, ARender will publish libraries to Uxopian Cloudsmith repositories. Developers must set up the Cloudsmith repositories; otherwise, the Maven project will not build correctly.

Below is the `settings.xml` configuration file, which includes both the Artifactory and Cloudsmith repositories.

\{\{< tag type="code" title="~/.m2/settings.xml" >\}\}

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd"
  xmlns="http://maven.apache.org/SETTINGS/1.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <servers>
    <server>
      <id>arondor</id>
      <username>ARTIFACTORY_ID</username>
      <password>ARTIFACTORY_TOKEN</password>
    </server>
    <server>
      <id>uxopian-release</id>
      <username>CLOUDSMITH_ID</username>
      <password>CLOUDSMITH_TOKEN</password>
    </server>
    <server>
      <id>uxopian-herodevs</id>
      <username>CLOUDSMITH_ID</username>
      <password>CLOUDSMITH_TOKEN</password>
    </server>
  </servers>

  <profiles>
    <!-- Arondor Artifactory -->
    <profile>
      <id>artifactory</id>
      <repositories>
        <repository>
          <snapshots />
          <id>arondor</id>
          <url>https://artifactory.arondor.cloud/artifactory/arondor-all/</url>
        </repository>
      </repositories>
      <pluginRepositories>
        <pluginRepository>
          <snapshots />
          <id>arondor</id>
          <url>https://artifactory.arondor.cloud/artifactory/arondor-all/</url>
        </pluginRepository>
      </pluginRepositories>
    </profile>
    <!-- Uxopian Cloudsmith Repository -->
    <profile>
      <id>cloudsmith</id>
      <repositories>
        <repository>
          <id>uxopian-release</id>
          <url>https://dl.cloudsmith.io/basic/uxopian/release/maven/</url>
        </repository>
        <repository>
          <id>uxopian-herodevs</id>
          <url>https://dl.cloudsmith.io/basic/uxopian/herodevs-proxy/maven/</url>
        </repository>
      </repositories>
    </profile>
  </profiles>

  <activeProfiles>
    <activeProfile>artifactory</activeProfile>
    <activeProfile>cloudsmith</activeProfile>
  </activeProfiles>
</settings>
```

\{\{< /tag >\}\}

Replace **ARTIFACTORY_ID** with the customer/partner user ID.<br/>
Replace **ARTIFACTORY_TOKEN** with the customer/partner Artifactory Key.<br/>
Replace **CLOUDSMITH_ID** with the customer/partner user ID.<br/>
Replace **CLOUDSMITH_TOKEN** with the customer/partner Cloudsmith API Key.

For Artifactory or Cloudsmith access, please contact the ARender Support Team at arender-support@uxopian.com.

#### ARender Web-UI

The following configuration properties have been added to the server side of the ARender Web-UI.

\{\{< tag type="code" title="WEB-INF/classes/arender-server-default.properties" >\}\}

```properties
# Configure a limit on the number of bytes that can be buffered (in bytes)
arender.server.rendition.rest.max.in.memory.size=8000000
# The maximum number of connections before starting pending acquisition on existing ones
arender.server.rendition.rest.max.connections=200
# The maximum time after which a pending acquire must complete (in milliseconds)
arender.server.rendition.rest.pending.acquire.timeout=120000
# The maximum number of registered requests for acquire to keep in a pending queue
# Set the value "-1" for no limit
arender.server.rendition.rest.pending.acquire.max.count=-1
# The Duration after which the channel will be closed when idle (in milliseconds)
# Set the value "-1" for no limit
arender.server.rendition.rest.max.idle.time=-1
# The Duration after which the channel will be closed (in milliseconds)
# Set the value "-1" for no limit
arender.server.rendition.rest.max.life.time=-1
# The maximum time to read a response through the network (in milliseconds)
arender.server.rendition.rest.read.timeout=120000
# The maximum time to write a request through the network (in milliseconds
arender.server.rendition.rest.write.timeout=120000
```

\{\{< /tag >\}\}

### Session Management

#### ARender Web-UI

Before v2023.4.0, session management was handled by the Servlet Container. The session cookie was named **JSESSIONID** for all packaging types (WAR, EAR, or JAR).

From v2023.4.0 to v2023.11.0, session management was handled by Spring Session Hazelcast. The session cookie was named **SESSION** for all packaging types.

From v2023.12.0 onwards:

For WAR and EAR packaging, session management is now handled by the Servlet Container, and the cookie name is **JSESSIONID**.

For JAR packaging, Spring Session Hazelcast is used by default, and the cookie name is **SESSION**. This can be disabled to revert to Servlet Container session management by setting the following property: `arender.server.session.hazelcast.enabled=false`.

---

| Version   | WAR/EAR    | JAR                                                                                                                               |
| --------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 4.8.x     | JSESSIONID | N/A                                                                                                                               |
| 2023.0.0  | JSESSIONID | JSESSIONID                                                                                                                        |
| 2023.1.0  | JSESSIONID | JSESSIONID                                                                                                                        |
| 2023.2.0  | JSESSIONID | JSESSIONID                                                                                                                        |
| 2023.3.0  | JSESSIONID | JSESSIONID                                                                                                                        |
| 2023.4.0  | SESSION    | SESSION                                                                                                                           |
| 2023.5.0  | SESSION    | SESSION                                                                                                                           |
| 2023.6.0  | SESSION    | SESSION                                                                                                                           |
| 2023.7.0  | SESSION    | SESSION                                                                                                                           |
| 2023.8.0  | SESSION    | SESSION                                                                                                                           |
| 2023.9.0  | SESSION    | SESSION                                                                                                                           |
| 2023.10.0 | SESSION    | SESSION                                                                                                                           |
| 2023.11.0 | SESSION    | SESSION                                                                                                                           |
| 2023.12.0 | JSESSIONID | SESSION (arender.server.session.hazelcast.enabled=true, by default) / JSESSIONID (arender.server.session.hazelcast.enabled=false) |

## Important

### Regression

_(Updated on 30/09/2025)_

The Docker images for Alfresco and FileNet in version 2023.12.0 are missing their respective connector JAR file inside the container:

- Alfresco: **artifactory.arondor.cloud/arender-ui-springboot:2023.12.0-alfresco**
- FileNet: **artifactory.arondor.cloud/arender-ui-springboot:2023.12.0-filenet**

#### Workaround

To restore proper functioning, manually add the requred connector JAR to the container:

- Alfresco connector, download [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-cmis/2023.12.0/arondor-arender-cmis-2023.12.0-jar-with-dependencies.jar).
- FileNet connector, download [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-filenet-ce/2023.12.0/arondor-arender-filenet-ce-2023.12.0-jar-with-dependencies.jar).

Mount the JAR into the container at the following path **/home/arender/lib**
