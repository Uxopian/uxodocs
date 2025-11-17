---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2023-01-10

# To modify
version: "2.8.0" # ex of format: 2.2.1
major_version: "2" # minor version of the release note    ex: 2.2
# description : "Stop and restart workers from UI, Filenet injector improvement, addition of Documentum extractor" # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---

## Regression

UI : Prevent naming map with special characters

FileNet : Fix mismatching object-stores when disparity between task parameter and document object-store metadata

## New feature

Worker : Spawn new worker from server place

Catalog : New _UpdateSharedObject_ task to trigger update of shared object from campaign execution

Catalog : New OpenText injector

## Issue

Catalog : Fix bugs when creating folders in Nuxeo

Catalog : Add exception option when results are empty

Annotations : Ensure that annotation identifiers are unique when converting from INI to XFDF, and minor fixes

Security : Fix breach when worker is shutdown or rebooted

Scheduler : Fix active job without a next execution time

Scheduler : Review Cron expression validation

Tesseract : Creates empty output files

Vulnerability : Apache commons library

## Evolution

Annotations Wang to XFDF : Support annotations from ImageRight environment

Annotations Wang to XFDF : Enhancements for conversion

Annotations INI to XFDF : Flag emails in exception depending on annotation types

Annotations INI to XFDF : Parameterizable highlight opacity value

Annotations INI to XFDF : Support application/vnd.ms-outlook mimetype

Documentum : Support multi-version at extraction

OCR Tesseract : Improve processing performance speed

Nuxeo : support multi-version at injection

Explorer place : New shortcut to access processing items from run place

AlterDocumentContent : support content path with wildcards

DeleteContent : add option to also delete the content entry in Fast2 punnet

<br /><br />
And other minor improvements.
