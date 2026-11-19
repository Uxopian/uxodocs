---
title: Agentic Plans
last_update:
  date: '2026-08-13T13:08:15.927Z'
  author: CI/CD Bot
sidebar_label: Agentic Plans
sidebar_position: 12
content_hash: f58ea782194c0aeb8fd2e443c42104d734009628887c7f3ee545d9f3fb7b295f
---

A **Plan** is a directed acyclic graph (DAG) of nodes that orchestrates multiple agents and tools into a single multi-step workflow, instead of relying on one agent to juggle everything in its own tool-calling loop. Introduced in 2026.0.0-ft5; the engine was rebuilt in 2026.1.0 (see [What changed in 2026.1.0](#what-changed-in-202610)).

## Why Plans exist

A single agent's tool-calling loop works well for one coherent task, but some workflows are naturally a **pipeline**: fetch something, transform it, process pieces of it in parallel, then combine the results. Modeling that as an explicit graph — rather than hoping one agent's prompt and tool choices converge on the right sequence — makes the workflow predictable, inspectable, and reusable. A Plan can also call another Plan as a step, or be exposed itself as a tool that any agent can invoke.

## Node types

Each node in a Plan has one of three types:

| Type | Runs | Configuration |
|---|---|---|
| `AGENT` | An LLM agent, built from an agent configuration (a required objective [prompt](./prompts_and_templating.md), tool permissions, an optional list of success criteria, and an optional maximum number of tool cycles) | `agentConfId` |
| `TOOL` | A single native tool or code module call, with **no LLM in the loop** | `toolName`, `toolArgumentBindings` |
| `SUBPLAN` | Another Plan, started as a child run | `subPlanId` |

`TOOL` was called `DIRECT_TOOL` before 2026.1.0. Plans stored with the old name still load, and are saved with the new one.

An agent configuration **must have an objective**: saving one without it is refused with `400`, since an agent with no prompt could never run. An agent runs on the provider, model and temperature of its objective prompt (the agent configuration itself carries none), and the prompt must therefore name a provider; a plan whose agent objective prompt has none is refused before the run. The objective prompt can also declare a *response format* (`outputSchema`, a JSON Schema): the agent then returns its output as JSON, which downstream nodes receive as such.

`TOOL` nodes are the cheapest and most deterministic step type — useful for anything that doesn't need judgment (fetching a document, chunking text, calling a deterministic API) before handing off to an `AGENT` node for the parts that do.

## Inputs and output

A plan declares its **inputs** (`inputs`, called `toolInputParameters` before 2026.1.0): named, typed values given when the run starts. Required inputs must be present, and a plan that declares inputs refuses a key it does not declare (`400`). A run takes at most 100 input entries and 262,144 bytes.

A plan can also declare its **output type** (`outputSchema`, a JSON Schema). The run's `output` is built from its end nodes: the output of the single end node, or an object keyed by output name when there are several. An output that does not match the schema fails the run, and the output is kept for inspection.

## How data flows between nodes

Every node has an `outputKey`: the name under which its result becomes available to other nodes. A node's `dependencies` list the node ids it needs to have finished first; the engine starts a node once all of its dependencies are done and its [condition](#conditions-recovery-branches) is met.

By default, a node only sees the outputs of its **direct dependencies** — not the whole plan's history. Setting `persistOutput: true` on a node instead adds its output to the **shared payload**, visible to every downstream node regardless of the dependency graph. The Plan's inputs are always part of the shared payload from the start.

`AGENT` nodes render their objective prompt against this merged payload the same way any prompt is rendered (see [Prompts and templating](./prompts_and_templating.md)) — a dependency's `outputKey` or a persisted key becomes a `[[${key}]]` placeholder. `TOOL` nodes bind each tool argument via `toolArgumentBindings` (`{ "argumentName": "payloadKey" }`); the engine reads the value from the merged payload and builds the tool call's JSON arguments itself — there is no template to write. Since 2026.1.0, an argument with no binding takes the value **of the same name** that reaches the node (a plan input, a dependency output, a shared output, or `item`), and a required argument with no value fails the node before the call.

## Fan-out: processing a list in parallel

Setting a node's `listKey` turns it into a **fan-out** node: instead of running once, it runs once **per element** of the JSON array found at that payload key, concurrently. Each run sees the same merged payload as any other node, plus one extra variable — `item` — holding that run's element. The node's own `outputKey` then holds a JSON array of the per-element results, in order.

Concurrency is capped by `maxParallelElements`, **32** by default since 2026.1.0 (it was 8; the server default is `agentic.fan-out-max-parallel-elements`). A fan-out list is capped at **200 elements** total.

When some elements fail, the node ends **`PARTIAL`**: its output holds the successful results, and `failedElements` lists the others with their error. A partial node counts as a success, so the nodes that depend on it still run; use the `ON_PARTIAL` [condition](#conditions-recovery-branches) to handle that case on its own. The node is `FAILED` only when every element fails. Set `allOrNothing: true` to fail the whole node as soon as one element fails, as before 2026.1.0.

Fan-out applies to any node type, but is most useful on `AGENT` nodes (map a summarization/classification/extraction task over many items) or `SUBPLAN` nodes.

### Example: map-reduce document summarization

A common pattern — summarizing a document too long for one context window — composes four nodes:

```
fetch (TOOL: extractDocumentText)
  → outputKey: content
  ↓
chunk (TOOL: chunkText, bound to content)
  → outputKey: chunks
  ↓
summarize-chunks (AGENT, fan-out listKey: chunks, maxParallelElements: 8)
  → each run sees `item` = one chunk; outputKey: chunkSummaries (a JSON array)
  ↓
combine (AGENT, reads chunkSummaries)
  → outputKey: summary
```

`fetch` and `chunk` need no LLM at all; `summarize-chunks` fans out one agent call per chunk, 8 at a time instead of the default 32; `combine` synthesizes the per-chunk summaries into one final answer. Splitting the map step (many small, cheap calls) from the reduce step (one call, higher-quality model) is a natural place to use a smaller/cheaper model for the fan-out agent and a stronger one for the final combine.

`ai-standalone` ships two prompts purpose-built for exactly this pattern — `summarizeChunkFacts` (map: extracts key facts from one fragment) and `summarizeCombine` (reduce: merges the fragment summaries in reading order) — reference them by id in `summarize-chunks`'/`combine`'s agent configurations instead of writing your own from scratch.

## Sub-plans and nesting

Since 2026.1.0, a `SUBPLAN` node starts a **child run** of the other plan, passing it the current merged payload as input. The child is a run like any other: it is listed, it can be opened and signalled, and the node records its `childRunId`. While it runs, the calling node waits (`WAITING_CHILDREN`) without holding a slot. A pause or stop of the calling run reaches the runs it started, and the child's tokens count against the budget of every calling plan.

Nesting is capped at a depth of **5**. A plan that would call itself, directly or through other plans, is refused before any run is created, with a message naming the cycle (`would call itself: a -> b -> a`).

## Exposing a Plan as a tool

Setting `exposeAsTool: true` on a Plan (plus a non-blank `toolDescription`, and a tool-name-safe id — letters, digits, `_`, `-` only) makes it **callable like a native tool** by any agent whose permissions grant it. The plan's `inputs` become the tool's parameters; with no inputs, the tool takes a single generic `task` string.

Granting access is a permissions concern, not a Plan-side one: an agent configuration's tool permissions include an `allowedSubPlans` list of Plan ids it may call this way (alongside the existing `allowedTools`/`allowedToolTags`/`allowedMcpServers` whitelists). Only Plans in that list are turned into callable tools for that agent — exposing a Plan doesn't make it globally callable by itself.

When called, the plan runs as a child run and its output comes back as the tool's result; the calling agent sees only that output, not the plan's nodes. A chat conversation waits for it at most `agentic.conversation-wait-seconds` (300 by default): after that the tool call fails, and the run carries on.

## Execution model

Starting a Plan creates a **run** (called a *plan execution* before 2026.1.0): a record holding the overall status and one **node run** per node (its own status, timing, token usage, tool call trace, and output).

| Run status | Meaning |
|---|---|
| `RUNNING` | Nodes are running or waiting to |
| `PAUSED` | Paused by a signal |
| `COMPLETED` | Every node that had to run is done |
| `FAILED` | A failure no later node handled, an output that does not match the output schema, or the budget reached |
| `STOPPED` | Stopped by a signal (`CANCELLED` before 2026.1.0) |
| `EXPIRED` | The run outlived its validity |

A node run is `PENDING`, `READY`, `RUNNING`, `WAITING_CHILDREN` (a sub-plan or fan-out waiting for its children), `COMPLETED`, `PARTIAL` (some fan-out elements failed), `UNSATISFIED` (an `AGENT` node whose success criteria were not all met), `FAILED`, `SKIPPED` (its condition did not accept the outcome of its dependencies) or `STOPPED` (not started because the run was stopped, expired or out of budget).

When a run starts, the engine **freezes** what it will use: the agent configurations, their prompts, the LLM providers, and the plans an agent may call as tools. Editing any of them does not change runs already started. The user's token is kept with the run, encrypted with the [encryption key](../reference/configuration.md#applicationyml), so any replica can run a node as that user.

### Success criteria

An agent's `successCriteria` is a list of statements. For each one, the model returns a verdict with its evidence, and the engine itself derives the node's outcome: `SUCCESS` when every criterion is met, `UNSATISFIED` when one is not, `FAILURE` when the run failed. The model no longer reports the status itself.

### Conditions: recovery branches

Every node has a `condition` (called `executionCondition` before 2026.1.0, still read under that name) that says in which outcome of its dependencies it runs:

| Value | The node runs when its dependencies ended… |
|---|---|
| `ON_SUCCESS` (default) | successfully (a `PARTIAL` fan-out counts as a success) |
| `ON_PARTIAL` | with some fan-out elements failed |
| `ON_UNSATISFIED` | with an unsatisfied outcome |
| `ON_ERROR` | in error |
| `ON_ANY` | in any outcome |

This makes recovery branches expressible: a node that fails can be followed by an `ON_ERROR` node that handles the failure, and a failure consumed by an `ON_ERROR` or `ON_ANY` branch no longer fails the run. For instance, a plan can try to read a page as text, and fall back to reading it as an image when the page holds no text.

### Limits

| Limit | Default | Set by |
|---|---|---|
| Time a node may run | 900 s | `agentic.node-timeout-seconds` |
| Size of a node's output | 1 MiB | `agentic.max-node-output-bytes` |
| Tokens of an agent's tool loop | 1,000,000 | `agentic.node-token-limit` |
| Run validity | 24 h | The plan's `runValidityMinutes`, or `agentic.run-validity-minutes` (0: no expiry) |
| Token budget of the plan | none | The plan's `budget` |
| Active runs with the same inputs | unlimited | The plan's `uniqueKeys` |

A node that exceeds a limit fails with a message naming the setting. A run past its validity stops starting nodes and ends `EXPIRED`; a child run never outlives its caller, and a paused run expires when it is resumed.

A **budget** (`budget: { "limit": 500000, "period": "DAY" }`, period `DAY` or `MONTH`, in UTC) caps the tokens all the runs of a plan use in a period. It is copied onto the run when it starts. Once it is reached, nodes not started yet are `STOPPED` and the run ends `FAILED`. The overshoot is bounded by the nodes already running. `GET /api/v1/admin/plans/{id}/budget` tells how much is used.

**Unique runs**: `uniqueKeys` lists inputs of the plan. While a run with the same values for those inputs is active, starting another one answers `409 RUN_ALREADY_ACTIVE` with the `existingRunId`.

### Pause, resume and stop

A run can be **paused** (running nodes finish, then no node starts), **resumed** (continues without re-running nodes that already completed), or **stopped** (moves permanently to `STOPPED`, keeping the partial trace for inspection). All three go through `POST /api/v1/admin/plan-runs/{id}/signal`, with a body `{ "signal": "PAUSE" | "RESUME" | "STOP" }`. A signal reaches the child runs. Stop wins over expiry.

If the LLM provider reports an exhausted quota or credit balance (HTTP `402`, `LLM_QUOTA_EXCEEDED`), the whole run is aborted, also across sub-plan boundaries, and the failed node keeps the tokens the provider billed.

### Brokers and workers

Every uxopian-ai replica both serves the API (**broker**: starts runs, reserves nodes) and runs nodes (**worker**), up to `agentic.slots` nodes at once (1024 by default). Replicas share work through OpenSearch, and pass signals and wake-ups through Hazelcast, so the replicas of one deployment must form one Hazelcast cluster and run in the same time zone. `agentic.role` (`both`, `broker` or `worker`) splits the roles: a worker runs nodes but answers `404` on `/api/**`. See [Configuration — agentic plan engine](../reference/configuration.md#agentic-plan-engine).

## What changed in 2026.1.0

- Executions are now **runs**: the REST path is `/api/v1/admin/plan-runs` (was `/api/v1/admin/plan-executions`), see [Managing Plans — REST API](../admin/managing_plans.md#rest-api).
- Runs of 2026.0.0 (`plan_executions` index) are neither read nor migrated. Plans themselves are kept.
- A failed fan-out element no longer fails the node by default (`PARTIAL`), and 32 elements run at a time instead of 8.
- Sub-plans and plans called as tools are child runs.
- New: node limits, run validity, budgets, unique runs, plan output type, frozen configuration, broker and worker roles.

See [Managing Plans in the admin UI](../admin/managing_plans.md) for how to build, run, and monitor a Plan in practice.

## Related pages

- [Managing Plans in the admin UI](../admin/managing_plans.md)
- [Tools](./tools.md)
- [Prompts and templating](./prompts_and_templating.md)
