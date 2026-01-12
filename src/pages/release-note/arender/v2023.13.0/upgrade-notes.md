---
title: ARender v2023.13.0 – Upgrade Notes
date: "2025-08-29"
---

> **Release note:** See [v2023.13.0](./release-notes).

## From version 2023.12.0

In this release, we’ve introduced support for customizing the format of the session cookie to better support session affinity (sticky sessions) across various load balancers (LBs), including IBM HTTP Server (IHS).

## Product

### Configuration

#### ARender Web-UI

Some load balancers interpret session cookies differently. While many accept standard formats, others (e.g., IHS) require specific route separators or cookie structures to support session affinity. This enhancement provides flexibility to configure session cookie behavior without changing application code.

You can now control how the session cookie is formatted using the following JVM properties:

```cfg
# Sets the route identifier (e.g., the instance ID or node name) appended to the session ID
com.uxopian.arender.session.jvm.route
# Defines the separator character between the session ID and route
com.uxopian.arender.session.jvm.route.separator
# Enables or disables Base64 encoding of the session ID
com.uxopian.arender.session.jvm.base64
```

Documentation can be found [here](/installation/standalone/web-ui/filenet/filenet-was/#-load-balancing-and-session-management-for-arender-on-ibm-websphere)

**Note:**

These options are optional. If unset, the application will use default behavior.
Make sure to apply these settings consistently across all nodes behind the load balancer for proper affinity.

## Important

### Regression

_(Updated on 30/09/2025)_

The Docker images for Alfresco and FileNet in version 2023.13.0 are missing their respective connector JAR file inside the container:

- Alfresco: **artifactory.arondor.cloud/arender-ui-springboot:2023.13.0-alfresco**
- FileNet: **artifactory.arondor.cloud/arender-ui-springboot:2023.13.0-filenet**

#### Workaround

To restore proper functioning, manually add the requred connector JAR to the container:

- Alfresco connector, download [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-cmis/2023.13.0/arondor-arender-cmis-2023.13.0-jar-with-dependencies.jar).
- FileNet connector, download [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-filenet-ce/2023.13.0/arondor-arender-filenet-ce-2023.13.0-jar-with-dependencies.jar).

Mount the JAR into the container at the following path **/home/arender/lib**
