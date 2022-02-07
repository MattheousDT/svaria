<!--
	@component
	To be used as children to `<Menubar />` to wrap any interactable elements in your menu

	Important that you use the `let:props` and spread it on any children elements in order to gain the accessibility
	
	@example
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
<script lang="ts">
	/** Required to be set to true for the first item in a menu in order for focus indexes to be setup correctly with SSR */
	export let first = false;

	/** Props that are required to be spread onto the child element of this component */
	let props: Pick<svelte.JSX.HTMLProps<HTMLElement>, "role" | "tabindex">;
	$: props = {
		role: "menuitem",
		tabindex: first ? 0 : -1,
	};
</script>

<li {...$$restProps} role="none" class:svaria__menuitem={true}>
	<slot {props} />
</li>
