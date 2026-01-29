---
title: JNDI Configuration for ARender Web-UI
sidebar_position: 17
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: ee5d99c8a515a38df9b4c7b4eff3dff281e8d21d1c7deca0415588b6fc9086e8
---

JNDI configuration is only compatible for ARender for FileNet in WebSphere. Other deployment compatibility will come later.

## Prerequisite

- arender version >= ARender 3.1.9

## Benefits of using JNDI with ARender Web-UI

JNDI configuration simplifies ARender Web-UI deployment and update.

Since the version 3.1.9 of ARender, the server configuration is
externalized in the property file: arender-server.properties (located in
the folder WEB-INF/classes of ARender Web-UI). It allows the use of JNDI in
ARender to define the configuration directly in the application server.

Below, you will find the configuration detail for each application
server.

## Apache Tomcat JNDI configuration

- Create a property file (example:
  _customer-&lt;integration_type&gt;.properties_, with
  &lt;integration_type&gt; being the type of your current integration ;
  vanilla,filenet,alfresco) and save it in the folder of your choice
  (Example: _C:\\Dev\\apache-tomcat-8.5.13\\customConfiguration_).
- Edit this file with the wanted specific configuration (available
  properties are in arender-server.properties):

    ```cfg
    arender.server.rendition.hosts=http://localhost:8761/
    ```

- Open the Apache Tomcat configuration file **context.xml** (located
  under the _conf_ folder)
- Edit this file to add an environment variable
  **propertiesFileLocation**. Its value is the path of the folder
  containing the property file
  _customer-&lt;integration_type&gt;.properties_ defined above. Example:

```xml
&lt;Context&gt;
    <Environment name="propertiesFileLocation" value="C:\Dev\apache-tomcat-8.5.13\customConfiguration" type="java.lang.String" override="false"/>
</Context>
```

- Restart the application server.

## WildFly JNDI configuration

- Override web.xml configuration

    ```XML
    <!-- Comment the below configuration -->
    <!--
    	<resource-ref>
    	<res-ref-name>propertiesFileLocation</res-ref-name>
    	<res-type>java.lang.String</res-type>
    </resource-ref>
    -->
    ```

- Override default JNDI context

    ```XML
    <!-- Comment the below configuration -->
    <!--<jee:jndi-lookup id="propertiesFileLocation" jndi-name="java:comp/env/propertiesFileLocation"
                 expected-type="java.lang.String" default-value="#{systemProperties['user.home']}/ARenderConfiguration/"/>-->

    <!--Add the below Wildfly configuration -->
    <jee:jndi-lookup id="propertiesFileLocation" jndi-name="java:global/propertiesFileLocation"
                     expected-type="java.lang.String" default-value="#{systemProperties['user.home']}/ARenderConfiguration/"/>
    ```

- Create a property file (example: _customer-&lt;integration_type&gt;.properties_) and save it in the
  folder of your choice (Example: _C:\\Dev\\apache-tomcat-8.5.13\\customConfiguration_).
    - Edit this file with the wanted specific configuration (available
      properties are in arender-server.properties):
      `customer-&lt;integration_type&gt;.properties`

    ```cfg
        arender.server.rendition.hosts=http://rendition-server:8761/`
    ```

- Open the Wildfly configuration file **standalone.xml** (located
  under the _configuration_ folder)
    - Edit this file to add a binding **propertiesFileLocation**. Its
      value is the path of the folder containing the property file
      _customer-&lt;integration_type&gt;.properties_ defined above. Example:

    ```xml
    <subsystem xmlns="urn:jboss:domain:naming:2.0">
        <bindings>
            <simple name="java:global/propertiesFileLocation" value="C:\Dev\customConfiguration\" type="java.lang.String"/>
        </bindings>
        <remote-naming/>
    </subsystem>
    ```

- Restart the application server.

## Websphere JNDI configuration

- Create a property file (example:
  _customer-&lt;integration_type&gt;.properties_) and save it in the
  folder of your choice (Example: _C:\\Dev\\apache-tomcat-8.5.13\\customConfiguration_).
- Edit this file with the wanted specific configuration (available
  properties are in arender-server.properties):

```cfg
arender.server.rendition.hosts=http://rendition-server:8761/
```

- Open Websphere console and go to: Environment -> Naming -> Name
  space bindings:

![image](/img/arender/Websphere_JNDI_Naming.png)

- Click on New, then select String and click on Next:

![image](/img/arender/Websphere_JNDI_Naming_new_value.png)

- Then fill the fiels like below:

    Binding identifier: **propertiesFileLocation**

    Name in namespace relative to lookup name prefix 'cell/node/**nodename**/servers/**serverName** (replace nodename and server
    name by your own):

    > cell/node/**nodename**/servers/**serverName**/propertiesFileLocation

    String value: Its value is the path of the folder containing the
    property file _customer-&lt;integration_type&gt;.properties_ defined above.

![image](/img/arender/Websphere_JNDI_Naming_set_property.png)

- Finally click on Finish

![image](/img/arender/Websphere_JNDI_Naming_Summary.png)

- Restart the application server.
