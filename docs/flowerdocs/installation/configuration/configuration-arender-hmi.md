---
title: "Configuration ARender HMI"
description: "Configuration de l'application ARender HMI"
---

# Configuration ARender HMI

Cette partie décrit les différentes configurations pour l'application ARender HMI à définir au sein du fichier `arender-custom-server.properties` de l'application.

## Général

| Propriété | Description |
|-----------|-------------|
| `arender.server.rendition.hosts` | Adresses des différentes renditions ARender séparées par une `,` |
| `token.key` | Token partagé entre FlowerDocs Core, FlowerDocs GUI et ARender HMI |
| `ws.url` | URL d'accès aux WebServices FlowerDocs Core |

## Journalisation

Afin de configurer la journalisation des logs de ARender HMI et du connecteur FlowerDocs ARender, il est nécessaire de créer un dossier `configurations` à côté de l'application ARender HMI contenant le fichier `logback.xml` suivant : 

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
    <logger name="com.arondor.viewer.performance" level="INFO" additivity="false">
        <appender-ref ref="PERF" >
    <!-- Commentaire nettoyé -->
        <appender-ref ref="SERVER" >
        <appender-ref ref="STDOUT" >
    <!-- Commentaire nettoyé -->
```