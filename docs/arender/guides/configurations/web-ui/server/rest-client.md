---
title: Client REST de la rendition
---

## Configurations

Depuis la version 2023.12.0, il est possible de configurer le client REST de rendition côté HMI dans le fichier *configurations/arender-custom-client.properties*.


| Description                                                                                                                      | Clé du paramètre                                        | Valeur par défaut | Type   |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------- | ------ |
| Configurer une limite sur le nombre d'octets pouvant être mis en mémoire tampon (en bytes)                                       | arender.server.rendition.rest.max.in.memory.size        | 8000000           | Entier |
| Le nombre maximal de connexions avant de commencer l'acquisition en attente sur les connexions existantes                        | arender.server.rendition.rest.max.connections           | 200               | Entier |
| Le temps maximum après lequel une acquisition en attente doit se terminer (en millisecondes)                                     | arender.server.rendition.rest.pending.acquire.timeout   | 120000            | Entier |
| Nombre maximal de requêtes enregistrées à conserver dans une file d'attente. Définissez la valeur "-1" pour une durée illimitée. | arender.server.rendition.rest.pending.acquire.max.count | -1                | Entier |
| Durée de fermeture du canal en cas d'inactivité (en millisecondes). Définissez la valeur "-1" pour une durée illimitée.          | arender.server.rendition.rest.max.idle.time             | -1                | Entier |
| Durée de fermeture du canal (en millisecondes). Définissez la valeur "-1" pour une durée illimitée.                              | arender.server.rendition.rest.max.life.time             | -1                | Entier |
| Le temps maximum pour lire une réponse à travers le réseau (en millisecondes)                                                    | arender.server.rendition.rest.read.timeout              | 120000            | Entier |
| Le temps maximum pour écrire une requête à travers le réseau (en millisecondes)                                                  | arender.server.rendition.rest.write.timeout             | 120000            | Entier |
