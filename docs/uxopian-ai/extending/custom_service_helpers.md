---
title: Write custom service helpers
sidebar_label: Custom service helpers
sidebar_position: 3
last_update:
  date: '2026-03-24T12:58:17.027Z'
  author: CI/CD Bot
content_hash: e8e2eee6906550f3343888dbe0a06133ba427b0fd69be95e21df866c16639b29
---

A service helper is a Spring bean annotated with `@HelperService`. It is made available inside Thymeleaf prompt templates as a named expression object. Prompt templates call helper methods to inject dynamic data such as document content, user profile information, or data from an external system.

## How helpers work in templates

When a prompt template is rendered, the `ThymeleafTemplateEngineHelper` receives a context that includes all registered `@HelperService` beans. A template accesses a helper by the name declared in the annotation:

```
[[${documentService.extractTextualContent(documentId)}]]
```

Here `documentService` is the bean name from `@HelperService(name = "documentService")`.

## Example: ARender DocumentService

The `DocumentService` helper in the ARender plugin extracts text from documents via the ARender DSB:

```java
@Service
@Primary
@HelperService(name = "documentService")
public class DocumentService implements OcrDocumentParser {

    private final RenditionService renditionService;

    public DocumentService(RenditionService renditionService) {
        this.renditionService = renditionService;
    }

    public String extractTextualContent(String documentId) {
        // Calls RenditionService to fetch OCR text from the ARender DSB
        // ...
    }
}
```

The `name` in `@HelperService(name = "documentService")` is the identifier used in templates.

## Writing a custom helper

### 1. Create the helper class

```java
import com.uxopian.ai.model.annotation.helper.HelperService;
import org.springframework.stereotype.Service;

@Service
@HelperService(name = "myHelper")
public class MyHelperService {

    public String getUserProfile(String userId) {
        // Call your internal API or database
        return "Profile for user: " + userId;
    }

    public List<String> getRecentDocuments(String folderId) {
        // Return recent document IDs from your system
        return List.of("doc-1", "doc-2");
    }
}
```

The `name` value is the identifier you use in prompt templates. Choose a short, descriptive name. Do not use a name already used by a built-in helper (`documentService`, `fdService`).

### 2. Inject dependencies

Your helper can autowire other Spring beans that are also in the plugin JAR. Internal `@Service` and `@Component` beans in the same JAR are registered before `@HelperService` beans, so they are available for injection.

```java
@Service
@HelperService(name = "myHelper")
public class MyHelperService {

    private final MyApiClient apiClient;

    public MyHelperService(MyApiClient apiClient) {
        this.apiClient = apiClient;
    }
}
```

### 3. Use the helper in a prompt template

```yaml
- id: userContextPrompt
  role: USER
  content: |
    The user profile is as follows:
    [[${myHelper.getUserProfile(userId)}]]

    Their recent documents are:
    [# th:each="docId : ${myHelper.getRecentDocuments(folderId)}"]
    - [[${docId}]]
    [/]
```

The variables `userId` and `folderId` must be passed in the request payload.

### 4. Package and deploy

Package the helper as a shaded JAR (same process as custom tools) and place it in the `plugins/` directory. Restart uxopian-ai.

```bash
mvn clean package
cp target/my-helper-1.0.0.jar ./plugins/
docker compose restart uxopian-ai
```

## Constraints

- `@HelperService` bean names must be unique. If a name conflicts with an existing bean, `IntegrationLoader` logs a warning and skips the duplicate.
- The interface rule: `IntegrationLoader` registers the bean under its first interface type if the class implements one. This allows different implementations to share an interface.
- Helpers must not depend on another `@HelperService`. If you need shared logic between helpers, place it in a regular `@Service` class in the same JAR.
- Helper methods are called synchronously during prompt rendering. Long-running methods will delay the LLM request.

## Related pages

- [Prompts and templating](../understanding/prompts_and_templating.md)
- [Plugin system](../understanding/plugin_system.md)
- [Write and deploy custom tools](./custom_tools.md)
- [Write prompts](./writing_prompts.md)
