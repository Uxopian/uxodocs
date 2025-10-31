---
title: Logs
---

Depuis la version 3, ARender s'appuyait sur deux librairies différentes logging : [Log4j](http://logging.apache.org/) 1.x (Web-UI) 
et [Logback](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-logging) (Rendition).

Notons que Log4J ne fournit plus de support pour sa version 1.x depuis Août 2015 ce qui peut être problématique pour les failles de sécurités 
qui ne seront jamais corrigé.

Pour harmoniser l'utilisation des logs Web-UI et Rendition, nous avons opté de passer sur du Logback côté Web-UI plutôt que de rester et monter la version Log4j en 2.x.

Bien évidemment, cela va avoir impact sur la configuration puisque la configuration Log4J est différente de Logback.

Pour migrer les fichiers log4j.properties vers son équivalent logback, vous pouvez utiliser le traducteur log4j.properties ([ici](http://logback.qos.ch/translator/)).

## Convertir le fichier de configuration Log4J vers Logback

Le fichier de configuration log4j pour la partie Web-UI ressemblait à cela : 


```cfg
log4j.rootCategory=WARN, default
log4j.category.com.arondor = INFO
log4j.category.com.arondor.common.management = FATAL
log4j.category.arender-startup=INFO

log4j.category.com.arondor.viewer.common.logger = INFO, perf

log4j.category.com.arondor.common.reflection.parser.spring=OFF

# Avoid to have the performance log in the default log
log4j.additivity.com.arondor.viewer.common.logger=false

log4j.appender.default=org.apache.log4j.ConsoleAppender
log4j.appender.default.layout=org.apache.log4j.PatternLayout
log4j.appender.default.layout.ConversionPattern=%d{ISO8601} %p [%t] %c:%L - %m%n

log4j.appender.VIEWER=org.apache.log4j.RollingFileAppender
log4j.appender.VIEWER.MaxFileSize=20000KB
log4j.appender.VIEWER.MaxBackupIndex=6
log4j.appender.VIEWER.File=/tmp/viewer/server.log
log4j.appender.VIEWER.layout=org.apache.log4j.PatternLayout
log4j.appender.VIEWER.layout.ConversionPattern=%d{ISO8601} %p [%t] %c:%L - %m%n

log4j.appender.perf=org.apache.log4j.RollingFileAppender
log4j.appender.perf.MaxFileSize=20000KB
log4j.appender.perf.MaxBackupIndex=6
log4j.appender.perf.File=arender-hmi-perf.log
log4j.appender.perf.layout=org.apache.log4j.PatternLayout
log4j.appender.perf.layout.ConversionPattern=%m%n
```


A présent, une fois passé par le traducteur log4j.properties, nous obtenons le résultat suivant :


```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Commentaire nettoyé -->
    <appender name="SERVER" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->%d{ISO8601} %p [%t] %c:%L - %m%n<!-- Commentaire nettoyé -->
        <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
            <!-- Commentaire nettoyé -->
            <!-- Commentaire nettoyé -->
            <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
            <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->

    <!-- Commentaire nettoyé -->
    <appender name="PERF" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->%msg%n<!-- Commentaire nettoyé -->
        <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
            <!-- Commentaire nettoyé -->
            <!-- Commentaire nettoyé -->
            <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
            <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->

    <!-- Commentaire nettoyé -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- Commentaire nettoyé -->%d{ISO8601} %p [%t] %c:%L - %m%n<!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
    <logger>
    <logger name="com.arondor.common.reflection.parser.spring" level="OFF">
    <logger name="com.arondor.viewer.common.logger" level="INFO" additivity="false">
        <appender-ref ref="PERF" >
    <!-- Commentaire nettoyé -->
    	<appender-ref ref="SERVER" >
    <!-- Commentaire nettoyé -->
    
    <root level="WARN">
        <appender-ref ref="STDOUT" >
    <!-- Commentaire nettoyé -->
```


## Emplacement des fichiers de logs

```xml
L'emplacement du fichier de log en sortie, pour le serveur de présentation (Web-UI) se trouve dans `<!-- Commentaire nettoyé -->
```

```cfg
logging.config=file:`<!-- Commentaire nettoyé -->

```xml
```xml
<appender name="SERVER" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->%date %level [%thread] %logger\{10\} [%file:%line] %msg%n<!-- Commentaire nettoyé -->
    <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
        <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
```
```



Pour configurer le formatage en JSON, il faut redéfinir la balise **encoder** pour utiliser le **LayoutWrappingEncoder**.
Cela nous permettra d'utiliser la balise **layout** pour définir le formatage JSON comme décrit ci-dessous :

 <!-- Commentaire nettoyé -->

```xml
```xml
<appender name="SERVER" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!-- Commentaire nettoyé -->
    <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
        <layout class="ch.qos.logback.contrib.json.classic.JsonLayout">
            <jsonFormatter class="ch.qos.logback.contrib.jackson.JacksonJsonFormatter">
                <!-- Commentaire nettoyé -->
            <!-- Commentaire nettoyé -->yyyy-MM-dd' 'HHss.SSS<!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
```
```



### Rechargement automatique du fichier de configuration lors de la modification

Si configuré, logback-classic recherchera les modifications dans son fichier de configuration et se reconfigurera automatiquement 
lorsque le fichier de configuration changera. 
Afin de demander à logback-classic de rechercher les modifications dans son fichier de configuration et de se reconfigurer automatiquement, 
définissez l'attribut scan de l'élément <!-- Commentaire nettoyé -->

```xml
```xml
<configuration scan="true">
```
    ...
&lt;configuration&gt;
```

