---
title: "Integrating with FlowerDocs"
last_update:
  date: '2026-02-16T16:29:56.656Z'
  author: CI/CD Bot
sidebar_position: 4
content_hash: 95809a36deb18122ecea66bf8d40de2059f3c1e6ad2e35f63e0fc302ef4ceae1
---
# How-To: Integrate AI Features in FlowerDocs

This guide details the process of adding a context-aware AI feature—specifically a **Document Summarizer**—directly into the FlowerDocs user interface.

## Prerequisites

Before proceeding, ensure the following environment configurations are in place:

- **Uxopian-ai Platform:** The core platform is deployed and running.
- **Web Component Resources:** The `uxopian-ai` web component JavaScript and CSS files are deployed and accessible to FlowerDocs.
- **BFF Configuration:** The Backend-for-Frontend (BFF) is configured to proxy requests correctly.
- **Plugin Setup:** The necessary plugin configurations (security, routing) have been established by the environment administrator.

---

## Step 1: Create the Prompt

First, we must define the behavior of the AI by creating a specific prompt in the Uxopian-ai backend. This prompt will be called by the frontend script.

We will create a prompt with the ID `summarizeDocumentMarkdown`.

**Endpoint:** `POST /api/v1/admin/prompts`

**Request Body:**

```json
{
  "id": "summarizeDocMd",
  "role": "user",
  "content": "Summarize the following document in a plain text format: \n [[${documentService.extractTextualContent(documentId)}]]",
  "defaultLlmProvider": "openai",
  "defaultLlmModel": "gpt-5.1",
  "temperature": "0.7",
  "timeSaved": 300,
  "requiresMultiModalModel": false,
  "requiresFunctionCallingModel": false
}
```

:::note[Variables]
Notice the usage of `[[${documentId}]]` in the content. This variable is resolved server-side by the Thymeleaf engine using the `documentId` value passed in the request payload (see Step 2).
:::

---

## Step 2: Configure the FlowerDocs Script

Next, navigate to the **FlowerDocs Administration Console** and access the **Scripts** section. Create a new JavaScript file (e.g., `Summarize Document`) and paste the following code.

This script uses an **IIFE (Immediately Invoked Function Expression)** to encapsulate logic and prevent global variable conflicts.

```javascript
(function () {
  /**
   * ============================================================
   * 1. CONFIGURATION & CONSTANTS
   * Constants are scoped to this function to prevent global conflicts.
   * ============================================================
   */
  const BASE_URL = window.location.origin;
  const ENDPOINTS = {
    CHAT: `${BASE_URL}/gui/gateway/uxopian-ai`,
    WS: `${BASE_URL}/gui/gateway/uxopian-ai`,
    // Dynamically retrieve the gateway URL based on the current user scope
    getGATEWAY: () =>
      `${BASE_URL}/gui/plugins/${JSAPI.get()
        .getUserAPI()
        .getScope()}/gateway/uxopian-ai`,
  };

  /**
   * ============================================================
   * 2. HELPER FUNCTIONS
   * ============================================================
   */

  /**
   * Generates the technical context (JSON) required by the AI.
   * This injects the current FlowerDocs Component ID and ARender Document ID.
   */
  function getComponentContext() {
    const flowerId = JSAPI.get()
      .getLastComponentFormAPI()
      .getComponent()
      .getId();
    const arenderId = arenderJSAPI.getCurrentDocumentId();

    return InputBuilder.textAsSystem(`
      /* Contextual Data */
      {
        flowerdocId: { 
          value: "${flowerId}", 
          description: "The ID of the Flowerdoc document" 
        },
        arenderDocId: { 
          value: "${arenderId}", 
          description: "The ID of the Arender document (BASE64 encoded)" 
        }
      }
    `);
  }

  /**
   * Initiates the AI Chat interface using the Web Component's exposed function.
   */
  function openChatWindow(requestPayload) {
    fetch(ENDPOINTS.getGATEWAY())
      .then(() =>
        createChat({
          endpoint: ENDPOINTS.CHAT,
          wsEndpoint: ENDPOINTS.WS,
          request: requestPayload,
        })
      )
      .catch((error) => console.error("Failed to open chat:", error));
  }

  /**
   * Registers a custom button in the application header.
   */
  function registerHeaderAction({ label, icon, onExecute }) {
    const jsapi = JSAPI.get();

    // Register the label for translation
    jsapi.getLabelsAPI().setLabels([label]);

    jsapi.registerForComponentChange((api) => {
      const resolvedLabel = jsapi.getLabelsAPI().getLabel(label.name);
      const headerActions = api.getActions().getHeaderActions();

      const actionItem = jsapi
        .getActionFactoryAPI()
        .buildMenu(
          `ai-action-${label.name}`,
          resolvedLabel,
          icon || "fa-solid fa-robot",
          onExecute
        );

      headerActions.add(actionItem);
    });
  }

  /**
   * ============================================================
   * 3. MAIN EXECUTION
   * ============================================================
   */
  registerHeaderAction({
    icon: "fa fa-file-alt",
    label: {
      name: "summarizeDocMd",
      FR: "Résumer le document en Markdown",
      EN: "Summarize the document in Markdown",
    },
    // The onExecute function builds the request at the moment of the click
    onExecute: () => {
      const request = {
        inputs: [
          // 1. Inject System Context (IDs)
          getComponentContext(),
          // 2. Inject User Prompt with dynamic Arender ID
          InputBuilder.promptAsUser("summarizeDocMd", {
            documentId: arenderJSAPI.getCurrentDocumentId(),
          }),
        ],
      };
      openChatWindow(request);
    },
  });
})();
```

---

## Code Breakdown

### Context Injection (`getComponentContext`)

The script automatically retrieves the current context from the FlowerDocs UI (`JSAPI`) and the viewer (`arenderJSAPI`). It formats this data as a **System Message**, ensuring the LLM understands which specific document it is analyzing.

### Dynamic Execution (`onExecute`)

The request body is constructed inside the `onExecute` callback. This ensures that the `documentId` and context are fetched **at the moment the button is clicked**, rather than when the page loads. This is crucial for Single Page Applications (SPAs) where the user might switch documents without reloading the page.

### The Chat Trigger (`createChat`)

The `createChat` function is exposed globally by the `uxopian-ai` web component. It accepts the connection endpoints and the initial `request` payload, seamlessly opening the chat modal over the FlowerDocs interface.
