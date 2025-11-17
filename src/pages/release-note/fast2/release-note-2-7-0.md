---
# Do not modify
draft : false
title: "Fast2 release notes - "
date: 2022-10-11

# To modify
version: "2.7.0"   # ex of format: 2.2.1
major_version: "2"    # minor version of the release note    ex: 2.2
description : "Stop and restart workers from UI, Filenet injector improvement, addition of Documentum extractor" # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---

### Evolution

Convert IS annotations to P8

Move content used as copy content

Support char type on SQLContentExtractor

Removed iText dependency for ViewOne to XFDF converter

FileNet injector - Support multiple RCR for multiversioned documents

FileNet injector - Support filing in several folders

FileNet injector - Multi-version and Record management

Switch some verbose to DEBUG level when loading results in ExplorerPlace

Add save and Navigation Shortcuts

Worker : stop/restart from UI controls

Nuxeo injector: Support creating other document classes than Nuxeo.FILE


### Issue 

Can start OpenSearch Dashboard on Linux without modifying node file rights

Stop/Resume multiple campaigns sharing the same prefix

Fix IDMIS ImageServices extractor for Fast2 2.x

Data values as XML \(multiline, with quotes\) give erroneous CSV output when downloading Step results

Inconsistency in campaign status

Null Punnet values shouldn't block Punnet processing nor block whole maps


### New feature

Explorer place : add option to download punnet as JSON

Add new task for PDF/A format check

Add documentum extractor in Fast2 catalog