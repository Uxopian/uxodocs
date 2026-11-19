---
draft: false
title: "Uxopian AI release notes - 2026.1.0"
date: 2026-11-18
version: "2026.1.0"
major_version: "2026"
latest: true
description: "A rebuilt plan engine with child runs, partial fan-out, budgets and limits; a review queue with dates, archive, delete and a per-task export; per-client gateway routes; and an in-place upgrade from 2026.0.0."
---

# Release Notes: uxopian-ai v2026.1.0

**Release Date:** November 2026
**Version:** 2026.1.0

🚀 **2026.1.0 is the first minor release after general availability.** Plans run on a new engine built to scale across replicas, the review queue grows the tools a review team asks for every day, and one gateway can now serve several clients. And this time, the upgrade is in place: your data stays where it is.

> ⚠️ **REST integrators of plans and review tasks: read the [Upgrade notes](#-upgrade-notes).** Plan executions became plan runs, under a new path, and the review export now has one line per task.

## 👀 At a glance

| | What's new | In one sentence |
|---|---|---|
| 🧩 | **New plan engine** | Runs spread over replicas, sub-plans become child runs, and a failed list element no longer sinks the node. |
| 🛑 | **Plan limits** | Token budgets, run validity, unique runs and an output type, set per plan. |
| ✅ | **A review queue for teams** | Date filters, archive, delete, Undo all, shareable links, and one CSV line per document. |
| 🌐 | **Per-client routes** | One gateway, several clients: routes match on the host and carry their own FlowerDocs and ARender. |
| 🔑 | **Login redirect** | A browser that is not logged in goes to the login page instead of a bare 401. |
| 📂 | **Shared folder for ARender** | ARender reads the review documents from a mount instead of receiving an upload. |
| ⬆️ | **In-place upgrade** | Same OpenSearch, same data: new fields are added at startup. |

---

## 🌟 Highlights

### 🧩 A plan engine that scales

Plan runs are now shared between the replicas of a deployment: any replica can run any node, up to 1024 at once each, and signals travel through Hazelcast. You can even split replicas into brokers and workers. Sub-plans and plans called as tools become **child runs** that you can open and stop like any other. A fan-out whose elements partly fail now ends **Partial** with what succeeded, and runs 32 elements at a time instead of 8. See [Agentic plans](/docs/uxopian-ai/understanding/agentic_plans).

### 🛑 Plans that know their limits

A plan can now cap its **tokens per day or per month**, set how long a run may last (24 hours by default), refuse a second run with the same inputs while one is active, and declare the **type of its output**. Each node is bounded in time, output size and tokens. When a run starts, the agents, prompts and providers it uses are frozen: editing them never changes a run already started.

### 🖼️ A plan page made for building

The flow takes the whole page. Add agents, tools and sub-plans from a floating toolbar, edit a node in a floating inspector (agent, prompt and code included), set the conditions on the links, and save everything at once. See [Managing plans](/docs/uxopian-ai/admin/managing_plans).

### ✅ A review queue for teams

The queue gets a **Dates** panel (created or reviewed, to the minute), **archive** and **delete**, a **Being reviewed** status, accent-insensitive search, tags combined with *or*, and Created and Last modified columns. In a task, **Undo all** puts every decision back, an empty value shows an **Empty** badge, and leaving the task hands it back at once. Filters and the open task live in the address, so a link opens the same view. The CSV now has **one line per document**, with the extracted value, the final value and the status of each field. See [Human review](/docs/uxopian-ai/how_to/human_in_the_loop_review).

### 🌐 One gateway, several clients

A gateway route can now match on the **host** and carry **attributes**, signed with the identity. uxopian-ai reads `FLOWERDOCS_ENDPOINT` and `ARENDER_ENDPOINT` from them, so each client reaches its own FlowerDocs and ARender through one uxopian-ai. See [Per-client routes](/docs/uxopian-ai/how_to/configure_gateway_routes#per-client-routes-host-and-attributes).

---

## ✨ New features

### 🧩 Plans

- Child runs for sub-plans and plans called as tools, with cycles refused before the run starts.
- Partial fan-out, an **All or nothing** switch, and an `ON_PARTIAL` condition.
- Token budget, run validity, unique runs, plan output type, node limits.
- Unbound tool arguments take the value of the same name.
- Broker and worker roles (`agentic.role`).

→ [Agentic plans](/docs/uxopian-ai/understanding/agentic_plans)

### ✅ Human review

- Dates panel, archive, delete (with the document, on request), Being reviewed status.
- Undo all (`Shift+U`), clear or fill a value, cleaned pasted text, field and table row captions.
- Shareable links to a filtered queue or a task.
- One CSV line per task, with three columns per field.

→ [Human review](/docs/uxopian-ai/how_to/human_in_the_loop_review)

### 🌐 Gateway

- Routes matched on the host, route attributes signed into the identity.
- Redirect to the login page for a browser that is not logged in.

→ [Configure gateway routes](/docs/uxopian-ai/how_to/configure_gateway_routes)

### 📂 ARender

- The rendition broker can read the review documents from a shared, read-only folder.

→ [Let ARender read the documents from a shared folder](/docs/uxopian-ai/how_to/human_in_the_loop_review#let-arender-read-the-documents-from-a-shared-folder)

### 🛠️ For helper authors

- `@HelperMethod(label = …)` gives a helper call a readable label in the prompt editor.

→ [Custom service helpers](/docs/uxopian-ai/extending/custom_service_helpers)

---

## 🏗️ Platform & improvements

- 🔑 **Your own encryption key, rotated without loss**: `APP_SECURITY_SECRET_KEY` and `APP_SECURITY_PREVIOUS_SECRET_KEY`, also in the Helm chart.
- 🗄️ **OpenSearch tuned**: up to 100 connections, replicas that follow the size of the cluster (`0-1`), shards and translog settable per index.
- ⬆️ **New fields added at startup** to the existing indices: no more manual mapping after an upgrade.
- 💬 **Quick Prompt polish**: an input that grows with the text, dictation that stops on send, a retry that keeps the question, tooltips everywhere, readable helper labels in the prompt editor.
- ♿ **A more accessible admin console**: a *Skip to content* link, titles that wrap at 200 % text, clearer announcements for screen readers.
- 🔗 **LangChain4j 1.23**, with the newer MCP handshake.
- 🔒 **Leaner, safer images**: base image 1.0.14, no APT, and the vulnerable Base64 intrinsic of Temurin 25 turned off (CVE-2026-114938).

---

## 🐛 Bug fixes

- 🧬 **NuExtract positions are back**: NuMind changed its localization API, and 2026.0.0 returned values without positions.
- 📄 **Review tasks with an unread value open** instead of failing, and a value shows its page only when it was located.
- ✍️ **Monaco editors on the plan page** take Space and Backspace again.
- 🔐 **Fast2 users land in the tenant of their token** (also in gateway 2026.0.1).
- 💬 **Quick Prompt**: answers stream through the FlowerDocs plugin proxy, and the microphone hides when the page forbids it.

---

## 🔄 Upgrade notes

### From v2026.0.0

The upgrade is **in place**: point the stack at the 2026.1.0 images, on the same OpenSearch. The details are in [Upgrading from 2026.0.0](/docs/uxopian-ai/installation/kubernetes#upgrading-from-202600).

#### 🛠️ Installation

1. **Plan runs (action required).** Finish or stop the running plans first. Runs of 2026.0.0 (`plan_executions` index) are neither resumed nor shown; plans themselves are kept.
2. **Settings.** `agent.execution.*` properties are ignored: use `agentic.*`. A custom `APP_SECURITY_SECRET_KEY` must be Base64 of 16, 24 or 32 bytes, or the service does not start.
3. **Replicas.** They must form one Hazelcast cluster and run in the same time zone.
4. **Gateway.** Upgrade it to 2026.1.0 too: uxopian-ai works behind 2026.0.x, but route attributes, host matching and the login redirect need the new gateway.

#### 🔌 Integrations

5. **Plan REST API (action required for REST integrators).** `/api/v1/admin/plan-executions` is now `/api/v1/admin/plan-runs`: `POST /plan-runs` with `input` starts a run, the signal body field is `signal`, `CANCELLED` is `STOPPED`, and `EXPIRED` and `PARTIAL` are new. → [REST API reference](/docs/uxopian-ai/reference/rest_api#plan-runs--apiv1adminplan-runs)
6. **Review task API (action required if you read it).** The CSV export has one line per task. Tags combine with *or*, `orderBy=touched` is now `modified`, `status=PENDING` no longer includes the tasks someone holds (`RESERVED`), and a list without `archived` includes the archived tasks.
7. **Fan-out.** A failed element no longer fails the node: set **All or nothing** where it must. The default parallelism goes from 8 to 32.
8. **Quick Prompt priority.** Higher numbers now show first: invert the priorities you set.
9. **Fast2 behind a multi-tenant Fast2.** Users land in the tenant of their token: data stored under the old configured tenant stays there.

---

> Ready to start? Check out the [Quick Start](/docs/uxopian-ai/getting_started/overview) or the full [Installation Guide](/docs/uxopian-ai/installation/docker).
