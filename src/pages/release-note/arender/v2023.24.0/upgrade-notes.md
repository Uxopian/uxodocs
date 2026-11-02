---
title: "ARender v2023.24.0 – Upgrade Notes"
draft: false
date: "2026-11-02"
weight: -202324
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

> **Release note:** See [v2023.24.0](../release-notes).

ARender 2023.24.0 is a maintenance release of the 2023.x line. It mostly brings security upgrades. With user-delegated Alfresco authentication, the ticket is now checked on every opening. The product analytics can be sent to your own Mixpanel project. Hazelcast is unchanged, so the instances of a cluster can be upgraded one by one. No data migration or cache flush is needed.

## ⚙️ Customization and Configuration

### New Properties

* **`arender.data.analytics.token`** (default: empty). Applies to the Web-UI and sets the Mixpanel project the product analytics are sent to. When empty, the analytics go to the Uxopian project, as before. `arender.data.analytics.enabled=false` still disables them. See <DocLink version="v2023.24.0" product="arender" to="learn/product-analytics">Product Analytics</DocLink>.<br/>
If you ship your own full copy of `arender-hmi-configuration.xml`, add the `token` property to the `dataReporter` bean. Otherwise, `arender.data.analytics.token` is ignored:

```xml
<bean id="dataReporter" class="com.arondor.viewer.client.analytics.ARenderDataReporter">
    <property name="enabled" value="${arender.data.analytics.enabled}"/>
    <property name="token" value="${arender.data.analytics.token}"/>
</bean>
```

### Changed and Deprecated Properties

No properties were renamed or deprecated in this release.

### Deleted Properties

No properties were deleted in this release.

## 📦 Product

### Technical Changes and Security

* **Dependencies upgraded**: Embedded libraries and container base images have been upgraded to address known vulnerabilities. For details on the specific advisories addressed, please contact [ARender support](https://arondor.atlassian.net/servicedesk/customer/portals).

### Behavior Changes

* **Alfresco ticket checked on every opening (CMIS connector).** With user-delegated authentication (`arender.server.alfresco.user` empty), the connector asks Alfresco on every opening whether the `alf_ticket` can read the document, even when the document is already in the ARender cache. An expired or invalid ticket now makes the opening fail, and the user must get a new ticket from Alfresco. Nothing changes when a service account is configured. See <DocLink version="v2023.24.0" product="arender" to="installation/standalone/web-ui/alfresco/overview">Alfresco</DocLink>.

* **Product analytics.** The Web-UI now sends one event per consultation, from the moment a document opens until the user moves on to another one. A consultation in which the user only read the document is reported once in ten. The Web-UI therefore sends fewer requests to Mixpanel. The URL `https://api-js.mixpanel.com/` must still be reachable from the users' browsers. See <DocLink version="v2023.24.0" product="arender" to="learn/product-analytics">Product Analytics</DocLink>.

## 💻 API

### JavaScript API Changes

* **`askChangePage(type, index, position, centerPosition)`**. The new optional fourth argument places the target position at the top of the view when it is `false`, like an internal hyperlink click. Without it, the position is centered, as before. See <DocLink version="v2023.24.0" product="arender" to="development/apis/web-ui/javascript/document/">Document JavaScript API</DocLink>.

### Java API Changes

* **`GenericEventHandler.onEvent`** (Web-UI, GWT). The method now receives the `GwtEvent<?>` itself instead of its class name.<br/>
**Action required:** update any custom GWT code that implements `GenericEventHandler`. JavaScript listeners registered with `registerGenericEventListener` are not affected and still receive the event class name.
* **Client API dependencies.** `arondor-arender-client-api` now declares `com.google.code.findbugs:jsr305`, which Guava no longer brings. Custom code compiled against the client API gets it transitively.
