---
title: ARender v2023.14.0 – Upgrade Notes
date: "2025-09-30"
---

> **Release note:** See [v2023.14.0](./release-notes).

## From version 2023.13.0

In this release, there is no architecture changes but there are additionnal configuration properties added.

## Configuration

### Added configuration properties

#### Rendition

**trusted.root.certificates.path**: Path to the folder containing Adobe-trusted certificates, Adobe Approved Trust List (AATL).
**image.conversion.target.mime.type**: Mime type of the generated images for TIFF document. Possible values are _image/png_ and _image/jpeg_.
**disk.free.space.threshold**: Disk space threshold (in Gb) availability check for uploading document to the Rendition.


## Product

### Technical changes

- Improvement in the readiness endpoint /readiness which failed when too many HTTP threads were allocated.
- Improvement in the way how temporary files are written and checked in the file system.
- End user is correctly redirected to the configured login page when refreshing the web page while having an expired session.
- Added missing support of crop image and image filter with the PDFOwl microservice



## Important

### Regression

The Docker images for Alfresco and FileNet in version 2023.14.0 are missing their respective connector JAR file inside the container:

- Alfresco: **artifactory.arondor.cloud/arender-ui-springboot:2023.14.0-alfresco**
- FileNet: **artifactory.arondor.cloud/arender-ui-springboot:2023.14.0-filenet**

#### Workaround

To restore proper functioning, manually add the requred connector JAR to the container:

- Alfresco connector, download [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-cmis/2023.14.0/arondor-arender-cmis-2023.14.0-jar-with-dependencies.jar).
- FileNet connector, download [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-filenet-ce/2023.14.0/arondor-arender-filenet-ce-2023.14.0-jar-with-dependencies.jar).

Mount the JAR into the container at the following path **/home/arender/lib**

### Cloudsmith

Please be aware that binaries for this version are not available on Cloudsmith due to a publishing issue during the release process.

However, all binaries for this version are available in Artifactory and can be accessed and used without issue.

We apologize for any inconvenience and are working to ensure future versions are consistently published to all distribution channels.