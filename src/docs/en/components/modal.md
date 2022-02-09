---
id: modal
pretitle: Components
title: Modal
description: A modal is a window overlaid on either the primary window or another modal. Windows under a modal are inert. That is, users cannot interact with content outside an active modal window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the modal to close.
slug: /components/modal
aria: https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
github: https://github.com/MattheousDT/svaria/tree/master/src/lib/components/modal/modal.svelte
---

<script>
  import ModalExample from "$examples/components/modal.example.svelte";
  import Example from "$site/components/example.svelte";
</script>

## Example

In this example, the first `<div>` underneath the if has a dimmed background and the `<Modal>` is the element inside the dimmed area.

Click outside the modal or hit <kbd>Esc</kbd> to exit the modal.

<Example value={70}>

<span slot="preview">
  <ModalExample />
</span>

```svelte
<script>
  import { Modal } from "svaria";

  let visible = false;
</script>

<button id="demo-modal-trigger" on:click={() => (visible = true)}>
  Open modal
</button>

{#if visible}
  <div>
    <Modal
      id="demo-modal"
      labelId="demo-modal-title"
      descriptionId="demo-modal-description"
      focusOnOpenId="demo-modal-title"
      focusOnCloseId="demo-modal-trigger"
      on:close={() => (visible = false)}
    >
      <h1 id="demo-modal-title" tabindex="0">Epic modal</h1>
      <p id="demo-modal-description">Wow! Modals! So cool! 😎</p>
    </Modal>
  </div>
{/if}
```

</Example>

## Props

| Name             | Type     | Required | Description                                                                                                                                                      |
| ---------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `string` | `true`   | Unique identifier for this modal                                                                                                                                 |
| `labelId`        | `string` | `true`   | An element ID selector that points to a piece of text which gives an appropriate label to the modal                                                              |
| `descriptionId`  | `string` | `false`  | An element ID selector that points to one or more pieces of text which gives an appropriate description of the modal's contents                                  |
| `focusOnOpenId`  | `string` | `true`   | An element ID selector that points to the element you'd like keyboard focus to switch to once the modal has opened. E.g. the first text input in a form          |
| `focusOnCloseId` | `string` | `true`   | An element ID selector that points to the element you'd like keyboard focus to switch to after the modal has closed. E.g. the button triggered the modal to open |

## Events

| Event      | Triggers                            | Description                             |
| ---------- | ----------------------------------- | --------------------------------------- |
| `on:close` | <kbd>Esc</kbd> and clicking outside | Signify that the modal should be closed |
