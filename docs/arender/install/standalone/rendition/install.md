---
title: "Installation"
sidebar_position: 3
last_update:
  date: '2026-02-05T15:11:39.219Z'
  author: CI/CD Bot
content_hash: e4026cec213f08497b6ccbc737e7c8336577a7516992f7dbf6682ac7daee759a
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Setup with the installer

ARender can be installed with an installer that contains all the required third parties, in the right version (validated by the ARender team).
The only requirement: a valid JDK or JRE (see [Requirement](requirements.md)).

### Retrieve the installer

Using the username and password beforehand provided (contact arender-sales@arondor.com if you want an access),
you can retrieve the Rendition installation in JAR format [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/micro/services/rendition-engine-installer/4.8.21/rendition-engine-installer-4.8.21-rendition.jar).

### Installation process

Simply execute the below command to launch the installation:

```bash
$> java -jar rendition-engine-installer-4.8.21-rendition.jar
```

Below an example of the different installation steps for Windows: 

* Choose where to install your rendition server:

![image](pathname:///img/arender/installer-jar-arender-1.png)

* Choose which requirements to install. If you unselect some of them, you will have to install them manually on the system

![image](pathname:///img/arender/installer-jar-arender-2.png)

* All done! 
![image](pathname:///img/arender/installer-jar-arender-3.png)

Aside from Libreoffice which does not support it, you will find all your installed softwares in the third_party software folder.

![image](pathname:///img/arender/installer-jar-arender-4.png)

**You have finished the installation!**

## Other ways to install ARender Rendition

### Silent installation

#### Retrieve the configuration file

[Download](/docs/install/install-rendition.properties)

#### Installation configuration

Various options can be added:

| Properties                                      | Mandatory/Optional | Function                                           | Possible value |
| ------------------------------------------------| ------------------ | -------------------------------------------------- | -------------- |
| INSTALL_PATH                                    | Mandatory          | Installation Path                                  | Absolute path  |
| arender.silent.install                          | Optional           | Set to true on silent install (-options)           | True/false     |
| arender.install.as.service                      | Optional           | Install as service                                 | True/false     |
| arender.install.libreoffice                     | Optional           | Libreoffice setup                                  | True/false     |
| arender.install.wkhtmltopdf.portable            | Optional           | Install Wkhtmltopdf in portable mode               | True/false     |
| arender.install.imagemagick.portable            | Optional           | Install ImageMagick in portable mode               | True/false     |
| arender.install.ffmpeg.portables                | Optional           | Install FFmpeg in portable mode                    | True/false     |
| arender.install.msoffice.prerequisites (Windows)| Optional           | Install Microsoft Office prerequisites for ARender | True/false     |

As example, for a silent installation, the following property **arender.silent.install=true** must be set in the **install-rendition.properties** file.

#### Installation process

For an installation in a silent mode, an option must be passed as a parameter when launching the installation with the jar.
```bash
$> java -jar ARender-rendition-installer.jar -options install-rendition.properties
```

### Setup with zip packaging

#### Third parties requirement

Please install all the following additional softwares.

<Tabs>
<TabItem value="Windows" label="Windows">
We recommend using Chocolatey to ease the installations: [https://chocolatey.org/](https://chocolatey.org/)
</TabItem>
<TabItem value="Linux" label="Linux">
We recommend installing these third parties from the official OS package distribution.
</TabItem>
</Tabs>

| Document Type           | Software                        | Requirement                                                                                                                                                                       |
| ----------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Office Documents        | LibreOffice or Microsoft Office | LibreOffice 5 and up is advised. Warning: LibreOffice 5 on RHEL/CentOS (6) requires libGL.so.1. Microsoft Office 2013 and up. |
| Images                  | ImageMagick                     | ImageMagick 7 or higher (under Windows, validate that the binary named convert.exe is existing, if not, link it from magick.exe)                                                  |
| Mails and HTML          | WKHtmlToPdf                     | wkhtmltopdf 0.12.5 or higher                                                                                                                                                      |
| Videos, Audios and GIFs | FFmpeg                          | FFmpeg 2.8.15 or higher                                                                                                                                                           |

Note that third parties are automatically searched in the server **PATH variable**.

| Software    | Variable that should be in the server PATH variable                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| LibreOffice | *soffice*                                                                                                         |
| ImageMagick | *magick* (under Windows, validate that the binary named convert.exe is existing, if not, link it from magick.exe) |
| WKHtmlToPdf | *wkhtmltopdf*                                                                                                     |
| FFmpeg      | *ffmpeg* and *ffprobe*                                                                                            |

#### OS configuration

If your server does not have an X server (Linux only), please install xvfb and run the following commands:

```bash
$> echo -e '#!/bin/bash\nxvfb-run -a --server-args="-screen 0, 1024x768x24" /usr/bin/wkhtmltopdf -q $*' > /usr/bin/wkhtmltopdf.sh
$> chmod a+x /usr/bin/wkhtmltopdf.sh
$> ln -s /usr/bin/wkhtmltopdf.sh /usr/local/bin/wkhtmltopdf
```

#### Installation process

Unzip the rendition-engine zip file in the folder of choice.

We recommend using a folder as close as possible from your File system
root folder in order to better manage the limit imposed by Windows of
maximum number of symbols in a path.