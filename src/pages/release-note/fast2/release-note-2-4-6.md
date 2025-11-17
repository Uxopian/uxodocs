---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2022-02-11

# To modify
version: "2.4.6"
major_version: "2"    # minor version of the release note
description : "Annotations conversion, PatternResolver, FileNet connector, Alfresco metadata query, Alfresco update"    # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---

### Evolution

**Document data model** : Add PDF layout dimensions in DataSet for Tiff2PDF task

**PatternResolver** : Enabled on Source-type tasks

**Alfresco** : Extract an exhaustive list of data from the CMIS query in source

**ARender** : Upgraded to version 3.1.14-7+

**Annotations** : Support conversion from INI to XFDF format

**User interface** : Updated datatable with persistant punnet IDs

**FileNet** : Retrieve additional metadata based on resolved SQL query at ContentExtraction step

**Alfresco** : Update document based on ID via the REST injector

### Issue

**PatternResolver** : Support default value

**SQLSource** : Support empty values

**Alfresco** : Fix session in Injector

**DeleteContent** : Review behavior

**FileNet annotations** : Fix styling for conversion from P8 to XFDF format

**Annotations** : Fixed polygon-type annotations positioning