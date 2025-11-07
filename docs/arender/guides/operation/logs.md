---
title: "Logs"
---







Since version 3, ARender relied on two different logging libraries: [Log4j] (http://logging.apache.org/) 1.x (Web-UI)
and [Logback] (https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-logging) (Rendition).

Note that Log4J no longer provides support for its version 1.x since August 2015 which can be problematic for security vulnerabilities
that will never be corrected.

To harmonize the use of Web-UI and Rendition logs, we have opted to switch to Logback on the Web-UI side rather than staying and upgrading the Log4j version to 2.x.

Obviously, this will have an impact on the configuration since the Log4J configuration is different from Logback.

To migrate the log4j.properties files to its logback equivalent, you can use the log4j.properties translator ([here](http://logback.qos.ch/translator/)).

## Convert Log4J configuration file to Logback

The log4j configuration file for the Web-UI part looked like this : 



``` cfg

```properties

```properties

```properties

```properties

```properties

```properties
log4j.rootCategory=WARN, default
log4j.category.com.arondor = INFO
log4j.category.com.arondor.common.management = FATAL
log4j.category.arender-startup=INFO
```
```
```
```
```
```

log4j.category.com.arondor.viewer.common.logger = INFO, perf

log4j.category.com.arondor.common.reflection.parser.spring=OFF

# Avoid to have the performance log in the default log
log4j.additivity.com.arondor.viewer.common.logger=false


```properties

```properties

```properties

```properties

```properties

```properties
log4j.appender.default=org.apache.log4j.ConsoleAppender
log4j.appender.default.layout=org.apache.log4j.PatternLayout
log4j.appender.default.layout.ConversionPattern=%d&#123;ISO8601&#125; %p [%t] %c:%L - %m%n
```
```
```
```
```
```


```properties

```properties

```properties

```properties

```properties

```properties
log4j.appender.VIEWER=org.apache.log4j.RollingFileAppender
log4j.appender.VIEWER.MaxFileSize=20000KB
log4j.appender.VIEWER.MaxBackupIndex=6
log4j.appender.VIEWER.File=/tmp/viewer/server.log
log4j.appender.VIEWER.layout=org.apache.log4j.PatternLayout
log4j.appender.VIEWER.layout.ConversionPattern=%d&#123;ISO8601&#125; %p [%t] %c:%L - %m%n
```
```
```
```
```
```


```properties

```properties

```properties

```properties

```properties

```properties
log4j.appender.perf=org.apache.log4j.RollingFileAppender
log4j.appender.perf.MaxFileSize=20000KB
log4j.appender.perf.MaxBackupIndex=6
log4j.appender.perf.File=arender-hmi-perf.log
log4j.appender.perf.layout=org.apache.log4j.PatternLayout
log4j.appender.perf.layout.ConversionPattern=%m%n
```
```
```
```
```
```
```




Now, after going through the log4j.properties translator, we get the following result:




```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <!-- File Appender for Web-UI server log -->
    <appender name="SERVER" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>arender-server.log</file>
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
        <file>arender-perf.log</file>
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
    <logger name="com.arondor.common.management" level="FATAL" />
    
    <root level="WARN">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```



## Location of log files

The location of the output log file for the presentation server (Web-UI) is in &lt;TOMCAT_PATH&gt;/bin

For rendition log files, you can find them in the following locations:

| Micro-Service        |                               Path                                |                                               Detail |
| :------------------- | :---------------------------------------------------------------: | ---------------------------------------------------: |
| RenditionEngine      |       Rendition/modules/RenditionEngine/arender-server.log        |                       Logs dedicated to call routing |
| TaskConversionEngine | Rendition/modules/TaskConversionEngine/arender-taskconversion.log |               Logs dedicated to documents conversion |
| JNIPDFEngine         |         Rendition/modules/JNIPDFEngine/arender-jnipdf.log         |                   Logs dedicated to image generation |
| PDFBoxEngine         |         Rendition/modules/PDFBoxEngine/arender-pdfbox.log         |                  Logs dedicated to PDF manipulations |


## Location of log configuration file

### Web-UI

| Service              |                                              Path                                        |                                                  Detail |
| :------------------- | :--------------------------------------------------------------------------------------: | ------------------------------------------------------: |
| Web-UI Server        | arondor-arender-hmi-spring-boot-.jar\BOOT-INF\classes\logback.xml |               Logs dedicated to the presentation server |

### Rendition

For each of the micro services, you will find the default logback configuration file in their jar.

| Service              |                               Path                                |                                                  Detail |
| :------------------- | :---------------------------------------------------------------: | ------------------------------------------------------: |
| RenditionEngine      |                BOOT-INF/classes/logback-spring.xml                |                                      Logs configuration |
| TaskConversionEngine |                BOOT-INF/classes/logback-spring.xml                |                                      Logs configuration |
| JNIPDFEngine         |                BOOT-INF/classes/logback-spring.xml                |                                      Logs configuration |
| PDFBoxEngine         |                BOOT-INF/classes/logback-spring.xml                |                                      Logs configuration |


In order to outsource the logback configuration, simply create your logback.xml file and then create an application.properties file located
next to the jar of each of the microservices with the following property to indicate the location of the customized logback configuration file.




```cfg
logging.config=file:<YOUR_PATH>/logback-spring.xml
```




## Format logs in JSON

Most Java logging libraries today offer different layout options for formatting logs to precisely match the needs of each project.

Here we will see how to format and produce our log entries in JSON format.

Here is an example of the default Broker microservice configuration so that logs are saved to a file:



```xml
<appender name="SERVER" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>arender-server.log</file>
    <encoder>
        <pattern>%date %level [%thread] %logger{10} [%file:%line] %msg%n</pattern>
    </encoder>
    <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
        <fileNamePattern>arender-server.%i.log.zip</fileNamePattern>
        <minIndex>1</minIndex>
        <maxIndex>100</maxIndex>
    </rollingPolicy>
    <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
        <maxFileSize>50MB</maxFileSize>
    </triggeringPolicy>
</appender>
```




To configure the formatting in JSON, you must redefine the **encoder** tag to use the **LayoutWrappingEncoder**.
This will allow us to use the **layout** tag to set the JSON formatting as described below:

 

```xml
<appender name="SERVER" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>arender-server.log</file>
    <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
        <layout class="ch.qos.logback.contrib.json.classic.JsonLayout">
            <jsonFormatter class="ch.qos.logback.contrib.jackson.JacksonJsonFormatter">
                <prettyPrint>true</prettyPrint>
            </jsonFormatter>
            <timestampFormat>yyyy-MM-dd' 'HH:mm:ss.SSS</timestampFormat>
        </layout>
    </encoder>
    <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
        <fileNamePattern>arender-server.%i.log.zip</fileNamePattern>
        <minIndex>1</minIndex>
        <maxIndex>100</maxIndex>
    </rollingPolicy>
    <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
        <maxFileSize>50MB</maxFileSize>
    </triggeringPolicy>
</appender>
```




## Automatically reloading configuration file upon modification

If instructed to do so, logback-classic will scan for changes in its configuration file and automatically reconfigure itself when the configuration file changes. 
In order to instruct logback-classic to scan for changes in its configuration file and 
to automatically re-configure itself set the scan attribute of the &lt;configuration&gt; element to true, as shown next.



```xml
<configuration scan="true">
    ...
</configuration>
```


