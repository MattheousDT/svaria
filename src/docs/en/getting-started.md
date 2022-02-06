---
id: getting-started
title: Getting Started
description: All you need to know to get up and running with svaria.
slug: /getting-started
---

## 🚧 Work in progress

This library is very much a work-in-progress and may be subject to large API changes.

**I STRONGLY RECOMMEND that you wait until version 1.0 before using this library.**

## Installation

Installation is simple, just install using your favourite package manager for Node.js like npm, yarn, or pnpm.

```bash
npm install -D svaria
```

then add the shortcuts action to the `<svelte:body>` at the root of your app. If you are using SvelteKit, this can be done in `__layout.svelte`

```svelte
<script>
  import { shortcuts } from "svaria";
</script>

<svelte:body use:shortcuts>
```
