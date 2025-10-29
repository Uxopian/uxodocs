---
title: "Configuration GUI"
description: "Configuration de FlowerDocs GUI"
---

# Configuration GUI

Cette partie décrit les différentes configurations côté FlowerDocs GUI à définir au sein du fichier `gui.properties` de l'application.

## Général

| Propriété | Description |
|-----------|-------------|
| `system.admin.username` | Identifiant du compte système |
| `system.admin.password` | Mot de passe du compte système, peut être chiffré via un secret |
| `token.key` | Token partagé entre FlowerDocs Core, FlowerDocs GUI et ARender HMI |
| `secret` | Secret utilisé pour encoder le mot de passe *(optionnel)* |
| `gui.context` | Contexte de l'application |
| `gui.password.change.enabled` | Active la possibilité de modifier le mot de passe sur la page de connexion |
| `gui.client.arender.url` | URL de ARender HMI |
| `scope.edit` | Permet de sélectionner le scope cible sur la page de connexion |
| `gui.session.timeout` | Durée de validité de la session utilisateur en secondes |
| `ws.url` | URL d'accès aux WebServices FlowerDocs Core |

## Journalisation

| Propriété | Description |
|-----------|-------------|
| `logging.file.name` | Chemin et nom du fichier de log |
| `logging.level.root` | Niveau de log : `WARN`, `ERROR`, `INFO`, `DEBUG` |

## Redis

| Propriété | Description |
|-----------|-------------|
| `redis.nodes` | Adresses des différents Redis séparées par une `,` |

:::warning
Il n'est pas préconisé de modifier des propriétés d'ARender via du paramétrage dans le fichier `gui.properties`. Les propriétés non définies dans la documentation ne sont pas qualifiées par FlowerDocs : le bon fonctionnement de l'application n'est donc pas garanti avec ces modifications.
:::