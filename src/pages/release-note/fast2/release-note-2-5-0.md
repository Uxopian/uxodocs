---
# Do not modify
draft : false
title: "Fast2 release notes - "
date: 2022-05-04

# To modify
version: "2.5.0"
major_version: "2"    # minor version of the release note
description : "Switch from Elasticsearch to OpenSearch, faster results in Explorer, OCR integration, annotation-dedicatd SQL task"    # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---

### Evolution

Annotations - Caculate DPI from embedded image properties

Database - Switch from Elasticsearch 7.6.2 to OpenSearch 1.3.1

CSVSource - Performance optimization

CSVWriter - Support `punnetId` data at export stage

FileNet - Extract mutli-version from ContentExtractor task instead of Source

FileNet - Support querying items across multiple object-stores

OCR - Integrate Tesseract into builtin catalog

Spring Core & Spring Boot - Upgrade Spring version due to 2022-04 vulnerability

UI - Create campaign name based on map name

UI - Improve performance in RuntimeExplorer for large dataset


### Issue

AWS connector - Encrypt credentials

Explorer - Support filters when downloading individual task results

Runtime - Support a larger number of Jobs for automated runs

Runtime - Handle large sets of punnets for retry-on-error feature

Runtime - Prevent tool to auto shutdown when Jobs are misconfigured

Annotations - Fix task behavior with "Create one annotation container per annotation" enabled when converting annotation from P8 to XFDF

### New feature

FileNet - Support CompoundDocument type in connectors

SQL - Add new task dedicated to annotation operations
