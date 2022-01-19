<!--
	@component
	To be used as children to `<Menubar />` to wrap any interactable elements in your menu

	Important that you use the `let:props` and spread it on any children elements in order to gain the accessibility
	
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
<script lang="ts">
	/** Props that are required to be spread onto the child element of this component */
	let props: svelte.JSX.HTMLProps<HTMLElement> = {
		role: "menuitem",
		tabindex: 0,
	};
</script>

<li role="none" class="svaria__menuitem" {...$$restProps}>
	<slot {props} />
</li>
