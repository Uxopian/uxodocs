---
last_update:
  date: '2026-01-20T14:02:07.044Z'
  author: CI/CD Bot
content_hash: dd22f8fa0a9528997ccc47ffaae03e590c5536f11236103013f8d1ab30d9a55a
---

# How to Create Custom Prompt Tools

## Tools

Tools are custom Java services that empower the LLM to perform actions or retrieve information autonomously. Unlike **Helpers** (which inject data into the prompt before generation), **Tools** are _Function Calling_ capabilities that the AI can decide to execute during the conversation.

---

## Overview

Uxopian-ai uses **LangChain4j** to manage Tools. By creating a custom Tool, you provide the LLM with a set of methods (functions) described in natural language. The LLM analyzes the user's request and determines if and when to call your Java methods.

### Common Use Cases

- **Action Execution**: Sending emails, creating Jira tickets, updating a database.
- **Dynamic Queries**: Searching an SQL database based on natural language criteria.
- **Complex Calculations**: Performing mathematical operations that LLMs struggle with.

---

## Prerequisites

Before starting, ensure your development environment is configured properly.

- **Maven Settings**: Configure your `.m2/settings.xml` to access the `com.uxopian.ai` libraries.
- **Java Development Kit (JDK)**: Ensure you are using a compatible JDK version (**Java 21+ recommended**).

---

## Step 1: Project Configuration

Create a new Maven project. You need to import the **Uxopian annotation** dependency (to mark the service) and the **langchain4j-core** dependency (to define the tool methods).

Add the following to your `pom.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <artifactId>my-custom-tool</artifactId>

    <properties>
        <langchain4j.version>1.9.1</langchain4j.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.uxopian.ai</groupId>
            <artifactId>annotation</artifactId>
        </dependency>

        <dependency>
            <groupId>dev.langchain4j</groupId>
            <artifactId>langchain4j-core</artifactId>
            <version>${langchain4j.version}</version>
        </dependency>
    </dependencies>
</project>
```

---

## Step 2: Implement the Service

The **Uxopian-ai Tool Loader** scans for classes annotated with `@ToolService`. These classes must also be standard Spring beans (annotated with `@Component` or `@Service`).

### 1. The Tool Class

You must use the `@Tool` annotation from LangChain4j on the methods you want to expose to the AI. The text inside `@Tool("...")` is crucial: it is the description the LLM reads to understand what the tool does.

```java
package com.mycompany.uxopian.tools;

import org.springframework.stereotype.Service;
import com.uxopian.ai.model.annotation.tool.ToolService;
import dev.langchain4j.agent.tool.Tool;

@Service("bookingTool") // Standard Spring annotation
@ToolService // Marks this as a Tool for Uxopian-ai scanning
public class BookingTool {

    /**
     * The description inside @Tool is what the LLM sees.
     * Be descriptive about what the method does and what the parameters represent.
     */
    @Tool("Checks the availability of a meeting room for a specific date")
    public boolean checkAvailability(String roomName, String date) {
        // Logic to check database or external API
        private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(BookingTool.class);

        logger.info("Checking availability for {} on {}", roomName, date);
        return true;
    }

    @Tool("Books a meeting room if available")
    public String bookRoom(String roomName, String date, String organizer) {
        return "Room " + roomName + " successfully booked for " + organizer + " on " + date;
    }
}
```

### 2. Internal Dependencies (Optional)

The `ToolServiceLoader` also scans and registers internal beans found in your JAR. If your Tool relies on a repository or a helper class, simply annotate them with `@Component` or `@Service` (without `@ToolService`), and they will be injected automatically.

```java
@Component
public class InternalDatabaseConnector {
    // This bean is not exposed to the LLM, but can be Autowired into BookingTool
}
```

---

## Step 3: Building the Artifact (Fat JAR)

Just like Helpers, Tools must be packaged as a **Fat JAR (Uber JAR)** to include all specific dependencies (e.g., database drivers, specific HTTP clients) that are not part of the core platform.

When building your Fat JAR, you **must exclude `langchain4j-core`** (and other platform-provided libraries) to avoid classpath conflicts at runtime.

### Maven Shade Plugin Example

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>3.5.0</version>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>shade</goal>
                    </goals>
                    <configuration>
                        <artifactSet>
                            <excludes>
                                <exclude>dev.langchain4j:langchain4j-core</exclude>
                            </excludes>
                        </artifactSet>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

> ⚠️ **Dependency Conflicts**
> Be careful not to include `langchain4j-core` or Spring framework JARs in your final artifact if they are already provided by the platform, unless you specifically need to override them (which is **not recommended**).

---

## Step 4: Deployment

Uxopian-ai scans a specific directory for tools, typically configured as `tools/`.

### Docker Deployment (Recommended)

Add your compiled JAR to the `tools/` directory in your custom Docker image.

**Dockerfile example:**

```dockerfile
# Start from the specific version of Uxopian-ai
FROM artifactory.arondor.cloud:5001/uxopian-ai:2026.0.0-ft1-rc2-full

# Copy your custom Tool Fat JAR into the tools directory
COPY ./target/my-custom-tool-1.0-SNAPSHOT.jar /app/tools/
```

---

## Step 5: Usage

Unlike Helpers, you do **not** call Tools explicitly in your prompt (e.g., no `[[${...}]]`).

1. **Enable the Tool**: In the Uxopian-ai configuration (or Assistant setup), ensure your new Tool is selected/enabled for the conversation context.
2. **Prompting**: Simply ask the LLM to perform the task.

### Example Scenario

**User says:**

> "Can you book the 'Red Room' for me for tomorrow?"

**LLM process:**

1. The LLM reads the `@Tool` description: _"Books a meeting room if available"_.
2. It extracts the parameters:

   - `roomName = "Red Room"`
   - `date = "2025-10-20"`
   - `organizer = "User"`

3. It executes the Java method `bookRoom(...)` server-side.
4. It receives the returned `String`.

**LLM response:**

> "I have successfully booked the Red Room for you for tomorrow."

---

## Best Practices for Descriptions

The quality of your Tool depends directly on the quality of your `@Tool` annotation descriptions.

**Bad:**

```java
@Tool("Get data")
```

**Good:**

```java
@Tool("Retrieves the current stock price for a given ticker symbol (e.g., AAPL)")
```
