---
title: Hôte de Rendition
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 99c3e22a6cac231d94df5cb9220a156b6f53be021598199f6281613d8595bab0
---

## Rendition hosts

For an HMI to communicate with a rendition, it must be provided with the server host URL.
If multiple renditions are deployed, it is also possible to configure them by separating the URLs of the different renditions with the comma character.

| Description                                                                    | Parameter Key                  | Default value          | Type   |
| ------------------------------------------------------------------------------ | ------------------------------ | ---------------------- | ------ |
| Comma separated values to define all the HTTP Rendition server hosts available | arender.server.rendition.hosts | http://localhost:8761/ | String |

## Rendition load document balancing

The HMI server has an internal load balancer that optimizes document loading in Rendition.
This feature relies on a load balancing strategy that distributes requests across multiple resources, improving performance and service availability.

| Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Parameter Key                                          | Default value         | Type    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------------- | ------- |
| The frequency at which weather values ​​are retrieved from renditions                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | arender.server.rendition.weather.polling.interval      | 1000                  | Integer |
| The default strategy for choosing a rendition target while the polling time interval. Valid values :<br/>- BEST_TARGET : Choose the rendition with the best weather value<br/>- WEIGHTED_DISTRIBUTION : Choose a rendition while ensuring a weighted distribution during the polling time interval<br/>- ROUND_ROBIN : Choose a rendition in a round-robin order, independently of the 'weather' value (Since version 2023.15.0)<br/>- RANDOM : Choose a rendition randomly, independently of the 'weather' value (Since version 2023.15.0) | arender.server.rendition.weather.distribution.strategy | WEIGHTED_DISTRIBUTION | String  |
