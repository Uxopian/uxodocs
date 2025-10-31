---
title: Kubernetes
---

**Nous supposons que vous connaissez Kubernetes.**

Sinon, pour plus d'informations, rendez-vous sur .

## TL;DR

```bash
```

## Introduction

ARender est déployable facilement sur Kubernetes grâce à notre Helm Chart.

> Vous pouvez lire plus d'information sur Helm [ici](https://helm.sh/).

Le chart est composé de deux subcharts: la rendition et le web-ui. Vous pouvez choisir de déployer tout l'environnement ou seulement l'un des composants en du Chart en assignant les propriétés suivantes :

| Composant | Propriété         | Valeur            |
| --------- | ----------------- | ----------------- |
| web-ui    | web-ui.enabled    | `true` ou `false` |
| rendition | rendition.enabled | `true` ou `false` |

## Prérequis

- Accès à l'Artifactory Arondor
- Kubernetes 1.14+
- Helm 3.0+
- une infrastructure supportant les volumes persistant
- le serveur de metrics installé sur Kubernetes (depuis ARender 4.3.0)

## Installer le Chart

Pour installer le chart avec le nom de release `my-release`, exécutez les commandes suivante en utilisant vos informations de connexion à l'Artifactory :

```bash
```

**Il est nécessaire de créer un secret avec les informations d'accès à l'Artifactory Arondor pour récupérer les images par défaut du Chart**

Vous pouvez lire la page "[Récupération d'une image d'un registre privé](https://kubernetes.io/fr/docs/tasks/configure-pod-container/pull-image-private-registry/)" sur la documentation officielle de Kubernetes documentation pour créer le secret.
Ensuite, ajoutez ce le nom de ce secret à la liste des imagePullSecrets en assignant le paramètre `global.imagePullSecrets`.

## Désinstaller le Chart

Pour désinstaller/supprimer la release `my-release` :

```bash
$> helm delete my-release
```

## Paramètres

Les paramètres configurables sont listés dans les prochaines pages.

### Fichier values.yml par défaut

