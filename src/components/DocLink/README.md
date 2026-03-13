# DocLink Component Usage Example

## In your release notes

To link to a versioned documentation page from a release note, simply add the following:

```md
---
title: Product vX.Y.Z – Release Notes
date: "2025-10-31"
---

import DocLink from '@site/src/components/DocLink';

See the related documentation <DocLink version="vX.Y.Z" product="arender" to="features/hyperlink/#document-linking">here</DocLink>.
```

The component automatically resolves the correct URL:
- If `vX.Y.Z` is the **current** version → links to `/docs/<product>/features/hyperlink/#document-linking`
- If `vX.Y.Z` is **archived** → links to `/docs/<product>/vX.Y.Z/features/hyperlink/#document-linking`

## Component Parameters

### `version` (required)
The version label to link to, prefixed with `v`.
Example: `"v2023.15.0"`, `"v1.0.0"`, etc.

### `to` (required)
The documentation path relative to `docs/<product>/`. Supports `#anchor` fragments.
Example: `"features/hyperlink/#document-linking"`, `"getting-started"`.

### `product` (required)
The docs plugin ID.
Accepted values: `"arender"`, `"fast2"`, `"flowerdocs"`, `"uxopian-ai"`.

### `children` (required)
The link text displayed to the user.

## Examples

### ARender
```jsx
import DocLink from '@site/src/components/DocLink';

<DocLink version="v2023.15.0" product="arender" to="features/hyperlink/#document-linking">here</DocLink>
```

### Fast2
```jsx
import DocLink from '@site/src/components/DocLink';

<DocLink version="v2.5.0" product="fast2" to="installation/overview">Installation guide</DocLink>
```

### FlowerDocs
```jsx
import DocLink from '@site/src/components/DocLink';

<DocLink version="v1.0.0" product="flowerdocs" to="getting-started">Getting Started</DocLink>
```

### Multiple links on the same line
```jsx
import DocLink from '@site/src/components/DocLink';

More information: <DocLink version="v2023.18.0" product="arender" to="development/apis/web-ui/javascript/print-js-api/">Print JavaScript API</DocLink>, <DocLink version="v2023.18.0" product="arender" to="development/apis/web-ui/javascript/download-js-api/">Download JavaScript API</DocLink>
```

## How it works

The component uses the Docusaurus `useVersions` hook to retrieve all registered versions for the given product plugin. It compares the `version` prop against the current version's label:
- **Match** → the version is still "current", so no version prefix is needed in the URL
- **No match** → the version is archived, so the version is inserted in the URL path

This means you never need to update release notes when a version transitions from current to archived — the links adapt automatically.
