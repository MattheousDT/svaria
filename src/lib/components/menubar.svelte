<!--
	@component
	Top level menubar component with keyboard shortcut handling pre-applied.
	
	To be accompanied with `<MenuItem />` to wrap any interactable elements in your menu
	
	@example
	```svelte
	<Menubar id="main-nav" label="Main Navigation">
		<MenuItem first let:props>
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
-->
<script lang="ts">
	import type { IShortcut } from "$lib/@types/shortcuts";
	import contextual from "$lib/actions/contextual";
	import { createEventDispatcher } from "svelte";

	// TODO: Add sub-menu functionality

	/** Unique identifier for this menu */
	export let id: string;
	/** Description of what this menu is. e.g. Main Navigation */
	export let label: string;
	/** Any extra shortcuts to add to the menu */
	export let additionalShortcuts: IShortcut[] = [];

	let menu: HTMLUListElement;
	let dispatch = createEventDispatcher();
	let getItems = (): HTMLElement[] =>
		Array.from(menu.querySelectorAll(":scope > .svaria__menuitem [role='menuitem']:first-of-type"));

	let shortcuts: IShortcut[] = [
		{
			name: "Select item",
			key: [" ", "Enter"],
			callback: (event) => {
				event.target.click();
				dispatch("select", event.target);
			},
		},
		{
			name: "Focus next Item",
			description:
				"Moves focus to the next item in the menubar. If focus is on the last item, moves focus to the first item.",
			key: "ArrowRight",
			callback: (event) => {
				const items = getItems();
				const currIndex = Array.from(items).indexOf(event.target);
				items.forEach((x) => (x.tabIndex = -1));

				if (currIndex === menu.children.length - 1) {
					items[0].tabIndex = 0;
					items[0].focus();
				} else {
					items[currIndex + 1].tabIndex = 0;
					items[currIndex + 1].focus();
				}

				dispatch("next");
			},
		},
		{
			name: "Focus previous Item",
			description:
				"Moves focus to the previous item in the menubar. If focus is on the first item, moves focus to the last item.",
			key: "ArrowLeft",
			callback: (event) => {
				const items = getItems();
				const currIndex = Array.from(items).indexOf(event.target);
				items.forEach((x) => (x.tabIndex = -1));

				if (currIndex === 0) {
					items[items.length - 1].tabIndex = 0;
					items[items.length - 1].focus();
				} else {
					items[currIndex - 1].tabIndex = 0;
					items[currIndex - 1].focus();
				}

				dispatch("previous");
			},
		},
		{
			name: "Focus first Item",
			description: "Moves focus to first item in the menubar.",
			key: "Home",
			callback: () => {
				const items = getItems();
				items.forEach((x) => (x.tabIndex = -1));

				items[0].tabIndex = 0;
				items[0].focus();
				dispatch("first");
			},
		},
		{
			name: "Focus last Item",
			description: "Moves focus to last item in the menubar.",
			key: "End",
			callback: () => {
				const items = getItems();
				items.forEach((x) => (x.tabIndex = -1));

				items[items.length - 1].tabIndex = 0;
				items[items.length - 1].focus();
				dispatch("last");
			},
		},
		{
			name: "Focus first character",
			description: "Moves focus to next item in the menubar having a name that starts with the typed character.",
			key: /^\b\w\b/,
			callback: (event) => {
				const unfilteredItems = getItems();
				const items = unfilteredItems.filter((x) => x.innerText.slice(0, 1).toLocaleLowerCase() === event.key);

				if (items.length === 0) {
					return;
				}

				unfilteredItems.forEach((x) => (x.tabIndex = -1));

				const currIndex = Array.from(items).indexOf(event.target);

				if (currIndex === items.length - 1) {
					items[0].tabIndex = 0;
					items[0].focus();
				} else {
					items[currIndex + 1].tabIndex = 0;
					items[currIndex + 1].focus();
				}
				dispatch("last");
			},
		},
	];
</script>

<ul
	{...$$restProps}
	{id}
	aria-label={label}
	role="menubar"
	class:svaria__menubar={true}
	bind:this={menu}
	use:contextual={{
		id,
		shortcuts: [...shortcuts, ...additionalShortcuts],
	}}
>
	<slot />
</ul>

<style>
	.svaria__menubar {
		list-style: none;
	}
</style>
