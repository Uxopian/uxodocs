---
title: "Embedding in a Web Page"
last_update:
  date: '2026-02-16T16:29:56.656Z'
  author: CI/CD Bot
sidebar_position: 5
content_hash: 1e1a08bd7b4f7edbee750dd749e1dcdeea41e74111b24a6b3c1ca68f8a28902b
---
# How-To: Integrate AI into a Basic Web Page

This guide explains how to add Uxopian-ai features to a standard HTML/JavaScript application. We will create a simple button that, when clicked, opens the AI chat modal with specific context from the page.

## Prerequisites

- **Uxopian-ai Platform:** Deployed and accessible.
- **Web Components:** The `web-components.js` and `web-components.css` files must be imported into your HTML file.

---

## Step 1: Create the Prompt

First, configure the prompt in the backend. This prompt will define how the AI behaves and what variables it expects from the frontend (e.g., the page title or user name).

**Endpoint:** `POST /api/v1/admin/prompts`

**Request Body:**

```json
{
  "id": "webAssistantPrompt",
  "role": "system",
  "content": "You are a helpful assistant for the website. The user is currently viewing the page: '[[${pageTitle}]]'. Answer their questions concisely.",
  "defaultLlmProvider": "openai",
  "defaultLlmModel": "gpt-5.1",
  "temperature": "0.7",
  "timeSaved": 60,
  "requiresMultiModalModel": false,
  "requiresFunctionCallingModel": false
}
```

---

## Step 2: HTML Structure

Create a basic HTML file. You must link the Uxopian CSS and JS files. Add a button that will trigger the interaction.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Web App</title>

    <link rel="stylesheet" href="web-components.css" />
  </head>
  <body>
    <header>
      <h1>Welcome to My App</h1>
      <button id="ask-ai-btn">Ask AI Helper</button>
    </header>

    <main>
      <p>This is a sample page content.</p>
    </main>

    <script src="web-components.js"></script>

    <script src="app.js"></script>
  </body>
</html>
```

---

## Step 3: JavaScript Implementation

In your `app.js` file, add an event listener to the button. When clicked, it will call the `createChat` function exposed by the web component.

We will verify that the prompt ID matches the one created in Step 1, and we will pass the document title dynamically via the `payload`.

```javascript
// Configuration
const AI_CONFIG = {
  ENDPOINT: "https://your-uxopian-instance.com", // HTTP Endpoint
  WS_ENDPOINT: "https://your-uxopian-instance.com", // WebSocket Endpoint (usually same base)
};

document.addEventListener("DOMContentLoaded", () => {
  const aiButton = document.getElementById("ask-ai-btn");

  if (aiButton) {
    aiButton.addEventListener("click", () => {
      // 1. Gather Context (e.g., page title, selected text, user ID)
      const currentPageTitle = document.title;

      // 2. Trigger the Chat Interface
      try {
        // 'createChat' is globally available via web-components.js
        createChat({
          endpoint: AI_CONFIG.ENDPOINT,
          wsEndpoint: AI_CONFIG.WS_ENDPOINT,
          request: {
            inputs: [
              {
                role: "user",
                content: [
                  {
                    type: "PROMPT",
                    value: "webAssistantPrompt", // Must match Backend ID
                    payload: {
                      // Dynamic variables to inject into the prompt
                      pageTitle: currentPageTitle,
                    },
                  },
                ],
              },
            ],
          },
        });
      } catch (error) {
        console.error(
          "Uxopian-ai Web Component not loaded or error initializing:",
          error
        );
      }
    });
  }
});
```

---

## Technical Details

### The `createChat` Function

This function allows you to open the chat modal programmatically.

- **endpoint:** The base URL for the REST API (e.g., for retrieving history).
- **wsEndpoint:** The base URL for WebSocket connections (used for streaming responses).
- **request:** The initial payload sent to the LLM to start the conversation.
  - **inputs:** An array of message objects.
  - **value:** The ID of the prompt configuration on the server.
  - **payload:** A key-value object. Keys must match the variables defined in your prompt (e.g., `[[${pageTitle}]]`).

:::tip[CORS Configuration]
Ensure your Uxopian-ai backend is configured to allow Cross-Origin Resource Sharing (CORS) from your web application's domain.
:::
