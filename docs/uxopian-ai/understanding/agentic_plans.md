---
title: Agentic Plans
last_update:
  date: '2026-08-13T13:08:15.927Z'
  author: CI/CD Bot
sidebar_label: Agentic Plans
sidebar_position: 12
content_hash: f58ea782194c0aeb8fd2e443c42104d734009628887c7f3ee545d9f3fb7b295f
---

A **Plan** is a directed acyclic graph (DAG) of nodes that orchestrates multiple agents and tools into a single multi-step workflow, instead of relying on one agent to juggle everything in its own tool-calling loop. Introduced in 2026.0.0-ft5.

## Why Plans exist

A single agent's tool-calling loop works well for one coherent task, but some workflows are naturally a **pipeline**: fetch something, transform it, process pieces of it in parallel, then combine the results. Modeling that as an explicit graph — rather than hoping one agent's prompt and tool choices converge on the right sequence — makes the workflow predictable, inspectable, and reusable. A Plan can also call another Plan as a step, or be exposed itself as a tool that any agent can invoke.

## Node types

Each node in a Plan has one of three types:

| Type | Runs | Configuration |
|---|---|---|
| `AGENT` | An LLM agent, built from an agent configuration (a required objective [prompt](./prompts_and_templating.md), tool permissions, an optional list of success criteria, and an optional maximum number of tool cycles) | `agentConfId` |
| `DIRECT_TOOL` | A single native tool call, with **no LLM in the loop** | `toolName`, `toolArgumentBindings` |
| `SUBPLAN` | Another Plan, run in-process as this node's body | `subPlanId` |

An agent configuration **must have an objective**: saving one without it is refused with `400`, since an agent with no prompt could never run. An agent runs on the provider, model and temperature of its objective prompt (the agent configuration itself carries none), and the prompt must therefore name a provider; a plan whose agent objective prompt has none is refused before the run. The objective prompt can also declare a *response format* (`outputSchema`, a JSON Schema): the agent then returns its output as JSON, which downstream nodes receive as such.

`DIRECT_TOOL` nodes are the cheapest and most deterministic step type — useful for anything that doesn't need judgment (fetching a document, chunking text, calling a deterministic API) before handing off to an `AGENT` node for the parts that do.

## How data flows between nodes

Every node has an `outputKey`: the name under which its result becomes available to other nodes. A node's `dependencies` list the node ids it needs to have completed first; the engine only starts a node once all of its dependencies are done.

By default, a node only sees the outputs of its **direct dependencies** — not the whole plan's history. Setting `persistOutput: true` on a node instead adds its output to the **shared payload**, visible to every downstream node regardless of the dependency graph. The Plan's own input parameters (see [Exposing a Plan as a tool](#exposing-a-plan-as-a-tool)) are always part of the shared payload from the start.

`AGENT` nodes render their objective prompt against this merged payload the same way any prompt is rendered (see [Prompts and templating](./prompts_and_templating.md)) — a dependency's `outputKey` or a persisted key becomes a `[[${key}]]` placeholder. `DIRECT_TOOL` nodes bind each tool argument explicitly via `toolArgumentBindings` (`{ "argumentName": "payloadKey" }`); the engine reads the value from the merged payload and builds the tool call's JSON arguments itself — there is no template to write.

## Fan-out: processing a list in parallel

Setting a node's `listKey` turns it into a **fan-out** node: instead of running once, it runs once **per element** of the JSON array found at that payload key, concurrently. Each run sees the same merged payload as any other node, plus one extra variable — `item` — holding that run's element. The node's own `outputKey` then holds a JSON array of all the per-element results, in order.

Concurrency is capped by `maxParallelElements` (default **8**); a fan-out list is capped at **200 elements** total. If any element fails, the whole node fails, with each failing index's error included in the message.

Fan-out applies to any node type, but is most useful on `AGENT` nodes (map a summarization/classification/extraction task over many items) or `SUBPLAN` nodes.

### Example: map-reduce document summarization

A common pattern — summarizing a document too long for one context window — composes four nodes:

```
fetch (DIRECT_TOOL: extractDocumentText)
  → outputKey: content
  ↓
chunk (DIRECT_TOOL: chunkText, bound to content)
  → outputKey: chunks
  ↓
summarize-chunks (AGENT, fan-out listKey: chunks, maxParallelElements: 8)
  → each run sees `item` = one chunk; outputKey: chunkSummaries (a JSON array)
  ↓
combine (AGENT, reads chunkSummaries)
  → outputKey: summary
```

`fetch` and `chunk` need no LLM at all; `summarize-chunks` fans out one agent call per chunk in parallel; `combine` synthesizes the per-chunk summaries into one final answer. Splitting the map step (many small, cheap calls) from the reduce step (one call, higher-quality model) is a natural place to use a smaller/cheaper model for the fan-out agent and a stronger one for the final combine.

`ai-standalone` ships two prompts purpose-built for exactly this pattern — `summarizeChunkFacts` (map: extracts key facts from one fragment) and `summarizeCombine` (reduce: merges the fragment summaries in reading order) — reference them by id in `summarize-chunks`'/`combine`'s agent configurations instead of writing your own from scratch.

## Sub-plans and nesting

A `SUBPLAN` node runs another Plan **in-process**, synchronously, passing it the current merged payload as that sub-plan's input. Nesting is capped at a depth of **5** to prevent runaway recursion (a plan that calls itself, directly or through a cycle of sub-plans, fails once the cap is hit rather than looping forever).

## Exposing a Plan as a tool

Setting `exposeAsTool: true` on a Plan (plus a non-blank `toolDescription`, and a tool-name-safe id — letters, digits, `_`, `-` only) makes it **callable like a native tool** by any agent whose permissions grant it. `toolInputParameters` declares the named, typed inputs the caller must/may provide (each becomes part of the shared payload under its own name); leaving it empty falls back to a single generic `task` string parameter.

Granting access is a permissions concern, not a Plan-side one: an agent configuration's tool permissions include an `allowedSubPlans` list of Plan ids it may call this way (alongside the existing `allowedTools`/`allowedToolTags`/`allowedMcpServers` whitelists). Only Plans in that list are turned into callable tools for that agent — exposing a Plan doesn't make it globally callable by itself.

When called, the sub-plan runs synchronously and returns its result as the tool's output, the same as any other tool call — the calling agent has no visibility into the sub-plan's internal nodes, only its final output.

## Execution model

Running a Plan creates a **Plan execution**: a record of the run, holding the overall status and one **node execution** per node (its own status, timing, token usage, tool call trace, and output). Execution statuses are `PENDING`, `RUNNING`, `PAUSED`, `COMPLETED`, `FAILED`, `CANCELLED`. A node's status additionally distinguishes `SKIPPED` (a downstream node that did not run, because its dependency ended in a state its own *execution condition* does not accept) and `UNSATISFIED` — an `AGENT` node whose success criteria were not all met, which is treated as a distinct outcome from an outright failure.

### Success criteria

An agent's `successCriteria` is a list of statements. For each one, the model returns a verdict with its evidence, and the engine itself derives the node's outcome: `SUCCESS` when every criterion is met, `UNSATISFIED` when one is not, `FAILURE` when the run failed. The model no longer reports the status itself.

### Execution condition: recovery branches

Every node has an `executionCondition` that says in which outcome of its dependencies it runs:

| Value | The node runs when its dependencies ended… |
|---|---|
| `ON_SUCCESS` (default) | successfully |
| `ON_UNSATISFIED` | with an unsatisfied outcome |
| `ON_ERROR` | in error |
| `ON_ANY` | in any outcome |

This makes recovery branches expressible: a node that fails can be followed by an `ON_ERROR` node that handles the failure, and a failure consumed by an `ON_ERROR` or `ON_ANY` branch no longer fails the run. For instance, a plan can try to read a page as text, and fall back to reading it as an image when the page holds no text.

### Pause, resume and stop

An execution can be **paused** (in-flight nodes finish, then the execution stops advancing), **resumed** (continues from its persisted state without re-running nodes that already completed — a resumed run needs no payload, it is rebuilt from the nodes marked *persist output*), or **stopped** (moves permanently to `CANCELLED`, keeping the partial trace for inspection). All three go through one endpoint, `POST /api/v1/admin/plan-executions/{id}/signal`, with a body `{ "type": "PAUSE" | "RESUME" | "STOP" }`. The former `/pause`, `/resume` and `/stop` endpoints no longer exist. A sub-plan run started by a `SUBPLAN` node is a **nested** execution — same model, linked to its parent execution and node, one level deeper — and is driven through the run that started it.

If the LLM provider reports an exhausted quota or credit balance (HTTP `402`, `LLM_QUOTA_EXCEEDED`), the whole run is aborted, also across sub-plan boundaries, and the failed node keeps the tokens the provider billed.

See [Managing Plans in the admin UI](../admin/managing_plans.md) for how to build, run, and monitor a Plan in practice.

## Related pages

- [Managing Plans in the admin UI](../admin/managing_plans.md)
- [Tools](./tools.md)
- [Prompts and templating](./prompts_and_templating.md)
