---
id: alert
pretitle: Components
title: Alert
description: An alert is an element that displays a brief, important message in a way that attracts the user's attention without interrupting the user's task. Dynamically rendered alerts are automatically announced by most screen readers, and in some operating systems, they may trigger an alert sound. It is important to note that, at this time, screen readers do not inform users of alerts that are present on the page before page load completes.
slug: /components/alert
aria: https://www.w3.org/TR/wai-aria-practices-1.1/#alert
github: https://github.com/MattheousDT/svaria/tree/master/src/lib/components/alert.svelte
---

<script>
  import AlertExample from "$site/components/examples/alert_example.svelte";
  import Example from "$site/components/example.svelte";
</script>

## Example

When the button is clicked, the text should be read aloud by the screenreader.

<Example value={66}>

<span slot="preview">
  <AlertExample />
</span>

```svelte
<script>
  import { Alert } from "svaria";

  let visible = false;
</script>

<button on:click={() => (visible = !visible)}>
  Toggle alert
</button>

{#if visible}
  <Alert let:props>
    <h6 {...props}>
      Hej, hello, ciao, こんにちは, 안녕
    </h6>
  </Alert>
{/if}
```

</Example>

## Slot Props

| Name    | Type     | Required | Description                                                                    |
| ------- | -------- | -------- | ------------------------------------------------------------------------------ |
| `props` | `object` | `true`   | An object that contains the relevant props to be spread on the child component |
