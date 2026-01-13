---
title: Using the FlowerDocs application
date: "2020-02-01T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 82119d0768679b0423d78ce5367a8a629158136cd22189d02a7d3bcea88d1fc4
---

# Set up

## Creation of a document containing the logo

For our example, we wi'll use a logo that will be contained within the application. To do this, create a document in the FlowerDocs application and add the logo to the document content.

For the rest of the tutorial, you will keep the ID of the document you have created.

## Add customized logo from FlowerDocs administration

The graphical user interface can be configured from the FlowerDocs admin console. Add an XML configuration file containing the `appInfo` bean, which will allow us to override several properties, including our logo.

```xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd">
    <bean id="appInfo" class="com.flower.docs.gui.client.layout.ApplicationInfo">
	</bean>
</beans>
```

<br/>
You need to know where your logo is located in order to retrieve it. For the example we have chosen to have it as a document in the application. We can then use FlowerDocs REST services to retrieve it:

```javascript
./rest/documents/`docId`/files/content?index=0
```

<br/>
We can now add the logoURL property to our bean, setting the value to the location of the desired logo.

```xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd">
    <bean id="appInfo" class="com.flower.docs.gui.client.layout.ApplicationInfo">
    	<property name="logoURL" value="./rest/documents/`docId`/files/content?index=0" />
	</bean>
</beans>
```

Replace the `docId` with the identifier of the FlowerDocs document containing the logo

:::info
In the same way, you can modify other application properties through this `ApplicationInfo` bean:

- The description with the "description" property
- The environment with the "environment" property
- The version with the "environment" property
- The style with the "styleSheet" property
  :::
