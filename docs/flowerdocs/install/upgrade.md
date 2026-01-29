---
title: Version upgrade
sidebar_position: 3
date: "2000-03-31T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 6280bd15823640ff4e4fdd6d93cee3b6c48dc299b7741a870fe543b2dde1a521
---

This section describes the actions to be taken after an application upgrade.

# Label cache

The labels used by the application are stored in a cache in Redis, which is not purged using the cache purge available to administrators within the application.

After an application version upgrade, it is necessary to purge the label cache to take account of modifications directly in Redis, by performing the following actions:

- Connect to the Redis installation server
- Run the Redis client: `redis-cli`
- Run the command if redis is password-protected: AUTH [username] password
- Run the following command: `DEL "labels:*"`
