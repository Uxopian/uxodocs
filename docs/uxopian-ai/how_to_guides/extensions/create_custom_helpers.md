---
title: How to Create Custom Prompt Helpers
last_update:
    date: "2025-12-09T08:47:49.723Z"
    author: CI/CD Bot
content_hash: 38ea3d69948d1962eb85cabc9a429841f62bb83681a4f493af18aafb2a817074
---

# How to Create Custom Prompt Helpers

Helpers are custom Java services that allow you to inject dynamic data or perform server-side operations directly within your LLM prompts.

## Overview

Uxopian-ai uses the **Thymeleaf** engine to interpret prompts. By creating a custom Helper, you expose Java objects and methods that can be called using the standard Thymeleaf syntax: `[[${helperName.methodName()}]]`.

**Common Use Cases:**

- **Data Enrichment:** Fetching real-time data (Weather, Stock prices, Time).
- **Content Retrieval:** Calling external systems (e.g., FlowerDocs) to retrieve document text or images.
- **Data Transformation:** Formatting dates, hashing strings, or parsing complex inputs before sending them to the LLM.

---

## Prerequisites

Before starting, ensure your development environment is configured to access the Uxopian artifacts.

1.  **Maven Settings:** You must configure your `.m2/settings.xml` to include the credentials and repository definitions required to download the `com.uxopian.ai` libraries.
2.  **Java Development Kit (JDK):** Ensure you are using a compatible JDK version (Java 21+ recommended).

---

## Step 1: Project Configuration

Create a new Maven project or module. You need to import the `shared` parent project and the `annotation` dependency to mark your services correctly.

Add the following to your `pom.xml` (adjust the `<version>` to match your current Uxopian-ai deployment):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="[http://maven.apache.org/POM/4.0.0](http://maven.apache.org/POM/4.0.0)"
         xmlns:xsi="[http://www.w3.org/2001/XMLSchema-instance](http://www.w3.org/2001/XMLSchema-instance)"
         xsi:schemaLocation="[http://maven.apache.org/POM/4.0.0](http://maven.apache.org/POM/4.0.0) [http://maven.apache.org/xsd/maven-4.0.0.xsd](http://maven.apache.org/xsd/maven-4.0.0.xsd)">
    <modelVersion>4.0.0</modelVersion>

    <artifactId>my-custom-helper</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.uxopian.ai</groupId>
            <artifactId>annotation</artifactId>
        </dependency>
        </dependencies>
</project>
```

---

## Step 2: Implement the Service

To create a helper, you must create a Java class annotated with `@Component` (standard Spring) and `@HelperService`.

The `name` attribute defined in `@HelperService` is the **variable name** you will use in your prompt.

```java
package com.mycompany.uxopian.helpers;

import org.springframework.stereotype.Component;
import com.uxopian.ai.model.annotation.helper.HelperService;

@Component
@HelperService(name = "myTools") // This service will be accessible as 'myTools' in prompts
public class MyCustomHelper {

    /**
     * Example method to get current status.
     * Usage in prompt: [[${myTools.getStatus()}]]
     */
    public String getStatus() {
        return "System is operational";
    }

    /**
     * Example method with parameters.
     * Usage in prompt: [[${myTools.greet(userName)}]]
     */
    public String greet(String name) {
        return "Hello, " + name + "!";
    }
}
```

---

## Step 3: Building the Artifact (Fat JAR)

Because your helper might rely on third-party libraries that are not present in the core Uxopian-ai classpath, **you must package your helper as a Fat JAR (or Uber JAR)**.

This ensures all your specific dependencies are included inside the JAR file. You can achieve this using the `maven-shade-plugin`.

:::warning Dependency Conflicts
Ensure you do not bundle core Spring or Uxopian dependencies that conflict with the running server. Scope strictly necessary dependencies.
:::

---

## Step 4: Deployment

Uxopian-ai loads helpers from a specific directory on the filesystem, typically `helper-services/`.

### Docker Deployment (Recommended)

When running Uxopian-ai in a containerized environment, the best practice is to build a custom Docker image that extends the base image and adds your JAR.

**Dockerfile Example:**

```dockerfile
# Start from the specific version of Uxopian-ai
FROM artifactory.arondor.cloud:5001/uxopian-ai:2025.0.0

# Copy your custom helper Fat JAR into the loader directory
COPY ./target/my-custom-helper-1.0-SNAPSHOT.jar /app/helper-services/
```

---

## Step 5: Usage in Prompts & Requests

Once deployed, your helper is ready to be used in Prompts.

### 1\. The Prompt Template

In your Thymeleaf prompt, call the method using the name defined in the annotation.

**Example Prompt:**

```text
The system status is: [[${myTools.getStatus()}]]
Please write a polite message for: [[${myTools.greet(customerName)}]]
```

### 2\. Passing Parameters (The Payload)

If your helper method requires parameters (like `greet(String name)` above), the values for these parameters must be provided in the request payload.

**Crucial Rule:** The variable names in the payload **must match** the variable names used in the method call within the prompt.

**API Request Example:**
If your prompt contains `[[${myTools.greet(customerName)}]]`, your JSON payload to the request endpoint must include `customerName`:

```json
{
    "conversation": "...",
    "inputs": [
        {
            "role": "user",
            "content": "...",
            "payload": {
                "customerName": "Alice"
            }
        }
    ]
}
```

:::tip Troubleshooting
If your helper returns null or throws an error, verify that:
1\. The payload key matches the argument name used in the Thymeleaf expression exactly.
2\. The variable type in the payload matches the method signature (e.g., Integer vs String).
:::
