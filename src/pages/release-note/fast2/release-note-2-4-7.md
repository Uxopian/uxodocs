---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2022-03-10

# To modify
version: "2.4.7"
major_version: "2"    # minor version of the release note
description : "Annotations conversion, PatternResolver in Sources, memory management, ARender upgrade, UI/UX improvements"    # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---
### Evolution
<!-- CICD - Fix remaining ITs issues -->

Memory management - List of queued punnet Ids shall overflow to disk

UI - Add number separator for thousands on task counters at runtime

UI - Popups homogenization

FileNet - Prevent extraction of contentless annotation

MoveContent - Support file move between different servers

ARender - Upgrade version

Annotation conversion - Throw an exception when the document size is not available

Annotations - Improve conversion from P8 to XFDF

MoveAnnotationContent - Integrate PatternResolver


### Issue

UI - Refresh map list when new map is created

FileNet - Fix document file-in folder

<!-- TestTiff2PdfBox.testAddPdfDimensions UT KO on cicd \(not locally\) -->

<!-- Worker integration tests shall use ESBroker and a valid ElasticSearch instance -->

PatternResolver - Usage now supported in Source tasks

<!-- Dangling name: contents when serializing with empty content container -->
Data - Fix content serialization when empty 

JSTransform - Prevent file to be locked after read operation


### New feature

UI - Reach specific results on Explorer Place when clicking on task counters (OK and KO)


### Regression

Tasks configuration - Fix issue when saving 'Specific Content Settings'

Map - Switch to new map on duplicate

UI - Punnet differentiator  in Explorer Place