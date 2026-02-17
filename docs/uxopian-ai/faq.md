---
title: "FAQ"
last_update:
  date: '2026-02-16T16:29:56.656Z'
  author: CI/CD Bot
sidebar_position: 8
content_hash: 2eafc0d94561cdbe5f458df9c3efa524b906026bb8279be4be5b5237d1434af9
---
# Frequently Asked Questions

## Can Uxopian AI plug into other ECMs, viewers, and LLM providers? Can I buy Uxopian AI alone?

Yes. Uxopian AI can be deployed independently from FlowerDocs and ARender, and connected to third-party ECM platforms (e.g., OpenText) and third-party viewers (e.g., OpenText Intelligent Viewing). It can also be configured to use LLM providers other than OpenAI (from the list of providers already supported by Uxopian AI).

The main condition is integration: a system integrator or partner must implement the connector(s) for the target ECM/viewer/application. Once implemented, these connectors are reusable across projects.

### How it works (prompt templating + “prompt helpers”)

Uxopian AI sends requests to LLMs through a prompt templating system. Prompts can include expressions that are evaluated at runtime to fetch context from the surrounding application or content system.

Documentation: [Creating Custom Helpers](extending/custom_helpers.md)

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

How to create custom prompt helpers: [Creating Custom Helpers](extending/custom_helpers.md)

Uxopian AI also includes existing helpers (for example, a helper for FlowerDocs to access documents by FlowerDocs ID), which can be used as a reference.

### Integrating the assistant UI into other applications

On the UI side, the assistant is packaged as a **web component**, which is a highly portable format for embedding UI elements in web applications. This makes it straightforward to integrate Uxopian AI into any web app that provides an extension mechanism (plugin areas, custom widgets, embedded panels, etc.).

Documentation: [Embedding in a Web Page](how_to/integrate_web_page.md)

### Summary

* Uxopian AI can be purchased and deployed on its own.
* Integration with third-party ECM/viewers/apps is achieved by implementing reusable connectors (prompt helpers and UI embedding).
* Switching LLM providers is supported (within the list of providers supported by Uxopian AI).
* Most customers rely on a system integrator/partner to implement the connectors once, then reuse them across deployments.

## Can I use Xopia to trigger AI agents, instead of a "flat" LLM-based conversation.

The term “agent” is still understood in different ways. Uxopian AI will allow later in 2026 to declare new agents. when it comes to integrating existing ones, let's separate two use cases:

**1) Conversational agents (chat-based agent services).**  
If your “agent” exposes a messaging / chat API (and runs its own reasoning loop), you can use the Uxopian Assistant UI to converse with it by implementing a **provider / model class** that connects to that agent, the same way a provider/model would connect to an LLM endpoint. From the UI standpoint, it remains a normal assistant conversation; under the hood, the “model” is your agent service. See the How to Guides section for this.

**2) Action agents (agents that execute tasks).**  
If your “agent” is something you call to perform an action (redaction, metadata updates, lookups, update customer in CRM,  etc.) rather than a chat endpoint, then the right concept is a **Tool / Function Calling** integration. Uxopian AI can invoke declared tools behind the scenes when the user asks for actions (e.g., “Redact these documents and remove addresses”).  
See: [Creating Custom Tools](extending/custom_tools.md)  
We also plan to add a direct MCP bridge later this year.

## Can I connect customer-developed LLM endpoints (or proprietary AI services) in Xopia?

Yes. Customer-developed LLM endpoints (or proprietary AI services) can be integrated by implementing a **provider / model connector** so that Xopia routes calls to that endpoint. This can be used either as a classical LLM provider, or to connect to a conversational-agent service (chat/messaging API) presented as a “model” to the Assistant UI.

## Do we have an internal paper about “agents” in Uxopian AI?

Not at the moment as a single dedicated paper. The most authoritative references today are the extension documentation (custom tools, and provider/model extensions). We will integrate the concept of agent later in 2026 in Uxopian AI framework.

