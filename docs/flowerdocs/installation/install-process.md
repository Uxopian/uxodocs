---
title: "Processus d'installation"
---

# Processus d'installation

:::info
Cette section décrit l'installation des applications FlowerDocs GUI, FlowerDocs Core et ARender HMI
:::

Dans la suite de cette page `$\{APP_HOME\}` correspond au dossier dans lequel va être déployée chacune des applications.

## FlowerDocs GUI

1. Après avoir effectué les téléchargements mentionnés dans les prérequis, déposer l'application `flower-docs-gui-webapp-\{version\}.jar` dans le dossier `$\{APP_HOME\}`.
2. Ajouter le fichier de configuration `gui.properties` dans `$\{APP_HOME\}`.

### Structure des dossiers
```
${APP_HOME}/
├── flower-docs-gui-webapp-{version}.jar
└── gui.properties
```

## ARender HMI

1. Après avoir effectué les téléchargements mentionnés dans les prérequis, déposer l'application `arondor-arender-hmi-spring-boot-\{version\}.jar` dans le dossier `$\{APP_HOME\}`.
2. Ajouter un fichier `application.properties` avec les propriétés suivantes :
   ```properties
   spring.task.execution.pool.core-size=16
   spring.task.execution.pool.max-size=16
   spring.task.execution.thread-name-prefix=flowerdocs-async-
   ```
3. Créer les dossiers `$\{APP_HOME\}/configurations` et `$\{APP_HOME\}/lib`
4. Ajouter le fichier de configuration `arender-custom-server.properties` dans `$\{APP_HOME\}/configurations`.
5. Ajouter le connecteur ARender FlowerDocs `flower-docs-arender-hmi-\{version\}.jar` dans `$\{APP_HOME\}/lib`.

:::warning Haute disponibilité
En haute disponibilité, il est nécessaire d'activer l'affinité de session sur chaque HMI.
:::

:::warning Hazelcast
Veuillez noter que Hazelcast dans ARenderHMI avec FlowerDocs n'est pas fonctionnel et ne doit pas être activé.
:::

### Structure des dossiers
```
${APP_HOME}/
├── arondor-arender-hmi-spring-boot-{version}.jar
├── application.properties
├── configurations/
│   └── arender-custom-server.properties
└── lib/
    └── flower-docs-arender-hmi-{version}.jar
```

## FlowerDocs Core

1. Après avoir effectué les téléchargements mentionnés dans les prérequis, déposer l'application `flower-docs-core-webapp-\{version\}.jar` dans le dossier `$\{APP_HOME\}`.
2. Ajouter le fichier de configuration `core.properties` dans `$\{APP_HOME\}`.

### Structure des dossiers
```
${APP_HOME}/
├── flower-docs-core-webapp-{version}.jar
└── core.properties
```

## Vérification de l'installation

Après avoir installé chaque composant, vérifiez que :

1. **Tous les fichiers JAR** sont présents dans les bons répertoires
2. **Les fichiers de configuration** sont correctement placés
3. **Les permissions** sur les fichiers permettent l'exécution
4. **Java 11** est installé et accessible
5. **Les ports requis** sont disponibles :
   - GUI : 8080 (par défaut)
   - Core : 8081 (par défaut) 
   - ARender HMI : 8080 (par défaut)
   - ARender Rendition : 8761 (par défaut)

## Étapes suivantes

Une fois l'installation terminée, vous pouvez procéder au démarrage des services et à la [configuration](../configuration/).