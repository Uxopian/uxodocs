---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2022-08-03

# To modify
version: "2.6.0" # ex of format: 2.6.0
major_version: "2" # minor version of the release note    ex: 2.2
description: "Switch from Kibana to Opensearch-Dashboards, simplified transactions with a remote worker, clearest starting prompt " # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---

### Evolution

Startup -- Display success message in console when broker/worker correctly started

Worker -- Support content sharing among several networks

JSTransform -- Now supports path to file script

AWS S3 injector -- Make destination filename pattern resolvable

AWS S3 injector -- Support mutlicontent upload

Add-on -- Switch from Kibana to opensearch-dashboards

### Issue

Eml2Pdf -- Fix freezing when document has no mimetype

AWSContentExtractor -- Now accessible from the catalog

Broker -- Prevent failure on startup when port 17896 is open

Worker -- Fix logging system from startup file

Worker -- Fix impossibility to be switched off once broker has stopped

Remote worker -- Support content deletion with worker.content.factory=remote

Shared Objects -- Force unique names with scope prefix (_'M\_'_ for map-scoped, _'G\_'_ for global-scoped objects)

### New feature

Support Spring's `@Autowired` annotation for fields in tasks and sources for custom modules

SQLContentSource -- Support blob and clob formats for file creation

Image conversion -- Support BMP format for PDF conversion
