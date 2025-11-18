---
title: ARender v2023.11.0 – Upgrade Notes
date: "2025-06-27"
---

> **Release note:** See [v2023.11.0](./release-notes).

## From version 2023.10.0

No architectural or configuration changes.

## Product

### Technical Changes

- PDFOwl : 1.24-15 to 1.24-17


## Important

### Regression in ARender Internal Load Balancing (Versions 2023.0.0 - 2023.11.0)

A regression has been identified in ARender versions from 2023.0.0 through 2023.11.0 (included) affecting internal load balancing when using multiple rendition URLs with the ```arender.server.rendition.hosts``` property.

This issue will be resolved in version 2023.12.0.

### Workaround (if upgrade is not possible)

Add the following Spring bean:

**For ARender Web-UI (WAR):**

\{\{< tag type="code" title="WEB-INF/classes/arender-custom-server-integration.xml" >\}\}

```xml
<bean id="restDocumentService" class="com.arender.rendition.client.RenditionRestClient" scope="prototype">
</bean>
```

\{\{< /tag >\}\}

**For ARender Web-UI (JAR):**

\{\{< tag type="code" title="configurations/arender-custom-server-integration.xml" >\}\}

```xml
<bean id="restDocumentService" class="com.arender.rendition.client.RenditionRestClient" scope="prototype">
</bean>
```

\{\{< /tag >\}\}