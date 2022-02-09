---
pretitle: Stores
title: $prefersReducedMotion
description: Simple readable store that indicates if the user has prefers-reduced-motion enabled
github: https://github.com/MattheousDT/svaria/tree/master/src/lib/stores/prefers_reduced_motion.ts
---

<script>
  import PrefersReducedMotionExample from "$examples/stores/prefers_reduced_motion.example.svelte";
  import Example from "$site/components/example.svelte";
</script>

This can be used to determine whether to turn off certain animations that could be problematic for those who suffer from motion sickness. The store will update it's subscription if the value ever changes so updates can be reacted to on-the-fly.

## Example

In this example, we make a transition accessible using a single ternary statement.

<Example value={66}>

<span slot="preview">
  <PrefersReducedMotionExample />
</span>

```svelte
<script>
  import { prefersReducedMotion } from "svaria";
  import { fly } from "svelte/transition";

  let visible = false;
</script>

<label>
  <input type="checkbox" bind:checked={visible} />
  Toggle visible
</label>

{#if visible}
  <p in:fly={{ y: $prefersReducedMotion ? 0 : 20 }}>
    {$prefersReducedMotion ? "Just fade in" : "Fly in!"}
  </p>
{/if}
```

</Example>

## Testing

To test this functionality you can either:

### Using DevTools emulation

- **Chromium browsers**: F12 > Three dots at top right > More Tools > Rendering > Emulate CSS media feature prefers-reduced-motion

### Changing OS settings

- **Windows 10**: Settings > Ease of Access > Display > Show animations in Windows.
- **Windows 7**: Control Panel > Ease of Access > Make the computer easier to see > Turn off all unnecessary animations (when possible).
- **macOS**: System Preferences > Accessibility > Display > Reduce motion.
- **iOS**: Settings > General > Accessibility > Reduce Motion.
- **Android**: Settings > Accessibility > Remove animations.
