---
title: ARender HMI Configuration
sidebar_position: 2
date: "2000-03-31T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 1ef1dd3589a62845758445dce68e8e39ae63414ef0485f6fb31f417d287a0cc4
---

This section describes the various configurations for the **ARender HMI** application, needed in the application's `arender-custom-server.properties` file.

# General

| Propriété                      | Description                                                      |
| ------------------------------ | ---------------------------------------------------------------- |
| arender.server.rendition.hosts | Addresses of the various ARender renditions separated by a `,`.  |
| token.key                      | Token shared between **FlowerDocs Core**, **FlowerDocs GUI** and **ARender HMI** |
| ws.url                         | **FlowerDocs Core** WebServices access URL                       |

# Logging

In order to configure logging for ARender HMI and the FlowerDocs ARender connector, it is necessary to create a `configurations` folder next to the ARender HMI application containing the following `logback.xml` file:

:::note[logback.xml ]

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <!-- File Appender for Web-UI server log -->
    <appender name="SERVER" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>arender-hmi-server.log</file>
        <encoder>
            <pattern>%d{ISO8601} %p [%t] %c:%L - %m%n</pattern>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
            <fileNamePattern>arender-server.%i.log.zip</fileNamePattern>
            <minIndex>1</minIndex>
            <maxIndex>20</maxIndex>
        </rollingPolicy>
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <maxFileSize>50MB</maxFileSize>
        </triggeringPolicy>
    </appender>

    <!-- File Appender for Web-UI perf log -->
    <appender name="PERF" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>arender-hmi-perf.log</file>
        <encoder>
            <pattern>%msg%n</pattern>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
            <fileNamePattern>arender-perf.%i.log.zip</fileNamePattern>
            <minIndex>1</minIndex>
            <maxIndex>6</maxIndex>
        </rollingPolicy>
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <maxFileSize>50MB</maxFileSize>
        </triggeringPolicy>
    </appender>

    <!-- Console Appender -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{ISO8601} %p [%t] %c:%L - %m%n</pattern>
        </encoder>
    </appender>

    <!-- Logger -->
    <logger name="arender-startup" level="INFO" />
    <logger name="com.arondor.common.reflection.parser.spring" level="OFF"/>
    <logger name="com.arondor.viewer.common.logger" level="INFO" additivity="false">
        <appender-ref ref="PERF" />
    </logger>
    <logger name="com.arondor" level="INFO">
    	<appender-ref ref="SERVER" />
    </logger>
    <logger name="com.flower" level="INFO">
    	<appender-ref ref="SERVER" />
    </logger>
    <logger name="com.arondor.common.management" level="FATAL" />

    <root level="WARN">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```

:::

It is not recommended to modify ARender properties by setting parameters in the `arender-custom-server.properties` file. Properties that are not defined in the documentation are not qualified by FlowerDocs: the correct operation of the application is therefore not guaranteed with these modifications.
