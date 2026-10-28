---
title: ARender v2023.13.0 – Release Notes
description: Minor release including fix for wrong text selection coordinates and new JVM options for session affinity
date: "2025-08-29"
---

> **Upgrade note:** See [v2023.13.0](../upgrade-notes) for detailed instructions.

## Overview

ARender 2023.13.0 is a minor release that includes a fix for incorrect text position detection when selecting text, and
adds new JVM options to support session affinity (sticky sessions) for clustered deployments in WebSphere ND
environments.

## Prerequisites

| Component | Supported versions |
| --------- | ------------------ |
| OpenJDK   | 8 or 11            |

## User Perspective

**Correct Text Selection Coordinates**  
Text selection now correctly aligns with the actual visible content, even on problematic PDFs. _(AR-17426)_

## Developer / Integrator Perspective

**Session Affinity for WebSphere ND**  
New JVM options are now available to configure the routing identifier used for session affinity when deploying ARender
HMI in a WebSphere cluster environment. _(AR-17638)_

## Exploitation Perspective

_No operational-specific changes in this version._

## Changelog

| Summary                                   | Issue Type | Key      | Linked Issues |
| ----------------------------------------- | ---------- | -------- | ------------- |
| Incorrect text selection position         | Issue      | AR-17426 | TMAPR-6178    |
| JVM options for session affinity (WAS ND) | Issue      | AR-17638 |               |
