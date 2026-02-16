---
title: "Integrating with ARender"
last_update:
  date: '2026-02-16T16:29:56.656Z'
  author: CI/CD Bot
sidebar_position: 3
content_hash: 6ddcddabd91637d685c945f7cda079f1f2a93b6924110f969ae1cb0be91e9832
---
# How-To: Integrate AI Features in ARender

This guide details the process of adding context-aware AI buttons directly into the ARender High Content Interface (HCI). We will configure the necessary files to load the Uxopian-ai web components and add AI action buttons to the top panel.

## Prerequisites

- **ARender HMI:** Installed and accessible.
- **Uxopian-ai:** Deployed and running.
- **Resources:** The `web-components.js` and `web-components.css` files are available.

## File Structure Reference

The ARender configuration files should follow this structure:

```text
├── configurations/
│   ├── arender-custom-client.properties  # Main configuration entry point
│   ├── arender-plugins.xml               # Plugin loader
│   └── toppanel-arender-ai-configuration.xml # Button definitions (Beans)
└── public/
    ├── web-components.css
    └── web-components.js
```

:::note[Starter Kit]
The [Docker + ARender starter kit](../getting_started/installation_guide_arender.md) already includes these configuration files under `arender/configurations/`. You can use them as a starting point.
:::


---

## Step 1: Create the Prompts

The starter kit's `config/prompts.yml` already includes pre-defined prompts (e.g., `summarizeDocumentText`, `summarizeDocumentMarkdown`, `translate`, `detailedComparison`). If you need a custom prompt, create it via the API.

**Endpoint:** `POST /api/v1/admin/prompts`

**Request Body (example):**

```json
{
  "id": "summarizeDocumentText",
  "role": "user",
  "content": "Summarize the following document in a plain text format:\n\n[[${documentService.extractTextualContent(documentId)}]]",
  "defaultLlmProvider": "openai",
  "defaultLlmModel": "gpt-5.1",
  "temperature": "0.7",
  "timeSaved": 300,
  "requiresMultiModalModel": false,
  "requiresFunctionCallingModel": false
}
```

:::note[Context Injection]
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
# Uses UXOPIAN_AI_HOST env var with a fallback default
uxopian.ai.host=${UXOPIAN_AI_HOST:http://localhost:8085}

# 5. Optional: Disable info toaster if preferred
toaster.log.info.enabled=false
```

:::warning[UXOPIAN_AI_HOST]
This must be the **public URL** reachable from the user's browser, not the internal Docker network address. Set it via the `UXOPIAN_AI_HOST` environment variable in your ARender UI container (see the [Docker + ARender installation guide](../getting_started/installation_guide_arender.md)).
:::


---

## Step 3: Register the Plugin

Ensure ARender loads your custom bean configuration by importing it in `configurations/arender-plugins.xml`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans default-lazy-init="true" default-autowire="no"
    xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <import resource="plume.xml"/>
    <import resource="html-plugin.xml"/>
    <import resource="toppanel-arender-ai-configuration.xml"/>

</beans>
```

---

## Step 4: Define the AI Buttons

Define the menu and buttons in `configurations/toppanel-arender-ai-configuration.xml`. The JavaScript handler invokes the `createChat` function exposed by the web component.

Below is a simplified example with a single "Summarize" button. The starter kit includes a more complete version with summarize, compare, translate, and open chat buttons.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans default-lazy-init="true" default-autowire="no"
    xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="aiMenu"
       class="com.arondor.viewer.client.toppanel.presenter.SubMenuButtonPresenter">
       <constructor-arg value="aiMenu" />
       <constructor-arg value="AI" />
       <constructor-arg value="standardButton fas fa-robot toppanelButton"/>
       <property name="enabled" value="true" />
       <property name="visibilityForTopPanel">
          <ref bean="topPanelVisibilityMode" />
       </property>
       <property name="orderedNamedList" value="summarizeTxtButton" />
    </bean>

    <bean id="summarizeTxtButton"
       class="com.arondor.viewer.client.toppanel.presenter.DropdownMenuItemPresenter">
       <constructor-arg value="summarizeTxtButton"/>
       <constructor-arg value="Summarize in text format"/>
       <constructor-arg value="standardButton fas fa-list toppanelButton"/>
       <property name="enabled" value="true" />
       <property name="closingOnClick" value="true" />
       <property name="buttonHandler">
          <bean class="com.arondor.viewer.client.jsapi.toppanel.JSCallButtonHandler">
             <property name="jsCode">
                <value>
try {
    $wnd.createChat({
        endpoint: "${uxopian.ai.host}",
        wsEndpoint: "${uxopian.ai.host}",
        request: {
            inputs: [{
                role: 'user',
                content: [{
                    type: 'PROMPT',
                    value: 'summarizeDocumentText',
                    payload: {
                        documentId: $wnd.getARenderJS().getCurrentDocumentId()
                    }
                }]
            }]
        }
    });
} catch(e) {
  console.log('Error : ' + e);
}
                </value>
             </property>
          </bean>
       </property>
    </bean>
</beans>
```

The `value` field in the JavaScript must match a prompt ID defined in the backend (here, `summarizeDocumentText` from `config/prompts.yml`).

---

## Step 5: Build and Deploy

To deploy these changes, you must build a custom Docker image that extends the official ARender base image. This ensures your configuration files and web resources are correctly placed in the container's runtime environment.

:::tip[Starter Kit Alternative]
The starter kit's `uxopian-ai-stack.yml` already mounts `arender/configurations/` as a volume into the ARender UI container, so you can iterate without rebuilding the image during development.
:::


### Dockerfile Configuration

For production, create a `Dockerfile` at the root of your project:

```dockerfile
# Stage 1: Preparation
FROM alpine as builder
WORKDIR /app
COPY configurations/ configurations/
COPY public/ public/

# Stage 2: Final Image
FROM artifactory.arondor.cloud:5001/arender-ui-springboot:2023.16.0

# Install configurations
COPY --from=builder /app/configurations/* /home/arender/configurations/

# Install Web Resources
COPY --from=builder /app/public/* /home/arender/public/
```

### Build Command

```bash
docker build -t my-custom-arender:1.0 .
```
