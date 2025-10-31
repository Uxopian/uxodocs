# Installation Apache Tomcat

Déploiement d'ARender Web-UI sur Apache Tomcat pour IBM FileNet.

## Prérequis
- Apache Tomcat 9.x
- Java 11/17/21
- IBM FileNet Content Manager
- ARender Rendition Server

## Installation

### 1. Préparation Tomcat
```bash
# Variables d'environnement
export CATALINA_OPTS="-Xms2g -Xmx4g -XX:+UseG1GC"
export JAVA_OPTS="-Darender.rendition.server=http://localhost:8080"
```

### 2. Déploiement WAR
```bash
# Copier le WAR dans webapps
cp arender-webui-filenet.war $CATALINA_HOME/webapps/
```

### 3. Configuration context.xml
```xml
<!-- Context ARender -->
<Context>
    <Environment name="arender.filenet.url" 
                 value="http://localhost:9080/wsi/FNCEWS40MTOM" 
                 type="java.lang.String"/>
    <Environment name="arender.filenet.domain" 
                 value="P8Domain" 
                 type="java.lang.String"/>
</Context>
```

## Démarrage
```bash
$CATALINA_HOME/bin/startup.sh
```

Vérifier les logs dans logs/catalina.out