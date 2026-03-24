---
title: Managing prompts in the admin UI
sidebar_label: Prompts
sidebar_position: 3
last_update:
  date: '2026-03-24T12:58:17.027Z'
  author: CI/CD Bot
content_hash: 04142ca83bd343156d92bc74c313438b0b19ab55aef5d267f4cf9bf8ac39128b
---

The prompts section of the admin panel lets you view, create, edit, and delete prompt definitions for the current tenant. Changes take effect immediately without restarting the application.

## Navigate to prompts

In the admin panel, click "Prompts" in the navigation. The page lists all prompts available for the current tenant, including globals and tenant-specific overrides.

## Create a prompt

1. Click "Add prompt".
2. Fill in the required fields:
   - **ID**: unique identifier. Used in request content items (`type: prompt`, `value: <id>`) and goal group entries.
   - **Role**: `SYSTEM`, `USER`, or `ASSISTANT`.
   - **Content**: Thymeleaf template text. Use `[[${variable}]]` for expressions.
3. Set optional flags:
   - **Requires multimodal model**: enable if the prompt includes images.
   - **Requires function calling model**: enable if the prompt requires tool calling.
   - **Disable reasoning**: enable to prevent tool calls during this prompt's processing.
   - **Default LLM provider**: override the LLM provider for requests using this prompt.
   - **Default LLM model**: override the LLM model.
4. Save.

## Edit a prompt

Click on a prompt in the list to open its detail page. Edit any field and save. Changes apply to new requests immediately.

## Preview a rendered prompt

The Admin API provides a render endpoint (`POST /api/v1/admin/prompts/{id}/render`) that accepts a payload map and returns the rendered prompt text. This is useful for testing templates before using them in production.

## Delete a prompt

On the prompt detail page, click "Delete". Any goal group entries referencing this prompt ID will fail to resolve after deletion. Remove those references from `goals.yml` or via the Admin API.

## Prompt usage statistics

The statistics section shows which prompts are used most frequently. See [Monitoring statistics](./monitoring_statistics.md).

## Related pages

- [Prompts and templating](../understanding/prompts_and_templating.md)
- [Write prompts](../extending/writing_prompts.md)
- [Admin panel overview](./admin_panel_overview.md)
