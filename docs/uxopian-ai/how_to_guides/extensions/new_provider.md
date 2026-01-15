---
title: Adding a New LLM Provider Custom Connector
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: ad81f497dbe3a46643cd452b08b7c44bca984c49196999bd0e1ff4bfea27edbc
---

# Adding a New LLM Provider (Custom Connector)

Uxopian-ai is built on an extensible architecture that allows you to integrate any Large Language Model (LLM).

While the system uses **LangChain4j** as its internal abstraction layer, you are not limited to existing adapters. You can build a **fully custom connector** to integrate:

- Internal/Local models hosted on your infrastructure.
- Proprietary APIs not supported by standard libraries.
- Mock/Test services for development.

This guide demonstrates how to implement a connector from scratch using a hypothetical **"FakeLLM"** that simulates responses.

---

## Prerequisites

- **Java 21+**: The LLM Connector architecture requires Java 21 or higher.
- **Maven Settings**: Your `.m2/settings.xml` must be configured to access Uxopian-ai artifacts.

---

## Step 1: Project Configuration

Create a new Maven module. Inherit from the `shared` parent and include the `llm-connector` artifact.

**`pom.xml` Setup:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="[http://maven.apache.org/POM/4.0.0](http://maven.apache.org/POM/4.0.0)"
         xmlns:xsi="[http://www.w3.org/2001/XMLSchema-instance](http://www.w3.org/2001/XMLSchema-instance)"
         xsi:schemaLocation="[http://maven.apache.org/POM/4.0.0](http://maven.apache.org/POM/4.0.0) [http://maven.apache.org/xsd/maven-4.0.0.xsd](http://maven.apache.org/xsd/maven-4.0.0.xsd)">
    <modelVersion>4.0.0</modelVersion>

    <artifactId>my-custom-connector</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.uxopian.ai</groupId>
            <artifactId>llm-connector</artifactId>
        </dependency>
        </dependencies>
</project>
```

---

## Step 2: Implement the Chat Logic (`ChatModel`)

To create a custom connector, you must implement the `dev.langchain4j.model.chat.ChatModel` interface. This is where the core logic resides: receiving a request, processing it (or calling an external API), and returning a standardized response.

**Example: `FakeChatModel.java`**

```java
package com.uxopian.ai.fakellm.client;

import java.util.List;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.chat.request.ChatRequest;
import dev.langchain4j.model.chat.response.ChatResponse;
import dev.langchain4j.model.output.FinishReason;
import dev.langchain4j.model.output.TokenUsage;

public class FakeChatModel implements ChatModel {

    private final String modelName;

    public FakeChatModel(String modelName) {
        this.modelName = modelName;
    }

    @Override
    public ChatResponse chat(ChatRequest request) {
        // 1. Extract the last message from the user
        String userText = findLastUserMessage(request.messages());

        // 2. Simulate Generating a Response (In a real scenario, call your API here)
        String fakeResponse = "FakeLLM (" + modelName + ") says: I received your message: '" + userText + "'";

        // 3. Calculate simulated token usage
        TokenUsage usage = new TokenUsage(10, 20, 30);

        // 4. Return the standardized ChatResponse
        return ChatResponse.builder()
                .modelName(modelName)
                .tokenUsage(usage)
                .aiMessage(AiMessage.from(fakeResponse))
                .finishReason(FinishReason.STOP)
                .build();
    }

    // Helper to find the text input
    private String findLastUserMessage(List<ChatMessage> messages) {
        return messages.stream()
                .filter(UserMessage.class::isInstance)
                .map(m -> ((UserMessage) m).singleText())
                .reduce((first, second) -> second)
                .orElse("Hello");
    }
}
```

---

## Step 3: Implement Streaming (`StreamingChatModel`)

You must also implement `StreamingChatModel`. This interface allows the backend to stream tokens to the user interface in real-time.

**Example: `FakeStreamingChatModel.java`**

```java
package com.uxopian.ai.fakellm.client;

import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.model.chat.StreamingChatModel;
import dev.langchain4j.model.chat.request.ChatRequest;
import dev.langchain4j.model.chat.response.ChatResponse;
import dev.langchain4j.model.chat.response.StreamingChatResponseHandler;
import dev.langchain4j.model.output.FinishReason;
import dev.langchain4j.model.output.TokenUsage;

public class FakeStreamingChatModel implements StreamingChatModel {

    private final String modelName;

    public FakeStreamingChatModel(String modelName) {
        this.modelName = modelName;
    }

    @Override
    public void chat(ChatRequest request, StreamingChatResponseHandler handler) {
        try {
            // Simulate a streaming response by sending chunks with a delay
            String[] chunks = {"Hello ", "this ", "is ", "Fake ", "Streaming..."};
            StringBuilder fullResponse = new StringBuilder();

            for (String chunk : chunks) {
                // Emit partial token
                handler.onPartialResponse(chunk);
                fullResponse.append(chunk);

                // Simulate network latency
                Thread.sleep(200);
            }

            // Finalize the stream
            TokenUsage usage = new TokenUsage(10, 10, 20);
            ChatResponse response = ChatResponse.builder()
                    .aiMessage(AiMessage.from(fullResponse.toString()))
                    .tokenUsage(usage)
                    .finishReason(FinishReason.STOP)
                    .build();

            handler.onCompleteResponse(response);

        } catch (Exception e) {
            handler.onError(e);
        }
    }
}
```

---

## Step 4: Create the Provider Service

Finally, create the **Service** that registers your provider with Uxopian-ai. This class implements `ModelProvider` and acts as a factory for your models.

**Crucial:** You must annotate this class with `@Service("your-provider-name")`. This name is what you will use in the API calls (e.g., `provider=fake-llm`).

**Example: `FakeLLMClient.java`**

```java
package com.uxopian.ai.fakellm.client;

import java.util.List;
import org.springframework.stereotype.Service;
import com.uxopian.ai.model.llm.connector.ModelProperties;
import com.uxopian.ai.model.llm.connector.ModelProvider;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.chat.StreamingChatModel;

@Service("fake-llm") // <--- This ID is used in API calls
public class FakeLLMClient implements ModelProvider {

    @Override
    public String getDefaultModelName() {
        return "fake-gpt-v1";
    }

    @Override
    public List<ModelProperties> getSupportedModels() {
        // Define capabilities (MultiModal, Function Calling, etc.)
        return List.of(
            new ModelProperties("fake-gpt-v1", false, false),
            new ModelProperties("fake-gpt-advanced", true, true)
        );
    }

    @Override
    public ChatModel createChatModelInstance(String modelName) {
        // Factory: Return your custom logic implementation
        return new FakeChatModel(resolveModelName(modelName));
    }

    @Override
    public StreamingChatModel createStreamingChatModelInstance(String modelName) {
        // Factory: Return your custom streaming implementation
        return new FakeStreamingChatModel(resolveModelName(modelName));
    }

    private String resolveModelName(String modelName) {
        return (modelName == null || modelName.isEmpty()) ? getDefaultModelName() : modelName;
    }
}
```

---

## Step 5: Packaging & Deployment

### Packaging (Fat JAR)

Even for simple connectors, it is best practice to package your provider as a **Fat JAR** (Uber JAR) to ensure all specific dependencies are included and do not conflict with the platform's classpath.

Use the `maven-shade-plugin` or `spring-boot-maven-plugin` (repackage goal).

### Deployment (Docker)

Add the JAR to the `/app/provider/` directory in your Docker image.

```dockerfile
# Start from the specific version of Uxopian-ai
FROM artifactory.arondor.cloud:5001/uxopian-ai:2025.0.0

# Copy your custom provider Fat JAR into the provider directory
COPY ./target/custom-fakellm-provider-1.0.jar /app/provider/
```

---

## Step 6: Verification & Testing

Once your provider is deployed and the application has restarted, you can verify it by sending a standard HTTP request using `cURL`.

The key parameter here is `provider=fake-llm`, which matches the value defined in your `@Service("fake-llm")` annotation.

### cURL Example

```bash
curl -X POST "https://<your-uxopian-endpoint>/api/v1/requests?provider=fake-llm" \
     -H "Authorization: Bearer <YOUR_ACCESS_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "inputs": [
             {
               "role": "user",
               "content": [
                 {
                   "type": "text",
                   "value": "Hello, are you a real AI?"
                 }
               ]
             }
           ]
         }'
```

### Expected Response

Based on the logic implemented in `FakeChatModel.java`, the system should return a JSON response containing the simulated text:

```json
{
    "answer": "FakeLLM (fake-gpt-v1) says: I received your message: 'Hello, are you a real AI?'",
    "inputTokenCount": 10,
    "outputTokenCount": 20,
    "llmName": "fake-gpt-v1",
    "id": "abc12345",
    "createdAt": "2025-05-15T10:00:00"
}
```
