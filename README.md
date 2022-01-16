# [Svaria](https://svaria.vercel.app)

A library of Svelte actions, components, and stores that aims to cut down on boilerplate and allow you to write accessible apps that can scale to any design.

## 🚧 Work in progress
This library is very much a work-in-progress and may be subject to large API changes. 

**I STRONGLY RECOMMEND that you wait until version 1.0 before using this library.**

## ✨ Features

* ♿️ **Accessible** – Svaria provides accessibility and behavior according to [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.2/), including full screen reader and keyboard navigation support. All components have been tested across a wide variety of screen readers and devices to ensure the best experience possible for all users.
* 📱 **Adaptive** – Svaria ensures consistent behavior, no matter the UI. It supports mouse, touch, keyboard, and screen reader interactions that have been tested across a wide variety of browsers, devices, and platforms.
* 🎨 **Fully customizable** – Svaria implements as little DOM structuring as possible and isn't styled, instead providing behavior, accessibility, and interactions which lets you focus on your design.

## Getting started

A guide will be provided on how to use the library once this is closer to release. For now, I have documented each component I have worked on with JSDoc comments, simply hover over a function or Svelte element in your IDE and it should give you some instructions.

### Installing
```bash
npm install -D svaria
```

or alternatively use pnpm or yarn like normal, just be sure to add to devDependencies as Svaria is compiled.

### Example

Here are some very basic examples of using Svaria.

### Actions
```svelte
<script>
  import { contextual } from "svaria/actions";

  let videoShortcuts = [
    {
      name: "Skip ahead 10 seconds",
      key: "l",
      callback: () => skip(10),
    },
    {
      name: "Go back 10 seconds",
      key: "j",
      callback: () => prev(10),
    },
  ];
</script>

<div use:contextual={{ id: "video-player", shortcuts: videoShortcuts }}>
  <!-- Shortcuts will be registered when focus is within here -->
</div>
```

### Components
```svelte
<script>
  import { Menubar, MenuItem } from "svaria/components";
</script>

<Menubar id="main-nav" label="Main Navigation">
  <MenuItem let:props>
    <button on:click={() => alert("Hello")} {...props}>
      Example usage with button
    </button>
  </MenuItem>
  <MenuItem let:props>
    <a href="/hello" {...props}>
      Example usage with link
    </a>
  </MenuItem>
</Menubar>
```

---

## Roadmap / Notes for version 1.0
Here is a list of all the components and features that I have considered ***so far***, feel free to suggest any that I haven't already in the community tab.
### Actions
#### `use:arrowkeys`
An action that allows for the addition of keyboard shortcuts that work regardless of layout. This works by creating a map of the focusable elements around it and works out the directions. A common use-case for this would be to add arrow key functionality to a grid of elements where there can be a different number of elements per row based on screen size.

#### `use:contextual`
Allows the developer to add multiple shortcuts to the contextual shortcuts store whenever the user is focused on the parent element and any of it's children. An example would be to add shortcuts to "like" or "comment" on the post that the user is focused on.

#### `use:clickOutside`
Triggers a callback whenever the user clicks outside the scope of the element it is applied to. Most common use-case would be to allow the user to click somewhere else on the screen to exit a modal or dropdown.

#### `use:longpress`
Allows the developer to perform a callback once the element has been pressed for a certain amount of time.

#### `use:shortcut`
Similar to `use:contextual` however it adds the shortcut to the `window` context instead of the context of the element it's applied to so it can be accessed from anywhere on the DOM while it's mounted. An example would be to use a keyboard shortcut to access the search box.

#### `use:table`
Basically `use:arrowkeys` but for tables, so it doesn't have to do media query calculation stuff, it just uses the dom structure

### Components
#### Accordion
#### Alert
#### Announcer (not aria)
#### Autocomplete (collapsible combo box in aria)
#### Breadcrumbs
#### Button
#### Carousel
#### Checkbox
#### Dialog
#### Disclosure (accordion item)
#### Dropdown (collapsible listbox)
#### Dropdown Menu (Menu button)
#### Feed
#### Link (???)
#### Listbox
#### Menubar
#### Radio Group
#### Slider
#### Spin button (low priority)
#### Tabs
#### Tooltip
#### Treegrid (could be named better)
#### Window splitter (???)

### Stores
#### `$announcer`
Allows messages to be sent to the announcer component. This is used whenever you are using a screenreader and need to send important messages about something that has happened that isn't conveyed through something like an alert or toast. A common use-case would be to announce if a username was available on a form or if they are changing pages on an SPA. Usage would be something like `announcer.send("Very important information")`

#### `$prefersReducedMotion`
Broadcasts `true` if the user has prefersReducedMotion set to true on the OS/browser

#### `$shortcuts`
Returns an object of all the shortcuts currently available in the global and contextual scope that have been registered by the `use:contextual` and `use:shortcut` actions. Could be used to build a panel similar to Facebook's for showing what shortcuts you can use.

#### `$usingKeyboard`
Broadcasts `true` if they are using a keyboard. Can be used for multiple purposes like rendering UI conditionally like UI hints specifically for keyboard users.