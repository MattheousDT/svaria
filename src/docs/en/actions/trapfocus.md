---
pretitle: Actions
title: use:trapfocus
description: Restricts the keyboard focus to only select elements within the current element
github: https://github.com/MattheousDT/svaria/tree/master/src/lib/actions/trapfocus.ts
---

<script>
  import TrapfocusExample from "$examples/actions/trapfocus.example.svelte";
  import Example from "$site/components/example.svelte";
</script>

## Example

Try tabbing through the buttons, you should only be able to focus the inside buttons once you enter.

<Example value={66}>

<span slot="preview">
  <TrapfocusExample />
</span>

```svelte
<script>
  import { trapfocus } from "svaria";
</script>

<button>Outside button 1</button>

<div use:trapfocus>
  <button>Inside button 1</button>
  <button>Inside button 2</button>
  <button>Inside button 3</button>
</div>

<button>Outside button 2</button>
```

</Example>
