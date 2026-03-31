---
title: "ARender v2023.18.1 – Release Notes"
draft: false
date: "2026-03-10"
weight: -2023181
aliases:
  - /release/2023.18.1/
description: "Patch release with two annotation fixes: arrow annotation comments not saved, and ghost broken-image icon on arrow creation."
_build:
  list: never
---
import ARenderDownloads from '@site/src/components/ARenderDownloads';

> **Upgrade note:** See [v2023.18.1](../upgrade-notes) for detailed instructions.

## Overview

ARender 2023.18.1 is a **patch release** on top of v2023.18.0 that addresses two annotation-related issues: comments associated with arrow annotations were not being saved, and a ghost broken-image icon appeared during arrow annotation creation.

## Prerequisites

| Component | Supported versions |
|-----------|--------------------|
| OpenJDK   | 8 or 11            |

## User Perspective

**Arrow annotation comments now saved correctly**<br/>
Fixed a regression where comments associated with arrow annotations were silently lost when saving. An internal method (`clearDistance`) was incorrectly clearing comment data during the annotation save process.
Related issues: [AR-18121](https://arondor.atlassian.net/browse/AR-18121)

**No more ghost broken-image icon on arrow creation**<br/>
Creating an arrow annotation no longer displays a brief ghost broken-image icon. The placeholder widget is now hidden by default, eliminating the visual artifact.
Related issues: [AR-18205](https://arondor.atlassian.net/browse/AR-18205)

## Changelog

| Summary                                                        | Issue Type | Key                                                       | Linked Issues |
|----------------------------------------------------------------|------------|------------------------------------------------------------|---------------|
| Comments associated with arrow annotation not saved            | Issue      | [AR-18121](https://arondor.atlassian.net/browse/AR-18121) | [TMAPR-6698](https://arondor.atlassian.net/servicedesk/customer/portal/59/TMAPR-6698) |
| Ghost broken-image icon on arrow annotation creation           | Evolution  | [AR-18205](https://arondor.atlassian.net/browse/AR-18205) | |

<ARenderDownloads version="2023.18.1" />
