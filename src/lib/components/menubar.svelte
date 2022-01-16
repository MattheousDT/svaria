<script lang="ts">
	import contextual from "$lib/actions/contextual";
	import type { IShortcut } from "$lib/stores/shortcuts";

	/** Unique identifier for this menu */
	export let id: string;
	/** Description of what this menu is. e.g. Main Navigation */
	export let label: string;

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
				const item = event.target.closest(".svaria__menuitem");
				if (item.nextElementSibling?.firstElementChild) {
					(item.nextElementSibling.firstElementChild as HTMLElement).focus();
				} else {
					(menu.firstElementChild?.firstElementChild as HTMLElement).focus();
				}
			},
		},
		{
			name: "Focus previous Item",
			description:
				"Moves focus to the previous item in the menubar. If focus is on the first item, moves focus to the last item.",
			key: "ArrowLeft",
			callback: (event) => {
				const item = event.target.closest(".svaria__menuitem");
				if (item.previousElementSibling?.firstElementChild) {
					(item.previousElementSibling.firstElementChild as HTMLElement).focus();
				} else {
					(menu.lastElementChild?.firstElementChild as HTMLElement).focus();
				}
			},
		},
		{
			name: "Focus first Item",
			description: "Moves focus to first item in the menubar.",
			key: "Home",
			callback: () => {
				(menu.firstElementChild?.firstElementChild as HTMLElement).focus();
			},
		},
		{
			name: "Focus last Item",
			description: "Moves focus to last item in the menubar.",
			key: "End",
			callback: () => {
				(menu.lastElementChild?.firstElementChild as HTMLElement).focus();
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
		shortcuts,
	}}
>
	<slot />
</ul>

<style>
	.svaria__menubar {
		list-style: none;
	}
</style>
