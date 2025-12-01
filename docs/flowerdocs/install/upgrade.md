---
title: Version upgrade
date: '2000-03-31T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: ee5c6305da518c5101ad7eb8df0161e71932ca95ff32e7035a04817a863bc6c5
---


This section describes the actions to be taken after an application upgrade.


# Label cache

The labels used by the application are stored in a cache in Redis, which is not purged using the cache purge available to administrators within the application.

After an application version upgrade, it is necessary to purge the label cache to take account of modifications directly in Redis, by performing the following actions:

* Connect to the Redis installation server
* Run the Redis client: `redis-cli`
* Run the command if redis is password-protected: AUTH [username] password
* Run the following command: `DEL "labels:*"`
