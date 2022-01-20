<!--
	@component
	Ultra simple alert component that alerts a screenreader of the contents.
	
	@example
	```svelte
	{#if visible}
		<Alert let:props>
			<h1 {...props}>
				Hej, hello, ciao, こんにちは, 안녕
			</h1>
		</Alert>
	{/if}
	```
-->
<script lang="ts">
	let props: svelte.JSX.HTMLProps<HTMLElement> = {
		role: "alert",
		"aria-live": "assertive",
		"aria-atomic": true,
	};
</script>

<slot {props} />
