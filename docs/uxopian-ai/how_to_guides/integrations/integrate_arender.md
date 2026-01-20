---
title: Adding ARender features
last_update:
  date: '2026-01-20T14:02:07.044Z'
  author: CI/CD Bot
content_hash: e254274c5240c56c1883a7e321fc8f4e2be32e812ce7d91337c55bac68a45eab
---

# How-To: Integrate AI Features in ARender

This guide details the process of adding context-aware AI buttons directly into the ARender High Content Interface (HCI). We will configure the necessary files to load the Uxopian-ai web components and add a "Summarize Document" button to the top panel.

## Prerequisites

- **ARender HMI:** Installed and accessible.
- **Uxopian-ai:** Deployed and running.
- **Resources:** The `web-components.js` and `web-components.css` files are available.

## File Structure Reference

Ensure your custom ARender configuration follows this structure:

```text
├── configurations
│   ├── arender-custom-client.properties  # Main configuration entry point
│   ├── arender-plugins.xml               # Plugin loader
│   └── toppanel-arender-ai-configuration.xml # Button definitions (Beans)
└── public
    ├── web-components.css
    └── web-components.js
```

---

## Step 1: Create the Prompt

First, we create the prompt in the Uxopian-ai backend. This prompt utilizes a server-side service to extract text content dynamically from the document currently viewed in ARender.

**Endpoint:** `POST /api/v1/admin/prompts`

**Request Body:**

```json
{
    "id": "summarizeDocMd",
    "role": "user",
    "content": "Summarize the following document in a plain text format: \n [[${documentService.extractTextualContent(documentId)}]]",
    "defaultLlmProvider": "openai",
    "defaultLlmModel": "gpt-4o",
    "temperature": "0.7",
    "timeSaved": 300,
    "requiresMultiModalModel": false,
    "requiresFunctionCallingModel": false
}
```

:::note Context Injection
The expression `[[${documentService.extractTextualContent(documentId)}]]` indicates that the text extraction happens on the server side (Uxopian backend) using the `documentId` passed in the payload.
:::

---

## Step 2: Configure ARender Properties

Update `configurations/arender-custom-client.properties` to load the web components, define the menu button, and point to the AI host.

```properties
# 1. Load Styles
style.sheet=css/arender-style.css,web-components.css

# 2. Load the Web Component Script
arenderjs.startupScript=web-components.js

# 3. Add the 'aiMenu' to the top panel (middle section)
topPanel.section.middle.buttons.beanNames=addStickyNoteAnnotationButton,annotationCreationOpenCreation,documentBuilderButton,aiMenu

# 4. Configure the connection to Uxopian-ai
uxopian.ai.host=[https://iris.demos.uxopian.com/ai](https://iris.demos.uxopian.com/ai)

# 5. Optional: Disable info toaster if preferred
toaster.log.info.enabled=false
```

---

## Step 3: Register the Plugin

Ensure ARender loads your custom bean configuration by importing it in `configurations/arender-plugins.xml`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans default-lazy-init="true" default-autowire="no"
    xmlns="[http://www.springframework.org/schema/beans](http://www.springframework.org/schema/beans)"
    xmlns:xsi="[http://www.w3.org/2001/XMLSchema-instance](http://www.w3.org/2001/XMLSchema-instance)"
    xsi:schemaLocation="[http://www.springframework.org/schema/beans](http://www.springframework.org/schema/beans)
        [http://www.springframework.org/schema/beans/spring-beans.xsd](http://www.springframework.org/schema/beans/spring-beans.xsd)">

    <import resource="plume.xml"/>
    <import resource="html-plugin.xml"/>

    <import resource="toppanel-arender-ai-configuration.xml"/>

</beans>
```

---

## Step 4: Define the AI Button

We define the menu and the specific button for our prompt in `configurations/toppanel-arender-ai-configuration.xml`.

This XML configures the **AI Menu** container and the **Summarize** button. The JavaScript handler inside the bean invokes the `createChat` function exposed by the web component, passing the current document ID in the payload.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans default-lazy-init="true" default-autowire="no"
    xmlns="[http://www.springframework.org/schema/beans](http://www.springframework.org/schema/beans)"
    xmlns:xsi="[http://www.w3.org/2001/XMLSchema-instance](http://www.w3.org/2001/XMLSchema-instance)"
    xsi:schemaLocation="[http://www.springframework.org/schema/beans](http://www.springframework.org/schema/beans)
        [http://www.springframework.org/schema/beans/spring-beans.xsd](http://www.springframework.org/schema/beans/spring-beans.xsd)">

    <bean id="aiMenu"
       class="com.arondor.viewer.client.toppanel.presenter.SubMenuButtonPresenter">
       <constructor-arg value="aiMenu" />
       <constructor-arg value="AI" />
       <constructor-arg value="standardButton fas fa-robot toppanelButton"/>
       <property name="enabled" value="true" />
       <property name="visibilityForTopPanel">
          <ref bean="topPanelVisibilityMode" />
       </property>
       <property name="orderedNamedList" value="summarizeDocMdButton" />
    </bean>

    <bean id="summarizeDocMdButton"
       class="com.arondor.viewer.client.toppanel.presenter.DropdownMenuItemPresenter">
       <constructor-arg value="summarizeDocMdButton"/>
       <constructor-arg value="Summarize Document"/>
       <constructor-arg value="standardButton fas fa-list toppanelButton"/>
       <property name="enabled" value="true" />
       <property name="closingOnClick" value="true" />
       <property name="buttonHandler">
          <bean class="com.arondor.viewer.client.jsapi.toppanel.JSCallButtonHandler">
             <property name="jsCode">
                <value>
try {
    // Invoke the Web Component's createChat function
    $wnd.createChat({
        endpoint: "${uxopian.ai.host}",
        wsEndpoint: "${uxopian.ai.host}",
        request: {
            inputs: [{
                role: 'user',
                content: [{
                    type: 'prompt',
                    promptId: 'summarizeDocMd',
                    payload: {
                        // Pass the current document ID to the backend
                        documentId: $wnd.getARenderJS().getCurrentDocumentId()
                    }
                }]
            }]
        }
    });
} catch(e) {
  console.log('Error launching AI Chat: ' + e);
}
                </value>
             </property>
          </bean>
       </property>
    </bean>

</beans>
```

---

## Step 5: Build and Deploy

To deploy these changes, you must build a custom Docker image that extends the official ARender base image. This ensures your configuration files and web resources are correctly placed in the container's runtime environment.

### Dockerfile Configuration

Create a `Dockerfile` at the root of your project. The following example uses a multi-stage build to keep the final image clean.

```dockerfile
# -----------------------------------------------------------------------------
# Stage 1: Preparation (Builder)
# Assumes your source code is available in the build context
# -----------------------------------------------------------------------------
FROM alpine as builder
WORKDIR /app

# Copy local source folders to the builder stage
COPY configurations/ configurations/
COPY public/ public/

# -----------------------------------------------------------------------------
# Stage 2: Final Image
# Extends the official ARender SpringBoot image
# -----------------------------------------------------------------------------
FROM artifactory.arondor.cloud:5001/arender-ui-springboot:2023.11.0

# 1. Install Custom Configurations
# Overrides arender-custom-client.properties and adds the XML spring beans
COPY --from=builder /app/configurations/* /home/arender/configurations/

# 2. Install Web Resources
# Places the Web Component JS and CSS in the public web folder
COPY --from=builder /app/public/* /home/arender/public/
```

### Build Command

Build the image using your standard Docker CLI:

```bash
docker build -t my-custom-arender:1.0 .
```
