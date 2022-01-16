<script lang="ts">
	import contextual from "$lib/actions/contextual";
	import type { IShortcut } from "$lib/stores/shortcuts";

	// TODO: Add sub-menu functionality

	/** Unique identifier for this menu */
	export let id: string;
	/** Description of what this menu is. e.g. Main Navigation */
	export let label: string;
	/** Any extra shortcuts to add to the menu */
	export let additionalShortcuts: IShortcut[] = [];

	let menu: HTMLUListElement;

	let shortcuts: IShortcut[] = [
		{
			name: "Select item",
			key: [" ", "Enter"],
			callback: (event) => {
				event.target.click();
			},
		},
		{
			name: "Focus next Item",
			description:
				"Moves focus to the next item in the menubar. If focus is on the last item, moves focus to the first item.",
			key: "ArrowRight",
			callback: (event) => {
				const items: NodeListOf<HTMLElement> = menu.querySelectorAll(":scope > .svaria__menuitem > [tabindex='0']");
				const currIndex = Array.from(items).indexOf(event.target);

				if (currIndex === menu.children.length - 1) {
					items[0].focus();
				} else {
					items[currIndex + 1].focus();
				}
			},
		},
		{
			name: "Focus previous Item",
			description:
				"Moves focus to the previous item in the menubar. If focus is on the first item, moves focus to the last item.",
			key: "ArrowLeft",
			callback: (event) => {
				const items: NodeListOf<HTMLElement> = menu.querySelectorAll(":scope > .svaria__menuitem > [tabindex='0']");
				const currIndex = Array.from(items).indexOf(event.target);

				if (currIndex === 0) {
					items[items.length - 1].focus();
				} else {
					items[currIndex - 1].focus();
				}
			},
		},
		{
			name: "Focus first Item",
			description: "Moves focus to first item in the menubar.",
			key: "Home",
			callback: () => {
				const items: NodeListOf<HTMLElement> = menu.querySelectorAll(":scope > .svaria__menuitem > [tabindex='0']");
				items[0].focus();
			},
		},
		{
			name: "Focus last Item",
			description: "Moves focus to last item in the menubar.",
			key: "End",
			callback: () => {
				const items: NodeListOf<HTMLElement> = menu.querySelectorAll(":scope > .svaria__menuitem > [tabindex='0']");
				items[items.length - 1].focus();
			},
		},
	];
</script>

<!--
	@component
	Top level menubar component with keyboard shortcut handling pre-applied.
	
	To be accompanied with `<MenuItem />` to wrap any interactable elements in your menu
	
	**Example usage:**
	```svelte
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
-->

<ul
	{...$$restProps}
	{id}
	aria-label={label}
	role="menubar"
	class="svaria__menubar"
	bind:this={menu}
	use:contextual={{
		id: "svaria-menubar",
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
