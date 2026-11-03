---
title: ARender v2023.6.1 – Release Notes
description: Minor release including new distribution strategies of documents to renditions, disk space based query acceptance, fixing issue with encrypted perishable docuument id not reversible anb issue with multiple rendition configuration.
date: "2025-08-06"
---

> **Upgrade note:** See [v2023.6.1](../upgrade-notes) for detailed instructions.

## Overview

ARender 2023.6.1 est une version mineure qui augmente la résilience de la rendition empêchant le chargement de documents qui peuvent faire saturer l'espace disque. Elle ajoute aussi de nouvelles stratégies de distribution de documents vers les différentes renditions configurées et inclut également divers corrections.

## Prerequisites

| Component | Supported versions |
| --------- | ------------------ |
| OpenJDK   | 8 or 11            |

## User Perspective

##### Multiple rendition URL Load Balancing

The ARender web interface now properly load balances requests across all configured render URLs, improving performance and reliability. _(AR-17700)_

##### Document distribution to rendition servers

The ARender web interface offers new document distribution strategies, providing more configuration options based on user use cases. _(AR-17736)_

##### Document upload request limiting

The rendition server now takes available disk space into account when determining whether or not to accept document upload requests. _(AR-17731)_

##### My encrypted perishable document IDs are reversible

Encrypted perishable document IDs that contain the EOL timestamp are reversible, allowing the document to be automatically reloaded if it is evicted from the cache. _(AR-17686)_

## Developer / Integrator Perspective

_No developer/integrator-specific changes in this version._

## Exploitation Perspective

_No operational-specific changes in this version._
