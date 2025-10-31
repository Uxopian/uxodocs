---
title: Serveur de présentation (Web UI)
---

## Introduction

Le serveur de présentation est nommé **"web-ui"** dans le Chart. Pour déployer le serveur de présentation d'ARender, assignez le paramètre `web-ui.enabled` à true.

## Paramètres

Le tableau liste les paramètres configurables du subchart Web UI d'ARender et leurs valeurs par défaut.

| Paramètres                     | Description                                                                         |                      Défaut                       |
| :----------------------------- | :---------------------------------------------------------------------------------- | :-----------------------------------------------: |
| `global.imagePullSecrets`      | Les noms des secrets pour accéder au registre Docker                                | `[]` (n'ajoute pas d'information d'accès au pods) |
| `web-ui.enabled`               | Active le déploiement du serveur de présentation                                    |                      `true`                       |
| `web-ui.replicaCount`          | Nombre de réplique de pod à déployer                                                |                        `1`                        |
| `web-ui.autoscale.enabled`     | Active l'automatisation de la gestion du nombre de pod                              |                      `false`                      |
| `web-ui.autoscale.maxReplicas` | Nombre maximum de réplique de pod dans le cluster                                   |                        `1`                        |
| `web-ui.autoscale.cpuLimit`    | Pourcentage de CPU demandé avant augmentation du nombre de pod                      |                       `80`                        |
| `web-ui.image.pullPolicy`      | Politique de récupération de l'image ARender UI                                     |                     `Always`                      |
| `web-ui.serviceAccount.create` | Spécifie si un compte de service doit être créé                                     |                      `true`                       |
| `web-ui.serviceAccount.name`   | Nom du compte de service crée. Si n'est pas renseigné prend la valeur du fullname   |                       `''`                        |
| `web-ui.podSecurityContext`    | Contexte de sécurité du pod ARender UI                                              |                       `\{\}`                        |
| `web-ui.securityContext`       | Contexte de sécurité du conteneur                                                   |                       `\{\}`                        |
| `web-ui.service.type`          | Type du service ARender UI                                                          |                    `ClusterIP`                    |
| `web-ui.service.port`          | Port du service ARender UI                                                          |                       `80`                        |
| `web-ui.ingress.enabled`       | Active l'Ingress                                                                    |                      `false`                      |
| `web-ui.ingress.annotations`   | Annotations de l'Ingress annotations                                                |                       `\{\}`                        |
| `web-ui.ingress.hosts`         | Nom d'hôtes Ingress                                                                 |                       `[]`                        |
| `web-ui.ingress.tls`           | Configuration tls                                                                   |                       `\{\}`                        |
| `web-ui.rendition.hosts`       | Liste d'URL des serveurs de rendition (exemple: `- http://rendition-hostname:8761`) |                       `[]`                        |
| `web-ui.resources`             | Limites et requêtes de ressource pour ARender UI                                    |                       `\{\}`                        |
| `web-ui.nodeSelector`          | Sélecteur de node                                                                   |                       `\{\}`                        |
| `web-ui.environment`           | Variables d'environments à passer au conteneur                                      |                       `\{\}`                        |
