---
title: Adding a New LLM Provider
description: How to add new LLM providers and implement custom extensions
sidebar_position: 2
---

# How to Add a New LLM Provider & Other Extensions

This guide covers advanced extensibility, including adding new LLM providers, implementing custom Java logic, and securing the service.

## Adding a New LLM Provider (Plugin System)

You can extend `uxopian-ai` with new LLM providers without modifying the core codebase by using the plugin system.

### Step 1: Enable the Plugin Directory

In your `application.yml`, specify a path where the framework will look for custom provider JARs:

```yaml
llm:
  clients:
    path: /opt/uxopian-ai/plugins
```

The application will automatically scan and load all valid provider JARs from this directory at startup.

### Step 2: Implement the `ModelProvider` Interface

Create a new Java project and implement the `com.uxopian.ai.model.ModelProvider` interface:

```java
package com.uxopian.ai.model.llm;

import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.chat.StreamingChatModel;

public interface ModelProvider {
    String[] getSupportedModels();
    ChatModel createChatModelInstance(String modelName);
    StreamingChatModel createStreamingChatModelInstance(String modelName);
    String getDefaultModelName();
}
```

### Step 3: Create the Service Bean

Your implementation must be a Spring `@Service`. The service name will be the identifier used in the configuration (e.g., `uxopian.llm.provider: 'my-custom-provider'`).

```java
import org.springframework.stereotype.Service;

@Service("my-custom-provider")
public class MyCustomProviderClient implements ModelProvider {
    
    // Inject configuration properties for your provider

    @Override
    public ChatModel createChatModelInstance(String modelName) {
        // Example using Langchain4j builders
        return MyCustomChatModel.builder()
            .apiKey(this.apiKey)
            .modelName(modelName)
            .build();
    }

    // ... implement other methods
}
```

### Step 4: Package and Deploy

Compile your project into a JAR file, ensuring it includes all necessary dependencies. Drop the final JAR into the configured plugin directory. The framework will load it on the next restart.