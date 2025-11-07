---
title: "Configuration"
---







## Configuration files of ARender Web-UI

> ARender configuration files are located in the **configurations/** folder of ARender Web-UI package.

| File name                             | Details                                                                                                                                                                                                                                                                                                  |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arender-custom-client.properties      | Custom **ARender client properties** file. Available properties are listed inside. Uncomment and modify the properties value to use. More information here: [Profile](./guides/configurations/web-ui/visual/profile.en.md)                                                           |
| arender-custom-server.properties      | Custom **ARender server properties** file. Available properties are listed inside. Uncomment and modify the properties value to use.                                                                                                                                                                     |
| arender-custom-integration.xml        | Custom **Spring Bean XML** file. Add your custom XML **client configuration** in this file.                                                                                                                                                                                                              |
| arender-custom-server-integration.xml | Custom **Spring Bean XML** file. Add your custom XML **server configuration** in this file.                                                                                                                                                                                                              |
| application.properties                | Custom **Spring Boot properties** file. Add your custom Spring Boot configuration in this file. The various properties available are listed in [Spring's online documentation]("https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html".md). (File to create if needed).|

### Rendition server definition

In order to define one or several rendition servers, edit the **arender-custom-server.properties**
configuration file as follows:



```cfg
arender.server.rendition.hosts=&#123;rendition_server_1:8761/&#125;,&#123;rendition_server_2:8761/&#125;,&#123;rendition_server_n:8761/&#125;
```




The value of _"&#123;rendition_server_x&#125;"_ here has to be changed by the right rendition server address.

*(Don't forget to reboot your Web-UI)*


## Custom resource files of ARender Web-UI

> ARender custom resources files have to be put in the **public/** folder at the root of ARender Web-UI package.

#### Example of externalization in *public*

To add a *.css* file named *test.css*, place it in the **public** folder:



```cfg
style.sheet=css/arender-style.css,test.css
```



## XFDF annotation folder configuration

A default folder is configured in ARender to saved annotations as XML
files. **The user that launch the application server has to have read
and write rights on this folder.**

By default, XFDF annotations are saved in a folder named
*ARenderAnnotations/* created in the home folder of the user that launch
the application server.


On Windows, if the application server is launched as a service (*without any user configured*), the folder will be created in
_C:\Windows\System32\config\systemprofile_.


To configure a specific folder,

- Either modify server properties in
  *arender-custom-server.properties* and modify the property
  **arender.server.annotations.xfdf.localstorage.default.path** with
  the wanted value.
- Either create a system property named
  **arender.annotation.xfdf.localstorage.default.path** and set its
  value with the needed folder path.

## Style sheet: ARender-mat.css

Most of the ARender graphical components can be configured in the style
sheet. Consult the file for more details.


This stylesheet is related to default user profile. See
the Configuration guide for more information.


## Configure cache sharing between ARender Web-UIs

It is possible to configure the cache sharing between all Web-UIs by configuring HazelCast.
It provides better support for the scalability of the Web-UIs thanks to its shared and distributed cache system.


This configuration should only be used if the environment is like below:
* No sticky session on the load-balancer on top of ARender Web-UIs
* The cache is shared between all Rendition servers using Hazelcast
* The Rendition tmp folder is shared between all Rendition server (Using NFS or Lustre FSx)


To activate the cache feature you need to modify the **arender-custom-server.properties** like below:  



```cfg
# Defines the cache strategy to use. Valid values : ehCacheStrategy, hazelCastStrategy
arender.server.cache.strategy=hazelCastStrategy
# Path of the hazelCast configuration file, if the value is empty then the default one in the classpath will be used. 
arender.server.cache.hazelCast.config.path=
# Types of routing table map (local only : Classic OR with Redis backup : Redis OR with Hazelcast backup : Hazelcast)
# Possible values are : Classic, Redis or Hazelcast
arender.server.routing.table.type=Hazelcast
```



See below the default Hazelcast configuration for ARender :



```cfg
hazelcast:
  map:
    documentAccessorsHMI:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
    directDocumentMap:
      max-idle-seconds: 3600
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
    spring:oauth2:oauth2Authorized:
      eviction:
        eviction-policy: NONE
        max-size-policy: PER_NODE
  network:
    port:
      port: 5702
    join:
      auto-detection:
        enabled: true
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





For now the connectors supported by ARender have not yet undergone the necessary changes to support HazelCast.

If you have implemented your own connector, then you will need to make your DocumentAccessor properly serializable/deserializable.

