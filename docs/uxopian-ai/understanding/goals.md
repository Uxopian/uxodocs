---
title: Goals
sidebar_label: Goals
sidebar_position: 6
---

:::warning[Removed in 2026.0.0-ft5]
Goals were removed in 2026.0.0-ft5 — there was no runtime consumer left (no admin UI, nothing resolved a goal at request time), so the concept was dropped entirely along with `goals.yml`, `/api/v1/admin/goals`, and the `type: goal` request content item. This page is kept so existing links don't dead-end; see below for what to use instead.
:::

A goal used to be a named group of ordered prompt references: a request could include a content item with `type: goal`, and the system would resolve the named group, evaluate each entry's filter expression, and inject the matching prompts into the LLM call.

## What to use instead

- **A single reusable prompt** — if a goal group was really just injecting one prompt (or a fixed prompt plus a conditional one), reference those [Prompts](./prompts_and_templating.md) directly as `type: prompt` content items; there's no need for the extra indirection layer.
- **[Applications](../admin/managing_applications.md)** — if a goal group was standing in for "the right defaults for this calling surface," an Application's `prompt` field (appended to the base prompt) covers that per-caller scoping without any conditional-filter logic.
- **[Agentic Plans](./agentic_plans.md)** — if a goal group's conditional prompt selection was really modeling a multi-step decision (pick prompt A or B depending on document type, then do something with the result), a Plan's `AGENT` nodes and dependencies express that explicitly as a graph, rather than as opaque filter expressions evaluated at render time.

None of these is a drop-in replacement for the exact `filter`/`index` merge semantics goal groups had — if your integration called `/api/v1/admin/goals` or sent `{"type": "goal", ...}` content items, that code needs to change to call Prompts (or Plans) directly.

## Related pages

- [Prompts and templating](./prompts_and_templating.md)
- [Agentic Plans](./agentic_plans.md)
- [Managing Applications](../admin/managing_applications.md)
- [Conversations and requests](./conversations_and_requests.md)
