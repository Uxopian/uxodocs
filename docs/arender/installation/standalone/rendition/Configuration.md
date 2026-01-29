---
title: Configuration
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 917714687dec0b4201bb366fe98fd53270486747158503dcd70b776ae47ae15d
---

## Antivirus Settings

Ensure that the antivirus does not scan the ARender Rendition folder and sub-folders below.

## Cache Management

### Local vs Shared

ARender uses Hazelcast to manage its rendition cache.

#### Local Cache

By default, each Rendition instance maintains its own local cache, meaning cached documents are not shared across
instances.

#### Shared Cache {#SharedHazelcastCache}

With an NFS (Network File System) shared across all Rendition servers and properly configured Hazelcast, cache data can
be shared among instances.

**Benefits of Shared Cache:**

- **Improved Redundancy**: If one instance fails, others can still access cached documents without needing to re-fetch them.
- **Enhanced Performance**: Reduces retrieval time as previously cached documents remain available to all instances,
  enhancing speed and reliability in multi-instance environments.

For comprehensive Hazelcast details, refer to [Hazelcast documentation](https://docs.hazelcast.com/home/).

#### Default Hazelcast Configuration

The configuration file (hazelcast.yaml) is located within the _RenditionEngine_ resources.

The path to find the configuration is _modules/RenditionEngine/rendition-engine-micro-service-2023.16.0.jar/BOOT-INF/classes/hazelcast.yaml_.

```cfg
hazelcast:
  map:
    documentAccessors:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
    conversionOrders:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
    transformationOrders:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
  network:
    join:
      auto-detection:
        enabled: false
    rest-api:
      enabled: true
      endpoint-groups:
        CLUSTER_READ:
          enabled: true
        HEALTH_CHECK:
          enabled: true
        WAN:
          enabled: true
        DATA:
          enabled: true
```

| Property                    | Description                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| max-idle-seconds            | This property is used to define the time when the document is kept in the cache. This value is in seconds. By default, a document is cached for 1 hour, so the default is _3600_. You can find more details on [related Hazelcast documentation](https://docs.hazelcast.com/cloud/map-configurations#max-idle-seconds).                                        |
| eviction-policy             | This property is used to define the eviction policy for cached documents when the maximum cache value is exceeded. By default, the value is _NONE_ which corresponds to no eviction and that the maximum size is ignored. You can find more details on [related Hazelcast documentation](https://docs.hazelcast.com/cloud/map-configurations#eviction-policy). |
| max-size-policy             | This property defines how Hazelcast will calculate the maximum cache size. By default the value is _PER_NODE_ which defines that the maximum cache size is applied for each member of the cluster. You can find more details on [related Hazelcast documentation](https://docs.hazelcast.com/cloud/map-configurations#max-size-policy).                        |
| size                        | This property defines the maximum size of the cache. By default the value is _5_. You can find more details on [related Hazelcast documentation](https://docs.hazelcast.com/cloud/map-configurations#max-size).                                                                                                                                                |
| network.join.auto-detection | This property is used to define the Hazelcast detection mechanism for members of a cluster on the same network. By default the value is _false_. You can find more details on [related Hazelcast documentation](https://docs.hazelcast.com/imdg/4.1.2/clusters/network-configuration#join).                                                                    |

### Cleaning the temporary directory at startup

While Hazelcast evicts entries from the cache, you can also configure cache directory cleanup at application startup
using:

#### Configuration

```cfg
default.document.path.startup.clear=true
```

#### Adjustable Cleanup Timing:

The default behavior is the deletion of all folders created **more than a day ago**.

Adjust this value by modifying the configuration below:

```cfg
temp:
  files:
    folder: ../../tmp/
    house-keeping:
      expiration:
        time: 1
        unit: DAYS

```

| Property | Description                                                                     |
| -------- | ------------------------------------------------------------------------------- |
| time     | The numerical time value                                                        |
| unit     | The time unit associated, which can be "SECONDS", "MINUTES", "HOURS" and "DAYS" |

### rest-api

The REST API is enabled by default with enabled: true. Endpoint groups can be customized for use; details are available
in the [Hazelcast documentation](https://docs.hazelcast.com/hazelcast/5.0/maintain-cluster/rest-api).

#### Default Enabled Endpoints

This section allows you to define the endpoint groups that can be used with the REST API. You can find more details on
[related Hazelcast documentation](https://docs.hazelcast.com/hazelcast/5.0/maintain-cluster/rest-api#using-rest-endpoint-groups).

##### CLUSTER_READ

Allows access to the following endpoints :

- /hazelcast/rest/cluster
- /hazelcast/rest/management/cluster/state
- /hazelcast/rest/license (GET)
- /hazelcast/rest/management/cluster/version (GET)
- /hazelcast/rest/management/cluster/nodes
- /hazelcast/rest/instance
- /hazelcast/rest/log-level (GET)

##### HEALTH_CHECK

Allows access to the following endpoints :

- /hazelcast/health/node-state
- /hazelcast/health/cluster-state
- /hazelcast/health/cluster-safe
- /hazelcast/health/migration-queue-size
- /hazelcast/health/cluster-size
- /hazelcast/health/ready

### Customizing Hazelcast Configuration

To customize the Hazelcast configuration, create your own _hazelcast.yaml_ file and copy the configuration from the
file _ARender-Rendition-\modules\RenditionEngine\rendition-engine-micro-service-2023.16.0.jar\BOOT-INF\classes\hazelcast.yaml_.

For each upgrade of ARender, please read the release note carefully to take into account potential changes to the initial configuration.

After making your own configuration file, modify the _custom-setenv.bat_ (or the _custom-setenv.sh_) file to specify the new file path.

Add the following argument to the list of JVM arguments: **-Dhazelcast.config=path_to_your_file**.

If the path specified is _hazelcast.yaml_ then the file should be placed into _ARender-Rendition-\modules\RenditionEngine_.

```cfg
set ARENDER_BROKER_JVM_ARGS=-Djava.net.preferIPv4Stack=true -Djava.net.preferIPv6Addresses=false -Dloader.path="client_libs/" -Dfile.encoding=UTF-8 -Dhazelcast.config=hazelcast.yaml
```

### Cache Directory Settings

#### For Separate Cache Directories Between Multiple Renditions

##### Disable Auto-Detection

Make sure the auto-detection property is disabled (this is the default setting).

##### Web-UI Configuration

Specify each Rendition host in the Web-UI server configuration. The distribution will be managed based on the health of
the Renditions.

Configuration details can be found on the dedicated [page](/docs/arender/installation/standalone/web-ui/configuration).

#### For Shared Cache Directories Among Several Renditions {#SharedCache}

##### Hazelcast port opening

By default, Hazelcast uses port **5701**. Ensure this port is open on all Rendition servers for communication.

##### Enable Auto-Detection

Activate auto-detection to allow Hazelcast to recognize all Rendition instances.

##### Rendition Instance Locations

Ensure all Rendition instances are on the same subnet for cache sharing.

##### Configure shared directory

For using Hazelcast with multiple Rendition instances and a shared directory, the directory must be on [NFS](https://en.wikipedia.org/wiki/Network_File_System).

Each microservice needs to specify the location of the shared cache directory in the application.yaml file.

```cfg
temp:
  files:
    folder: ../../tmp/
```

```cfg
shared-files:
  sharedPath: ../../tmp/
```

```cfg
shared-files:
  sharedPath: ../../tmp/
```

```cfg
tmp:
  dir:
    doc: ../../tmp/

shared-files:
  sharedPath: ../../tmp/
```

## Load balancer

### Configure the Web-UI with Load balancer

This configuration is **possible only when the cache is shared** across multiple Rendition instances, see:

- [For Shared Cache Directories Among Several Renditions](),
- [Shared Cache]().

If a Load Balancer is present between the Web-UI and Renditions, specify the Load Balancer's host in the Web-UI server
configuration instead of listing individual Rendition hosts.

```cfg
arender.server.rendition.hosts=LOAD_BALANCER_HOST
```

### Configure the Web-UI without Load balancer

If there’s no Load Balancer, specify each Rendition host in the Web-UI server configuration. The distribution will be managed according to the Renditions' health.

Detailed configuration can be found on the dedicated [page](/docs/arender/installation/standalone/web-ui/configuration).

## Network File System (NFS) Configuration

This configuration is **required only when the cache is shared** across multiple Rendition instances, see:

- [For Shared Cache Directories Among Several Renditions](),
- [Shared Cache]().

Proper NFS configuration is crucial for synchronizing different nodes. Two primary optimizations can cause NFS clients to become out of sync:

- **Asynchronous Writing** (default): This option is set by default.
- **Local Read Cache**: Options for NFS should include the below configuration to ensure client synchronization:

```cfg
sync,noac,lookupcache=none
```

Refer to the following resources for more information:

[nfs(5) - Linux man page 10.3](https://linux.die.net/man/5/nfs) \
[NFS Red Hat Enterprise Linux 6](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/storage_administration_guide/fscachenfs)

## Office backend selection (Optional)

ARender offers three configurations for converting Office documents to PDF, each with unique strengths and weaknesses:

- **LibreOffice**
    - Description: Converts Microsoft, OpenOffice, and LibreOffice documents.
    - Pros: Free and open-source, broad file compatibility.
    - Cons: Conversion quality may vary on complex documents; limited support for issue resolution.
- **Microsoft Office**
    - Description: Converts Microsoft, OpenOffice, and LibreOffice documents.
    - Pros: Excellent conversion quality, especially for complex Office files.
    - Cons: Requires a Microsoft Office license, adding cost.
- **DirectOffice (Recommended for Premium experience)**
    - Description: Converts Microsoft documents; relies on LibreOffice for OpenOffice and LibreOffice files.
    - Pros: Fast, high-quality conversion; quick issue resolution through Uxopian support.
    - Added Value: Ideal for businesses seeking consistent quality and reliable technical support.

Nothing to do, it is the default configuration :).

To activate DirectOffice, it must be configured to be associated with the desired mime types:

- Open **modules\TaskConversion**
- Edit **application-security.yml**
- Add the following content:

```cfg
mimetype:
  support:
    msoffice: "${mime.type.msoffice.publisher},${mime.type.msoffice.visio},${mime.type.msoffice.rtf},${mime.type.msoffice.project}"
    libreoffice: "${mime.type.libreoffice.text},${mime.type.libreoffice.sheet},${mime.type.libreoffice.presentation},${mime.type.libreoffice.graphics}"
    directoffice: "${mime.type.msoffice.word},${mime.type.msoffice.excel},${mime.type.msoffice.powerpoint}"
```

#### Microsoft Office supported versions

Microsoft Office 2013 and up. Office 365 compatible if the server is connected to an internet connection. We recommend
as well to keep Office up to date.

---

#### Installation options

**Scripted installation**

- Download and unzip [AromsCheck](/docs/AromsCheck.zip)
- Run **runCheck.bat** for automatic setup.

**Manual installation**

Skip this manual installation if previous scripted installation was a success.

- Download and install the below softwares
    - .Net 4.5: [Download](<[https://www.microsoft.com/en-us/download/details.aspx?id=30653](https://www.microsoft.com/en-us/download/details.aspx?id=30653).md>)

    - Microsoft Visual C++ redistributable 2010: [Download](<[https://www.microsoft.com/en-US/Download/confirmation.aspx?id=14632](https://www.microsoft.com/en-US/Download/confirmation.aspx?id=14632).md>)

    - Microsoft Visual C++ redistributable 2008: [Download](<[https://www.microsoft.com/en-us/download/details.aspx?id=15336](https://www.microsoft.com/en-us/download/details.aspx?id=15336).md>)

---

#### Configuration

##### Windows system configuration

**Create the below system folder**

```cfg
C:\Windows\System32\config\systemprofile\Desktop
C:\Windows\SysWOW64\config\systemprofile\Desktop
```

**Important configuration note**

- Run Rendition Service with Local Account: Ensure that the account used (Administrator or non-Admin) opens Microsoft Office without pop-ups, as they can interrupt rendering.
- Excel Conversion Setup: Open Excel with the user that will launch ARender Rendition. The Excel should have a default printer configured (e.g., an XPS output printer); otherwise, Excel won’t handle page setup and conversions.
- Avoid Remote Session Printers: Avoid setting a forwarded remote session printer as default, as it will disconnect when the session ends, interrupting conversions.

##### ARender configuration for Microsoft Office

To configure Microsoft Office document rendering:

- Open the following folder: **modules\TaskConversion\aroms2pdf**
- Edit **aroms.properties**

| Properties        |     Default value      | Detail                                                                                                                      |
| :---------------- | :--------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| PDF/A             |         false          | PDFs generated by ARender through MS Office are a PDF/A                                                                     |
| processAutoKill   |         false          | Clean old MS Office processes at Aroms start                                                                                |
| TimeoutS          |          120           | Maximum time that ARender takes to generates the PDF with MS Office. After that, conversion is aborted                      |
| AromsHost         | http://localhost:8000/ | URL on which ARender Aroms is exposed                                                                                       |
| LockFields        |         false          | Disable the auto-update of variable field (like a date field)                                                               |
| IgnorePrintAreas  |          true          | Disable the print of empty lines                                                                                            |
| FitSheetOnOnePage |          true          | True: MS Office will try to print the document in one PDF page. False: MS Office default behavior (split if too much pages) |

## PDFOwl: a document renderer alternative

### Description

We have introduced **PDFOwl** as an alternative to the standard **JNIPdfEngine** for document rendering.

This feature supports images, layouts, and layers rendering, but does not yet include image filter handling or SVG functionality.

In the existing document-renderer setup, errors within the native library can cause **the entire application to crash**,
as these issues occur at a low level and cannot be intercepted at the application level.

To improve stability, PDFOwl employs a resilient approach that maintains performance while isolating errors. It manages
rendering requests through sub-processes, allowing errors to be handled without affecting the main process.

### Setup

- Navigate to: **modules\RenditionEngine**,
- Open or create the **application.properties** file,
- Add the following property:

```cfg
micro-services.pdf-renderer=PDFOwl
```

### Configurations

PDFOwl offers several configurable properties with default values listed below.

To update these properties:

- Navigate to: **modules\PDFOwl**,
- Open or create the **application.properties** file,
- Add the property and its value.

```cfg
# PdfOwl binary path
pdfowl.path=pdfowl
# Timeout for pdfowl commands execution in milliseconds
pdfowl.client.watchdog=10000
# Timeout for idle pdfOwl clients in milliseconds
pdfowl.client.ttl=30000
# The memory limit used for a thread to work on a single document
pdfowl.memlimit.mb=1024
```

## PDF Configuration

Since 2023.6.0, we have introduced the support of PDF Portfolio and PDF with attachments.

A PDF Portfolio is a collection of multiple files (PDFs, Word documents, Excel sheets, images, etc.) combined into a single PDF container.

A PDF with attachments is a standard PDF file that contains other files embedded within it.

### Configure PDF Portfolio

Since 2023.7.0, it's disabled by default.

To enable PDF Portfolio feature, set the following property to `true`.

```cfg
arender.server.document.pdf.portfolio.enabled=true
```

### Configure PDF with Attachments

Since 2023.7.0, it's disabled by default.

To enable PDF with attachments feature, set the following property to `true`.

```cfg
arender.server.document.pdf.attachments.enabled=true
```

Before 2023.6.0, the DocumentLayout of a PDF was of type DocumentPageLayout for a PDF with attachments so it was not able to hold information regarding the attachment files.

But since 2023.6.0, when the property is enabled, PDF with attachments is of type DocumentContainer.
In this structure:

- The first child in the `children` list represents the PDF document itself.
- The second child is a DocumentContainer that holds all the attachments files within the PDF.

### Configure PDF search stream timeout

Since version 2023.12.0, a new endpoint has been available to search for text within a specific page range of a document. The search will run for a duration defined by the Rendition timeout configuration. If the search times out, it will stop at the last page it was actively searching. The response will then return all results found up to that point, the search status, and the index of that last page.

To change the timeout, set the following property to your desire:

```cfg
# Set PDF search streamed timeout in milliseconds
pdf.search.stream.timeout=500
```
