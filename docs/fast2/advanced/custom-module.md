---
title: Custom module
last_update:
  date: '2026-01-23T15:35:56.881Z'
  author: CI/CD Bot
content_hash: 1d24d71c633bae3a63ca22ca286c9e0c27d8b3ec7c8d557c1ee090cd7ee86464
---

:::info SDK packaging change in v2026.0.0

The `fast2-sdk` artifact is now shipped as a **fat JAR** (~14 MB) bundling all required dependencies. Customers building custom Fast2 modules no longer need internal Artifactory credentials or a `settings.xml` configuration.

Install the fat JAR locally with a single command:

```bash
mvn install:install-file \
  -Dfile=lib/fast2-sdk-<version>.jar \
  -DgroupId=com.fast2 \
  -DartifactId=fast2-sdk \
  -Dversion=<version> \
  -Dpackaging=jar \
  -DgeneratePom=true
```

The `lib/` folder of the `fast2-custom-module-boilerplate` project already contains the fat JAR.

:::

:::warning

    This page has been moved to the Knowledge-Base at 🔗[Build a custom module in Fast2](https://arondor.atlassian.net/servicedesk/customer/portal/82/article/4002873401)

:::
