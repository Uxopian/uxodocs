---
title: Managing Plans in the admin UI
last_update:
  date: '2026-08-13T13:08:15.927Z'
  author: CI/CD Bot
sidebar_label: Plans
sidebar_position: 8
content_hash: 63d838fb20c5cb8db09a2d7e15cfb4b9fd5b410e8320ce984faed9d578106150
---

The **Plans** section of the admin panel lets you build, run, and monitor [Agentic Plans](../understanding/agentic_plans.md) — multi-step workflows of `AGENT`, `DIRECT_TOOL`, and `SUBPLAN` nodes — through a visual flow editor, without writing the plan definition by hand.

## Navigate to Plans

In the admin panel, click *Plans* in the navigation. The page lists the plans of the current tenant — paginated, with server-side search, filters (agent, used by) and sorting — and a *New Plan* button. Each plan shows its step count, the agents and plans it calls, and the plans that call it. Double-clicking a row opens the plan.

![The Plans list showing a plan's ID, description, and step count](../images/plans-list.png)

*Figure: The Plans list.*

## Create a plan

1. Click *New Plan*. This opens the plan editor on the **Flow** tab.
2. Set the **Plan name** (the plan's ID, immutable once saved; a name already in use is reported while you type) and an optional **Description**.
3. Click *Add Node* to add a node to the graph, then drag from one node's edge to another to connect them — a connection sets a dependency: the target node waits for the source node to complete.
4. Select a node to open its configuration panel.

![The Flow tab showing a three-node map-reduce plan: chunk, a fan-out summarize-chunks node, and combine](../images/plan-flow-editor.png)

*Figure: A three-node plan — chunk (Direct tool) → summarize-chunks (Agent, fan-out) → combine (Agent).*

## Configure a node

Every node, regardless of type, has:

| Field | Description |
|---|---|
| Name | Short label shown on the node in the graph |
| Description | Free text describing what the node does |
| Runs when | The outcome of its dependencies in which this node runs: on success (default), on unsatisfied, on error, or in any outcome. Used to build recovery branches — see [Agentic Plans — execution condition](../understanding/agentic_plans.md#execution-condition-recovery-branches) |
| Fan out over a list | Runs this node once per element of a list instead of once — see [Fan-out](#fan-out-run-a-node-once-per-list-element) below |
| Output Key | The payload key under which this node's result is published |
| Persist output to shared payload | When on, the output becomes visible to every downstream node, not just direct dependents |

Then pick the **node type** — Agent, Sub-plan, or Direct tool — each with its own fields:

- **Agent**: select an existing agent configuration from the dropdown, or click *New agent* to create one inline without leaving the plan editor. An agent needs an **objective** prompt — the editor marks the field as required, and saving an agent without one is refused. The agent editor also takes a *description*, a list of **success criteria** entered one by one (the model gives a verdict on each, and any unmet criterion makes the node *unsatisfied*) and a *Max tool cycles* limit. An agent carries no model of its own: it runs on the provider, model and temperature of its objective prompt. Once an agent is selected, its objective prompt is shown with the variables currently available to this node (dependency outputs, persisted outputs, plan input parameters, and — if fan-out is on — the `item` variable) highlighted, so you can see at a glance what the prompt can reference.
- **Sub-plan**: select another plan from this tenant to run as this node's body.
- **Direct tool**: select a tool from the dropdown (grouped by tag) — a native tool, or a code module exposed as a tool. Once selected, each of the tool's arguments gets its own source dropdown, listing every value currently available to this node (fan-out item, a connected dependency's output, a persisted output, or a plan input parameter) — the argument is auto-bound automatically when there is exactly one possible source.

### Fan-out: run a node once per list element

A node normally runs once. Turn on **Fan out over a list** and it runs **once per element** of a JSON array already present in the payload, with several elements in flight at the same time — the *map* step of a map-reduce, expressed as a single node instead of one node per element.

Two fields appear when you enable it:

| Field | Description |
|---|---|
| List Key | The payload key holding the JSON array to iterate. The array has to already be in the payload — published by an upstream node's *Output Key*, or supplied as a plan input parameter. In the figure below, a `chunk` Direct tool node publishes its fragments under `chunks`, and the fan-out node's list key is `chunks`. |
| Max Parallel Elements | How many elements run concurrently (default 8). Lower it when the underlying LLM provider is rate-limited; raise it for throughput. A fan-out list is capped at 200 elements. |

What changes inside the node:

- **Each run gets an `item` variable** holding its own element, on top of the same payload every other node sees. This is what an Agent node's objective prompt references to work on "its" element (`item` shows up in the highlighted variable list described above), and what a Direct tool node's arguments can be bound to.
- **The node's Output Key holds a JSON array** of all the per-element results, in the order of the input list — so a downstream node can read that one key and reduce the whole set in a single call.
- **A single failing element fails the whole node**, and the error message names which indexes failed.

So the three-node plan in the figures is a complete map-reduce: `chunk` splits a document into `chunks` (no LLM), `summarize-chunks` fans out one agent call per chunk in parallel and publishes `chunkSummaries`, and `combine` reads that array and writes the final summary. A natural side benefit is that the many cheap map calls and the single quality-critical reduce call are separate agent configurations, so they can use different models.

For the underlying mechanics, see [Agentic Plans — Fan-out](../understanding/agentic_plans.md#fan-out-processing-a-list-in-parallel).

![The Node Configuration panel for a fan-out Agent node, showing List Key, Max Parallel Elements, and Output Key](../images/plan-node-config.png)

*Figure: Configuring a fan-out node — `chunks` is the list key, up to 8 elements run in parallel.*

## Expose a plan as a tool

Click *Tool settings* (top of the Flow tab) to open the tool-exposure panel:

| Field | Description |
|---|---|
| Expose this plan as a callable tool | Master switch; leave off to keep the plan private |
| Tool description | What an agent should use this plan for — shown to the calling agent as the tool's description |
| Input parameters | Named, typed parameters the caller provides when invoking this plan as a tool. The editor suggests names already referenced inside the plan (a `listKey` or a `DIRECT_TOOL` argument binding) that aren't produced by any node — a likely sign they're meant to come from outside. |

A plan exposed this way is only actually callable by an agent whose configuration explicitly allows it — see [Agentic Plans — exposing a Plan as a tool](../understanding/agentic_plans.md#exposing-a-plan-as-a-tool).

![The tool-exposure modal, with the master switch on, a tool description, and one input parameter](../images/plan-tool-settings.png)

*Figure: Exposing a plan as a tool named for its plan id, taking a `content` parameter.*

## Run a plan

Click *Run* (available once the plan is saved). If the plan declares input parameters, a window collects a value for each (required ones are enforced) before starting; otherwise the run starts immediately with no payload. The run then opens in its own page.

## Monitor an execution

The plan page has a **Runs** card listing the plan's past executions (newest first, loaded page by page). Opening one shows the run view:

- The overall **status** badge (`Pending`, `Running`, `Paused`, `Completed`, `Failed`, `Cancelled`), and key figures: start time, duration, steps, tokens and tool calls.
- A **Pause** button while `Running`, **Resume** while `Paused`, **Stop** while `Running` or `Paused`, and a refresh button — pausing lets in-flight nodes finish before the execution actually stops; resuming continues from where it left off without re-running completed nodes; stopping moves the execution permanently to `Cancelled`, keeping the trace.
- A **Steps** flow, which can be expanded to full screen, with each node color-coded by its own status (`Pending`, `Running`, `Completed`, `Failed`, `Skipped`, `Unsatisfied`) and showing its input and output token counts. Selecting a node opens its panel with its start/completion time, error message (if any), its **output**, its `log(...)` lines when it ran a code module, and every tool call it made — each expandable to see the exact arguments, result, and (if it failed) error. The selected step is kept in the URL (`?step=<id>`), so a link opens the run on that step.
- A **Shared payload** card showing what the plan holds: its input, and the output of each step under its key.
- If the whole execution failed, the failure reason is shown at the top. If the LLM provider reports an exhausted quota or credit balance (HTTP `402`), the whole run is aborted, and the failed node keeps the tokens the provider billed.

Token counts include every completion of a tool-calling loop, not only the last one, so figures are higher than before 2026.0.0 for nodes that call tools.

![An execution's run page: status, duration, steps, tokens and tool calls, then the Steps flow with chunk, summarize-chunks and combine all completed](../images/plan-run-detail.png)

*Figure: A completed run — each node's status is color-coded, and selecting a node opens its detail panel with timing, tokens, and errors.*

## REST API

The admin UI is a thin wrapper around two controllers. All endpoints require the `ADMIN` role and operate on the current tenant.

**Plan definitions** — `/api/v1/admin/plans`

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | List plans — a page `{ collection, total, facets }` of plan summaries (step count, agents and plans called, callers). Filters: `search`, `agentId`, `usedBy`, `workspaceId`; pagination: `offset`, `limit`, `orderBy`, `ascending` |
| `GET` | `/availability?id={id}` | `true` when a new plan can take this ID |
| `GET` | `/{id}` | Get one plan |
| `POST` | `/` | Create a plan |
| `PUT` | `/{id}` | Update a plan |
| `DELETE` | `/{id}` | Delete a plan |

The former `POST /{id}/pause`, `/resume` and `/stop` endpoints of plan executions were replaced by the single `/signal` endpoint below.

**Plan executions** — `/api/v1/admin/plan-executions`

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | List main (non-nested) plan executions, newest first, as a page of summaries (token total computed server side; node outputs and tool calls are left out — fetch `/{id}` for them). Filters: `planId`, `status`, `workspaceId`; pagination: `offset`, `limit` |
| `GET` | `/{id}` | Get one execution, including every node's state |
| `POST` | `/run` | Create and immediately start an execution (`{ "planId": "...", "inputPayload": { ... } }`); returns `202 Accepted` with the initial execution |
| `POST` | `/{id}/signal` | Send a signal with the body `{ "type": "PAUSE" \| "RESUME" \| "STOP" }`: pause cooperatively, resume a paused execution, or stop permanently (moves to `CANCELLED`). Returns the execution; `400` if the type is missing or unknown, `404` if the execution is unknown, `409` if its state does not allow the signal |
| `DELETE` | `/{id}` | Delete an execution record |

## Related pages

- [Agentic Plans](../understanding/agentic_plans.md)
- [Tools](../understanding/tools.md)
- [Prompts and templating](../understanding/prompts_and_templating.md)
- [Configuration file reference](../reference/configuration.md)
