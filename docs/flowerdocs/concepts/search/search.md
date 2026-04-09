---
title: Searches
sidebar_position: 1
description: Enjoy the richness of FlowerDocs
date: "2005-02-02"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 12bd0a9d9342514124926393961e0c945d47f55979c1a341ce86860ddef86347
---

# Searches

FlowerDocs' search capabilities make the most of the document base, while maintaining the ergonomics required by end-users.

<br/>
The classic search functions of a DMS are described, including:

- selection of fields to be displayed
- search filters
- sorting on metadata
- pagination of results
- etc.

_more details can be found in the [technical documentation](/docs/flowerdocs/apis/core/examples/search)_

<br/>

:::info
We recommend using a maximum of 20 criteria in a search.
:::

Searches can be saved and shared between FlowerDocs users.

Searches return a maximum of 10,000 results; an error occurs when paging after this limit. This limit is the same using user interface and web services.

# Keyword search

In a search form, it is possible to configure a keyword search. This allows launching a search on several tags and data simultaneously. The search uses a **contains** operator: entering `A` returns all components where at least one of the configured tags (name, tags, etc.) contains `A`.

<br/>

Some specifics to keep in mind when using keyword search:

- Each space-separated entry is treated as an independent search term — it can be a single character, a partial string, or a full word. Entering `A B` returns all components where at least one configured tag contains `A` or `B`: this includes components where a tag contains both, only `A`, or only `B`.
- When the search targets the `Content` field, the specific behavior of the [full-text search](#full-text-search) applies.

:::note[Example]

Searching for `contract insurance` returns:
- components where a tag contains both `contract` and `insurance`
- components where a tag contains only `contract`
- components where a tag contains only `insurance`

:::

:::info
Keyword search configuration is described in the [search form documentation](/docs/flowerdocs/config/gui/search/configure#keyword-search).
:::

# Full-text search

With FlowerDocs, it is possible to configure a full-text search. This allows a user to search on the content of a document rather than on its metadata.

In a search form, you can add the “Content” criterion to perform a full-text search.

<br/>

The full-text search function is based on the OpenSearch search function, with the following specific features for writing down search items :

- The order of words in the search doesn't matter
    - Search for the following value “\{word A\} \{word B\}” retrieves documents containing words A and B, regardless of where words A and B appear in the content.
- There are AND, OR and NOT operators, which allow you to specify what you are looking for :
    - Searching for “\{word A\} \{word B\}” retrieves documents containing words A and B, but not documents containing only word A, word B or containing neither A nor B.
    - Searching for “\{word A\} OR \{word B\}” retrieves documents containing word A, word B or both words, but does not retrieve documents containing neither word.
    - Searching for “\{word A\} AND NOT \{word B\}” retrieves documents containing word A, but not word B.

The following characters must not be used in full-text searches: `+`, `-`, `=`, `||`, `>`, `<`, `!`, `(`, `)`, `{`, `}`, `[`, `]`, `^`, `"`, `~`, `*`, `?`, `:`, `\`, `/`

To find a document containing the name "John-Peter", use the search "John Peter".

:::info
Full-text search works only on documents whose content has been indexed beforehand. The content is indexed using a [operation subscription](/docs/flowerdocs/config/core/operation/handlers/fulltext).
:::
