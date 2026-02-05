---
title: "Configuration"
sidebar_position: 5
last_update:
  date: '2026-02-05T15:28:19.384Z'
  author: CI/CD Bot
content_hash: 89aae0d2d8aa8a7e6c2a4b1f5ae06f75cbdad5ca4ec2ab2eb9440e385e17a765
---

## Configuration files of ARender Web-UI

> ARender configuration files are located in the folder WEB-INF/classes of ARender webapp

| File name                                        | Editable | Role and content                                                                                                            |
| ------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| arender-server-default.properties                | No       | Default properties configuration of ARender Web-UI including rendition server access and connector.                         |
| arender-server.properties                        | No       | Default custom properties needed for our connectors. You can find ECM properties in there.                                  |
| arender-server-custom-&lt;...\>.properties          | Yes      | Custom properties file of ARender Web-UI. To modify it copy the needed properties from arender-server-(default).properties. |
| arender-custom-server-integration.xml            | Yes      | Allows to insert custom Spring Bean, without overloading default ARender configuration.                                     |
| arender.xml                                      | No       | Main configuration of ARender Web-UI.                                                                                       |
| ehcache.xml                                      | Yes      | Cache configuration of documents opened via the graphical interface.                                                        |
| log4j.properties                                 | Yes      | Application logs configuration.                                                                                             |
| arender-default.properties                       | No       | Default interface configuration.                                                                                            |
| arender.properties                               | Yes      | Custom configuration of ARender Web-UI (Cf. [Profile](../../../../configuration/web-ui/profile.md))                |
| customClient/&lt;...\>-custom-client-ui.properties  | Yes      | Another custom configuration of ARender Web-UI that support a wilcard filename                                              |
| arender-env.properties                           | No       | Configuration of ARender Web-UI provided through Docker environment variables                                               |


## Rendition server definition

In order to define one or several rendition servers, edit the
**arender-server-custom-&lt;...\>.properties** configuration file as
follow:

```cfg title="arender-server-custom-&lt;...\>.properties"
arender.server.rendition.servers=http://`{rendition_server_1}`:8761/ arondor-arender-rendition-Main/, http://`{rendition_server_2}`:8761/ arondor-arender-rendition-Main/
```

:::note
The value of _"`{rendition_server_x}`"_ here has to be
changed by the right rendition server address

*(Don't forget to reboot your Web-UI)*
:::

## XFDF annotation folder configuration

A default folder is configured in ARender to saved annotations as XML
files. **The user that launch the application server has to have read
and write rights on this folder.**

By default, XFDF annotations are saved in a folder named
*ARenderAnnotations/* created in the home folder of the user that launch
the application server.

:::warning
On Windows, if the application server is launched as a service (*without any user configured*), the folder will be created in
_C:\Windows\System32\config\systemprofile_.
:::

To configure a specific folder,

- Either modify server properties in
  *arender-server-custom-&lt;...&gt;.properties* and add the property
  **arender.server.annotations.xfdf.localstorage.default.path** with
  the wanted value.
- Either create a system property named
  **arender.annotation.xfdf.localstorage.default.path** and set its
  value with the needed folder path.

## Style sheet: ARender-mat.css

Most of the ARender graphical components can be configured in the style
sheet. Consult the file for more details.

:::note
This stylesheet is related to default user profile. See
the Configuration guide for more information.
:::

## Custom token validation

The validation of a token is configurable if it is sent as a POST request cookie or attribute to the URL /arendergwt/validateToken.

The token must have the name "token".

The custom validator Java class shall implement the TokenValidator interface. It must be declared in the ARender configuration through the **arender.server.json.load.token.validator** property.
The default validator is **NoopTokenValidator**.
