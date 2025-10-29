---
title: "Configuration Core"
description: "Configuration de FlowerDocs Core"
---

# Configuration Core

Cette partie décrit les différentes configurations côté FlowerDocs Core à définir au sein du fichier `core.properties` de l'application.

## Général

| Propriété | Description |
|-----------|-------------|
| `system.admin.username` | Identifiant du compte système |
| `system.admin.password` | Mot de passe du compte système, peut être chiffré via un secret |
| `token.key` | Token partagé entre FlowerDocs Core, FlowerDocs GUI et ARender HMI |
| `secret` | Secret utilisé pour encoder le mot de passe *(optionnel)* |

## Base de données

| Propriété | Description |
|-----------|-------------|
| `opensearch.nodes` | Adresses des différents nœuds OpenSearch séparées par une `,` |
| `opensearch.username` | Nom d'utilisateur pour la connexion OpenSearch *(optionnel)* |
| `opensearch.password` | Mot de passe pour la connexion OpenSearch *(optionnel)* |

## Redis

| Propriété | Description |
|-----------|-------------|
| `redis.nodes` | Adresses des différents Redis séparées par une `,` |

## Journalisation

| Propriété | Description |
|-----------|-------------|
| `logging.file.name` | Chemin et nom du fichier de log |
| `logging.level.root` | Niveau de log : `WARN`, `ERROR`, `INFO`, `DEBUG` |

## Stockage

| Propriété | Description |
|-----------|-------------|
| `storage.type` | Type de stockage : `filesystem` ou `s3` |
| `storage.filesystem.path` | Chemin du système de fichiers *(si type filesystem)* |
| `storage.s3.bucket` | Nom du bucket S3 *(si type s3)* |
| `storage.s3.region` | Région AWS *(si type s3)* |

:::warning
Les propriétés non définies dans la documentation ne sont pas qualifiées par FlowerDocs : le bon fonctionnement de l'application n'est donc pas garanti avec ces modifications.
:::