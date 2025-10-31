---
title: Serveur de rendition
---

## Introduction

## Paramètres

Le tableau liste les paramètres configurables du subchart de la rendition d'ARender et leurs valeurs par défaut.

### General values

| Parameters                | Description                                          | Default |
| :------------------------ | :--------------------------------------------------- | :------ |
| `global.imagePullSecrets` | Les noms des secrets pour accéder au registre Docker | `[]`    |
| `rendition.enabled`       | Active le déploiement de la rendition                | `true`  |

### Document service broker

Le tableau liste les paramètres configurables du microservice broker de la rendition d'ARender et leurs valeurs par défaut.

| Parameters                               | Description                                                                  |                             Default                              |
| :--------------------------------------- | :--------------------------------------------------------------------------- | :--------------------------------------------------------------: |
| `rendition.broker.replicaCount`          | Nombre de réplique de pod du broker à déployer                               |                               `1`                                |
| `rendition.broker.image.tag`             | Tag de l'image du broker. Si vide utilise AppVersion du chart                |                               `''`                               |
| `rendition.broker.image.pullPolicy`      | Politique de récupération de l'image du broker                               |                             `Always`                             |
| `rendition.broker.rbac.create`           | Spécifie si les ressources d'attribution de rôle doivent être créées         |                              `true`                              |
| `rendition.broker.serviceAccount.create` | Spécifie si un compte de service doit être créé                              |                              `true`                              |
| `rendition.broker.serviceAccount.name`   | Nom du compte de service. Si n'est pas renseigné prend la valeur du fullname |                               `''`                               |
| `rendition.broker.podSecurityContext`    | Contexte de sécurité des pods du broker                                      |                               `\{\}`                               |
| `rendition.broker.securityContext`       | Contexte de sécurité des conteneurs du broker                                |                               `\{\}`                               |
| `rendition.broker.service.type`          | Type de service du broker                                                    |                           `ClusterIP`                            |
| `rendition.broker.ingress.enabled`       | Active l'ingress pour la rendition                                           |                             `false`                              |
| `rendition.broker.ingress.annotations`   | Annotation de l'Ingress de la rendition                                      |                               `\{\}`                               |
| `rendition.broker.ingress.hosts`         | Nom d'hôte Ingress de la rendition                                           |                               `[]`                               |
| `rendition.broker.ingress.tls`           | Configuration tls de la rendition                                            |                               `[]`                               |
| `rendition.broker.resources`             | Limites et requêtes de ressources du broker                                  |                               `\{\}`                               |
| `rendition.broker.nodeSelector`          | Sélecteur de node du broker                                                  |                               `\{\}`                               |
| `rendition.broker.environment`           | Variables d'environments à passer au conteneur du broker                     |                               `\{\}`                               |


Si `rendition.broker.rbac.create` n'est pas à `true`, il faut s'assurer que le compte de service du broker ait les droits nécessaires au calcul du 'weather'.

Les droits par donnés par défaut sont:

```yaml
rules:
- apiGroups: [ "*" ]
  resources:
  - 'nodes'
  verbs:
  - 'get'
  - 'list'
```


### Document converter

Le tableau liste les paramètres configurables du microservice de conversion de la rendition d'ARender et leurs valeurs par défaut.

| Parameters                                  | Description                                                                  |                           Default                           |
| :------------------------------------------ | :--------------------------------------------------------------------------- | :---------------------------------------------------------: |
| `rendition.converter.replicaCount`          | Nombre de réplique de pod du converter à déployer                            |                             `1`                             |
| `rendition.converter.autoscale.enabled`     | Active l'automatisation de la gestion du nombre de pod                       |                           `false`                           |
| `rendition.converter.autoscale.maxReplicas` | Nombre maximum de réplique de pod dans le cluster                            |                             `3`                             |
| `rendition.converter.autoscale.cpuLimit`    | Pourcentage de CPU demandé avant augmentation du nombre de pod               |                            `80`                             |
| `rendition.converter.image.tag`             | Tag de l'image du converter. Si vide utilise AppVersion du chart             |                            `''`                             |
| `rendition.converter.imagepullPolicy`       | Politique de récupération de l'image du converter                            |                          `Always`                           |
| `rendition.converter.serviceAccount.create` | Spécifie si un compte de service doit être créé                              |                           `true`                            |
| `rendition.converter.serviceAccount.name`   | Nom du compte de service. Si n'est pas renseigné prend la valeur du fullname |                            `''`                             |
| `rendition.converter.podSecurityContext`    | Contexte de sécurité des pods du converter                                   |                            `\{\}`                             |
| `rendition.converter.securityContext`       | Contexte de sécurité des conteneurs du converter                             |                            `\{\}`                             |
| `rendition.converter.service.type`          | Type de service du converter                                                 |                         `ClusterIP`                         |
| `rendition.converter.resources`             | Limites et requêtes de ressources du converter                               |                            `\{\}`                             |
| `rendition.converter.nodeSelector`          | Sélecteur de node du converter                                               |                            `\{\}`                             |
| `rendition.converter.environment`           | Variables d'environments à passer au conteneur du converter                  |                            `\{\}`                             |

### Hazelcast

Le tableau liste les paramètres configurables du système de gestion de stockage de fichier Hazelcast de la rendition d'ARender et leurs valeurs par défaut dans *values.yaml*.

| paramètres                   | Description                |                            Defaut                             |
| :--------------------------- | :------------------------- | :-----------------------------------------------------------: |
| `hazelcast.service.port`     | Port utilisé par Hazelcast |                              `5701`                           |
| `hazelcast.service.portname` | Nom du port d'Hazelcast    |                            `hazelcast`                        |

### Document text handler

Le tableau liste les paramètres configurables du microservice de manipulation de texte de la rendition d'ARender et leurs valeurs par défaut.

| Parameters                                | Description                                                                  |                            Default                             |
| :---------------------------------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------: |
| `rendition.handler.replicaCount`          | Nombre de réplique de pod du handler à déployer                              |                              `1`                               |
| `rendition.handler.autoscale.enabled`     | Active l'automatisation de la gestion du nombre de pod                       |                            `false`                             |
| `rendition.handler.autoscale.maxReplicas` | Nombre maximum de réplique de pod dans le cluster                            |                              `3`                               |
| `rendition.handler.autoscale.cpuLimit`    | Pourcentage de CPU demandé avant augmentation du nombre de pod               |                              `80`                              |
| `rendition.handler.image.tag`             | Tag de l'image du handler. Si vide utilise AppVersion du chart               |                              `''`                              |
| `rendition.handler.imagepullPolicy`       | Politique de récupération de l'image du handler                              |                            `Always`                            |
| `rendition.handler.serviceAccount.create` | Spécifie si un compte de service doit être créé                              |                             `true`                             |
| `rendition.handler.serviceAccount.name`   | Nom du compte de service. Si n'est pas renseigné prend la valeur du fullname |                              `''`                              |
| `rendition.handler.podSecurityContext`    | Contexte de sécurité des pods du handler                                     |                              `\{\}`                              |
| `rendition.handler.securityContext`       | Contexte de sécurité des conteneurs du handler                               |                              `\{\}`                              |
| `rendition.handler.service.type`          | Type de service du handler                                                   |                          `ClusterIP`                           |
| `rendition.handler.resources`             | Limites et requêtes de ressources du handler                                 |                              `\{\}`                              |
| `rendition.handler.nodeSelector`          | Sélecteur de node du handler                                                 |                              `\{\}`                              |
| `rendition.handler.environment`           | Variables d'environments à passer au conteneur du handler                    |                              `\{\}`                              |

### Document renderer

Le tableau liste les paramètres configurables du microservice de rendu de document de la rendition d'ARender et leurs valeurs par défaut.

| Parameters                                 | Description                                                                  |                          Default                           |
| :----------------------------------------- | :--------------------------------------------------------------------------- | :--------------------------------------------------------: |
| `rendition.renderer.replicaCount`          | Nombre de réplique de pod du renderer à déployer                             |                            `1`                             |
| `rendition.renderer.autoscale.enabled`     | Active l'automatisation de la gestion du nombre de pod                       |                          `false`                           |
| `rendition.renderer.autoscale.maxReplicas` | Nombre maximum de réplique de pod dans le cluster                            |                            `3`                             |
| `rendition.renderer.autoscale.cpuLimit`    | Pourcentage de CPU demandé avant augmentation du nombre de pod               |                            `80`                            |
| `rendition.renderer.image.tag`             | Tag de l'image du renderer. Si vide utilise AppVersion du chart              |                            `''`                            |
| `rendition.renderer.imagepullPolicy`       | Politique de récupération de l'image du renderer                             |                          `Always`                          |
| `rendition.renderer.serviceAccount.create` | Spécifie si un compte de service doit être créé                              |                           `true`                           |
| `rendition.renderer.serviceAccount.name`   | Nom du compte de service. Si n'est pas renseigné prend la valeur du fullname |                            `''`                            |
| `rendition.renderer.podSecurityContext`    | Contexte de sécurité des pods du renderer                                    |                            `\{\}`                            |
| `rendition.renderer.securityContext`       | Contexte de sécurité des conteneurs du renderer                              |                            `\{\}`                            |
| `rendition.renderer.service.type`          | Type de service du renderer                                                  |                        `ClusterIP`                         |
| `rendition.renderer.resources`             | Limites et requêtes de resources du renderer                                 |                            `\{\}`                            |
| `rendition.renderer.nodeSelector`          | Sélécteur de node du renderer                                                |                            `\{\}`                            |
| `rendition.renderer.environment`           | Variables d'environments à passer au conteneur du renderer                   |                            `\{\}`                            |
