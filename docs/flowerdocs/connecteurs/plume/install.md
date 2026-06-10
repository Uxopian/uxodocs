---
title: Installation
sidebar_position: 2
date: "2001-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 838e7d1674ae22a53988c4284c47644bf4d2253f5efa30cdf72564f9a8baf774
---
import PlumeDownload from '@site/src/components/PlumeDownload';

# Install as jar 

First Download the <PlumeDownload/> jar 

Application configuration is based on Spring Boot mechanisms.
Properties for configuring Plume and its connectors can be provided in a number of ways:

- By a JVM property :

    ```javascript
    java -D<name>=<value> -jar plume-<version>.jar
    ```

- By a property file. The name of this file (without extension) must be supplied as a JVM property `spring.config.name`. At runtime, Spring will search for this file in the following directories:
    - The `/config` subdirectory of the current (/ runtime) directory
    - The current directory
