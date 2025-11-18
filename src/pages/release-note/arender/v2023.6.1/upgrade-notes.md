---
title: ARender v2023.6.1 – Upgrade Notes
date: "2025-08-06"
---

> **Release note:** See [v2023.6.1](./release-notes).

## From version 2023.6.0

No architectural or configuration changes.

### Extra configuration and settings

##### AR-17736: RenditionWeatherPolling: add distributionStrategy "Round robin" and "Random"

This enhancement adds two new algorithms to handle the distribution of workload from UI (HMI) to Rendition. This selection occurs when the UI needs to select a Rendition server for a new document being opened. Only the available Rendition servers can be selected, i.e. servers that have successfully replied in the last second to the requests of UI server.
The configuration value at UI is:
```cfg
arender.server.rendition.weather.distribution.strategy
```
This parameter can take the following values:
- ***BEST_TARGET***: Only select the Rendition server with the highest weather score
- ***WEIGHTED_DISTRIBUTION***: Select the Rendition server based on a weighted random selection based on the weather score
- ***ROUND_ROBIN*** (new): Use a Round-Robin algorithm to iterate over the list of available rendition servers.
- ***RANDOM*** (new): Randomly select available server, regardless of the weather score.

##### AR-17639: Add JVM options to configure the routing identifier added to session id for session affinity

This feature introduces 3 new configuration options:
- ***com.uxopian.arender.session.jvm.route*** indicates the unique server name to use to forge the session cookie.
- ***com.uxopian.arender.session.jvm.route.separator*** is the character separator between the session Id and the server name.
- ***com.uxopian.arender.session.jvm.base64 enables*** disables the final encoding of the cookie in Base64. This shall be disabled when the cookie value must be interpreted by IHS.

Examples:
```cfg
-Dcom.uxopian.arender.session.jvm.route=src01
-Dcom.uxopian.arender.session.jvm.route.separator=:
-Dcom.uxopian.arender.session.jvm.base64=false
```

##### AR-17731: Accept (or Reject) file upload requests based on disk space

By default, a Rendition Broker will now reject any document opening if the space available for the temporary content storage falls below 1GB.

This setting can be changed using the option ***disk.free.space.threshold*** in the Rendition Broker configuration.
This value is a floating number and expressed in GigaBytes, default is 1.
Example:
```cfg
disk.free.space.threshold=2
```