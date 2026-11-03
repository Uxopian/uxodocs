---
title: ARender v2023.12.0 – Release Notes
description: Minor release fixing issue with annotation with transparent color while downloading PDF with annotations, issue with FDF annotations, issue with duplicate information in sticky note annotation, issue with multiple rendition configuration.
date: "2025-07-28"
---

> **Upgrade note:** See [v2023.12.0](../upgrade-notes) for detailed instructions.

## Overview

ARender 2023.12.0 is a minor release that includes important fixes and enhancements. This version resolves issues with annotations, specifically those with transparent colors or duplicate information in sticky note headers. It also addresses a configuration problem related to rendition URLs, ensuring the system now correctly load-balances across all configured URLs instead of using just one.

## Prerequisites

| Component | Supported versions |
| --------- | ------------------ |
| OpenJDK   | 8 or 11            |

## User Perspective

This release includes several fixes and new features that improve the user experience:

**Fix annotation with transparent color**  
Downloading a PDF with annotations that have a transparent background no longer fails. _(AR-17633)_

**Session Management**  
ARender FileNet for FlowerDocs connector no longer has session cookie issue by disable Spring Session Hazelcast. _(AR-17720)_

**Resolved Sticky Note Display Issues**  
Sticky note content is now correctly displayed on hover on downloaded PDFs with FDF annotations. _(AR-17630)_

**Eliminated Duplicate Sticky Note Headers**  
Sticky note headers on downloaded PDFs with annotations no longer contain duplicate information.. _(AR-17624)_

**New Search endpoint**  
A new REST API endpoint has been added for search functionality. _(AR-17564)_

**Added Optional Upload Parameter**
A new optional request parameter has been added to prevent the upload endpoint from failing when an unsupported format is uploaded. _(AR-17533)_

**Configurable Web-UI REST Client Timeout**
New properties have been added to configure the Web-UI REST client timeout. _(AR-17729)_

**Multiple Rendition URL Load Balancing**
The ARender Web-UI now correctly load-balances requests across all configured rendition URLs, improving performance and reliability. _(AR-17700)_

## Developer / Integrator Perspective

This release introduces a few changes that may require action:

**Maven Repository Update**
To support the extended security support with Spring 5.x/Spring Boot 2.x, developers and integrators must add the dedicated Uxopian Cloudsmith repository to their `Maven settings.xml` configuration file. Without this, Maven projects using ARender dependencies may fail to build correctly with only the Artifactory repositories.

**Session Management Changes**
A change to session management was implemented to disable Spring Session Hazelcast as ARender FileNet for FlowerDocs connector already uses Spring Session Redis which caused some conflict. This may impact integrators who are using session affinity.

## Exploitation Perspective

_No operational-specific changes in this version._

## Changelog

| Summary                                                   | Issue Type  | Key      | Linked Issues           |
| --------------------------------------------------------- | ----------- | -------- | ----------------------- |
| Annotation transparent background color                   | Issue       | AR-17633 | TMAPR-6323              |
| ARender FileNet for FlowerDocs connector                  | Issue       | AR-17720 | TMAPR-6189              |
| Annotation issue with downloaded PDF with FDF annotations | Issue       | AR-17630 | TMAPR-5796              |
| Newly search REST endpoint                                | New Feature | AR-17564 |                         |
| Upload REST endpoint not failing                          | Evolution   | AR-17533 |                         |
| Timeout client REST properties                            | Evolution   | AR-17729 |                         |
| Multiple Rendition configuration                          | Regression  | AR-17700 | TMAPR-6404 / TMAPR-6354 |
