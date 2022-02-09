---
pretitle: Actions
title: use:clickoutside
description: Adds a click handler that only fires whenever the click is not the element passed in.
github: https://github.com/MattheousDT/svaria/tree/master/src/lib/actions/clickoutside.ts
---

<script>
  import ClickoutsideExample from "$examples/actions/clickoutside.example.svelte";
  import Example from "$site/components/example.svelte";
</script>

## Example

<Example value={66}>

<span slot="preview">
  <ClickoutsideExample />
</span>

```svelte
<script>
  import { clickoutside } from "svaria";

  let text;
</script>

<div
  on:click={() => (text = "Clicked inside!")}
  use:clickoutside={() => (text = "Clicked outside!")}
>
  {text ?? "Waiting for clicks..."}
</div>
```

</Example>

## Paramaters

| Name       | Type                                          | Required | Description                                                                      |
| ---------- | --------------------------------------------- | -------- | -------------------------------------------------------------------------------- |
| `callback` | `(target: EventTarget & HTMLElement) => void` | `true`   | Callback to run when clicked outside. The clicked HTML element is passed through |
