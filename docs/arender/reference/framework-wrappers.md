---
viewer: modern
slug: /reference/framework-wrappers
title: Framework wrappers
last_update:
  date: '2026-03-23T10:20:59.293Z'
  author: CI/CD Bot
sidebar_position: 4
content_hash: ec63b6a6267975b7acfb3b0c7f3a8e4bdb32caa094c93bc5ba54516366f5b691
---

# Framework wrappers

ARender provides thin wrapper libraries for popular JavaScript frameworks. Each wrapper wraps the `<arender-element>` Web Component with a native component, providing idiomatic usage and type safety.

All wrappers are versioned alongside the main `arender-ui` package (v2026.0.0).

## Available wrappers

| Framework | Package | Minimum version |
|-----------|---------|----------------|
| React | `react-arender-ui` | React 19 |
| Angular | `angular-arender-ui` | Angular 19 |
| Vue | `vue-arender-ui` | Vue 3.5 |
| Svelte | `svelte-arender-ui` | Svelte 5 |

## Installation

Install the wrapper for your framework alongside the `arender-ui` peer dependency:

```bash
# React
npm install react-arender-ui arender-ui

# Angular
npm install angular-arender-ui arender-ui

# Vue
npm install vue-arender-ui arender-ui

# Svelte
npm install svelte-arender-ui arender-ui
```

## Usage

### React

```tsx
import { useEffect, useState } from 'react';
import { getARender } from 'react-arender-ui';

function App() {
  const [documentUrl, setDocumentUrl] = useState('');

  useEffect(() => {
    if (documentUrl) {
      const arender = getARender();
      arender?.openDocumentByUrl(documentUrl);
    }
  }, [documentUrl]);

  return <arender-element />;
}
```

### Angular

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'angular-arender-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `<arender-element></arender-element>`,
})
export class AppComponent {}
```

### Vue

```vue
<script setup>
import { ref, watch } from 'vue';
import 'vue-arender-ui';

const documentUrl = ref('');

watch(documentUrl, async (url) => {
  if (url) {
    await window.ARender.openDocumentByUrl(url);
  }
});
</script>

<template>
  <arender-element />
</template>
```

### Svelte

```svelte
<script>
  import 'svelte-arender-ui';
  import { onMount } from 'svelte';

  let documentUrl = $state('');

  $effect(() => {
    if (documentUrl) {
      window.ARender.openDocumentByUrl(documentUrl);
    }
  });
</script>

<arender-element />
```

### Vanilla JavaScript

No wrapper needed — use the Web Component directly:

```html
<arender-element></arender-element>

<script type="module">
  import 'arender-ui';

  const viewer = document.querySelector('arender-element');
  await viewer.ARender.openDocumentByUrl('https://example.com/document.pdf');
</script>
```

## How it works

Each wrapper imports `arender-ui` and renders the `<arender-element>` Web Component. The wrappers handle framework-specific lifecycle (mounting, unmounting, reactivity) so you can use the viewer like any native component.

The JavaScript API (`window.ARender` / `element.ARender`) remains available regardless of which wrapper you use. See [Web Component](./web-component.md) for details.
