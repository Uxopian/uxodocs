---
title: Frequently Asked Questions
last_update:
  date: '2026-01-28T13:32:53.239Z'
  author: CI/CD Bot
sidebar_position: 1
content_hash: 7b3eb1720047f7cbe5ffbad0aac9d62a7e34b57540a4be1044ac938860856b6b
---

# Frequently Asked Questions

## Can Uxopian AI plug into other ECMs, viewers, and LLM providers? Can I buy Uxopian AI alone?

Yes. Uxopian AI can be deployed independently from FlowerDocs and ARender, and connected to third-party ECM platforms (e.g., OpenText) and third-party viewers (e.g., OpenText Intelligent Viewing). It can also be configured to use LLM providers other than OpenAI (from the list of providers already supported by Uxopian AI).

The main condition is integration: a system integrator or partner must implement the connector(s) for the target ECM/viewer/application. Once implemented, these connectors are reusable across projects.

### How it works (prompt templating + “prompt helpers”)

Uxopian AI sends requests to LLMs through a prompt templating system. Prompts can include expressions that are evaluated at runtime to fetch context from the surrounding application or content system.

Documentation: [https://docs.ai.uxopian.com/how_to_guides/extensions/create_custom_helpers/?h=prompt+help](https://docs.ai.uxopian.com/how_to_guides/extensions/create_custom_helpers/?h=prompt+help)

Example (as used in standard demos), where Uxopian AI summarizes the document currently opened by the user:

```text
Summarize the following document. It has to stay in less than 60 words, but have the key information to grasp the bulk of the conversation. You can use markdown, only to put in bold the critical pieces.

Document content:
[[${documentService.extractTextualContent(documentId)}]]
```

When the prompt templating engine encounters the expression inside `[[ ... ]]`, it calls a backend helper to resolve it. In the example above, `documentService.extractTextualContent(documentId)` retrieves the full text of the document (using the document ID already available because the user opened it in the UI). The final prompt sent to the LLM is the original template plus the resolved document content.

You can verify what is actually sent to the LLM by reviewing the history of LLM exchanges in the Users section of Uxopian AI.

### Plugging into other ECMs/viewers

The `documentService.extractTextualContent(...)` behavior in the example is provided through an integration component called a **prompt helper**. The helper used in the demo is specific to ARender, but the mechanism is designed to be pluggable.

That means you can implement a new prompt helper for another system. For example:

* A Documentum helper that retrieves full text given a Documentum document ID
* An OpenText helper that retrieves full text and metadata from OpenText
* A “case context” helper for Salesforce that injects the current case details (customer, policy, claim status, next actions, etc.)

How to create custom prompt helpers: [https://docs.ai.uxopian.com/how_to_guides/extensions/create_custom_helpers/?h=prompt](https://docs.ai.uxopian.com/how_to_guides/extensions/create_custom_helpers/?h=prompt)

Uxopian AI also includes existing helpers (for example, a helper for FlowerDocs to access documents by FlowerDocs ID), which can be used as a reference.

### Integrating the assistant UI into other applications

On the UI side, the assistant is packaged as a **web component**, which is a highly portable format for embedding UI elements in web applications. This makes it straightforward to integrate Uxopian AI into any web app that provides an extension mechanism (plugin areas, custom widgets, embedded panels, etc.).

Documentation: [https://docs.ai.uxopian.com/how_to_guides/integrations/integrate_web_page/](https://docs.ai.uxopian.com/how_to_guides/integrations/integrate_web_page/)

### Summary

* Uxopian AI can be purchased and deployed on its own.
* Integration with third-party ECM/viewers/apps is achieved by implementing reusable connectors (prompt helpers and UI embedding).
* Switching LLM providers is supported (within the list of providers supported by Uxopian AI).
* Most customers rely on a system integrator/partner to implement the connectors once, then reuse them across deployments.