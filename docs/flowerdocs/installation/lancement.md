---
title: "Lancement"
description: "Démarrage des applications FlowerDocs"
---

# Lancement

## Lancement manuel

Pour lancer manuellement les applications FlowerDocs GUI, FlowerDocs Core et ARender HMI, il suffit de lancer les commandes suivantes : 

### FlowerDocs GUI
```bash
./flower-docs-gui-webapp-{version}.jar 
```

### FlowerDocs Core
```bash
./flower-docs-core-webapp-{version}.jar
```

### ARender HMI
```bash
./arondor-arender-hmi-spring-boot-{version}.jar
```

## Installation en service

### Linux

Les applications FlowerDocs peuvent être installées simplement en tant que service Linux `init.d` ou `systemd`.

Dans cette section, il est supposé que les JAR `flower-docs-gui-webapp-\{version\}.jar`, `flower-docs-core-webapp-\{version\}.jar` et `arondor-arender-hmi-spring-boot-\{version\}.jar` sont placés dans le dossier `/opt/flowerdocs`. Ce dossier est également utilisé comme répertoire de configuration.

#### Service init.d

Afin d'installer les applications FlowerDocs en tant que service `init.d`, il suffit de créer un lien symbolique dans le répertoire `/etc/init.d` : 

**FlowerDocs GUI**
```bash
chmod +x /opt/flowerdocs/flower-docs-gui-webapp-{version}.jar
ln -s /opt/flowerdocs/flower-docs-gui-webapp-{version}.jar /etc/init.d/gui
```

**FlowerDocs Core**
```bash
chmod +x /opt/flowerdocs/flower-docs-core-webapp-{version}.jar
ln -s /opt/flowerdocs/flower-docs-core-webapp-{version}.jar /etc/init.d/core
```

**ARender HMI**
```bash
chmod +x /opt/flowerdocs/arondor-arender-hmi-spring-boot-{version}.jar
ln -s /opt/flowerdocs/arondor-arender-hmi-spring-boot-{version}.jar /etc/init.d/arender-hmi
```

Avec ce type de service, l'utilisateur auquel appartient le JAR est utilisé pour exécuter l'application. 
Un fichier de log par application est alimenté dans le répertoire `/var/log`.

Afin que le service démarre automatiquement au démarrage du système : 

**FlowerDocs GUI**
```bash
update-rc.d gui defaults
```

**FlowerDocs Core**
```bash
update-rc.d core defaults
```

**ARender HMI**
```bash
update-rc.d arender-hmi defaults
```

Si le service n'est pas trouvé, il peut être nécessaire d'exécuter la commande :

```bash
systemctl daemon-reload
```

#### Service systemd

Pour installer les applications FlowerDocs en tant que service `systemd`, les scripts `gui.service`, `core.service` et `arender-hmi.service` doivent être créés dans le répertoire `/etc/systemd/system` :

**gui.service**
```ini
[Unit]
Description=FlowerDocs GUI
After=syslog.target

[Service]
User=flowerdocs
ExecStart=/opt/flowerdocs/flower-docs-gui-webapp-{version}.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

**core.service**
```ini
[Unit]
Description=FlowerDocs Core
After=syslog.target

[Service]
User=flowerdocs
ExecStart=/opt/flowerdocs/flower-docs-core-webapp-{version}.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

**arender-hmi.service**
```ini
[Unit]
Description=ARender HMI
After=syslog.target

[Service]
User=flowerdocs
ExecStart=/opt/flowerdocs/arondor-arender-hmi-spring-boot-{version}.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

Afin que le service soit démarré automatiquement par `systemd`, exécuter les commandes suivantes :

```bash
systemctl enable gui.service
systemctl enable core.service
systemctl enable arender-hmi.service
```

#### Configuration de la JVM

Pour configurer la JVM de l'application lancée par le service Linux, il est nécessaire d'ajouter un fichier de configuration dans le même répertoire que le JAR. 
Ce fichier de configuration doit avoir le même nom que le JAR avec l'extension `conf`.

#### Commandes

Pour lancer les services, il suffit ensuite de lancer les commandes : 

```bash
service gui start
service core start
service arender-hmi start
```

Les autres commandes standards sont également supportées : `status`, `stop` ou `restart`.